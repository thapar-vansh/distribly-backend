import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from '@routes'
import { config } from '@config/app'
import { logger } from '@utils/logger'

const app = express()

// Security middleware
app.use(helmet())

// CORS middleware
app.use(cors(config.cors))

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Request logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

// Routes
app.use(routes)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl,
  })
})

// Global error handler
app.use((error: Error, req: express.Request, res: express.Response) => {
  logger.error(`Global error handler: ${error.message}`)

  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: config.isDevelopment ? error.message : 'Something went wrong',
  })
})

// Start server
app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`)
  logger.info(`Environment: ${config.nodeEnv}`)
  logger.info(`Health check: http://localhost:${config.port}/health`)
})

export default app
