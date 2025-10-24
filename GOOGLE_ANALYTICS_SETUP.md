# 📈 Google Analytics 4 (GA4) Setup Guide

## ขั้นตอนการตั้งค่า Google Analytics

### 1. สร้าง Google Analytics Account

**Step 1:** ไปที่ Google Analytics
```
🔗 https://analytics.google.com
```

**Step 2:** คลิก "Start measuring" หรือ "Admin" (ถ้ามี account แล้ว)

**Step 3:** สร้าง Account:
- Account name: `NAMNGAM`
- Country: `Laos` หรือ `Thailand`
- Data sharing settings: เลือกตามต้องการ

---

### 2. สร้าง Property (GA4)

**Step 1:** Property Setup:
- Property name: `NAMNGAM Website`
- Reporting time zone: `(GMT+07:00) Bangkok, Hanoi, Jakarta`
- Currency: `LAK - Lao Kip` หรือ `THB - Thai Baht`

**Step 2:** Business Information:
- Industry category: `Beauty & Fitness`
- Business size: `Small` (1-10 employees)
- Usage: `Get customer insights` + `Measure online conversions`

---

### 3. เลือก Platform: Web

**Step 1:** คลิก "Web"

**Step 2:** Data Stream Setup:
- Website URL: `https://namngam.com`
- Stream name: `NAMNGAM Main Site`
- Enhanced measurement: ✅ เปิดทั้งหมด
  - Page views ✅
  - Scrolls ✅
  - Outbound clicks ✅
  - Site search ✅
  - Video engagement ✅
  - File downloads ✅

**Step 3:** กด "Create stream"

---

### 4. คัดลอก Measurement ID

จะได้ **Measurement ID** แบบนี้:
```
G-XXXXXXXXXX
```

**ตัวอย่าง:** `G-12ABC34DEF`

---

### 5. เพิ่ม GA4 ใน Website

#### **Option 1: ใช้ Environment Variable** ✅ แนะนำ

**Step 1:** เพิ่มใน `.env` file บน VPS:

```bash
ssh root@167.86.84.139
cd /var/www/namngam
nano .env
```

**Step 2:** เพิ่มบรรทัดนี้:
```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
(แทนที่ `G-XXXXXXXXXX` ด้วย Measurement ID จริง)

**Step 3:** Save และ restart:
```bash
# กด Ctrl+O เพื่อ save
# กด Ctrl+X เพื่อออก
pm2 restart namngam
```

---

#### **Option 2: Hard-code (ไม่แนะนำ)**

แก้ไข `app/layout.tsx` บรรทัด 107:
```typescript
{process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
  <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
)}
```

---

### 6. ทดสอบว่า GA4 ทำงาน

**Step 1:** เปิดเว็บไซต์:
```
https://namngam.com
```

**Step 2:** เปิด Real-time Report ใน Google Analytics:
```
Reports > Real-time
```

**Step 3:** เช็คว่ามี User อยู่ในหน้าจอ (ตัวคุณเอง)

**Step 4:** คลิกไปหน้าต่างๆ ในเว็บ
- จะเห็น page views เพิ่มขึ้นใน real-time

---

### 7. ตั้งค่า Events & Conversions

#### **Event 1: WhatsApp Click**
```
Event name: whatsapp_click
Parameters:
  - phone_number: 8562055485622
```

#### **Event 2: Product Interest**
```
Event name: product_inquiry
Parameters:
  - product_name: (ชื่อสินค้า)
```

#### **Event 3: Newsletter Subscribe**
```
Event name: newsletter_subscribe
Parameters:
  - email: (ซ่อนด้วย privacy)
