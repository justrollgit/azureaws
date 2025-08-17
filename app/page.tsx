import Link from 'next/link'
import { ArrowRightIcon, CloudIcon, AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          From <span className="aws-brand">AWS</span> to <span className="azure-brand">Azure</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Master Azure cloud services with your existing AWS knowledge. 
          Interactive learning paths, hands-on labs, and certification guidance.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/learning-paths" className="btn-primary inline-flex items-center">
            Start Learning
            <ArrowRightIcon className="ml-2 h-5 w-5" />
          </Link>
          <Link href="/service-comparison" className="btn-secondary">
            Compare Services
          </Link>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="card text-center">
          <CloudIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Service Mapping</h3>
          <p className="text-gray-600">
            Interactive comparison between AWS and Azure services with practical examples.
          </p>
        </div>
        
        <div className="card text-center">
          <AcademicCapIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Learning Paths</h3>
          <p className="text-gray-600">
            Structured curriculum tailored to your current AWS expertise level.
          </p>
        </div>
        
        <div className="card text-center">
          <ChartBarIcon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
          <p className="text-gray-600">
            Monitor your learning progress and get personalized recommendations.
          </p>
        </div>
      </div>

      {/* Quick Start */}
      <div className="card max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Quick Start Guide</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">1. Assess Your Skills</h3>
            <p className="text-gray-600 mb-4">Take our assessment to identify your current AWS knowledge and Azure learning gaps.</p>
            
            <h3 className="font-semibold mb-2">2. Choose Your Path</h3>
            <p className="text-gray-600">Select a learning path based on your role and certification goals.</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">3. Hands-on Practice</h3>
            <p className="text-gray-600 mb-4">Use our interactive labs to gain practical Azure experience.</p>
            
            <h3 className="font-semibold mb-2">4. Get Certified</h3>
            <p className="text-gray-600">Follow our certification roadmap to achieve Azure credentials.</p>
          </div>
        </div>
      </div>
    </div>
  )
}