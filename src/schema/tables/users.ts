import { distribly } from '@schema/schema'
import { bigserial, boolean, text, timestamp } from 'drizzle-orm/pg-core'

export const usersInDistribly = distribly.table('users', {
  id: bigserial('id', { mode: 'number' }).primaryKey().notNull(),
  email: text('email').unique().notNull(),
  username: text('username').unique().notNull(),
  password: text('password').notNull(),
  name: text('name').notNull(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})
