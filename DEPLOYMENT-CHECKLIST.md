# ✅ NAMNGAM Deployment Checklist

## Pre-Deployment

### ໄຟລ໌ທີ່ຕ້ອງກຽມ
- [x] Logo-namngam-white.png (ວາງໃນ `public/`)
- [x] ລົບ sample blog posts ອອກແລ້ວ
- [x] Admin panel ສຳເລັດ (Products, Blog, FAQ, Subscribers, Settings)
- [x] Frontend ເຊື່ອມ database ແລ້ວ
- [x] Build production ສຳເລັດ

### Environment Setup

#### 1. Database (PostgreSQL)
```bash
# ຕິດຕັ້ງ PostgreSQL
sudo apt install postgresql postgresql-contrib

# ສ້າງ database
sudo -u postgres psql
CREATE DATABASE namngam_db;
CREATE USER namngam_user WITH PASSWORD 'strong_password_here';
GRANT ALL PRIVILEGES ON DATABASE namngam_db TO namngam_user;
\q
```

#### 2. Environment Variables (.env)
```env
# Database
DATABASE_URL="postgresql://namngam_user:password@localhost:5432/namngam_db?schema=public"

# NextAuth (REQUIRED!)
NEXTAUTH_URL="http://167.86.84.139:3001"
NEXTAUTH_SECRET="<generate with: openssl rand -base64 32>"

# Google Analytics (Optional)
NEXT_PUBLIC_GA_ID="G-XXXXXXXXXX"
```

**⚠️ IMPORTANT: Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

---

## Deployment Steps

### Step 1: Clone & Install
```bash
cd ~
git clone https://github.com/tay1862/namngam.git
cd namngam
npm install
```

### Step 2: Setup Environment
```bash
# ສ້າງໄຟລ໌ .env
nano .env
# ວາງຂໍ້ມູນຕາມຂ້າງເທິງ
```

### Step 3: Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Push database schema
npm run db:push

# ຢືນຢັນວ່າຕາຕະລາງຖືກສ້າງແລ້ວ
npm run db:studio
# ເປີດ http://localhost:5555 ເພື່ອເບິ່ງ
```

### Step 4: Build Production
```bash
npm run build
```

### Step 5: Create Admin User
```bash
npm run create-admin
```
**ປ້ອນຂໍ້ມູນ:**
- ຊື່: Admin NAMNGAM
- ອີເມວ: admin@namngam.com (ຫຼືອີເມວຂອງທ່ານ)
- ລະຫັດຜ່ານ: (strong password)

### Step 6: Start with PM2
```bash
# ຕິດຕັ້ງ PM2 (ຖ້າຍັງ)
npm install -g pm2

# Start
pm2 start npm --name "namngam" -- start

# ບັນທຶກ config
pm2 save

