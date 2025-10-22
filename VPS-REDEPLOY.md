# 🔄 VPS Re-deployment Instructions

## ขั้นตอนการลบและติดตั้งใหม่

### 1. SSH เข้า VPS:
```bash
ssh root@167.86.84.139
```

### 2. Stop และลบ PM2 instance เก่า:
```bash
pm2 stop namngam
pm2 delete namngam
pm2 save
```

### 3. ลบโฟลเดอร์เก่า:
```bash
cd ~
rm -rf namngam
```

### 4. Clone โค้ดใหม่:
```bash
git clone https://github.com/tay1862/namngam.git
cd namngam
```

### 5. Install dependencies:
```bash
npm install
```

### 6. สร้างไฟล์ .env:
```bash
nano .env
```

**วางเนื้อหานี้:**
```env
# Database
DATABASE_URL="postgresql://namngam_user:Te1862005@localhost:5432/namngam_db?schema=public"

# NextAuth
NEXTAUTH_URL="http://167.86.84.139:3001"
NEXTAUTH_SECRET="a3NdAc0phd+2c8y+Vv4jGNheAFX75fT4ik0FF3DtKas="

# Port
PORT=3001

# Google Analytics (Optional)
# NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

บันทึก: `Ctrl+O` → `Enter` → `Ctrl+X`

### 7. Generate Prisma Client:
```bash
npx prisma generate
```

### 8. Push Database Schema (ถ้ายังไม่ได้ทำ):
```bash
npm run db:push
```

### 9. Build Production:
```bash
npm run build
```

### 10. สร้าง ecosystem.config.js:
```bash
nano ecosystem.config.js
```

**วางเนื้อหานี้:**
```javascript
module.exports = {
  apps: [{
    name: "namngam",
    script: "npm",
    args: "start",
    env: {
      PORT: 3001,
      NODE_ENV: "production"
    }
  }]
}
```

บันทึก: `Ctrl+O` → `Enter` → `Ctrl+X`

### 11. สร้าง Admin User:
```bash
npm run create-admin
```

**ป้อนข้อมูล:**
- ຊື່ຜູ້ໃຊ້ (Name): `Admin NAMNGAM`
- ອີເມວ (Email): `admin@namngam.com`
- ລະຫັດຜ່ານ (Password): `namngam@2025`

รอจนขึ้น: `✅ ສ້າງ Admin User ສຳເລັດ!`

### 12. Start with PM2:
```bash
pm2 start ecosystem.config.js
pm2 save
```

### 13. ตรวจสอบ:
```bash
pm2 status
pm2 logs namngam --lines 20
```

ควรเห็น:
```
✓ Ready in 2s
- Network: http://167.86.84.139:3001
```

### 14. ทดสอบ:

**Frontend:**
```
http://167.86.84.139:3001/
```

**Admin Login:**
```
http://167.86.84.139:3001/admin/login
```

Login ด้วย:
- Email: `admin@namngam.com`
- Password: `namngam@2025`

---

## 🎉 เสร็จสิ้น!

ตอนนี้ระบบควรทำงานปกติแล้ว ไม่มี redirect loop!

### คำสั่งที่ใช้บ่อย:

```bash
# ดู logs
pm2 logs namngam

# Restart
pm2 restart namngam

# Stop
pm2 stop namngam

# Status
pm2 status
```

---

## 🐛 Troubleshooting:

### ถ้า port 3001 ถูกใช้อยู่:
```bash
# หา process ที่ใช้ port 3001
lsof -i :3001

# Kill process
kill -9 <PID>
```

### ถ้า database error:
```bash
# เช็ค PostgreSQL
sudo systemctl status postgresql

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### ถ้า build error:
```bash
# ลบ .next และ build ใหม่
rm -rf .next
npm run build
```
