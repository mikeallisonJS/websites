import Link from 'next/link'

import type { Metadata } from 'next'

import { ContentPage } from '@/components/content-page'
import { JsonLd } from '@/components/structured-data'
import { getAllPosts } from '@/lib/content'
import { breadcrumbSchema, itemListSchema } from '@/lib/schema'
import { site } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Blog',
  description: `Writing by ${site.author} on full-stack engineering, Next.js, AI integration, and shipping software.`,
  alternates: { canonical: '/blog' }
}

function formatDate(date: string): string {
  if (!date) return ''
  return new Date(`${date}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC'
  })
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  return (
    <>
      <JsonLd
        data={itemListSchema(
          'Blog posts',
          posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` }))
        )}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' }
        ])}
      />
      <ContentPage
        eyebrow="Writing"
        title="Blog"
        lead="Notes on full-stack engineering, Next.js, and building with AI."
      >
        {posts.length === 0 ? (
          <p className="text-[color:var(--ui-gray)]">
            No posts yet — check back soon.
          </p>
        ) : (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <p className="font-mono text-xs text-[color:var(--muted-text)]">
                    {formatDate(post.date)}
                  </p>
                  <h2 className="mt-1 text-xl font-semibold text-[color:var(--ghost-white)] group-hover:text-[color:var(--polar-blue)]">
                    {post.title}
                  </h2>
                  <p className="mt-1 leading-relaxed text-[color:var(--ui-gray)]">
                    {post.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </ContentPage>
    </>
  )
}
