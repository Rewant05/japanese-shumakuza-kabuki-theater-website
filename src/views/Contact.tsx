'use client';

import React from 'react';
import { Clock, Mail, MapPin } from 'lucide-react';
import { siteData } from '../config/siteData';

export const Contact: React.FC = () => {
  return (
    <div className="bg-[var(--color-bg-secondary)] min-h-screen pt-32 pb-24">
      <div className="container max-w-5xl">
        <div className="text-center mb-24">
          <span className="text-[var(--color-accent-red)] tracking-[0.2em] text-xs uppercase font-bold mb-6 block">
            お問い合わせ
          </span>
          <h1 className="title-large text-[var(--color-text-primary)] mb-8">
            お問い合わせ
          </h1>
          <p className="text-subtle text-lg leading-relaxed max-w-2xl mx-auto">
            演目や劇場に関するご質問、初心者向けのご案内など、
            <br />
            ご不明な点がございましたらお気軽にお問い合わせください。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <div className="glass-card p-12 h-full">
              <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-10">
                ご利用案内
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center flex-shrink-0 text-[var(--color-accent-red)]">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-[var(--color-text-primary)] mb-2">所在地</h3>
                    <p className="text-subtle font-serif leading-relaxed text-[15px]">{siteData.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center flex-shrink-0 text-[var(--color-accent-red)]">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-[var(--color-text-primary)] mb-2">営業時間</h3>
                    <p className="text-subtle font-serif leading-relaxed text-[15px]">{siteData.businessHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-[var(--color-bg-tertiary)] flex items-center justify-center flex-shrink-0 text-[var(--color-accent-red)]">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="font-sans text-xs tracking-[0.2em] uppercase font-bold text-[var(--color-text-primary)] mb-2">メール</h3>
                    <a href={`mailto:${siteData.email}`} className="text-[var(--color-accent-red)] font-serif leading-relaxed text-[15px] hover:underline">
                      {siteData.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <form className="glass-card p-12" onSubmit={(e) => e.preventDefault()}>
              <h2 className="text-2xl font-serif font-bold text-[var(--color-text-primary)] mb-10">
                お問い合わせフォーム
              </h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-sans tracking-[0.1em] font-bold text-[var(--color-text-primary)] mb-2">
                    お名前 <span className="text-[var(--color-accent-red)]">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-[var(--color-bg-primary)] border border-[rgba(0,0,0,0.1)] rounded p-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-red)] transition-colors"
                    placeholder="山田 太郎"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-sans tracking-[0.1em] font-bold text-[var(--color-text-primary)] mb-2">
                    メールアドレス <span className="text-[var(--color-accent-red)]">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-[var(--color-bg-primary)] border border-[rgba(0,0,0,0.1)] rounded p-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-red)] transition-colors"
                    placeholder="taro@example.jp"
                  />
                </div>

                <div>
                  <label htmlFor="inquiryType" className="block text-xs font-sans tracking-[0.1em] font-bold text-[var(--color-text-primary)] mb-2">
                    お問い合わせ種別
                  </label>
                  <select
                    id="inquiryType"
                    className="w-full bg-[var(--color-bg-primary)] border border-[rgba(0,0,0,0.1)] rounded p-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-red)] transition-colors"
                  >
                    <option value="tickets">チケットに関するご質問</option>
                    <option value="beginner">初心者向けガイドについて</option>
                    <option value="general">その他のお問い合わせ</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-sans tracking-[0.1em] font-bold text-[var(--color-text-primary)] mb-2">
                    お問い合わせ内容 <span className="text-[var(--color-accent-red)]">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-[var(--color-bg-primary)] border border-[rgba(0,0,0,0.1)] rounded p-4 text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--color-accent-red)] transition-colors resize-none"
                    placeholder="ご質問やご要望をご記入ください。"
                  />
                </div>

                <div className="pt-6">
                  <button type="submit" className="btn-primary w-full text-center">
                    <span>送信する</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
