import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import BlogGrid from '../components/BlogGrid';
import { getAllBlogPosts } from '../../lib/blog';

export default function BlogPage() {
  // Get all blog posts (server-side)
  const allPosts = getAllBlogPosts();

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-20">
        <BlogGrid posts={allPosts} />
      </main>

      <Footer />
      <WhatsAppButton />
    </>
  );
}
