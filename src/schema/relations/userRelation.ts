import { relations } from 'drizzle-orm'
import { usersInDistribly } from '@schema/tables/users'
import { postsInDistribly } from '@schema/tables/posts'

export const usersRelations = relations(usersInDistribly, ({ many }) => ({
  posts: many(postsInDistribly),
}))
