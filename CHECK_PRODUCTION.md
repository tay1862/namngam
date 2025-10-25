# 🔍 วิธีเช็คว่าหน้าไหนทำงานและไม่ทำงาน

## 📋 เช็คในหน้า Browser

### 1. เปิด Developer Console
- กด `F12` หรือ `Cmd+Option+I` (Mac) หรือ `Ctrl+Shift+I` (Windows)
- ไปที่ Tab "Console"
- ไปที่ Tab "Network"

### 2. ทดสอบแต่ละหน้า

#### **Test Benefits Page:**
1. ไป: https://www.namngam.com/admin/benefits
2. เพิ่ม benefit ใหม่
3. กรอกข้อมูล:
   - ຫົວຂໍ້: "ຜິວໜ້າກະຊັບ"
   - ລາຍລະອຽດ: "ກັວຊາຊ່ວຍເຮັດໃຫ້ຜິວໜ້າກະຊັບແລະແໜ້ນ"
4. กด 🪄 "ແປນອັດຕະໂນມັດ"
5. บันทึก

**ดูใน Console:**
- ถ้าเห็น: `POST /api/admin/benefits → 200 OK` ✅ **ใช้งานได้!**
- ถ้าเห็น: `POST /api/admin/benefits → 500 Error` ❌ **Database ยังไม่มี columns!**

**ถ้า 500 Error ดูที่ Response:**
- คลิกที่ request
- ไปที่ Tab "Response"
- ดู error message (อาจบอกว่า column ไหนหายไป)

---

#### **Test Products Page:**
1. ไป: https://www.namngam.com/admin/products
2. เพิ่มสินค้าใหม่
3. สลับ Tab: 🇱🇦 → 🇹🇭 → 🇬🇧 → 🇨🇳
4. กรอกข้อมูลแต่ละภาษา
5. บันทึก

**ดูใน Console:**
- ถ้าเห็น: `POST /api/admin/products → 200 OK` ✅ **ใช้งานได้!**
- ถ้าเห็น: `POST /api/admin/products → 500 Error` ❌ **Database ยังไม่มี columns!**

---

#### **Test Blog Page:**
1. ไป: https://www.namngam.com/admin/blog
2. เพิ่ม blog ใหม่
3. สลับ Tab: 🇱🇦 → 🇹🇭 → 🇬🇧 → 🇨🇳
4. กรอกหัวข้อและเนื้อหา
5. บันทึก

**ดูใน Console:**
- ถ้าเห็น: `POST /api/admin/blog → 200 OK` ✅ **ใช้งานได้!**
- ถ้าเห็น: `POST /api/admin/blog → 500 Error` ❌ **Database ยังไม่มี columns!**

---

#### **Test FAQ Page:**
1. ไป: https://www.namngam.com/admin/faq
2. เพิ่ม FAQ ใหม่
3. สลับ Tab: 🇱🇦 → 🇹🇭 → 🇬🇧 → 🇨🇳
4. กรอกคำถามและคำตอบ
5. บันทึก

**ดูใน Console:**
- ถ้าเห็น: `POST /api/admin/faq → 200 OK` ✅ **ใช้งานได้!**
- ถ้าเห็น: `POST /api/admin/faq → 500 Error` ❌ **Database ยังไม่มี columns!**

---

## 🔧 ถ้าเจอ 500 Error → Database ยังไม่ Migrate

**ต้องรัน Migration บน VPS:**

### **วิธีที่ 1: SSH + Manual**
```bash
ssh root@167.86.84.139

cd /var/www/namngam

# Check current code version
git log --oneline -5

# Should see latest commit:
# 0f97041 🔧 DATABASE MIGRATION: Complete Multi-Language Support

# If not, pull latest:
git pull origin main

# Install dependencies
npm install

# 🚨 CRITICAL: Migrate database
npx prisma migrate deploy

# OR if that fails:
npx prisma db push

# Generate Prisma client
npx prisma generate

# Rebuild
npm run build

# Restart
pm2 restart namngam

# Check logs
pm2 logs namngam --lines 50
```

---

### **วิธีที่ 2: เช็ค Database โดยตรง**
```bash
ssh root@167.86.84.139

# Connect to PostgreSQL
psql $DATABASE_URL

# Check AboutSection table
\d "AboutSection"

# Should see columns:
# - titleTh
# - titleEn
# - titleZh
# - descriptionTh
# - descriptionEn
# - descriptionZh

# Check BenefitItem table
\d "BenefitItem"

# Should see same columns

# Check Product table
\d "Product"

# Should see:
# - nameTh, nameEn, nameZh
# - descriptionTh, descriptionEn, descriptionZh
# - featuresTh[], featuresEn[], featuresZh[]
# - benefitsTh[], benefitsEn[], benefitsZh[]

# Check BlogPost table
\d "BlogPost"

# Should see:
# - titleTh, titleEn, titleZh
# - excerptTh, excerptEn, excerptZh
# - contentTh, contentEn, contentZh

# Check FAQ table
\d "FAQ"

# Should see:
# - questionTh, questionEn, questionZh
# - answerTh, answerEn, answerZh

# Exit psql
\q
```

