# AWS to Azure Transition Platform

A comprehensive learning platform designed to help AWS cloud engineers successfully transition to Azure cloud services.

## 🎯 Mission

Bridge the knowledge gap between AWS and Azure by providing:
- Interactive service mappings
- Hands-on learning labs
- Certification roadmaps
- Real-world scenarios
- Community support

## 🏗️ Architecture

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + Headless UI
- **State**: Zustand for client-side state management
- **Auth**: NextAuth.js with Azure AD integration

### Backend
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Hosting**: Azure App Service

### Content Structure
```
content/
├── aws-azure-mapping/     # Service comparison matrices
├── labs/                  # Interactive hands-on exercises
├── assessments/          # Skills gap analysis tools
└── certifications/       # Certification pathway guides
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL (for local development)

### Installation
```bash
# Install dependencies
npm install

# Set up database
npm run db:setup

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev          # Start Next.js dev server
npm run backend:dev  # Start Express API server
npm run type-check   # TypeScript validation
npm run lint         # ESLint code checking
npm run test         # Run test suite
```

## 📚 Core Features

### 1. Service Comparison Matrix
Interactive tables comparing AWS and Azure services:
- Compute (EC2 ↔ VMs, Lambda ↔ Functions)
- Storage (S3 ↔ Blob Storage, EBS ↔ Managed Disks)
- Networking (VPC ↔ VNet, Route 53 ↔ DNS)
- Databases (RDS ↔ SQL Database, DynamoDB ↔ Cosmos DB)

### 2. Learning Paths
Structured curriculum based on current AWS expertise:
- **Foundation**: Basic Azure concepts for AWS users
- **Associate**: Intermediate Azure services and patterns
- **Expert**: Advanced architecture and optimization

### 3. Hands-on Labs
Interactive Azure environments with AWS context:
- Guided exercises with step-by-step instructions
- Sandbox environments for safe experimentation
- Real-world scenarios and use cases

### 4. Assessment Tools
- Skills gap analysis questionnaire
- Progress tracking dashboard
- Personalized learning recommendations
- Certification readiness evaluation

### 5. Certification Roadmap
Clear pathways from AWS to Azure certifications:
- AWS SAA → Azure AZ-104 (Administrator)
- AWS SAP → Azure AZ-305 (Architect)
- AWS DevOps → Azure AZ-400 (DevOps)

## 🛠️ Technology Stack

- **Frontend**: React 18, Next.js 14, TypeScript
- **Styling**: Tailwind CSS, Headless UI, Hero Icons
- **Backend**: Node.js, Express.js, TypeScript
- **Database**: PostgreSQL, Prisma ORM
- **Auth**: NextAuth.js, Azure AD
- **Deployment**: Azure App Service, Azure Database
- **CI/CD**: GitHub Actions
- **Infrastructure**: Terraform (Azure)

## 📊 Project Status

- [x] Project initialization
- [x] Basic architecture setup
- [ ] Service comparison matrix
- [ ] Interactive learning modules
- [ ] Assessment tools
- [ ] User authentication
- [ ] Progress tracking
- [ ] Community features

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines for details.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- Documentation: `/docs`
- Issues: GitHub Issues
- Community: Discord Server
- Email: support@aws-to-azure.com# azureaws
