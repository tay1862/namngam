# 🚀 NAMNGAM Production Deployment Guide

## ຂັ້ນຕອນການ Deploy ໃຫ້ VPS

### 1. Setup Database (PostgreSQL)

```bash
# ຕິດຕັ້ງ PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# ເຂົ້າ PostgreSQL
sudo -u postgres psql

# ສ້າງ database ແລະ user
CREATE DATABASE namngam_db;
CREATE USER namngam_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE namngam_db TO namngam_user;
\q
```

### 2. Clone Project

```bash
cd ~
git clone https://github.com/tay1862/namngam.git
cd namngam
```

### 3. Setup Environment Variables

```bash
# ສ້າງໄຟລ່ .env
nano .env
```

ໃສ່ຂໍ້ມູນນີ້:

```env
# Database
DATABASE_URL="postgresql://namngam_user:your_secure_password@localhost:5432/namngam_db?schema=public"

# NextAuth
NEXTAUTH_URL="http://167.86.84.139:3001"
NEXTAUTH_SECRET="generate_random_string_here"

# Optional: Google Analytics
NEXT_PUBLIC_GA_ID="your_ga_id"
```

**ສ້າງ NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 4. Install & Build

```bash
# ຕິດຕັ້ງ dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Push database schema
npm run db:push

# Build production
npm run build
```

### 5. ສ້າງ Admin User ຄົນທຳອິດ

```bash
npm run create-admin
```

ປ້ອນຂໍ້ມູນ:
- ຊື່: Admin
- ອີເມວ: admin@namngam.com (ຫຼືອີເມວທີ່ຕ້ອງການ)
- ລະຫັດຜ່ານ: (ລະຫັດທີ່ປອດໄພ)

### 6. Setup PM2

```bash
# ຕິດຕັ້ງ PM2 (ຖ້າຍັງ)
npm install -g pm2

# Start application
pm2 start npm --name "namngam" -- start

# Save PM2 configuration
pm2 save

# Setup auto-start on reboot
pm2 startup
```

### 7. ເຂົ້າສູ່ລະບົບ Admin

1. ເປີດ browser: `http://167.86.84.139:3001/admin/login`
2. ເຂົ້າສູ່ລະບົບດ້ວຍ admin user ທີ່ສ້າງ
3. ເລີ່ມເພີ່ມເນື້ອຫາ!

---

## 📝 ການຈັດການເນື້ອຫາ

### Admin Panel Features:

#### 1. **Products** (`/admin/products`)
- ເພີ່ມສິນຄ້າກັວຊາ
- ອັບໂຫຼດຮູບພາບ (ໃຊ້ URL)
- ກຳນົດ features ແລະ benefits
- ຕັ້ງສະຖານະ inStock ແລະ featured

#### 2. **Blog** (`/admin/blog`)
- ຂຽນບົດຄວາມແບບ Markdown
- Draft/Publish toggle
- ໃສ່ຮູບພາບແລະ category
- Auto-generate slug

#### 3. **FAQ** (`/admin/faq`)
- ເພີ່ມຄຳຖາມ-ຄຳຕອບ
- ຈັດ category
- ເລີຍງລຳດັບການສະແດງຜົນ

#### 4. **Subscribers** (`/admin/subscribers`)
- ເບິ່ງລາຍຊື່ຜູ້ສະໝັກ Newsletter
- Export ເປັນ CSV

#### 5. **Settings** (`/admin/settings`)
- ຕັ້ງຄ່າຊື່ເວັບໄຊ້
- ຂໍ້ມູນຕິດຕໍ່
- Social media links

---

## 🔄 Update Code

```bash
cd ~/namngam

# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm install

# Generate Prisma Client (if schema changed)
npx prisma generate

# Apply database changes (if any)
npm run db:push

# Rebuild
npm run build

# Restart PM2
pm2 restart namngam
```

---

## 🛠️ Useful Commands

```bash
# ເບິ່ງ logs
pm2 logs namngam

# ເບິ່ງ status
pm2 status

# Restart application
pm2 restart namngam

# Stop application
pm2 stop namngam

# Delete from PM2
pm2 delete namngam

# View database
npm run db:studio
```

---

## 🔒 Security Checklist

- ✅ เปลี่ยน NEXTAUTH_SECRET เป็น random string
- ✅ ใช้ strong password สำหรับ admin
- ✅ ใช้ strong password สำหรับ database
- ✅ Setup firewall (ufw)
- ✅ Setup SSL certificate (Let's Encrypt) ถ้ามี domain
- ✅ Backup database เป็นประจำ

---

## 📦 Backup Database

```bash
# Export database
pg_dump -U namngam_user -d namngam_db > backup_$(date +%Y%m%d).sql

# Import database
psql -U namngam_user -d namngam_db < backup_20241021.sql
```

---

## 🎨 Customization

### เปลี่ยนสี:
แก้ไขไฟล์ `tailwind.config.ts`

### เปลี่ยนโลโก้:
แทนที่ไฟล์ `public/Logo-namngam-white.png`

### แก้ไข metadata:
แก้ไขไฟล์ `app/layout.tsx`

---

## 📞 Support

- Email: Namngambrand@gmail.com
- Phone: +856 20 55 485 622
- Facebook: [NAMNGAM Page]

---

## ✨ Next Steps

1. ✅ Deploy to VPS
2. ✅ Setup database
3. ✅ Create admin user
4. ⏳ Add real products
5. ⏳ Write blog content
6. ⏳ Add FAQs
7. ⏳ Test all features
8. ⏳ Setup domain (optional)
9. ⏳ Setup SSL (optional)
10. ⏳ Go live!
