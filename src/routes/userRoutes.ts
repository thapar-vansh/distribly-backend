import { Router } from 'express'
import { UserController } from '@controllers/userController'

const router = Router()

// Create a new user
router.post('/', UserController.createUser)

// Get all users
router.get('/', UserController.getAllUsers)

// Get user by ID
router.get('/:id', UserController.getUserById)

// Update user
router.put('/:id', UserController.updateUser)

// Delete user
router.delete('/:id', UserController.deleteUser)

// Deactivate user
router.patch('/:id/deactivate', UserController.deactivateUser)

export default router
