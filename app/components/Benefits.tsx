'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Benefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const benefits = [
    {
      title: "ຫຼຸດຮອຍຊ້ຳ",
      description: "ຊ່ວຍຫຼຸດຮອຍຊ້ຳແລະຮອຍເຫນື່ອຍຢູ່ໃຕ້ຕາ",
      gradient: "from-pink-400 to-pink-600"
    },
    {
      title: "ຍົກກະຊັບໜ້າ",
      description: "ຊ່ວຍຍົກກະຊັບໜ້າໃຫ້ຕຶງຂຶ້ນຕາມທຳມະຊາດ",
      gradient: "from-rococo-400 to-rococo-600"
    },
    {
      title: "ຜິວໜ້າແວ່ວເງົາ",
      description: "ເພີ່ມການໄຫຼວຽນ ເຮັດໃຫ້ຜິວໜ້າແວ່ວເງົາສົດໃສ",
      gradient: "from-pink-500 to-rococo-500"
    },
    {
      title: "ຫຼຸດຄວາມຕຶງຄຽດ",
      description: "ຜ່ອນຄາຍກ້າມເນື້ອໜ້າ ຫຼຸດຄວາມເຄັ່ງຕຶງ",
      gradient: "from-rococo-500 to-pink-500"
    },
    {
      title: "ປັບໂຄງຫນ້າ",
      description: "ຊ່ວຍປັບໂຄງຫນ້າໃຫ້ກົມກວນຂຶ້ນ",
      gradient: "from-pink-400 to-rococo-400"
    },
    {
      title: "ຫຼຸດສິວແລະສິ່ງເສດ",
      description: "ຊ່ວຍຫຼຸດການເກີດສິວແລະສິ່ງເສດ",
      gradient: "from-rococo-400 to-pink-500"
    }
  ];

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Video Background - Full Cover */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 18%' }}
        >
          <source src="/video-background.mp4" type="video/mp4" />
        </video>
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-pink-5/5 to-white/5" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent">
            ຜົນປະໂຫຍດຂອງກັວຊາ
          </h2>
          <p className="text-lg text-rococo-700">
            ຄົ້ນພົບການປ່ຽນແປງທີ່ກັວຊາຈະນຳມາໃຫ້ຜິວໜ້າຂອງທ່ານ
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group cursor-pointer"
            >
              <div className="relative h-full bg-white rounded-2xl p-6 border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-2xl overflow-hidden">
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                
                <div className="relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-br ${benefit.gradient} rounded-xl mb-4 flex items-center justify-center`}>
                    <span className="text-2xl text-white">✨</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-rococo-900 mb-2">
                    {benefit.title}
                  </h3>
                  
                  <p className="text-rococo-700">
                    {benefit.description}
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
