const services = [
  {
    key: 'web',
    label: 'Web Development',
    blurb: 'Production React, Next.js, and TypeScript apps end-to-end.'
  },
  {
    key: 'architecture',
    label: 'Enterprise Architecture',
    blurb:
      'Holistic systems design across services, data, and infrastructure.'
  },
  {
    key: 'startup',
    label: 'Scalable Start-up Solutions',
    blurb: 'From zero to product-market fit without rewrites.'
  },
  {
    key: 'ecommerce',
    label: 'E-commerce',
    blurb: 'Performant storefronts, payments, and conversion-tuned UX.'
  },
  {
    key: 'streaming',
    label: 'Live Video Streaming',
    blurb: 'Low-latency, scalable broadcast infrastructure.'
  },
  {
    key: 'monorepo',
    label: 'Org-wide Monorepos',
    blurb: 'Nx and Turborepo workspaces tuned for shipping.'
  }
]

export function Services() {
  return (
    <div className="container mx-auto max-w-6xl px-4 md:px-6">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start lg:gap-16">
        {/* Left: heading */}
        <div className="flex flex-col gap-5">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-[color:var(--ghost-white)] sm:text-5xl md:text-6xl">
            Tailored solutions for your business
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-[color:var(--ui-gray)] md:text-lg">
            Custom web development, enterprise infrastructure, scalable live
            video, organization-wide monorepos — and anything in between.
          </p>
        </div>

        {/* Right: code-block manifest */}
        <div className="overflow-hidden rounded-2xl border border-[color:var(--subtle-gray)] bg-black/40 shadow-[0_0_60px_-20px_rgba(140,147,251,0.35)] backdrop-blur-sm">
          {/* Titlebar */}
          <div className="flex items-center gap-2 border-b border-[color:var(--subtle-gray)] bg-black/40 px-4 py-2.5 font-mono text-xs">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[color:var(--subtle-gray)]" />
            </div>
            <span className="ml-2 text-[color:var(--ui-gray)]">
              services<span className="text-[color:var(--muted-text)]">.ts</span>
            </span>
          </div>

          {/* Code content */}
          <div className="grid grid-cols-[auto_1fr] gap-x-5 px-4 py-5 font-mono text-sm leading-relaxed sm:px-6">
            <CodeLine n={1}>
              <span className="text-[color:var(--cosmic-violet)]">export</span>{' '}
              <span className="text-[color:var(--cosmic-violet)]">const</span>{' '}
              <span className="text-[color:var(--polar-blue)]">services</span>{' '}
              <span className="text-[color:var(--ui-gray)]">=</span>{' '}
              <span className="text-[color:var(--faded-silver)]">[</span>
            </CodeLine>
            {services.map((s, i) => (
              <CodeLine key={s.key} n={i + 2}>
                <span className="ml-4 inline-flex items-start gap-2">
                  <CheckIcon className="mt-1 h-3.5 w-3.5 shrink-0 text-[color:var(--neon-green)]" />
                  <span>
                    <span className="text-[color:var(--polar-blue)]">
                      &apos;{s.key}&apos;
                    </span>
                    <span className="text-[color:var(--ui-gray)]">: </span>
                    <span className="text-[color:var(--faded-silver)]">
                      {s.label}
                    </span>
                    <span className="text-[color:var(--ui-gray)]">,</span>
                    <span className="ml-2 hidden text-[color:var(--muted-text)] sm:inline">
                      // {s.blurb}
                    </span>
                  </span>
                </span>
              </CodeLine>
            ))}
            <CodeLine n={services.length + 2}>
              <span className="text-[color:var(--faded-silver)]">]</span>
              <span className="text-[color:var(--ui-gray)]"> as </span>
              <span className="text-[color:var(--cosmic-violet)]">const</span>
            </CodeLine>
          </div>
        </div>
      </div>
    </div>
  )
}

function CodeLine({
  n,
  children
}: {
  n: number
  children: React.ReactNode
}) {
  return (
    <>
      <span className="select-none text-right text-[color:var(--muted-text)]">
        {String(n).padStart(2, ' ')}
      </span>
      <span className="text-[color:var(--faded-silver)]">{children}</span>
    </>
  )
}

function CheckIcon(props: { className?: string }) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
