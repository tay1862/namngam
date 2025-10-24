'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTranslations, localizeBenefitItem } from '@/lib/translations';
import { useFetch } from '@/lib/hooks/useFetch';

interface BenefitItem {
  id: string;
  title: string;
  titleTh?: string;
  titleEn?: string;
  titleZh?: string;
  description: string;
  descriptionTh?: string;
  descriptionEn?: string;
  descriptionZh?: string;
  icon?: string;
  image?: string;
  order: number;
}

export default function Benefits() {
  const { t, locale } = useTranslations();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: benefits, loading } = useFetch<BenefitItem[]>('/api/admin/benefits');

  // Fallback if no benefits in database
  const defaultBenefits: BenefitItem[] = [
    { id: '1', title: "ຫຼຸດຮອຍຊ້ຳ", titleTh: undefined, titleEn: undefined, titleZh: undefined, description: "ຊ່ວຍຫຼຸດຮອຍຊ້ຳແລະຮອຍເຫນື່ອຍຢູ່ໃຕ້ຕາ", descriptionTh: undefined, descriptionEn: undefined, descriptionZh: undefined, icon: "✨", image: undefined, order: 1 },
    { id: '2', title: "ຍົກກະຊັບໜ້າ", titleTh: undefined, titleEn: undefined, titleZh: undefined, description: "ຊ່ວຍຍົກກະຊັບໜ້າໃຫ້ຕຶງຂຶ້ນຕາມທຳມະຊາດ", descriptionTh: undefined, descriptionEn: undefined, descriptionZh: undefined, icon: "💆‍♀️", image: undefined, order: 2 },
    { id: '3', title: "ຜິວໜ້າແວ່ວເງົາ", titleTh: undefined, titleEn: undefined, titleZh: undefined, description: "ເພີ່ມການໄຫຼວຽນ ເຮັດໃຫ້ຜິວໜ້າແວ່ວເງົາສົດໃສ", descriptionTh: undefined, descriptionEn: undefined, descriptionZh: undefined, icon: "🌟", image: undefined, order: 3 },
    { id: '4', title: "ຫຼຸດຄວາມຕຶງຄຽດ", titleTh: undefined, titleEn: undefined, titleZh: undefined, description: "ຜ່ອນຄາຍກ້າມເນື້ອໜ້າ ຫຼຸດຄວາມເຄັ່ງຕຶງ", descriptionTh: undefined, descriptionEn: undefined, descriptionZh: undefined, icon: "😌", image: undefined, order: 4 },
    { id: '5', title: "ປັບໂຄງຫນ້າ", titleTh: undefined, titleEn: undefined, titleZh: undefined, description: "ຊ່ວຍປັບໂຄງຫນ້າໃຫ້ກົມກວນຂຶ້ນ", descriptionTh: undefined, descriptionEn: undefined, descriptionZh: undefined, icon: "💎", image: undefined, order: 5 },
    { id: '6', title: "ຫຼຸດສິວ", titleTh: undefined, titleEn: undefined, titleZh: undefined, description: "ຊ່ວຍຫຼຸດການເກີດສິວແລະສິ່ງເສດ", descriptionTh: undefined, descriptionEn: undefined, descriptionZh: undefined, icon: "🌸", image: undefined, order: 6 },
  ];

  // Localize benefits based on current language
  const localizedBenefits = benefits && benefits.length > 0 
    ? benefits.map(b => localizeBenefitItem(b, locale)) 
    : defaultBenefits;
  const displayBenefits = localizedBenefits;
  
  if (loading) {
    return (
      <section ref={ref} className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-white to-rococo-50" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mx-auto mb-16"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="h-48 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const gradients = [
    "from-pink-400 to-pink-600",
    "from-rococo-400 to-rococo-600",
    "from-pink-500 to-rococo-500",
    "from-rococo-500 to-pink-500",
    "from-pink-400 to-rococo-400",
    "from-rococo-400 to-pink-500"
  ];

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-pink-50 via-white to-rococo-50" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent">
            {t('benefits.title')}
          </h2>
          <p className="text-lg text-rococo-700">
            {t('benefits.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {displayBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative h-full bg-white rounded-2xl p-6 border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-2xl overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[index % gradients.length]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  {benefit.image ? (
                    <div className="w-12 h-12 relative rounded-xl mb-4 overflow-hidden">
                      <Image src={benefit.image} alt={benefit.title} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className={`w-12 h-12 bg-gradient-to-br ${gradients[index % gradients.length]} rounded-xl mb-4 flex items-center justify-center`}>
                      <span className="text-2xl">{benefit.icon || '✨'}</span>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-bold text-rococo-900 mb-2">
                    {benefit.displayTitle || benefit.title}
                  </h3>
                  
                  <p className="text-rococo-700 whitespace-pre-line">
                    {benefit.displayDescription || benefit.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
