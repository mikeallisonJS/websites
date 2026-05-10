'use client'

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent
} from 'react'

const SPINNER_FRAMES = ['✢', '✳', '✶', '✻', '✸', '✳', '✶', '✻']
const THINKING_VERBS = [
  'Thinking',
  'Pondering',
  'Mulling',
  'Cogitating',
  'Hatching',
  'Plotting',
  'Brewing',
  'Considering',
  'Deliberating',
  'Musing',
  'Ruminating',
  'Reasoning',
  'Synthesizing',
  'Percolating',
  'Marinating',
  'Computing',
  'Cooking',
  'Crunching'
]

type ToolCallEntry = {
  id: string
  name: string
  arguments: Record<string, unknown>
  result?: string
}

type Turn =
  | { kind: 'user'; id: string; content: string }
  | {
      kind: 'assistant'
      id: string
      content: string
      toolCalls: ToolCallEntry[]
      streaming: boolean
      error?: string
    }

type Usage = {
  prompt_tokens: number
  completion_tokens: number
  total_tokens: number
}

type SseEvent =
  | { type: 'text'; delta: string }
  | { type: 'tool_call'; id: string; name: string; arguments: Record<string, unknown> }
  | { type: 'tool_result'; id: string; name: string; content: string }
  | { type: 'usage'; usage: Usage }
  | { type: 'done'; finish?: string | null; warning?: string }
  | { type: 'error'; message: string }

function formatTokens(n: number) {
  if (n < 1000) return String(n)
  if (n < 10_000) return `${(n / 1000).toFixed(1)}k`
  return `${Math.round(n / 1000)}k`
}

const SUGGESTIONS = [
  'what has Mike built?',
  'tell me about NextSteps',
  'what is Mike’s stack?',
  'how do I contact Mike?'
]

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

function summarizeArgs(args: Record<string, unknown>) {
  const entries = Object.entries(args)
  if (entries.length === 0) return ''
  return entries
    .map(([k, v]) => `${k}=${typeof v === 'string' ? `"${v}"` : JSON.stringify(v)}`)
    .join(' ')
}

function renderInlineLinks(text: string) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g)
  return parts.map((part, i) => {
    const key = `${i}:${part.slice(0, 24)}`
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={key}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[color:var(--polar-blue)] underline-offset-2 hover:underline"
        >
          {part}
        </a>
      )
    }
    return <span key={key}>{part}</span>
  })
}

