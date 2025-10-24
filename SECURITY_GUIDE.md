# 🔒 คู่มือความปลอดภัย - NAMNGAM Admin System

## ✅ สิ่งที่ปรับปรุงแล้ว:

### **1. Login Rate Limiting** ⚡
```
- จำกัด 5 ครั้งใน 15 นาที
- ล็อค 30 นาที หากพยายามเกิน 5 ครั้ง
- ล้างข้อมูลอัตโนมัติเมื่อ login สำเร็จ
```

### **2. Session Security** 🕐
```
- Session timeout: 8 ชั่วโมง
- Auto-update ทุก 2 ชั่วโมง
- JWT-based (ไม่เก็บใน database)
```

### **3. Role-Based Access Control (RBAC)** 👥
```
3 บทบาท พร้อมสิทธิ์แตกต่างกัน:

┌─────────────┬────────────────────┬────────────────────┐
│ Role        │ Permissions        │ ใช้สำหรับ          │
├─────────────┼────────────────────┼────────────────────┤
│ super_admin │ ✅ ทำทุกอย่างได้   │ เจ้าของเว็บ        │
│             │ ✅ จัดการ Users    │                    │
│             │ ✅ แก้ Settings    │                    │
│             │ ✅ ลบข้อมูล        │                    │
├─────────────┼────────────────────┼────────────────────┤
│ admin       │ ✅ จัดการ Content  │ ผู้จัดการ          │
│             │ ✅ ลบข้อมูล        │                    │
│             │ ❌ จัดการ Users    │                    │
│             │ ❌ แก้ Settings    │                    │
├─────────────┼────────────────────┼────────────────────┤
│ editor      │ ✅ แก้ Content     │ พนักงาน           │
│             │ ❌ ลบข้อมูล        │                    │
│             │ ❌ จัดการ Users    │                    │
│             │ ❌ แก้ Settings    │                    │
└─────────────┴────────────────────┴────────────────────┘
```

### **4. User Management System** 👤
```
✅ เพิ่มผู้ใช้ใหม่
✅ แก้ไขข้อมูลผู้ใช้
✅ ลบผู้ใช้
✅ เปลี่ยน role
✅ เปลี่ยนรหัสผ่าน
```

---

## 🚀 การใช้งาน:

### **ขั้นตอนที่ 1: Deploy บน VPS**

```bash
# SSH เข้า VPS
ssh root@167.86.84.139

# Pull code ล่าสุด
cd /var/www/namngam
git pull origin main

# Rebuild
rm -rf .next
npm run build

# Restart
pm2 restart namngam

# Check logs
pm2 logs namngam --lines 30
```

---

### **ขั้นตอนที่ 2: สร้าง Super Admin แรก**

#### **วิธีที่ 1: ผ่าน Prisma Studio (แนะนำ)**

```bash
# บน VPS
cd /var/www/namngam
npx prisma studio
```

เปิดเบราว์เซอร์: `http://167.86.84.139:5555`

1. เลือก **User** table
2. เลือก user ที่ต้องการ
3. แก้ไขฟิลด์ **role** เป็น `super_admin`
4. กด **Save**

#### **วิธีที่ 2: ผ่าน SQL**

```bash
cd /var/www/namngam
npx prisma db execute --stdin <<< "
UPDATE \"User\" 
SET role = 'super_admin' 
WHERE email = 'your-email@example.com';
"
```

#### **วิธีที่ 3: สร้างใหม่ด้วย bcrypt**

```bash
# ติดตั้ง bcrypt-cli (ถ้ายังไม่มี)
npm install -g bcrypt-cli

# Hash password
bcrypt-cli hash "your-password" 10

# ใช้ hash ที่ได้ใน SQL ข้างล่าง
```

```bash
cd /var/www/namngam
npx prisma db execute --stdin <<< "
INSERT INTO \"User\" (id, name, email, password, role, \"createdAt\", \"updatedAt\")
VALUES (
  'super-admin-001',
  'Super Admin',
  'admin@namngam.com',
  '\$2b\$10\$HASH_HERE',  -- ใส่ hash ที่ได้จากขั้นตอนก่อนหน้า
  'super_admin',
  NOW(),
  NOW()
);
"
```

---

### **ขั้นตอนที่ 3: Login และทดสอบ**

1. เปิด: https://namngam.com/admin/login
2. Login ด้วย super admin account
3. ไปที่: **ຈັດການຜູ້ໃຊ້** (Users menu)
4. ทดสอบเพิ่มผู้ใช้ใหม่

