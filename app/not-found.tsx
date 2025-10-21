import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 to-rococo-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-9xl font-bold bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent mb-4">
          404
        </div>
        <h1 className="text-3xl font-bold text-rococo-900 mb-4">
          ບໍ່ພົບໜ້າທີ່ຄົ້ນຫາ
        </h1>
        <p className="text-rococo-700 mb-8">
          ຂໍອະໄພ, ໜ້າທີ່ທ່ານຊອກຫາບໍ່ມີຢູ່ ຫຼື ຖືກລົບອອກແລ້ວ.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-shadow"
        >
          ກັບໜ້າຫຼັກ
        </Link>
      </div>
    </div>
  );
}
