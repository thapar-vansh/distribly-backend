import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as dotenv from 'dotenv'
import * as schema from '@schema'

dotenv.config()

interface DatabaseConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
  max: number
  idleTimeout: number
  connectionTimeout: number
}

export const dbConfig: DatabaseConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'distribly',
  max: 10,
  idleTimeout: 20,
  connectionTimeout: 10,
}

const client = postgres(dbConfig)
export const db = drizzle(client, { schema })

export default db
