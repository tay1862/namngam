#!/bin/bash
###############################################################################
# NAMNGAM VPS Deployment Script
# Usage: ./deploy.sh
###############################################################################

set -e  # Exit on error

VPS_IP="167.86.84.139"
VPS_USER="root"
VPS_PATH="/var/www/namngam"

echo "🚀 NAMNGAM DEPLOYMENT SCRIPT"
echo "================================"
echo ""
echo "VPS: $VPS_IP"
echo "Path: $VPS_PATH"
echo ""

# Check if SSH is available
echo "📡 Testing SSH connection..."
if ! timeout 5 ssh -o ConnectTimeout=3 "$VPS_USER@$VPS_IP" "echo '✅ Connected'" 2>/dev/null; then
    echo "❌ Cannot connect to VPS"
    echo ""
    echo "Manual deployment:"
    echo "  1. ssh $VPS_USER@$VPS_IP"
    echo "  2. cd $VPS_PATH"
    echo "  3. git pull origin main"
    echo "  4. npm run build"
    echo "  5. pm2 restart namngam"
    exit 1
fi

echo "✅ SSH connection successful"
echo ""

# Deploy
echo "🔄 Deploying to VPS..."
echo ""

ssh "$VPS_USER@$VPS_IP" << 'ENDSSH'
set -e

cd /var/www/namngam

echo "📥 Step 1/5: Pulling latest code..."
git pull origin main

echo ""
echo "📦 Step 2/5: Installing dependencies..."
npm install --production

echo ""
echo "🏗️  Step 3/5: Building..."
rm -rf .next
npm run build

echo ""
echo "🔄 Step 4/5: Restarting PM2..."
pm2 restart namngam

echo ""
echo "✅ Step 5/5: Checking status..."
pm2 status namngam

echo ""
echo "📊 Recent logs:"
pm2 logs namngam --lines 10 --nostream

echo ""
echo "================================"
echo "✅ Deployment Complete!"
echo "================================"
echo ""
echo "🌐 Website: https://namngam.com"
echo "🔐 Admin: https://namngam.com/admin"
echo ""
echo "Next steps:"
echo "  1. Open https://namngam.com"
echo "  2. Test language switching (🇱🇦 🇹🇭 🇺🇸 🇨🇳)"
echo "  3. Login to /admin"
echo "  4. Check About & Benefits sections"
echo ""

ENDSSH

echo ""
echo "🎉 Deployment finished!"
echo ""
echo "Run this to check database:"
echo "  ssh $VPS_USER@$VPS_IP 'cd $VPS_PATH && node check-vps-database.js'"
echo ""
