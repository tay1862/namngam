'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Search, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../lib/blog';

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ທັງໝົດ');

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'ທັງໝົດ' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ['ທັງໝົດ', ...Array.from(new Set(posts.map((post) => post.category)))];

  return (
    <>
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
              ບົດຄວາມແລະຄູ່ມື
            </h1>
            <p className="text-xl text-rococo-700 max-w-3xl mx-auto mb-8">
              ຄຳແນະນຳ, ເຄັດລັບ, ແລະ ຄູ່ມືການນວດກັວຊາເພື່ອຄວາມງາມທີ່ຍືນຍົງ
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-rococo-400" />
              <input
                type="text"
                placeholder="ຄົ້ນຫາບົດຄວາມ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-pink-200 focus:border-pink-500 focus:outline-none transition-colors text-rococo-900 placeholder:text-rococo-400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 px-4 bg-white border-b border-pink-100">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg'
                    : 'bg-pink-50 text-rococo-700 hover:bg-pink-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section ref={ref} className="py-16 px-4 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-6xl mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-rococo-600">ບໍ່ພົບບົດຄວາມທີ່ຄົ້ນຫາ</p>
              <p className="text-rococo-500 mt-2">ລອງຄົ້ນຫາດ້ວຍຄຳອື່ນ ຫຼື ເລືອກໝວດໝູ່ອື່ນ</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`} className="group block">
                    <div className="bg-white rounded-3xl overflow-hidden border-2 border-pink-100 hover:border-pink-400 hover:shadow-2xl transition-all duration-300">
                      {/* Post Image */}
                      <div className="relative h-56 overflow-hidden">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-pink-600">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Post Info */}
                      <div className="p-6">
                        <div className="flex items-center gap-4 text-sm text-rococo-600 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar size={16} />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} />
                            <span>{post.readTime}</span>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-rococo-900 group-hover:text-pink-600 transition-colors line-clamp-2 mb-3">
                          {post.title}
                        </h3>

                        <p className="text-rococo-700 line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>

                        <div className="flex items-center gap-2 text-pink-600 font-medium group-hover:gap-4 transition-all">
                          <span>ອ່ານຕໍ່</span>
                          <ArrowRight size={20} />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-pink-600 to-rococo-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ສົນໃຈເລີ່ມຕົ້ນນວດກັວຊາ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            ຕິດຕໍ່ພວກເຮົາເພື່ອຂໍຄຳແນະນຳແລະສັ່ງຊື້ສິນຄ້າ
          </p>
          <Link
            href="/products"
            className="inline-block px-8 py-4 bg-white text-pink-600 rounded-full font-bold text-lg hover:shadow-2xl transition-shadow"
          >
            ເບິ່ງສິນຄ້າ
          </Link>
        </div>
      </section>
    </>
  );
}
