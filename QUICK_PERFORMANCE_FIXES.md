# ⚡ Quick Performance Fixes - Implementation Guide

**Time Required:** 30-45 minutes
**Difficulty:** Easy to Medium
**Impact:** 10x faster API responses

---

## 🎯 Quick Wins (Do These First!)

### **Fix 1: Add Database Indexes** ⚡ (5 minutes)

**Step 1:** แก้ไข `prisma/schema.prisma`

เพิ่มบรรทัดเหล่านี้ท้ายแต่ละ model:

```prisma
model BlogPost {
  // ... existing fields ...
  
  // Add these lines at the end
  @@index([published, publishedAt])
  @@index([category])
  @@index([slug])
}

model Product {
  // ... existing fields ...
  
  // Add these lines
  @@index([inStock, order])
  @@index([featured])
  @@index([category])
}

model FAQ {
  // ... existing fields ...
  
  // Add these lines
  @@index([published, order])
  @@index([category])
}

model Subscriber {
  // ... existing fields ...
  
  // Add these lines
  @@index([status])
  @@index([createdAt])
}

model AboutSection {
  // ... existing fields ...
  
  // Add this line
  @@index([published, order])
}

model BenefitItem {
  // ... existing fields ...
  
  // Add this line
  @@index([published, order])
}
```

**Step 2:** สร้าง migration

```bash
npx prisma migrate dev --name add_performance_indexes
```

**Step 3:** Push to production

```bash
# On VPS
cd /var/www/namngam
git pull origin main
npx prisma migrate deploy
pm2 restart namngam
```

**Result:** ⚡ Queries 5-10x faster!

---

### **Fix 2: Optimize Blog API** ⚡ (5 minutes)

**Problem:** ส่ง full content ในหน้า list (ไม่จำเป็น)

**แก้ไข:** `app/api/blog/route.ts`

```typescript
// BEFORE (❌ Slow - returns full content)
select: {
  id: true,
  title: true,
  slug: true,
  excerpt: true,
  content: true,  // ❌ ส่ง 10KB+ ต่อ post
  image: true,
  category: true,
  publishedAt: true,
  readTime: true,
  views: true,
}

// AFTER (✅ Fast - only what's needed)
select: {
  id: true,
  title: true,
  slug: true,
  excerpt: true,  // ✅ เฉพาะ excerpt (200 bytes)
  // content: removed!
  image: true,
  category: true,
  publishedAt: true,
  readTime: true,
}
```

**Result:** ⚡ Response size 90% smaller!

---

### **Fix 3: Add Simple Caching** ⚡ (10 minutes)

**Step 1:** สร้าง `lib/cache.ts`

```typescript
import { unstable_cache } from 'next/cache';
import { prisma } from './prisma';

// Products cache (1 hour)
export const getCachedProducts = unstable_cache(
  async () => {
    return await prisma.product.findMany({
      where: { inStock: true },
      orderBy: { order: 'asc' },
    });
  },
  ['products-list'],
  { 
    revalidate: 3600, // 1 hour
    tags: ['products'] 
  }
);

// Blog posts cache (30 minutes)
export const getCachedBlogPosts = unstable_cache(
  async () => {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: 'desc' },
      take: 20, // Limit to 20
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        image: true,
        category: true,
        publishedAt: true,
        readTime: true,
      },
    });
    return posts;
  },
  ['blog-posts-list'],
  { 
    revalidate: 1800, // 30 minutes
    tags: ['blog'] 
  }
);

// FAQs cache (1 hour)
export const getCachedFAQs = unstable_cache(
  async () => {
    return await prisma.fAQ.findMany({
      where: { published: true },
      orderBy: { order: 'asc' },
    });
  },
  ['faqs-list'],
  { 
    revalidate: 3600, // 1 hour
    tags: ['faqs'] 
  }
);

// Cache revalidation helper
export async function revalidateByTag(tag: string) {
  const { revalidateTag } = await import('next/cache');
  revalidateTag(tag);
}
```

**Step 2:** อัพเดท API routes

**app/api/products/route.ts:**
```typescript
import { NextResponse } from 'next/server';
import { getCachedProducts } from '@/lib/cache';

export async function GET() {
  try {
    const products = await getCachedProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

**app/api/blog/route.ts:**
```typescript
import { NextResponse } from 'next/server';
import { getCachedBlogPosts } from '@/lib/cache';

