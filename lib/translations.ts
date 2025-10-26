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
      title: 'ກັວຊາ',
      subtitle: 'ວິທີການນວດດັ້ງເດີມຂອງຈີນ...',
      cta: 'ເລີ່ມຕົ້ນຮຽນຮູ້',
    },
    about: {
      title: 'ກັວຊາຄືຫຍັງ?',
      description: 'ກັວຊາ ແມ່ນວິທີການນວດດັ້ງເດີມຂອງຈີນທີ່ໃຊ້ເຄື່ອງມືທີ່ມີຜິວເລຽບລຽນ ເຊັ່ນ: ເຂົ້າໜີ້ວ ຫຼື ເຄື່ອງມືກັວຊາ ເພື່ອກະຕຸ້ນຜິວໜັງ ແລະ ເນື້ອເຍື່ອທີ່ຢູ່ພາຍໃຕ້.',
    },
    benefits: {
      title: 'ປະໂຫຍດຂອງກັວຊາ',
    },
    faq: {
      title: 'ຄຳຖາມທີ່ມັກຖາມ',
    },
    footer: {
      contact: 'ຕິດຕໍ່ພວກເຮົາ',
      address: 'ທີ່ຢູ່',
      phone: 'ໂທລະສັບ',
      email: 'ອີເມວ',
      social: 'ສື່ສັງຄົມ',
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
      title: 'กัวซา',
      subtitle: 'วิธีการนวดดั้งเดิมของจีน...',
      cta: 'เริ่มต้นเรียนรู้',
    },
    about: {
      title: 'กัวซาคืออะไร?',
      description: 'กัวซา เป็นวิธีการนวดดั้งเดิมของจีนที่ใช้อุปกรณ์ที่มีผิวเรียบ เช่น ช้อนหรือเครื่องมือกัวซา เพื่อกระตุ้นผิวหนังและเนื้อเยื่อที่อยู่ใต้.',
    },
    benefits: {
      title: 'ประโยชน์ของกัวซา',
    },
    faq: {
      title: 'คำถามที่มักถาม',
    },
    footer: {
      contact: 'ติดต่อเรา',
      address: 'ที่อยู่',
      phone: 'โทรศัพท์',
      email: 'อีเมล',
      social: 'สื่อสังคม',
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
      title: 'Gua Sha',
      subtitle: 'Traditional Chinese massage technique...',
      cta: 'Start Learning',
    },
    about: {
      title: 'What is Gua Sha?',
      description: 'Gua Sha is a traditional Chinese massage technique that uses a smooth-edged tool like a spoon or Gua Sha tool to stimulate the skin and underlying tissues.',
    },
    benefits: {
      title: 'Benefits of Gua Sha',
    },
    faq: {
      title: 'Frequently Asked Questions',
    },
    footer: {
      contact: 'Contact Us',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      social: 'Social Media',
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
      title: '刮痧',
      subtitle: '中国传统按摩技术...',
      cta: '开始学习',
    },
    about: {
      title: '什么是刮痧?',
      description: '刮痧是一种传统的中国按摩技术，使用光滑边缘的工具如勺子或刮痧板来刺激皮肤和皮下组织.',
    },
    benefits: {
      title: '刮痧的好处',
    },
    faq: {
      title: '常见问题',
    },
    footer: {
      contact: '联系我们',
      address: '地址',
      phone: '电话',
      email: '电子邮件',
      social: '社交媒体',
    },
  },
};

export function useTranslations() {
  const { locale } = useLocale();
  
  type TranslationDict = {
    [key: string]: string | TranslationDict;
  };
  
  const getTranslation = (dict: TranslationDict, keys: string[]): string => {
    if (keys.length === 0) {
      return typeof dict === 'string' ? dict : JSON.stringify(dict);
    }
    
    const [firstKey, ...remainingKeys] = keys;
    const value = dict[firstKey];
    
    if (remainingKeys.length === 0) {
      return typeof value === 'string' ? value : firstKey;
    }
    
    if (typeof value === 'object' && value !== null) {
      return getTranslation(value as TranslationDict, remainingKeys);
    }
    
    return firstKey;
  };
  
  return {
    t: (key: string): string => {
      const keys = key.split('.');
      return getTranslation(translations[locale], keys);
    },
  };
}
