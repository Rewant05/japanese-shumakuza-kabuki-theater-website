import React from 'react';
import { siteData } from '../config/siteData';
import stageHero from '../assets/stage-hero-1440.webp';
import stageClimax from '../assets/stage-climax-900.webp';
import stageFarewell from '../assets/stage-farewell-1440.webp';

export const Performances: React.FC = () => {
  const images = [stageHero, stageClimax, stageFarewell];

  return (
    <div className="bg-[var(--color-bg-secondary)] min-h-screen pt-32 pb-24">
      <div className="container max-w-5xl">
        <div className="text-center mb-24">
          <span className="text-[var(--color-accent-red)] tracking-[0.2em] text-xs uppercase font-bold mb-6 block">
            演目案内
          </span>
          <h1 className="title-large text-[var(--color-text-primary)] mb-8">
            演目案内
          </h1>
          <p className="text-subtle max-w-2xl mx-auto text-lg leading-relaxed">
            時代を超えて愛される名作から、華やかな舞踊まで。
            <br />
            初めての方にもわかりやすい解説とともにご案内します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteData.performances.map((perf, index) => (
            <div key={perf.id} className="glass-card flex flex-col h-full overflow-hidden p-0 group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={images[index % images.length]}
                  alt={`${perf.title}の舞台写真`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />
              </div>

              <div className="p-8 flex flex-col h-full bg-[var(--color-bg-primary)]">
                <div className="flex justify-between items-start gap-4 mb-6">
                  <span className="text-[var(--color-accent-red)] text-[10px] font-bold tracking-[0.2em] uppercase font-sans border border-[var(--color-accent-red)]/30 px-3 py-1 rounded">
                    {perf.category}
                  </span>
                  {perf.beginnerFriendly && (
                    <span className="text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)] text-[10px] font-bold tracking-[0.2em] uppercase font-sans border border-[rgba(0,0,0,0.05)] px-3 py-1 rounded">
                      初心者向け
                    </span>
                  )}
                </div>

                <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-red)] transition-colors mb-4">
                  {perf.title}
                </h2>

                <div className="flex flex-wrap gap-6 text-[10px] text-subtle mb-6 font-sans font-bold uppercase tracking-[0.1em]">
                  <span>雰囲気 <strong className="text-[var(--color-text-primary)] ml-2">{perf.mood}</strong></span>
                  <span>所要時間 <strong className="text-[var(--color-text-primary)] ml-2">{perf.duration}</strong></span>
                </div>

                <p className="text-subtle leading-loose text-sm font-serif flex-grow">
                  {perf.description}
                </p>

                <div className="pt-6 border-t border-[rgba(0,0,0,0.05)] mt-8">
                  <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-text-primary)] mb-3">
                    文化の見どころ
                  </h4>
                  <p className="text-[var(--color-text-secondary)] text-sm font-serif leading-relaxed italic bg-[var(--color-bg-secondary)] p-4 rounded-r border-l-2 border-[var(--color-accent-red)]">
                    {perf.culturalPoint}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
