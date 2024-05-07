import type { Config } from 'drizzle-kit'

export default {
  schema: './src/schema/*',
  out: './src/lib/drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.POSTGRES_URL_NON_POOLING as string
  }
} satisfies Config
