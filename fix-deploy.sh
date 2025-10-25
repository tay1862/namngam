#!/bin/bash
###############################################################################
# NAMNGAM Fix Deployment Script
# แก้ปัญหา About/Benefits อัพเดทไม่ได้
###############################################################################

echo "🔧 NAMNGAM FIX DEPLOYMENT"
echo "================================"
echo ""
echo "ปัญหา:"
echo "  ❌ About → กดอัพเดท → ລົ້ມເຫລວ"
echo "  ❌ Benefits → กดอัพเดท → ລົ້ມເຫລວ"
echo ""
echo "สาเหตุ: Code ยัง deploy ไม่สำเร็จบน VPS"
echo ""
echo "================================"
echo ""

VPS_IP="167.86.84.139"
VPS_USER="root"
VPS_PATH="/var/www/namngam"

echo "📡 VPS: $VPS_USER@$VPS_IP"
echo "📁 Path: $VPS_PATH"
echo ""

read -p "กด Enter เพื่อเริ่ม deploy..." 

echo ""
echo "🚀 กำลัง Deploy..."
echo ""

ssh "$VPS_USER@$VPS_IP" << 'ENDSSH'
set -e

cd /var/www/namngam

echo "================================"
echo "📥 STEP 1/6: Pull Latest Code"
echo "================================"
git fetch origin
git reset --hard origin/main
echo "✅ Pull สำเร็จ"

echo ""
echo "================================"
echo "📊 STEP 2/6: Check Current Version"
echo "================================"
echo "Current commits:"
git log --oneline -5
echo ""

echo "================================"
echo "📦 STEP 3/6: Install Dependencies"
echo "================================"
npm install --production
echo "✅ Install สำเร็จ"

echo ""
echo "================================"
echo "🏗️  STEP 4/6: Build Project"
echo "================================"
rm -rf .next
npm run build
echo "✅ Build สำเร็จ"

echo ""
echo "================================"
echo "🔄 STEP 5/6: Restart PM2"
echo "================================"
pm2 restart namngam
echo "✅ Restart สำเร็จ"

echo ""
echo "================================"
echo "📋 STEP 6/6: Check Status"
echo "================================"
pm2 status namngam
echo ""
echo "Recent logs:"
pm2 logs namngam --lines 10 --nostream

echo ""
echo "================================"
echo "✅ DEPLOYMENT COMPLETE!"
echo "================================"
echo ""
echo "🌐 Website: https://namngam.com"
echo "🔐 Admin: https://namngam.com/admin"
echo ""
echo "📝 Next Steps:"
echo "  1. เปิด https://namngam.com/admin/about"
echo "  2. กด 🪄 แปลอัตโนมัติ"
echo "  3. กด ອັບເດດ"
echo "  4. ควรบันทึกสำเร็จแล้ว!"
echo ""

ENDSSH

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Deploy สำเร็จ!"
    echo ""
    echo "ทดสอบเลย:"
    echo "  1. เปิด: https://namngam.com/admin/about"
    echo "  2. กด 🪄 แปลอัตโนมัติ"
    echo "  3. กด ອັບເດດ"
    echo ""
    echo "ถ้ายังไม่ได้ ให้รันคำสั่ง:"
    echo "  ssh root@167.86.84.139 'pm2 logs namngam --lines 50'"
    echo ""
else
    echo ""
    echo "❌ Deploy ล้มเหลว!"
    echo ""
    echo "ลอง Manual:"
    echo "  ssh root@167.86.84.139"
    echo "  cd /var/www/namngam"
    echo "  git pull origin main"
    echo "  npm run build"
    echo "  pm2 restart namngam"
    echo ""
fi
