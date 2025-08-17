'use client'

import { useState, useEffect } from 'react'
import { 
  AcademicCapIcon,
  ClockIcon, 
  CodeBracketIcon, 
  CommandLineIcon,
  BookOpenIcon,
  ArrowRightIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  BeakerIcon,
  ServerIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BuildingOfficeIcon,
  PresentationChartLineIcon,
  ArrowsRightLeftIcon,
  CubeIcon,
  BoltIcon,
  CircleStackIcon,
  FolderIcon,
  TagIcon
} from '@heroicons/react/24/outline'
import LearningModule from './LearningModule'

interface Lab {
  id: string
  title: string
  category: string
  difficulty: string
  estimated_time: string
  description: string
  aws_services: string[]
  azure_services: string[]
  tags: string[]
  file_path: string
}

interface LabsIndex {
  labs: Lab[]
  categories: Record<string, {
    title: string
    description: string
    icon: string
  }>
  difficulty_levels: Record<string, {
    title: string
    description: string
    estimated_time_range: string
    prerequisites: string
  }>
  learning_paths: Record<string, {
    title: string
    description: string
    labs: string[]
    estimated_total_time: string
  }>
}

export default function LearningPathsDashboard() {
  const [labsIndex, setLabsIndex] = useState<LabsIndex | null>(null)
  const [selectedLab, setSelectedLab] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [selectedPath, setSelectedPath] = useState('all')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLabsIndex = async () => {
      try {
        const response = await fetch('/content/labs-index.json')
        const data = await response.json()
        setLabsIndex(data)
        setLoading(false)
      } catch (error) {
        console.error('Error loading labs index:', error)
        setLoading(false)
      }
    }

    loadLabsIndex()
  }, [])

  const loadLab = async (lab: Lab) => {
    try {
      const response = await fetch(`/${lab.file_path}`)
      const labData = await response.json()
      setSelectedLab(labData)
    } catch (error) {
      console.error('Error loading lab:', error)
    }
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
      compute: ServerIcon,
      containers: CubeIcon,
      serverless: BoltIcon,
      databases: CircleStackIcon,
      storage: FolderIcon,
      networking: GlobeAltIcon,
      security: ShieldCheckIcon,
      monitoring: ChartBarIcon,
      architecture: BuildingOfficeIcon,
      analytics: PresentationChartLineIcon,
      migration: ArrowsRightLeftIcon
    }
    return icons[category] || BeakerIcon
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'advanced': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'expert': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredLabs = labsIndex?.labs.filter(lab => {
    const matchesSearch = lab.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lab.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || lab.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || lab.difficulty === selectedDifficulty
    
    const matchesPath = selectedPath === 'all' || 
                       (labsIndex.learning_paths[selectedPath]?.labs.includes(lab.id))

    return matchesSearch && matchesCategory && matchesDifficulty && matchesPath
  }) || []

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (selectedLab) {
    return (
      <div>
        <div className="mb-6">
          <button
            onClick={() => setSelectedLab(null)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <ArrowRightIcon className="h-5 w-5 mr-2 rotate-180" />
            Back to Learning Paths
          </button>
        </div>
        <LearningModule lab={selectedLab} />
      </div>
    )
  }

  if (!labsIndex) {
    return <div className="text-center text-red-600">Failed to load labs. Please refresh the page.</div>
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">AWS to Azure Learning Paths</h1>
        <p className="text-xl text-gray-600">Interactive hands-on labs to master Azure services coming from AWS</p>
      </div>

      {/* AWS Certification Equivalency Tracks */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-orange-50 to-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <AcademicCapIcon className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">AWS Certification Equivalent Learning Tracks</h2>
              <p className="text-gray-600">Structured paths that cover content equivalent to AWS certification requirements</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* SAA-C03 Track */}
            {labsIndex.learning_paths.solutions_architect_associate && (
              <div
                onClick={() => setSelectedPath('solutions_architect_associate')}
                className="bg-white border-2 border-orange-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all hover:border-orange-400"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">SAA</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-orange-800">Solutions Architect Associate</h3>
                      <p className="text-sm text-orange-600">AWS SAA-C03 Equivalent Track</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">100% Coverage</span>
                </div>
                <p className="text-gray-700 mb-4">{labsIndex.learning_paths.solutions_architect_associate.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-orange-600 font-medium">{labsIndex.learning_paths.solutions_architect_associate.labs.length} labs</span>
                  <span className="text-gray-600">{labsIndex.learning_paths.solutions_architect_associate.estimated_total_time}</span>
                </div>
              </div>
            )}

            {/* DOP-C02 Track */}
            {labsIndex.learning_paths.dop_c02_track && (
              <div
                onClick={() => setSelectedPath('dop_c02_track')}
                className="bg-white border-2 border-purple-200 rounded-lg p-6 cursor-pointer hover:shadow-lg transition-all hover:border-purple-400"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-white font-bold">DOP</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-purple-800">DevOps Engineer Professional</h3>
                      <p className="text-sm text-purple-600">AWS DOP-C02 Equivalent Track</p>
                    </div>
                  </div>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">100% Coverage</span>
                </div>
                <p className="text-gray-700 mb-4">{labsIndex.learning_paths.dop_c02_track.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-purple-600 font-medium">{labsIndex.learning_paths.dop_c02_track.labs.length} labs</span>
                  <span className="text-gray-600">{labsIndex.learning_paths.dop_c02_track.estimated_total_time}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Other Learning Paths */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Additional Learning Paths</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(labsIndex.learning_paths)
              .filter(([pathId]) => !['solutions_architect_associate', 'solutions_architect_professional'].includes(pathId))
              .slice(0, 6)
              .map(([pathId, path]) => (
              <div
                key={pathId}
                onClick={() => setSelectedPath(pathId)}
                className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-all hover:border-gray-300"
              >
                <h4 className="font-medium text-gray-900 mb-2">{path.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{path.description}</p>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{path.labs.length} labs</span>
                  <span>{path.estimated_total_time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search labs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Learning Path Filter */}
          <select
            value={selectedPath}
            onChange={(e) => setSelectedPath(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Learning Paths</option>
            {Object.entries(labsIndex.learning_paths).map(([pathId, path]) => (
              <option key={pathId} value={pathId}>{path.title}</option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {Object.entries(labsIndex.categories).map(([categoryId, category]) => (
              <option key={categoryId} value={categoryId}>{category.title}</option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Difficulty Levels</option>
            {Object.entries(labsIndex.difficulty_levels).map(([difficultyId, difficulty]) => (
              <option key={difficultyId} value={difficultyId}>{difficulty.title}</option>
            ))}
          </select>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedPath !== 'all') && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedPath !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                  Path: {labsIndex.learning_paths[selectedPath]?.title}
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                  Category: {labsIndex.categories[selectedCategory]?.title}
                </span>
              )}
              {selectedDifficulty !== 'all' && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-orange-100 text-orange-800">
                  Difficulty: {labsIndex.difficulty_levels[selectedDifficulty]?.title}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setSelectedDifficulty('all')
                  setSelectedPath('all')
                }}
                className="text-xs text-red-600 hover:text-red-800 underline ml-2"
              >
                Clear all
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold">{filteredLabs.length}</span> of <span className="font-semibold">{labsIndex.labs.length}</span> labs
        </p>
      </div>

      {/* Labs Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredLabs.map((lab) => {
          const IconComponent = getCategoryIcon(lab.category)
          return (
            <div
              key={lab.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-all hover:border-blue-300 cursor-pointer"
              onClick={() => loadLab(lab)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <IconComponent className="h-8 w-8 text-blue-600 mr-3" />
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(lab.difficulty)}`}>
                        {lab.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{lab.title}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{lab.description}</p>

                {/* Metadata */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon className="h-4 w-4 mr-1" />
                    {lab.estimated_time}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <TagIcon className="h-4 w-4 mr-1" />
                    {labsIndex.categories[lab.category]?.title}
                  </div>
                </div>

                {/* Services */}
                <div className="space-y-2 mb-4">
                  <div className="text-xs">
                    <span className="font-medium text-orange-600">AWS:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {lab.aws_services.slice(0, 3).map((service, index) => (
                        <span key={index} className="inline-block bg-orange-50 text-orange-700 px-2 py-1 rounded text-xs">
                          {service}
                        </span>
                      ))}
                      {lab.aws_services.length > 3 && (
                        <span className="text-orange-600">+{lab.aws_services.length - 3} more</span>
                      )}
                    </div>
                  </div>
                  <div className="text-xs">
                    <span className="font-medium text-blue-600">Azure:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {lab.azure_services.slice(0, 3).map((service, index) => (
                        <span key={index} className="inline-block bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                          {service}
                        </span>
                      ))}
                      {lab.azure_services.length > 3 && (
                        <span className="text-blue-600">+{lab.azure_services.length - 3} more</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Certification Tags */}
                {lab.tags.some(tag => ['expert', 'sap-c02', 'sap-c02-critical', 'saa-c03', 'saa-c03-critical', 'enterprise'].includes(tag)) && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {lab.tags.filter(tag => ['expert', 'sap-c02', 'sap-c02-critical', 'saa-c03', 'saa-c03-critical', 'enterprise'].includes(tag)).map((tag, index) => (
                      <span 
                        key={index} 
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          tag === 'saa-c03-critical' ? 'bg-red-100 text-red-800 border border-red-300' :
                          tag === 'sap-c02-critical' ? 'bg-red-100 text-red-800 border border-red-300' :
                          tag === 'saa-c03' ? 'bg-orange-100 text-orange-800' :
                          tag === 'sap-c02' ? 'bg-blue-100 text-blue-800' :
                          tag === 'expert' ? 'bg-purple-100 text-purple-800' :
                          'bg-indigo-100 text-indigo-800'
                        }`}
                      >
                        {tag === 'saa-c03-critical' ? 'SAA-C03 Critical' :
                         tag === 'sap-c02-critical' ? 'SAP-C02 Critical' :
                         tag === 'saa-c03' ? 'SAA-C03' :
                         tag === 'sap-c02' ? 'SAP-C02' :
                         tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Action */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600 font-medium">Start Lab</span>
                  <ArrowRightIcon className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredLabs.length === 0 && (
        <div className="text-center py-16">
          <BeakerIcon className="mx-auto h-24 w-24 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900 mt-4">No labs found</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
        </div>
      )}

      {/* Stats Footer */}
      <div className="mt-16 bg-gray-50 rounded-lg p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">AWS Certification Readiness</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">
              {labsIndex.labs.filter(lab => lab.tags.includes('saa-c03') || lab.tags.includes('saa-c03-critical')).length}
            </div>
            <div className="text-sm text-gray-600">SAA-C03 Labs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {labsIndex.labs.filter(lab => lab.tags.includes('sap-c02') || lab.tags.includes('sap-c02-critical')).length}
            </div>
            <div className="text-sm text-gray-600">SAP-C02 Labs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {labsIndex.labs.filter(lab => lab.tags.includes('dop-c02') || lab.tags.includes('dop-c02-critical')).length}
            </div>
            <div className="text-sm text-gray-600">DOP-C02 Labs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">
              {labsIndex.labs.filter(lab => lab.tags.includes('saa-c03-critical') || lab.tags.includes('sap-c02-critical') || lab.tags.includes('dop-c02-critical')).length}
            </div>
            <div className="text-sm text-gray-600">Critical Gap Labs</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">100%</div>
            <div className="text-sm text-gray-600">Complete Coverage</div>
          </div>
        </div>
      </div>
    </div>
  )
}