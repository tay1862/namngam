# ⚠️ EMERGENCY FIX - Database Migration Required

## 🔴 PROBLEM: 500 Error on About Update

**Error Details:**
```
PUT /api/admin/about/cmh30fa420001kuh0z31zfwig
Status: 500 Internal Server Error
```

**Root Cause:**
- Prisma schema has multi-language fields (titleTh, titleEn, titleZh, etc.)
- VPS database might not have these columns yet
- API tries to write to non-existent columns → 500 Error

---

## 🔧 SOLUTION: Migrate Database on VPS

### **Step 1: SSH to VPS**
```bash
ssh root@167.86.84.139
```

### **Step 2: Navigate to Project**
```bash
cd /var/www/namngam
```

### **Step 3: Pull Latest Code**
```bash
git pull origin main
```

### **Step 4: Install Dependencies**
```bash
npm install
```

### **Step 5: 🚨 CRITICAL - Run Prisma Migration**
```bash
npx prisma migrate deploy
```

**OR if migration files are missing:**
```bash
npx prisma db push
```

**⚠️ WARNING:** `npx prisma db push` will sync schema to database WITHOUT creating migration files. Use only if migrate deploy fails.

### **Step 6: Generate Prisma Client**
```bash
npx prisma generate
```

### **Step 7: Rebuild Application**
```bash
npm run build
```

### **Step 8: Restart PM2**
```bash
pm2 restart namngam
pm2 logs namngam --lines 50
```

---

## 🔍 VERIFY DATABASE SCHEMA

### **Check if columns exist:**
```bash
# Connect to PostgreSQL
psql $DATABASE_URL

# List columns in AboutSection table
\d "AboutSection"

# Should see:
# - titleTh
# - titleEn
# - titleZh
# - descriptionTh
# - descriptionEn
# - descriptionZh

# Exit psql
\q
```

---

## 📋 CHECKLIST

### Before Migration:
- [ ] Backup database (if production data exists)
- [ ] Check DATABASE_URL in .env

### Migration Commands:
- [ ] `cd /var/www/namngam`
- [ ] `git pull origin main`
- [ ] `npm install`
- [ ] `npx prisma migrate deploy` OR `npx prisma db push`
- [ ] `npx prisma generate`
- [ ] `npm run build`
- [ ] `pm2 restart namngam`

### After Migration:
- [ ] Check PM2 logs: `pm2 logs namngam --lines 50`
- [ ] Test About page: `/admin/about`
- [ ] Test Benefits page: `/admin/benefits`
- [ ] Test Products page: `/admin/products`
- [ ] Test Blog page: `/admin/blog`
- [ ] Test FAQ page: `/admin/faq`

---

## ⚠️ TROUBLESHOOTING

### If migration fails:

**Error: "Migration file not found"**
```bash
# Force push schema to database
npx prisma db push --accept-data-loss
```

**⚠️ WARNING:** This will:
- Sync schema to database
- May drop columns that don't exist in schema
- Use with caution!

**Error: "Connection refused"**
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Restart if needed
sudo systemctl restart postgresql
```

**Error: "Permission denied"**
```bash
# Check .env has correct DATABASE_URL
cat .env.production

# Should look like:
# DATABASE_URL="postgresql://user:password@localhost:5432/namngam"
```

---

## 🧪 TEST AFTER MIGRATION

### Test 1: About Page
1. Go to: https://www.namngam.com/admin/about
2. Edit existing section
3. Click 🪄 "ແປນອັດຕະໂນມັດ" (Auto-translate)
4. Save
5. **Expected:** ✅ Saves successfully (no 500 error)

### Test 2: Benefits Page
1. Go to: https://www.namngam.com/admin/benefits
2. Add new benefit
3. Click 🪄 "ແປນອັດຕະໂນມັດ"
4. Save
5. **Expected:** ✅ Saves successfully

### Test 3: Products Page
1. Go to: https://www.namngam.com/admin/products
2. Add new product
3. Switch tabs: 🇱🇦 → 🇹🇭 → 🇬🇧 → 🇨🇳
4. Fill in each language
5. Save
6. **Expected:** ✅ Saves successfully

### Test 4: Blog Page
1. Go to: https://www.namngam.com/admin/blog
2. Add new blog post
3. Switch tabs: 🇱🇦 → 🇹🇭 → 🇬🇧 → 🇨🇳
4. Fill in each language
5. Save
6. **Expected:** ✅ Saves successfully

### Test 5: FAQ Page
1. Go to: https://www.namngam.com/admin/faq
2. Add new FAQ
3. Switch tabs: 🇱🇦 → 🇹🇭 → 🇬🇧 → 🇨🇳
4. Fill in each language
5. Save
6. **Expected:** ✅ Saves successfully

---

## 📊 SUMMARY

**What Happened:**
- Code on VPS is outdated (doesn't have multi-language fields)
- Database schema is outdated (missing columns)
- API tries to write to missing columns → 500 Error

**What to Do:**
1. Pull latest code
2. **Migrate database** (most important!)
3. Rebuild app
4. Restart PM2

**After Fix:**
- ✅ About page saves successfully
- ✅ Benefits page saves successfully
- ✅ All admin pages work
- ✅ Multi-language system fully functional

---

## 🚨 QUICK FIX COMMANDS (Copy-Paste)

```bash
# SSH to VPS
ssh root@167.86.84.139

# Navigate and update
cd /var/www/namngam
git pull origin main
npm install

# 🚨 CRITICAL: Migrate database
npx prisma migrate deploy || npx prisma db push

# Generate Prisma client
npx prisma generate

# Rebuild and restart
npm run build
pm2 restart namngam

# Check logs
pm2 logs namngam --lines 50
```

**Done! Test at:** https://www.namngam.com/admin/about

---

## ✅ EXPECTED RESULT

After running migration:

**Before:**
```
PUT /api/admin/about/xxx → 500 Error ❌
```

**After:**
```
PUT /api/admin/about/xxx → 200 OK ✅
Response: { id: "xxx", title: "...", titleTh: "...", ... }
```

---

## 📝 NOTES

- Migration is safe (only adds columns, doesn't delete data)
- Old data will have `null` for new language fields
- Admin can fill in translations later
- Frontend gracefully handles missing translations (fallback to Lao)

**Most Important:** Run `npx prisma migrate deploy` or `npx prisma db push`!
