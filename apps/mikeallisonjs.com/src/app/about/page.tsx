import Link from 'next/link'

import type { Metadata } from 'next'

import { ContentPage } from '@/components/content-page'
import { JsonLd } from '@/components/structured-data'
import { personSchema, profilePageSchema, websiteSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'About',
  description: site.description,
  alternates: { canonical: '/about' }
}

/** Question/answer pairs double as crawlable copy and an FAQPage rich result. */
const faqs = [
  {
    q: 'Who is Mike Allison?',
    a: `Mike Allison is a ${site.jobTitle} with 25+ years of professional full-stack software experience. He has built and architected products across EdTech, healthcare, contract management, global non-profits, and music software.`
  },
  {
    q: 'What technologies does Mike Allison specialize in?',
    a: 'Full-stack TypeScript and JavaScript — Next.js (App Router), React, Angular, and Node.js on the front and back end, federated GraphQL APIs, and infrastructure on AWS, Vercel, and Terraform. Lately he focuses on AI-augmented product surfaces and developer tooling.'
  },
  {
    q: 'Is Mike Allison available for new projects?',
    a: `Yes — Mike takes on select engagements and responds to every serious inquiry. The fastest way to reach him is email at ${site.email}.`
  },
  {
    q: 'How can I contact Mike Allison?',
    a: `Email ${site.email} or find him on GitHub at github.com/mikeallisonJS.`
  }
]

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }))
}

export default function AboutPage() {
  return (
    <>
      <JsonLd data={[personSchema(), websiteSchema(), profilePageSchema()]} />
      <JsonLd data={faqSchema} />
      <ContentPage
        eyebrow="About"
        title="Mike Allison"
        lead={`${site.jobTitle} · ${site.location}`}
      >
        <div className="text-[15px] leading-relaxed text-[color:var(--ui-gray)] md:text-base">
          <p className="my-4">
            I&apos;m a web application architect and lead developer with{' '}
            <strong className="font-semibold text-[color:var(--faded-silver)]">
              25+ years
            </strong>{' '}
            of professional software experience — end-to-end full-stack across
            architecture, framework and API design, single-page applications,
            dynamic content rendering, and performance optimization.
          </p>
          <p className="my-4">
            My career spans EdTech, healthcare, contract management, a global
            non-profit, and music software, with deep operational experience on
            AWS, Vercel, and Terraform. Most recently I&apos;ve focused on
            AI-augmented product surfaces and developer tooling — including the
            agent that powers the homepage of this site.
          </p>

          <h2 className="mt-10 mb-3 text-2xl font-semibold tracking-tight text-[color:var(--ghost-white)]">
            What I work with
          </h2>
          <ul className="my-4 flex flex-wrap gap-2">
            {site.knowsAbout.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-[color:var(--subtle-gray)] bg-white/[0.03] px-3 py-1 font-mono text-xs text-[color:var(--cosmic-violet)]"
              >
                {skill}
              </li>
            ))}
          </ul>

          <h2 className="mt-10 mb-4 text-2xl font-semibold tracking-tight text-[color:var(--ghost-white)]">
            Frequently asked
          </h2>
          <dl className="space-y-6">
            {faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-semibold text-[color:var(--faded-silver)]">
                  {f.q}
                </dt>
                <dd className="mt-1 leading-relaxed text-[color:var(--ui-gray)]">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3 font-mono text-sm">
            <Link
              href="/resume"
              className="rounded-md border border-[color:var(--subtle-gray)] px-4 py-2 text-[color:var(--polar-blue)] transition-colors hover:border-[color:var(--polar-blue)]/50"
            >
              Read the full resume →
            </Link>
            <Link
              href="/projects"
              className="rounded-md border border-[color:var(--subtle-gray)] px-4 py-2 text-[color:var(--polar-blue)] transition-colors hover:border-[color:var(--polar-blue)]/50"
            >
              See projects →
            </Link>
          </div>
        </div>
      </ContentPage>
    </>
  )
}
