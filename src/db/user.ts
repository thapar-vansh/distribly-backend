import { eq } from 'drizzle-orm'
import { db } from '@config/database'
import {
  type usersInDistribly,
  usersInDistribly as users,
} from '@schema/tables/users'

export class UserDB {
  static async create(
    userData: typeof usersInDistribly.$inferInsert
  ): Promise<typeof usersInDistribly.$inferSelect> {
    const [user] = await db.insert(users).values(userData).returning()
    return user
  }

  static async findById(
    id: number
  ): Promise<typeof usersInDistribly.$inferSelect | null> {
    const [user] = await db.select().from(users).where(eq(users.id, id))
    return user || null
  }

  static async findByEmail(
    email: string
  ): Promise<typeof usersInDistribly.$inferSelect | null> {
    const [user] = await db.select().from(users).where(eq(users.email, email))
    return user || null
  }

  static async findByUsername(
    username: string
  ): Promise<typeof usersInDistribly.$inferSelect | null> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
    return user || null
  }

  static async findAll(): Promise<(typeof usersInDistribly.$inferSelect)[]> {
    return await db.select().from(users)
  }

  static async update(
    id: number,
    userData: Partial<typeof usersInDistribly.$inferInsert>
  ): Promise<typeof usersInDistribly.$inferSelect | null> {
    const [user] = await db
      .update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
    return user || null
  }

  static async delete(id: number): Promise<boolean> {
    const result = await db.delete(users).where(eq(users.id, id))
    return result.length > 0
  }

  static async findActiveUsers(): Promise<
    (typeof usersInDistribly.$inferSelect)[]
  > {
    return await db.select().from(users).where(eq(users.isActive, true))
  }

  static async deactivateUser(
    id: number
  ): Promise<typeof usersInDistribly.$inferSelect | null> {
    const [user] = await db
      .update(users)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning()
    return user || null
  }
}
