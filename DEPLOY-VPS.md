# 🚀 NAMNGAM VPS Deployment Guide

## 📊 Current System Status (Test Results: 91% Pass)

### ✅ **WORKING - Ready to Use:**
- About Section: Full 4-language support with auto-translate 🪄
- Benefits Section: Full 4-language support with auto-translate 🪄
- Image Upload System: All admin pages
- Translation API: LibreTranslate + MyMemory (FREE)
- Security: RBAC + Rate limiting + User management
- Session Management: 8hr timeout, auto-refresh

### ⚠️ **PARTIAL - Works but Single Language:**
- Products: Can save data but only English name (no Th/Zh)
- Blog: Can save but no multi-language
- FAQ: Can save but no multi-language

---

## 🔧 **STEP 1: Deploy to VPS**

### **1.1 Connect to VPS:**
```bash
ssh root@167.86.84.139
cd /var/www/namngam
```

### **1.2 Pull Latest Code:**
```bash
git pull origin main
```

### **1.3 Install Dependencies (if needed):**
```bash
npm install
```

### **1.4 Rebuild:**
```bash
rm -rf .next
npm run build
```

### **1.5 Restart PM2:**
```bash
pm2 restart namngam
pm2 logs namngam --lines 50
```

---

## 🧪 **STEP 2: Test Multi-Language System on VPS**

### **2.1 Test About Section (Should Work ✅):**

**Admin:**
1. Go to: https://namngam.com/admin/about
2. Login if needed
3. Enter content in Lao (required)
4. Click 🪄 "ແປນອັດຕະໂນມັດ" (Auto-translate)
5. Check tabs: 🇱🇦 🇹🇭 🇺🇸 🇨🇳
6. Verify translations appear
7. Click "ບັນທຶກ" (Save)

**Frontend:**
1. Go to: https://namngam.com
2. Scroll to "About" section
3. Change language: 🇱🇦 → 🇹🇭 → 🇺🇸 → 🇨🇳
4. **Expected:** Content changes to selected language ✅

### **2.2 Test Benefits Section (Should Work ✅):**

**Admin:**
1. Go to: https://namngam.com/admin/benefits
2. Add or edit benefit
3. Enter Lao content
4. Click 🪄 auto-translate
5. Save

**Frontend:**
1. Go to: https://namngam.com
2. Scroll to "Benefits" section
3. Change language
4. **Expected:** Benefit cards change language ✅

### **2.3 Test Products (Partial - No Auto-Translate ⚠️):**

**Admin:**
1. Go to: https://namngam.com/admin/products
2. Add product
3. Upload image (should work ✅)
4. Fill in Lao only
5. Save

**Frontend:**
1. Go to: https://namngam.com/products
2. Change language
3. **Expected:** Shows Lao only (no translation yet) ⚠️

---

## 🔍 **STEP 3: Check VPS Database**

### **3.1 SSH to VPS and Check Database:**
```bash
ssh root@167.86.84.139
cd /var/www/namngam

# Check About Section
node -e "
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

(async () => {
  console.log('=== ABOUT SECTION ===');
  const about = await prisma.aboutSection.findFirst();
  if (about) {
    console.log('✅ Found About Section');
    console.log('Lao:', about.title || 'NULL');
    console.log('Thai:', about.titleTh || 'NULL');
    console.log('English:', about.titleEn || 'NULL');
    console.log('Chinese:', about.titleZh || 'NULL');
  } else {
    console.log('❌ No About Section');
  }
  
  console.log('\n=== BENEFITS ===');
  const benefits = await prisma.benefitItem.findMany({ take: 3 });
  console.log('Found', benefits.length, 'benefits');
  benefits.forEach((b, i) => {
    console.log(\`\${i+1}. Lao: \${b.title}\`);
    console.log(\`   Thai: \${b.titleTh || 'NULL'}\`);
  });
  
  await prisma.\$disconnect();
})();
"
```

### **3.2 Alternative: Check via Prisma Studio:**
```bash
cd /var/www/namngam
npx prisma studio --browser none --port 5555
```
Then open: http://167.86.84.139:5555

---

## ❓ **STEP 4: Troubleshooting**

### **Problem: "หน้าเว็บไม่เปลี่ยนภาษา"**

**Possible Causes:**
1. ❌ Data not saved in database
2. ❌ Cache not cleared
3. ❌ Frontend not using localize helpers
4. ❌ Language switcher not working

**Solutions:**

**A. Check Database:**
```bash
# On VPS
cd /var/www/namngam
node check-vps-database.js
```

