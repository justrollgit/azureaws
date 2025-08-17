import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import { PrismaClient } from '@prisma/client'
import authRoutes from './routes/auth'
import userRoutes from './routes/users'
import progressRoutes from './routes/progress'
import assessmentRoutes from './routes/assessment'

const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3002

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'AWS to Azure Transition Platform API',
    version: '1.0.0',
    frontend: process.env.FRONTEND_URL || 'http://localhost:3001',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      users: '/api/users',
      progress: '/api/progress',
      assessment: '/api/assessment'
    },
    timestamp: new Date().toISOString()
  })
})

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/assessment', assessmentRoutes)

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Global error handler:', err)
  
  // Don't leak sensitive information in production
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal server error',
      ...(isDevelopment && { stack: err.stack }),
      timestamp: new Date().toISOString()
    }
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: {
      message: `Route ${req.originalUrl} not found`,
      timestamp: new Date().toISOString()
    }
  })
})

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('Received SIGINT, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

process.on('SIGTERM', async () => {
  console.log('Received SIGTERM, shutting down gracefully...')
  await prisma.$disconnect()
  process.exit(0)
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🔗 Health check: http://localhost:${PORT}/health`)
})

export default app