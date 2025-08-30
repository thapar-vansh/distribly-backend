import { postsInDistribly } from '@schema/tables/posts'
import { usersInDistribly } from '@schema/tables/users'
import { relations } from 'drizzle-orm'

export const postsRelations = relations(postsInDistribly, ({ one }) => ({
  user: one(usersInDistribly, {
    fields: [postsInDistribly.userId],
    references: [usersInDistribly.id],
  }),
}))
