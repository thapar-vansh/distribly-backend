import { distribly } from '@schema/schema'
import { bigint, text, timestamp, uuid } from 'drizzle-orm/pg-core'
import { usersInDistribly } from '@schema/tables/users'

export const postStatusEnum = distribly.enum('post_status', [
  'draft',
  'scheduled',
  'published',
  'failed',
])

export const postsInDistribly = distribly.table('posts', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  userId: bigint('user_id', { mode: 'number' })
    .notNull()
    .references(() => usersInDistribly.id),
  caption: text('caption'),
  url: text('url'),
  status: postStatusEnum('status').notNull().default('draft'),
  scheduledAt: timestamp('scheduled_at', { withTimezone: true }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
})
