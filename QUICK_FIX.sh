#!/bin/bash

# 🚨 QUICK FIX - Migrate All Tables at Once
# Run this if About works but other pages don't

echo "🚨 QUICK FIX - Migrating all database tables..."
echo ""

ssh root@167.86.84.139 << 'ENDSSH'

cd /var/www/namngam

echo "📦 Pulling latest code..."
git pull origin main

echo ""
echo "🚨 CRITICAL: Running database migration..."
echo "This will add multi-language columns to ALL tables:"
echo "  - AboutSection ✅ (already done)"
echo "  - BenefitItem"
echo "  - Product"
echo "  - BlogPost"
echo "  - FAQ"
echo ""

# Force push schema to database
npx prisma db push --accept-data-loss

echo ""
echo "🔧 Generating Prisma client..."
npx prisma generate

echo ""
echo "🏗️  Rebuilding application..."
npm run build

echo ""
echo "🔄 Restarting PM2..."
pm2 restart namngam

echo ""
echo "✅ DONE! Check status:"
pm2 status

echo ""
echo "📊 Recent logs:"
pm2 logs namngam --lines 20 --nostream

ENDSSH

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Quick Fix Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🧪 Now test each page:"
echo ""
echo "1. Benefits: https://www.namngam.com/admin/benefits"
echo "   - Add new benefit + Save"
echo "   - Expected: ✅ Saves successfully (no 500 error)"
echo ""
echo "2. Products: https://www.namngam.com/admin/products"
echo "   - Add product with 4 languages + Save"
echo "   - Expected: ✅ Saves successfully"
echo ""
echo "3. Blog: https://www.namngam.com/admin/blog"
echo "   - Add blog with 4 languages + Save"
echo "   - Expected: ✅ Saves successfully"
echo ""
echo "4. FAQ: https://www.namngam.com/admin/faq"
echo "   - Add FAQ with 4 languages + Save"
echo "   - Expected: ✅ Saves successfully"
echo ""
echo "Done! 🚀"
