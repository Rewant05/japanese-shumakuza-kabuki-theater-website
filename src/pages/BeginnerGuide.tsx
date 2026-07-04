import React from 'react';
import { siteData } from '../config/siteData';

export const BeginnerGuide: React.FC = () => {
  return (
    <div className="bg-[var(--color-bg-secondary)] min-h-screen pt-32 pb-24">
      <div className="container max-w-4xl">
        <div className="text-center mb-24">
          <span className="text-[var(--color-accent-red)] tracking-[0.2em] text-xs uppercase font-bold mb-6 block">
            Beginner's Guide
          </span>
          <h1 className="title-large text-[var(--color-text-primary)] mb-8">
            はじめての歌舞伎
          </h1>
          <p className="text-subtle text-lg leading-relaxed max-w-2xl mx-auto">
            難しそうに見える伝統芸能も、少しの知識があるだけで舞台はぐっと面白くなります。
            <br />
            観劇前に知っておきたい基本をご紹介します。
          </p>
        </div>

        <div className="space-y-12">
          {siteData.beginnerGuide.map((guide, index) => (
            <div key={guide.title} className="glass-card flex flex-col md:flex-row gap-8 md:gap-12 p-8 md:p-12">
              <div className="hidden md:block w-24 flex-shrink-0">
                <span className="text-[var(--color-accent-red)] opacity-20 text-6xl font-serif font-bold italic">
                  0{index + 1}
                </span>
              </div>

              <div className="flex-1">
                <div className="md:hidden text-[var(--color-accent-red)] opacity-30 text-4xl font-serif font-bold italic mb-4">
                  0{index + 1}
                </div>
                <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-6">
                  {guide.title}
                </h2>

                <p className="text-subtle font-serif leading-loose mb-8 text-[15px]">
                  {guide.explanation}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[rgba(0,0,0,0.05)]">
                  <div>
                    <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--color-accent-red)] mb-3">
                      Tips for Beginners
                    </h3>
                    <p className="text-[13px] text-subtle leading-relaxed">
                      {guide.beginnerTip}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-[var(--color-text-primary)] mb-3">
                      Cultural Note
                    </h3>
                    <p className="text-[13px] text-subtle leading-relaxed bg-[var(--color-bg-secondary)] p-3 rounded border-l-2 border-[var(--color-accent-red)]">
                      {guide.culturalNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
