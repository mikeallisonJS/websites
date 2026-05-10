export type ChatMessage =
  | { role: 'system'; content: string }
  | { role: 'user'; content: string }
  | {
      role: 'assistant'
      content: string | null
      tool_calls?: Array<{
        id: string
        type: 'function'
        function: { name: string; arguments: string }
      }>
    }
  | { role: 'tool'; tool_call_id: string; name: string; content: string }

export type ToolCallAccumulator = {
  id: string
  name: string
  arguments: string
}

export type Usage = {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

export type StreamEvent =
  | { type: 'text'; delta: string }
  | { type: 'tool_call_complete'; call: ToolCallAccumulator }
  | { type: 'usage'; usage: Usage }
  | { type: 'finish'; reason: string | null }

export type OpenRouterStreamResult = {
  text: string
  toolCalls: ToolCallAccumulator[]
  finishReason: string | null
  usage: Usage | null
}

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

export class OpenRouterError extends Error {
  status: number
  code?: number | string
  upstreamMessage?: string
  constructor(opts: {
    status: number
    code?: number | string
    upstreamMessage?: string
    message: string
  }) {
    super(opts.message)
    this.name = 'OpenRouterError'
    this.status = opts.status
    this.code = opts.code
    this.upstreamMessage = opts.upstreamMessage
  }
}

function parseOpenRouterErrorBody(body: string): {
  code?: number | string
  message?: string
} {
  if (!body) return {}
  try {
    const parsed = JSON.parse(body) as {
      error?: { code?: number | string; message?: string }
    }
    if (parsed?.error) {
      return { code: parsed.error.code, message: parsed.error.message }
    }
  } catch {
    // not JSON — fall through
  }
  return { message: body.slice(0, 300) }
}

export async function* streamOpenRouter(opts: {
  apiKey: string
  models: string[]
  messages: ChatMessage[]
  tools: unknown[]
  signal?: AbortSignal
  referer?: string
  title?: string
}): AsyncGenerator<StreamEvent, OpenRouterStreamResult, void> {
  if (opts.models.length === 0) {
    throw new Error('streamOpenRouter requires at least one model.')
  }
  // OpenRouter routing: send `model` as the primary, plus `models` (fallback
  // list) so the gateway cascades to the next free model if one is rate-limited
  // or unavailable. See https://openrouter.ai/docs/features/model-routing.
  const [primary, ...fallbacks] = opts.models
  const res = await fetch(OPENROUTER_URL, {
    method: 'POST',
    signal: opts.signal,
    headers: {
      Authorization: `Bearer ${opts.apiKey}`,
      'Content-Type': 'application/json',
      ...(opts.referer ? { 'HTTP-Referer': opts.referer } : {}),
      ...(opts.title ? { 'X-Title': opts.title } : {})
    },
    body: JSON.stringify({
      model: primary,
      ...(fallbacks.length > 0
        ? { models: opts.models, route: 'fallback' }
        : {}),
      messages: opts.messages,
      tools: opts.tools,
      stream: true,
      stream_options: { include_usage: true },
      temperature: 0.4
    })
  })

  if (!res.ok || !res.body) {
    const errBody = await res.text().catch(() => '')
    const parsed = parseOpenRouterErrorBody(errBody)
    throw new OpenRouterError({
      status: res.status,
      code: parsed.code,
      upstreamMessage: parsed.message,
      message: parsed.message ?? res.statusText ?? 'Unknown OpenRouter error.'
    })
  }

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  const toolAcc = new Map<number, ToolCallAccumulator>()
  let textOut = ''
  let finishReason: string | null = null
  let usage: Usage | null = null

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    let nl: number
    while ((nl = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, nl).trim()
      buffer = buffer.slice(nl + 1)
      if (!line || !line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (data === '[DONE]') {
        for (const call of toolAcc.values()) {
          yield { type: 'tool_call_complete', call }
        }
        if (usage) yield { type: 'usage', usage }
        yield { type: 'finish', reason: finishReason }
        return {
          text: textOut,
          toolCalls: [...toolAcc.values()],
          finishReason,
          usage
        }
      }

      let chunk: {
        choices?: Array<{
          delta?: {
            content?: string | null
            tool_calls?: Array<{
              index: number
              id?: string
              function?: { name?: string; arguments?: string }
            }>
          }
          finish_reason?: string | null
        }>
        usage?: Partial<Usage> | null
        error?: { code?: number | string; message?: string }
      }
      try {
        chunk = JSON.parse(data)
      } catch {
        continue
      }

      // OpenRouter can emit a terminal error chunk mid-stream (e.g. all
      // upstream models failed after fallback). Treat it like an HTTP error.
      if (chunk.error) {
        throw new OpenRouterError({
          status: 0,
          code: chunk.error.code,
          upstreamMessage: chunk.error.message,
          message: chunk.error.message ?? 'OpenRouter returned a stream error.'
        })
      }

      if (chunk.usage) {
        usage = {
          prompt_tokens: chunk.usage.prompt_tokens ?? 0,
          completion_tokens: chunk.usage.completion_tokens ?? 0,
          total_tokens:
            chunk.usage.total_tokens ??
            (chunk.usage.prompt_tokens ?? 0) +
              (chunk.usage.completion_tokens ?? 0)
        }
      }

      const choice = chunk.choices?.[0]
      if (!choice) continue

      const delta = choice.delta
      if (delta?.content) {
        textOut += delta.content
        yield { type: 'text', delta: delta.content }
      }
      if (delta?.tool_calls) {
        for (const tc of delta.tool_calls) {
          const idx = tc.index
          let acc = toolAcc.get(idx)
          if (!acc) {
            acc = { id: tc.id ?? '', name: '', arguments: '' }
            toolAcc.set(idx, acc)
          }
          if (tc.id && !acc.id) acc.id = tc.id
          if (tc.function?.name) acc.name += tc.function.name
          if (tc.function?.arguments) acc.arguments += tc.function.arguments
        }
      }
      if (choice.finish_reason) finishReason = choice.finish_reason
    }
  }

  for (const call of toolAcc.values()) {
    yield { type: 'tool_call_complete', call }
  }
  if (usage) yield { type: 'usage', usage }
  yield { type: 'finish', reason: finishReason }
  return {
    text: textOut,
    toolCalls: [...toolAcc.values()],
    finishReason,
    usage
  }
}
