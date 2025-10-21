'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Sparkles, Leaf } from 'lucide-react';
import Image from 'next/image';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: Heart,
      title: "ປັບປຸງການໄຫຼວຽນຂອງເລືອດ",
      description: "ກະຕຸ້ນການໄຫຼວຽນຂອງເລືອດແລະລິມພາ ເຮັດໃຫ້ຜິວໜ້າສົດໃສ"
    },
    {
      icon: Sparkles,
      title: "ຫຼຸດຜ່ອນການອັກເສບ",
      description: "ຊ່ວຍຫຼຸດການບວມແລະອາການອັກເສບຂອງຜິວໜ້າ"
    },
    {
      icon: Leaf,
      title: "ທຳມະຊາດ 100%",
      description: "ວິທີການດູແລຜິວໜ້າແບບທຳມະຊາດ ປອດໄພ ບໍ່ມີຜົນຂ້າງຄຽງ"
    }
  ];

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Background Image - Full Cover */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/backgroud-about.jpeg"
          alt="Gua Sha Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-rococo-5/5 via-white/5 to-white/5" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent">
            ກັວຊາຄືຫຍັງ?
          </h2>
          <p className="text-lg text-rococo-700 max-w-3xl mx-auto">
            ກັວຊາເປັນວິທີການນວດດັ້ງເດີມຂອງຈີນທີ່ມີມາເປັນເວລາຫຼາຍພັນປີ ໃຊ້ເຄື່ອງມືພິເສດຂູດຜິວໜ້າເບົາໆ 
            ເພື່ອກະຕຸ້ນການໄຫຼວຽນຂອງເລືອດ ແລະຊ່ວຍໃຫ້ຜິວໜ້າແຂງແຮງຂຶ້ນ
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rococo-200 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-3xl border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-xl">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-rococo-900 mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-rococo-700 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
