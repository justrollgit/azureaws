import express from 'express'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const router = express.Router()
const prisma = new PrismaClient()

// Validation schema for assessment submission
const submitAssessmentSchema = z.object({
  userId: z.string(),
  category: z.string(),
  answers: z.record(z.string()), // questionId -> selectedOptionId
  score: z.number().min(0),
  totalQuestions: z.number().min(1)
})

// POST /api/assessment/submit - Submit assessment results
router.post('/submit', async (req, res) => {
  try {
    const validatedData = submitAssessmentSchema.parse(req.body)
    
    const assessment = await prisma.assessment.create({
      data: {
        userId: validatedData.userId,
        category: validatedData.category,
        answers: JSON.stringify(validatedData.answers),
        score: validatedData.score,
        totalQuestions: validatedData.totalQuestions
      }
    })
    
    res.json({
      assessment,
      message: 'Assessment submitted successfully'
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
    
    console.error('Submit assessment error:', error)
    res.status(500).json({
      error: { message: 'Failed to submit assessment' }
    })
  }
})

// GET /api/assessment/user/:userId - Get all assessments for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    const assessments = await prisma.assessment.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' }
    })
    
    // Calculate summary statistics
    const summary = assessments.reduce((acc: any, assessment: any) => {
      const category = assessment.category
      if (!acc[category]) {
        acc[category] = {
          attempts: 0,
          bestScore: 0,
          totalQuestions: assessment.totalQuestions,
          lastAttempt: assessment.completedAt
        }
      }
      
      acc[category].attempts += 1
      acc[category].bestScore = Math.max(acc[category].bestScore, assessment.score)
      
      if (assessment.completedAt > acc[category].lastAttempt) {
        acc[category].lastAttempt = assessment.completedAt
      }
      
      return acc
    }, {} as Record<string, any>)
    
    res.json({
      assessments,
      summary
    })
    
  } catch (error) {
    console.error('Get assessments error:', error)
    res.status(500).json({
      error: { message: 'Failed to get assessments' }
    })
  }
})

// GET /api/assessment/category/:category/:userId - Get assessments for specific category
router.get('/category/:category/:userId', async (req, res) => {
  try {
    const { category, userId } = req.params
    
    const assessments = await prisma.assessment.findMany({
      where: {
        userId,
        category
      },
      orderBy: { completedAt: 'desc' }
    })
    
    // Find best score
    const bestScore = assessments.length > 0 
      ? Math.max(...assessments.map((a: any) => a.score))
      : 0
    
    const totalQuestions = assessments.length > 0 
      ? assessments[0].totalQuestions 
      : 0
    
    const bestPercentage = totalQuestions > 0 
      ? Math.round((bestScore / totalQuestions) * 100)
      : 0
    
    res.json({
      assessments,
      statistics: {
        attempts: assessments.length,
        bestScore,
        totalQuestions,
        bestPercentage,
        mostRecentScore: assessments.length > 0 ? assessments[0].score : 0
      }
    })
    
  } catch (error) {
    console.error('Get category assessments error:', error)
    res.status(500).json({
      error: { message: 'Failed to get category assessments' }
    })
  }
})

// GET /api/assessment/recommendations/:userId - Get personalized recommendations
router.get('/recommendations/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    
    // Get user's assessment history
    const assessments = await prisma.assessment.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' }
    })
    
    // Calculate performance by category
    const categoryPerformance = assessments.reduce((acc: any, assessment: any) => {
      const category = assessment.category
      const percentage = (assessment.score / assessment.totalQuestions) * 100
      
      if (!acc[category]) {
        acc[category] = { scores: [], bestScore: 0 }
      }
      
      acc[category].scores.push(percentage)
      acc[category].bestScore = Math.max(acc[category].bestScore, percentage)
      
      return acc
    }, {} as Record<string, any>)
    
    // Generate recommendations based on performance
    const recommendations = Object.entries(categoryPerformance).map(([category, data]: [string, any]) => {
      const averageScore = data.scores.reduce((sum: number, score: number) => sum + score, 0) / data.scores.length
      const bestScore = data.bestScore
      
      let recommendation = ''
      let priority = 'low'
      
      if (averageScore < 60) {
        recommendation = `Focus on ${category} fundamentals - consider starting with beginner-level content`
        priority = 'high'
      } else if (averageScore < 80) {
        recommendation = `Review intermediate ${category} concepts and practice hands-on labs`
        priority = 'medium'
      } else {
        recommendation = `Strong performance in ${category} - consider advanced topics or helping others`
        priority = 'low'
      }
      
      return {
        category,
        averageScore: Math.round(averageScore),
        bestScore: Math.round(bestScore),
        recommendation,
        priority,
        attempts: data.scores.length
      }
    })
    
    // Sort by priority and score (lowest scores first for improvement areas)
    const sortedRecommendations = recommendations.sort((a: any, b: any) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      if (priorityOrder[a.priority as keyof typeof priorityOrder] !== priorityOrder[b.priority as keyof typeof priorityOrder]) {
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
      }
      return a.averageScore - b.averageScore
    })
    
    res.json({
      recommendations: sortedRecommendations,
      overallProgress: {
        categoriesAttempted: Object.keys(categoryPerformance).length,
        totalAssessments: assessments.length,
        averagePerformance: recommendations.length > 0 
          ? Math.round(recommendations.reduce((sum, r) => sum + r.averageScore, 0) / recommendations.length)
          : 0
      }
    })
    
  } catch (error) {
    console.error('Get recommendations error:', error)
    res.status(500).json({
      error: { message: 'Failed to get recommendations' }
    })
  }
})

export default router