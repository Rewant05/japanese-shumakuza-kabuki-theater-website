import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { siteData } from '../config/siteData';

export const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-16 min-h-screen bg-[var(--color-bg-primary)]">
      <div className="container">
        
        {/* Page Header */}
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <span className="text-[var(--color-text-tertiary)] tracking-[0.3em] text-sm uppercase mb-6 block font-sans">
            Our Story
          </span>
          <h1 className="title-large mb-8">私たちについて</h1>
          <p className="text-subtle font-serif tracking-[0.1em] text-lg">
            {siteData.tagline}
          </p>
        </div>

        <div className="max-w-4xl mx-auto glass-card border-none bg-[var(--color-bg-secondary)] py-20 px-10 md:px-20 relative overflow-hidden">
          
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent to-[var(--color-text-secondary)] opacity-30" />
          
          <div className="text-center mb-16 pt-8">
            <div className="w-12 h-12 flex items-center justify-center text-[var(--color-text-primary)] font-serif text-2xl border border-[var(--color-text-secondary)] mx-auto mb-8 transform rotate-45">
              <span className="transform -rotate-45">朱</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-text-primary)] tracking-[0.2em] mb-4">
              {siteData.theaterName}
            </h2>
          </div>

          <div className="space-y-12 font-serif text-subtle leading-loose text-justify md:text-center text-lg max-w-2xl mx-auto font-light">
            <p>
              日本には、数百年もの間、形を変えながらも脈々と受け継がれてきた豊かな舞台芸術があります。歌舞伎、文楽、能楽、そして日本舞踊。これらは決して過去の遺物ではなく、現代を生きる私たちの心にも強く響く「人間の感情」を描き出しています。
            </p>
            <p>
              しかし、その門を叩くには、「言葉が難しい」「ルールが分からない」といった敷居の高さを感じる方も少なくありません。私たち『朱幕座』は、そんな伝統芸能と現代の観客をつなぐ、架空の案内所として誕生しました。
            </p>
            
            <div className="py-12 relative">
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-12 h-[1px] bg-gold opacity-30" />
              <p className="text-2xl md:text-3xl text-[var(--color-text-primary)] font-serif tracking-[0.2em] leading-loose text-center">
                知ることで、<br className="md:hidden" />舞台はもっと面白くなる。
              </p>
              <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-12 h-[1px] bg-gold opacity-30" />
            </div>

            <p>
              隈取の色が示す意味、花道を使ったダイナミックな演出、そして三味線が奏でる繊細な心理描写。少しの知識を胸に劇場へ足を運べば、そこには想像をはるかに超える豊穣な世界が広がっています。
            </p>
            <p>
              当サイトでは、厳選した架空の演目解説や、初心者向けのガイドラインを通じて、皆様を伝統芸能の入り口へとご案内いたします。朱色の幕が開くその瞬間を、心待ちにしていただければ幸いです。
            </p>
          </div>
          
          <div className="mt-24 text-center">
            <Link to="/beginner-guide" className="btn-primary">
              はじめての歌舞伎へ
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
