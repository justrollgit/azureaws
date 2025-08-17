# Deployment Guide

## Prerequisites

- Node.js 18+
- PostgreSQL database
- Azure subscription (for production deployment)

## Local Development Setup

1. **Clone and Setup**
   ```bash
   git clone <repository-url>
   cd azureaws
   ./scripts/setup.sh
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Update .env with your database URL and secrets
   ```

3. **Database Setup**
   ```bash
   # Install Prisma CLI globally
   npm install -g prisma
   
   # Generate Prisma client
   npx prisma generate
   
   # Push schema to database
   npx prisma db push
   ```

4. **Start Development Servers**
   ```bash
   # Terminal 1: Frontend (Next.js)
   npm run dev
   
   # Terminal 2: Backend (Express API)
   npm run backend:dev
   ```

## Production Deployment (Azure)

### 1. Azure Resources Setup

```bash
# Create resource group
az group create --name aws-to-azure-prod --location eastus

# Create App Service Plan
az appservice plan create \
  --name aws-to-azure-plan \
  --resource-group aws-to-azure-prod \
  --sku B1 \
  --is-linux

# Create PostgreSQL server
az postgres flexible-server create \
  --name aws-to-azure-db \
  --resource-group aws-to-azure-prod \
  --location eastus \
  --admin-user azureuser \
  --admin-password <secure-password> \
  --public-access 0.0.0.0 \
  --tier Burstable \
  --sku-name Standard_B1ms
```

### 2. Application Deployment

**Frontend (Static Web App)**
```bash
# Build the frontend
npm run build

# Deploy to Azure Static Web Apps
az staticwebapp create \
  --name aws-to-azure-frontend \
  --resource-group aws-to-azure-prod \
  --source . \
  --location eastus \
  --branch main \
  --app-location "frontend" \
  --output-location "out"
```

**Backend (App Service)**
```bash
# Create Web App
az webapp create \
  --resource-group aws-to-azure-prod \
  --plan aws-to-azure-plan \
  --name aws-to-azure-api \
  --runtime "NODE|18-lts"

# Configure environment variables
az webapp config appsettings set \
  --resource-group aws-to-azure-prod \
  --name aws-to-azure-api \
  --settings \
    DATABASE_URL="postgresql://azureuser:<password>@aws-to-azure-db.postgres.database.azure.com:5432/postgres" \
    JWT_SECRET="<production-jwt-secret>" \
    NODE_ENV="production"

# Deploy backend
zip -r backend.zip backend/ package.json package-lock.json
az webapp deployment source config-zip \
  --resource-group aws-to-azure-prod \
  --name aws-to-azure-api \
  --src backend.zip
```

### 3. Database Migration

```bash
# Set production database URL
export DATABASE_URL="postgresql://azureuser:<password>@aws-to-azure-db.postgres.database.azure.com:5432/postgres"

# Run migrations
npx prisma db push
```

### 4. DNS and SSL

```bash
# Add custom domain (optional)
az webapp config hostname add \
  --resource-group aws-to-azure-prod \
  --webapp-name aws-to-azure-api \
  --hostname api.your-domain.com

# SSL certificate will be auto-managed by Azure
```

## Monitoring and Maintenance

### 1. Application Insights
```bash
# Enable Application Insights
az monitor app-insights component create \
  --app aws-to-azure-insights \
  --location eastus \
  --resource-group aws-to-azure-prod

# Configure web app to use Application Insights
az webapp config appsettings set \
  --resource-group aws-to-azure-prod \
  --name aws-to-azure-api \
  --settings APPINSIGHTS_INSTRUMENTATIONKEY="<instrumentation-key>"
```

### 2. Backup Strategy
```bash
# Enable automatic backups for PostgreSQL
az postgres flexible-server backup create \
  --name aws-to-azure-db \
  --resource-group aws-to-azure-prod \
  --backup-name initial-backup
```

### 3. Security Configuration

- Enable Azure AD authentication for the web app
- Configure Key Vault for sensitive configuration
- Set up network security groups
- Enable DDoS protection
- Configure CORS policies

## CI/CD Pipeline (GitHub Actions)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Azure

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm install
        
      - name: Build frontend
        run: npm run build
        
      - name: Deploy to Azure Static Web Apps
        uses: Azure/static-web-apps-deploy@v1
        with:
          azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
          repo_token: ${{ secrets.GITHUB_TOKEN }}
          action: "upload"
          app_location: "frontend"
          output_location: "out"
          
      - name: Deploy API to Azure App Service
        uses: azure/webapps-deploy@v2
        with:
          app-name: 'aws-to-azure-api'
          publish-profile: ${{ secrets.AZURE_WEBAPP_PUBLISH_PROFILE }}
          package: './backend'
```

## Cost Optimization

- Use Azure Reserved Instances for predictable workloads
- Implement auto-scaling based on traffic patterns  
- Use Azure CDN for static assets
- Monitor costs with Azure Cost Management
- Consider serverless options for low-traffic periods

## Security Best Practices

- Enable Azure Security Center
- Use managed identities where possible
- Implement proper CORS policies
- Regular security updates and patches
- Monitor with Azure Sentinel
- Use Azure Key Vault for secrets management

## Performance Monitoring

- Set up Application Insights dashboards
- Monitor database performance metrics
- Implement health check endpoints
- Set up alerting for critical metrics
- Use Azure Load Testing for performance validation