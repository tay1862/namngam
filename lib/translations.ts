// Translation system for multi-language support
import { useLocale } from '@/app/contexts/LocaleContext';

export const translations = {
  lo: {
    nav: {
      home: 'ໜ້າຫຼັກ',
      about: 'ກ່ຽວກັບ',
      products: 'ສິນຄ້າ',
      blog: 'ບົດຄວາມ',
      contact: 'ຕິດຕໍ່',
    },
    hero: {
      badge: 'ຄວາມງາມແລະສຸຂະພາບທຳມະຊາດ',
      title: 'ກັວຊາ',
      subtitle: 'ວິທີການນວດດັ້ງເດີມຂອງຈີນ ເພື່ອສຸຂະພາບແລະຄວາມງາມຂອງຜິວໜ້າທ່ານ',
      cta: 'ເລີ່ມຕົ້ນຮຽນຮູ້',
    },
    about: {
      title: 'ກັວຊາຄືຫຍັງ?',
      defaultDescription: 'ກັວຊາເປັນວິທີການນວດດັ້ງເດີມຂອງຈີນທີ່ມີມາເປັນເວລາຫຼາຍພັນປີ ໃຊ້ເຄື່ອງມືພິເສດຂູດຜິວໜ້າເບົາໆ ເພື່ອກະຕຸ້ນການໄຫຼວຽນຂອງເລືອດ ແລະຊ່ວຍໃຫ້ຜິວໜ້າແຂງແຮງຂຶ້ນ',
      features: {
        circulation: {
          title: 'ປັບປຸງການໄຫຼວຽນຂອງເລືອດ',
          description: 'ກະຕຸ້ນການໄຫຼວຽນຂອງເລືອດແລະລິມພາ ເຮັດໃຫ້ຜິວໜ້າສົດໃສ',
        },
        inflammation: {
          title: 'ຫຼຸດຜ່ອນການອັກເສບ',
          description: 'ຊ່ວຍຫຼຸດການບວມແລະອາການອັກເສບຂອງຜິວໜ້າ',
        },
        natural: {
          title: 'ທຳມະຊາດ 100%',
          description: 'ວິທີການດູແລຜິວໜ້າແບບທຳມະຊາດ ປອດໄພ ບໍ່ມີຜົນຂ້າງຄຽງ',
        },
      },
    },
    benefits: {
      title: 'ຜົນປະໂຫຍດຂອງກັວຊາ',
      subtitle: 'ຄົ້ນພົບການປ່ຽນແປງທີ່ກັວຊາຈະນຳມາໃຫ້ຜິວໜ້າຂອງທ່ານ',
    },
    faq: {
      title: 'ຄຳຖາມທີ່ພົບເລື້ອຍ',
      subtitle: 'ຄຳຕອບສຳລັບຄຳຖາມທົ່ວໄປກ່ຽວກັບກັວຊາ',
    },
    newsletter: {
      title: 'ຮັບຂໍ້ມູນຂ່າວສານ',
      subtitle: 'ສະໝັກຮັບຂ່າວສານແລະເຄັດລັບການດູແລຜິວໜ້າ',
      placeholder: 'ອີເມວຂອງທ່ານ',
      button: 'ສະໝັກ',
      success: 'ສະໝັກສຳເລັດ! ຂອບໃຈທີ່ສົນໃຈ',
      error: 'ເກີດຂໍ້ຜິດພາດ ກະລຸນາລອງໃໝ່',
      invalid: 'ກະລຸນາໃສ່ອີເມວທີ່ຖືກຕ້ອງ',
    },
    footer: {
      description: 'ຄູ່ມືການນວດກັວຊາແບບດັ້ງເດີມ ເພື່ອສຸຂະພາບແລະຄວາມງາມທາງດ້ານຜິວໜ້າ ດ້ວຍວິທີທຳມະຊາດທີ່ປອດໄພ',
      quickLinks: 'ລິ້ງດ່ວນ',
      contact: 'ຕິດຕໍ່',
      copyright: 'ສະຫງວນລິຂະສິດທັງໝົດ',
      madeWith: 'ສ້າງດ້ວຍ',
      inLaos: 'ໃນ ສປປ ລາວ',
    },
    blog: {
      title: 'ບົດຄວາມແລະຄູ່ມື',
      subtitle: 'ເລີ່ມຕົ້ນການເດີນທາງສູ່ຄວາມງາມແບບທຳມະຊາດກັບພວກເຮົາ',
      fullSubtitle: 'ຄຳແນະນຳ, ເຄັດລັບ, ແລະ ຄູ່ມືການນວດກັວຊາເພື່ອຄວາມງາມທີ່ຍືນຍົງ',
      readMore: 'ອ່ານຕໍ່',
      viewAll: 'ເບິ່ງບົດຄວາມທັງໝົດ',
      searchPlaceholder: 'ຄົ້ນຫາບົດຄວາມ...',
      allCategories: 'ທັງໝົດ',
      noResults: 'ບໍ່ພົບບົດຄວາມທີ່ຄົ້ນຫາ',
      tryDifferent: 'ລອງຄົ້ນຫາດ້ວຍຄຳອື່ນ ຫຼື ເລືອກໝວດໝູ່ອື່ນ',
      cta: 'ສົນໃຈເລີ່ມຕົ້ນນວດກັວຊາ?',
      ctaSubtitle: 'ຕິດຕໍ່ພວກເຮົາເພື່ອຂໍຄຳແນະນຳແລະສັ່ງຊື້ສິນຄ້າ',
      viewProducts: 'ເບິ່ງສິນຄ້າ',
    },
    products: {
      title: 'ສິນຄ້າແລະບລິການ',
      subtitle: 'ຄັດສະຫຼັດເຄື່ອງມືກັວຊາຄຸນະພາບສູງ ແລະຜະລິດຕະພັນດູແລຜິວໜ້າທຳມະຊາດ',
      noImage: 'ບໍ່ມີຮູບ',
      premium: 'Premium',
      price: 'ລາຄາ',
      priceInquiry: 'ສອບຖາມລາຄາ',
      chat: 'ສົນທະນາ',
      whyChooseUs: 'ເປັນຫຍັງຕ້ອງເລືອກ NAMNGAM?',
      quality: 'ຄຸນະພາບສູງ',
      qualityDesc: 'ຄັດເລືອກວັດຖຸດິບທຳມະຊາດແທ້ 100%',
      service: 'ບລິການດີເລີດ',
      serviceDesc: 'ໃຫ້ຄຳປຶກສາແລະຊ່ວຍເທາທຸກຂັ້ນຕອນ',
      guarantee: 'ຮັບປະກັນຄວາມພໍໃຈ',
      guaranteeDesc: 'ສາມາດປ່ຽນ-ຄືນສິນຄ້າໄດ້ພາຍໃນ 7 ວັນ',
      ready: 'ພ້ອມເລີ່ມຕົ້ນແລ້ວບໍ?',
      readySubtitle: 'ຕິດຕໍ່ພວກເຮົາເພື່ອຂໍຄຳແນະນຳແລະສັ່ງຊື້ສິນຄ້າ',
      chatWithUs: 'ສົນທະນາກັບພວກເຮົາ',
    },
    whatsapp: {
      tooltip: 'ສົນທະນາກັບພວກເຮົາ',
    },
    common: {
      loading: 'ກຳລັງໂຫຼດ...',
      error: 'ເກີດຂໍ້ຜິດພາດ',
      retry: 'ລອງໃໝ່',
      learnMore: 'ອ່ານເພີ່ມເຕີມ',
    },
  },
  th: {
    nav: {
      home: 'หน้าแรก',
      about: 'เกี่ยวกับ',
      products: 'สินค้า',
      blog: 'บทความ',
      contact: 'ติดต่อ',
    },
    hero: {
      badge: 'ความงามและสุขภาพตามธรรมชาติ',
      title: 'กัวช่า',
      subtitle: 'วิธีการนวดแบบดั้งเดิมจากจีน เพื่อสุขภาพและความงามของใบหน้าคุณ',
      cta: 'เริ่มเรียนรู้',
    },
    about: {
      title: 'กัวช่าคืออะไร?',
      defaultDescription: 'กัวช่าเป็นวิธีการนวดแบบดั้งเดิมของจีนที่มีมาหลายพันปี ใช้เครื่องมือพิเศษขูดใบหน้าเบาๆ เพื่อกระตุ้นการไหลเวียนของเลือด และช่วยให้ใบหน้าแข็งแรงขึ้น',
      features: {
        circulation: {
          title: 'ปรับปรุงการไหลเวียนของเลือด',
          description: 'กระตุ้นการไหลเวียนของเลือดและน้ำเหลือง ทำให้ใบหน้าสดใส',
        },
        inflammation: {
          title: 'ลดการอักเสบ',
          description: 'ช่วยลดอาการบวมและการอักเสบของใบหน้า',
        },
        natural: {
          title: 'ธรรมชาติ 100%',
          description: 'วิธีการดูแลใบหน้าแบบธรรมชาติ ปลอดภัย ไม่มีผลข้างเคียง',
        },
      },
    },
    benefits: {
      title: 'ประโยชน์ของกัวช่า',
      subtitle: 'ค้นพบการเปลี่ยนแปลงที่กัวช่าจะนำมาให้ใบหน้าของคุณ',
    },
    faq: {
      title: 'คำถามที่พบบ่อย',
      subtitle: 'คำตอบสำหรับคำถามทั่วไปเกี่ยวกับกัวช่า',
    },
    newsletter: {
      title: 'รับข้อมูลข่าวสาร',
      subtitle: 'สมัครรับข่าวสารและเคล็ดลับการดูแลใบหน้า',
      placeholder: 'อีเมลของคุณ',
      button: 'สมัคร',
      success: 'สมัครสำเร็จ! ขอบคุณที่สนใจ',
      error: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
      invalid: 'กรุณาใส่อีเมลที่ถูกต้อง',
    },
    footer: {
      description: 'คู่มือการนวดกัวช่าแบบดั้งเดิม เพื่อสุขภาพและความงามของใบหน้า ด้วยวิธีธรรมชาติที่ปลอดภัย',
      quickLinks: 'ลิงก์ด่วน',
      contact: 'ติดต่อ',
      copyright: 'สงวนลิขสิทธิ์',
      madeWith: 'สร้างด้วย',
      inLaos: 'ใน สปป. ลาว',
    },
    blog: {
      title: 'บทความและคู่มือ',
      subtitle: 'เริ่มต้นการเดินทางสู่ความงามแบบธรรมชาติกับเรา',
      fullSubtitle: 'คำแนะนำ เคล็ดลับ และคู่มือการนวดกัวช่าเพื่อความงามที่ยั่งยืน',
      readMore: 'อ่านต่อ',
      viewAll: 'ดูบทความทั้งหมด',
      searchPlaceholder: 'ค้นหาบทความ...',
      allCategories: 'ทั้งหมด',
      noResults: 'ไม่พบบทความที่ค้นหา',
      tryDifferent: 'ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่อื่น',
      cta: 'สนใจเริ่มต้นนวดกัวช่า?',
      ctaSubtitle: 'ติดต่อเราเพื่อขอคำแนะนำและสั่งซื้อสินค้า',
      viewProducts: 'ดูสินค้า',
    },
    products: {
      title: 'สินค้าและบริการ',
      subtitle: 'คัดสรรเครื่องมือกัวช่าคุณภาพสูง และผลิตภัณฑ์ดูแลใบหน้าธรรมชาติ',
      noImage: 'ไม่มีรูป',
      premium: 'Premium',
      price: 'ราคา',
      priceInquiry: 'สอบถามราคา',
      chat: 'สนทนา',
      whyChooseUs: 'ทำไมต้องเลือก NAMNGAM?',
      quality: 'คุณภาพสูง',
      qualityDesc: 'คัดเลือกวัตถุดิบธรรมชาติแท้ 100%',
      service: 'บริการดีเลิศ',
      serviceDesc: 'ให้คำปรึกษาและช่วยเหลือทุกขั้นตอน',
      guarantee: 'รับประกันความพอใจ',
      guaranteeDesc: 'สามารถเปลี่ยน-คืนสินค้าได้ภายใน 7 วัน',
      ready: 'พร้อมเริ่มต้นแล้วหรือยัง?',
      readySubtitle: 'ติดต่อเราเพื่อขอคำแนะนำและสั่งซื้อสินค้า',
      chatWithUs: 'สนทนากับเรา',
    },
    whatsapp: {
      tooltip: 'สนทนากับเรา',
    },
    common: {
      loading: 'กำลังโหลด...',
      error: 'เกิดข้อผิดพลาด',
      retry: 'ลองใหม่',
      learnMore: 'อ่านเพิ่มเติม',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      products: 'Products',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      badge: 'Natural Health & Beauty',
      title: 'Gua Sha',
      subtitle: 'Traditional Chinese massage technique for your skin health and beauty',
      cta: 'Learn More',
    },
    about: {
      title: 'What is Gua Sha?',
      defaultDescription: 'Gua Sha is a traditional Chinese massage technique that has been practiced for thousands of years. It uses special tools to gently scrape the skin to stimulate blood circulation and strengthen the facial skin.',
      features: {
        circulation: {
          title: 'Improve Blood Circulation',
          description: 'Stimulates blood and lymph circulation for a radiant complexion',
        },
        inflammation: {
          title: 'Reduce Inflammation',
          description: 'Helps reduce swelling and inflammation of the skin',
        },
        natural: {
          title: '100% Natural',
          description: 'Natural skincare method, safe with no side effects',
        },
      },
    },
    benefits: {
      title: 'Benefits of Gua Sha',
      subtitle: 'Discover the transformation Gua Sha brings to your skin',
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Answers to common questions about Gua Sha',
    },
    newsletter: {
      title: 'Get Updates',
      subtitle: 'Subscribe to receive news and skincare tips',
      placeholder: 'Your email',
      button: 'Subscribe',
      success: 'Subscribed successfully! Thank you for your interest',
      error: 'An error occurred. Please try again',
      invalid: 'Please enter a valid email',
    },
    footer: {
      description: 'Traditional Gua Sha massage guide for skin health and beauty using safe natural methods',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      copyright: 'All rights reserved',
      madeWith: 'Made with',
      inLaos: 'in Lao PDR',
    },
    blog: {
      title: 'Articles & Guides',
      subtitle: 'Begin your journey to natural beauty with us',
      fullSubtitle: 'Tips, tricks, and guides for Gua Sha massage for lasting beauty',
      readMore: 'Read More',
      viewAll: 'View All Articles',
      searchPlaceholder: 'Search articles...',
      allCategories: 'All',
      noResults: 'No articles found',
      tryDifferent: 'Try searching with different keywords or select another category',
      cta: 'Ready to start Gua Sha?',
      ctaSubtitle: 'Contact us for advice and to order products',
      viewProducts: 'View Products',
    },
    products: {
      title: 'Products & Services',
      subtitle: 'Curated high-quality Gua Sha tools and natural skincare products',
      noImage: 'No Image',
      premium: 'Premium',
      price: 'Price',
      priceInquiry: 'Inquire Price',
      chat: 'Chat',
      whyChooseUs: 'Why Choose NAMNGAM?',
      quality: 'High Quality',
      qualityDesc: '100% authentic natural ingredients',
      service: 'Excellent Service',
      serviceDesc: 'We provide consultation and assistance at every step',
      guarantee: 'Satisfaction Guarantee',
      guaranteeDesc: 'Exchange/return within 7 days',
      ready: 'Ready to get started?',
      readySubtitle: 'Contact us for advice and to order products',
      chatWithUs: 'Chat with us',
    },
    whatsapp: {
      tooltip: 'Chat with us',
    },
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      retry: 'Retry',
      learnMore: 'Learn More',
    },
  },
  zh: {
    nav: {
      home: '首页',
      about: '关于',
      products: '产品',
      blog: '博客',
      contact: '联系',
    },
    hero: {
      badge: '天然健康与美容',
      title: '刮痧',
      subtitle: '传统中医按摩技术 呵护您的肌肤健康与美丽',
      cta: '了解更多',
    },
    about: {
      title: '什么是刮痧？',
      defaultDescription: '刮痧是一种拥有数千年历史的传统中医按摩技术。使用特殊工具轻轻刮拭皮肤，以刺激血液循环，增强面部肌肤。',
      features: {
        circulation: {
          title: '改善血液循环',
          description: '刺激血液和淋巴循环，使肤色更加红润',
        },
        inflammation: {
          title: '减少炎症',
          description: '帮助减少皮肤肿胀和炎症',
        },
        natural: {
          title: '100%天然',
          description: '天然护肤方法，安全无副作用',
        },
      },
    },
    benefits: {
      title: '刮痧的好处',
      subtitle: '发现刮痧为您的肌肤带来的改变',
    },
    faq: {
      title: '常见问题',
      subtitle: '关于刮痧的常见问题解答',
    },
    newsletter: {
      title: '获取更新',
      subtitle: '订阅以接收新闻和护肤技巧',
      placeholder: '您的电子邮件',
      button: '订阅',
      success: '订阅成功！感谢您的关注',
      error: '发生错误，请重试',
      invalid: '请输入有效的电子邮件',
    },
    footer: {
      description: '传统刮痧按摩指南 使用安全的天然方法呵护肌肤健康与美丽',
      quickLinks: '快速链接',
      contact: '联系',
      copyright: '版权所有',
      madeWith: '制作于',
      inLaos: '老挝',
    },
    blog: {
      title: '文章与指南',
      subtitle: '与我们一起开始您的自然美丽之旅',
      fullSubtitle: '刮痧按摩的技巧、窍门和指南，助您拥有持久美丽',
      readMore: '阅读更多',
      viewAll: '查看所有文章',
      searchPlaceholder: '搜索文章...',
      allCategories: '全部',
      noResults: '未找到文章',
      tryDifferent: '尝试使用其他关键词搜索或选择其他类别',
      cta: '准备开始刮痧了吗？',
      ctaSubtitle: '联系我们获取建议和订购产品',
      viewProducts: '查看产品',
    },
    products: {
      title: '产品与服务',
      subtitle: '精选高品质刮痧工具和天然护肤产品',
      noImage: '无图片',
      premium: 'Premium',
      price: '价格',
      priceInquiry: '询价',
      chat: '聊天',
      whyChooseUs: '为什么选择 NAMNGAM？',
      quality: '高品质',
      qualityDesc: '100%正宗天然成分',
      service: '优质服务',
      serviceDesc: '每一步都提供咨询和帮助',
      guarantee: '满意保证',
      guaranteeDesc: '7天内可退换',
      ready: '准备开始了吗？',
      readySubtitle: '联系我们获取建议和订购产品',
      chatWithUs: '与我们聊天',
    },
    whatsapp: {
      tooltip: '与我们聊天',
    },
    common: {
      loading: '加载中...',
      error: '发生错误',
      retry: '重试',
      learnMore: '了解更多',
    },
  },
};

