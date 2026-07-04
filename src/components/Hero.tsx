import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { siteData } from '../config/siteData';
import stageHero from '../assets/stage-hero-1440.webp';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (textRef.current) gsap.set(textRef.current.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Subtle background scale in
      tl.fromTo(bgRef.current,
        { scale: 1.05, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power2.out" },
        0
      );

      // Staggered text fade up
      if (textRef.current) {
        tl.fromTo(textRef.current.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" },
          0.5
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-white">
      
      {/* Bright Image Background */}
      <div ref={bgRef} className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 transition-transform duration-[10s] hover:scale-105" 
          style={{ 
            backgroundImage: `url(${stageHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }} 
        />
        {/* Soft light gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
      </div>

      <div className="container relative z-10 pt-20">
        <div ref={textRef} className="max-w-2xl text-left">
          
          <span className="text-[var(--color-accent-red)] tracking-[0.3em] text-xs font-bold uppercase mb-8 block opacity-0">
            {siteData.name} — Japanese Traditional Arts
          </span>
          
          <h1 className="title-xl opacity-0 text-[var(--color-text-primary)]">
            幕の向こうに、<br />受け継がれる物語。
          </h1>
          
          <p className="text-subtle text-lg md:text-xl max-w-xl mt-8 mb-12 leading-loose opacity-0">
            {siteData.description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 opacity-0">
            <Link to="/performances" className="btn-primary">
              <span>演目を見る</span>
            </Link>
            <Link to="/beginner-guide" className="btn-outline btn-primary bg-transparent text-[var(--color-text-primary)] hover:text-white border-[var(--color-text-primary)] before:bg-[var(--color-text-primary)]">
              <span>はじめての歌舞伎</span>
            </Link>
          </div>
          
        </div>
      </div>
      
    </div>
  );
};
