'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const res = await fetch('/api/faq');
      const data = await res.json();
      setFaqs(data);
    } catch {
      console.error('Failed to fetch FAQs');
    }
  };

  const defaultFaqs = [
    {
      id: '1',
      question: "ກັວຊາເຫມາະກັບທຸກຄົນບໍ?",
      answer: "ກັວຊາເຫມາະສົມກັບຄົນສ່ວນໃຫຍ່ ແຕ່ບໍ່ແນະນຳສຳລັບຜູ້ທີ່ມີບັນຫາກ່ຽວກັບເລືອດ, ຜິວໜັງອັກເສບຮ້າຍແຮງ, ຫຼືກຳລັງຖືພາ. ຄວນປຶກສາແພດກ່ອນໃຊ້."
    },
    {
      id: '2',
      question: "ຄວນໃຊ້ກັວຊາເທົ່າໃດຕໍ່ອາທິດ?",
      answer: "ແນະນຳໃຊ້ 2-3 ຄັ້ງຕໍ່ອາທິດ ຄັ້ງລະ 5-10 ນາທີ. ຫ້າມໃຊ້ບໍ່ຄົວປະຕິດິນຕໍ່ກັນ ເພື່ອໃຫ້ຜິວໜ້າມີເວລາພັກຜ່ອນ."
    },
    {
      id: '3',
      question: "ຕ້ອງໃຊ້ເຄື່ອງສຳອາງຫຼືນ້ຳມັນບໍ?",
      answer: "ແນະນຳໃຫ້ໃຊ້ນ້ຳມັນຫນ້າ ຫຼື serum ກ່ອນນວດກັວຊາ ເພື່ອໃຫ້ເຄື່ອງມືເລື່ອນໄດ້ງ່າຍແລະບໍ່ລະຄາຍເຄືອງຜິວ."
    },
    {
      id: '4',
      question: "ເຫັນຜົນພາຍໃນເວລາໃດ?",
      answer: "ຜົນທັນທີທັນໃດແມ່ນຜິວໜ້າສົດໃສຂຶ້ນ. ສຳລັບຜົນໄລຍະຍາວເຊັ່ນ: ຫຼຸດຮອຍຊ້ຳ ຍົກກະຊັບໜ້າ ອາດໃຊ້ເວລາ 4-8 ອາທິດ ທີ່ໃຊ້ຢ່າງສະໝ່ຳສະເໝີ."
    },
    {
      id: '5',
      question: "ເຄື່ອງມືກັວຊາເຮັດດ້ວຍວັດສະດຸຫຍັງດີສຸດ?",
      answer: "ແນະນຳໃຫ້ໃຊ້ກັວຊາຫີນເຈດ (Jade) ຫຼື ກ້ອນເຂັ້ວ (Rose Quartz) ເພາະມີຄຸນສົມບັດເຢັນ ຊ່ວຍຜ່ອນຄາຍຜິວໜ້າ ແລະໃຊ້ງານໄດ້ດີ."
    }
  ];

  const displayFaqs = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section ref={ref} className="py-24 px-4 bg-gradient-to-b from-pink-50 to-rococo-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-rococo-700">
            {t('faq.subtitle')}
          </p>
        </motion.div>

        <div className="space-y-4">
          {displayFaqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left bg-white rounded-2xl p-6 border-2 border-pink-100 hover:border-pink-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-rococo-900 pr-8">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    {openIndex === index ? (
                      <Minus className="w-6 h-6 text-pink-600" />
                    ) : (
                      <Plus className="w-6 h-6 text-pink-600" />
                    )}
                  </motion.div>
                </div>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="text-rococo-700 mt-4 leading-relaxed whitespace-pre-line">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
