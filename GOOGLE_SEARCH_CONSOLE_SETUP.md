# 📊 Google Search Console Setup Guide

## ขั้นตอนการตั้งค่า Google Search Console

### 1. เข้าสู่ระบบ Google Search Console
```
🔗 https://search.google.com/search-console
```
- ล็อกอินด้วย Google Account ของคุณ

---

### 2. เพิ่ม Property (เว็บไซต์)

**Option A: Domain Property (แนะนำ)**
```
Domain: namngam.com
```
- ครอบคลุมทั้ง http, https, www, non-www

**Option B: URL Prefix**
```
URL: https://namngam.com
```

---

### 3. Verify Ownership (เลือกวิธีใดวิธีหนึ่ง)

#### **วิธีที่ 1: HTML Tag (ง่ายที่สุด)** ✅ แนะนำ

**Step 1:** Google จะให้ code แบบนี้:
```html
<meta name="google-site-verification" content="your-verification-code-here" />
```

**Step 2:** อัพเดทไฟล์ `app/layout.tsx`:

ไปที่บรรทัด 100 ใน layout.tsx:
```typescript
verification: {
  google: "your-verification-code-here", // ใส่ code จาก Google
},
```

**Step 3:** Deploy:
```bash
cd /var/www/namngam
git pull origin main
npm run build
pm2 restart namngam
```

**Step 4:** กลับไปที่ Google Search Console กด "Verify"

---

#### **วิธีที่ 2: DNS (ถ้าใช้ Domain Provider)**

**Step 1:** Google จะให้ TXT record:
```
google-site-verification=xxxxxxxxxxxxxxxxxxxxx
```

**Step 2:** เข้า DNS Management ของ namngam.com:
- เพิ่ม TXT record
- Name: @ หรือ namngam.com
- Value: `google-site-verification=xxxxxxxxxxxxxxxxxxxxx`
- TTL: 3600

**Step 3:** รอ 5-10 นาที แล้วกด "Verify"

---

#### **วิธีที่ 3: HTML File Upload**

**Step 1:** Google จะให้ไฟล์ `google1234567890.html`

**Step 2:** สร้างไฟล์นั้นใน `/Users/aphilack/factory_cli/guasha-blog/public/`

**Step 3:** Deploy แล้ว verify

---

### 4. Submit Sitemap

หลังจาก verify แล้ว:

**Step 1:** ไปที่ Sitemaps (เมนูซ้าย)

**Step 2:** เพิ่ม sitemap URL:
```
https://namngam.com/sitemap.xml
```

**Step 3:** กด "Submit"

**Step 4:** รอ Google crawl (อาจใช้เวลา 1-7 วัน)

---

### 5. Request Indexing (เร่งให้ Google index)

**Step 1:** ไปที่ URL Inspection (เมนูซ้าย)

**Step 2:** ใส่ URL ที่ต้องการ:
```
https://namngam.com
https://namngam.com/products
https://namngam.com/blog
```

**Step 3:** กด "Request Indexing" แต่ละหน้า

**Quota:** Google ให้ request ได้ประมาณ 10 URLs/วัน

---

### 6. เช็คสถานะ

**Coverage Report:**
- ไปที่ Coverage (เมนูซ้าย)
- เช็คว่ามีหน้าไหน indexed แล้วบ้าง

**Performance Report:**
- ไปที่ Performance
- ดูว่ามีคนค้นหาเจอเว็บเราไหม
- มี keywords อะไรที่คนค้นหา

---

## 📊 สิ่งที่ Google Search Console ช่วยได้:

✅ ดูว่าหน้าไหนถูก index แล้ว
✅ เช็ค keywords ที่คนค้นหาเจอเรา
✅ ดู CTR (Click Through Rate)
✅ เช็ค error หรือ warning
✅ ดู backlinks (ใครลิงก์มาหาเรา)
✅ ส่ง sitemap ใหม่เมื่อเพิ่มเนื้อหา

---

## ⏱️ Timeline:

- **Verification:** ทันที (ถ้าใช้ HTML tag)
- **Sitemap Submission:** ทันที
- **First Crawl:** 1-3 วัน
- **Full Index:** 3-7 วัน
- **Search Results:** 1-2 สัปดาห์

---

## 🔍 Search Queries ที่คาดว่าจะเจอ:

ภาษาลาว:
- ກັວຊາ
- ກັວຊາລາວ
- ນວດໜ້າ
- ເຄື່ອງມືກັວຊາ

ภาษาไทย:
- กัวช่าลาว
- นวดหน้า กัวช่า
- ซื้อกัวช่าลาว

ภาษาอังกฤษ:
- gua sha laos
- namngam gua sha
- buy gua sha lao

---

## 💡 Tips:

1. **อย่ารีบ** - Google ใช้เวลา index
2. **เพิ่มเนื้อหาเรื่อยๆ** - Blog posts ใหม่
3. **ใช้ keywords ที่ถูกต้อง** - ในภาษาที่คนใช้ search
4. **Share บน Social Media** - Facebook, Line
5. **ขอให้คนอื่น link** - Backlinks สำคัญมาก

---

## 📞 หากมีปัญหา:

1. เช็คว่า domain ชี้ถูก IP (167.86.84.139)
2. เช็คว่าเว็บเปิดได้ปกติ (https://namngam.com)
3. เช็คว่า sitemap.xml มี (https://namngam.com/sitemap.xml)
4. เช็คว่า robots.txt ถูก (https://namngam.com/robots.txt)
