# 🎯 คู่มือติดตั้ง Admin Panel - NAMNGAM

## ✅ สิ่งที่ทำเสร็จแล้ว

- ✅ Database Schema (Prisma)
- ✅ Authentication (NextAuth.js)
- ✅ Admin Login Page (สีดำ-ทอง)
- ✅ Admin Dashboard
- ✅ Sidebar Navigation
- ✅ Protected Routes

---

## 📋 ขั้นตอนการติดตั้ง

### **1. Setup PostgreSQL บน VPS**

```bash
# SSH เข้า VPS
ssh root@167.86.84.139

# ติดตั้ง PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib -y

# เปิด PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# สร้าง database
sudo -u postgres psql
```

**ใน PostgreSQL shell:**
```sql
CREATE DATABASE namngam;
CREATE USER namngam WITH ENCRYPTED PASSWORD 'namngam_password_2024';
GRANT ALL PRIVILEGES ON DATABASE namngam TO namngam;
ALTER DATABASE namngam OWNER TO namngam;
\q
```

**Allow remote connections:**
```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/*/main/postgresql.conf
# เปลี่ยน:
listen_addresses = '*'

# Edit pg_hba.conf
sudo nano /etc/postgresql/*/main/pg_hba.conf
# เพิ่มบรรทัดนี้:
host    all             all             0.0.0.0/0               md5

# Restart PostgreSQL
sudo systemctl restart postgresql

# เปิด Firewall (port 5432)
sudo ufw allow 5432/tcp
```

---

### **2. Update .env.local**

```bash
# สร้างไฟล์ .env.local
cp .env .env.local

# แก้ไข .env.local
nano .env.local
```

**เปลี่ยนเป็น:**
```env
# Database (VPS)
DATABASE_URL="postgresql://namngam:namngam_password_2024@167.86.84.139:5432/namngam?schema=public"

# NextAuth
NEXTAUTH_SECRET="namngam-super-secret-key-2024-change-this"
NEXTAUTH_URL="http://167.86.84.139:3001"

# Google Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

---

### **3. สร้าง Database Tables**

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push
```

---

### **4. สร้าง Admin User แรก**

```bash
# สร้าง admin user
npm run create-admin admin@namngam.com admin123 "Admin Namngam"
```

**Output:**
```
✅ Admin user created successfully!
📧 Email: admin@namngam.com
🔑 Password: admin123
⚠️  IMPORTANT: Change the password after first login!
```

---

### **5. Build & Run**

```bash
# Build
npm run build

# Start (Development)
npm run dev

# หรือ Start (Production)
npm start
```

---

### **6. เข้าสู่ระบบ Admin**

**URL:** http://localhost:3000/admin/login
- หรือ http://167.86.84.139:3001/admin/login (VPS)

**Login:**
- Email: `admin@namngam.com`
- Password: `admin123`

---

## 🔒 การซ่อน Admin Panel

Admin Panel จะ**ซ่อนสนิท** ไม่มีลิงก์ไปหน้า admin ในเว็บหลัก

**เข้าได้แค่:**
- พิมพ์ URL โดยตรง: `/admin/login`
- ไม่มี link ในหน้าหลัก
- ไม่มีใน sitemap
- ไม่ให้ Google index

---

## 🎨 หน้าที่มีในระบบ

### **✅ พร้อมใช้:**
- `/admin/login` - Login Page
- `/admin/dashboard` - Dashboard หลัก

### **⏳ กำลังสร้าง:**
- `/admin/products` - จัดการสินค้า
- `/admin/blog` - จัดการบทความ
- `/admin/faq` - จัดการ FAQ
- `/admin/subscribers` - ดูรายชื่อผู้สมัคร
- `/admin/settings` - ตั้งค่าเว็บ

---

## 🚀 Deploy บน VPS

### **1. Clone repo บน VPS:**
```bash
cd /var/www/namngam
git pull origin main
```

### **2. ติดตั้ง dependencies:**
```bash
npm install
```

### **3. Setup environment:**
```bash
cp .env.example .env
nano .env
# ใส่ DATABASE_URL และ NEXTAUTH_SECRET
```

### **4. Setup database:**
```bash
npm run db:generate
npm run db:push
npm run create-admin
```

### **5. Build & Start:**
```bash
npm run build
pm2 restart namngam
```

---

## 📊 Database Schema

### **Tables:**
- `User` - Admin users
- `Product` - สินค้า
- `BlogPost` - บทความ
- `FAQ` - คำถามที่พบบ่อย
- `SiteSettings` - ตั้งค่าเว็บ
- `Subscriber` - ผู้สมัครรับข่าวสาร

---

## 🔐 Security

- ✅ Password hashing (bcrypt)
- ✅ Session-based auth (JWT)
- ✅ Protected routes (middleware)
- ✅ No public links to admin
- ✅ HTTPS (บน production)

---

## 🐛 Troubleshooting

### **ปัญหา: Database connection failed**
```bash
# เช็ค PostgreSQL
sudo systemctl status postgresql

# เช็ค port
sudo netstat -tulpn | grep 5432

# Test connection
psql -h 167.86.84.139 -U namngam -d namngam
```

### **ปัญหา: Prisma errors**
```bash
# Regenerate client
npx prisma generate

# Reset database
npx prisma migrate reset
npx prisma db push
```

---

## 📞 Support

ถ้ามีปัญหา ติดต่อ:
- Email: Namngambrand@gmail.com
- WhatsApp: +856 20 55 485 622

---

**สร้างโดย:** Factory AI
**วันที่:** 2024
