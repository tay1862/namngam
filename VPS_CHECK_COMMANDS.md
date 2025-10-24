# 🔍 คำสั่งตรวจสอบ VPS - NAMNGAM Gua Sha Blog

**VPS IP:** 167.86.84.139:3001  
**วันที่:** 23 ตุลาคม 2025

---

## 📋 **คำสั่งที่ต้องรันบน VPS (ตามลำดับ)**

คัดลอกคำสั่งเหล่านี้ไปรันบน VPS แล้ว **copy ผลลัพธ์ทั้งหมด** กลับมาให้ดู

---

### **ขั้นตอนที่ 1: ข้อมูลพื้นฐานระบบ**

```bash
echo "==================================="
echo "1. SYSTEM INFO"
echo "==================================="
uname -a
echo ""
cat /etc/os-release | grep -E "PRETTY_NAME|VERSION"
echo ""
echo "Current Date/Time:"
date
echo ""
echo "Current User:"
whoami
echo ""
echo "Home Directory:"
pwd
```

---

### **ขั้นตอนที่ 2: Node.js & npm Version**

```bash
echo "==================================="
echo "2. NODE & NPM VERSIONS"
echo "==================================="
node --version
npm --version
echo ""
which node
which npm
```

---

### **ขั้นตอนที่ 3: Git Status & Latest Commits**

```bash
echo "==================================="
echo "3. GIT STATUS"
echo "==================================="
cd ~/factory_cli/guasha-blog || cd /var/www/guasha-blog || cd /root/guasha-blog || echo "Project not found"
pwd
echo ""
echo "Git Branch:"
git branch
echo ""
echo "Latest 5 Commits:"
git log --oneline -5
echo ""
echo "Current Status:"
git status
echo ""
echo "Remote URL:"
git remote -v
```

---

### **ขั้นตอนที่ 4: Project Files & Structure**

```bash
echo "==================================="
echo "4. PROJECT STRUCTURE"
echo "==================================="
cd ~/factory_cli/guasha-blog || cd /var/www/guasha-blog || cd /root/guasha-blog
echo "Project Directory:"
pwd
echo ""
echo "Main Files:"
ls -lah | grep -E "package.json|.env|.next|node_modules|prisma"
echo ""
echo "Environment Files:"
ls -la .env* 2>/dev/null || echo "No .env files visible (good for security)"
echo ""
echo "Build Directory:"
ls -lah .next 2>/dev/null | head -10 || echo ".next directory not found - need to build"
echo ""
echo "Components Count:"
find app/components -name "*.tsx" 2>/dev/null | wc -l
echo ""
echo "API Routes Count:"
find app/api -name "*.ts" 2>/dev/null | wc -l
```

---

### **ขั้นตอนที่ 5: Dependencies & Packages**

```bash
echo "==================================="
echo "5. INSTALLED PACKAGES"
echo "==================================="
cd ~/factory_cli/guasha-blog || cd /var/www/guasha-blog || cd /root/guasha-blog
echo "Package.json main dependencies:"
cat package.json | grep -A 30 '"dependencies"' | head -35
echo ""
echo "Recently added packages:"
cat package.json | grep -E "react-hot-toast|framer-motion|next-auth"
echo ""
echo "Node modules installed:"
ls node_modules 2>/dev/null | wc -l
echo "(Should be 600+ packages)"
```

---

### **ขั้นตอนที่ 6: Database Status**

```bash
echo "==================================="
echo "6. DATABASE STATUS"
echo "==================================="
# Check PostgreSQL
echo "PostgreSQL Status:"
sudo systemctl status postgresql --no-pager -l | head -15 2>/dev/null || echo "PostgreSQL service check requires sudo"
echo ""
echo "PostgreSQL Port:"
sudo netstat -tulpn | grep 5432 2>/dev/null || ss -tulpn | grep 5432 2>/dev/null || echo "Cannot check port 5432"
echo ""
echo "Prisma Schema:"
ls -lah prisma/schema.prisma 2>/dev/null || echo "Prisma schema not found"
echo ""
echo "Database Connection (from .env - SAFE CHECK):"
cat .env 2>/dev/null | grep "DATABASE_URL" | sed 's/:[^@]*@/:***@/' || echo ".env file not readable"
```

