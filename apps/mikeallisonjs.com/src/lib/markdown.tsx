import Link from 'next/link'

import type { ReactNode } from 'react'

/**
 * A small, dependency-free markdown → semantic-HTML renderer for the
 * statically-rendered content pages. Unlike the agent terminal's div-based
 * renderer, this emits real <h2>/<p>/<ul>/<a> elements so search engines and
 * AI crawlers get a clean, indexable document outline.
 *
 * It supports the subset of markdown used in this repo's content: ATX
 * headings, unordered lists, blockquotes, horizontal rules, paragraphs (with
 * hard-wrapped soft breaks joined), and inline bold / italic / code / links /
 * bare URLs / emails.
 */

const LINK = 'text-[color:var(--polar-blue)] underline-offset-2 hover:underline'

const INLINE_PATTERN = new RegExp(
  [
    '`[^`]+`', // inline code
    '\\*\\*[^*]+\\*\\*', // bold
    '\\*(?!\\*)[^*]+\\*(?!\\*)', // italic *
    '_[^_]+_', // italic _
    '\\[[^\\]]+\\]\\((?:https?:\\/\\/|mailto:|\\/)[^)\\s]+\\)', // [label](url)
    'https?:\\/\\/[^\\s)>\\]]+', // bare url
    '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' // email
  ].join('|'),
  'g'
)

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  return text.split(INLINE_PATTERN).map((part, i) => {
    const key = `${keyPrefix}:${i}`
    if (!part) return null

    if (part.startsWith('`') && part.endsWith('`') && part.length > 2)
      return (
        <code
          key={key}
          className="rounded bg-[#1b1e20] px-[5px] py-0.5 font-mono text-[0.85em] text-[color:var(--neon-green)]"
        >
          {part.slice(1, -1)}
        </code>
      )

    if (part.startsWith('**') && part.endsWith('**') && part.length > 4)
      return (
        <strong key={key} className="font-semibold text-[color:var(--faded-silver)]">
          {part.slice(2, -2)}
        </strong>
      )

    if (/^[*_].+[*_]$/.test(part) && part.length > 2)
      return (
        <em key={key} className="italic">
          {part.slice(1, -1)}
        </em>
      )

    const mdLink = part.match(
      /^\[([^\]]+)\]\(((?:https?:\/\/|mailto:|\/)[^)\s]+)\)$/
    )
    if (mdLink) {
      const label = mdLink[1] ?? ''
      const href = mdLink[2] ?? '#'
      const external = /^https?:\/\//.test(href)
      return (
        <Link
          key={key}
          href={href}
          {...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
          className={LINK}
        >
          {label}
        </Link>
      )
    }

    if (/^https?:\/\//.test(part))
      return (
        <Link
          key={key}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK}
        >
          {part}
        </Link>
      )

    if (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(part))
      return (
        <a key={key} href={`mailto:${part}`} className={LINK}>
          {part}
        </a>
      )

    return <span key={key}>{part}</span>
  })
}

const HEADING_CLASSES: Record<number, string> = {
  1: 'mt-10 mb-4 text-3xl font-bold tracking-tight text-[color:var(--ghost-white)] first:mt-0',
  2: 'mt-10 mb-3 text-2xl font-semibold tracking-tight text-[color:var(--ghost-white)] first:mt-0',
  3: 'mt-8 mb-2 text-lg font-semibold text-[color:var(--faded-silver)] first:mt-0',
  4: 'mt-6 mb-1 text-base font-semibold text-[color:var(--faded-silver)] first:mt-0',
  5: 'mt-4 mb-1 text-sm font-semibold uppercase tracking-wider text-[color:var(--ui-gray)] first:mt-0',
  6: 'mt-4 mb-1 text-sm font-semibold uppercase tracking-wider text-[color:var(--ui-gray)] first:mt-0'
}

/**
 * @param content       Raw markdown (frontmatter already stripped).
 * @param headingOffset Demote headings by N levels so a `#` in the body sits
 *                       under the page's own <h1>. Defaults to 1.
 */
export function Markdown({
  content,
  headingOffset = 1
}: {
  content: string
  headingOffset?: number
}): ReactNode {
  const lines = content.split('\n')
  const out: ReactNode[] = []
  let i = 0
  let key = 0

  while (i < lines.length) {
    const line = lines[i] ?? ''

    if (line.trim() === '') {
      i++
      continue
    }

    // Horizontal rule
    if (/^\s*([-*_])\1{2,}\s*$/.test(line)) {
      out.push(
        <hr key={key++} className="my-8 border-[color:var(--subtle-gray)]" />
      )
      i++
      continue
    }

    // Heading
    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      const level = Math.min(6, heading[1]!.length + headingOffset)
      const Tag = `h${level}` as 'h2'
      out.push(
        <Tag key={key++} className={HEADING_CLASSES[level]}>
          {renderInline(heading[2] ?? '', `h${key}`)}
        </Tag>
      )
      i++
      continue
    }

    // Blockquote
    if (/^\s*>\s?/.test(line)) {
      const quote: string[] = []
      while (i < lines.length && /^\s*>\s?/.test(lines[i] ?? '')) {
        quote.push((lines[i] ?? '').replace(/^\s*>\s?/, ''))
        i++
      }
      out.push(
        <blockquote
          key={key++}
          className="my-6 border-l-2 border-[color:var(--polar-blue)] pl-4 italic text-[color:var(--ui-gray)]"
        >
          {renderInline(quote.join(' '), `q${key}`)}
        </blockquote>
      )
      continue
    }

    // Unordered list
    if (/^\s*[-*+]\s+/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i] ?? '')) {
        items.push((lines[i] ?? '').replace(/^\s*[-*+]\s+/, ''))
        i++
      }
      out.push(
        <ul
          key={key++}
          className="my-4 space-y-2 text-[color:var(--ui-gray)]"
        >
          {items.map((item, idx) => (
            <li key={idx} className="flex gap-2.5 leading-relaxed">
              <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-[color:var(--polar-blue)]" />
              <span>{renderInline(item, `li${key}:${idx}`)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Paragraph — gather consecutive plain lines and join soft wraps.
    const para: string[] = []
    while (i < lines.length) {
      const l = lines[i] ?? ''
      if (
        l.trim() === '' ||
        /^(#{1,6})\s+/.test(l) ||
        /^\s*[-*+]\s+/.test(l) ||
        /^\s*>\s?/.test(l) ||
        /^\s*([-*_])\1{2,}\s*$/.test(l)
      )
        break
      para.push(l.trim())
      i++
    }
    out.push(
      <p
        key={key++}
        className="my-4 leading-relaxed text-[color:var(--ui-gray)]"
      >
        {renderInline(para.join(' '), `p${key}`)}
      </p>
    )
  }

  return <div className="text-[15px] md:text-base">{out}</div>
}
