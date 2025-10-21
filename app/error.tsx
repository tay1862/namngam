'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-rococo-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center"
      >
        <div className="text-8xl mb-4">😢</div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent mb-4">
          ມີບັນຫາເກີດຂຶ້ນ
        </h1>
        <p className="text-rococo-700 mb-8">
          ຂໍອະໄພ, ມີບາງຢ່າງຜິດພາດ. ກະລຸນາລອງໃໝ່ອີກຄັ້ງ.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-shadow"
          >
            ລອງໃໝ່
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-white border-2 border-pink-500 text-pink-600 rounded-full font-medium hover:bg-pink-50 transition-colors"
          >
            ກັບໜ້າຫຼັກ
          </button>
        </div>
      </motion.div>
    </div>
  );
}
