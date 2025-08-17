'use client'

import { useState } from 'react'
import { 
  ChevronRightIcon, 
  ChevronLeftIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  LightBulbIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

// Import comprehensive assessment data
import assessmentData from '@/content/assessments/comprehensive-assessment.json'

interface Question {
  id: string
  category: string
  aws_service: string
  azure_equivalent: string
  question: string
  options: {
    id: string
    text: string
    correct: boolean
    explanation: string
  }[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface AssessmentResult {
  category: string
  score: number
  total: number
  percentage: number
  recommendations: string[]
  strengths: string[]
  gaps: string[]
}

const assessmentQuestions: Question[] = assessmentData.questions as Question[]

export default function SkillsAssessment() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: optionId }))
    setSelectedOption(optionId)
    setShowExplanation(false)
  }

  const handleNext = () => {
    if (currentQuestion < assessmentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedOption(answers[assessmentQuestions[currentQuestion + 1].id] || null)
      setShowExplanation(false)
    } else {
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedOption(answers[assessmentQuestions[currentQuestion - 1].id] || null)
      setShowExplanation(false)
    }
  }

  const handleShowExplanation = () => {
    setShowExplanation(true)
  }

  const calculateResults = (): AssessmentResult[] => {
    const categories = [...new Set(assessmentQuestions.map(q => q.category))]
    
    return categories.map(category => {
      const categoryQuestions = assessmentQuestions.filter(q => q.category === category)
      const categoryAnswers = categoryQuestions.filter(q => {
        const answer = answers[q.id]
        return answer && q.options.find(opt => opt.id === answer)?.correct
      })
      
      const score = categoryAnswers.length
      const total = categoryQuestions.length
      const percentage = Math.round((score / total) * 100)
      
      // Generate recommendations based on performance
      let recommendations: string[] = []
      let strengths: string[] = []
      let gaps: string[] = []
      
      if (percentage >= 80) {
        strengths.push(`Strong understanding of ${category}`)
        recommendations.push(`Consider advanced topics in ${category}`)
      } else if (percentage >= 60) {
        recommendations.push(`Review intermediate concepts in ${category}`)
        gaps.push(`Some gaps in ${category} knowledge`)
      } else {
        recommendations.push(`Focus on fundamentals of ${category}`)
        gaps.push(`Significant knowledge gaps in ${category}`)
      }
      
      return {
        category,
        score,
        total,
        percentage,
        recommendations,
        strengths,
        gaps
      }
    })
  }

  const results = showResults ? calculateResults() : []
  const overallScore = showResults ? 
    Math.round((Array.from(Object.values(answers)).filter((answer, index) => 
      assessmentQuestions[index]?.options.find(opt => opt.id === answer)?.correct
    ).length / assessmentQuestions.length) * 100) : 0

  const question = assessmentQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / assessmentQuestions.length) * 100

  if (showResults) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <ChartBarIcon className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Assessment Results</h1>
          <p className="text-lg text-gray-600">Your AWS to Azure knowledge assessment</p>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">{overallScore}%</div>
            <div className="text-lg text-gray-600 mb-4">Overall Score</div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${overallScore}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {results.map((result, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{result.category}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  result.percentage >= 80 ? 'bg-green-100 text-green-800' :
                  result.percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {result.percentage}%
                </span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{result.score} of {result.total} correct</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      result.percentage >= 80 ? 'bg-green-500' :
                      result.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${result.percentage}%` }}
                  ></div>
                </div>
              </div>
              
              {result.strengths.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium text-green-700 mb-1 flex items-center">
                    <CheckCircleIcon className="w-4 h-4 mr-1" />
                    Strengths
                  </h4>
                  {result.strengths.map((strength, i) => (
                    <p key={i} className="text-sm text-green-600">{strength}</p>
                  ))}
                </div>
              )}
              
              {result.gaps.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium text-red-700 mb-1 flex items-center">
                    <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                    Areas to Improve
                  </h4>
                  {result.gaps.map((gap, i) => (
                    <p key={i} className="text-sm text-red-600">{gap}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 mb-4 flex items-center">
            <LightBulbIcon className="w-6 h-6 mr-2" />
            Personalized Learning Recommendations
          </h2>
          <div className="space-y-3">
            {results.flatMap(result => result.recommendations).map((recommendation, index) => (
              <div key={index} className="flex items-start">
                <ChevronRightIcon className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                <span className="text-blue-800">{recommendation}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Next Steps</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a href="/learning-paths" className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
              <h3 className="font-medium text-gray-900 mb-2">Start Learning Path</h3>
              <p className="text-sm text-gray-600">Begin with hands-on labs tailored to your skill level</p>
            </a>
            <a href="/service-comparison" className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm transition-all">
              <h3 className="font-medium text-gray-900 mb-2">Review Service Mappings</h3>
              <p className="text-sm text-gray-600">Study AWS to Azure service equivalents</p>
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AWS to Azure Skills Assessment</h1>
        <p className="text-lg text-gray-600 mb-6">
          Evaluate your current knowledge and identify areas for focused learning.
        </p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Question {currentQuestion + 1} of {assessmentQuestions.length}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
        {/* Question Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              question.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              question.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {question.difficulty}
            </span>
            <span className="text-sm text-gray-600">
              {question.category}
            </span>
          </div>
        </div>

        {/* AWS/Azure Context */}
        <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
          <div>
            <span className="text-sm font-medium aws-brand">AWS Service:</span>
            <div className="text-sm text-gray-700">{question.aws_service}</div>
          </div>
          <div>
            <span className="text-sm font-medium azure-brand">Azure Equivalent:</span>
            <div className="text-sm text-gray-700">{question.azure_equivalent}</div>
          </div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          {question.question}
        </h2>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option) => {
            const isSelected = selectedOption === option.id
            const isCorrect = option.correct
            const showResult = showExplanation
            
            return (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(question.id, option.id)}
                disabled={showExplanation}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                  showResult
                    ? isCorrect
                      ? 'border-green-500 bg-green-50'
                      : isSelected
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-gray-50'
                    : isSelected
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 text-sm font-medium ${
                    showResult
                      ? isCorrect
                        ? 'border-green-500 bg-green-500 text-white'
                        : isSelected
                        ? 'border-red-500 bg-red-500 text-white'
                        : 'border-gray-300 text-gray-600'
                      : isSelected
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 text-gray-600'
                  }`}>
                    {option.id.toUpperCase()}
                  </span>
                  <span className="text-gray-900">{option.text}</span>
                </div>
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {showExplanation && selectedOption && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">Explanation</h3>
            <p className="text-blue-800">
              {question.options.find(opt => opt.id === selectedOption)?.explanation}
            </p>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center px-4 py-2 rounded-lg ${
              currentQuestion === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeftIcon className="w-5 h-5 mr-1" />
            Previous
          </button>

          <div className="flex space-x-3">
            {selectedOption && !showExplanation && (
              <button
                onClick={handleShowExplanation}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Show Explanation
              </button>
            )}
            
            <button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`flex items-center px-6 py-2 rounded-lg ${
                selectedOption
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {currentQuestion === assessmentQuestions.length - 1 ? 'Finish' : 'Next'}
              <ChevronRightIcon className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}