---

### **ขั้นตอนที่ 7: Running Processes (PM2/Node)**

```bash
echo "==================================="
echo "7. RUNNING PROCESSES"
echo "==================================="
echo "PM2 Status:"
pm2 list 2>/dev/null || echo "PM2 not installed or not running"
echo ""
echo "PM2 Logs (last 20 lines):"
pm2 logs namngam --lines 20 --nostream 2>/dev/null || echo "PM2 logs not available"
echo ""
echo "Node Processes:"
ps aux | grep node | grep -v grep
echo ""
echo "Next.js Processes:"
ps aux | grep next | grep -v grep
```

---

### **ขั้นตอนที่ 8: Port & Network Status**

```bash
echo "==================================="
echo "8. NETWORK & PORTS"
echo "==================================="
echo "Port 3001 Status:"
sudo netstat -tulpn | grep :3001 2>/dev/null || ss -tulpn | grep :3001 2>/dev/null || echo "Port 3001 check requires sudo"
echo ""
echo "All Listening Ports:"
sudo netstat -tulpn | grep LISTEN 2>/dev/null | grep -E "3001|5432|80|443" || ss -tulpn | grep -E "3001|5432|80|443"
echo ""
echo "Firewall Status:"
sudo ufw status 2>/dev/null || echo "UFW not available"
echo ""
echo "Test HTTP Request:"
curl -I http://localhost:3001 2>/dev/null | head -10 || echo "Cannot connect to port 3001"
```

---

### **ขั้นตอนที่ 9: Application Logs**

```bash
echo "==================================="
echo "9. APPLICATION LOGS"
echo "==================================="
cd ~/factory_cli/guasha-blog || cd /var/www/guasha-blog || cd /root/guasha-blog
echo "Recent logs (if exists):"
ls -lah logs/ 2>/dev/null || echo "No logs directory"
echo ""
echo "Check for error logs:"
find . -name "*.log" -type f -mtime -1 2>/dev/null | head -10 || echo "No recent log files"
echo ""
echo "PM2 Error Logs:"
pm2 logs namngam --err --lines 15 --nostream 2>/dev/null || echo "PM2 error logs not available"
```

---

### **ขั้นตอนที่ 10: Disk Space & Memory**

```bash
echo "==================================="
echo "10. SYSTEM RESOURCES"
echo "==================================="
echo "Disk Usage:"
df -h | grep -E "Filesystem|/$|/var|/home"
echo ""
echo "Project Size:"
cd ~/factory_cli/guasha-blog || cd /var/www/guasha-blog || cd /root/guasha-blog
du -sh . 2>/dev/null || echo "Cannot calculate size"
echo ""
echo "Node Modules Size:"
du -sh node_modules 2>/dev/null || echo "node_modules not found"
echo ""
echo "Memory Usage:"
free -h
echo ""
echo "Top Processes (by memory):"
ps aux --sort=-%mem | head -10
```

---

### **ขั้นตอนที่ 11: Environment Variables (SAFE)**

```bash
echo "==================================="
echo "11. ENVIRONMENT CHECK (SAFE)"
echo "==================================="
cd ~/factory_cli/guasha-blog || cd /var/www/guasha-blog || cd /root/guasha-blog
echo "Environment file exists:"
ls -lah .env 2>/dev/null || echo ".env not found"
echo ""
echo "Required Variables (values hidden):"
cat .env 2>/dev/null | grep -E "DATABASE_URL|NEXTAUTH_SECRET|NEXTAUTH_URL|NEXT_PUBLIC" | sed 's/=.*/=***HIDDEN***/' || echo "Cannot read .env"
echo ""
echo "Environment template:"
cat .env.example 2>/dev/null | head -15 || echo ".env.example not found"
```

---

### **ขั้นตอนที่ 12: Latest Git Changes**

