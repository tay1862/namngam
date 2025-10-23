'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-rococo-100 to-pink-50 opacity-70" />
      
      {/* Logo Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 50, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="relative w-[600px] h-[600px]"
        >
          <Image
            src="/Logo-namngam-white.png"
            alt="NAMNGAM Background"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* Additional Logo Watermarks - Corners */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute top-20 right-20 w-64 h-64 pointer-events-none"
      >
        <Image
          src="/Logo-namngam-white.png"
          alt="Decorative"
          fill
          className="object-contain rotate-12"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute bottom-20 left-20 w-64 h-64 pointer-events-none"
      >
        <Image
          src="/Logo-namngam-white.png"
          alt="Decorative"
          fill
          className="object-contain -rotate-12"
        />
      </motion.div>
      
      {/* Floating elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl opacity-30"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-40 h-40 bg-rococo-300 rounded-full blur-3xl opacity-30"
        animate={{
          y: [0, 20, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 backdrop-blur-sm mb-8">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span className="text-sm text-pink-600 font-medium">ຄວາມງາມແລະສຸຂະພາບທຳມະຊາດ</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent"
        >
          ກັວຊາ
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-rococo-800 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          ວິທີການນວດດັ້ງເດີມຂອງຈີນ ເພື່ອສຸຂະພາບແລະຄວາມງາມຂອງຜິວໜ້າທ່ານ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex justify-center"
        >
          <button 
            onClick={() => {
              const aboutSection = document.querySelector('#about-section');
              aboutSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-medium text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10">ເລີ່ມຕົ້ນຮຽນຮູ້</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <div className="w-6 h-10 border-2 border-pink-400 rounded-full flex items-start justify-center p-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-pink-500 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
