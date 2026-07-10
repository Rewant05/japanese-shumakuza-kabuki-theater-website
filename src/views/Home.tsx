'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.mjs';
import Info from 'lucide-react/dist/esm/icons/info.mjs';
import MapPin from 'lucide-react/dist/esm/icons/map-pin.mjs';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles.mjs';
import clsx from 'clsx';
import { siteData } from '../config/siteData';
import stageHero from '../assets/stage-hero-1440.webp';
import stageHeroMobile from '../assets/stage-hero-720.webp';
import stageClimax from '../assets/stage-climax-900.webp';
import stageClimaxMobile from '../assets/stage-climax-540.webp';
import stageFarewell from '../assets/stage-farewell-1440.webp';
import stageFarewellMobile from '../assets/stage-farewell-720.webp';

const WebGLStage = React.lazy(() => import('../components/WebGLStage').then((module) => ({ default: module.WebGLStage })));

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const range = (value: number, start: number, end: number) => clamp((value - start) / (end - start));

export const Home: React.FC = () => {
  const stageSectionRef = useRef<HTMLDivElement>(null);
  const [sceneProgress, setSceneProgress] = useState(0);
  const [reverseGlow, setReverseGlow] = useState(0);
  const [showFarewell, setShowFarewell] = useState(false);
  const [webglReady, setWebglReady] = useState(false);

  const featuredPerformances = siteData.performances.slice(0, 3);
  const beginnerPreview = siteData.beginnerGuide.slice(0, 4);
  const performanceImages = [stageHero.src, stageClimax.src, stageFarewell.src];

  const climaxOpacity = range(sceneProgress, 0.44, 0.7) * (1 - range(sceneProgress, 0.82, 0.95));
  const farewellOpacity = range(sceneProgress, 0.78, 0.96);
  const introFade = 1 - range(sceneProgress, 0.18, 0.46);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setSceneProgress(0.65);
      return;
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    const setupAnimations = async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);

      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        gsap.fromTo(
          '.stage-copy-animate',
          { opacity: 0, y: 34 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out' },
        );

        ScrollTrigger.create({
          trigger: stageSectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            setSceneProgress(self.progress);
            setReverseGlow(self.direction < 0 ? range(self.progress, 0.2, 0.9) : 0);
            setShowFarewell(self.direction < 0 && self.progress > 0.58);
          },
          onLeave: () => setShowFarewell(false),
          onEnterBack: () => setShowFarewell(false),
        });

      gsap.utils.toArray<HTMLElement>('.gsap-rise').forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 42 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 82%',
            },
          },
        );
      });
      }, stageSectionRef);

      cleanup = () => ctx.revert();
    };

    window.setTimeout(() => {
      void setupAnimations();
    }, 0);

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const schedule = window.requestIdleCallback ?? ((callback: IdleRequestCallback) => window.setTimeout(() => callback({ didTimeout: false, timeRemaining: () => 0 }), 900));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = schedule(() => setWebglReady(true), { timeout: 1400 });

    return () => cancel(id);
  }, []);

  return (
    <div className="theater-home">
      <section
        ref={stageSectionRef}
        className="stage-scroll"
        style={{ '--stage-progress': sceneProgress } as React.CSSProperties}
      >
        <div className="stage-sticky">
          <div
            className="stage-image stage-image--hero"
            style={{
              transform: `scale(${1 + sceneProgress * 0.08})`,
              filter: `saturate(${1 + sceneProgress * 0.25}) brightness(${1 - sceneProgress * 0.12})`,
            }}
          >
            <picture className="stage-picture">
              <source srcSet={stageHeroMobile.src} media="(max-width: 640px)" type="image/webp" />
              <img
                src={stageHero.src}
                alt=""
                fetchPriority="high"
                decoding="async"
                width="1440"
                height="768"
                aria-hidden="true"
              />
            </picture>
          </div>
          <div
            className="stage-image stage-image--climax"
            style={{
              backgroundImage: sceneProgress > 0.28
                ? `image-set(url(${stageClimaxMobile.src}) 1x, url(${stageClimax.src}) 2x)`
                : 'none',
              opacity: climaxOpacity,
              transform: `scale(${1.08 - climaxOpacity * 0.04}) translateY(${(1 - climaxOpacity) * 22}px)`,
            }}
          />
          <div
            className="stage-image stage-image--farewell"
            style={{
              backgroundImage: sceneProgress > 0.64
                ? `image-set(url(${stageFarewellMobile.src}) 1x, url(${stageFarewell.src}) 2x)`
                : 'none',
              opacity: farewellOpacity,
              transform: `scale(${1.06 - farewellOpacity * 0.04})`,
            }}
          />

          {webglReady && (
            <React.Suspense fallback={null}>
              <WebGLStage progress={sceneProgress} reverse={reverseGlow} className="stage-webgl" />
            </React.Suspense>
          )}
          <div className="stage-vignette" />
          <div className="stage-curtain-shadow" />
          <div className="stage-noise" />

          <div className="stage-copy">
            <div
              style={{
                opacity: introFade,
                transform: `translateY(${-24 * (1 - introFade)}px)`,
                pointerEvents: introFade < 0.08 ? 'none' : 'auto',
              }}
            >
              <span className="stage-kicker stage-copy-animate">朱幕座 伝統芸能案内</span>
              <h1 className="stage-title stage-copy-animate">
                幕の向こうに
                <span>物語が灯る</span>
              </h1>
              <p className="stage-lede stage-copy-animate">
                幕が開き、物語が高まり、舞台の熱が静かな余韻へ移ろうまで。劇場を歩くように、日本の伝統芸能の世界をご案内します。
              </p>
              <div className="stage-actions stage-copy-animate">
                <Link href="/performances" className="stage-button">
                  演目を見る
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <Link href="/beginner-guide" className="stage-button-secondary">
                  はじめての歌舞伎
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className={clsx('farewell-note', showFarewell && 'is-visible')} role="status" aria-live="polite">
        <span>お帰りの前に</span>
        <strong>ご観劇ありがとうございました。</strong>
      </div>

      <section className="home-band home-band--warm section">
        <div className="container home-grid">
          <div className="home-image-panel gsap-rise">
            <img
              src={stageClimax.src}
              srcSet={`${stageClimaxMobile.src} 540w, ${stageClimax.src} 900w`}
              sizes="(max-width: 768px) 92vw, 38vw"
              alt="舞台照明を受ける華やかな衣裳と扇"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="gsap-rise">
            <span className="home-section-label">注目演目</span>
            <h2 className="title-large">注目の舞台</h2>
            <p className="text-subtle text-lg leading-loose mb-8">
              初めてでも入りやすい演目から、舞台全体が熱を帯びる名場面まで。衣裳、音、所作の見どころを短く案内します。
            </p>
            <Link href="/performances" className="btn-primary">
              <span>演目をすべて見る</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-band section">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-14 gsap-rise">
            <div>
              <span className="home-section-label">演目案内</span>
              <h2 className="title-large">物語を選ぶ</h2>
            </div>
            <Link href="/performances" className="group flex items-center gap-3 text-[var(--color-text-primary)] hover:text-[var(--color-accent-red)] transition-colors">
              <span className="uppercase tracking-[0.18em] text-sm font-bold link-underline">詳しく見る</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPerformances.map((perf, index) => (
              <Link href="/performances" key={perf.id} className="glass-card performance-card group block p-0 gsap-rise">
                <img
                  src={performanceImages[index % performanceImages.length]}
                  alt={`${perf.title}の舞台写真`}
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-8">
                  <span className="text-[var(--color-accent-red)] text-xs font-bold tracking-[0.1em] uppercase block mb-2">
                    {perf.category}
                  </span>
                  <h3 className="text-2xl font-serif text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-red)] transition-colors mb-3 leading-tight">
                    {perf.title}
                  </h3>
                  <p className="text-sm text-subtle font-serif italic mb-5">
                    {perf.visualHighlight}
                  </p>
                  <p className="text-subtle line-clamp-3 text-sm leading-relaxed">
                    {perf.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-band home-band--ink section">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center gsap-rise">
            <span className="inline-flex items-center gap-2 text-[#ffd98c] font-bold tracking-[0.2em] text-xs uppercase mb-6">
              <Sparkles size={16} aria-hidden="true" />
              私たちの想い
            </span>
            <h2 className="title-xl mb-10 !text-[#fff8eb] drop-shadow-[0_3px_18px_rgba(255,248,235,0.28)]">
              知ることで、舞台はもっと面白くなる。
            </h2>
            <p className="text-lg md:text-xl leading-loose font-serif font-medium text-[#fff7ea] drop-shadow-[0_2px_12px_rgba(255,247,234,0.22)] max-w-3xl mx-auto">
              隈取の色、花道の使い方、三味線が描く心理。少しの知識を胸に劇場へ入るだけで、目の前の一瞬が物語として立ち上がります。
            </p>
          </div>
        </div>
      </section>

      <section className="home-band home-band--warm section">
        <div className="container">
          <div className="text-center mb-14 gsap-rise">
            <span className="home-section-label justify-center">初心者案内</span>
            <h2 className="title-large">はじめての歌舞伎</h2>
            <p className="text-subtle max-w-2xl mx-auto text-lg leading-relaxed">
              難しそうに見える伝統芸能も、入口を少し知るだけでぐっと近くなります。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {beginnerPreview.map((guide, index) => (
              <div key={guide.title} className="glass-card p-8 gsap-rise">
                <div className="text-[var(--color-accent-red)] font-serif text-4xl font-bold mb-6 opacity-30">
                  0{index + 1}
                </div>
                <h3 className="text-lg font-bold font-serif text-[var(--color-text-primary)] mb-4">{guide.title}</h3>
                <p className="text-sm text-subtle leading-relaxed">
                  {guide.explanation}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 gsap-rise">
            <Link href="/beginner-guide" className="btn-primary">
              <span>案内を読む</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-band section">
        <div className="container home-grid">
          <div className="gsap-rise">
            <span className="home-section-label">終演後の余韻</span>
            <h2 className="title-large">余韻まで劇場です</h2>
            <p className="text-subtle text-lg leading-loose mb-8">
              終演後のロビー、外へ続く灯り、手元に残る筋書。舞台が終わったあとも、物語は静かに続きます。
            </p>
            <div className="flex flex-col sm:flex-row gap-5 text-sm text-[var(--color-text-secondary)]">
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-[var(--color-accent-red)]" aria-hidden="true" />
                <span>{siteData.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Info size={18} className="text-[var(--color-accent-red)]" aria-hidden="true" />
                <span>{siteData.businessHours}</span>
              </div>
            </div>
          </div>
          <div className="home-image-panel gsap-rise">
            <img
              src={stageFarewell.src}
              srcSet={`${stageFarewellMobile.src} 720w, ${stageFarewell.src} 1440w`}
              sizes="(max-width: 768px) 92vw, 42vw"
              alt="終演後のあたたかな劇場ロビー"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
