'use client'

import { useState, useEffect } from 'react'
import { 
  AcademicCapIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline'

interface ExamAnalysis {
  exam_code: string
  exam_name: string
  overall_coverage: string
  status: string
  strengths: string[]
  critical_gaps: string[]
}

interface GapAnalysis {
  topic: string
  aws_services: string[]
  azure_services: string[]
  exam_impact: {
    saa_c03: string
    sap_c02: string
  }
  current_coverage: string
  estimated_development_time: string
  required_labs: string[]
}

interface CoverageReport {
  executive_summary: {
    saa_c03_readiness: ExamAnalysis
    sap_c02_readiness: ExamAnalysis
  }
  detailed_gap_analysis: {
    high_priority_gaps: GapAnalysis[]
    medium_priority_gaps: GapAnalysis[]
  }
  coverage_by_exam_domain: any
  recommendations: any
}

export default function ExamCrosscheckDashboard() {
  const [coverageReport, setCoverageReport] = useState<CoverageReport | null>(null)
  const [selectedExam, setSelectedExam] = useState<'saa-c03' | 'sap-c02'>('saa-c03')
  const [selectedTab, setSelectedTab] = useState<'overview' | 'gaps' | 'domains' | 'recommendations'>('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCoverageReport = async () => {
      try {
        const response = await fetch('/content/exam-crosscheck/comprehensive-coverage-gap-report.json')
        const data = await response.json()
        setCoverageReport(data)
        setLoading(false)
      } catch (error) {
        console.error('Error loading coverage report:', error)
        setLoading(false)
      }
    }

    loadCoverageReport()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'excellent': return 'text-green-800 bg-green-100'
      case 'good': return 'text-blue-800 bg-blue-100'
      case 'partial': return 'text-yellow-800 bg-yellow-100'
      case 'poor': return 'text-red-800 bg-red-100'
      default: return 'text-gray-800 bg-gray-100'
    }
  }

  const getCoverageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600'
    if (percentage >= 75) return 'text-blue-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-800 bg-red-100 border-red-200'
      case 'medium': return 'text-yellow-800 bg-yellow-100 border-yellow-200'
      case 'low': return 'text-green-800 bg-green-100 border-green-200'
      default: return 'text-gray-800 bg-gray-100 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!coverageReport) {
    return <div className="text-center text-red-600">Failed to load exam coverage analysis.</div>
  }

  const currentExamData = selectedExam === 'saa-c03' 
    ? coverageReport.executive_summary.saa_c03_readiness
    : coverageReport.executive_summary.sap_c02_readiness

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AWS Certification Exam Coverage Analysis</h1>
        <p className="text-xl text-gray-600">Comprehensive crosscheck of platform content against AWS certification requirements</p>
      </div>

      {/* Exam Selector */}
      <div className="mb-8">
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg inline-flex">
          <button
            onClick={() => setSelectedExam('saa-c03')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              selectedExam === 'saa-c03' 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Solutions Architect Associate (SAA-C03)
          </button>
          <button
            onClick={() => setSelectedExam('sap-c02')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              selectedExam === 'sap-c02' 
                ? 'bg-white text-blue-700 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Solutions Architect Professional (SAP-C02)
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-8">
        <nav className="flex space-x-8 border-b border-gray-200">
          {[
            { id: 'overview', name: 'Coverage Overview', icon: ChartBarIcon },
            { id: 'gaps', name: 'Priority Gaps', icon: ExclamationTriangleIcon },
            { id: 'domains', name: 'Domain Analysis', icon: DocumentTextIcon },
            { id: 'recommendations', name: 'Recommendations', icon: InformationCircleIcon }
          ].map((tab) => {
            const IconComponent = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                  selectedTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <IconComponent className="h-4 w-4 mr-2" />
                {tab.name}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Content based on selected tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-8">
          {/* Executive Summary Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">{currentExamData.exam_name}</h2>
              <span className={`px-4 py-2 rounded-full font-medium ${getStatusColor(currentExamData.status)}`}>
                {currentExamData.status}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Coverage Percentage */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Overall Coverage</span>
                  <AcademicCapIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  <span className={getCoverageColor(parseInt(currentExamData.overall_coverage))}>
                    {currentExamData.overall_coverage}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      parseInt(currentExamData.overall_coverage) >= 75 ? 'bg-blue-600' : 
                      parseInt(currentExamData.overall_coverage) >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: currentExamData.overall_coverage }}
                  ></div>
                </div>
              </div>

              {/* Readiness Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Certification Readiness</span>
                  <CheckCircleIcon className="h-5 w-5 text-gray-400" />
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2">
                  {currentExamData.status} Preparation Level
                </div>
                <div className="text-sm text-gray-600">
                  {parseInt(currentExamData.overall_coverage) >= 75 ? 
                    'Strong foundation with focused gap filling needed' :
                    'Good foundation with moderate additional content needed'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Strengths and Gaps */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Strengths */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
                <CheckCircleIcon className="h-5 w-5 mr-2" />
                Platform Strengths
              </h3>
              <ul className="space-y-2">
                {currentExamData.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="h-4 w-4 mt-1 mr-2 text-green-600" />
                    <span className="text-green-800 text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Critical Gaps */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
                <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                Critical Gaps
              </h3>
              <ul className="space-y-2">
                {currentExamData.critical_gaps.map((gap, index) => (
                  <li key={index} className="flex items-start">
                    <ExclamationTriangleIcon className="h-4 w-4 mt-1 mr-2 text-red-600" />
                    <span className="text-red-800 text-sm">{gap}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'gaps' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Priority Content Gaps</h2>
          
          {/* High Priority Gaps */}
          <div>
            <h3 className="text-lg font-medium text-red-900 mb-4">High Priority Gaps</h3>
            <div className="space-y-4">
              {coverageReport.detailed_gap_analysis.high_priority_gaps.map((gap, index) => (
                <div key={index} className="bg-white border border-red-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-900">{gap.topic}</h4>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        HIGH PRIORITY
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {gap.estimated_development_time}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <span className="text-sm font-medium text-orange-600 block mb-1">AWS Services:</span>
                      <div className="flex flex-wrap gap-1">
                        {gap.aws_services.map((service, idx) => (
                          <span key={idx} className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-blue-600 block mb-1">Azure Services:</span>
                      <div className="flex flex-wrap gap-1">
                        {gap.azure_services.map((service, idx) => (
                          <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                            {service}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600">SAA-C03 Impact:</span>
                      <p className="text-gray-800">{gap.exam_impact.saa_c03}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">SAP-C02 Impact:</span>
                      <p className="text-gray-800">{gap.exam_impact.sap_c02}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-600">Current Coverage:</span>
                      <p className={`font-semibold ${getCoverageColor(parseInt(gap.current_coverage))}`}>
                        {gap.current_coverage}
                      </p>
                    </div>
                  </div>

                  {gap.required_labs && gap.required_labs.length > 0 && (
                    <div className="mt-4">
                      <span className="text-sm font-medium text-gray-600 block mb-2">Required Labs:</span>
                      <ul className="space-y-1">
                        {gap.required_labs.map((lab, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-center">
                            <ArrowRightIcon className="h-3 w-3 mr-2 text-gray-400" />
                            {lab}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Medium Priority Gaps */}
          <div>
            <h3 className="text-lg font-medium text-yellow-900 mb-4">Medium Priority Gaps</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {coverageReport.detailed_gap_analysis.medium_priority_gaps.map((gap, index) => (
                <div key={index} className="bg-white border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-gray-900 text-sm">{gap.topic}</h4>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      MEDIUM
                    </span>
                  </div>
                  <div className="text-xs text-gray-600 mb-2">
                    Coverage: <span className={`font-semibold ${getCoverageColor(parseInt(gap.current_coverage))}`}>
                      {gap.current_coverage}
                    </span> | 
                    Est. Time: <span className="font-medium">{gap.estimated_development_time}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-orange-600">SAA: {gap.exam_impact.saa_c03}</span>
                    <span className="text-blue-600">SAP: {gap.exam_impact.sap_c02}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedTab === 'domains' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Domain-by-Domain Coverage Analysis</h2>
          
          {selectedExam === 'saa-c03' && (
            <div className="grid gap-6">
              {Object.entries(coverageReport.coverage_by_exam_domain.saa_c03_domains).map(([domainKey, domain]: [string, any]) => (
                <div key={domainKey} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 capitalize">
                      {domain.weight} - {domainKey.replace('_', ' ')}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(domain.status)}`}>
                        {domain.status}
                      </span>
                      <span className={`text-lg font-bold ${getCoverageColor(parseInt(domain.coverage))}`}>
                        {domain.coverage}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-red-600 block mb-1">Key Gaps:</span>
                    <div className="flex flex-wrap gap-2">
                      {domain.key_gaps.map((gap: string, idx: number) => (
                        <span key={idx} className="bg-red-50 text-red-700 px-2 py-1 rounded text-sm border border-red-200">
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedExam === 'sap-c02' && (
            <div className="grid gap-6">
              {Object.entries(coverageReport.coverage_by_exam_domain.sap_c02_domains).map(([domainKey, domain]: [string, any]) => (
                <div key={domainKey} className="bg-white border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-900 capitalize">
                      {domain.weight} - {domainKey.replace('_', ' ')}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(domain.status)}`}>
                        {domain.status}
                      </span>
                      <span className={`text-lg font-bold ${getCoverageColor(parseInt(domain.coverage))}`}>
                        {domain.coverage}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-red-600 block mb-1">Key Gaps:</span>
                    <div className="flex flex-wrap gap-2">
                      {domain.key_gaps.map((gap: string, idx: number) => (
                        <span key={idx} className="bg-red-50 text-red-700 px-2 py-1 rounded text-sm border border-red-200">
                          {gap}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedTab === 'recommendations' && (
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-900">Development Recommendations</h2>
          
          {/* Immediate Actions */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
              <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
              Immediate Priority Actions
            </h3>
            <ul className="space-y-2">
              {coverageReport.recommendations.immediate_actions.map((action: string, index: number) => (
                <li key={index} className="flex items-start">
                  <ClockIcon className="h-4 w-4 mt-1 mr-2 text-red-600" />
                  <span className="text-red-800 text-sm">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Short Term Goals */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-4">Short-Term Goals (Next 2-3 weeks)</h3>
            <ul className="space-y-2">
              {coverageReport.recommendations.short_term_goals.map((goal: string, index: number) => (
                <li key={index} className="flex items-start">
                  <ArrowRightIcon className="h-4 w-4 mt-1 mr-2 text-yellow-600" />
                  <span className="text-yellow-800 text-sm">{goal}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Long Term Enhancements */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Long-Term Enhancements</h3>
            <ul className="space-y-2">
              {coverageReport.recommendations.long_term_enhancements.map((enhancement: string, index: number) => (
                <li key={index} className="flex items-start">
                  <InformationCircleIcon className="h-4 w-4 mt-1 mr-2 text-blue-600" />
                  <span className="text-blue-800 text-sm">{enhancement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Certification Preparation */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Certification Preparation Guidance</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-orange-600 mb-2">Solutions Architect Associate (SAA-C03)</h4>
                <p className="text-sm text-gray-700">
                  {coverageReport.recommendations.certification_preparation.saa_c03}
                </p>
              </div>
              <div>
                <h4 className="font-medium text-blue-600 mb-2">Solutions Architect Professional (SAP-C02)</h4>
                <p className="text-sm text-gray-700">
                  {coverageReport.recommendations.certification_preparation.sap_c02}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Stats */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Analysis Summary</h3>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">18</div>
            <div className="text-sm text-gray-600">Current Labs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-600">5</div>
            <div className="text-sm text-gray-600">Critical Gaps</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">75</div>
            <div className="text-sm text-gray-600">Hours Development Needed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">13</div>
            <div className="text-sm text-gray-600">Recommended New Labs</div>
          </div>
        </div>
      </div>
    </div>
  )
}