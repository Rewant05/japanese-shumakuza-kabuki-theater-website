import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { siteData } from '../config/siteData';

export const KabukiCurtainHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const bannerLeftRef = useRef<HTMLDivElement>(null);
  const bannerRightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      // 1. Curtains open horizontally immediately on load
      tl.to(leftCurtainRef.current, { xPercent: -100, duration: 1.8, ease: "power3.inOut" }, 0)
        .to(rightCurtainRef.current, { xPercent: 100, duration: 1.8, ease: "power3.inOut" }, 0);

      // 2. Stage light glow appears
      tl.fromTo(lightRef.current, 
        { opacity: 0, scale: 0.7 }, 
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }, 
        1.0
      );

      // 3. Content fades in and scales up slightly
      tl.fromTo(contentRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out" },
        1.2
      );

      // Subtle banner movement (independent)
      gsap.to([bannerLeftRef.current, bannerRightRef.current], {
        rotation: 3,
        transformOrigin: "top center",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        duration: 4,
        stagger: 1.5
      });

      // Gentle floating for the stage light
      gsap.to(lightRef.current, {
        opacity: 0.8,
        scale: 1.05,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        duration: 3,
        delay: 2.5
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-lacquer-black flex items-center justify-center pt-24 pb-16" style={{ backgroundColor: 'var(--color-lacquer-black)' }}>
      
      {/* Background Stage Floor Lines */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(90deg, transparent 49%, var(--color-muted-gold) 50%, transparent 51%)',
             backgroundSize: '100px 100%',
             transform: 'perspective(500px) rotateX(60deg) scale(2.5) translateY(100px)'
           }} />

      {/* Stage Light Glow */}
      <div ref={lightRef} className="absolute inset-0 z-0 pointer-events-none opacity-0"
           style={{
             background: 'radial-gradient(circle at 50% 50%, rgba(195, 166, 99, 0.3) 0%, transparent 70%)'
           }} />

      {/* Hanging Banners (Silhouettes) */}
      <div ref={bannerLeftRef} className="absolute top-0 left-[5%] md:left-[10%] w-12 md:w-16 h-64 bg-deep-shadow-brown z-10 hidden sm:block" 
           style={{ backgroundColor: 'var(--color-deep-shadow-brown)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}>
        <div className="w-full h-full border-2 border-muted-gold opacity-30 flex flex-col items-center pt-8 gap-4 text-muted-gold writing-vertical-rl font-serif">
          <span>歌</span>
          <span>舞</span>
          <span>伎</span>
        </div>
      </div>
      <div ref={bannerRightRef} className="absolute top-0 right-[5%] md:right-[10%] w-12 md:w-16 h-80 bg-deep-shadow-brown z-10 hidden sm:block"
           style={{ backgroundColor: 'var(--color-deep-shadow-brown)', boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)' }}>
        <div className="w-full h-full border-2 border-muted-gold opacity-30 flex flex-col items-center pt-8 gap-4 text-muted-gold writing-vertical-rl font-serif">
          <span>伝</span>
          <span>統</span>
          <span>芸</span>
          <span>能</span>
        </div>
      </div>

      {/* Stage Content */}
      <div ref={contentRef} className="relative z-20 text-center px-4 flex flex-col items-center opacity-0 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-washi-beige mb-8 leading-tight tracking-wide" style={{ color: 'var(--color-washi-beige)', textShadow: '0 8px 24px rgba(0,0,0,0.9)' }}>
          幕の向こうに、<br />受け継がれる物語。
        </h1>
        <p className="text-lg md:text-2xl text-washi-beige/90 mb-12 max-w-3xl font-serif leading-relaxed" style={{ color: 'rgba(245, 240, 230, 0.95)' }}>
          {siteData.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <Link to="/performances" className="ticket-cta text-lg md:text-xl px-10 py-5">
            {siteData.name}の演目を見る
          </Link>
          <Link to="/beginner-guide" className="px-8 py-4 font-serif text-lg text-washi-beige border-b-2 border-transparent hover:border-muted-gold hover:text-muted-gold transition-all duration-300 inline-flex items-center justify-center">
            はじめての歌舞伎へ
          </Link>
        </div>
      </div>

      {/* Kabuki Curtains */}
      <div ref={leftCurtainRef} className="absolute top-0 left-0 w-1/2 h-full z-40 origin-left"
           style={{
             backgroundImage: 'repeating-linear-gradient(90deg, var(--color-vermilion-red) 0%, var(--color-vermilion-red) 8%, var(--color-ink-black) 8%, var(--color-ink-black) 16%, var(--color-muted-gold) 16%, var(--color-muted-gold) 24%)',
             boxShadow: '10px 0 30px rgba(0,0,0,0.8)'
           }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>
      </div>
      <div ref={rightCurtainRef} className="absolute top-0 right-0 w-1/2 h-full z-40 origin-right"
           style={{
             backgroundImage: 'repeating-linear-gradient(90deg, var(--color-vermilion-red) 0%, var(--color-vermilion-red) 8%, var(--color-ink-black) 8%, var(--color-ink-black) 16%, var(--color-muted-gold) 16%, var(--color-muted-gold) 24%)',
             boxShadow: '-10px 0 30px rgba(0,0,0,0.8)'
           }}>
         <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none"></div>
      </div>
    </div>
  );
};