---

## 👥 การจัดการผู้ใช้:

### **เพิ่มผู้ใช้ใหม่:**

1. Login ด้วย **super_admin**
2. ไปที่ **ຈັດການຜູ້ໃຊ້** (Users)
3. กด **ເພີ່ມຜ้ູໃຊ້ໃໝ່** (Add New User)
4. กรอกข้อมูล:
   - **ຊື່** (Name): ชื่อผู้ใช้
   - **ອີເມວ** (Email): อีเมล (ใช้ login)
   - **ລະຫັດຜ່ານ** (Password): รหัสผ่าน (ขั้นต่ำ 8 ตัว)
   - **ສິດທິ່** (Role): เลือก role
5. กด **ສ້າງຜູ້ໃຊ້** (Create User)

### **แก้ไขผู้ใช้:**

1. คลิก ปุ่ม **✏️ Edit**
2. แก้ไขข้อมูลที่ต้องการ
3. รหัสผ่าน: **ปล่อยว่าง** ถ้าไม่ต้องการเปลี่ยน
4. กด **ບັນທຶກ** (Save)

### **ลบผู้ใช้:**

1. คลิก ปุ่ม **🗑️ Delete**
2. ยืนยันการลบ
3. **หมายเหตุ:** ไม่สามารถลบตัวเองได้

---

## 🔐 ความปลอดภัย:

### **Password Policy:**
```
✅ ขั้นต่ำ 8 ตัวอักษร
✅ Hash ด้วย bcrypt (cost: 10)
✅ ไม่เก็บ plain text
```

### **Login Protection:**
```
✅ จำกัด 5 ครั้ง / 15 นาที
✅ ล็อค 30 นาที หากเกิน
✅ แสดงข้อความเตือนชัดเจน
```

### **Session Management:**
```
✅ Timeout: 8 ชั่วโมง
✅ Auto-logout เมื่อหมดเวลา
✅ Refresh token ทุก 2 ชั่วโมง
```

### **Self-Protection:**
```
✅ ไม่สามารถลบตัวเองได้
✅ ไม่สามารถเปลี่ยน role ตัวเอง
✅ ไม่สามารถล็อคตัวเองออก
```

---

## 📊 Permission Matrix:

| Resource | super_admin | admin | editor |
|----------|-------------|-------|--------|
| **Users Management** | ✅ Full | ❌ No | ❌ No |
| **Settings** | ✅ Full | ❌ No | ❌ No |
| **Products** | ✅ Full | ✅ Full | ✅ Edit Only |
| **Blog** | ✅ Full | ✅ Full | ✅ Edit Only |
| **FAQ** | ✅ Full | ✅ Full | ✅ Edit Only |
| **About** | ✅ Full | ✅ Full | ❌ No |
| **Benefits** | ✅ Full | ✅ Full | ❌ No |
| **Subscribers** | ✅ View | ✅ View | ❌ No |
| **Delete Content** | ✅ Yes | ✅ Yes | ❌ No |

---

## 🛡️ Best Practices:

### **1. Role Assignment:**
```
✅ มี super_admin อย่างน้อย 1 คน
✅ ให้ admin แก่ผู้จัดการที่เชื่อถือได้
✅ ให้ editor แก่พนักงานทั่วไป
❌ อย่าให้ super_admin ทุกคน
```

### **2. Password Management:**
```
✅ ใช้รหัสผ่านที่แข็งแรง (12+ ตัว)
✅ ใช้ผสมตัวอักษร ตัวเลข สัญลักษณ์
✅ เปลี่ยนรหัสผ่านทุก 3-6 เดือน
❌ อย่าใช้รหัสผ่านเดียวกันหลายที่
❌ อย่าแชร์รหัสผ่าน
```

### **3. Account Management:**
```
✅ ลบ account เมื่อพนักงานลาออก
✅ ตรวจสอบ users list เป็นประจำ
✅ ใช้อีเมลจริง (ไม่ใช่ test@test.com)
❌ อย่าปล่อย inactive accounts
```

---

## 🚨 Troubleshooting:

### **ปัญหา 1: ลืมรหัสผ่าน**

**วิธีแก้:**
```bash
# 1. Hash รหัสผ่านใหม่
bcrypt-cli hash "new-password" 10

# 2. อัพเดทใน database
cd /var/www/namngam
npx prisma db execute --stdin <<< "
UPDATE \"User\" 
SET password = '\$2b\$10\$NEW_HASH_HERE' 
WHERE email = 'user-email@example.com';
"
```

