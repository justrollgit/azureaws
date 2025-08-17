'use client'

import { useState, useMemo } from 'react'
import { MagnifyingGlassIcon, ArrowRightIcon, BookOpenIcon } from '@heroicons/react/24/outline'

interface Service {
  aws: {
    name: string
    description: string
    use_cases: string[]
    pricing_model: string
  }
  azure: {
    name: string
    description: string
    use_cases: string[]
    pricing_model: string
  }
  migration_notes: string[]
  learning_resources: string[]
}

interface ServiceCategory {
  category: string
  description: string
  services: Service[]
}

// Import comprehensive service data from JSON files
import computeServices from '@/content/aws-azure-mapping/compute-services.json'
import storageServices from '@/content/aws-azure-mapping/storage-services.json'
import networkingServices from '@/content/aws-azure-mapping/networking-services.json'
import databaseServices from '@/content/aws-azure-mapping/database-services.json'

const serviceData: ServiceCategory[] = [
  computeServices,
  storageServices,
  networkingServices,
  databaseServices
]

export default function ServiceComparison() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const categories = ['All', ...serviceData.map(cat => cat.category)]

  const filteredServices = useMemo(() => {
    return serviceData
      .filter(category => selectedCategory === 'All' || category.category === selectedCategory)
      .map(category => ({
        ...category,
        services: category.services.filter(service =>
          service.aws.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.azure.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.aws.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.azure.description.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }))
      .filter(category => category.services.length > 0)
  }, [searchTerm, selectedCategory])

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">AWS to Azure Service Comparison</h1>
        <p className="text-lg text-gray-600 mb-6">
          Interactive comparison of AWS and Azure services to help you understand equivalent services and migration paths.
        </p>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Service Categories */}
      {filteredServices.map((category) => (
        <div key={category.category} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.category}</h2>
          <p className="text-gray-600 mb-6">{category.description}</p>

          <div className="space-y-6">
            {category.services.map((service, index) => {
              const serviceKey = `${category.category}-${index}`
              const isExpanded = expandedService === serviceKey

              return (
                <div key={serviceKey} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* AWS Service */}
                    <div className="p-6 border-r border-gray-200">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold aws-brand">{service.aws.name}</h3>
                        <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">AWS</span>
                      </div>
                      <p className="text-gray-600 mb-4">{service.aws.description}</p>
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Use Cases:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {service.aws.use_cases.map((useCase, i) => (
                            <li key={i}>{useCase}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Pricing: </span>
                        <span className="text-gray-600">{service.aws.pricing_model}</span>
                      </div>
                    </div>

                    {/* Azure Service */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-lg font-semibold azure-brand">{service.azure.name}</h3>
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">Azure</span>
                      </div>
                      <p className="text-gray-600 mb-4">{service.azure.description}</p>
                      <div className="mb-4">
                        <h4 className="font-medium mb-2">Use Cases:</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {service.azure.use_cases.map((useCase, i) => (
                            <li key={i}>{useCase}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Pricing: </span>
                        <span className="text-gray-600">{service.azure.pricing_model}</span>
                      </div>
                    </div>
                  </div>

                  {/* Migration Details */}
                  <div className="border-t border-gray-200">
                    <button
                      onClick={() => setExpandedService(isExpanded ? null : serviceKey)}
                      className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900">Migration Notes & Resources</span>
                        <ArrowRightIcon className={`h-5 w-5 transform transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-gray-100">
                        <div className="grid md:grid-cols-2 gap-6 pt-4">
                          <div>
                            <h4 className="font-medium mb-3 flex items-center">
                              <ArrowRightIcon className="h-4 w-4 mr-2" />
                              Migration Notes
                            </h4>
                            <ul className="space-y-2">
                              {service.migration_notes.map((note, i) => (
                                <li key={i} className="text-sm text-gray-600 flex items-start">
                                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                  {note}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-3 flex items-center">
                              <BookOpenIcon className="h-4 w-4 mr-2" />
                              Learning Resources
                            </h4>
                            <ul className="space-y-2">
                              {service.learning_resources.map((resource, i) => (
                                <li key={i} className="text-sm">
                                  <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                                    {resource}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {filteredServices.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No services found matching your criteria.</p>
          <p className="text-gray-400 mt-2">Try adjusting your search or filter options.</p>
        </div>
      )}
    </div>
  )
}