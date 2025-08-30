import { Request, Response } from 'express'
import { UserService } from '@services/userService'
import { successMessages, errorMessages } from '@constants/global'
import { logger } from '@utils/logger'

export class UserController {
  static async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body
      const user = await UserService.createUser(userData)

      res.status(201).json({
        success: true,
        message: successMessages.created,
        data: user,
      })
    } catch (error) {
      logger.error(`Controller error creating user: ${error}`)
      res.status(400).json({
        success: false,
        message: errorMessages.failed,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  static async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id)
      const user = await UserService.getUserById(id)

      if (!user) {
        res.status(404).json({
          success: false,
          message: errorMessages.notFound,
          error: 'User not found',
        })
        return
      }

      res.status(200).json({
        success: true,
        message: successMessages.success,
        data: user,
      })
    } catch (error) {
      logger.error(`Controller error fetching user: ${error}`)
      res.status(500).json({
        success: false,
        message: errorMessages.failed,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  static async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers()

      res.status(200).json({
        success: true,
        message: successMessages.success,
        data: users,
        count: users.length,
      })
    } catch (error) {
      logger.error(`Controller error fetching all users: ${error}`)
      res.status(500).json({
        success: false,
        message: errorMessages.failed,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  static async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id)
      const userData = req.body
      const user = await UserService.updateUser(id, userData)

      if (!user) {
        res.status(404).json({
          success: false,
          message: errorMessages.notFound,
          error: 'User not found',
        })
        return
      }

      res.status(200).json({
        success: true,
        message: successMessages.updated,
        data: user,
      })
    } catch (error) {
      logger.error(`Controller error updating user: ${error}`)
      res.status(500).json({
        success: false,
        message: errorMessages.failed,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  static async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id)
      const deleted = await UserService.deleteUser(id)

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: errorMessages.notFound,
          error: 'User not found',
        })
        return
      }

      res.status(200).json({
        success: true,
        message: successMessages.deleted,
        data: { id },
      })
    } catch (error) {
      logger.error(`Controller error deleting user: ${error}`)
      res.status(500).json({
        success: false,
        message: errorMessages.failed,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }

  static async deactivateUser(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id)
      const user = await UserService.deactivateUser(id)

      if (!user) {
        res.status(404).json({
          success: false,
          message: errorMessages.notFound,
          error: 'User not found',
        })
        return
      }

      res.status(200).json({
        success: true,
        message: successMessages.updated,
        data: user,
      })
    } catch (error) {
      logger.error(`Controller error deactivating user: ${error}`)
      res.status(500).json({
        success: false,
        message: errorMessages.failed,
        error: error instanceof Error ? error.message : 'Unknown error',
      })
    }
  }
}
