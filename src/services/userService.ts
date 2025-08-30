import { UserDB } from '@db/user'
import { type usersInDistribly } from '@schema/tables/users'
import { logger } from '@utils/logger'

export class UserService {
  static async createUser(
    userData: typeof usersInDistribly.$inferInsert
  ): Promise<typeof usersInDistribly.$inferSelect> {
    try {
      // Check if user already exists
      const existingUser = await UserDB.findByEmail(userData.email)
      if (existingUser) {
        throw new Error('User with this email already exists')
      }

      const existingUsername = await UserDB.findByUsername(userData.username)
      if (existingUsername) {
        throw new Error('Username already taken')
      }

      // Hash password (in real app, you'd use bcrypt)
      // const hashedPassword = await bcrypt.hash(userData.password, 10);

      const user = await UserDB.create({
        ...userData,
        // password: hashedPassword,
      })

      logger.info(`User created successfully: ${user.email}`)
      return user
    } catch (error) {
      logger.error(`Error creating user: ${error}`)
      throw error
    }
  }

  static async getUserById(
    id: number
  ): Promise<typeof usersInDistribly.$inferSelect | null> {
    try {
      const user = await UserDB.findById(id)
      if (!user) {
        logger.warn(`User not found with ID: ${id}`)
        return null
      }
      return user
    } catch (error) {
      logger.error(`Error fetching user by ID: ${error}`)
      throw error
    }
  }

  static async getAllUsers(): Promise<
    (typeof usersInDistribly.$inferSelect)[]
  > {
    try {
      const users = await UserDB.findAll()
      logger.info(`Retrieved ${users.length} users`)
      return users
    } catch (error) {
      logger.error(`Error fetching all users: ${error}`)
      throw error
    }
  }

  static async updateUser(
    id: number,
    userData: Partial<typeof usersInDistribly.$inferInsert>
  ): Promise<typeof usersInDistribly.$inferSelect | null> {
    try {
      const user = await UserDB.update(id, userData)
      if (!user) {
        logger.warn(`User not found for update with ID: ${id}`)
        return null
      }
      logger.info(`User updated successfully: ${user.email}`)
      return user
    } catch (error) {
      logger.error(`Error updating user: ${error}`)
      throw error
    }
  }

  static async deleteUser(id: number): Promise<boolean> {
    try {
      const deleted = await UserDB.delete(id)
      if (deleted) {
        logger.info(`User deleted successfully with ID: ${id}`)
      } else {
        logger.warn(`User not found for deletion with ID: ${id}`)
      }
      return deleted
    } catch (error) {
      logger.error(`Error deleting user: ${error}`)
      throw error
    }
  }

  static async deactivateUser(
    id: number
  ): Promise<typeof usersInDistribly.$inferSelect | null> {
    try {
      const user = await UserDB.deactivateUser(id)
      if (!user) {
        logger.warn(`User not found for deactivation with ID: ${id}`)
        return null
      }
      logger.info(`User deactivated successfully: ${user.email}`)
      return user
    } catch (error) {
      logger.error(`Error deactivating user: ${error}`)
      throw error
    }
  }
}
