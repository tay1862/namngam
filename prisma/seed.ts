import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Create Admin User (if not exists)
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@namngam.com' },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    await prisma.user.create({
      data: {
        email: 'admin@namngam.com',
        password: hashedPassword,
        name: 'Admin NAMNGAM',
        role: 'admin',
      },
    });
    console.log('✅ Admin user created');
  } else {
    console.log('ℹ️ Admin user already exists');
  }

  // 2. Seed About Section
  const aboutCount = await prisma.aboutSection.count();
  if (aboutCount === 0) {
    await prisma.aboutSection.create({
      data: {
        title: 'ກັວຊາຄືຫຍັງ?',
        titleEn: 'What is Gua Sha?',
        description: 'ກັວຊາເປັນວິທີການນວດດັ້ງເດີມຂອງຈີນທີ່ມີມາເປັນເວລາຫຼາຍພັນປີ ໃຊ້ເຄື່ອງມືພິເສດຂູດຜິວໜ້າເບົາໆ ເພື່ອກະຕຸ້ນການໄຫຼວຽນຂອງເລືອດ ແລະຊ່ວຍໃຫ້ຜິວໜ້າແຂງແຮງຂຶ້ນ ຫຼຸດຮອຍຊ້ຳ ຍົກກະຊັບໜ້າ ແລະເພີ່ມຄວາມສົດໃສໃຫ້ກັບຜິວໜ້າຂອງທ່ານ',
        backgroundType: 'image',
        backgroundImage: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1920&q=80',
        published: true,
        order: 0,
      },
    });
    console.log('✅ About section seeded');
  }

  // 3. Seed Benefits
  const benefitsCount = await prisma.benefitItem.count();
  if (benefitsCount === 0) {
    const benefits = [
      {
        title: 'ຫຼຸດຮອຍຊ້ຳ',
        titleEn: 'Reduce Fine Lines',
        description: 'ຊ່ວຍຫຼຸດຮອຍຊ້ຳແລະຮອຍເຫນື່ອຍຢູ່ໃຕ້ຕາ ເຮັດໃຫ້ຜິວໜ້າເບິ່ງອ່ອນເຍົາວຂຶ້ນ',
        icon: '✨',
        order: 1,
      },
      {
        title: 'ຍົກກະຊັບໜ້າ',
        titleEn: 'Face Lifting',
        description: 'ຊ່ວຍຍົກກະຊັບໜ້າໃຫ້ຕຶງຂຶ້ນຕາມທຳມະຊາດ ປັບໂຄງຫນ້າໃຫ້ຊັດເຈນ',
        icon: '💆‍♀️',
        order: 2,
      },
      {
        title: 'ຜິວໜ້າແວ່ວເງົາ',
        titleEn: 'Glowing Skin',
        description: 'ເພີ່ມການໄຫຼວຽນຂອງເລືອດ ເຮັດໃຫ້ຜິວໜ້າແວ່ວເງົາສົດໃສ',
        icon: '🌟',
        order: 3,
      },
      {
        title: 'ຫຼຸດຄວາມຕຶງຄຽດ',
        titleEn: 'Stress Relief',
        description: 'ຜ່ອນຄາຍກ້າມເນື້ອໜ້າ ຫຼຸດຄວາມເຄັ່ງຕຶງ ເຮັດໃຫ້ຮູ້ສຶກສະບາຍ',
        icon: '😌',
        order: 4,
      },
      {
        title: 'ປັບໂຄງຫນ້າ',
        titleEn: 'Face Contouring',
        description: 'ຊ່ວຍປັບໂຄງຫນ້າໃຫ້ກົມກວນຂຶ້ນ ຫຼຸດການບວມ',
        icon: '💎',
        order: 5,
      },
      {
        title: 'ຫຼຸດສິວ',
        titleEn: 'Reduce Acne',
        description: 'ຊ່ວຍຫຼຸດການເກີດສິວແລະສິ່ງເສດ ຜິວໜ້າແຂງແຮງຂຶ້ນ',
        icon: '🌸',
        order: 6,
      },
    ];

    for (const benefit of benefits) {
      await prisma.benefitItem.create({
        data: { ...benefit, published: true },
      });
    }
    console.log('✅ Benefits seeded');
  }

  // 4. Seed FAQ
  const faqCount = await prisma.fAQ.count();
  if (faqCount === 0) {
    const faqs = [
      {
        question: 'ກັວຊາເຫມາະກັບທຸກຄົນບໍ?',
        answer: 'ກັວຊາເຫມາະສົມກັບຄົນສ່ວນໃຫຍ່ ແຕ່ບໍ່ແນະນຳສຳລັບຜູ້ທີ່ມີບັນຫາກ່ຽວກັບເລືອດ, ຜິວໜັງອັກເສບຮ້າຍແຮງ, ຫຼືກຳລັງຖືພາ. ຄວນປຶກສາແພດກ່ອນໃຊ້.',
        category: 'ທົ່ວໄປ',
        order: 1,
      },
      {
        question: 'ຄວນໃຊ້ກັວຊາເທົ່າໃດຕໍ່ອາທິດ?',
        answer: 'ແນະນຳໃຊ້ 2-3 ຄັ້ງຕໍ່ອາທິດ ຄັ້ງລະ 5-10 ນາທີ. ຫ້າມໃຊ້ບໍ່ຄົວປະຕິດິນຕໍ່ກັນ ເພື່ອໃຫ້ຜິວໜ້າມີເວລາພັກຜ່ອນ.',
        category: 'ການໃຊ້ງານ',
        order: 2,
      },
      {
        question: 'ຕ້ອງໃຊ້ເຄື່ອງສຳອາງຫຼືນ້ຳມັນບໍ?',
        answer: 'ແນະນຳໃຫ້ໃຊ້ນ້ຳມັນໜ້າ ຫຼື serum ກ່ອນນວດກັວຊາ ເພື່ອໃຫ້ເຄື່ອງມືເລື່ອນໄດ້ງ່າຍແລະບໍ່ລະຄາຍເຄືອງຜິວ.',
        category: 'ການໃຊ້ງານ',
        order: 3,
      },
      {
        question: 'ເຫັນຜົນພາຍໃນເວລາໃດ?',
        answer: 'ຜົນທັນທີທັນໃດແມ່ນຜິວໜ້າສົດໃສຂຶ້ນ. ສຳລັບຜົນໄລຍະຍາວເຊັ່ນ: ຫຼຸດຮອຍຊ້ຳ ຍົກກະຊັບໜ້າ ອາດໃຊ້ເວລາ 4-8 ອາທິດ ທີ່ໃຊ້ຢ່າງສະໝ່ຳສະເໝີ.',
        category: 'ຜົນລັບ',
        order: 4,
      },
      {
        question: 'ເຄື່ອງມືກັວຊາເຮັດດ້ວຍວັດສະດຸຫຍັງດີສຸດ?',
        answer: 'ແນະນຳໃຫ້ໃຊ້ກັວຊາຫີນເຈດ (Jade) ຫຼື ກ້ອນເຂັ້ວ (Rose Quartz) ເພາະມີຄຸນສົມບັດເຢັນ ຊ່ວຍຜ່ອນຄາຍຜິວໜ້າ ແລະໃຊ້ງານໄດ້ດີ.',
        category: 'ຜະລິດຕະພັນ',
        order: 5,
      },
    ];

    for (const faq of faqs) {
      await prisma.fAQ.create({
        data: { ...faq, published: true },
      });
    }
    console.log('✅ FAQs seeded');
  }

  // 5. Seed Products
  const productsCount = await prisma.product.count();
  if (productsCount === 0) {
    const products = [
      {
        name: 'ກັວຊາຫີນເຈດສີຂຽວ',
        nameEn: 'Jade Gua Sha Stone',
        description: 'ກັວຊາຫີນເຈດແທ້ 100% ຊ່ວຍຜ່ອນຄາຍ ຫຼຸດການບວມ ແລະເພີ່ມການໄຫຼວຽນຂອງເລືອດ',
        price: '250,000 ກີບ',
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80',
        features: [
          'ຫີນເຈດແທ້ 100%',
          'ຂະໜາດເຫມາະມື',
          'ເຫມາະສຳລັບທຸກປະເພດຜິວ',
          'ມີຄຸນສົມບັດເຢັນ',
        ],
        benefits: [
          'ຫຼຸດຮອຍຊ້ຳ ຮອຍເຫນື່ອຍ',
          'ຍົກກະຊັບໜ້າ',
          'ຜິວໜ້າສົດໃສ',
          'ຜ່ອນຄາຍກ້າມເນື້ອ',
        ],
        category: 'ກັວຊາ',
        inStock: true,
        featured: true,
        order: 1,
      },
      {
        name: 'ກັວຊາກ້ອນເຂັ້ວ',
        nameEn: 'Rose Quartz Gua Sha',
        description: 'ກັວຊາກ້ອນເຂັ້ວສີບົວ ສຳລັບຜິວແພ້ງ່າຍ ຊ່ວຍສະງົບຜິວແລະເພີ່ມຄວາມຊຸ່ມຊື່ນ',
        price: '280,000 ກີບ',
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&q=80',
        features: [
          'ກ້ອນເຂັ້ວແທ້',
          'ເໝາະກັບຜິວແພ້ງ່າຍ',
          'ມີພະລັງງານບວກ',
          'ຄວາມຮ້ອນເຢັນພໍດີ',
        ],
        benefits: [
          'ສະງົບຜິວແພ້ງ່າຍ',
          'ເພີ່ມຄວາມຊຸ່ມຊື່ນ',
          'ຫຼຸດການອັກເສບ',
          'ຜິວໜ້າເບິ່ງສົດໃສ',
        ],
        category: 'ກັວຊາ',
        inStock: true,
        featured: true,
        order: 2,
      },
      {
        name: 'ກັວຊາຫີນອາເມທິສ',
        nameEn: 'Amethyst Gua Sha',
        description: 'ກັວຊາຫີນອາເມທິສສີມ່ວງ ຊ່ວຍດີທັອກຜິວໜ້າ ແລະຫຼຸດຄວາມເຄັ່ງຕຶງ',
        price: '320,000 ກີບ',
        image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&q=80',
        features: [
          'ຫີນອາເມທິສແທ້',
          'ສີມ່ວງສວຍງາມ',
          'ມີພະລັງງານສູງ',
          'ດີທັອກຜິວໜ້າ',
        ],
        benefits: [
          'ດີທັອກຜິວໜ້າ',
          'ຫຼຸດຄວາມເຄັ່ງຕຶງ',
          'ປັບສະມະດຸນຜິວ',
          'ເພີ່ມພະລັງງານບວກ',
        ],
        category: 'ກັວຊາ',
        inStock: true,
        featured: false,
        order: 3,
      },
      {
        name: 'ຊຸດກັວຊາ + Roller',
        nameEn: 'Gua Sha + Roller Set',
        description: 'ຊຸດສົມບູນກັວຊາ + Roller ຫີນເຈດ ສຳລັບການດູແລຜິວໜ້າແບບຄົບວົງຈອນ',
        price: '450,000 ກີບ',
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
        features: [
          'ກັວຊາຫີນເຈດ 1 ອັນ',
          'Roller ຫີນເຈດ 1 ອັນ',
          'ກ່ອງບັນຈຸພິເສດ',
          'ຄູ່ມືການໃຊ້ງານ',
        ],
        benefits: [
          'ດູແລຜິວໜ້າສົມບູນ',
          'ເພີ່ມປະສິດທິພາບ',
          'ປະຫຍັດຄ່າໃຊ້ຈ່າຍ',
          'ເໝາະເປັນຂອງຂວັນ',
        ],
        category: 'ກັວຊາ',
        inStock: true,
        featured: true,
        order: 4,
      },
      {
        name: 'ນ້ຳມັນສຳລັບກັວຊາ',
        nameEn: 'Gua Sha Facial Oil',
        description: 'ນ້ຳມັນບຳລຸງໜ້າພິເສດສຳລັບໃຊ້ກັບກັວຊາ ສ່ວນຜະສົມທຳມະຊາດ 100%',
        price: '180,000 ກີບ',
        image: 'https://images.unsplash.com/photo-1608181078253-ddfe75ba95e8?w=800&q=80',
        features: [
          'ສ່ວນຜະສົມທຳມະຊາດ',
          'ບໍ່ມີສານເຄມີ',
          'ດູດຊຶມງ່າຍ',
          'ກິ່ນຫອມສະບາຍ',
        ],
        benefits: [
          'ເພີ່ມຄວາມລື່ນໃຫ້ກັວຊາ',
          'ບຳລຸງຜິວເລິກ',
          'ເພີ່ມຄວາມຊຸ່ມຊື່ນ',
          'ຜິວໜ້າແຂງແຮງ',
        ],
        category: 'ອຸປະກອນ',
        inStock: true,
        featured: false,
        order: 5,
      },
    ];

    for (const product of products) {
      await prisma.product.create({ data: product });
    }
    console.log('✅ Products seeded');
  }

  // 6. Seed Blog Posts
  const blogCount = await prisma.blogPost.count();
  if (blogCount === 0) {
    const blogs = [
      {
        title: 'ວິທີນວດກັວຊາໃຫ້ຖືກຕ້ອງສຳລັບຜູ້ເລີ່ມຕົ້ນ',
        slug: 'how-to-gua-sha-for-beginners',
        excerpt: 'ຄູ່ມືການນວດກັວຊາສຳລັບຜູ້ເລີ່ມຕົ້ນ ຮຽນຮູ້ເທັກນິກພື້ນຖານແລະຂັ້ນຕອນທີ່ຖືກຕ້ອງ',
        content: `# ວິທີນວດກັວຊາໃຫ້ຖືກຕ້ອງ

## ກ່ອນເລີ່ມນວດ
1. ລ້າງໜ້າໃຫ້ສະອາດ
2. ທາ serum ຫຼືນ້ຳມັນໜ້າ
3. ກຽມກັວຊາໃຫ້ເຢັນ (ແຊ່ຕູ້ເຢັນ 5-10 ນາທີ)

## ຂັ້ນຕອນການນວດ

### 1. ບໍລິເວນຄໍ
ເລີ່ມຈາກກາງຄໍເລື່ອນຂຶ້ນຫາໃບໜ້າ ເຮັດ 3-5 ເທື່ອ

### 2. ກະພຸ້ມແກ້ມ
ຂູດຈາກດັງ ເລື່ອນຂຶ້ນໄປທີ່ຫູ ເຮັດຂ້າງລະ 5 ເທື່ອ

### 3. ຫນ້າຜາກ
ຂູດຈາກກາງຫນ້າຜາກເລື່ອນໄປຂ້າງ ເຮັດ 5 ເທື່ອ

## ຂໍ້ຄວນລະວັງ
- ຢ່າກົດແຮງເກີນໄປ
- ຂູດໄປທາງດຽວ
- ໃຊ້ເວລາ 5-10 ນາທີ

ຫຼັງນວດເສັດແລ້ວ ລ້າງໜ້າດ້ວຍນ້ຳເຢັນ ແລະທາຄຣີມບຳລຸງ`,
        image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=80',
        category: 'ຄູ່ມືການໃຊ້',
        published: true,
        featured: true,
        views: 0,
        readTime: '5 ນາທີ',
        publishedAt: new Date('2024-10-01'),
      },
      {
        title: '7 ຜົນປະໂຫຍດຂອງກັວຊາທີ່ທ່ານຄວນຮູ້',
        slug: '7-benefits-of-gua-sha',
        excerpt: 'ຄົ້ນພົບຜົນປະໂຫຍດທີ່ໜ້າປະຫຼາດໃຈຂອງກັວຊາ ຈາກການຫຼຸດຮອຍຊ້ຳໄປຈົນເຖິງການຜ່ອນຄາຍ',
        content: `# 7 ຜົນປະໂຫຍດຂອງກັວຊາ

## 1. ຫຼຸດຮອຍຊ້ຳແລະຮອຍເຫນື່ອຍ
ການນວດກັວຊາເປັນປະຈຳຊ່ວຍກະຕຸ້ນການຜະລິດຄອນລາເຈນ ເຮັດໃຫ້ຜິວໜ້າຕຶງແລະຫຼຸດຮອຍຊ້ຳ

## 2. ຍົກກະຊັບໜ້າ
ການນວດຕາມເສັ້ນກ້າມເນື້ອຊ່ວຍຍົກກະຊັບໜ້າໃຫ້ຕຶງຂຶ້ນຕາມທຳມະຊາດ

## 3. ເພີ່ມການໄຫຼວຽນຂອງເລືອດ
ກະຕຸ້ນການໄຫຼວຽນເລືອດ ເຮັດໃຫ້ຜິວໜ້າແວ່ວເງົາສົດໃສ

## 4. ຫຼຸດການບວມ
ກະຕຸ້ນລະບົບນ້ຳເຫຼືອງ ຊ່ວຍລະບາຍນ້ຳເສຍ ຫຼຸດການບວມ

## 5. ຜ່ອນຄາຍກ້າມເນື້ອໜ້າ
ຫຼຸດຄວາມຕຶງຂອງກ້າມເນື້ອ ຫຼຸດອາການປວດ

## 6. ດູດຊຶມຜະລິດຕະພັນດີຂຶ້ນ
ນວດກັບ serum ຊ່ວຍໃຫ້ດູດຊຶມເລິກຂຶ້ນ

## 7. ຜ່ອນຄາຍຈິດໃຈ
ການນວດເປັນປະຈຳຊ່ວຍຜ່ອນຄາຍ ຫຼຸດຄວາມເຄັ່ງຕຶງ`,
        image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=1200&q=80',
        category: 'ຄວາມຮູ້',
        published: true,
        featured: true,
        views: 0,
        readTime: '7 ນາທີ',
        publishedAt: new Date('2024-10-05'),
      },
      {
        title: 'ເລືອກກັວຊາໃຫ້ເໝາະກັບປະເພດຜິວຂອງທ່ານ',
        slug: 'choose-right-gua-sha-for-your-skin',
        excerpt: 'ຄູ່ມືການເລືອກກັວຊາທີ່ເໝາະສົມກັບປະເພດຜິວແລະຄວາມຕ້ອງການຂອງທ່ານ',
        content: `# ເລືອກກັວຊາໃຫ້ເໝາະກັບຜິວ

## ປະເພດຫີນແລະຄຸນສົມບັດ

### ຫີນເຈດ (Jade)
- ເໝາະກັບ: ທຸກປະເພດຜິວ
- ຄຸນສົມບັດ: ເຢັນ ຜ່ອນຄາຍ
- ດີສຳລັບ: ຫຼຸດການບວມ

### ກ້ອນເຂັ້ວ (Rose Quartz)
- ເໝາະກັບ: ຜິວແພ້ງ່າຍ
- ຄຸນສົມບັດ: ສະງົບຜິວ
- ດີສຳລັບ: ຜິວອັກເສບ

### ອາເມທິສ (Amethyst)
- ເໝາະກັບ: ຜິວມັນ
- ຄຸນສົມບັດ: ດີທັອກ
- ດີສຳລັບ: ສິວ ຮູຂຸມຂົນ

### ຫີນ Bian
- ເໝາະກັບ: ຜິວເລີ່ມແກ່
- ຄຸນສົມບັດ: ກະຕຸ້ນເລືອດ
- ດີສຳລັບ: ຫຼຸດຮອຍຊ້ຳ

## ວິທີເລືອກ
1. ພິຈາລະນາປະເພດຜິວ
2. ກຳນົດເປົ້າໝາຍ
3. ເລືອກຂະໜາດທີ່ເໝາະ
4. ກວດຄຸນນະພາບ`,
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=1200&q=80',
        category: 'ຄູ່ມືເລືອກຊື້',
        published: true,
        featured: false,
        views: 0,
        readTime: '6 ນາທີ',
        publishedAt: new Date('2024-10-10'),
      },
    ];

    for (const blog of blogs) {
      await prisma.blogPost.create({ data: blog });
    }
    console.log('✅ Blog posts seeded');
  }

  // 7. Seed Site Settings
  const settingsCount = await prisma.siteSettings.count();
  if (settingsCount === 0) {
    await prisma.siteSettings.create({
      data: {
        siteName: 'NAMNGAM',
        siteNameLao: 'ນຳງາມ',
        siteDescription: 'ກັວຊາ ສຸຂະພາບແລະຄວາມງາມ',
        email: 'Namngambrand@gmail.com',
        phone: '+856 20 55 485 622',
        whatsapp: '+856 20 55 485 622',
        facebook: 'https://www.facebook.com/profile.php?id=61576657104465',
        seoTitle: 'NAMNGAM - ກັວຊາ ສຸຂະພາບແລະຄວາມງາມ',
        seoDescription: 'ກັວຊາຄຸນນະພາບສູງ ດູແລຜິວໜ້າດ້ວຍວິທີທຳມະຊາດ ຫຼຸດຮອຍຊ້ຳ ຍົກກະຊັບໜ້າ ຜິວໜ້າສົດໃສ',
        seoKeywords: ['ກັວຊາ', 'Gua Sha', 'ນຳງາມ', 'NAMNGAM', 'ດູແລຜິວໜ້າ', 'ຫຼຸດຮອຍຊ້ຳ'],
      },
    });
    console.log('✅ Site settings seeded');
  }

  console.log('🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