# Auto-start on reboot
pm2 startup
# ແລະ run ຄຳສັ່ງທີ່ມັນບອກ
```

---

## Testing Checklist

### ✅ Frontend (Public)
- [ ] ໜ້າຫຼັກ: http://167.86.84.139:3001/
  - [ ] Hero section ສະແດງໂລໂກ້ສີຂາວ
  - [ ] Navigation ເຮັດວຽກ
  - [ ] WhatsApp button ເຮັດວຽກ
  - [ ] Newsletter form ເຮັດວຽກ
  
- [ ] Products: http://167.86.84.139:3001/products
  - [ ] ສະແດງ loading ຖ້າບໍ່ມີສິນຄ້າ
  - [ ] Fallback products ສະແດງຖ້າ DB ຫວ່າງ
  
- [ ] Blog: http://167.86.84.139:3001/blog
  - [ ] ສະແດງຫວ່າງ (ຍັງບໍ່ມີບົດຄວາມ)
  - [ ] ບໍ່ມີ error
  
- [ ] FAQ Section (ໜ້າຫຼັກ)
  - [ ] ສະແດງ FAQ ຈາກ database

### ✅ Admin Panel
- [ ] Login: http://167.86.84.139:3001/admin/login
  - [ ] ໂລໂກ້ສີຂາວສະແດງ
  - [ ] Login ດ້ວຍ admin account ທີ່ສ້າງ
  
- [ ] Dashboard: http://167.86.84.139:3001/admin/dashboard
  - [ ] ສະແດງສະຖິຕິ
  - [ ] Sidebar ເຮັດວຽກ
  
- [ ] Products: http://167.86.84.139:3001/admin/products
  - [ ] ສ້າງສິນຄ້າໃໝ່
  - [ ] ອັບໂຫຼດຮູບ (URL)
  - [ ] ແກ້ໄຂສິນຄ້າ
  - [ ] ລຶບສິນຄ້າ
  
- [ ] Blog: http://167.86.84.139:3001/admin/blog
  - [ ] ສ້າງບົດຄວາມໃໝ່ (Markdown)
  - [ ] Draft/Publish toggle
  - [ ] ແກ້ໄຂ/ລຶບ
  
- [ ] FAQ: http://167.86.84.139:3001/admin/faq
  - [ ] ສ້າງ FAQ
  - [ ] ຈັດລຳດັບ
  - [ ] ແກ້ໄຂ/ລຶບ
  
- [ ] Subscribers: http://167.86.84.139:3001/admin/subscribers
  - [ ] ເບິ່ງລາຍຊື່
  - [ ] Export CSV
  
- [ ] Settings: http://167.86.84.139:3001/admin/settings
  - [ ] ແກ້ໄຂຂໍ້ມູນເວັບໄຊ້
  - [ ] ບັນທຶກສຳເລັດ

---

## Post-Deployment

### 1. ເພີ່ມເນື້ອຫາ
- [ ] ເພີ່ມສິນຄ້າຈິງ (ລຶບ fallback products)
- [ ] ຂຽນບົດຄວາມ 3-5 ບົດ
- [ ] ເພີ່ມ FAQ 5-10 ຂໍ້
- [ ] ອັບເດດ Settings

### 2. SEO & Analytics
- [ ] Setup Google Analytics (ຖ້າມີ)
- [ ] ກວດສອບ sitemap: http://167.86.84.139:3001/sitemap.xml
- [ ] ກວດສອບ robots.txt: http://167.86.84.139:3001/robots.txt

### 3. Security
- [ ] ປ່ຽນ admin password ເປັນ strong password
- [ ] ບໍ່ແຊ share NEXTAUTH_SECRET
- [ ] Setup firewall (ufw)
- [ ] Backup database ເປັນປະຈຳ

### 4. Monitoring
```bash
# ເບິ່ງ logs
pm2 logs namngam

# ເບິ່ງ status
pm2 status

# Restart
pm2 restart namngam
```

---

## Common Issues & Solutions

### Issue 1: Build ລົ້ມເຫລວ
```bash
# ລຶບ .next ແລະ build ໃໝ່
rm -rf .next
npm run build
```

### Issue 2: Database connection error
```bash
# ກວດສອບ DATABASE_URL ໃນ .env
# ກວດສອບວ່າ PostgreSQL running
sudo systemctl status postgresql
```

### Issue 3: Admin login ບໍ່ໄດ້
```bash
# ກວດສອບ NEXTAUTH_SECRET ຕ້ອງມີ
# ສ້າງ admin user ໃໝ່
npm run create-admin
```

### Issue 4: PM2 restart ເອງບໍ່ໄດ້
```bash
# Setup auto-start
pm2 startup
pm2 save
```

---

## Backup Strategy

### Daily Backup Script
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="$HOME/backups"

mkdir -p $BACKUP_DIR

# Backup database
pg_dump -U namngam_user -d namngam_db > $BACKUP_DIR/db_$DATE.sql

# Backup uploads (if any)
# tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz public/uploads

# Keep only last 7 days
find $BACKUP_DIR -name "db_*.sql" -mtime +7 -delete

echo "Backup completed: $DATE"
```

**Setup cron:**
```bash
crontab -e
# Add:
0 2 * * * /home/your_user/backup.sh
```

---

## Support Contacts

- **Developer Email**: Namngambrand@gmail.com
- **Phone**: +856 20 55 485 622
- **Facebook**: NAMNGAM Page

---

## 🎉 Go Live Checklist

- [ ] ທຸກຂັ້ນຕອນຂ້າງເທິງສຳເລັດ
- [ ] ທົດສອບທຸກຟັງຊັນເຮັດວຽກ
- [ ] ມີສິນຄ້າແລະເນື້ອຫາ
- [ ] Backup database setup
- [ ] Admin ສາມາດເຂົ້າສູ່ລະບົບ
- [ ] ສະແດງຖືກຕ້ອງໃນ mobile & desktop

**✅ Ready to go live!**
