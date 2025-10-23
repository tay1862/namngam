'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import Image from 'next/image';
import BlogModal from './BlogModal';

interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

export default function BlogPreview() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();
      setPosts(data.slice(0, 3)); // แสดงแค่ 3 บทความ
    } catch (error) {
      console.error('Error:', error);
      // Fallback data
      setPosts(fallbackPosts);
    } finally {
      setLoading(false);
    }
  };

  const fallbackPosts: BlogPost[] = [
    {
      id: 1,
      slug: "beginner-gua-sha-guide",
      title: "ວິທີການເລີ່ມຕົ້ນນວດກັວຊາສຳລັບຜູ້ເລີ່ມຕົ້ນ",
      excerpt: "ຄຳແນະນຳສຳລັບຜູ້ທີ່ຕ້ອງການເລີ່ມນວດກັວຊາຄັ້ງທຳອິດ ເລີ່ມຕົ້ນຢ່າງປອດໄພແລະມີປະສິດທິພາບ",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop",
      date: "15 ມັງກອນ 2024",
      readTime: "5 ນາທີ",
      category: "ຄູ່ມືເບື້ອງຕົ້ນ"
    },
    {
      id: 2,
      slug: "common-gua-sha-mistakes",
      title: "5 ຂໍ້ຜິດພາດທີ່ຄົນມັກເຮັດເວລານວດກັວຊາ",
      excerpt: "ຮູ້ຈັກຂໍ້ຜິດພາດທົ່ວໄປເພື່ອຫຼີກເວັ້ນແລະໄດ້ຮັບຜົນດີທີ່ສຸດຈາກການນວດ",
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop",
      date: "10 ມັງກອນ 2024",
      readTime: "4 ນາທີ",
      category: "ເຄັດລັບ"
    },
    {
      id: 3,
      slug: "choose-right-gua-sha",
      title: "ເລືອກເຄື່ອງມືກັວຊາແນວໃດໃຫ້ເໝາະກັບຜິວໜ້າ",
      excerpt: "ຄຳແນະນຳໃນການເລືອກເຄື່ອງມືກັວຊາທີ່ເໝາະສົມກັບປະເພດຜິວແລະຄວາມຕ້ອງການຂອງທ່ານ",
      image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop",
      date: "5 ມັງກອນ 2024",
      readTime: "6 ນາທີ",
      category: "ຜະລິດຕະພັນ"
    }
  ];

  return (
    <section ref={ref} className="relative py-24 px-4 overflow-hidden">
      {/* Background Image - Full Cover */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/background-blog.jpeg"
          alt="Blog Background"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-rococo-5/5 via-white/5 to-rococo-5/5" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent">
            ບົດຄວາມແລະຄູ່ມື
          </h2>
          <p className="text-lg text-rococo-700">
            ເລີ່ມຕົ້ນການເດີນທາງສູ່ຄວາມງາມແບບທຳມະຊາດກັບພວກເຮົາ
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.slug || post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group cursor-pointer"
              onClick={() => setSelectedSlug(post.slug)}
            >
                <div className="relative overflow-hidden rounded-2xl mb-4 h-64">
                  <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-pink-600">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-sm text-rococo-600">
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-rococo-900 group-hover:text-pink-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-rococo-700 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-pink-600 font-medium group-hover:gap-4 transition-all">
                    <span>ອ່ານຕໍ່</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <button className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-medium text-lg hover:shadow-xl transition-shadow">
              ເບິ່ງບົດຄວາມທັງໝົດ
            </button>
          </Link>
        </motion.div>
      </div>

      {/* Blog Modal */}
      {selectedSlug && (
        <BlogModal slug={selectedSlug} onClose={() => setSelectedSlug(null)} />
      )}
    </section>
  );
}
