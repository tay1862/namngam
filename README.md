# 🌸 NAMNGAM Gua Sha Blog

**ເວັບໄຊທ໌ສຳລັບແບຣນ NAMNGAM - ກັວຊາ ສຸຂະພາບແລະຄວາມງາມ**

Modern blog and product showcase website built with Next.js 15, featuring multi-language support and comprehensive admin panel for Lao Gua Sha brand.

---

## ✨ Features

### 🌐 Public Website
- **Hero Section** - Eye-catching landing with call-to-action
- **About Section** - Brand story and mission
- **Benefits Display** - 6 key benefits of Gua Sha
- **Product Showcase** - Featured Gua Sha products
- **Blog Section** - Educational content
- **FAQ Section** - Common questions and answers
- **Newsletter Signup** - Email collection
- **WhatsApp Integration** - Quick customer contact

### 🔐 Admin Panel
- **Dashboard** - Overview and statistics
- **Product Management** - Add/edit/delete products
- **Blog Editor** - Markdown-based content creation
- **FAQ Management** - Q&A administration
- **About & Benefits** - Content customization
- **Subscriber Management** - Newsletter list with CSV export
- **Site Settings** - Global configuration
- **Image Upload** - Optimized image handling

### 🌍 Multi-language Support
- 🇱🇦 Lao (ລາວ) - Primary
- 🇹🇭 Thai (ไทย)
- 🇬🇧 English
- 🇨🇳 Chinese (中文)

### 🔒 Security Features
- Rate limiting on APIs
- Input sanitization (XSS/SQL injection protection)
- Security headers (7+)
- Password hashing (bcrypt)
- CSRF protection
- Image upload validation

### ⚡ Performance
- Image optimization (Sharp)
- Next.js 15 with Turbopack
- Code splitting
- Compression enabled
- WebP conversion

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

```bash
# 1. Clone repository
git clone https://github.com/tay1862/namngam.git
cd guasha-blog

# 2. Install dependencies
npm install

# 3. Setup environment
cp .env.example .env
# Edit .env with your database credentials

# 4. Setup database
npx prisma generate
npx prisma db push

# 5. Seed sample data
npm run seed

# 6. Create admin user
npm run create-admin

# 7. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 📦 Production Deployment

### Using Deploy Script (Recommended):
```bash
# Make script executable
chmod +x scripts/deploy.sh

# Run deployment
./scripts/deploy.sh
```

### Manual Deployment:
See **[PRODUCTION_REPORT.md](./PRODUCTION_REPORT.md)** for detailed deployment guide.

---

## 📚 Documentation

- **[PRODUCTION_REPORT.md](./PRODUCTION_REPORT.md)** - Complete production deployment guide
- **[USER_GUIDE.md](./USER_GUIDE.md)** - Admin panel user manual
- **.env.example** - Environment variables template
- **.env.production** - Production environment template

---

## 🛠️ Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm start                # Start production server
npm run lint             # Run ESLint
npm run db:generate      # Generate Prisma Client
npm run db:push          # Push schema to database
npm run db:studio        # Open Prisma Studio (DB GUI)
npm run create-admin     # Create admin user
npm run seed             # Seed sample data
```

---

## 🏗️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Auth:** NextAuth.js v4
- **Images:** Sharp (optimization)
- **i18n:** next-intl

---

## 📂 Project Structure

```
guasha-blog/
├── app/                    # Next.js App Router
│   ├── admin/             # Admin Panel pages
│   ├── api/               # API routes
│   ├── blog/              # Blog pages
│   ├── products/          # Product pages
│   └── components/        # React components
├── prisma/
│   └── schema.prisma      # Database schema
├── public/
│   └── uploads/           # Uploaded images
├── scripts/
│   ├── deploy.sh          # Deployment script
│   └── backup.sh          # Backup script
├── messages/              # i18n translations
└── lib/                   # Utilities & helpers
```

---

## 🔧 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/namngam_db"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID="G-PXVSR5E5MJ"

# Base URL
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

Generate secret: `openssl rand -base64 48`

---

## 📊 Database Schema

11 Models:
- User (Admin)
- Product
- BlogPost
- FAQ
- AboutSection
- BenefitItem
- HeroSection
- SectionBackground
- SiteSettings
- Subscriber
- Auth tables (Account, Session, VerificationToken)

---

## 🎯 Admin Panel Routes

- `/admin/login` - Login page
- `/admin/dashboard` - Dashboard
- `/admin/products` - Product management
- `/admin/blog` - Blog management
- `/admin/faq` - FAQ management
- `/admin/about` - About section
- `/admin/benefits` - Benefits management
- `/admin/subscribers` - Subscriber list
- `/admin/settings` - Site settings

---

## 🔒 Security Best Practices

✅ **Implemented:**
- Rate limiting
- Input sanitization
- Security headers
- Password hashing
- CSRF protection

⚠️ **Before Production:**
- Change NEXTAUTH_SECRET
- Use strong passwords
- Setup SSL/HTTPS
- Configure firewall
- Setup automated backups

---

## 📞 Contact & Support

- **Website:** http://namngam.com (ยังไม่ได้ตั้งค่า)
- **Current IP:** http://167.86.84.139:3001
- **Email:** Namngambrand@gmail.com
- **Phone:** +856 20 55 485 622
- **Facebook:** [NAMNGAM Page](https://www.facebook.com/profile.php?id=61576657104465)

---

## 📄 License

© 2025 NAMNGAM. All rights reserved.

---

## 🙏 Credits

Built with ❤️ for NAMNGAM Gua Sha brand using modern web technologies.

**Status:** ✅ Production Ready  
**Version:** 1.0  
**Last Updated:** October 23, 2025
