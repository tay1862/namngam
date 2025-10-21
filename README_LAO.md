# ກັວຊາ - ເວັບບລັອກສຸຂະພາບແລະຄວາມງາມ

ເວັບໄຊທ์ Landing Page ທີ່ສວຍງາມສຳລັບການແນະນຳກັວຊາ (Gua Sha) ດ້ວຍ Next.js 14, Tailwind CSS, ແລະ Framer Motion

## ✨ ຄຸນສົມບັດ

- 🎨 **ການອອກແບບທີ່ສວຍງາມ**: ໃຊ້ສີຊົມພູແລະໂຣໂກໂກ້ທີ່ສະຫງ່າງາມ
- 🌐 **ພາສາລາວ**: ເນື້ອຫາທັງໝົດເປັນພາສາລາວພ້ອມຟອນທ໌ Noto Sans Lao
- ⚡ **ການເຄື່ອນໄຫວທີ່ລຽບງ່າຍ**: ໃຊ້ Framer Motion ສຳລັບ animations ທີ່ເລີນດາງ
- 📱 **Responsive**: ປັບຕົວກັບທຸກຂະໜາດໜ້າຈໍ
- 🚀 **ປະສິດທິພາບສູງ**: ສ້າງດ້ວຍ Next.js 14 ແລະ Turbopack
- 📝 **ພ້ອມສຳລັບບລັອກ**: ໂຄງສ້າງສຳລັບບົດຄວາມແລະເນື້ອຫາ

## 🏗️ ເຕັກໂນໂລຊີທີ່ໃຊ້

- **Next.js 14** - React Framework ທີ່ທັນສະໄໝ
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library ທີ່ມີປະສິດທິພາບ
- **TypeScript** - Type-safe JavaScript
- **Lucide React** - Beautiful icons
- **Sanity CMS** - ພ້ອມສຳລັບການຈັດການເນື້ອຫາ (ຕ້ອງການ Node.js >= 20)

## 🚀 ການຕິດຕັ້ງ

### 1. Clone ໂປຣເຈັກ

\`\`\`bash
cd guasha-blog
\`\`\`

### 2. ຕິດຕັ້ງ Dependencies

\`\`\`bash
npm install
\`\`\`

### 3. ເປີດ Development Server

\`\`\`bash
npm run dev
\`\`\`

ເປີດ [http://localhost:3000](http://localhost:3000) ເພື່ອເບິ່ງເວັບໄຊທ໌

## 📁 ໂຄງສ້າງໂປຣເຈັກ

\`\`\`
guasha-blog/
├── app/
│   ├── components/          # React Components
│   │   ├── Navigation.tsx   # ແຖບນຳທາງ
│   │   ├── Hero.tsx        # Hero Section
│   │   ├── About.tsx       # ສ່ວນແນະນຳກັວຊາ
│   │   ├── Benefits.tsx    # ຜົນປະໂຫຍດ
│   │   ├── BlogPreview.tsx # ຕົວຢ່າງບລັອກ
│   │   ├── FAQ.tsx         # ຄຳຖາມທີ່ພົບເລື້ອຍ
│   │   ├── Newsletter.tsx  # ຟອມສະໝັກຮັບຂ່າວສານ
│   │   └── Footer.tsx      # Footer
│   ├── page.tsx            # ໜ້າຫຼັກ
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── public/                 # Static files
├── tailwind.config.ts      # Tailwind configuration
├── next.config.ts          # Next.js configuration
└── package.json
\`\`\`

## 🎨 ການປັບແຕ່ງສີ

ສີຖືກກຳນົດໃນ \`tailwind.config.ts\`:

\`\`\`typescript
colors: {
  pink: {
    // ສີຊົມພູ
    500: '#ec4899',
    600: '#db2777',
    // ...
  },
  rococo: {
    // ສີໂຣໂກໂກ້ (ຄີມ/ເບສ)
    500: '#c7b299',
    600: '#b09478',
    // ...
  }
}
\`\`\`

## 📝 ການເພີ່ມບົດຄວາມໃໝ່

ປັດຈຸບັນບົດຄວາມຖືກກຳນົດແບບ hardcode ໃນ \`app/components/BlogPreview.tsx\`

ສຳລັບການຈັດການເນື້ອຫາແບບ CMS, ທ່ານສາມາດ:
1. **ອັບເກຣດ Node.js ເປັນເວີຊັນ 20+** ແລ້ວຕິດຕັ້ງ Sanity CMS
2. ໃຊ້ **MDX** ສຳລັບ static content
3. ໃຊ້ບໍລິການ CMS ອື່ນໆເຊັ່ນ Contentful ຫຼື Strapi

## 🛠️ Scripts ທີ່ມີໃຫ້ໃຊ້

\`\`\`bash
npm run dev          # ເປີດ development server
npm run build        # Build ສຳລັບ production
npm start            # ເປີດ production server
npm run lint         # ກວດສອບ linting errors
\`\`\`

## 📦 Build ສຳລັບ Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🌟 ຄຸນສົມບັດທີ່ໂດດເດັ່ນ

### Hero Section
- Gradient backgrounds ທີ່ງາມ
- Floating animations
- Call-to-action buttons ທີ່ມີ hover effects

### About Section
- Icon-based feature cards
- Hover animations
- Responsive grid layout

### Benefits Section
- 6 benefit cards ພ້ອມ gradient backgrounds
- Scale animations on hover
- Beautiful color transitions

### Blog Preview
- Card-based layout
- Image optimization
- Category badges
- Reading time indicators

### FAQ Section
- Accordion-style expandable items
- Smooth open/close animations
- Beautiful icons

### Newsletter
- Email subscription form
- Decorative gradient backgrounds
- Form validation ready

## 🎯 ການ Deploy

### Vercel (ແນະນຳ)

\`\`\`bash
npm install -g vercel
vercel
\`\`\`

### Netlify

1. ເຊື່ອມຕໍ່ GitHub repository
2. ຕັ້ງຄ່າ build command: \`npm run build\`
3. ຕັ້ງຄ່າ publish directory: \`.next\`

## 🔧 Sanity CMS Setup (ຕົວເລືອກ)

**ຫມາຍເຫດ**: ຕ້ອງການ Node.js >= 20.19

\`\`\`bash
# ອັບເກຣດ Node.js ກ່ອນ
nvm install 20
nvm use 20

# ຕິດຕັ້ງ Sanity
npx sanity@latest init --project-plan free --output-path sanity
\`\`\`

## 📄 License

MIT License - ໃຊ້ຟຣີສຳລັບໂປຣເຈັກສ່ວນຕົວແລະທຸລະກິດ

## 🤝 ການສະໜັບສະໜູນ

ສຳລັບຄຳຖາມຫຼືການຊ່ວຍເຫຼືອ:
- Email: info@guasha.la
- ເປີດ issue ໃນ GitHub

---

**ສ້າງດ້ວຍ ❤️ ໃນ ສປປ ລາວ**
