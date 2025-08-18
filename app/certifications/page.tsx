import React from 'react'
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
    // Foundational Level
    {
      aws_cert: {
        name: "AWS Certified Cloud Practitioner",
        code: "CLF-C02",
        level: "Foundational",
        domains: ["Cloud Concepts", "Security and Compliance", "Cloud Technology and Services", "Billing, Pricing, and Support"]
      },
      azure_equivalent: {
        name: "Microsoft Azure Fundamentals",
        code: "AZ-900",
        level: "Foundational",
        domains: ["Cloud concepts", "Azure architecture and services", "Azure management and governance"]
      },
      transition_plan: {
        duration_weeks: 4,
        prerequisites: ["Basic cloud understanding"],
        learning_path: [
          {
            week: 1,
            topic: "Cloud Fundamentals",
            aws_context: "Compare cloud benefits and deployment models",
            resources: ["Azure fundamentals", "Cloud concepts"]
          },
          {
            week: 2,
            topic: "Core Azure Services",
            aws_context: "Map AWS services to Azure equivalents",
            resources: ["Service comparison", "Hands-on exploration"]
          },
          {
            week: 3,
            topic: "Security and Compliance",
            aws_context: "Compare shared responsibility models",
            resources: ["Azure security", "Compliance frameworks"]
          },
          {
            week: 4,
            topic: "Pricing and Support",
            aws_context: "Compare billing models and support tiers",
            resources: ["Cost management", "Support options"]
          }
        ]
      }
    },
    // Associate Level
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
        name: "AWS Developer Associate",
        code: "DVA-C02",
        level: "Associate",
        domains: ["Development with AWS Services", "Security", "Deployment", "Troubleshooting & Optimization"]
      },
      azure_equivalent: {
        name: "Microsoft Azure Developer Associate",
        code: "AZ-204",
        level: "Associate",
        domains: ["Develop Azure compute solutions", "Develop for Azure storage", "Implement Azure security", "Monitor, troubleshoot, and optimize Azure solutions"]
      },
      transition_plan: {
        duration_weeks: 10,
        prerequisites: ["Programming experience", "AZ-900 recommended"],
        learning_path: [
          {
            week: 1,
            topic: "Azure App Service Development",
            aws_context: "Compare with Elastic Beanstalk and Lambda",
            resources: ["App Service deployment", "Configuration management"]
          },
          {
            week: 2,
            topic: "Azure Functions & Serverless",
            aws_context: "Compare with AWS Lambda and API Gateway",
            resources: ["Function triggers", "Serverless patterns"]
          },
          {
            week: 3,
            topic: "Azure Storage Development",
            aws_context: "Compare with S3 SDK and DynamoDB",
            resources: ["Blob storage APIs", "Cosmos DB integration"]
          },
          {
            week: 4,
            topic: "Authentication & Authorization",
            aws_context: "Compare with AWS Cognito and IAM",
            resources: ["Azure AD integration", "Managed identities"]
          },
          {
            week: 5,
            topic: "Container Solutions",
            aws_context: "Compare with ECS and EKS",
            resources: ["Azure Container Instances", "AKS development"]
          },
          {
            week: 6,
            topic: "Event-Driven Architecture",
            aws_context: "Compare with SQS, SNS, and EventBridge",
            resources: ["Service Bus", "Event Grid", "Event Hubs"]
          },
          {
            week: 7,
            topic: "Monitoring & Diagnostics",
            aws_context: "Compare with CloudWatch and X-Ray",
            resources: ["Application Insights", "Azure Monitor"]
          },
          {
            week: 8,
            topic: "CI/CD with Azure DevOps",
            aws_context: "Compare with CodePipeline and CodeBuild",
            resources: ["Azure Pipelines", "Release management"]
          },
          {
            week: 9,
            topic: "Security Implementation",
            aws_context: "Compare with AWS security services",
            resources: ["Key Vault integration", "Security scanning"]
          },
          {
            week: 10,
            topic: "Performance Optimization",
            aws_context: "Azure-specific optimization techniques",
            resources: ["Performance testing", "Resource optimization"]
          }
        ]
      }
    },
    {
      aws_cert: {
        name: "AWS SysOps Administrator Associate",
        code: "SOA-C02",
        level: "Associate",
        domains: ["Monitoring, Logging, and Remediation", "Reliability & Business Continuity", "Deployment, Provisioning & Automation", "Security & Compliance", "Networking & Content Delivery", "Cost & Performance Optimization"]
      },
      azure_equivalent: {
        name: "Microsoft Azure Administrator",
        code: "AZ-104",
        level: "Associate",
        domains: ["Manage Azure identities and governance", "Implement and manage storage", "Deploy and manage Azure compute resources", "Configure and manage virtual networking", "Monitor and back up Azure resources"]
      },
      transition_plan: {
        duration_weeks: 8,
        prerequisites: ["Azure fundamentals", "System administration experience"],
        learning_path: [
          {
            week: 1,
            topic: "Azure Monitoring & Logging",
            aws_context: "Compare with CloudWatch and CloudTrail",
            resources: ["Azure Monitor setup", "Log Analytics"]
          },
          {
            week: 2,
            topic: "Backup & Disaster Recovery",
            aws_context: "Compare with AWS Backup and disaster recovery",
            resources: ["Azure Backup", "Site Recovery"]
          },
          {
            week: 3,
            topic: "Infrastructure Automation",
            aws_context: "Compare with CloudFormation and Systems Manager",
            resources: ["ARM templates", "Azure Automation"]
          },
          {
            week: 4,
            topic: "Security Operations",
            aws_context: "Compare with AWS security monitoring",
            resources: ["Security Center", "Sentinel"]
          },
          {
            week: 5,
            topic: "Network Operations",
            aws_context: "Compare with VPC and CloudFront",
            resources: ["VNet management", "CDN operations"]
          },
          {
            week: 6,
            topic: "Cost Management",
            aws_context: "Compare with AWS Cost Explorer",
            resources: ["Cost analysis", "Budget alerts"]
          },
          {
            week: 7,
            topic: "Performance Optimization",
            aws_context: "Azure-specific optimization",
            resources: ["Resource scaling", "Performance monitoring"]
          },
          {
            week: 8,
            topic: "Incident Response",
            aws_context: "Operational procedures",
            resources: ["Troubleshooting", "Remediation"]
          }
        ]
      }
    },
    {
      aws_cert: {
        name: "AWS Data Engineer Associate",
        code: "DEA-C01",
        level: "Associate",
        domains: ["Data Ingestion & Transformation", "Data Store Management", "Data Operations & Support", "Data Security & Governance"]
      },
      azure_equivalent: {
        name: "Microsoft Azure Data Engineer Associate",
        code: "DP-203",
        level: "Associate",
        domains: ["Design and implement data storage", "Design and develop data processing", "Design and implement data security", "Monitor and optimize data storage and data processing"]
      },
      transition_plan: {
        duration_weeks: 10,
        prerequisites: ["Data engineering experience", "Azure fundamentals"],
        learning_path: [
          {
            week: 1,
            topic: "Azure Data Factory",
            aws_context: "Compare with AWS Glue and Step Functions",
            resources: ["ETL pipelines", "Data integration"]
          },
          {
            week: 2,
            topic: "Azure Synapse Analytics",
            aws_context: "Compare with Redshift and Athena",
            resources: ["Data warehousing", "Analytics workflows"]
          },
          {
            week: 3,
            topic: "Azure Data Lake Storage",
            aws_context: "Compare with S3 data lakes",
            resources: ["Data lake architecture", "Storage optimization"]
          },
          {
            week: 4,
            topic: "Stream Processing",
            aws_context: "Compare with Kinesis and MSK",
            resources: ["Event Hubs", "Stream Analytics"]
          },
          {
            week: 5,
            topic: "Azure Databricks",
            aws_context: "Compare with EMR and SageMaker",
            resources: ["Spark processing", "ML workflows"]
          },
          {
            week: 6,
            topic: "Data Security & Governance",
            aws_context: "Compare with AWS data security",
            resources: ["Purview", "Data classification"]
          },
          {
            week: 7,
            topic: "Cosmos DB",
            aws_context: "Compare with DynamoDB",
            resources: ["NoSQL patterns", "Global distribution"]
          },
          {
            week: 8,
            topic: "Power BI Integration",
            aws_context: "Compare with QuickSight",
            resources: ["Data visualization", "Reporting"]
          },
          {
            week: 9,
            topic: "Data Monitoring",
            aws_context: "Data pipeline monitoring",
            resources: ["Pipeline monitoring", "Data quality"]
          },
          {
            week: 10,
            topic: "Performance Optimization",
            aws_context: "Data processing optimization",
            resources: ["Query optimization", "Cost management"]
          }
        ]
      }
    },
    // Professional Level
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
          },
          {
            week: 4,
            topic: "Business Continuity",
            aws_context: "Compare with AWS Backup, DR strategies",
            resources: ["Site Recovery", "Backup strategies"]
          },
          {
            week: 5,
            topic: "Network Architecture",
            aws_context: "Compare with Transit Gateway, Direct Connect",
            resources: ["Hub-spoke topology", "ExpressRoute"]
          },
          {
            week: 6,
            topic: "Compute Solutions",
            aws_context: "Compare with ECS, EKS, Fargate",
            resources: ["AKS", "Container solutions"]
          },
          {
            week: 7,
            topic: "Monitoring Solutions",
            aws_context: "Compare with CloudWatch, X-Ray",
            resources: ["Azure Monitor", "Application Insights"]
          },
          {
            week: 8,
            topic: "Security Architecture",
            aws_context: "Compare with AWS security services",
            resources: ["Key Vault", "Security Center"]
          },
          {
            week: 9,
            topic: "Migration Strategies",
            aws_context: "AWS migration patterns to Azure",
            resources: ["Migration framework", "Assessment tools"]
          },
          {
            week: 10,
            topic: "Cost Optimization",
            aws_context: "Compare with AWS cost management",
            resources: ["Cost management", "Reserved instances"]
          },
          {
            week: 11,
            topic: "Case Studies",
            aws_context: "Real-world AWS to Azure migrations",
            resources: ["Architecture reviews", "Best practices"]
          },
          {
            week: 12,
            topic: "Exam Preparation",
            aws_context: "Final review and practice",
            resources: ["Mock exams", "Architecture scenarios"]
          }
        ]
      }
    },
    {
      aws_cert: {
        name: "AWS DevOps Engineer Professional",
        code: "DOP-C02",
        level: "Professional",
        domains: ["Configuration Management and IaC", "SDLC Automation", "Monitoring, Incident Response", "Policies, Standards & Automation"]
      },
      azure_equivalent: {
        name: "Microsoft Azure DevOps Engineer Expert",
        code: "AZ-400",
        level: "Expert",
        domains: ["Configure processes and communications", "Design and implement source control", "Design and implement build and release pipelines", "Develop a security and compliance plan", "Implement an instrumentation strategy"]
      },
      transition_plan: {
        duration_weeks: 10,
        prerequisites: ["AZ-104 and AZ-204 certifications", "DevOps experience"],
        learning_path: [
          {
            week: 1,
            topic: "Azure DevOps Services",
            aws_context: "Compare with CodeCommit, CodeBuild, CodePipeline",
            resources: ["Azure Repos", "Azure Pipelines"]
          },
          {
            week: 2,
            topic: "Infrastructure as Code",
            aws_context: "Compare with CloudFormation and CDK",
            resources: ["ARM templates", "Bicep", "Terraform"]
          },
          {
            week: 3,
            topic: "CI/CD Pipelines",
            aws_context: "Compare with AWS CI/CD services",
            resources: ["Build pipelines", "Release management"]
          },
          {
            week: 4,
            topic: "Container DevOps",
            aws_context: "Compare with ECS/EKS DevOps",
            resources: ["AKS DevOps", "Container registries"]
          },
          {
            week: 5,
            topic: "Security Integration",
            aws_context: "Compare with AWS security in CI/CD",
            resources: ["Security scanning", "Compliance automation"]
          },
          {
            week: 6,
            topic: "Monitoring & Logging",
            aws_context: "Compare with CloudWatch integration",
            resources: ["Application Insights", "Log Analytics"]
          },
          {
            week: 7,
            topic: "Release Management",
            aws_context: "Compare with AWS deployment strategies",
            resources: ["Blue-green deployments", "Feature flags"]
          },
          {
            week: 8,
            topic: "Test Automation",
            aws_context: "Compare with AWS testing services",
            resources: ["Test plans", "Load testing"]
          },
          {
            week: 9,
            topic: "Configuration Management",
            aws_context: "Compare with Systems Manager",
            resources: ["Azure Automation", "Desired State Configuration"]
          },
          {
            week: 10,
            topic: "DevOps Culture & Practices",
            aws_context: "Best practices and methodologies",
            resources: ["Agile practices", "Continuous improvement"]
          }
        ]
      }
    },
    // Specialty Certifications
    {
      aws_cert: {
        name: "AWS Security Specialty",
        code: "SCS-C02",
        level: "Specialty",
        domains: ["Threat Detection & Incident Response", "Security Logging & Monitoring", "Infrastructure Security", "Identity & Access Management", "Data Protection", "Governance & Security Management"]
      },
      azure_equivalent: {
        name: "Microsoft Azure Security Engineer Associate",
        code: "AZ-500",
        level: "Associate",
        domains: ["Manage identity and access", "Implement platform protection", "Manage security operations", "Secure data and applications"]
      },
      transition_plan: {
        duration_weeks: 8,
        prerequisites: ["Azure security fundamentals", "Security experience"],
        learning_path: [
          {
            week: 1,
            topic: "Azure Identity Security",
            aws_context: "Compare with AWS IAM advanced features",
            resources: ["Azure AD security", "Conditional access"]
          },
          {
            week: 2,
            topic: "Network Security",
            aws_context: "Compare with AWS network security",
            resources: ["NSGs", "Azure Firewall", "DDoS protection"]
          },
          {
            week: 3,
            topic: "Data Protection",
            aws_context: "Compare with AWS encryption services",
            resources: ["Azure Key Vault", "Encryption at rest"]
          },
          {
            week: 4,
            topic: "Security Monitoring",
            aws_context: "Compare with AWS security monitoring",
            resources: ["Security Center", "Sentinel"]
          },
          {
            week: 5,
            topic: "Compliance & Governance",
            aws_context: "Compare with AWS compliance tools",
            resources: ["Azure Policy", "Compliance manager"]
          },
          {
            week: 6,
            topic: "Incident Response",
            aws_context: "Security incident handling",
            resources: ["Security playbooks", "Threat hunting"]
          },
          {
            week: 7,
            topic: "Application Security",
            aws_context: "Compare with AWS application security",
            resources: ["App security", "Code scanning"]
          },
          {
            week: 8,
            topic: "Security Automation",
            aws_context: "Automated security responses",
            resources: ["Logic Apps", "Security orchestration"]
          }
        ]
      }
    },
    {
      aws_cert: {
        name: "AWS Advanced Networking Specialty",
        code: "ANS-C01",
        level: "Specialty",
        domains: ["Network Design", "Network Implementation", "Network Management & Operations", "Network Security, Compliance & Governance"]
      },
      azure_equivalent: {
        name: "Microsoft Azure Network Engineer Associate",
        code: "AZ-700",
        level: "Associate",
        domains: ["Design, implement, and manage hybrid networking", "Design and implement core networking infrastructure", "Design and implement routing", "Secure and monitor networks"]
      },
      transition_plan: {
        duration_weeks: 10,
        prerequisites: ["Azure networking fundamentals", "Advanced networking experience"],
        learning_path: [
          {
            week: 1,
            topic: "Azure Virtual Networks",
            aws_context: "Compare with VPC advanced features",
            resources: ["VNet design", "Subnetting strategies"]
          },
          {
            week: 2,
            topic: "Hybrid Connectivity",
            aws_context: "Compare with Direct Connect and VPN",
            resources: ["ExpressRoute", "VPN Gateway"]
          },
          {
            week: 3,
            topic: "Load Balancing Solutions",
            aws_context: "Compare with ALB, NLB, and CloudFront",
            resources: ["Load Balancer", "Application Gateway", "Front Door"]
          },
          {
            week: 4,
            topic: "Network Security",
            aws_context: "Compare with AWS network security",
            resources: ["Azure Firewall", "NSGs", "Security policies"]
          },
          {
            week: 5,
            topic: "DNS and Traffic Management",
            aws_context: "Compare with Route 53",
            resources: ["Azure DNS", "Traffic Manager"]
          },
          {
            week: 6,
            topic: "Network Monitoring",
            aws_context: "Compare with VPC Flow Logs",
            resources: ["Network Watcher", "Connection Monitor"]
          },
          {
            week: 7,
            topic: "Hub-Spoke Architecture",
            aws_context: "Compare with Transit Gateway",
            resources: ["Virtual WAN", "Hub-spoke design"]
          },
          {
            week: 8,
            topic: "Network Automation",
            aws_context: "Network infrastructure as code",
            resources: ["ARM templates", "Network automation"]
          },
          {
            week: 9,
            topic: "Troubleshooting",
            aws_context: "Network troubleshooting techniques",
            resources: ["Diagnostic tools", "Performance optimization"]
          },
          {
            week: 10,
            topic: "Advanced Scenarios",
            aws_context: "Complex networking scenarios",
            resources: ["Multi-region", "Disaster recovery"]
          }
        ]
      }
    },
    {
      aws_cert: {
        name: "AWS Machine Learning Specialty",
        code: "MLS-C01",
        level: "Specialty",
        domains: ["Data Engineering", "Exploratory Data Analysis", "Modeling", "ML Implementation & Operations"]
      },
      azure_equivalent: {
        name: "Microsoft Azure AI Engineer Associate",
        code: "AI-102",
        level: "Associate",
        domains: ["Plan and manage an Azure AI solution", "Implement computer vision solutions", "Implement natural language processing solutions", "Implement conversational AI solutions"]
      },
      transition_plan: {
        duration_weeks: 12,
        prerequisites: ["ML experience", "Azure fundamentals"],
        learning_path: [
          {
            week: 1,
            topic: "Azure Machine Learning",
            aws_context: "Compare with SageMaker",
            resources: ["ML workspace", "Compute instances"]
          },
          {
            week: 2,
            topic: "Data Preparation",
            aws_context: "Compare with SageMaker Data Wrangler",
            resources: ["Data prep", "Feature engineering"]
          },
          {
            week: 3,
            topic: "Model Training",
            aws_context: "Compare with SageMaker training",
            resources: ["AutoML", "Custom training"]
          },
          {
            week: 4,
            topic: "Model Deployment",
            aws_context: "Compare with SageMaker endpoints",
            resources: ["Real-time inference", "Batch inference"]
          },
          {
            week: 5,
            topic: "MLOps Practices",
            aws_context: "Compare with SageMaker Pipelines",
            resources: ["ML pipelines", "Model management"]
          },
          {
            week: 6,
            topic: "Cognitive Services",
            aws_context: "Compare with AWS AI services",
            resources: ["Computer Vision", "Language services"]
          },
          {
            week: 7,
            topic: "Bot Framework",
            aws_context: "Compare with Lex",
            resources: ["Conversational AI", "QnA Maker"]
          },
          {
            week: 8,
            topic: "Custom Models",
            aws_context: "Custom ML model development",
            resources: ["Custom vision", "Language understanding"]
          },
          {
            week: 9,
            topic: "ML Security",
            aws_context: "ML security and compliance",
            resources: ["Model security", "Data privacy"]
          },
          {
            week: 10,
            topic: "Performance Optimization",
            aws_context: "ML performance tuning",
            resources: ["Model optimization", "Cost management"]
          },
          {
            week: 11,
            topic: "Integration Patterns",
            aws_context: "ML service integration",
            resources: ["API integration", "Event-driven ML"]
          },
          {
            week: 12,
            topic: "Advanced Scenarios",
            aws_context: "Complex ML implementations",
            resources: ["Multi-model endpoints", "A/B testing"]
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
  const [selectedLevel, setSelectedLevel] = React.useState('all')
  
  const certificationLevels = [
    { id: 'all', name: 'All Levels', count: certificationData.certification_paths.length },
    { id: 'foundational', name: 'Foundational', count: certificationData.certification_paths.filter(p => p.aws_cert.level === 'Foundational').length },
    { id: 'associate', name: 'Associate', count: certificationData.certification_paths.filter(p => p.aws_cert.level === 'Associate').length },
    { id: 'professional', name: 'Professional', count: certificationData.certification_paths.filter(p => p.aws_cert.level === 'Professional').length },
    { id: 'specialty', name: 'Specialty', count: certificationData.certification_paths.filter(p => p.aws_cert.level === 'Specialty').length }
  ]

  const filteredPaths = selectedLevel === 'all' 
    ? certificationData.certification_paths 
    : certificationData.certification_paths.filter(path => 
        path.aws_cert.level.toLowerCase() === selectedLevel
      )

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <AcademicCapIcon className="w-12 h-12 text-blue-600 mr-3" />
          <h1 className="text-4xl font-bold text-gray-900">Complete Certification Roadmap</h1>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive learning paths covering all 11 AWS certifications with Azure equivalents, 
          designed specifically for experienced AWS professionals transitioning to Azure.
        </p>
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4 inline-block">
          <div className="flex items-center text-blue-800">
            <CheckCircleIcon className="w-5 h-5 mr-2" />
            <span className="font-semibold">Complete Coverage:</span>
            <span className="ml-2">11 AWS Certifications → Azure Transition Paths</span>
          </div>
        </div>
      </div>

      {/* Certification Level Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {certificationLevels.map((level) => (
            <button
              key={level.id}
              onClick={() => setSelectedLevel(level.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedLevel === level.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {level.name} ({level.count})
            </button>
          ))}
        </div>
      </div>

      {/* Certification Paths */}
      <div className="space-y-16">
        {filteredPaths.map((path, pathIndex) => (
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
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Complete Your AWS to Azure Certification Journey</h2>
        <p className="text-blue-800 mb-6 max-w-3xl mx-auto">
          With comprehensive coverage of all 11 major AWS certifications, you can systematically transition your expertise to Azure. 
          Start with a skills assessment to create your personalized learning roadmap.
        </p>
        <div className="grid md:grid-cols-3 gap-4 mb-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">11</div>
            <div className="text-sm text-blue-800">AWS Certifications Covered</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">100+</div>
            <div className="text-sm text-blue-800">Learning Modules</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <div className="text-2xl font-bold text-blue-600">4-12</div>
            <div className="text-sm text-blue-800">Weeks per Track</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/assessment" className="btn-primary">
            Take Skills Assessment
          </a>
          <a href="/learning-paths" className="btn-secondary">
            Browse All Learning Paths
          </a>
          <button className="btn-secondary">
            Download Complete Roadmap
          </button>
        </div>
      </div>
    </div>
  )
}