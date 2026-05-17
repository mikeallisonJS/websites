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

const LINK_CLASSES =
  'text-[color:var(--polar-blue)] underline-offset-2 hover:underline'

function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(
    /(`[^`]+`|\*\*[^*]+\*\*|\*(?!\*)[^*]+\*(?!\*)|_[^_]+_|\[[^\]]+\]\((?:https?:\/\/|mailto:|\/)[^)\s]+\)|https?:\/\/[^\s)>\]]+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g
  )
  return parts.map((part, i) => {
    const key = `${i}:${part.slice(0, 16)}`
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2)
      return (
        <code key={key} className="rounded bg-[#1b1e20] px-[3px] py-px font-mono text-[12px] text-[color:var(--neon-green)]">
          {part.slice(1, -1)}
        </code>
      )
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4)
      return <strong key={key} className="font-bold text-[#eff0f1]">{part.slice(2, -2)}</strong>
    if (/^[*_]/.test(part) && part.length > 2)
      return <em key={key} className="italic text-[color:var(--faded-silver)]">{part.slice(1, -1)}</em>
    const mdLink = part.match(/^\[([^\]]+)\]\(((?:https?:\/\/|mailto:|\/)[^)\s]+)\)$/)
    if (mdLink) {
      const label = mdLink[1] ?? ''
      const href = mdLink[2] ?? '#'
      const external = /^https?:\/\//.test(href)
      return (
        <a
          key={key}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={LINK_CLASSES}
        >
          {label}
        </a>
      )
    }
    if (/^https?:\/\//.test(part))
      return (
        <a key={key} href={part} target="_blank" rel="noopener noreferrer" className={LINK_CLASSES}>
          {part}
        </a>
      )
    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part))
      return (
        <a key={key} href={`mailto:${part}`} className={LINK_CLASSES}>
          {part}
        </a>
      )
    return <span key={key}>{part}</span>
  })
}

function renderMarkdown(content: string, streaming: boolean): React.ReactNode {
  const lines = content.split('\n')
  return (
    <div className="break-words">
      {lines.map((line, i) => {
        const isLast = i === lines.length - 1
        const cursor = isLast && streaming
          ? <span className="cursor-blink ml-0.5 inline-block h-3 w-[0.4em] translate-y-[2px] bg-[color:var(--neon-green)] align-baseline" aria-hidden />
          : null

        if (line.startsWith('### '))
          return <div key={i} className="mt-1 font-semibold text-[color:var(--faded-silver)] first:mt-0">{renderInline(line.slice(4))}{cursor}</div>
        if (line.startsWith('## '))
          return <div key={i} className="mt-1.5 font-semibold text-[#eff0f1] first:mt-0">{renderInline(line.slice(3))}{cursor}</div>
        if (line.startsWith('# '))
          return <div key={i} className="mt-2 font-bold text-[#3daee9] first:mt-0">{renderInline(line.slice(2))}{cursor}</div>
        if (/^-{3,}$/.test(line.trim()))
          return <hr key={i} className="my-2 border-[#3d4248]" />
        const listMatch = line.match(/^(\s*)[-*] (.*)$/)
        if (listMatch) {
          const indent = listMatch[1] ?? ''
          const text = listMatch[2] ?? ''
          return (
            <div key={i} className="flex gap-2" style={{ paddingLeft: indent.length * 12 }}>
              <span className="shrink-0 text-[#3daee9]">›</span>
              <span>{renderInline(text)}{cursor}</span>
            </div>
          )
        }
        if (line.trim() === '')
          return <div key={i} className="h-2" />
        return <div key={i}>{renderInline(line)}{cursor}</div>
      })}
    </div>
  )
}

function useSpeech(onTranscript: (text: string) => void) {
  const [listening, setListening] = useState(false)
  const [supported, setSupported] = useState(false)
  const recogRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    setSupported(
      'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
    )
  }, [])

  const toggle = useCallback(() => {
    if (!supported) return
    if (listening) {
      recogRef.current?.stop()
      return
    }
    const SR = (window.SpeechRecognition ?? (window as unknown as { webkitSpeechRecognition: typeof SpeechRecognition }).webkitSpeechRecognition)
    const r = new SR()
    r.lang = 'en-US'
    r.interimResults = false
    r.maxAlternatives = 1
    r.onstart = () => setListening(true)
    r.onend = () => setListening(false)
    r.onerror = () => setListening(false)
    r.onresult = (e) => {
      const text = e.results[0]?.[0]?.transcript ?? ''
      if (text) onTranscript(text)
    }
    recogRef.current = r
    r.start()
  }, [listening, onTranscript, supported])

  useEffect(() => () => recogRef.current?.stop(), [])

  return { listening, supported, toggle }
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
  const [ttsEnabled, setTtsEnabled] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const [ttsSupported, setTtsSupported] = useState(false)

  useEffect(() => {
    setTtsSupported('speechSynthesis' in window)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
    setIsAtBottom(true)
  }, [turns])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () =>
      setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 40)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    return () => abortRef.current?.abort()
  }, [])

  useEffect(() => {
    if (!ttsEnabled || !ttsSupported) return
    const last = turns.at(-1)
    if (!last || last.kind !== 'assistant' || last.streaming || !last.content) return
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(last.content)
    window.speechSynthesis.speak(utt)
  }, [turns, ttsEnabled, ttsSupported])

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

      if (ttsSupported) window.speechSynthesis.cancel()
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

  const { listening, supported: speechSupported, toggle: toggleSpeech } = useSpeech(
    useCallback((text: string) => {
      const combined = (input ? `${input} ${text}` : text).trim()
      void send(combined)
    }, [input, send])
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
    <div className="mx-auto flex min-h-0 w-full max-w-[80rem] flex-1 flex-col overflow-hidden rounded-[6px] border border-[#3d4248] bg-[#232629] text-left shadow-[0_8px_32px_rgba(0,0,0,0.55)]">
      {/* Breeze title bar */}
      <div
        className="relative flex h-[30px] shrink-0 items-center px-2.5 font-mono text-[11px]"
        style={{
          background: 'linear-gradient(to bottom, #3b4045 0%, #31363b 100%)',
          borderBottom: '1px solid #2e3338',
        }}
      >
        <div className="flex gap-1.5">
          <span className="h-3 w-3 cursor-default rounded-full bg-[#3d4248] transition-colors hover:bg-[#da4453]" />
          <span className="h-3 w-3 cursor-default rounded-full bg-[#3d4248] transition-colors hover:bg-[#f67400]" />
          <span className="h-3 w-3 cursor-default rounded-full bg-[#3d4248] transition-colors hover:bg-[#27ae60]" />
        </div>
        <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 text-[#7f8c8d]">
          Agent —{' '}
          <span className="text-[color:var(--polar-blue)]">mikeallison</span>
          <span className="text-[color:var(--neon-green)]">JS</span>
        </span>
        <span
          className="ml-auto flex items-center gap-2 text-[#7f8c8d]"
          title={`${usage.prompt_tokens} in / ${usage.completion_tokens} out / ${usage.total_tokens} total tokens`}
        >
          <span className="hidden items-center gap-1 sm:inline-flex">
            <span className="text-[#3daee9]">↑</span>
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
        <div className="flex flex-wrap gap-1.5 border-t border-[#2e3338] bg-[#1e2226] px-4 py-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => void send(s)}
              disabled={busy}
              className="rounded-full border border-[#3d4248] bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-[#3daee9] transition-colors hover:border-[#3daee9]/50 hover:bg-white/[0.06] disabled:opacity-50"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="relative">
        {!isAtBottom && (
          <div className="pointer-events-none absolute -top-8 left-0 right-0 flex justify-center">
            <button
              type="button"
              onClick={() => {
                const el = scrollRef.current
                if (el) el.scrollTop = el.scrollHeight
              }}
              className="pointer-events-auto flex cursor-pointer items-center gap-1 rounded-full border border-[#3daee9]/40 bg-[#1b1e20]/90 px-3 py-1 font-mono text-[11px] text-[#3daee9] shadow-lg backdrop-blur-sm transition-colors hover:bg-[#1b1e20]"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" />
              </svg>
              scroll to end
            </button>
          </div>
        )}
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 border-t border-[#2e3338] bg-[#1e2226] px-4 py-3 font-mono text-sm"
        >
        <span className="text-[color:var(--cosmic-violet)]">~</span>
        <span className="text-[color:var(--neon-green)]">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={
            listening ? 'listening…' : busy ? '' : 'ask about Mike — projects, jobs, skills'
          }
          disabled={busy}
          className="flex-1 bg-transparent text-[color:var(--ghost-white)] placeholder:text-[color:var(--muted-text)] focus:outline-none disabled:opacity-60"
          autoComplete="off"
          spellCheck={false}
        />
        {speechSupported && (
          <button
            type="button"
            onClick={toggleSpeech}
            disabled={busy}
            aria-label={listening ? 'Stop listening' : 'Speak'}
            className="shrink-0 text-[color:var(--muted-text)] transition-colors hover:text-[color:var(--ghost-white)] disabled:opacity-40"
          >
            <svg
              className={`h-4 w-4 transition-colors ${listening ? 'animate-pulse text-[color:var(--neon-green)]' : ''}`}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 1a4 4 0 0 1 4 4v7a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm-1 18.93V22h2v-2.07A8.001 8.001 0 0 0 20 12h-2a6 6 0 0 1-12 0H4a8.001 8.001 0 0 0 7 7.93z" />
            </svg>
          </button>
        )}
        {ttsSupported && (
          <button
            type="button"
            onClick={() => {
              if (ttsEnabled) window.speechSynthesis.cancel()
              setTtsEnabled((v) => !v)
            }}
            aria-label={ttsEnabled ? 'Disable voice responses' : 'Enable voice responses'}
            className={`shrink-0 transition-colors hover:text-[color:var(--ghost-white)] ${ttsEnabled ? 'text-[#3daee9]' : 'text-[color:var(--muted-text)]'}`}
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              {ttsEnabled ? (
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z" />
              ) : (
                <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              )}
            </svg>
          </button>
        )}
      </form>
      </div>
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
        <div className="text-[color:var(--faded-silver)]">
          {renderMarkdown(turn.content, turn.streaming)}
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
  const resultId = `call-result-${call.id}`
  return (
    <div className="rounded-md border border-[color:var(--subtle-gray)] bg-white/[0.02]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={resultId}
        aria-label={`Toggle ${call.name} details`}
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
      {call.result && (
        <pre
          id={resultId}
          role="region"
          aria-label={`${call.name} result`}
          aria-hidden={!open}
          hidden={!open}
          className="max-h-48 overflow-auto border-t border-[color:var(--subtle-gray)] bg-black/40 px-2.5 py-2 text-[11px] text-[color:var(--ui-gray)]"
        >
          {call.result}
        </pre>
      )}
    </div>
  )
}
