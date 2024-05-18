import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/lib/drizzle/schema.ts',
  out: './src/lib/drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url:
      process.env.NODE_ENV === 'production'
        ? (process.env.POSTGRES_URL as string)
        : 'postgres://postgres:postgres@db:5432/postgres'
  }
})
