# 🚀 คู่มือ Deploy Next.js ไปยัง VPS

## ข้อมูล VPS
- IP: 167.86.84.139
- มีเว็บอยู่แล้ว: 1 เว็บ
- จะติดตั้งเพิ่ม: NAMNGAM Gua Sha Blog

---

## ขั้นตอนที่ 1: เชื่อมต่อ VPS

```bash
# SSH เข้า VPS
ssh root@167.86.84.139
# หรือ
ssh username@167.86.84.139

# ถ้ามี SSH key
ssh -i ~/.ssh/your-key.pem root@167.86.84.139
```

---

## ขั้นตอนที่ 2: ตรวจสอบ Software ที่จำเป็น

```bash
# ตรวจสอบ Node.js
node --version
# ควรเป็น v18+ หรือ v20+

# ตรวจสอบ npm
npm --version

# ตรวจสอบ Nginx
nginx -v

# ตรวจสอบ PM2 (Process Manager)
pm2 --version
```

### ถ้ายังไม่มี ให้ติดตั้ง:

```bash
# ติดตั้ง Node.js (ถ้ายังไม่มี)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# ติดตั้ง PM2 (ถ้ายังไม่มี)
sudo npm install -g pm2

# ติดตั้ง Nginx (ถ้ายังไม่มี)
sudo apt update
sudo apt install nginx -y
```

---

## ขั้นตอนที่ 3: Clone โปรเจคจาก GitHub

```bash
# ไปที่ directory ที่ต้องการเก็บเว็บ
cd /var/www/
# หรือ
cd /home/your-username/

# Clone repo
git clone https://github.com/tay1862/namngam.git

# เข้าไปใน folder
cd namngam

# ติดตั้ง dependencies
npm install

# Build โปรเจค
npm run build
```

---

## ขั้นตอนที่ 4: ตั้งค่า PM2 (ให้เว็บรันตลอด)

```bash
# อยู่ใน folder namngam

# สร้างไฟล์ ecosystem.config.js
nano ecosystem.config.js
```

### เพิ่มเนื้อหานี้:

```javascript
module.exports = {
  apps: [{
    name: 'namngam',
    script: 'node_modules/next/dist/bin/next',
    args: 'start -p 3001',
    cwd: '/var/www/namngam',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
```

**สำคัญ:** ใช้ port 3001 เพราะมีเว็บอื่นอยู่แล้ว (อาจใช้ 3000)

```bash
# บันทึกไฟล์: Ctrl+X → Y → Enter

# Start ด้วย PM2
pm2 start ecosystem.config.js

# ตั้งค่าให้ start อัตโนมัติตอน reboot
pm2 startup
pm2 save

# ตรวจสอบสถานะ
pm2 status
pm2 logs namngam
```

---

## ขั้นตอนที่ 5: ตั้งค่า Nginx (Reverse Proxy)

### วิธีที่ 1: ใช้ Subdomain (แนะนำ)

**เช่น:** namngam.yourdomain.com

```bash
# สร้างไฟล์ config สำหรับ NAMNGAM
sudo nano /etc/nginx/sites-available/namngam
```

### เพิ่มเนื้อหานี้:

```nginx
server {
    listen 80;
    server_name namngam.yourdomain.com;  # เปลี่ยนเป็น domain จริง

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # สำหรับไฟล์ static (_next, images, videos)
    location /_next/static {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 60m;
        add_header Cache-Control "public, immutable";
    }

    # สำหรับ public files
    location /public {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 60m;
    }
}
```

