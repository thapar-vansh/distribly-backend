import { Router } from 'express'
import userRoutes from '@routes/userRoutes'

const router = Router()

// API version prefix
const API_VERSION = '/api/v1'

// User routes
router.use(`${API_VERSION}/users`, userRoutes)

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  })
})

export default router