// Type-safe translation hook
export function useTranslations() {
  const { locale } = useLocale();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[locale as keyof typeof translations];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key} for locale: ${locale}`);
        return key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  return { t, locale };
}

// Helper function to get localized field from database objects
export function getLocalizedField<T>(
  obj: any,
  field: string,
  locale: string
): T {
  if (!obj) return '' as T;
  
  // Try locale-specific field first
  const localeField = `${field}${locale.charAt(0).toUpperCase() + locale.slice(1)}`;
  if (obj[localeField] && obj[localeField] !== '') {
    return obj[localeField];
  }
  
  // Fallback to English
  const enField = `${field}En`;
  if (obj[enField] && obj[enField] !== '') {
    return obj[enField];
  }
  
  // Fallback to default field (Lao)
  return obj[field] || ('' as T);
}

// Helper to localize product object
export function localizeProduct(product: any, locale: string) {
  if (!product) return null;
  
  return {
    ...product,
    displayName: getLocalizedField(product, 'name', locale),
    displayDescription: getLocalizedField(product, 'description', locale),
    displayFeatures: getLocalizedField(product, 'features', locale),
    displayBenefits: getLocalizedField(product, 'benefits', locale),
  };
}

// Helper to localize blog post
export function localizeBlogPost(post: any, locale: string) {
  if (!post) return null;
  
  return {
    ...post,
    displayTitle: getLocalizedField(post, 'title', locale),
    displayExcerpt: getLocalizedField(post, 'excerpt', locale),
    displayContent: getLocalizedField(post, 'content', locale),
  };
}

// Helper to localize FAQ
export function localizeFAQ(faq: any, locale: string) {
  if (!faq) return null;
  
  return {
    ...faq,
    displayQuestion: getLocalizedField(faq, 'question', locale),
    displayAnswer: getLocalizedField(faq, 'answer', locale),
  };
}

// Helper to localize About Section
export function localizeAboutSection(about: any, locale: string) {
  if (!about) return null;
  
  return {
    ...about,
    displayTitle: getLocalizedField(about, 'title', locale),
    displayDescription: getLocalizedField(about, 'description', locale),
  };
}

// Helper to localize Benefit Item
export function localizeBenefitItem(benefit: any, locale: string) {
  if (!benefit) return null;
  
  return {
    ...benefit,
    displayTitle: getLocalizedField(benefit, 'title', locale),
    displayDescription: getLocalizedField(benefit, 'description', locale),
  };
}

// Helper to localize Hero Section
export function localizeHeroSection(hero: any, locale: string) {
  if (!hero) return null;
  
  return {
    ...hero,
    displayTitle: getLocalizedField(hero, 'title', locale),
    displaySubtitle: getLocalizedField(hero, 'subtitle', locale),
    displayDescription: getLocalizedField(hero, 'description', locale),
    displayCtaText: getLocalizedField(hero, 'ctaText', locale),
  };
}