export function AgentTerminal() {
  const [turns, setTurns] = useState<Turn[]>([])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [usage, setUsage] = useState<Usage>({
    prompt_tokens: 0,
    completion_tokens: 0,
    total_tokens: 0
  })
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [turns])

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  const transcript = useMemo(
    () =>
      turns
        .filter((t) => t.kind === 'user' || t.kind === 'assistant')
        .map((t) =>
          t.kind === 'user'
            ? { role: 'user' as const, content: t.content }
            : { role: 'assistant' as const, content: t.content }
        ),
    [turns]
  )

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim()
      if (!text || busy) return

      const userTurn: Turn = { kind: 'user', id: uid(), content: text }
      const assistantTurn: Turn = {
        kind: 'assistant',
        id: uid(),
        content: '',
        toolCalls: [],
        streaming: true
      }
      setTurns((prev) => [...prev, userTurn, assistantTurn])
      setInput('')
      setBusy(true)

      const controller = new AbortController()
      abortRef.current = controller

      try {
        const res = await fetch('/api/agent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            messages: [...transcript, { role: 'user', content: text }]
          })
        })

        if (!res.ok || !res.body) {
          const errBody = await res.text().catch(() => '')
          let message = `Request failed (${res.status})`
          try {
            const parsed = JSON.parse(errBody)
            if (parsed?.error) message = parsed.error
          } catch {
            if (errBody) message = errBody
          }
          throw new Error(message)
        }

        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''

        const updateAssistant = (
          fn: (
            t: Extract<Turn, { kind: 'assistant' }>
          ) => Extract<Turn, { kind: 'assistant' }>
        ) =>
          setTurns((prev) =>
            prev.map((t) =>
              t.id === assistantTurn.id && t.kind === 'assistant' ? fn(t) : t
            )
          )

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          buffer += decoder.decode(value, { stream: true })
          let nl: number
          while ((nl = buffer.indexOf('\n\n')) !== -1) {
            const block = buffer.slice(0, nl).trim()
            buffer = buffer.slice(nl + 2)
            if (!block.startsWith('data:')) continue
            const data = block.slice(5).trim()
            if (!data) continue
            let event: SseEvent
            try {
              event = JSON.parse(data) as SseEvent
            } catch {
              continue
            }
            if (event.type === 'text') {
              updateAssistant((t) => ({ ...t, content: t.content + event.delta }))
            } else if (event.type === 'tool_call') {
              updateAssistant((t) => ({
                ...t,
                toolCalls: [
                  ...t.toolCalls,
                  {
                    id: event.id,
                    name: event.name,
                    arguments: event.arguments
                  }
                ]
              }))
            } else if (event.type === 'tool_result') {
              updateAssistant((t) => ({
                ...t,
                toolCalls: t.toolCalls.map((c) =>
                  c.id === event.id ? { ...c, result: event.content } : c
                )
              }))
            } else if (event.type === 'usage') {
              setUsage((prev) => ({
                prompt_tokens: prev.prompt_tokens + event.usage.prompt_tokens,
                completion_tokens:
                  prev.completion_tokens + event.usage.completion_tokens,
                total_tokens: prev.total_tokens + event.usage.total_tokens
              }))
            } else if (event.type === 'error') {
              updateAssistant((t) => ({
                ...t,
                streaming: false,
                error: event.message
              }))
            } else if (event.type === 'done') {
              updateAssistant((t) => ({
                ...t,
                streaming: false,
                error: event.warning
              }))
            }
          }
        }

        updateAssistant((t) => ({ ...t, streaming: false }))
      } catch (err) {
        const message =
          err instanceof DOMException && err.name === 'AbortError'
            ? 'Cancelled.'
            : err instanceof Error
              ? err.message
              : String(err)
        setTurns((prev) =>
          prev.map((t) =>
            t.id === assistantTurn.id && t.kind === 'assistant'
              ? { ...t, streaming: false, error: message }
              : t
          )
        )
      } finally {
        setBusy(false)
        abortRef.current = null
        inputRef.current?.focus()
      }
    },
    [busy, transcript]
  )

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    void send(input)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape' && busy) {
      e.preventDefault()
      abortRef.current?.abort()
    }
  }

  useEffect(() => {
    if (!busy) return
    const onWindowKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') abortRef.current?.abort()
    }
    window.addEventListener('keydown', onWindowKey)
    return () => window.removeEventListener('keydown', onWindowKey)
  }, [busy])

  return (
    <div className="mx-auto flex min-h-0 w-full max-w-[80rem] flex-1 flex-col overflow-hidden rounded-2xl border border-[color:var(--subtle-gray)] bg-black/50 text-left shadow-[0_0_60px_-20px_rgba(140,147,251,0.5)] backdrop-blur-md">
      {/* Titlebar */}
      <div className="relative flex items-center border-b border-[color:var(--subtle-gray)] bg-black/50 px-4 py-2.5 font-mono text-xs">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
        </div>
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[color:var(--ui-gray)]">
          <span className="text-[color:var(--polar-blue)]">mikeallison</span>
          <span className="text-[color:var(--neon-green)]">JS</span>
        </span>
        <span
          className="ml-auto flex items-center gap-2 text-[color:var(--muted-text)]"
          title={`${usage.prompt_tokens} in / ${usage.completion_tokens} out / ${usage.total_tokens} total tokens`}
        >
          <span className="hidden items-center gap-1 sm:inline-flex">
            <span className="text-[color:var(--cosmic-violet)]">↑</span>
            {formatTokens(usage.prompt_tokens)}
          </span>
          <span className="hidden items-center gap-1 sm:inline-flex">
            <span className="text-[color:var(--neon-green)]">↓</span>
            {formatTokens(usage.completion_tokens)}
          </span>
          <span className="sm:hidden">{formatTokens(usage.total_tokens)} tok</span>
        </span>
      </div>

      {/* Transcript */}
      <div
        ref={scrollRef}
        className="flex flex-1 min-h-0 flex-col gap-3 overflow-y-auto px-4 py-4 font-mono text-[13px] leading-relaxed"
      >
        {turns.length === 0 && (
          <div className="space-y-1.5 text-[color:var(--ui-gray)]">
            <Line type="info">
              welcome to <span className="text-[color:var(--polar-blue)]">mikeallison</span>
              <span className="text-[color:var(--neon-green)]">JS</span>
            </Line>
            <Line type="info">
              ask the agent anything about Mike — projects, jobs, skills, contact
            </Line>
            <Line type="hint">try one of the suggestions below ↓</Line>
          </div>
        )}

        {turns.map((turn) =>
          turn.kind === 'user' ? (
            <UserLine key={turn.id} content={turn.content} />
          ) : (
            <AssistantBlock key={turn.id} turn={turn} />
          )
        )}
      </div>

      {/* Suggestions */}
      {turns.length === 0 && (
        <div className="flex flex-wrap gap-1.5 border-t border-[color:var(--subtle-gray)] bg-black/30 px-4 py-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => void send(s)}
              disabled={busy}
              className="rounded-full border border-[color:var(--subtle-gray)] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-[color:var(--cosmic-violet)] transition-colors hover:border-[color:var(--cosmic-violet)]/60 hover:bg-white/[0.06] disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={onSubmit}
        className="flex items-center gap-2 border-t border-[color:var(--subtle-gray)] bg-black/50 px-4 py-3 font-mono text-sm"
      >
        <span className="text-[color:var(--cosmic-violet)]">~</span>
        <span className="text-[color:var(--neon-green)]">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={
            busy ? '' : 'ask about Mike — projects, jobs, skills'
          }
          disabled={busy}
          className="flex-1 bg-transparent text-[color:var(--ghost-white)] placeholder:text-[color:var(--muted-text)] focus:outline-none disabled:opacity-60"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  )
}

function Line({
  type,
  children
}: {
  type: 'info' | 'hint'
  children: React.ReactNode
}) {
  const color =
    type === 'info' ? 'text-[color:var(--ui-gray)]' : 'text-[color:var(--muted-text)]'
  return (
    <div className={`flex gap-2 ${color}`}>
      <span className="text-[color:var(--neon-green)]">$</span>
      <span>{children}</span>
    </div>
  )
}

function UserLine({ content }: { content: string }) {
  return (
    <div className="flex gap-2 text-[color:var(--ghost-white)]">
      <span className="text-[color:var(--cosmic-violet)]">~</span>
      <span className="text-[color:var(--neon-green)]">$</span>
      <span className="whitespace-pre-wrap break-words">{content}</span>
    </div>
  )
}

function ThinkingIndicator() {
  const [frame, setFrame] = useState(0)
  const [verbIdx, setVerbIdx] = useState(() =>
    Math.floor(Math.random() * THINKING_VERBS.length)
  )
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const spinner = window.setInterval(
      () => setFrame((f) => (f + 1) % SPINNER_FRAMES.length),
      120
    )
    const verb = window.setInterval(
      () => setVerbIdx((i) => (i + 1) % THINKING_VERBS.length),
      3500
    )
    const tick = window.setInterval(
      () => setElapsed(Math.floor((Date.now() - start) / 1000)),
      1000
    )
    return () => {
      window.clearInterval(spinner)
      window.clearInterval(verb)
      window.clearInterval(tick)
    }
  }, [])

  return (
    <div className="flex items-center gap-2">
      <span
        aria-hidden
        className="inline-block w-3 text-center text-[color:var(--cosmic-violet)]"
      >
        {SPINNER_FRAMES[frame]}
      </span>
      <span className="text-[color:var(--polar-blue)]">
        {THINKING_VERBS[verbIdx]}
        <span className="ml-0.5 text-[color:var(--ui-gray)]">…</span>
      </span>
      <span className="text-[color:var(--muted-text)]">
        ({elapsed}s · esc to interrupt)
      </span>
    </div>
  )
}