---

## 📊 สรุปการเช็ค

### **Checklist:**

**About Page:**
- [ ] เปิดหน้าได้
- [ ] กรอกข้อมูลได้
- [ ] กด 🪄 แปลอัตโนมัติได้
- [ ] อัปโหลดรูปหลักได้
- [ ] อัปโหลดรูปพื้นหลังได้
- [ ] เลือก Background Type ได้ (image/gradient/solid)
- [ ] บันทึกได้ (ไม่ error 500)

**Benefits Page:**
- [ ] เปิดหน้าได้
- [ ] กรอกข้อมูลได้
- [ ] กด 🪄 แปลอัตโนมัติได้
- [ ] อัปโหลดรูปได้
- [ ] บันทึกได้ (ไม่ error 500)

**Products Page:**
- [ ] เปิดหน้าได้
- [ ] เห็น Language Tabs (🇱🇦 🇹🇭 🇬🇧 🇨🇳)
- [ ] สลับ Tabs ได้
- [ ] กรอกข้อมูลแต่ละภาษาได้
- [ ] อัปโหลดรูปได้
- [ ] บันทึกได้ (ไม่ error 500)

**Blog Page:**
- [ ] เปิดหน้าได้
- [ ] เห็น Language Tabs (🇱🇦 🇹🇭 🇬🇧 🇨🇳)
- [ ] สลับ Tabs ได้
- [ ] กรอกข้อมูลแต่ละภาษาได้
- [ ] อัปโหลดรูปได้
- [ ] บันทึกได้ (ไม่ error 500)

**FAQ Page:**
- [ ] เปิดหน้าได้
- [ ] เห็น Language Tabs (🇱🇦 🇹🇭 🇬🇧 🇨🇳)
- [ ] สลับ Tabs ได้
- [ ] กรอกข้อมูลแต่ละภาษาได้
- [ ] บันทึกได้ (ไม่ error 500)

---

## ⚠️ ปัญหาที่พบบ่อย

### **ปัญหา: ทุกหน้า error 500**
**สาเหตุ:** Database ยังไม่ได้ migrate
**แก้:** รัน `npx prisma migrate deploy` หรือ `npx prisma db push` บน VPS

### **ปัญหา: About ใช้ได้ แต่ Benefits/Products/Blog/FAQ ไม่ได้**
**สาเหตุ:** Migration ไม่ครบ (AboutSection migrate แล้ว แต่ table อื่นยัง)
**แก้:** รัน migration ใหม่อีกครั้ง

### **ปัญหา: บันทึกได้ แต่ข้อมูลภาษาอื่นหาย**
**สาเหตุ:** Frontend อ่าน API ไม่ถูก
**แก้:** เช็ค API response ว่ามีฟิลด์ titleTh, titleEn, titleZh หรือไม่

### **ปัญหา: บันทึกได้ แต่ Frontend ไม่เปลี่ยนภาษา**
**สาเหตุ:** Frontend ไม่ได้ใช้ localize helper
**แก้:** เช็คว่า component ใช้ `localizeProduct()`, `localizeBlogPost()`, `localizeFAQ()` หรือยัง

---

## 🚀 ขั้นตอนแนะนำ

1. **เช็คแต่ละหน้าใน Browser** → ดู Console errors
2. **ถ้าเจอ 500 Error** → SSH เข้า VPS + migrate database
3. **รัน migration** → `npx prisma migrate deploy` หรือ `npx prisma db push`
4. **Rebuild + Restart** → `npm run build && pm2 restart namngam`
5. **ทดสอบอีกครั้ง** → ควรใช้งานได้แล้ว

---

## 📝 สรุป

**ถ้า About ใช้งานได้แล้ว แต่หน้าอื่นยังไม่ได้:**
→ แสดงว่า Database บางส่วน migrate แล้ว (AboutSection) แต่ table อื่นยัง (BenefitItem, Product, BlogPost, FAQ)
→ **ต้องรัน migration ใหม่อีกครั้งให้ครบ**

**คำสั่งที่ต้องรัน:**
```bash
ssh root@167.86.84.139
cd /var/www/namngam
git pull origin main
npx prisma db push
npx prisma generate
npm run build
pm2 restart namngam
```

**แล้วทดสอบใหม่ทุกหน้า!**
