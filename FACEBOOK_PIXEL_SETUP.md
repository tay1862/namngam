# 📘 Facebook Pixel (Meta Pixel) Setup Guide

## ขั้นตอนการตั้งค่า Facebook Pixel

### 1. สร้าง Facebook Business Manager

**Step 1:** ไปที่ Facebook Business
```
🔗 https://business.facebook.com
```

**Step 2:** คลิก "Create Account"

**Step 3:** กรอกข้อมูล:
- Business Name: `NAMNGAM`
- Your Name: (ชื่อจริง)
- Business Email: (อีเมลธุรกิจ)

---

### 2. สร้าง Facebook Pixel

**Step 1:** ไปที่ Events Manager
```
Business Settings > Data Sources > Pixels
```

**Step 2:** คลิก "Add" → "Create a Pixel"

**Step 3:** ตั้งชื่อ Pixel:
```
NAMNGAM Website Pixel
```

**Step 4:** เว็บไซต์:
```
https://namngam.com
```

**Step 5:** เลือก "Set up the Pixel Now"

---

### 3. เลือกวิธี Install Pixel

#### **Option 1: Manual Installation** ✅ แนะนำ

**Step 1:** เลือก "Manually add pixel code to website"

**Step 2:** คัดลอก Pixel ID (ตัวเลข 15-16 หลัก):
```
123456789012345
```

---

### 4. สร้าง Facebook Pixel Component

สร้างไฟล์ใหม่: `app/components/FacebookPixel.tsx`

```typescript
'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface FacebookPixelProps {
  pixelId: string;
}

export default function FacebookPixel({ pixelId }: FacebookPixelProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view when route changes
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'PageView');
    }
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
          alt="facebook pixel"
        />
      </noscript>
    </>
  );
}

// Helper functions for tracking events
export const fbPixelTrack = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, data);
  }
};

export const fbPixelTrackCustom = (eventName: string, data?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('trackCustom', eventName, data);
  }
};
```

---

### 5. เพิ่ม Facebook Pixel ใน Layout

แก้ไข `app/layout.tsx`:

```typescript
import FacebookPixel from './components/FacebookPixel';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="lo">
      <body className={`${notoSansLao.variable} antialiased`}>
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        
        {/* Facebook Pixel */}
        {process.env.NEXT_PUBLIC_FB_PIXEL_ID && (
          <FacebookPixel pixelId={process.env.NEXT_PUBLIC_FB_PIXEL_ID} />
        )}
        
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

---

### 6. เพิ่ม Pixel ID ใน Environment

**บน VPS:**

```bash
ssh root@167.86.84.139
cd /var/www/namngam
nano .env
```

**เพิ่มบรรทัดนี้:**
```env
NEXT_PUBLIC_FB_PIXEL_ID=123456789012345
```
(แทนที่ `123456789012345` ด้วย Pixel ID จริง)

**Save และ rebuild:**
```bash
# กด Ctrl+O เพื่อ save
# กด Ctrl+X เพื่อออก
npm run build
pm2 restart namngam
```

---

### 7. Track Events (เพิ่มในแต่ละหน้า)

#### **Event 1: Product View**

ใน `app/products/page.tsx`:

```typescript
import { useEffect } from 'react';
import { fbPixelTrack } from '../components/FacebookPixel';

export default function ProductsPage() {
  useEffect(() => {
    // Track product page view
    fbPixelTrack('ViewContent', {
      content_name: 'Products Page',
      content_category: 'Products',
      content_type: 'product_group',
    });
  }, []);

  // ... rest of component
}
```

---

#### **Event 2: WhatsApp Click (Lead)**

ใน `app/components/WhatsAppButton.tsx`:

```typescript
import { fbPixelTrack } from './FacebookPixel';

export default function WhatsAppButton() {
  const handleClick = () => {
    // Track as Lead event
    fbPixelTrack('Lead', {
      content_name: 'WhatsApp Click',
      content_category: 'Contact',
    });
    
    // Open WhatsApp
    window.open('https://wa.me/8562055485622', '_blank');
  };

  // ... rest of component
}
```

---

#### **Event 3: Newsletter Subscribe**

ใน `app/components/Newsletter.tsx`:

```typescript
import { fbPixelTrack } from './FacebookPixel';

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // ... validation code ...
  
  try {
    const response = await fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      // Track successful subscription
      fbPixelTrack('CompleteRegistration', {
        content_name: 'Newsletter Subscribe',
        status: 'success',
      });
      
      setStatus('success');
      setMessage(t('newsletter.success'));
      setEmail('');
    }
  } catch {
    // ... error handling ...
  }
};
```

---

#### **Event 4: Product Inquiry**

ใน `app/products/page.tsx`:

```typescript
import { fbPixelTrackCustom } from '../components/FacebookPixel';