### **ปัญหา 2: ถูกล็อคออก (Rate Limit)**

**วิธีแก้:**
```bash
# รอ 30 นาที หรือ restart PM2
pm2 restart namngam
```

**หมายเหตุ:** Rate limit เป็น in-memory จะหายเมื่อ restart

### **ปัญหา 3: หน้า Users ไม่ปรากฏ**

**สาเหตุ:** Role ไม่ใช่ super_admin

**วิธีแก้:**
```bash
# เช็ค role ปัจจุบัน
npx prisma studio

# หรือ query
npx prisma db execute --stdin <<< "
SELECT id, name, email, role 
FROM \"User\";
"

# แก้ไข role
UPDATE \"User\" 
SET role = 'super_admin' 
WHERE id = 'user-id';
```

### **ปัญหา 4: ไม่สามารถลบ Content**

**สาเหตุ:** Role เป็น editor (ไม่มีสิทธิ์ลบ)

**วิธีแก้:** 
- ใช้ super_admin หรือ admin account
- หรือเปลี่ยน role เป็น admin

---

## 📈 Monitoring:

### **ตรวจสอบ Users:**
```bash
cd /var/www/namngam
npx prisma db execute --stdin <<< "
SELECT 
  id, 
  name, 
  email, 
  role, 
  \"createdAt\", 
  \"updatedAt\"
FROM \"User\" 
ORDER BY \"createdAt\" DESC;
"
```

### **นับจำนวน Users แต่ละ Role:**
```bash
npx prisma db execute --stdin <<< "
SELECT 
  role, 
  COUNT(*) as count
FROM \"User\" 
GROUP BY role;
"
```

---

## 🔧 Advanced Configuration:

### **1. เปลี่ยน Session Timeout:**

แก้ไข `lib/auth.ts`:
```typescript
session: {
  strategy: 'jwt',
  maxAge: 8 * 60 * 60, // 8 hours → เปลี่ยนเป็น 4 * 60 * 60 (4 hours)
  updateAge: 2 * 60 * 60, // 2 hours
},
```

### **2. เปลี่ยน Rate Limit:**

แก้ไข `lib/login-rate-limit.ts`:
```typescript
// จากนี้
if (record.count >= 5) {  // 5 attempts
  record.blockedUntil = now + 30 * 60 * 1000; // 30 minutes

// เป็นนี้ (เข้มงวดขึ้น)
if (record.count >= 3) {  // 3 attempts
  record.blockedUntil = now + 60 * 60 * 1000; // 60 minutes
```

### **3. เพิ่ม Role ใหม่:**

แก้ไข `lib/rbac.ts`:
```typescript
const rolePermissions: Record<Role, Permission[]> = {
  super_admin: [...],
  admin: [...],
  editor: [...],
  viewer: [  // Role ใหม่
    'view_products',
    'view_blog',
    // ไม่มีสิทธิ์แก้ไข
  ],
};
```

---

## 📝 Changelog:

### **Version 2.0 - Security Update** (2025-01-24)
```
✅ Added Login Rate Limiting
✅ Added Session Timeout
✅ Added RBAC System
✅ Added User Management
✅ Fixed Login Logo (white → gold)
✅ Added Permission Checks
✅ Added Self-Protection
```

---

## 🆘 Support:

หากมีปัญหา:

1. **เช็ค Logs:**
   ```bash
   pm2 logs namngam --lines 100
   ```

2. **เช็ค Database:**
   ```bash
   npx prisma studio
   ```

3. **Restart Application:**
   ```bash
   pm2 restart namngam
   ```

4. **Full Rebuild:**
   ```bash
   cd /var/www/namngam
   rm -rf .next node_modules
   npm install
   npm run build
   pm2 restart namngam
   ```

---

## ⚠️ Important Notes:

1. **Rate Limiting เป็น In-Memory:**
   - หายเมื่อ restart
   - Production: แนะนำใช้ Redis

2. **Backup Users:**
   - Backup database เป็นประจำ
   - Export users list เก็บไว้

3. **Security Updates:**
   - Update dependencies เป็นประจำ
   - ตรวจสอบ security vulnerabilities

---

**System Status:** 🟢 **SECURE & READY**

**Security Level:** 🔒 **HIGH**

**Last Updated:** 2025-01-24
