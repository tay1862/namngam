'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Calendar, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BlogPost {
  id?: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
}

interface BlogModalProps {
  slug: string | null;
  onClose: () => void;
}

export default function BlogModal({ slug, onClose }: BlogModalProps) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  const fetchPost = async (slug: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/blog/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!slug) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
        >
          <X size={24} className="text-gray-800" />
        </button>

        {/* Content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-xl text-gray-600">ກຳລັງໂຫຼດ...</div>
            </div>
          ) : post ? (
            <>
              {/* Hero Image */}
              <div className="relative h-64 md:h-80 w-full">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-rococo-900 mb-4">
                  {post.title}
                </h1>

                <div className="flex items-center gap-6 text-rococo-600 text-sm mb-6 pb-6 border-b border-pink-200">
                  <div className="flex items-center gap-2">
                    <Calendar size={18} />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={18} />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                {/* Markdown Content */}
                <div className="prose prose-lg prose-pink max-w-none">
                  <ReactMarkdown
                    components={{
                      h1: ({ ...props }) => (
                        <h1 className="text-3xl font-bold text-rococo-900 mb-4 mt-6" {...props} />
                      ),
                      h2: ({ ...props }) => (
                        <h2 className="text-2xl font-bold text-rococo-900 mb-3 mt-6" {...props} />
                      ),
                      h3: ({ ...props }) => (
                        <h3 className="text-xl font-bold text-rococo-900 mb-2 mt-4" {...props} />
                      ),
                      p: ({ ...props }) => (
                        <p className="text-lg text-rococo-700 mb-4 leading-relaxed" {...props} />
                      ),
                      ul: ({ ...props }) => (
                        <ul className="list-disc list-inside space-y-2 mb-4 text-rococo-700" {...props} />
                      ),
                      ol: ({ ...props }) => (
                        <ol className="list-decimal list-inside space-y-2 mb-4 text-rococo-700" {...props} />
                      ),
                      li: ({ ...props }) => (
                        <li className="text-lg text-rococo-700" {...props} />
                      ),
                      blockquote: ({ ...props }) => (
                        <blockquote className="border-l-4 border-pink-500 pl-4 py-2 my-4 italic bg-pink-50 rounded-r-lg" {...props} />
                      ),
                      strong: ({ ...props }) => (
                        <strong className="font-bold text-pink-600" {...props} />
                      ),
                      a: ({ ...props }) => (
                        <a className="text-pink-600 hover:text-pink-700 underline" {...props} />
                      ),
                    }}
                  >
                    {post.content}
                  </ReactMarkdown>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-xl text-gray-600">ບໍ່ພົບບົດຄວາມ</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
