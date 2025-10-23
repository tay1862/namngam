'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Sparkles, Star, Check } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

interface Product {
  id: string;
  name: string;
  nameEn?: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  benefits: string[];
}

export default function ProductsPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      console.log('Fetching products from /api/products...');
      const response = await fetch('/api/products');
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        console.error('Failed to fetch products:', response.statusText);
        setLoading(false);
        return;
      }
      
      const data = await response.json();
      console.log('Products fetched:', data.length, 'items');
      console.log('Products data:', data);
      
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-500 border-t-transparent" />
        </div>
      </>
    );
  }

  // Debug log
  console.log('Current products state:', products);
  console.log('Products length:', products.length);
  console.log('Loading:', loading);
  
  // Detailed product inspection
  if (products.length > 0) {
    products.forEach((p, idx) => {
      console.log(`Product ${idx + 1}:`, {
        id: p.id,
        name: p.name,
        image: p.image,
        features: p.features,
        benefits: p.benefits,
        hasFeatures: Array.isArray(p.features),
        hasBenefits: Array.isArray(p.benefits),
      });
    });
  }

  // Fallback products if DB is empty
  const displayProducts = products.length > 0 ? products : [
    {
      id: "1",
      name: "ກັວຊາໄມ້ກ່ຽງ ຄລາສສິກ",
      nameEn: "Jade Gua Sha Classic",
      description: "ກັວຊາໄມ້ກ່ຽງແທ້ສຳລັບນວດໜ້າ ຊ່ວຍເສີມສາອາງຜິວໜ້າແລະຜ່ອນຄາຍກ້າມຊີ້ນ",
      price: "250,000 ກີບ",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600",
      features: [
        "ໄມ້ກ່ຽງແທ້ 100%",
        "ຊ່ວຍຜ່ອນຄາຍກ້າມຊີ້ນໜ້າ",
        "ກະຕຸ້ນການໄຫວຽນຂອງເລືອດ",
        "ລົດຮອຍຂີດແລະຄວາມເສຍຫາຍ"
      ],
      benefits: ["ຜິວໜ້າກະຊັບ", "ຫຼຸດການບວມ", "ຜ່ອນຄາຍ"]
    },
    {
      id: "2",
      name: "ກັວຊາກົ້ນໝູ ພຣີມຽມ",
      nameEn: "Rose Quartz Gua Sha Premium",
      description: "ກັວຊາຫີນກົ້ນໝູ ໃຫ້ພລັງງານຄວາມຮັກແລະຄວາມງາມທາງດ້ານຜິວໜ້າ",
      price: "320,000 ກີບ",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600",
      features: [
        "ຫີນກົ້ນໝູແທ້",
        "ພົບຄວາມຮັກແລະຄວາມງາມ",
        "ເໝາະສຳລັບຜິວອ່ອນໄຫວ",
        "ເຢັນສະບາຍໃນການນວດ"
      ],
      benefits: ["ຜິວກະທັດຮັດ", "ຄວາມມືດຄ່ຳ", "ຄວາມສົດໃສ"]
    },
    {
      id: "3",
      name: "ຊຸດກັວຊາສຸດພິເສດ",
      nameEn: "Gua Sha Deluxe Set",
      description: "ຊຸດກັວຊາຄົບຊຸດພ້ອມນ້ຳມັນນວດແລະຄູ່ມືການໃຊ້ງານ",
      price: "580,000 ກີບ",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600",
      features: [
        "ກັວຊາ 2 ຊິ້ນ (ໄມ້ກ່ຽງ + ກົ້ນໝູ)",
        "ນ້ຳມັນນວດໜ້າອິນຊີ 50ml",
        "ຄູ່ມືການນວດພາສາລາວ",
        "ກ່ອງພຣີມຽມສຳລັບເກັບຮັກສາ"
      ],
      benefits: ["ຄຸ້ມຄ່າທີ່ສຸດ", "ຄົບຊຸດ", "ຂອງຂວັນສຸດພິເສດ"]
    },
    {
      id: "4",
      name: "ນ້ຳມັນນວດຫົວທຳມະຊາດ",
      nameEn: "Natural Facial Oil",
      description: "ນ້ຳມັນນວດໜ້າອິນຊີສູດພິເศດສຳລັບໃຊ້ຄູ່ກັບກັວຊາ",
      price: "180,000 ກີບ",
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600",
      features: [
        "ສ່ວນຜສມທຳມະຊາດ 100%",
        "ບໍ່ມີສານເຄມີ",
        "ເໝາະກັບທຸກປະເພດຜິວ",
        "ເສີມສາກັບກັວຊາ"
      ],
      benefits: ["ບຳລຸງຜິວ", "ຊຸ່ມຊື້ນ", "ປະຕິບັດງ່າຍ"]
    }
  ];

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('/Logo-namngam-white.png')] bg-center bg-no-repeat opacity-5" style={{ backgroundSize: '400px' }} />
          
          <div className="relative z-10 max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent">
                ສິນຄ້າແລະບລິການ
              </h1>
              <p className="text-xl text-rococo-700 max-w-3xl mx-auto">
                ຄັດສະຫຼັດເຄື່ອງມືກັວຊາຄຸນະພາບສູງ ແລະຜະລິດຕະພັນດູແລຜິວໜ້າທຳມະຊາດ
              </p>
            </motion.div>
          </div>
        </section>

        {/* Products Grid */}
        <section ref={ref} className="py-16 px-4 bg-gray-50 min-h-screen">
          <div className="max-w-7xl mx-auto">
            {/* Debug Info */}
            <div className="mb-8 p-4 bg-blue-100 border border-blue-300 rounded">
              <p className="font-bold text-blue-900">Debug: แสดง {displayProducts.length} สินค้า</p>
              <p className="text-sm text-blue-700">
                {displayProducts.map(p => `${p.name} (${p.id})`).join(', ')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {displayProducts.map((product, index) => {
                console.log('Rendering product:', product.name, product.id);
                return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl border-4 border-pink-500 mb-8"
                >
                  {/* Product Image */}
                  <div className="relative h-80 overflow-hidden bg-pink-200">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        unoptimized={product.image.startsWith('/uploads')}
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-pink-100">
                        <p className="text-pink-600 font-bold">ບໍ່ມີຮູບ</p>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <div className="bg-yellow-400 px-4 py-2 rounded-full shadow-lg">
                        <Star className="w-5 h-5 fill-white text-white inline" />
                        <span className="font-bold text-gray-900 ml-1">Premium</span>
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-8 bg-white">
                    <div className="mb-6">
                      <h3 className="text-3xl font-bold text-gray-900 mb-2">
                        {product.name}
                      </h3>
                      {product.nameEn && (
                        <p className="text-base text-gray-600">{product.nameEn}</p>
                      )}
                    </div>

                    <p className="text-gray-800 mb-6 text-lg leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features */}
                    {product.features && product.features.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {product.features.map((feature, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Benefits Tags */}
                    {product.benefits && product.benefits.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.benefits.map((benefit, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm font-medium"
                          >
                            {benefit}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Price & CTA */}
                    <div className="pt-6 border-t-4 border-pink-200">
                      <div className="mb-4">
                        <p className="text-base text-gray-600 mb-2">ລາຄາ</p>
                        <p className="text-4xl font-bold text-pink-600">
                          {product.price || 'ສອບຖາມລາຄາ'}
                        </p>
                      </div>
                      <a
                        href={`https://wa.me/8562055485622?text=ສະບາຍດີ! ຂ້ອຍສົນໃຈ ${product.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xl rounded-2xl font-bold hover:shadow-2xl hover:scale-105 transition-all flex items-center justify-center gap-3"
                      >
                        <Heart className="w-6 h-6" />
                        <span>ສົນທະນາ</span>
                      </a>
                    </div>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 px-4 bg-gradient-to-br from-pink-50 via-rococo-50 to-pink-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent">
              ເປັນຫຍັງຕ້ອງເລືອກ NAMNGAM?
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-rococo-900 mb-2">
                  ຄຸນະພາບສູງ
                </h3>
                <p className="text-rococo-700">
                  ຄັດເລືອກວັດຖຸດິບທຳມະຊາດແທ້ 100%
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-rococo-500 to-rococo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-rococo-900 mb-2">
                  ບລິການດີເລີດ
                </h3>
                <p className="text-rococo-700">
                  ໃຫ້ຄຳປຶກສາແລະຊ່ວຍເທາທຸກຂັ້ນຕອນ
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rococo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-rococo-900 mb-2">
                  ຮັບປະກັນຄວາມພໍໃຈ
                </h3>
                <p className="text-rococo-700">
                  ສາມາດປ່ຽນ-ຄືນສີນຄ້າໄດ້ພາຍໃນ 7 ວັນ
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-pink-600 to-rococo-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ພ້ອມເລີ່ມຕົ້ນແລ້ວບໍ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              ຕິດຕໍ່ພວກເຮົາເພື່ອຂໍຄຳແນະນຳແລະສັ່ງຊື້ສິນຄ້າ
            </p>
            <a
              href="https://wa.me/8562055485622?text=ສະບາຍດີ! ຂ້ອຍສົນໃຈສິນຄ້າກັວຊາ"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-pink-600 rounded-full font-bold text-lg hover:shadow-2xl transition-shadow"
            >
              ສົນທະນາກັບພວກເຮົາ
            </a>
          </div>
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
