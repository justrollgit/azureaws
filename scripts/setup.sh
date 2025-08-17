#!/bin/bash

# AWS to Azure Transition Platform - Setup Script
# This script sets up the development environment

set -e

echo "🚀 Setting up AWS to Azure Transition Platform..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ npm version $(npm -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Copy environment variables
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ .env file created. Please update it with your configuration."
else
    echo "✅ .env file already exists"
fi

# Check if PostgreSQL is needed
echo ""
echo "🗄️  Database Setup"
echo "This application requires PostgreSQL for the backend API."
echo "You can either:"
echo "  1. Install PostgreSQL locally"
echo "  2. Use a cloud PostgreSQL service (Azure Database, AWS RDS, etc.)"
echo "  3. Use Docker: docker run --name aws-azure-postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres"
echo ""
echo "Update the DATABASE_URL in your .env file with your PostgreSQL connection string."

# Type checking
echo "🔍 Running type check..."
npm run type-check

if [ $? -ne 0 ]; then
    echo "⚠️  Type check failed, but continuing setup..."
else
    echo "✅ Type check passed"
fi

# Build check
echo "🏗️  Testing build process..."
npm run build

if [ $? -ne 0 ]; then
    echo "⚠️  Build failed, but setup completed. Fix any issues before running."
else
    echo "✅ Build successful"
fi

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "  1. Update .env file with your database connection and secrets"
echo "  2. Set up PostgreSQL database"
echo "  3. Run database migrations: npx prisma db push"
echo "  4. Start development server: npm run dev"
echo "  5. Start backend API: npm run backend:dev (in separate terminal)"
echo ""
echo "The application will be available at http://localhost:3000"
echo "API will be available at http://localhost:3001"