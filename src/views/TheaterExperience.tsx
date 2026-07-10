import React from 'react';
import { siteData } from '../config/siteData';

export const TheaterExperience: React.FC = () => {
  return (
    <div className="bg-[var(--color-bg-secondary)] min-h-screen pt-32 pb-24 relative overflow-hidden">
      <div className="container max-w-4xl relative z-10">
        <div className="text-center mb-24">
          <span className="text-[var(--color-accent-red)] tracking-[0.2em] text-xs uppercase font-bold mb-6 block">
            劇場体験
          </span>
          <h1 className="title-large text-[var(--color-text-primary)] mb-8">
            劇場の楽しみ方
          </h1>
          <p className="text-subtle text-lg leading-relaxed max-w-2xl mx-auto">
            日常から離れ、特別な空間で過ごす時間。
            <br />
            開演前から終演後まで、劇場での豊かな体験の仕方をご紹介します。
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[rgba(0,0,0,0.1)] to-transparent" />

          <div className="space-y-16">
            {siteData.theaterExperience.map((item, index) => (
              <div key={item.title} className={`flex flex-col md:flex-row gap-8 md:gap-16 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="absolute left-[15px] md:left-1/2 w-[11px] h-[11px] rounded-full bg-[var(--color-accent-red)] top-1/2 -translate-x-[5px] -translate-y-1/2 border-2 border-white shadow-[0_0_0_4px_rgba(230,57,70,0.2)]" />
                <div className="hidden md:block flex-1" />
                <div className="flex-1 ml-12 md:ml-0 relative">
                  <div className="glass-card p-8 group">
                    <h2 className="text-xl font-serif font-bold text-[var(--color-text-primary)] mb-4">
                      {item.title}
                    </h2>
                    <p className="text-subtle leading-loose text-[15px] font-serif">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-32 pt-24 border-t border-[rgba(0,0,0,0.05)]">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-4">よくあるご質問</h2>
            <p className="text-subtle text-sm tracking-[0.1em] uppercase font-bold">よくある質問</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteData.faqs.map((faq) => (
              <div key={faq.question} className="glass-card p-8">
                <h3 className="text-[var(--color-text-primary)] font-bold mb-4 font-serif">
                  質問：{faq.question}
                </h3>
                <p className="text-subtle text-sm leading-relaxed">
                  回答：{faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
