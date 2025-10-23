import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import ShareButtons from '../../components/ShareButtons';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog`, { cache: 'no-store' });
    const posts: { slug: string }[] = await res.json();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/blog/${slug}`, { cache: 'no-store' });
  const post = res.ok ? await res.json() : null;
  
  if (!post) {
    return {
      title: 'Blog Not Found - NAMNGAM',
    };
  }

  return {
    title: `${post.title} - NAMNGAM Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  
  const res = await fetch(`${baseUrl}/api/blog/${slug}`, { cache: 'no-store' });
  
  if (!res.ok) {
    notFound();
  }
  
  const post = await res.json();

  return (
    <>
      <Navigation />
      
      <article className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="relative h-[60vh] min-h-[400px] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
          
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-4xl mx-auto w-full px-4 pb-12">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-6 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>ກັບໄປບົດຄວາມທັງໝົດ</span>
              </Link>

              <span className="inline-block px-4 py-2 bg-pink-500 text-white rounded-full text-sm font-medium mb-4">
                {post.category}
              </span>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-6 text-white/80 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar size={18} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          {/* Share Buttons */}
          <div className="flex justify-end mb-8">
            <ShareButtons
              url={`https://guasha-blog.vercel.app/blog/${post.slug}`}
              title={post.title}
            />
          </div>

          {/* Markdown Content */}
          <div className="prose prose-lg prose-pink max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ ...props }) => (
                  <h1 className="text-4xl font-bold text-rococo-900 mb-6 mt-8" {...props} />
                ),
                h2: ({ ...props }) => (
                  <h2 className="text-3xl font-bold text-rococo-900 mb-4 mt-8" {...props} />
                ),
                h3: ({ ...props }) => (
                  <h3 className="text-2xl font-bold text-rococo-900 mb-3 mt-6" {...props} />
                ),
                p: ({ ...props }) => (
                  <p className="text-lg text-rococo-700 mb-4 leading-relaxed" {...props} />
                ),
                ul: ({ ...props }) => (
                  <ul className="list-disc list-inside space-y-2 mb-6 text-rococo-700" {...props} />
                ),
                ol: ({ ...props }) => (
                  <ol className="list-decimal list-inside space-y-2 mb-6 text-rococo-700" {...props} />
                ),
                li: ({ ...props }) => (
                  <li className="text-lg text-rococo-700" {...props} />
                ),
                blockquote: ({ ...props }) => (
                  <blockquote className="border-l-4 border-pink-500 pl-6 py-2 my-6 italic bg-pink-50 rounded-r-lg" {...props} />
                ),
                strong: ({ ...props }) => (
                  <strong className="font-bold text-pink-600" {...props} />
                ),
                a: ({ ...props }) => (
                  <a className="text-pink-600 hover:text-pink-700 underline" {...props} />
                ),
                table: ({ ...props }) => (
                  <div className="overflow-x-auto my-8">
                    <table className="min-w-full border-collapse border border-pink-200" {...props} />
                  </div>
                ),
                th: ({ ...props }) => (
                  <th className="border border-pink-200 bg-pink-100 px-4 py-2 text-left font-semibold" {...props} />
                ),
                td: ({ ...props }) => (
                  <td className="border border-pink-200 px-4 py-2" {...props} />
                ),
                hr: ({ ...props }) => (
                  <hr className="my-8 border-t-2 border-pink-200" {...props} />
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Share Again at Bottom */}
          <div className="mt-12 pt-8 border-t border-pink-200">
            <p className="text-lg font-semibold text-rococo-900 mb-4">ແບ່ງປັນບົດຄວາມນີ້:</p>
            <ShareButtons
              url={`https://guasha-blog.vercel.app/blog/${post.slug}`}
              title={post.title}
            />
          </div>
        </div>

        {/* Related Posts / CTA */}
        <section className="py-16 px-4 bg-gradient-to-br from-pink-50 to-rococo-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-rococo-600 bg-clip-text text-transparent">
              ສົນໃຈເຄື່ອງມືກັວຊາຄຸນະພາບ?
            </h2>
            <p className="text-lg text-rococo-700 mb-8">
              ຄັດສະຫຼັດສິນຄ້າກັວຊາແທ້ສຳລັບການດູແລຜິວໜ້າຂອງທ່ານ
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/products"
                className="px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-medium hover:shadow-lg transition-shadow"
              >
                ເບິ່ງສິນຄ້າ
              </Link>
              <Link
                href="/blog"
                className="px-8 py-4 bg-white border-2 border-pink-500 text-pink-600 rounded-full font-medium hover:bg-pink-50 transition-colors"
              >
                ບົດຄວາມອື່ນໆ
              </Link>
            </div>
          </div>
        </section>
      </article>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
