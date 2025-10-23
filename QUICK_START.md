# ⚡ เริ่มต้นใช้งานด่วน - NAMNGAM Gua Sha Blog

**สำหรับผู้ที่ต้องการ deploy เร็ว ๆ!**

---

## 🎯 ขั้นตอนการ Deploy (5 ขั้นตอน)

### 1️⃣ อัพเดทการตั้งค่า (5 นาที)

```bash
cd /path/to/guasha-blog

# คัดลอก environment template
cp .env.production .env

# แก้ไขไฟล์ .env
nano .env
```

**แก้ไข 3 ค่าสำคัญ:**
```env
DATABASE_URL="postgresql://namngam_user:YOUR_PASSWORD@localhost:5432/namngam_db"
NEXTAUTH_SECRET="RUN_THIS: openssl rand -base64 48"
NEXTAUTH_URL="http://167.86.84.139:3001"  # หรือ domain ของคุณ
```

### 2️⃣ ติดตั้ง PostgreSQL (5 นาที)

```bash
# ติดตั้ง
sudo apt update && sudo apt install -y postgresql postgresql-contrib

# สร้าง database
sudo -u postgres psql -c "CREATE DATABASE namngam_db;"
sudo -u postgres psql -c "CREATE USER namngam_user WITH PASSWORD 'YOUR_PASSWORD';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE namngam_db TO namngam_user;"
```

### 3️⃣ Deploy แบบอัตโนมัติ (5-10 นาที)

```bash
chmod +x scripts/deploy.sh
./scripts/deploy.sh
```

**สคริปต์จะทำให้อัตโนมัติ:**
- ✅ Install dependencies
- ✅ Setup database schema
- ✅ Seed ข้อมูลตัวอย่าง
- ✅ Build production
- ✅ Start ด้วย PM2

### 4️⃣ เข้าใช้งาน (1 นาที)

```bash
# เปิดเว็บเบราว์เซอร์
http://167.86.84.139:3001

# Login admin
http://167.86.84.139:3001/admin/login

Username: admin@namngam.com
Password: admin123
```

### 5️⃣ เปลี่ยนรหัสผ่าน (1 นาที)

1. Login เข้า Admin Panel
2. ไป Settings
3. เปลี่ยนรหัสใหม่ (แข็งแรง!)
4. Save

---

## 🎊 เสร็จแล้ว!

**เว็บของคุณพร้อมใช้งานแล้ว!**

### 📝 ขั้นตอนต่อไป:

1. **เพิ่มสินค้า:** Products → + ເພີ່ມສິນຄ້າ
2. **เขียนบทความ:** Blog → + ຂຽນບົດຄວາມໃໝ່
3. **ตั้งค่าเว็บ:** Settings → แก้ไขข้อมูล

---

## 📚 เอกสารเพิ่มเติม

- **DEPLOYMENT_SUMMARY.md** - สรุปทั้งหมด
- **PRODUCTION_REPORT.md** - รายละเอียดครบ
- **USER_GUIDE.md** - คู่มือใช้งาน

---

## 🆘 มีปัญหา?

### Build Failed:
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Database Error:
```bash
# ตรวจสอบ PostgreSQL
sudo systemctl status postgresql
sudo systemctl restart postgresql
```

### Port ถูกใช้แล้ว:
```bash
# หา process
lsof -i :3001

# Kill
sudo kill -9 <PID>
```

---

## 📞 ติดต่อ

- **Email:** Namngambrand@gmail.com
- **Phone:** +856 20 55 485 622

---

**เวลาทั้งหมด:** ~20 นาที  
**ความยาก:** ⭐⭐☆☆☆ (ง่าย)  
**Status:** ✅ พร้อมใช้งาน
