import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { ContentPage } from '@/components/content-page'
import { JsonLd } from '@/components/structured-data'
import { getResume } from '@/lib/content'
import { Markdown } from '@/lib/markdown'
import { breadcrumbSchema, personSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Resume',
  description: `The full resume / CV of ${site.author}, ${site.jobTitle} — skills, career history, certifications, and education.`,
  alternates: { canonical: '/resume' }
}

export default async function ResumePage() {
  const resume = await getResume()
  if (!resume) notFound()

  // The page <h1> already states the name; drop the body's leading H1 so the
  // document outline stays clean.
  const body = resume.body.replace(/^#\s+.*\n+/, '')

  return (
    <>
      <JsonLd data={personSchema()} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Resume', path: '/resume' }
        ])}
      />
      <ContentPage
        eyebrow={resume.name}
        title="Resume"
        lead={resume.focus ?? resume.title}
      >
        <Markdown content={body} headingOffset={0} />
      </ContentPage>
    </>
  )
}
