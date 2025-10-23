# ⚡ คู่มือแก้ไขด่วน - ปัญหาเร่งด่วนที่ต้องแก้ก่อน

**อ่านเอกสารฉบับเต็ม:** `CODE_AUDIT_REPORT.md`

---

## 🚨 ปัญหา #1: ภาษาเปลี่ยนไม่ได้ (CRITICAL)

### สาเหตุ:
1. LanguageSwitcher บันทึก locale ใน localStorage ✅
2. แต่ทุก Component ไม่ได้ใช้ locale ❌
3. Text ทั้งหมด hardcode เป็นภาษาลาว ❌

### แก้ไขอย่างรวดเร็ว (30 นาที):

#### 1. สร้างไฟล์ `lib/translations.ts`:

```tsx
export const translations = {
  lo: {
    nav: { home: 'ໜ້າຫຼັກ', about: 'ກ່ຽວກັບ', products: 'ສິນຄ້າ', blog: 'ບົດຄວາມ', contact: 'ຕິດຕໍ່' },
    hero: { title: 'ກັວຊາ', subtitle: 'ວິທີການນວດດັ້ງເດີມຂອງຈີນ ເພື່ອສຸຂະພາບແລະຄວາມງາມ', cta: 'ເລີ່ມຕົ້ນຮຽນຮູ້' },
  },
  th: {
    nav: { home: 'หน้าแรก', about: 'เกี่ยวกับ', products: 'สินค้า', blog: 'บทความ', contact: 'ติดต่อ' },
    hero: { title: 'กัวช่า', subtitle: 'วิธีการนวดดั้งเดิมจากจีน เพื่อสุขภาพและความงาม', cta: 'เริ่มเรียนรู้' },
  },
  en: {
    nav: { home: 'Home', about: 'About', products: 'Products', blog: 'Blog', contact: 'Contact' },
    hero: { title: 'Gua Sha', subtitle: 'Traditional Chinese massage for health and beauty', cta: 'Learn More' },
  },
  zh: {
    nav: { home: '首页', about: '关于', products: '产品', blog: '博客', contact: '联系' },
    hero: { title: '刮痧', subtitle: '传统中医按摩 健康与美容', cta: '了解更多' },
  },
};

export function useTranslations() {
  const { locale } = useLocale();
  return {
    t: (key: string) => {
      const keys = key.split('.');
      let value: any = translations[locale];
      for (const k of keys) {
        value = value?.[k];
      }
      return value || key;
    },
  };
}
```

#### 2. แก้ `app/components/Navigation.tsx`:

```tsx
// เพิ่มบรรทัดนี้
import { useTranslations } from '@/lib/translations';

export default function Navigation() {
  const { t } = useTranslations(); // ✅ เพิ่ม
  
  // แก้จาก hardcode เป็น
  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.about'), href: '/#about' },
    { name: t('nav.products'), href: '/products' },
    { name: t('nav.blog'), href: '/#blog' },
    { name: t('nav.contact'), href: '/#contact' },
  ];
  
  // ...
}
```

#### 3. แก้ `app/components/Hero.tsx`:

```tsx
import { useTranslations } from '@/lib/translations';

export default function Hero() {
  const { t } = useTranslations(); // ✅ เพิ่ม
  
  return (
    <section>
      <h1>{t('hero.title')}</h1>  {/* แก้ */}
      <p>{t('hero.subtitle')}</p>  {/* แก้ */}
      <button>{t('hero.cta')}</button>  {/* แก้ */}
    </section>
  );
}
```

#### 4. ลบ reload ออกจาก `app/components/LanguageSwitcher.tsx`:

```tsx
const switchLanguage = (newLocale: 'lo' | 'th' | 'en' | 'zh') => {
  setLocale(newLocale);
  setIsOpen(false);
  // ❌ ลบบรรทัดนี้ออก: window.location.reload();
};
```

#### 5. ทำซ้ำสำหรับ Components อื่นๆ:
- About.tsx
- Benefits.tsx
- FAQ.tsx
- Footer.tsx

**ทดสอบ:** กดเปลี่ยนภาษา → ควรเห็นเนื้อหาเปลี่ยนทันที!

---

## 🚨 ปัญหา #2: ไม่มี Loading State

### แก้ไขด่วน (15 นาที):

#### 1. สร้าง `lib/hooks/useFetch.ts`:

```tsx
import { useState, useEffect } from 'react';

export function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Failed to fetch');
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

#### 2. ใช้ใน Component:

```tsx
// ก่อน
const [products, setProducts] = useState([]);
useEffect(() => {
  fetch('/api/products').then(r => r.json()).then(setProducts);
}, []);

// หลัง
const { data: products, loading, error } = useFetch('/api/products');

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error}</div>;
```

---

## 🚨 ปัญหา #3: Error Handling แย่

### แก้ไขด่วน (10 นาที):

#### 1. ติดตั้ง react-hot-toast:

```bash
npm install react-hot-toast
```

#### 2. เพิ่มใน `app/providers.tsx`:

```tsx
import { Toaster } from 'react-hot-toast';

