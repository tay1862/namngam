#!/bin/bash

echo "🔍 เจอปัญหา: Database ไม่มี!"
echo ""
echo "คุณบันทึกข้อมูลที่ไหน?"
echo ""
echo "1️⃣  บันทึกบน VPS (167.86.84.139) - ใช้ Production Database"
echo "2️⃣  บันทึกบน Local (localhost) - สร้าง Local Database"
echo ""
read -p "เลือก (1 หรือ 2): " choice

if [ "$choice" = "1" ]; then
  echo ""
  echo "✅ กำลังตั้งค่าเชื่อมต่อ Production Database..."
  echo ""
  echo "🔐 ต้องการ Database URL จาก VPS"
  echo ""
  echo "วิธีหา Database URL:"
  echo "  ssh root@167.86.84.139"
  echo "  cd /var/www/namngam"
  echo "  cat .env | grep DATABASE_URL"
  echo ""
  read -p "กด Enter เมื่อเข้า SSH แล้ว..."
  
elif [ "$choice" = "2" ]; then
  echo ""
  echo "✅ กำลังสร้าง Local Database..."
  echo ""
  
  # Create database
  echo "📝 สร้าง database 'namngam'..."
  psql postgres -c "DROP DATABASE IF EXISTS namngam;"
  psql postgres -c "DROP USER IF EXISTS namngam;"
  psql postgres -c "CREATE USER namngam WITH PASSWORD 'namngam_password';"
  psql postgres -c "CREATE DATABASE namngam OWNER namngam;"
  
  echo ""
  echo "✅ สร้าง database สำเร็จ!"
  echo ""
  echo "🔄 กำลัง migrate database..."
  npx prisma migrate deploy
  
  echo ""
  echo "🌱 กำลัง seed ข้อมูลเริ่มต้น..."
  npx prisma db seed
  
  echo ""
  echo "✅ เสร็จสิ้น! ลองเปิดเว็บดู:"
  echo "   npm run dev"
  echo "   http://localhost:3000"
  
else
  echo "❌ กรุณาเลือก 1 หรือ 2"
fi