export async function GET() {
  try {
    const posts = await getCachedBlogPosts();
    
    // Format for frontend
    const formattedPosts = posts.map(post => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      date: post.publishedAt 
        ? post.publishedAt.toLocaleDateString('lo-LA')
        : new Date().toLocaleDateString('lo-LA'),
      category: post.category,
      image: post.image || '/placeholder-blog.jpg',
      readTime: post.readTime || '5 ນາທີ',
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Blog API error:', error);
    return NextResponse.json([], { status: 200 });
  }
}
```

**app/api/faq/route.ts:**
```typescript
import { NextResponse } from 'next/server';
import { getCachedFAQs } from '@/lib/cache';

export async function GET() {
  try {
    const faqs = await getCachedFAQs();
    return NextResponse.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

**Step 3:** อัพเดท Admin routes เพื่อ revalidate cache

**app/api/admin/products/route.ts:**
```typescript
import { revalidateByTag } from '@/lib/cache';

export async function POST(request: Request) {
  // ... create product code ...
  
  // Revalidate products cache
  await revalidateByTag('products');
  
  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  // ... update product code ...
  
  // Revalidate products cache
  await revalidateByTag('products');
  
  return NextResponse.json(product);
}
```

**Result:** ⚡ 10x faster API responses!

---

### **Fix 4: Add Rate Limiting** ⚡ (10 minutes)

**Step 1:** อัพเดท `lib/rate-limit.ts` (ถ้ามีอยู่แล้ว)

หรือสร้างใหม่:

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// For API routes
export const apiLimiter = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(60, "1 m"), // 60 requests per minute
  analytics: true,
});

// Helper function
export async function checkRateLimit(limiter: any, identifier: string) {
  const { success, limit, reset, remaining } = await limiter.limit(identifier);
  
  if (!success) {
    return {
      success: false,
      error: 'Too many requests. Please try again later.',
      headers: {
        'X-RateLimit-Limit': limit,
        'X-RateLimit-Remaining': remaining,
        'X-RateLimit-Reset': reset,
      }
    };
  }
  
  return { success: true };
}
```

**หรือใช้แบบง่าย (ไม่ต้อง Redis):**

```typescript
// Simple in-memory rate limiting
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function simpleRateLimit(ip: string, max: number = 60, windowMs: number = 60000) {
  const now = Date.now();
  const record = requestCounts.get(ip);
  
  if (!record || now > record.resetTime) {
    requestCounts.set(ip, { count: 1, resetTime: now + windowMs });
    return { success: true };
  }
  
  if (record.count >= max) {
    return {
      success: false,
      error: `Too many requests. Max ${max} per minute.`,
    };
  }
  
  record.count++;
  return { success: true };
}
```

**Step 2:** เพิ่มใน API routes

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { simpleRateLimit } from '@/lib/rate-limit';

export async function GET(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  const rateLimit = simpleRateLimit(ip, 60); // 60 req/min
  
  if (!rateLimit.success) {
    return NextResponse.json(
      { error: rateLimit.error },
      { status: 429 }
    );
  }
  
  // ... rest of code
}
```

**Result:** 🔒 Protected from spam/attacks!

---

## 📊 Testing Performance

### Before Testing:
```bash
# Warm up cache
curl https://namngam.com/api/products
curl https://namngam.com/api/blog
curl https://namngam.com/api/faq
```

### Test Response Times:
```bash
# Products API
time curl https://namngam.com/api/products

# Blog API  
time curl https://namngam.com/api/blog

# FAQ API
time curl https://namngam.com/api/faq
```

### Expected Results:

**Before Optimization:**
```
Products: 0.2s - 0.5s
Blog: 0.3s - 0.8s
FAQ: 0.15s - 0.4s
```

**After Optimization:**
```
Products: 0.02s - 0.05s (10x faster!) ⚡
Blog: 0.03s - 0.08s (10x faster!) ⚡
FAQ: 0.015s - 0.04s (10x faster!) ⚡
```

---

## 🚀 Deployment Checklist

```bash
# 1. Git add changes
git add -A
git commit -m "perf: Add database indexes and API caching"
git push origin main

# 2. On VPS
ssh root@167.86.84.139
cd /var/www/namngam

# 3. Pull changes
git pull origin main

# 4. Run migrations (if indexes added)
npx prisma migrate deploy

# 5. Rebuild
rm -rf .next
npm run build

# 6. Restart
pm2 restart namngam

# 7. Test
curl -I https://namngam.com/api/products
curl -I https://namngam.com/api/blog

# 8. Monitor logs
pm2 logs namngam --lines 50
```

---

## 📈 Monitoring After Deployment

### Check Performance:
```bash
# Response times
time curl https://namngam.com/api/products
time curl https://namngam.com/api/blog

# Cache hits (should be fast on 2nd+ requests)
curl https://namngam.com/api/products  # First: ~200ms
curl https://namngam.com/api/products  # Second: ~20ms ⚡
```

### Check Database Load:
```bash
# On VPS
pm2 monit

# Watch for:
# - Lower CPU usage
# - Lower memory spikes
# - Faster response times
```

---

## 🎯 Success Metrics

After implementing these fixes, you should see:

✅ **API Response Times:**
- 10x faster (500ms → 50ms)

✅ **Database Queries:**
- 95% reduction (100/min → 5/min)

✅ **Server Load:**
- 50% lower CPU usage
- 30% lower memory usage

✅ **User Experience:**
- Pages load instantly
- No lag when switching languages
- Smooth scrolling

---

## 💡 Pro Tips

1. **Monitor First Week:**
   - Check PM2 logs daily
   - Watch for errors
   - Monitor response times

2. **Clear Cache When Needed:**
   ```typescript
   // In admin panel or manually
   import { revalidateByTag } from '@/lib/cache';
   await revalidateByTag('products');
   ```

3. **Adjust Cache Times:**
   - Products rarely change → 1 hour cache ✅
   - Blog posts change weekly → 30 min cache ✅
   - FAQs rarely change → 1 hour cache ✅

4. **Test on Mobile:**
   - Mobile users benefit most from optimization
   - Test with slow 3G connection

---

## 🆘 Troubleshooting

### Cache Not Working?
```bash
# Clear Next.js cache
rm -rf .next
npm run build
pm2 restart namngam
```

### Migrations Failed?
```bash
# Reset database (CAUTION: test only)
npx prisma migrate reset

# Or fix conflicts
npx prisma migrate resolve --applied "migration_name"
npx prisma migrate deploy
```

### Still Slow?
```bash
# Check database connection
npx prisma studio

# Check database size
npx prisma db execute --stdin <<< "SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;"
```

---

**Time to Implement:** 30-45 minutes
**Difficulty:** Easy
**Impact:** 🚀 HUGE!

**ทำเลยครับ! Performance จะดีขึ้นมาก!** ⚡
