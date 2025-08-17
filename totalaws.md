Here are detailed breakdowns of the exam domains (topics) for the AWS Certified Solutions Architect – Associate (SAA‑C03) and AWS Certified DevOps Engineer – Professional (DOP‑C02) certifications, based on their official exam guides and reputable study resources.

AWS Certified Solutions Architect – Associate (SAA-C03)

The official exam guide outlines four main domains and their relative weighting in the exam 
Reddit
+15
d1.awsstatic.com
+15
Amazon Web Services, Inc.
+15
:

Domain	Weight
1. Design Secure Architectures	30%
2. Design Resilient Architectures	26%
3. Design High-Performing Architectures	24%
4. Design Cost-Optimized Architectures	20%

Key topic highlights per domain (from official guide and study summaries):

Domain 1: Design Secure Architectures 
whizlabs.com
+4
d1.awsstatic.com
+4
d1.awsstatic.com
+4

Secure access via IAM, cross-account roles, federation, MFA, resource policies, and AWS Control Tower.

Secure workloads: VPC components (security groups, NACLs, subnets), application security endpoints, threat mitigation (DDoS, SQL injection), service security (Cognito, GuardDuty, Macie).

Data security: encryption, governance, compliance, audit controls.

Domain 2: Design Resilient Architectures 
whizlabs.com
+10
MedCerts
+10
d1.awsstatic.com
+10

Loosely coupled, scalable designs including microservices and event-driven patterns (e.g., Amazon API Gateway).

Use managed services appropriately, leverage multi-AZ/region deployments, failover strategies.

Domain 3: Design High-Performing Architectures 
MedCerts
+4
d1.awsstatic.com
+4
d1.awsstatic.com
+4

Performance optimization: choosing the right compute, storage, and network services.

Design for high throughput and low latency: caching (ElastiCache), CDN (CloudFront), database selection (RDS, DynamoDB), autoscaling, and load balancing.

Domain 4: Design Cost-Optimized Architectures 
whizlabs.com
Amazon Web Services, Inc.
+11
d1.awsstatic.com
+11
d1.awsstatic.com
+11

Cost efficiency strategies: right-sizing, Reserved Instances, autoscaling, serverless where appropriate, data lifecycle policies, and using Cost Explorer/Budgets.

AWS Certified DevOps Engineer – Professional (DOP-C02)

According to the official exam guide and learning outlines, the DOP-C02 exam covers these six domains with specified weightings 
Jefferson Frank
Pluralsight
:

SDLC Automation (22%)

CI/CD pipelines, automated testing in pipelines, artifact management, deployment strategies for EC2, container, and serverless environments.

Configuration Management & Infrastructure as Code (IaC) (17%)

Defining infrastructure with reusable components, provisioning across accounts/regions, automating onboarding, multi-account security setups.

Resilient Cloud Solutions (formerly High Availability, Fault Tolerance, and Disaster Recovery)

Building fault-tolerant, self-healing systems, multi-AZ/multi-region redundancy.

Monitoring, Logging & Incident & Event Response

Metrics and logging (CloudWatch, CloudTrail), event-driven automation, incident detection and remediation workflows.

Policies & Standards Automation

Automating security controls, governance, tagging, compliance validation (e.g., IAM policies, AWS Config rules).

Security & Compliance

Identity and access management at scale, automated security monitoring, auditing, compliance frameworks.

These domains collectively align with core DevOps practices—ranging from automation, security, governance, observability, and reliability.

Additionally, Tutorials Dojo highlights AWS services commonly encountered in the DOP‑C02 exam 
Reddit
+13
Tutorials Dojo
+13
Jefferson Frank
+13
Jefferson Frank
+1
Amazon Web Services, Inc.
+1
Pluralsight
+1
d1.awsstatic.com
+2
Jefferson Frank
+2
:

Infrastructure & CI/CD: CloudFormation, AWS SAM, CodePipeline, CodeBuild, CodeDeploy, CodeCommit

Monitoring & Ops: CloudWatch Alarms, CloudTrail, Systems Manager, Trusted Advisor

Compute & Orchestration: Lambda, EventBridge, Elastic Beanstalk, ECS, OpsWorks

Governance & Config: AWS Config, tagging strategies, account provisioning tools

Summary Table
Certification & Version	Domains & Weightings	Core Topics
SAA-C03 (Associate)	1. Secure (30%)	IAM, VPC, application/data security, encryption, compliance
	2. Resilient (26%)	Scalability, failover, microservices, multi-AZ/region
	3. High-Performing (24%)	Cache/CDN, DB selection, autoscaling, throughput/latency optimization
	4. Cost-Optimized (20%)	Cost-aware architecture, serverless, reserved/spot, lifecycle policies
DOP-C02 (Professional)	1. SDLC Automation (22%)	CI/CD, testing, deployment patterns
	2. Configuration Management / IaC (17%)	CloudFormation, multi-account/multi-region deployment
	3. Resilient Cloud Solutions	Fault tolerance, self-healing systems
	4. Monitoring / Incident Response	Logging, EventBridge, alerting and response mechanisms
	5. Policies & Standards Automation	Tagging, governance automation, compliance checks
	6. Security & Compliance	IAM at scale, auditing, security automation