**B. Clear Cache:**
```bash
# On VPS
cd /var/www/namngam
rm -rf .next
npm run build
pm2 restart namngam
```

**C. Check Browser:**
1. Clear browser cache (Ctrl+Shift+R)
2. Check console for errors (F12)
3. Try different browser

**D. Check API Response:**
```bash
# On Local
curl https://namngam.com/api/admin/about | jq .

# Expected: Should have titleTh, titleEn, titleZh
```

---

## 📋 **STEP 5: Verify Each Feature**

### **5.1 About Section:**
- [ ] Admin loads without errors
- [ ] Can see existing content
- [ ] Auto-translate button works 🪄
- [ ] Can save successfully
- [ ] Frontend shows 4 languages
- [ ] Language switcher works

### **5.2 Benefits Section:**
- [ ] Admin loads without errors
- [ ] Can add/edit benefits
- [ ] Auto-translate button works 🪄
- [ ] Can upload images
- [ ] Frontend shows 4 languages
- [ ] Language switcher works

### **5.3 Products:**
- [ ] Admin loads without errors
- [ ] Can add products
- [ ] Image upload works
- [ ] Can save successfully
- [ ] Frontend displays products
- ⚠️ Only Lao language (expected)

### **5.4 Blog:**
- [ ] Admin loads without errors
- [ ] Can create posts
- [ ] Image upload works
- [ ] Can publish
- [ ] Frontend displays posts
- ⚠️ Only Lao language (expected)

### **5.5 FAQ:**
- [ ] Admin loads without errors
- [ ] Can add FAQs
- [ ] Can save
- [ ] Frontend displays FAQs
- ⚠️ Only Lao language (expected)

---

## 🎯 **Expected Results After Deployment:**

### **✅ Should Work (100%):**
```
About Section:
  Admin: ✅ Auto-translate ✅ Save all 4 languages
  Frontend: ✅ Display 4 languages ✅ Switch languages

Benefits Section:
  Admin: ✅ Auto-translate ✅ Save all 4 languages
  Frontend: ✅ Display 4 languages ✅ Switch languages

Image Upload:
  ✅ All admin pages can upload images
  ✅ Images display on frontend
```

### **⚠️ Partial (Single Language):**
```
Products:
  Admin: ✅ Can save ⚠️ No auto-translate
  Frontend: ✅ Display ⚠️ Lao only

Blog:
  Admin: ✅ Can save ⚠️ No auto-translate
  Frontend: ✅ Display ⚠️ Lao only

FAQ:
  Admin: ✅ Can save ⚠️ No auto-translate
  Frontend: ✅ Display ⚠️ Lao only
```

---

## 💡 **Next Steps After Deployment:**

### **Option A: Use Current System (Recommended)**
- Use About + Benefits with full multi-language ✅
- Products/Blog/FAQ: Single language (Lao)
- **Pros:** Stable, no risk
- **Cons:** Limited

### **Option B: AI Translation (Copy-Paste)**
- Write in Lao
- Use ChatGPT/Claude to translate
- Copy-paste translations manually
- **Pros:** Free, good quality, safe
- **Cons:** Takes time

### **Option C: Add Full Multi-Language (Risky)**
- Update Products/Blog/FAQ APIs
- Add MultiLanguageTabs UI
- Add auto-translate buttons
- **Pros:** Complete solution
- **Cons:** Risk of breaking, needs testing

---

## 📞 **Support Commands:**

### **Check Logs:**
```bash
ssh root@167.86.84.139
pm2 logs namngam --lines 100
```

### **Restart Service:**
```bash
pm2 restart namngam
pm2 status
```

### **Check Build:**
```bash
cd /var/www/namngam
npm run build
```

### **Database Status:**
```bash
cd /var/www/namngam
npx prisma db push
npx prisma studio --port 5555
```

---

## ✅ **Success Criteria:**

**After deployment is successful when:**
1. ✅ https://namngam.com loads without errors
2. ✅ Can login to /admin
3. ✅ About section shows 4 languages on frontend
4. ✅ Benefits section shows 4 languages on frontend
5. ✅ Can upload images on all admin pages
6. ✅ No console errors in browser (F12)
7. ✅ PM2 status shows "online"

**Test it yourself:**
```bash
# 1. Deploy
ssh root@167.86.84.139 "cd /var/www/namngam && git pull && npm run build && pm2 restart namngam"

# 2. Check status
ssh root@167.86.84.139 "pm2 status && pm2 logs namngam --lines 20"

# 3. Test website
open https://namngam.com
```

---

**Good luck! 🚀**