```

**GA4 จะ track events เหล่านี้อัตโนมัติ:**
- ✅ page_view
- ✅ scroll (เลื่อนหน้าจอ 90%)
- ✅ click (คลิกลิงก์ภายนอก)
- ✅ file_download
- ✅ video_start, video_progress, video_complete

---

### 8. ตั้งค่า Conversions (เป้าหมาย)

**Step 1:** ไปที่ `Admin > Events`

**Step 2:** เลือก Events ที่จะเป็น Conversion:
- ✅ whatsapp_click
- ✅ product_inquiry  
- ✅ newsletter_subscribe

**Step 3:** Toggle "Mark as conversion" ✅

---

### 9. ตั้งค่า Audiences (กลุ่มเป้าหมาย)

#### **Audience 1: All Users**
- Default audience

#### **Audience 2: Engaged Users**
- Session duration > 10 seconds
- OR 2+ page views

#### **Audience 3: Product Viewers**
- Visited `/products` page

#### **Audience 4: Blog Readers**
- Visited `/blog/*` pages

---

### 10. Connect Google Ads (ถ้ามี)

**Step 1:** ไปที่ `Admin > Product links`

**Step 2:** Link Google Ads Account

**Benefits:**
- ดู conversion จาก ads
- Remarketing ได้
- Optimize campaigns

---

## 📊 Reports ที่สำคัญ:

### **1. Real-time Report**
```
Reports > Real-time
```
- เห็น users ตอนนี้ทันที
- หน้าไหนที่คนดูอยู่
- มาจากไหน (country, city)

### **2. Acquisition Report**
```
Reports > Acquisition > User acquisition
```
- Users มาจากไหน:
  - Organic Search (Google, Bing)
  - Direct (พิมพ์ URL)
  - Social (Facebook, Line)
  - Referral (เว็บอื่นลิงก์มา)

### **3. Engagement Report**
```
Reports > Engagement > Pages and screens
```
- หน้าไหนมี views มากสุด
- หน้าไหนคนอยู่นานสุด
- หน้าไหนคนออกเร็วสุด (bounce rate)

### **4. Conversion Report**
```
Reports > Monetization > Conversions
```
- มีกี่คนทำ conversion
- Conversion rate
- Revenue (ถ้ามี e-commerce)

### **5. Demographics Report**
```
Reports > User > Demographic details
```
- เพศ, อายุ
- Country, City
- Language
- Device (Mobile, Desktop)

---

## 🎯 Key Metrics ที่ต้องดู:

| Metric | คำอธิบาย | เป้าหมาย |
|--------|---------|----------|
| **Users** | จำนวนคนเข้าเว็บ | เพิ่มขึ้นทุกเดือน |
| **Sessions** | จำนวนครั้งที่เข้า | > Users (คนกลับมาดูซ้ำ) |
| **Engagement Rate** | % คนที่อยู่นานหรือดูหลายหน้า | > 50% |
| **Avg Session Duration** | อยู่เว็บนานเท่าไร | > 2 minutes |
| **Pages per Session** | ดูกี่หน้าต่อครั้ง | > 3 pages |
| **Bounce Rate** | เข้ามาแล้วออกทันที | < 50% |
| **Conversions** | ทำตาม goal | เพิ่มขึ้นทุกสัปดาห์ |

---

## 📱 Google Analytics Mobile App

**Download:**
- iOS: App Store → "Google Analytics"
- Android: Play Store → "Google Analytics"

**Benefits:**
- เช็ค real-time ได้ทุกที่
- ได้รับ alerts
- เช็ครายงานแบบง่าย

---

## 🔧 Advanced Features (ภายหลัง):

### **1. Google Tag Manager (GTM)**
```
🔗 https://tagmanager.google.com
```
- จัดการ tags ทั้งหมดที่เดียว
- ไม่ต้องแก้โค้ด

### **2. E-commerce Tracking**
- Track purchases
- Product views
- Cart additions

### **3. Custom Dimensions**
- Language selected (lo/th/en/zh)
- User type (new/returning)

### **4. BigQuery Export**
- Export raw data
- Advanced analysis

---

## 💡 Tips สำหรับ GA4:

1. **ดูทุกวัน** - เช้าหรือเย็นก็ได้ เพื่อดูว่ามี traffic เข้ามาไหม
2. **เช็ค Real-time** - ดูว่ามีคนออนไลน์อยู่ตอนไหน
3. **ดู Top Pages** - หน้าไหนคนเข้าเยอะสุด
4. **เช็ค Conversion Rate** - กี่ % ที่ทำตามที่เราต้องการ
5. **ดู Traffic Source** - มาจาก Google Search, Facebook, หรือ Direct

---

## 🚨 Common Issues:

### **ปัญหา: ไม่เห็น data ใน GA4**

**แก้:**
1. เช็คว่า Measurement ID ถูกต้อง
2. เช็คว่า .env มี `NEXT_PUBLIC_GA_MEASUREMENT_ID`
3. Restart PM2: `pm2 restart namngam`
4. เช็คว่าไม่มี Ad Blocker บล็อก
5. เช็ค browser console (F12) ดู error

### **ปัญหา: Real-time ไม่แสดง**

**แก้:**
1. รอ 5-10 นาที
2. Refresh หน้า GA4
3. ลอง incognito mode
4. เช็คว่า browser cookie enable

---

## 📞 ติดต่อ Support:

- Google Analytics Help: https://support.google.com/analytics
- Community: https://support.google.com/analytics/community

---

## ⏱️ Timeline:

- **Setup:** 15-30 นาที
- **Real-time data:** ทันที
- **Historical reports:** เริ่มเก็บตั้งแต่วันที่ setup
- **Full features:** 24-48 ชั่วโมง
