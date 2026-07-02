import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Info, MapPin } from 'lucide-react';
import { Hero } from '../components/Hero';
import { siteData } from '../config/siteData';

export const Home: React.FC = () => {
  const featuredPerformances = siteData.performances.slice(0, 3);
  const beginnerPreview = siteData.beginnerGuide.slice(0, 4);

  return (
    <div className="bg-[var(--color-bg-primary)]">
      <Hero />

      {/* Featured Performances Section */}
      <section className="section bg-[var(--color-bg-secondary)] relative z-10 border-t border-[rgba(0,0,0,0.05)]">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="text-[var(--color-accent-red)] tracking-[0.2em] font-bold text-xs uppercase mb-4 block">
                Featured Performances
              </span>
              <h2 className="title-large">注目の舞台</h2>
            </div>
            <Link 
              to="/performances" 
              className="group flex items-center gap-4 text-[var(--color-text-primary)] hover:text-[var(--color-accent-red)] transition-colors mb-2"
            >
              <span className="uppercase tracking-[0.2em] text-sm font-bold link-underline">View All</span>
              <ArrowRight size={18} className="transform group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPerformances.map((perf, index) => {
              const images = [
                'https://images.unsplash.com/photo-1578469645762-461b4f41315f?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop',
                'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop'
              ];
              return (
                <Link to="/performances" key={perf.id} className="glass-card group block p-0" style={{ animationDelay: `${index * 0.1}s` }}>
                  
                  {/* Image Header */}
                  <div className="relative h-64 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url(${images[index % images.length]})` }}
                    />
                  </div>

                  <div className="p-8 flex flex-col h-[calc(100%-16rem)]">
                    <div className="mb-6">
                      <span className="text-[var(--color-accent-red)] text-xs font-bold tracking-[0.1em] uppercase block mb-2">
                        {perf.category}
                      </span>
                      <h3 className="text-2xl font-serif text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-red)] transition-colors duration-300 mb-2 leading-tight">
                        {perf.title}
                      </h3>
                      <p className="text-sm text-subtle font-serif italic">
                        {perf.visualHighlight}
                      </p>
                    </div>
                    <p className="text-subtle mb-8 line-clamp-3 text-sm leading-relaxed flex-grow">
                      {perf.description}
                    </p>
                    <div className="flex items-center text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-red)] text-xs font-bold uppercase tracking-[0.2em] mt-auto transition-colors">
                      <span className="mr-4">Discover</span>
                      <ArrowRight size={14} className="transform group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section bg-[var(--color-bg-primary)]">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center py-12">
            <span className="text-[var(--color-accent-red)] font-bold tracking-[0.2em] text-xs uppercase mb-8 block">
              Our Philosophy
            </span>
            <h2 className="title-xl mb-12">
              日本の心、<br />四百年の美意識。
            </h2>
            <p className="text-subtle text-lg md:text-xl leading-loose font-serif mb-16 text-justify md:text-center max-w-3xl mx-auto">
              朱幕座は、歌舞伎をはじめとする日本の伝統芸能の魅力を、初めての方にも分かりやすくお伝えするための案内所です。<br />
              華やかな舞台、繊細な和楽器の音色、そして義理人情を描いた物語。<br />
              先人たちが受け継いできた豊かな文化の世界へご案内いたします。
            </p>
            <Link to="/about" className="btn-primary">
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Beginner Guide Preview */}
      <section className="section bg-[var(--color-bg-secondary)] border-t border-[rgba(0,0,0,0.05)]">
        <div className="container">
          <div className="text-center mb-16">
            <span className="text-[var(--color-accent-red)] font-bold tracking-[0.2em] text-xs uppercase mb-4 block">
              Beginner's Guide
            </span>
            <h2 className="title-large mb-6">はじめての歌舞伎</h2>
            <p className="text-subtle max-w-2xl mx-auto text-lg leading-relaxed">
              「難しそう」というイメージを持つ方も多い伝統芸能。<br />少しの知識があれば、舞台は劇的に面白くなります。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beginnerPreview.map((guide, index) => (
              <div key={index} className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-500">
                <div className="text-[var(--color-accent-red)] font-serif text-4xl font-bold mb-6 opacity-20 group-hover:opacity-100 transition-opacity">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold font-serif text-[var(--color-text-primary)] mb-4">{guide.title}</h3>
                <p className="text-sm text-subtle leading-relaxed">
                  {guide.explanation}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-20">
            <Link to="/beginner-guide" className="btn-outline btn-primary bg-transparent text-[var(--color-text-primary)] border-[var(--color-text-primary)] before:bg-[var(--color-text-primary)] hover:text-white">
              <span>Read Full Guide</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact & CTA Section */}
      <section className="py-32 bg-[var(--color-bg-primary)] border-t border-[rgba(0,0,0,0.05)] relative">
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-[var(--color-accent-red)] font-bold tracking-[0.2em] text-xs uppercase mb-6 block">
              Get in Touch
            </span>
            
            <h2 className="title-large mb-8">お問い合わせ</h2>
            <p className="text-subtle mb-16 font-serif leading-loose text-lg">
              演目に関するご質問、初心者向けのご案内、<br className="hidden sm:block" />その他ご不明な点がございましたらお気軽にお問い合わせください。
            </p>
            
            <Link to="/contact" className="btn-primary">
              <span>Contact Form</span>
            </Link>
            
            <div className="mt-24 pt-12 border-t border-[rgba(0,0,0,0.05)] flex flex-col md:flex-row justify-center items-center gap-12 text-sm text-[var(--color-text-secondary)] tracking-[0.1em] font-bold uppercase font-sans">
              <div className="flex items-center gap-4">
                <MapPin size={18} className="text-[var(--color-accent-red)]" />
                <span>{siteData.address}</span>
              </div>
              <div className="flex items-center gap-4">
                <Info size={18} className="text-[var(--color-accent-red)]" />
                <span>{siteData.businessHours}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
