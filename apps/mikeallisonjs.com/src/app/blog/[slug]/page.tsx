import { notFound } from 'next/navigation'

import type { Metadata } from 'next'

import { ContentPage } from '@/components/content-page'
import { JsonLd } from '@/components/structured-data'
import { getAllPosts, getPost } from '@/lib/content'
import { Markdown } from '@/lib/markdown'
import { blogPostingSchema, breadcrumbSchema } from '@/lib/schema'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      publishedTime: post.date
    }
  }
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

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const body = post.body.replace(/^#\s+.*\n+/, '')

  return (
    <>
      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` }
        ])}
      />
      <ContentPage
        breadcrumb={{ href: '/blog', label: 'All posts' }}
        eyebrow={formatDate(post.date)}
        title={post.title}
        lead={post.description}
      >
        {post.tags.length > 0 && (
          <ul className="mb-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-[color:var(--subtle-gray)] bg-white/[0.03] px-3 py-1 font-mono text-xs text-[color:var(--cosmic-violet)]"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <Markdown content={body} headingOffset={0} />
      </ContentPage>
    </>
  )
}
