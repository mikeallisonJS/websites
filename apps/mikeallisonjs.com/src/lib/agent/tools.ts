import { tool, type ToolSet } from 'ai'
import { z } from 'zod'

import { getJob, listJobs, readResume, searchCorpus } from './corpus'
import { getProject, listProjects } from './projects'

// Tool executors return a string that is fed straight back to the model and
// streamed to the client as the tool result. Errors are caught and returned as
// a JSON error string (rather than thrown) so a single failing lookup never
// derails the agent's tool loop.
function jsonError(err: unknown): string {
  return JSON.stringify({
    error: err instanceof Error ? err.message : String(err)
  })
}

export const tools = {
  list_projects: tool({
    description:
      "List every project in Mike Allison's portfolio. Returns slug, title, one-line description, and tags. Call this first when the visitor asks about Mike's work, projects, or anything you don't already know a slug for.",
    inputSchema: z.object({}),
    execute: async () => {
      try {
        return JSON.stringify(listProjects(), null, 2)
      } catch (err) {
        return jsonError(err)
      }
    }
  }),
  read_project: tool({
    description:
      'Read the full record for a specific project by slug. Use after list_projects when you want details (stack, links, longer description). Slugs are stable identifiers like "freevstvault" or "nextsteps".',
    inputSchema: z.object({
      slug: z.string().describe('The project slug, e.g. "freevstvault"')
    }),
    execute: async ({ slug }) => {
      try {
        const project = getProject(slug)
        if (!project) {
          return JSON.stringify({
            error: `No project with slug "${slug}". Call list_projects to see valid slugs.`
          })
        }
        return JSON.stringify(project, null, 2)
      } catch (err) {
        return jsonError(err)
      }
    }
  }),
  list_jobs: tool({
    description:
      "List Mike Allison's past employers. Returns slug, company, role, and date range for each job.",
    inputSchema: z.object({}),
    execute: async () => {
      try {
        return JSON.stringify(await listJobs(), null, 2)
      } catch (err) {
        return jsonError(err)
      }
    }
  }),
  read_job: tool({
    description:
      'Read the full markdown record for a specific job/employer by slug. Use after list_jobs.',
    inputSchema: z.object({
      slug: z.string().describe('The job slug, e.g. "jesusfilm"')
    }),
    execute: async ({ slug }) => {
      try {
        const job = await getJob(slug)
        if (!job) {
          return JSON.stringify({
            error: `No job with slug "${slug}". Call list_jobs to see valid slugs.`
          })
        }
        return JSON.stringify(
          { slug: job.slug, frontmatter: job.frontmatter, body: job.body },
          null,
          2
        )
      } catch (err) {
        return jsonError(err)
      }
    }
  }),
  read_resume: tool({
    description:
      "Read Mike Allison's top-level resume / CV. Use for skills, summary, contact info, and overall career framing.",
    inputSchema: z.object({}),
    execute: async () => {
      try {
        const resume = await readResume()
        return resume ?? JSON.stringify({ error: 'resume.md not found' })
      } catch (err) {
        return jsonError(err)
      }
    }
  }),
  search: tool({
    description:
      "Full-text search across all of Mike's content (projects, jobs, resume). Returns ranked snippets with source + slug. Use when the visitor asks about a topic, technology, or keyword and you don't know which file holds the answer.",
    inputSchema: z.object({
      query: z.string().describe('The search query, e.g. "graphql" or "edtech"')
    }),
    execute: async ({ query }) => {
      try {
        return JSON.stringify(await searchCorpus(query), null, 2)
      } catch (err) {
        return jsonError(err)
      }
    }
  })
} satisfies ToolSet
