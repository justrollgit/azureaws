'use client'

import { useState } from 'react'
import { 
  CheckCircleIcon, 
  ClockIcon, 
  CodeBracketIcon, 
  CommandLineIcon,
  BookOpenIcon,
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/24/solid'

interface LabData {
  id: string
  title: string
  difficulty: string
  estimated_time: string
  aws_prerequisite: string
  azure_target: string
  learning_objectives: string[]
  aws_context: {
    equivalent_service: string
    key_concepts: string[]
  }
  sections: Array<{
    title: string
    content: string
    comparison_table?: Record<string, any>
    code_examples?: Record<string, {
      language: string
      title: string
      code: string
    }>
    exercise?: {
      scenario: string
      steps: Array<{
        step: number
        title: string
        aws_equivalent: string
        instructions: string
        code: {
          portal?: string
          cli?: string
        }
        explanation?: string
      }>
    }
  }>
  validation_steps: Array<{
    step: string
    command: string
    expected: string
  }>
  cleanup: {
    instructions: string
    command: string
  }
  key_takeaways: string[]
  next_steps: string[]
}

// Sample lab data - in real app, this would come from props or API
const sampleLab: LabData = {
  id: "vm-deployment-lab",
  title: "EC2 to Azure VM: Your First Virtual Machine",
  difficulty: "beginner",
  estimated_time: "30 minutes",
  aws_prerequisite: "Experience with EC2 instance creation and management",
  azure_target: "Deploy and manage Azure Virtual Machines",
  learning_objectives: [
    "Understand Azure VM sizing and series",
    "Configure networking and security groups equivalent",
    "Compare AWS and Azure VM management approaches",
    "Deploy VM using Azure portal and CLI"
  ],
  aws_context: {
    equivalent_service: "Amazon EC2",
    key_concepts: [
      "Instance types → VM sizes",
      "Security groups → Network Security Groups",
      "Key pairs → SSH keys/passwords",
      "AMI → VM images",
      "Availability Zones → Availability Zones"
    ]
  },
  sections: [
    {
      title: "Understanding Azure VM Sizes",
      content: "AWS instance types map to Azure VM series and sizes. Let's compare common configurations:",
      comparison_table: {
        aws_t3_micro: {
          aws: "t3.micro (1 vCPU, 1GB RAM)",
          azure: "Standard_B1s (1 vCPU, 1GB RAM)",
          use_case: "Low traffic websites, dev/test"
        },
        aws_m5_large: {
          aws: "m5.large (2 vCPU, 8GB RAM)",
          azure: "Standard_D2s_v3 (2 vCPU, 8GB RAM)",
          use_case: "Web servers, small databases"
        }
      }
    }
  ],
  validation_steps: [
    {
      step: "Connect to VM",
      command: "ssh azureuser@<public-ip>",
      expected: "Successful SSH connection"
    }
  ],
  cleanup: {
    instructions: "Remove all resources to avoid charges",
    command: "az group delete --name vm-lab-rg --yes --no-wait"
  },
  key_takeaways: [
    "Azure VM sizes map closely to EC2 instance types",
    "NSGs require priority numbers unlike AWS security groups",
    "Resource groups provide organization similar to tags in AWS"
  ],
  next_steps: [
    "Learn about Azure Load Balancers (equivalent to ELB)",
    "Explore VM Scale Sets (equivalent to Auto Scaling Groups)"
  ]
}

interface LearningModuleProps {
  lab?: LabData
}

export default function LearningModule({ lab }: LearningModuleProps) {
  // Use sample lab only if no lab is provided
  const currentLab = lab || sampleLab
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [activeSection, setActiveSection] = useState(0)
  const [showCode, setShowCode] = useState<Record<string, boolean>>({})

  const toggleStepCompletion = (stepNumber: number) => {
    const newCompleted = new Set(completedSteps)
    if (newCompleted.has(stepNumber)) {
      newCompleted.delete(stepNumber)
    } else {
      newCompleted.add(stepNumber)
    }
    setCompletedSteps(newCompleted)
  }

  const toggleCodeVisibility = (codeId: string) => {
    setShowCode(prev => ({ ...prev, [codeId]: !prev[codeId] }))
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-orange-100 text-orange-800'
      case 'expert': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex items-start justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{currentLab.title}</h1>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentLab.difficulty)}`}>
            {currentLab.difficulty}
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="flex items-center text-sm text-gray-600">
            <ClockIcon className="h-5 w-5 mr-2" />
            {currentLab.estimated_time}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <BookOpenIcon className="h-5 w-5 mr-2" />
            Hands-on Lab
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CodeBracketIcon className="h-5 w-5 mr-2" />
            CLI & Portal
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <CheckCircleIcon className="h-5 w-5 mr-2" />
            {completedSteps.size} completed
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2 aws-brand">AWS Prerequisites:</h3>
            <p className="text-gray-600 text-sm">{currentLab.aws_prerequisite}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2 azure-brand">Azure Learning Target:</h3>
            <p className="text-gray-600 text-sm">{currentLab.azure_target}</p>
          </div>
        </div>
      </div>

      {/* AWS Context */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold aws-brand mb-4">AWS Context</h2>
        <p className="mb-4">
          <strong>Equivalent Service:</strong> {currentLab.aws_context.equivalent_service}
        </p>
        <h3 className="font-medium mb-3">Key Concept Mapping:</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {currentLab.aws_context.key_concepts.map((concept, index) => (
            <div key={index} className="flex items-center text-sm">
              <ArrowRightIcon className="h-4 w-4 mr-2 text-orange-500" />
              {concept}
            </div>
          ))}
        </div>
      </div>

      {/* Learning Objectives */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Learning Objectives</h2>
        <ul className="space-y-2">
          {currentLab.learning_objectives.map((objective, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 mt-0.5 mr-3 text-blue-500" />
              <span className="text-gray-700">{objective}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Lab Sections */}
      <div className="space-y-8">
        {currentLab.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{section.title}</h2>
            <p className="text-gray-700 mb-6">{section.content}</p>

            {/* Comparison Table */}
            {section.comparison_table && (
              <div className="mb-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">AWS Service</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Azure Service</th>
                        <th className="px-4 py-3 text-left font-medium text-gray-900">Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(section.comparison_table).map(([key, comparison]: [string, any]) => (
                        <tr key={key}>
                          <td className="px-4 py-3 text-sm aws-brand">{comparison.aws}</td>
                          <td className="px-4 py-3 text-sm azure-brand">{comparison.azure}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{comparison.use_case}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Code Examples */}
            {section.code_examples && (
              <div className="space-y-4">
                {Object.entries(section.code_examples).map(([key, example]: [string, any]) => (
                  <div key={key} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleCodeVisibility(key)}
                      className="w-full px-4 py-3 bg-gray-50 text-left hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <CommandLineIcon className="h-5 w-5 mr-2" />
                          <span className="font-medium">{example.title}</span>
                        </div>
                        <ArrowRightIcon className={`h-4 w-4 transform transition-transform ${showCode[key] ? 'rotate-90' : ''}`} />
                      </div>
                    </button>
                    {showCode[key] && (
                      <div className="p-4 bg-gray-900">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Exercise Steps */}
            {section.exercise && (
              <div className="mt-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-2">Hands-On Exercise</h3>
                  <p className="text-blue-800">{section.exercise.scenario}</p>
                </div>

                <div className="space-y-4">
                  {section.exercise.steps.map((step, stepIndex) => {
                    const isCompleted = completedSteps.has(step.step)
                    
                    return (
                      <div key={stepIndex} className={`border rounded-lg p-4 ${isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start">
                            <button
                              onClick={() => toggleStepCompletion(step.step)}
                              className="mr-3 mt-1"
                            >
                              {isCompleted ? (
                                <CheckCircleIconSolid className="h-5 w-5 text-green-600" />
                              ) : (
                                <CheckCircleIcon className="h-5 w-5 text-gray-400 hover:text-green-500" />
                              )}
                            </button>
                            <div>
                              <h4 className="font-medium text-gray-900">
                                Step {step.step}: {step.title}
                              </h4>
                              <p className="text-sm text-orange-600 mt-1">
                                AWS equivalent: {step.aws_equivalent}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-3 ml-8">{step.instructions}</p>
                        
                        {step.code && (
                          <div className="ml-8">
                            {step.code.cli && (
                              <div className="bg-gray-900 rounded p-3 mb-2">
                                <div className="flex items-center mb-2">
                                  <CommandLineIcon className="h-4 w-4 text-green-400 mr-2" />
                                  <span className="text-green-400 text-sm">Azure CLI</span>
                                </div>
                                <pre className="text-green-400 text-sm overflow-x-auto">
                                  <code>{step.code.cli}</code>
                                </pre>
                              </div>
                            )}
                            {step.code.portal && (
                              <div className="bg-blue-50 border border-blue-200 rounded p-3">
                                <div className="text-blue-800 text-sm">
                                  <strong>Portal:</strong> {step.code.portal}
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        
                        {step.explanation && (
                          <div className="ml-8 mt-3">
                            <p className="text-sm text-gray-600 italic">{step.explanation}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Validation Steps */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Validation & Testing</h2>
        <div className="space-y-3">
          {currentLab.validation_steps.map((validation, index) => (
            <div key={index} className="flex items-start p-3 bg-gray-50 rounded">
              <PlayIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{validation.step}</div>
                <code className="text-sm bg-gray-800 text-green-400 px-2 py-1 rounded mt-1 inline-block">
                  {validation.command}
                </code>
                <div className="text-sm text-gray-600 mt-1">Expected: {validation.expected}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Takeaways</h2>
        <ul className="space-y-2">
          {currentLab.key_takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start">
              <CheckCircleIcon className="h-5 w-5 mt-0.5 mr-3 text-green-500" />
              <span className="text-gray-700">{takeaway}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next Steps */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-blue-900 mb-4">What's Next?</h2>
        <ul className="space-y-2">
          {currentLab.next_steps.map((step, index) => (
            <li key={index} className="flex items-start">
              <ArrowRightIcon className="h-5 w-5 mt-0.5 mr-3 text-blue-600" />
              <span className="text-blue-800">{step}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Cleanup Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold text-yellow-900 mb-2">⚠️ Important: Cleanup</h2>
        <p className="text-yellow-800 mb-3">{currentLab.cleanup.instructions}</p>
        <code className="bg-yellow-100 text-yellow-900 px-3 py-2 rounded text-sm">
          {currentLab.cleanup.command}
        </code>
      </div>
    </div>
  )
}