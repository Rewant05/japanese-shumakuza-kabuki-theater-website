import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../config/siteData';
import stageHero from '../assets/stage-hero-1440.webp';

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-16 min-h-screen bg-[var(--color-bg-primary)]">
      <div className="container">
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <span className="text-[var(--color-text-tertiary)] tracking-[0.3em] text-sm uppercase mb-6 block font-sans">
            Our Story
          </span>
          <h1 className="title-large mb-8">私たちについて</h1>
          <p className="text-subtle font-serif tracking-[0.08em] text-lg">
            {siteData.tagline}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="home-image-panel">
            <img src={stageHero} alt="Vermilion traditional theater stage" />
          </div>

          <div className="max-w-2xl">
            <div className="w-12 h-12 flex items-center justify-center text-[var(--color-text-primary)] font-serif text-2xl border border-[var(--color-text-secondary)] mb-8 rotate-45">
              <span className="-rotate-45">朱</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-text-primary)] tracking-[0.12em] mb-8">
              {siteData.theaterName}
            </h2>
            <div className="space-y-8 font-serif text-subtle leading-loose text-lg">
              <p>
                日本には、数百年のあいだ形を変えながら受け継がれてきた豊かな舞台芸術があります。歌舞伎、舞踊、和楽器の響きは、現代の私たちの感情にもまっすぐ届きます。
              </p>
              <p>
                朱幕座は、伝統芸能と初めて出会う人をつなぐための架空の案内所です。難しさよりも、まずは美しさ、迫力、物語の入り口を感じられるように編集しています。
              </p>
              <p className="text-2xl md:text-3xl text-[var(--color-text-primary)] leading-relaxed">
                知ることで、舞台はもっと面白くなる。
              </p>
              <p>
                少しの知識を胸に劇場へ足を運べば、そこには想像を超える豊かな世界が広がっています。
              </p>
            </div>

            <div className="mt-12">
              <Link to="/beginner-guide" className="btn-primary">
                <span>はじめての歌舞伎へ</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
