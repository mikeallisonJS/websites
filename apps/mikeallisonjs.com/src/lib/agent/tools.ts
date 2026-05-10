import {
  getJob,
  listJobs,
  readResume,
  searchCorpus
} from './corpus'
import { getProject, listProjects } from './projects'

export type ToolCall = {
  id: string
  name: string
  arguments: Record<string, unknown>
}

export type ToolResult = {
  id: string
  name: string
  content: string
}

export const toolDefinitions = [
  {
    type: 'function' as const,
    function: {
      name: 'list_projects',
      description:
        "List every project in Mike Allison's portfolio. Returns slug, title, one-line description, and tags. Call this first when the visitor asks about Mike's work, projects, or anything you don't already know a slug for.",
      parameters: {
        type: 'object',
        properties: {},
        required: []
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'read_project',
      description:
        'Read the full record for a specific project by slug. Use after list_projects when you want details (stack, links, longer description). Slugs are stable identifiers like "freevstvault" or "nextsteps".',
      parameters: {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            description: 'The project slug, e.g. "freevstvault"'
          }
        },
        required: ['slug']
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'list_jobs',
      description:
        "List Mike Allison's past employers. Returns slug, company, role, and date range for each job.",
      parameters: { type: 'object', properties: {}, required: [] }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'read_job',
      description:
        'Read the full markdown record for a specific job/employer by slug. Use after list_jobs.',
      parameters: {
        type: 'object',
        properties: {
          slug: {
            type: 'string',
            description: 'The job slug, e.g. "jesusfilm"'
          }
        },
        required: ['slug']
      }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'read_resume',
      description:
        "Read Mike Allison's top-level resume / CV. Use for skills, summary, contact info, and overall career framing.",
      parameters: { type: 'object', properties: {}, required: [] }
    }
  },
  {
    type: 'function' as const,
    function: {
      name: 'search',
      description:
        "Full-text search across all of Mike's content (projects, jobs, resume). Returns ranked snippets with source + slug. Use when the visitor asks about a topic, technology, or keyword and you don't know which file holds the answer.",
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query, e.g. "graphql" or "edtech"'
          }
        },
        required: ['query']
      }
    }
  }
]

export async function executeTool(call: ToolCall): Promise<ToolResult> {
  const { id, name, arguments: args } = call
  try {
    switch (name) {
      case 'list_projects': {
        return { id, name, content: JSON.stringify(listProjects(), null, 2) }
      }
      case 'read_project': {
        const slug = String(args.slug ?? '')
        const project = getProject(slug)
        if (!project) {
          return {
            id,
            name,
            content: JSON.stringify({
              error: `No project with slug "${slug}". Call list_projects to see valid slugs.`
            })
          }
        }
        return { id, name, content: JSON.stringify(project, null, 2) }
      }
      case 'list_jobs': {
        const jobs = await listJobs()
        return { id, name, content: JSON.stringify(jobs, null, 2) }
      }
      case 'read_job': {
        const slug = String(args.slug ?? '')
        const job = await getJob(slug)
        if (!job) {
          return {
            id,
            name,
            content: JSON.stringify({
              error: `No job with slug "${slug}". Call list_jobs to see valid slugs.`
            })
          }
        }
        return {
          id,
          name,
          content: JSON.stringify(
            { slug: job.slug, frontmatter: job.frontmatter, body: job.body },
            null,
            2
          )
        }
      }
      case 'read_resume': {
        const resume = await readResume()
        return {
          id,
          name,
          content: resume ?? JSON.stringify({ error: 'resume.md not found' })
        }
      }
      case 'search': {
        const query = String(args.query ?? '')
        const results = await searchCorpus(query)
        return { id, name, content: JSON.stringify(results, null, 2) }
      }
      default:
        return {
          id,
          name,
          content: JSON.stringify({ error: `Unknown tool: ${name}` })
        }
    }
  } catch (err) {
    return {
      id,
      name,
      content: JSON.stringify({
        error: err instanceof Error ? err.message : String(err)
      })
    }
  }
}
