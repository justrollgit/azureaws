import { 
  ClockIcon, 
  AcademicCapIcon, 
  CheckCircleIcon,
  ArrowRightIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'

// This would typically come from an API or CMS
const certificationData = {
  certification_paths: [
    {
      aws_cert: {
        name: "AWS Certified Solutions Architect - Associate",
        code: "SAA-C03",
        level: "Associate",
        domains: ["Design Resilient Architectures", "Design High-Performing Architectures", "Design Secure Architectures", "Design Cost-Optimized Architectures"]
      },
      azure_equivalent: {
        name: "Microsoft Azure Administrator",
        code: "AZ-104",
        level: "Associate",
        domains: ["Manage Azure identities and governance", "Implement and manage storage", "Deploy and manage Azure compute resources", "Configure and manage virtual networking", "Monitor and back up Azure resources"]
      },
      transition_plan: {
        duration_weeks: 8,
        prerequisites: ["Basic Azure fundamentals", "Hands-on Azure experience"],
        learning_path: [
          {
            week: 1,
            topic: "Azure Identity and Governance",
            aws_context: "Compare with AWS IAM and Organizations",
            resources: ["Azure AD documentation", "Hands-on labs"]
          },
          {
            week: 2,
            topic: "Azure Storage Solutions",
            aws_context: "Compare with S3, EBS, and EFS",
            resources: ["Storage account types", "Blob storage labs"]
          },
          {
            week: 3,
            topic: "Azure Compute Services",
            aws_context: "Compare with EC2, Auto Scaling",
            resources: ["VM sizing", "Scale sets", "App Services"]
          },
          {
            week: 4,
            topic: "Azure Networking",
            aws_context: "Compare with VPC, Route 53, ELB",
            resources: ["VNet configuration", "Load balancer setup"]
          },
          {
            week: 5,
            topic: "Monitoring and Backup",
            aws_context: "Compare with CloudWatch, AWS Backup",
            resources: ["Azure Monitor", "Backup solutions"]
          },
          {
            week: 6,
            topic: "Practice Exams",
            aws_context: "Focus on Azure-specific implementations",
            resources: ["Mock exams", "Scenario-based questions"]
          },
          {
            week: 7,
            topic: "Hands-on Projects",
            aws_context: "Implement AWS solutions in Azure",
            resources: ["Migration scenarios", "Real-world labs"]
          },
          {
            week: 8,
            topic: "Final Review",
            aws_context: "Key differences summary",
            resources: ["Exam cram", "Last-minute tips"]
          }
        ]
      }
    },
    {
      aws_cert: {
        name: "AWS Certified Solutions Architect - Professional",
        code: "SAP-C02",
        level: "Professional",
        domains: ["Design Solutions for Organizational Complexity", "Design for New Solutions", "Continuous Improvement for Existing Solutions", "Accelerate Workload Migration and Modernization"]
      },
      azure_equivalent: {
        name: "Microsoft Azure Solutions Architect Expert",
        code: "AZ-305",
        level: "Expert",
        domains: ["Design identity, governance, and monitor solutions", "Design data storage solutions", "Design business continuity solutions", "Design infrastructure solutions"]
      },
      transition_plan: {
        duration_weeks: 12,
        prerequisites: ["AZ-104 certification", "Enterprise Azure experience"],
        learning_path: [
          {
            week: 1,
            topic: "Enterprise Identity Architecture",
            aws_context: "Compare with AWS SSO, Directory Service",
            resources: ["Azure AD Connect", "Hybrid identity"]
          },
          {
            week: 2,
            topic: "Governance and Compliance",
            aws_context: "Compare with AWS Organizations, Config",
            resources: ["Azure Policy", "Management groups"]
          },
          {
            week: 3,
            topic: "Data Architecture",
            aws_context: "Compare with RDS, DynamoDB, Redshift",
            resources: ["SQL Database", "Cosmos DB", "Synapse"]
          }
        ]
      }
    }
  ]
}

export const metadata = {
  title: 'Certification Roadmap | AWS to Azure Transition',
  description: 'Structured pathways from AWS certifications to Azure equivalents.',
}

export default function CertificationRoadmapPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <AcademicCapIcon className="w-12 h-12 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Certification Roadmap</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Structured learning paths from AWS certifications to Azure equivalents, 
          designed specifically for experienced AWS professionals.
        </p>
      </div>

      {/* Certification Paths */}
      <div className="space-y-16">
        {certificationData.certification_paths.map((path, pathIndex) => (
          <div key={pathIndex} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            {/* Path Header */}
            <div className="bg-gradient-to-r from-orange-500 to-blue-600 p-6 text-white">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-bold mb-2">From AWS</h2>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">{path.aws_cert.name}</h3>
                    <div className="flex items-center mt-2 text-sm opacity-90">
                      <span className="bg-white bg-opacity-30 px-2 py-1 rounded mr-2">
                        {path.aws_cert.code}
                      </span>
                      <span>{path.aws_cert.level} Level</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">To Azure</h2>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4">
                    <h3 className="font-semibold text-lg">{path.azure_equivalent.name}</h3>
                    <div className="flex items-center mt-2 text-sm opacity-90">
                      <span className="bg-white bg-opacity-30 px-2 py-1 rounded mr-2">
                        {path.azure_equivalent.code}
                      </span>
                      <span>{path.azure_equivalent.level} Level</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Path Details */}
            <div className="p-6">
              {/* Overview */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <ClockIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{path.transition_plan.duration_weeks} Weeks</div>
                  <div className="text-sm text-gray-600">Study Duration</div>
                </div>
                <div className="text-center">
                  <BookOpenIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">{path.transition_plan.learning_path.length} Modules</div>
                  <div className="text-sm text-gray-600">Learning Modules</div>
                </div>
                <div className="text-center">
                  <CheckCircleIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900">Hands-on</div>
                  <div className="text-sm text-gray-600">Practical Labs</div>
                </div>
              </div>

              {/* Prerequisites */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Prerequisites</h3>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <ul className="space-y-2">
                    {path.transition_plan.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircleIcon className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
                        <span className="text-yellow-800">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Domain Comparison */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Domain Mapping</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium aws-brand mb-3">AWS Domains ({path.aws_cert.code})</h4>
                    <ul className="space-y-2">
                      {path.aws_cert.domains.map((domain, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-orange-500 rounded-full mt-2 mr-3"></span>
                          <span className="text-gray-700 text-sm">{domain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium azure-brand mb-3">Azure Domains ({path.azure_equivalent.code})</h4>
                    <ul className="space-y-2">
                      {path.azure_equivalent.domains.map((domain, index) => (
                        <li key={index} className="flex items-start">
                          <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></span>
                          <span className="text-gray-700 text-sm">{domain}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Learning Path Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Learning Path</h3>
                <div className="space-y-4">
                  {path.transition_plan.learning_path.map((week, weekIndex) => (
                    <div key={weekIndex} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full mr-3">
                            Week {week.week}
                          </span>
                          <h4 className="font-semibold text-gray-900">{week.topic}</h4>
                        </div>
                      </div>
                      
                      <div className="ml-14">
                        <div className="mb-3">
                          <span className="text-sm font-medium text-orange-600">AWS Context: </span>
                          <span className="text-sm text-gray-700">{week.aws_context}</span>
                        </div>
                        
                        <div>
                          <span className="text-sm font-medium text-blue-600">Resources: </span>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {week.resources.map((resource, resourceIndex) => (
                              <span key={resourceIndex} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                {resource}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="btn-primary flex items-center justify-center">
                  Start Learning Path
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </button>
                <button className="btn-secondary">
                  Download Study Guide
                </button>
                <a href="/assessment" className="btn-secondary">
                  Take Skills Assessment
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 mt-16 text-center">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Ready to Start Your Certification Journey?</h2>
        <p className="text-blue-800 mb-6 max-w-2xl mx-auto">
          Take our skills assessment to get a personalized learning plan based on your current AWS knowledge and Azure learning goals.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/assessment" className="btn-primary">
            Take Skills Assessment
          </a>
          <a href="/learning-paths" className="btn-secondary">
            Browse All Learning Paths
          </a>
        </div>
      </div>
    </div>
  )
}