import React from 'react';
import { siteData } from '../config/siteData';

export const Performances: React.FC = () => {
  return (
    <div className="bg-[var(--color-bg-secondary)] min-h-screen pt-32 pb-24">
      <div className="container max-w-5xl">
        
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[var(--color-accent-red)] tracking-[0.2em] text-xs uppercase font-bold mb-6 block">
            Repertoire
          </span>
          <h1 className="title-large text-[var(--color-text-primary)] mb-8">
            演目案内
          </h1>
          <p className="text-subtle max-w-2xl mx-auto text-lg leading-relaxed">
            時代を超えて愛される名作から、華やかな舞踊まで。<br />
            初心者の方にも分かりやすい解説とともにご案内します。
          </p>
        </div>

        {/* Performances List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {siteData.performances.map((perf, index) => {
            const images = [
              'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1578469645762-461b4f41315f?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=800&auto=format&fit=crop',
              'https://images.unsplash.com/photo-1522083115452-965a3d706dd6?q=80&w=800&auto=format&fit=crop'
            ];
            return (
              <div key={perf.id} className="glass-card flex flex-col h-full overflow-hidden p-0 group" style={{ animationDelay: `${index * 0.1}s` }}>
                
                {/* Image Header */}
                <div className="relative h-64 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${images[index % images.length]})` }}
                  />
                  {/* Subtle white gradient overlay at bottom of image */}
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />
                </div>
                
                <div className="p-8 flex flex-col h-full bg-[var(--color-bg-primary)]">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[var(--color-accent-red)] text-[10px] font-bold tracking-[0.2em] uppercase font-sans border border-[var(--color-accent-red)]/30 px-3 py-1 rounded">
                      {perf.category}
                    </span>
                    {perf.beginnerFriendly && (
                      <span className="text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)] text-[10px] font-bold tracking-[0.2em] uppercase font-sans border border-[rgba(0,0,0,0.05)] px-3 py-1 rounded">
                        Beginner Friendly
                      </span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-red)] transition-colors mb-4">
                    {perf.title}
                  </h2>
                  
                  <div className="flex flex-wrap gap-6 text-[10px] text-subtle mb-6 font-sans font-bold uppercase tracking-[0.1em]">
                    <span>Mood <strong className="text-[var(--color-text-primary)] ml-2">{perf.mood}</strong></span>
                    <span>Duration <strong className="text-[var(--color-text-primary)] ml-2">{perf.duration}</strong></span>
                  </div>

                  <div className="mb-6 flex-grow">
                    <p className="text-subtle leading-loose text-sm font-serif">
                      {perf.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-[rgba(0,0,0,0.05)] mt-auto">
                    <h4 className="font-sans text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--color-text-primary)] mb-3">
                      Cultural Insight
                    </h4>
                    <p className="text-[var(--color-text-secondary)] text-sm font-serif leading-relaxed italic bg-[var(--color-bg-secondary)] p-4 rounded-r border-l-2 border-[var(--color-accent-red)]">
                      {perf.culturalPoint}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
