#!/bin/bash

# 🚀 Deploy with Database Migration
# This script deploys code and migrates database on VPS

set -e  # Exit on error

echo "🚀 Starting deployment with database migration..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}   NAMNGAM Multi-Language System - Deploy + Migrate${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Check if we can SSH to VPS
echo -e "${YELLOW}📡 Checking connection to VPS...${NC}"
if ! ssh -o ConnectTimeout=5 root@167.86.84.139 "echo 'Connected'" > /dev/null 2>&1; then
    echo -e "${RED}❌ Cannot connect to VPS!${NC}"
    echo -e "${YELLOW}Please check:${NC}"
    echo "  - VPS is running"
    echo "  - SSH key is configured"
    echo "  - Network connection is stable"
    exit 1
fi
echo -e "${GREEN}✅ Connected to VPS${NC}"
echo ""

# Deploy
echo -e "${YELLOW}📦 Deploying to VPS...${NC}"
ssh root@167.86.84.139 << 'ENDSSH'

set -e  # Exit on error

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

cd /var/www/namngam

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Step 1: Pulling latest code...${NC}"
git fetch origin
git reset --hard origin/main
echo -e "${GREEN}✅ Code updated${NC}"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Step 2: Installing dependencies...${NC}"
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Step 3: 🚨 CRITICAL - Running database migration...${NC}"
echo ""
echo -e "${YELLOW}⚠️  This will add multi-language columns to database${NC}"
echo -e "${YELLOW}⚠️  Safe operation - only adds columns, no data loss${NC}"
echo ""

# Try migrate deploy first (proper way)
if npx prisma migrate deploy 2>&1; then
    echo -e "${GREEN}✅ Database migrated successfully (migrate deploy)${NC}"
else
    echo -e "${YELLOW}⚠️  Migrate deploy failed, trying db push...${NC}"
    
    # Fallback to db push
    if npx prisma db push --skip-generate 2>&1; then
        echo -e "${GREEN}✅ Database migrated successfully (db push)${NC}"
    else
        echo -e "${RED}❌ Database migration failed!${NC}"
        echo -e "${YELLOW}Please check database connection and try manually:${NC}"
        echo "  ssh root@167.86.84.139"
        echo "  cd /var/www/namngam"
        echo "  npx prisma db push"
        exit 1
    fi
fi
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Step 4: Generating Prisma client...${NC}"
npx prisma generate
echo -e "${GREEN}✅ Prisma client generated${NC}"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Step 5: Building application...${NC}"
rm -rf .next
npm run build
echo -e "${GREEN}✅ Build completed${NC}"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Step 6: Restarting PM2...${NC}"
pm2 restart namngam
echo -e "${GREEN}✅ PM2 restarted${NC}"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}Step 7: Checking status...${NC}"
pm2 status namngam
echo ""

echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ DEPLOYMENT SUCCESSFUL!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}📊 Recent logs:${NC}"
pm2 logs namngam --lines 20 --nostream

ENDSSH

echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}🎉 DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}🧪 Next steps:${NC}"
echo ""
echo -e "${YELLOW}Test About page:${NC}"
echo "  https://www.namngam.com/admin/about"
echo ""
echo -e "${YELLOW}Test Benefits page:${NC}"
echo "  https://www.namngam.com/admin/benefits"
echo ""
echo -e "${YELLOW}Test Products page:${NC}"
echo "  https://www.namngam.com/admin/products"
echo ""
echo -e "${YELLOW}Test Blog page:${NC}"
echo "  https://www.namngam.com/admin/blog"
echo ""
echo -e "${YELLOW}Test FAQ page:${NC}"
echo "  https://www.namngam.com/admin/faq"
echo ""
echo -e "${BLUE}Expected result:${NC}"
echo "  ✅ All pages save successfully (no 500 errors)"
echo "  ✅ Multi-language fields work"
echo "  ✅ Frontend changes language dynamically"
echo ""
echo -e "${GREEN}Done! 🚀🎉${NC}"
