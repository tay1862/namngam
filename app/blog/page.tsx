import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import BlogGrid from '../components/BlogGrid';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

async function getBlogPosts() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/blog`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-20">
        <BlogGrid posts={posts} />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