export function Providers({ children }) {
  return (
    <SessionProvider>
      <LocaleProvider>
        {children}
        <Toaster position="top-right" /> {/* ✅ เพิ่ม */}
      </LocaleProvider>
    </SessionProvider>
  );
}
```

#### 3. ใช้แทน console.error:

```tsx
import toast from 'react-hot-toast';

// ก่อน
catch (error) {
  console.error('Failed');
}

// หลัง
catch (error) {
  toast.error('ເກີດຂໍ້ຜິດພາດ!');
}
```

---

## 🚨 ปัญหา #4: Database Fields ไม่ได้ Save

### แก้ไขด่วน (5 นาที):

#### แก้ `app/api/admin/products/route.ts`:

```ts
// เพิ่ม fields เหล่านี้ใน create()
const product = await prisma.product.create({
  data: {
    name: data.name,
    nameEn: data.nameEn,
    nameTh: data.nameTh,        // ✅ เพิ่ม
    nameZh: data.nameZh,        // ✅ เพิ่ม
    
    description: data.description,
    descriptionEn: data.descriptionEn,
    descriptionTh: data.descriptionTh,  // ✅ เพิ่ม
    descriptionZh: data.descriptionZh,  // ✅ เพิ่ม
    
    features: data.features || [],
    featuresEn: data.featuresEn || [],
    featuresTh: data.featuresTh || [],  // ✅ เพิ่ม
    featuresZh: data.featuresZh || [],  // ✅ เพิ่ม
    
    // ...
  },
});
```

---

## 📝 ลำดับการแก้ไข (แนะนำ)

### วันที่ 1 (2-3 ชั่วโมง):
1. ✅ สร้าง translations.ts
2. ✅ แก้ Navigation, Hero
3. ✅ ลบ reload ออกจาก LanguageSwitcher
4. ✅ ทดสอบเปลี่ยนภาษา

### วันที่ 2 (2-3 ชั่วโมง):
5. ✅ แก้ About, Benefits, FAQ, Footer
6. ✅ ทดสอบทุกหน้า ทุกภาษา

### วันที่ 3 (1-2 ชั่วโมง):
7. ✅ สร้าง useFetch hook
8. ✅ ติดตั้ง react-hot-toast
9. ✅ อัพเดท Components ทั้งหมด

### วันที่ 4 (1 ชั่วโมง):
10. ✅ แก้ API routes (save ทุก language fields)
11. ✅ ทดสอบ CRUD

### วันที่ 5 (1 ชั่วโมง):
12. ✅ Testing ทั้งหมด
13. ✅ แก้ bugs ที่พบ

**รวมเวลา:** ~8-10 ชั่วโมง (1 สัปดาห์ทำงาน part-time)

---

## 🎯 ทดสอบว่าแก้ไขสำเร็จ

### Test 1: Multi-language
- [ ] เปิดเว็บ → เห็นภาษาลาว
- [ ] กดเปลี่ยนเป็นไทย → เนื้อหาเปลี่ยนทันที
- [ ] กดเปลี่ยนเป็นอังกฤษ → เนื้อหาเปลี่ยนทันที
- [ ] Reload หน้า → ภาษาที่เลือกยังคงอยู่
- [ ] ตรวจทุกหน้า: Home, Products, Blog

### Test 2: Loading States
- [ ] เปิดหน้าเว็บ → เห็น Loading
- [ ] รอ → ข้อมูลโหลดเสร็จ
- [ ] Slow 3G ใน DevTools → เห็น Loading นานขึ้น

### Test 3: Error Handling
- [ ] ปิด internet → เห็น error toast
- [ ] ลอง submit form ที่ผิด → เห็น error message

### Test 4: Database
- [ ] สร้าง Product ใหม่ใน Admin
- [ ] ใส่ชื่อภาษาไทย, อังกฤษ, จีน
- [ ] Save → ตรวจ database → ทุก field ควร save

---

## 💡 Tips

### Tip 1: ใช้ React DevTools
- ติดตั้ง extension
- ดู LocaleContext → ตรวจว่า locale เปลี่ยนหรือไม่

### Tip 2: Test ใน Incognito
- ทดสอบว่า localStorage ทำงานถูกต้อง

### Tip 3: ใช้ git branch
```bash
git checkout -b fix/multi-language
# แก้ไขทั้งหมด
git commit -m "Fix multi-language system"
git checkout main
git merge fix/multi-language
```

---

## 📞 ติดปัญหา?

### Common Errors:

**Error: "useLocale must be used within LocaleProvider"**
- ตรวจสอบว่า layout.tsx มี `<Providers>` wrap children

**Error: "Cannot find module translations"**
- ตรวจสอบ path: `@/lib/translations` vs `../../lib/translations`

**ภาษาไม่เปลี่ยน:**
- ตรวจว่า Component ใช้ `useTranslations()` แล้วหรือยัง
- ตรวจว่าลบ `window.location.reload()` ออกแล้วหรือยัง

**Toast ไม่แสดง:**
- ตรวจว่าเพิ่ม `<Toaster />` ใน providers.tsx แล้วหรือยัง

---

**เวลาที่ต้องใช้:** 1 สัปดาห์ (part-time)  
**ความยาก:** ⭐⭐⭐☆☆  
**ผลลัพธ์:** ระบบใช้งานได้จริง 100%