// ใน product card
<a
  href={`https://wa.me/8562055485622?text=สวัสดี! ฉันสนใจ ${product.name}`}
  onClick={() => {
    // Track product inquiry
    fbPixelTrackCustom('ProductInquiry', {
      product_name: product.name,
      product_id: product.id,
      value: parseFloat(product.price) || 0,
      currency: 'LAK',
    });
  }}
  target="_blank"
  rel="noopener noreferrer"
  className="..."
>
  {t('products.chat')}
</a>
```

---

### 8. ตั้งค่า Standard Events

Facebook Pixel มี Standard Events หลัก:

| Event | ใช้เมื่อ | ตัวอย่าง |
|-------|----------|----------|
| **PageView** | โหลดหน้าใดๆ | อัตโนมัติ |
| **ViewContent** | ดูสินค้าหรือหน้า | Products page |
| **Search** | ค้นหา | Search blog |
| **AddToCart** | เพิ่มลงตะกร้า | (ถ้ามี cart) |
| **InitiateCheckout** | เริ่ม checkout | (ถ้ามี checkout) |
| **Purchase** | ซื้อสำเร็จ | (ถ้ามี payment) |
| **Lead** | สนใจสินค้า/ติดต่อ | WhatsApp click |
| **CompleteRegistration** | สมัครใช้งาน | Newsletter |
| **Contact** | ติดต่อ | Contact form |

---

### 9. ทดสอบ Facebook Pixel

#### **Option 1: Facebook Pixel Helper (Chrome Extension)**

**Step 1:** Install extension:
```
🔗 https://chrome.google.com/webstore
ค้นหา: "Facebook Pixel Helper"
```

**Step 2:** เปิดเว็บไซต์:
```
https://namngam.com
```

**Step 3:** คลิก icon Pixel Helper
- เห็น pixel firing ✅
- เห็น PageView event ✅

---

#### **Option 2: Events Manager Test Events**

**Step 1:** ไปที่ Events Manager:
```
Business.facebook.com > Events Manager > Test Events
```

**Step 2:** คลิก "Test browser events"

**Step 3:** เปิดเว็บไซต์ใน URL ที่ให้มา

**Step 4:** ทำ actions ต่างๆ:
- เปิดหน้า products
- คลิก WhatsApp
- Subscribe newsletter

**Step 5:** ดูว่า events ถูก track ไหม

---

### 10. ตั้งค่า Conversions

**Step 1:** ไปที่ Events Manager

**Step 2:** เลือก Events ที่จะเป็น Conversions:
```
Lead → ✅ Mark as conversion
CompleteRegistration → ✅ Mark as conversion
```

**Step 3:** ตั้งค่า Conversion Value (optional):
```
Lead = 10,000 LAK
CompleteRegistration = 5,000 LAK
```

---

### 11. สร้าง Custom Audiences

#### **Audience 1: Website Visitors (30 days)**
```
Include people who visited: Any page
In the last: 30 days
```

#### **Audience 2: Product Viewers**
```
Include people who visited: /products
In the last: 7 days
```

#### **Audience 3: Engaged Visitors**
```
Include people who:
- Visited >= 3 pages
- OR Time spent >= 2 minutes
In the last: 14 days
```

#### **Audience 4: Cart Abandoners** (ถ้ามี cart)
```
Include people who:
- Viewed /products
- But NOT completed purchase
In the last: 7 days
```

---

### 12. สร้าง Lookalike Audiences

**Step 1:** เลือก source audience:
```
Custom Audience: Engaged Visitors
```

**Step 2:** เลือก country:
```
Laos, Thailand
```

**Step 3:** เลือก audience size:
```
1% - 5% (คล้ายที่สุด)
```

---

## 📊 Facebook Ads Campaign Ideas:

### **Campaign 1: Awareness**
```
Objective: Reach
Target: Lookalike Audience (1-2%)
Creative: Video about Gua Sha benefits
Budget: 100,000 LAK/day
```

### **Campaign 2: Consideration**
```
Objective: Traffic
Target: Website Visitors (excluded converters)
Creative: Product carousel
Budget: 50,000 LAK/day
```

### **Campaign 3: Conversion**
```
Objective: Conversions (Lead)
Target: Engaged Visitors
Creative: Special offer / discount
Budget: 150,000 LAK/day
```

### **Campaign 4: Retargeting**
```
Objective: Conversions
Target: Product Viewers (last 7 days)
Creative: Testimonials / reviews
Budget: 75,000 LAK/day
```

---

## 💰 Facebook Ads Budget Recommendation:

| Phase | Budget/Month | Focus |
|-------|--------------|-------|
| **Test Phase (Month 1)** | 1,000,000 LAK | Test audiences & creatives |
| **Scale Phase (Month 2-3)** | 2,000,000 LAK | Focus on best performers |
| **Optimize Phase (Month 4+)** | 3,000,000 LAK | Scale winners, cut losers |

---

## 📈 Key Metrics to Monitor:

| Metric | Good | Needs Improvement |
|--------|------|-------------------|
| **CPM** (Cost per 1000 impressions) | < 50,000 LAK | > 100,000 LAK |
| **CPC** (Cost per click) | < 5,000 LAK | > 10,000 LAK |
| **CTR** (Click-through rate) | > 1% | < 0.5% |
| **CPA** (Cost per acquisition) | < 50,000 LAK | > 100,000 LAK |
| **ROAS** (Return on ad spend) | > 3x | < 1x |

---

## 🎨 Creative Best Practices:

### **Images:**
- High quality (1080x1080px minimum)
- Show product clearly
- Before/After photos
- Lifestyle shots (people using product)

### **Videos:**
- 15-30 seconds
- Square format (1:1) or vertical (9:16)
- Add captions (many watch without sound)
- Hook in first 3 seconds

### **Copy:**
- Start with benefit, not feature
- Use emojis strategically ✨
- Include clear CTA
- Test in multiple languages

### **CTA Examples:**
```
ລາວ: "ສອບຖາມລາຄາ", "ສັ່ງຊື້ດຽວນີ້", "ດູເພີ່ມເຕີມ"
ไทย: "สอบถามราคา", "สั่งซื้อเลย", "ดูเพิ่มเติม"
EN: "Shop Now", "Learn More", "Get Yours"
```

---

## 💡 Advanced Tips:

1. **Pixel Optimization:**
   - ใช้ Conversion API (server-side tracking)
   - เพิ่ม match quality
   - Reduce data loss from iOS 14+

2. **Dynamic Ads:**
   - Product catalog upload
   - Auto-show products viewed
   - Retargeting automation

3. **A/B Testing:**
   - Test 2-3 images per ad set
   - Test different copy variations
   - Test audiences

4. **Budget Optimization:**
   - Use Campaign Budget Optimization (CBO)
   - Let Facebook allocate budget
   - Focus on ROAS

---

## 🚨 Common Issues:

### **ปัญหา: Pixel not detected**

**แก้:**
1. เช็ค `.env` มี `NEXT_PUBLIC_FB_PIXEL_ID`
2. Rebuild: `npm run build && pm2 restart namngam`
3. Clear browser cache
4. ตรวจสอบ browser console (F12)

### **ปัญหา: Events ไม่ขึ้น**

**แก้:**
1. เช็ค Pixel Helper extension
2. ดู Events Manager > Diagnostics
3. เช็ค code ว่า `fbPixelTrack()` ถูกเรียกไหม
4. ตรวจสอบ Ad Blocker

### **ปัญหา: Attribution ผิด**

**แก้:**
1. ตั้ง attribution window ให้เหมาะสม
2. เลือก "7-day click, 1-day view"
3. รอ 24-48 ชม. ให้ pixel เรียนรู้

---

## 📞 Facebook Support:

- Ads Help Center: https://www.facebook.com/business/help
- Community: Facebook Ads Managers Group
- Chat Support: Business.facebook.com > Help

---

## ⏱️ Timeline:

- **Setup:** 30-60 นาที
- **Pixel Active:** ทันที
- **Learning Phase:** 7 days (50 conversions)
- **Optimization:** 14-30 days
- **Stable Performance:** 30-60 days

---

## 🎯 Success Checklist:

- [ ] Facebook Business Manager created
- [ ] Pixel created and installed
- [ ] Pixel ID in `.env` file
- [ ] Component deployed and tested
- [ ] Pixel Helper shows green ✅
- [ ] PageView events tracked
- [ ] Custom events (Lead, etc.) tracked
- [ ] Conversions configured
- [ ] Custom audiences created
- [ ] First ad campaign launched

---

**หมายเหตุ:** Facebook Pixel ต้องใช้เวลาเรียนรู้ (Learning Phase) ประมาณ 7 วัน หรือ 50 conversions ถึงจะทำงานได้เต็มประสิทธิภาพ
