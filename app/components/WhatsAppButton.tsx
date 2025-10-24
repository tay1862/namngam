'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslations } from '@/lib/translations';

export default function WhatsAppButton() {
  const { t } = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show button after scrolling down 100px
    const toggleVisibility = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(true); // Always show
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    toggleVisibility(); // Check initial state

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClick = () => {
    // WhatsApp link with phone number
    window.open('https://wa.me/8562055485622', '_blank');
  };

  return (
    <>
      {isVisible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          onClick={handleClick}
          className="fixed bottom-6 right-6 z-50 group"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {/* Pulsing effect */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
          
          {/* Main button */}
          <div className="relative w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors">
            <MessageCircle className="w-7 h-7 text-white" />
          </div>

          {/* Tooltip */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-rococo-900 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            <span className="text-sm font-medium">{t('whatsapp.tooltip')}</span>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-rococo-900" />
          </div>
        </motion.button>
      )}
    </>
  );
}
