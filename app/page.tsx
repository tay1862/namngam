import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Benefits from './components/Benefits';
import BlogPreview from './components/BlogPreview';
import FAQ from './components/FAQ';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="overflow-x-hidden">
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="benefits">
          <Benefits />
        </div>
        <div id="blog">
          <BlogPreview />
        </div>
        <div id="faq">
          <FAQ />
        </div>
        <div id="contact">
          <Newsletter />
        </div>
      </main>
      <Footer />
    </>
  );
}
