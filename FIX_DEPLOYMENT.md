# 🔧 Fix Deployment Instructions

## ✅ Fixed Issues:

1. ✅ **Favicon** - Changed to gold logo (visible now)
2. ✅ **Images** - Added domain support in next.config.ts
3. ✅ **Blog API** - Added force-dynamic and logging

---

## 🚀 Deploy to VPS:

```bash
# 1. SSH to VPS
ssh root@167.86.84.139

# 2. Pull changes
cd /var/www/namngam
git pull origin main

# 3. Rebuild
rm -rf .next
npm run build

# 4. Restart PM2
pm2 restart namngam

# 5. Watch logs to see blog post count
pm2 logs namngam --lines 50
```

**Look for these logs:**
```
[Blog API] Fetching blog posts...
[Blog API] Found X posts
[Blog API] Returning X formatted posts
```

---

## 🔍 Check if Blog Posts Exist:

### **Method 1: Using Prisma Studio**
```bash
cd /var/www/namngam
npx prisma studio
```
Then open: http://167.86.84.139:5555

### **Method 2: SQL Query**
```bash
cd /var/www/namngam
npx prisma db execute --stdin <<< "
SELECT 
  id, 
  title, 
  slug, 
  published, 
  created_at 
FROM \"BlogPost\" 
ORDER BY created_at DESC 
LIMIT 10;
"
```

### **Method 3: Count Posts**
```bash
cd /var/www/namngam
npx prisma db execute --stdin <<< "
SELECT 
  COUNT(*) as total_posts,
  COUNT(*) FILTER (WHERE published = true) as published_posts,
  COUNT(*) FILTER (WHERE published = false) as draft_posts
FROM \"BlogPost\";
"
```

---

## 📊 Expected Results:

### **If Blog Posts Exist:**
```
[Blog API] Found 5 posts
[Blog API] Returning 5 formatted posts
```
✅ Blog page should show posts

### **If No Blog Posts:**
```
[Blog API] Found 0 posts
[Blog API] Returning 0 formatted posts
```
❌ Need to create blog posts in admin

---

## 📝 Create Blog Posts (if none exist):

### **Option 1: Through Admin Panel**
```
1. Go to: https://namngam.com/admin/login
2. Login with admin credentials
3. Go to: Blog section
4. Click "Create New Post"
5. Fill in all required fields:
   - Title (Lao)
   - Slug (auto-generated)
   - Excerpt (Lao)
   - Content (Lao)
   - Image URL
   - Category
   - Check "Published"
6. Click Save
```

### **Option 2: Using SQL (Quick Test)**
```bash
cd /var/www/namngam
npx prisma db execute --stdin <<< "
INSERT INTO \"BlogPost\" (
  id,
  title,
  slug,
  excerpt,
  content,
  image,
  category,
  published,
  \"readTime\",
  \"createdAt\",
  \"updatedAt\",
  \"publishedAt\"
) VALUES (
  'blog-test-001',
  'ວິທີນວດກັວຊາທີ່ຖືກຕ້ອງ',
  'how-to-use-gua-sha',
  'ຮຽນຮູ້ວິທີການນວດກັວຊາທີ່ຖືກຕ້ອງເພື່ອຜົນລັບທີ່ດີທີ່ສຸດ',
  'ກັວຊາແມ່ນເຄື່ອງມືນວດທີ່ມີປະສິດທິພາບສູງ...',
  '/Logo-namngam-gold.png',
  'ຄູ່ມື',
  true,
  '5 ນາທີ',
  NOW(),
  NOW(),
  NOW()
);
"
```

---

## 🧪 Test After Deploy:

### **1. Test Favicon:**
```bash
# Check if gold logo is referenced
curl -s https://namngam.com | grep "Logo-namngam-gold"
```
Should see: `Logo-namngam-gold.png`

### **2. Test Images:**
```bash
# Check if images load
curl -I https://namngam.com/Logo-namngam-gold.png
```
Should see: `HTTP/2 200`

### **3. Test Blog API:**
```bash
# Check blog posts
curl -s https://namngam.com/api/blog | jq '.'
```
Should see: Array of blog posts (or empty array `[]`)

### **4. Test Blog Page:**
Open in browser: https://namngam.com/blog

---

## 🔍 Troubleshooting:

### **Issue: Favicon still white**
```bash
# Clear browser cache
# Or test in incognito mode
# Or hard refresh: Ctrl+F5 (Windows) / Cmd+Shift+R (Mac)
```

### **Issue: Images not loading**
```bash
# Check if file exists
ssh root@167.86.84.139 "ls -lh /var/www/namngam/public/Logo-namngam-gold.png"

# Check nginx logs
ssh root@167.86.84.139 "tail -50 /var/log/nginx/error.log"
```

### **Issue: Blog posts still not showing**
```bash
# Check PM2 logs
pm2 logs namngam | grep "Blog API"

# Check if posts exist
npx prisma studio

# Force clear cache
rm -rf /var/www/namngam/.next
npm run build
pm2 restart namngam
```

### **Issue: Database connection error**
```bash
# Check .env
cat /var/www/namngam/.env | grep DATABASE_URL

# Test connection
npx prisma db pull
```

---

## ✅ Success Checklist:

```bash
# Run this after deploy
echo "=== Deployment Verification ==="
echo ""
echo "1. Git Status:"
cd /var/www/namngam && git log -1 --oneline
echo ""
echo "2. Favicon Check:"
curl -s https://namngam.com | grep -o "Logo-namngam-[a-z]*\.png" | head -1
echo ""
echo "3. Image Check:"
curl -s -o /dev/null -w "Logo Status: %{http_code}\n" https://namngam.com/Logo-namngam-gold.png
echo ""
echo "4. Blog API Check:"
curl -s https://namngam.com/api/blog | jq 'length'
echo ""
echo "5. PM2 Status:"
pm2 status | grep namngam
```

**Expected Output:**
```
1. Git Status: ebf4eb9 🐛 FIX: Favicon, Images, and Blog Display Issues
2. Favicon Check: Logo-namngam-gold.png
3. Image Check: Logo Status: 200
4. Blog API Check: X (number of posts, or 0)
5. PM2 Status: online
```

---

## 📞 If Still Having Issues:

1. **Check PM2 logs:** `pm2 logs namngam --lines 100`
2. **Check nginx logs:** `tail -100 /var/log/nginx/error.log`
3. **Restart everything:**
   ```bash
   pm2 restart namngam
   systemctl restart nginx
   ```
4. **Full rebuild:**
   ```bash
   cd /var/www/namngam
   rm -rf .next node_modules
   npm install
   npm run build
   pm2 restart namngam
   ```

---

## 📊 What Changed:

| File | Change | Impact |
|------|--------|--------|
| `app/layout.tsx` | White logo → Gold logo | ✅ Favicon visible |
| `next.config.ts` | Added namngam.com domain | ✅ Images load |
| `app/api/blog/route.ts` | Added force-dynamic + logs | ✅ Real-time blog data |

---

**Deploy now and check results!** 🚀
