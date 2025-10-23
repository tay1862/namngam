#!/bin/bash

# NAMNGAM Gua Sha Blog - Production Deployment Script
# ใช้สคริปต์นี้สำหรับ deploy บน VPS

set -e  # Exit on error

echo "🚀 NAMNGAM Deployment Starting..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running as root
if [ "$EUID" -eq 0 ]; then 
  echo -e "${RED}⚠️  Do not run this script as root${NC}"
  exit 1
fi

# 1. Check prerequisites
echo -e "\n${YELLOW}[1/8] Checking prerequisites...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js 18+${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Please install npm${NC}"
    exit 1
fi

if ! command -v psql &> /dev/null; then
    echo -e "${RED}❌ PostgreSQL not found. Please install PostgreSQL${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites found${NC}"

# 2. Check .env file
echo -e "\n${YELLOW}[2/8] Checking environment variables...${NC}"

if [ ! -f .env ]; then
    echo -e "${RED}❌ .env file not found${NC}"
    echo "Please create .env file from .env.production template"
    exit 1
fi

# Check if NEXTAUTH_SECRET is still default
if grep -q "CHANGE_THIS" .env; then
    echo -e "${RED}❌ Please update .env file with production values${NC}"
    echo "Run: openssl rand -base64 48"
    exit 1
fi

echo -e "${GREEN}✅ Environment variables configured${NC}"

# 3. Install dependencies
echo -e "\n${YELLOW}[3/8] Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"

# 4. Generate Prisma Client
echo -e "\n${YELLOW}[4/8] Generating Prisma Client...${NC}"
npx prisma generate
echo -e "${GREEN}✅ Prisma Client generated${NC}"

# 5. Database setup
echo -e "\n${YELLOW}[5/8] Setting up database...${NC}"
npx prisma db push --accept-data-loss
echo -e "${GREEN}✅ Database schema updated${NC}"

# 6. Seed data (optional)
echo -e "\n${YELLOW}[6/8] Seed database?${NC}"
read -p "Do you want to seed sample data? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    npm run seed
    echo -e "${GREEN}✅ Database seeded${NC}"
else
    echo -e "${YELLOW}⏭️  Skipped seeding${NC}"
fi

# 7. Build production
echo -e "\n${YELLOW}[7/8] Building production...${NC}"
npm run build
echo -e "${GREEN}✅ Production build completed${NC}"

# 8. Setup PM2 (if available)
echo -e "\n${YELLOW}[8/8] Setting up PM2...${NC}"

if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}PM2 not found. Installing...${NC}"
    read -p "Install PM2 globally? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        sudo npm install -g pm2
        echo -e "${GREEN}✅ PM2 installed${NC}"
    else
        echo -e "${YELLOW}⏭️  Skipped PM2 installation${NC}"
        echo -e "\n${GREEN}🎉 Deployment complete!${NC}"
        echo -e "${YELLOW}Start app manually with: npm start${NC}"
        exit 0
    fi
fi

# Check if app is already running
if pm2 list | grep -q "namngam"; then
    echo -e "${YELLOW}App already running. Restarting...${NC}"
    pm2 restart namngam
    echo -e "${GREEN}✅ App restarted${NC}"
else
    echo -e "${YELLOW}Starting app...${NC}"
    pm2 start npm --name "namngam" -- start
    pm2 save
    echo -e "${GREEN}✅ App started${NC}"
fi

# Setup PM2 startup
echo -e "\n${YELLOW}Setting up PM2 auto-start...${NC}"
pm2 startup
echo -e "${GREEN}✅ PM2 configured for auto-start${NC}"

# Summary
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}🎉 Deployment Complete!${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 Next Steps:"
echo "1. Create admin user: npm run create-admin"
echo "2. Access website: http://$(curl -s ifconfig.me):3001"
echo "3. Login to admin: /admin/login"
echo ""
echo "📊 Monitor app:"
echo "  pm2 logs namngam      # View logs"
echo "  pm2 status            # Check status"
echo "  pm2 monit             # Real-time monitoring"
echo ""
echo -e "${YELLOW}⚠️  Don't forget to:${NC}"
echo "- Change admin password after first login"
echo "- Setup domain and SSL"
echo "- Configure automated backups"
echo ""