```bash
echo "==================================="
echo "12. RECENT CHANGES"
echo "==================================="
cd ~/factory_cli/guasha-blog || cd /var/www/guasha-blog || cd /root/guasha-blog
echo "Last Commit Details:"
git log -1 --stat
echo ""
echo "Files changed in last commit:"
git diff-tree --no-commit-id --name-only -r HEAD | head -20
echo ""
echo "Current working tree changes:"
git diff --stat
```

---

### **ขั้นตอนที่ 13: Build Status**

```bash
echo "==================================="
echo "13. BUILD STATUS"
echo "==================================="
cd ~/factory_cli/guasha-blog || cd /var/www/guasha-blog || cd /root/guasha-blog
echo "Next.js Build Info:"
ls -lah .next/BUILD_ID 2>/dev/null && cat .next/BUILD_ID 2>/dev/null || echo "No build found"
echo ""
echo "Build cache:"
ls -lah .next/cache 2>/dev/null | head -10 || echo "No build cache"
echo ""
echo "Static files:"
ls -lah .next/static 2>/dev/null | head -10 || echo "No static files"
```

---

### **ขั้นตอนที่ 14: Application Health Check**

```bash
echo "==================================="
echo "14. HEALTH CHECK"
echo "==================================="
echo "HTTP Status:"
curl -s -o /dev/null -w "HTTP Status: %{http_code}\nTotal Time: %{time_total}s\n" http://localhost:3001
echo ""
echo "Homepage Response:"
curl -s http://localhost:3001 | head -50 | grep -E "<title>|<html|lang=" || echo "Cannot fetch homepage"
echo ""
echo "API Health (if available):"
curl -s http://localhost:3001/api/health 2>/dev/null || echo "No health endpoint"
```

---

## 🚀 **ONE-LINE COMMAND (รวมทุกอย่าง)**

ถ้าต้องการรันคำสั่งทั้งหมดในครั้งเดียว ให้ copy คำสั่งนี้:

```bash
cd ~/factory_cli/guasha-blog || cd /var/www/guasha-blog || cd /root/guasha-blog && \
echo "=== SYSTEM INFO ===" && uname -a && echo "" && \
echo "=== NODE VERSION ===" && node --version && npm --version && echo "" && \
echo "=== GIT STATUS ===" && git log --oneline -5 && git status && echo "" && \
echo "=== PROJECT FILES ===" && ls -lah | head -20 && echo "" && \
echo "=== PM2 STATUS ===" && pm2 list && echo "" && \
echo "=== PORT 3001 ===" && netstat -tulpn | grep :3001 && echo "" && \
echo "=== DISK SPACE ===" && df -h | grep -E "/$" && echo "" && \
echo "=== MEMORY ===" && free -h && echo "" && \
echo "=== HEALTH CHECK ===" && curl -I http://localhost:3001
```

---

## 📝 **สิ่งที่ต้องการจากคุณ:**

หลังจากรันคำสั่งเหล่านี้แล้ว กรุณา **copy ผลลัพธ์ทั้งหมด** มาให้ดู เพื่อที่ฉันจะได้:

1. ✅ ตรวจสอบว่า git pull สำเร็จหรือยัง
2. ✅ ดูว่า build มีหรือยัง (ต้อง rebuild)
3. ✅ เช็คว่า PM2 รันอยู่หรือเปล่า
4. ✅ ดู environment variables ถูกต้องไหม
5. ✅ เช็คว่า port 3001 เปิดอยู่หรือเปล่า
6. ✅ ดู memory/disk space เพียงพอไหม
7. ✅ ตรวจสอบ database connection
8. ✅ ดู logs ว่ามี error อะไรบ้าง

---

## 🎯 **ขั้นตอนที่คาดว่าจะทำต่อ:**

หลังจากเห็นผลลัพธ์แล้ว ฉันจะบอกคำสั่งต่อไปเพื่อ:

1. Pull code ใหม่จาก git
2. Install dependencies ที่เพิ่มมา (react-hot-toast)
3. Build production
4. Restart PM2
5. ทดสอบว่าระบบทำงาน

---

**รอผลลัพธ์จากคุณนะครับ!** 🚀
