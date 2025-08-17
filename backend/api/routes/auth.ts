import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const router = express.Router()
const prisma = new PrismaClient()

// Validation schemas
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  awsExperience: z.enum(['beginner', 'intermediate', 'advanced']),
  currentRole: z.string().optional()
})

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

// Helper to generate JWT token
const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET || 'your-dev-secret-key'
  return jwt.sign(
    { userId, iat: Math.floor(Date.now() / 1000) },
    secret,
    { expiresIn: '7d' }
  )
}

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    // Validate input
    const validatedData = registerSchema.parse(req.body)
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (existingUser) {
      return res.status(400).json({
        error: { message: 'User with this email already exists' }
      })
    }
    
    // Hash password
    const saltRounds = 12
    const hashedPassword = await bcrypt.hash(validatedData.password, saltRounds)
    
    // Create user
    const user = await prisma.user.create({
      data: {
        email: validatedData.email,
        password: hashedPassword,
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        awsExperience: validatedData.awsExperience,
        currentRole: validatedData.currentRole,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        awsExperience: true,
        currentRole: true,
        createdAt: true
      }
    })
    
    // Generate token
    const token = generateToken(user.id)
    
    res.status(201).json({
      user,
      token,
      message: 'Account created successfully'
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: {
          message: 'Validation error',
          details: error.errors
        }
      })
    }
    
    console.error('Registration error:', error)
    res.status(500).json({
      error: { message: 'Failed to create account' }
    })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    // Validate input
    const validatedData = loginSchema.parse(req.body)
    
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email }
    })
    
    if (!user) {
      return res.status(401).json({
        error: { message: 'Invalid email or password' }
      })
    }
    
    // Verify password
    const isValidPassword = await bcrypt.compare(validatedData.password, user.password)
    
    if (!isValidPassword) {
      return res.status(401).json({
        error: { message: 'Invalid email or password' }
      })
    }
    
    // Generate token
    const token = generateToken(user.id)
    
    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    })
    
    // Return user data (excluding password)
    const { password: _, ...userWithoutPassword } = user
    
    res.json({
      user: userWithoutPassword,
      token,
      message: 'Login successful'
    })
    
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: {
          message: 'Validation error',
          details: error.errors
        }
      })
    }
    
    console.error('Login error:', error)
    res.status(500).json({
      error: { message: 'Login failed' }
    })
  }
})

// GET /api/auth/me - Get current user
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: { message: 'No valid authorization token provided' }
      })
    }
    
    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    const secret = process.env.JWT_SECRET || 'your-dev-secret-key'
    
    try {
      const decoded = jwt.verify(token, secret) as { userId: string }
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          awsExperience: true,
          currentRole: true,
          createdAt: true,
          lastLogin: true
        }
      })
      
      if (!user) {
        return res.status(401).json({
          error: { message: 'User not found' }
        })
      }
      
      res.json({ user })
      
    } catch (jwtError) {
      return res.status(401).json({
        error: { message: 'Invalid or expired token' }
      })
    }
    
  } catch (error) {
    console.error('Auth verification error:', error)
    res.status(500).json({
      error: { message: 'Authentication failed' }
    })
  }
})

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  // With JWT, logout is handled client-side by removing the token
  // In a more complex setup, you might maintain a token blacklist
  res.json({ message: 'Logout successful' })
})

export default router