```bash
# บันทึกไฟล์: Ctrl+X → Y → Enter

# Enable site
sudo ln -s /etc/nginx/sites-available/namngam /etc/nginx/sites-enabled/

# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

### วิธีที่ 2: ใช้ Path (ถ้าไม่มี domain)

**เช่น:** yourdomain.com/namngam

```bash
# แก้ไขไฟล์เว็บหลักที่มีอยู่
sudo nano /etc/nginx/sites-available/default
# หรือ
sudo nano /etc/nginx/sites-available/your-existing-site
```

### เพิ่มส่วนนี้เข้าไปใน server block:

```nginx
server {
    listen 80;
    server_name yourdomain.com;  # หรือ 167.86.84.139

    # เว็บเดิมที่มีอยู่แล้ว
    location / {
        # config เดิม...
    }

    # เพิ่มส่วนนี้สำหรับ NAMNGAM
    location /namngam {
        rewrite ^/namngam(.*)$ $1 break;
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    location /namngam/_next {
        proxy_pass http://localhost:3001/_next;
        proxy_cache_valid 200 60m;
    }
}
```

**หมายเหตุ:** ถ้าใช้ path นี้ ต้องแก้ `basePath` ใน next.config.ts

```bash
# Test config
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## ขั้นตอนที่ 6: ตั้งค่า Firewall (ถ้ามี)

```bash
# อนุญาต HTTP
sudo ufw allow 80/tcp

# อนุญาต HTTPS (สำหรับอนาคต)
sudo ufw allow 443/tcp

# ตรวจสอบ
sudo ufw status
```

---

## ขั้นตอนที่ 7: ติดตั้ง SSL (HTTPS) - ฟรี!

```bash
# ติดตั้ง Certbot
sudo apt install certbot python3-certbot-nginx -y

# ขอ SSL Certificate (สำหรับ subdomain)
sudo certbot --nginx -d namngam.yourdomain.com

# หรือสำหรับ main domain
sudo certbot --nginx -d yourdomain.com

# ตอบคำถาม:
# - Email: ใส่อีเมลของคุณ
# - Agree to terms: Yes
# - Share email: No
# - Redirect HTTP to HTTPS: Yes (แนะนำ)
```

---

## การจัดการและอัปเดตเว็บ

### ดูสถานะ:

```bash
# ดู PM2 status
pm2 status

# ดู logs
pm2 logs namngam

# ดู Nginx status
sudo systemctl status nginx
```

### อัปเดตเว็บ (เมื่อมีการเปลี่ยนแปลง):

```bash
cd /var/www/namngam

# Pull code ใหม่
git pull origin main

# ติดตั้ง dependencies ใหม่ (ถ้ามี)
npm install

# Build ใหม่
npm run build

# Restart PM2
pm2 restart namngam

# ตรวจสอบ
pm2 logs namngam
```

---

## 🔍 การ Troubleshooting

### ปัญหา 1: เว็บไม่ขึ้น

```bash
# เช็ค PM2
pm2 status
pm2 logs namngam --lines 50

# เช็ค Nginx
sudo nginx -t
sudo systemctl status nginx

# เช็ค port ว่าเปิดอยู่ไหม
netstat -tlnp | grep 3001
```

### ปัญหา 2: 502 Bad Gateway

```bash
# แน่ใจว่า Next.js รันอยู่
pm2 restart namngam

# เช็ค logs
pm2 logs namngam
```

### ปัญหา 3: Static files ไม่โหลด

```bash
# เช็คว่า path ถูกต้อง
ls -la /var/www/namngam/.next
ls -la /var/www/namngam/public

# เช็ค permission
sudo chown -R www-data:www-data /var/www/namngam
sudo chmod -R 755 /var/www/namngam
```

---

## 📊 สรุปโครงสร้าง

```
VPS (167.86.84.139)
│
├── เว็บเดิม (port 3000 หรือ path อื่น)
│   └── Nginx → localhost:3000
│
└── NAMNGAM (port 3001)
    └── Nginx → localhost:3001
        └── PM2 → Next.js App
```

---

## 🌐 URL ที่จะได้:

**วิธีที่ 1 (Subdomain):**
```
https://namngam.yourdomain.com
```

**วิธีที่ 2 (Path):**
```
https://yourdomain.com/namngam
หรือ
http://167.86.84.139/namngam
```

---

## ⚠️ หมายเหตุสำคัญ:

1. **ใช้ port ต่างกัน** - เว็บเดิม 3000, NAMNGAM 3001
2. **ตั้ง basePath** (ถ้าใช้ path) - แก้ใน next.config.ts
3. **SSL Certificate** - ฟรีจาก Let's Encrypt
4. **Backup** - สำรอง database/files ก่อนทำอะไร
5. **Environment Variables** - ตั้งค่าใน ecosystem.config.js

---

## 🚀 พร้อม Deploy แล้ว!

เริ่มจาก **ขั้นตอนที่ 1** เลยครับ!