function AssistantBlock({
  turn
}: {
  turn: Extract<Turn, { kind: 'assistant' }>
}) {
  const showThinking = turn.streaming && !turn.content
  return (
    <div className="space-y-2">
      {turn.toolCalls.map((call) => (
        <ToolCallView key={call.id} call={call} />
      ))}
      {showThinking && <ThinkingIndicator />}
      {turn.content && (
        <div className="whitespace-pre-wrap break-words text-[color:var(--faded-silver)]">
          {renderInlineLinks(turn.content)}
          {turn.streaming && (
            <span
              className="cursor-blink ml-0.5 inline-block h-3 w-[0.4em] translate-y-[2px] bg-[color:var(--neon-green)] align-baseline"
              aria-hidden
            />
          )}
        </div>
      )}
      {turn.error && (
        <div className="flex gap-2 text-[color:var(--muted-text)]">
          <span className="text-red-400">!</span>
          <span>{turn.error}</span>
        </div>
      )}
    </div>
  )
}

function ToolCallView({ call }: { call: ToolCallEntry }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-md border border-[color:var(--subtle-gray)] bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-2.5 py-1.5 text-left text-[12px] text-[color:var(--ui-gray)] hover:bg-white/[0.03]"
      >
        <span className="text-[color:var(--cosmic-violet)]">⏵</span>
        <span className="text-[color:var(--polar-blue)]">{call.name}</span>
        <span className="truncate text-[color:var(--muted-text)]">
          {summarizeArgs(call.arguments)}
        </span>
        <span className="ml-auto text-[10px] uppercase tracking-wider text-[color:var(--muted-text)]">
          {call.result ? 'done' : 'running'}
        </span>
      </button>
      {open && call.result && (
        <pre className="max-h-48 overflow-auto border-t border-[color:var(--subtle-gray)] bg-black/40 px-2.5 py-2 text-[11px] text-[color:var(--ui-gray)]">
          {call.result}
        </pre>
      )}
    </div>
  )
}
