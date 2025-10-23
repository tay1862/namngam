'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Mail, Send } from 'lucide-react';
import { useTranslations } from '@/lib/translations';

export default function Newsletter() {
  const { t } = useTranslations();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email) {
      setStatus('error');
      setMessage('ກະລຸນາໃສ່ອີເມວຂອງທ່ານ');
      return;
    }
    
    if (!validateEmail(email)) {
      setStatus('error');
      setMessage('ກະລຸນາໃສ່ອີເມວທີ່ຖືກຕ້ອງ');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      // ส่งข้อมูลไปยัง API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('ສະໝັກສຳເລັດ! ຂອບໃຈທີ່ສົນໃຈ');
        setEmail('');
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch {
      setStatus('error');
      setMessage('ເກີດຂໍ້ຜິດພາດ, ກະລຸນາລອງໃໝ່ອີກຄັ້ງ');
    }
  };

  return (
    <section ref={ref} className="py-24 px-4 bg-gradient-to-br from-pink-100 via-rococo-100 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden bg-white rounded-3xl p-12 border-2 border-pink-200 shadow-2xl"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-300 to-rococo-300 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-rococo-300 to-pink-300 rounded-full blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <Mail className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent">
              {t('newsletter.title')}
            </h2>

            <p className="text-lg text-rococo-700 text-center mb-8 max-w-2xl mx-auto">
              {t('newsletter.subtitle')}
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rococo-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setStatus('idle');
                      setMessage('');
                    }}
                    placeholder={t('newsletter.placeholder')}
                    disabled={status === 'loading'}
                    className={`w-full pl-12 pr-4 py-4 rounded-full border-2 ${
                      status === 'error' ? 'border-red-500' : 'border-pink-200'
                    } focus:border-pink-500 focus:outline-none transition-colors text-rococo-900 placeholder:text-rococo-400 disabled:opacity-50`}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  whileHover={status === 'loading' ? {} : { scale: 1.05 }}
                  whileTap={status === 'loading' ? {} : { scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-shadow flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                      <span>{t('common.loading')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('newsletter.button')}</span>
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </div>

              {/* Success/Error Messages */}
              {message && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-sm text-center mt-4 font-medium ${
                    status === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {message}
                </motion.p>
              )}

              <p className="text-sm text-rococo-600 text-center mt-4">
                ພວກເຮົາເຄົາລົບຄວາມເປັນສ່ວນຕົວຂອງທ່ານ ແລະ ຈະບໍ່ແບ່ງປັນຂໍ້ມູນໃຫ້ຄົນອື່ນ
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
