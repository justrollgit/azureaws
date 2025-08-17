import express from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const router = express.Router()
const prisma = new PrismaClient()

// Validation schemas
const updateProgressSchema = z.object({
  userId: z.string(),
  moduleId: z.string(),
  moduleType: z.enum(['lab', 'tutorial', 'assessment']),
  status: z.enum(['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED', 'ABANDONED']),
  completedSteps: z.number().min(0),
  totalSteps: z.number().min(1)
})

// GET /api/progress/user/:userId - Get all progress for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    const progress = await prisma.learningProgress.findMany({
      where: { userId },
      orderBy: { lastAccessedAt: 'desc' }
    })
    
    // Calculate summary statistics
    const totalModules = progress.length
    const completedModules = progress.filter((p: any) => p.status === 'COMPLETED').length
    const inProgressModules = progress.filter((p: any) => p.status === 'IN_PROGRESS').length
    
    const summary = {
      totalModules,
      completedModules,
      inProgressModules,
      completionPercentage: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0
    }
    
    res.json({ 
      progress,
      summary
    })
    
  } catch (error) {
    console.error('Get progress error:', error)
    res.status(500).json({
      error: { message: 'Failed to get progress data' }
    })
  }
})

// GET /api/progress/module/:moduleId/:userId - Get progress for specific module
router.get('/module/:moduleId/:userId', async (req, res) => {
  try {
    const { moduleId, userId } = req.params
    
    const progress = await prisma.learningProgress.findUnique({
      where: {
        userId_moduleId: {
          userId,
          moduleId
        }
      }
    })
    
    res.json({ progress })
    
  } catch (error) {
    console.error('Get module progress error:', error)
    res.status(500).json({
      error: { message: 'Failed to get module progress' }
    })
  }
})

// POST /api/progress/update - Update or create progress
router.post('/update', async (req, res) => {
  try {
    const validatedData = updateProgressSchema.parse(req.body)
    
    const progress = await prisma.learningProgress.upsert({
      where: {
        userId_moduleId: {
          userId: validatedData.userId,
          moduleId: validatedData.moduleId
        }
      },
      update: {
        status: validatedData.status,
        completedSteps: validatedData.completedSteps,
        totalSteps: validatedData.totalSteps,
        lastAccessedAt: new Date(),
        ...(validatedData.status === 'COMPLETED' && { completedAt: new Date() })
      },
      create: {
        userId: validatedData.userId,
        moduleId: validatedData.moduleId,
        moduleType: validatedData.moduleType,
        status: validatedData.status,
        completedSteps: validatedData.completedSteps,
        totalSteps: validatedData.totalSteps,
        ...(validatedData.status === 'COMPLETED' && { completedAt: new Date() })
      }
    })
    
    res.json({
      progress,
      message: 'Progress updated successfully'
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
    
    console.error('Update progress error:', error)
    res.status(500).json({
      error: { message: 'Failed to update progress' }
    })
  }
})

// GET /api/progress/stats/:userId - Get detailed statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    const progress = await prisma.learningProgress.findMany({
      where: { userId }
    })
    
    // Calculate detailed statistics
    const stats = {
      byModuleType: {
        lab: progress.filter((p: any) => p.moduleType === 'lab').length,
        tutorial: progress.filter((p: any) => p.moduleType === 'tutorial').length,
        assessment: progress.filter((p: any) => p.moduleType === 'assessment').length
      },
      byStatus: {
        not_started: progress.filter((p: any) => p.status === 'NOT_STARTED').length,
        in_progress: progress.filter((p: any) => p.status === 'IN_PROGRESS').length,
        completed: progress.filter((p: any) => p.status === 'COMPLETED').length,
        abandoned: progress.filter((p: any) => p.status === 'ABANDONED').length
      },
      totalStepsCompleted: progress.reduce((sum: number, p: any) => sum + p.completedSteps, 0),
      totalStepsAvailable: progress.reduce((sum: number, p: any) => sum + p.totalSteps, 0),
      averageCompletionPercentage: progress.length > 0 
        ? Math.round(progress.reduce((sum: number, p: any) => sum + (p.completedSteps / p.totalSteps * 100), 0) / progress.length)
        : 0,
      recentActivity: progress
        .sort((a: any, b: any) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime())
        .slice(0, 5)
    }
    
    res.json({ stats })
    
  } catch (error) {
    console.error('Get stats error:', error)
    res.status(500).json({
      error: { message: 'Failed to get statistics' }
    })
  }
})

export default router