import express from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const router = express.Router()
const prisma = new PrismaClient()

// Validation schema for user updates
const updateUserSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  currentRole: z.string().optional(),
  awsExperience: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']).optional()
})

// GET /api/users/profile - Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    const user = await prisma.user.findUnique({
      where: { id: userId },
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
      return res.status(404).json({
        error: { message: 'User not found' }
      })
    }
    
    res.json({ user })
    
  } catch (error) {
    console.error('Get profile error:', error)
    res.status(500).json({
      error: { message: 'Failed to get user profile' }
    })
  }
})

// PUT /api/users/profile - Update user profile
router.put('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const validatedData = updateUserSchema.parse(req.body)
    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: validatedData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        awsExperience: true,
        currentRole: true,
        updatedAt: true
      }
    })
    
    res.json({ 
      user: updatedUser,
      message: 'Profile updated successfully'
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
    
    console.error('Update profile error:', error)
    res.status(500).json({
      error: { message: 'Failed to update profile' }
    })
  }
})

export default router