'use client';

import { motion } from 'framer-motion';
import { Heart, Mail, Facebook, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-rococo-50 to-rococo-100 pt-16 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/Logo-namngam-gold.png"
                alt="NAMNGAM Logo"
                width={40}
                height={40}
                className="object-contain"
              />
              <h3 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent">
                NAMNGAM
              </h3>
            </div>
            <p className="text-rococo-700 mb-6 leading-relaxed">
              ຄູ່ມືການນວດກັວຊາແບບດັ້ງເດີມ ເພື່ອສຸຂະພາບແລະຄວາມງາມທາງດ້ານຜິວໜ້າ 
              ດ້ວຍວິທີທຳມະຊາດທີ່ປອດໄພ
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61576657104465"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors"
              >
                <Facebook size={20} />
              </motion.a>
              <motion.a
                href="https://wa.me/8562055485622"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600 transition-colors"
                title="WhatsApp: +856 20 55 485 622"
              >
                <Phone size={20} />
              </motion.a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold text-rococo-900 mb-4">ລິ້ງດ່ວນ</h4>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="text-rococo-700 hover:text-pink-600 transition-colors">
                  ກ່ຽວກັບ
                </a>
              </li>
              <li>
                <a href="#benefits" className="text-rococo-700 hover:text-pink-600 transition-colors">
                  ຜົນປະໂຫຍດ
                </a>
              </li>
              <li>
                <a href="#blog" className="text-rococo-700 hover:text-pink-600 transition-colors">
                  ບົດຄວາມ
                </a>
              </li>
              <li>
                <a href="#faq" className="text-rococo-700 hover:text-pink-600 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-rococo-900 mb-4">ຕິດຕໍ່</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-rococo-700">
                <Mail size={16} />
                <a href="mailto:Namngambrand@gmail.com" className="hover:text-pink-600 transition-colors">
                  Namngambrand@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-rococo-700">
                <Phone size={16} />
                <a href="https://wa.me/8562055485622" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors">
                  +856 20 55 485 622
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-rococo-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-rococo-600 text-center md:text-left">
            © {currentYear} NAMNGAM. ສະຫງວນລິຂະສິດທັງໝົດ.
          </p>
          
          <div className="flex items-center gap-2 text-rococo-600">
            <span>ສ້າງດ້ວຍ</span>
            <Heart size={16} className="text-pink-500 fill-pink-500" />
            <span>ໃນ ສປປ ລາວ</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
