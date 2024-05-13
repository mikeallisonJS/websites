import { sql } from '@vercel/postgres'
import { drizzle } from 'drizzle-orm/vercel-postgres'

// eslint-disable-next-line import/no-namespace
import * as schema from './schema'

export const db = drizzle(sql, { schema })
