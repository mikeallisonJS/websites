import { Client } from '@neondatabase/serverless'
import { sql } from '@vercel/postgres'
import { drizzle as drizzleLocal } from 'drizzle-orm/neon-serverless'
import { drizzle } from 'drizzle-orm/vercel-postgres'

import * as schema from './schema'

const isProd = process.env.NODE_ENV === 'production'

export const db = isProd
  ? drizzle(sql, { schema })
  : drizzleLocal(new Client('postgres://postgres:postgres@db/postgres'), {
      schema
    })

export { schema }
