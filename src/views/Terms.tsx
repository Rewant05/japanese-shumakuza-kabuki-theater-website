import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="bg-[var(--color-bg-secondary)] min-h-screen pt-32 pb-24">
      <div className="container max-w-3xl">
        
        <div className="text-center mb-16">
          <span className="text-[var(--color-accent-red)] tracking-[0.2em] text-xs uppercase font-bold mb-6 block">
            ご案内
          </span>
          <h1 className="title-large text-[var(--color-text-primary)] mb-8">
            利用規約
          </h1>
          <p className="text-subtle text-sm">
            最終更新日：2024年1月1日
          </p>
        </div>

        <div className="glass-card p-12">
          <div className="prose prose-sm max-w-none text-subtle font-serif leading-loose">
            <p className="mb-8">
              当サイト（朱幕座）を利用するすべての方（以下「ユーザー」）は、以下の利用規約（以下「本規約」）に同意したものとみなします。
            </p>
            
            <h2 className="text-xl font-bold font-serif text-[var(--color-text-primary)] mt-12 mb-6">1. サイトの目的と性質</h2>
            <p className="mb-8">
              当サイトは、日本の伝統芸能の魅力を伝えることを目的とした架空の案内所（デモンストレーションサイト）です。実際のチケット販売、イベント企画、劇場の運営等は一切行っておりません。サイト内に記載されている演目、施設情報、各種案内はすべて架空のものです。
            </p>
            
            <h2 className="text-xl font-bold font-serif text-[var(--color-text-primary)] mt-12 mb-6">2. 著作権等について</h2>
            <p className="mb-8">
              当サイトに掲載されているテキスト、画像、その他のコンテンツに関する著作権その他の権利は、当方または正当な権利を有する第三者に帰属します。無断での転載、複製、改変等を禁じます。
            </p>

            <h2 className="text-xl font-bold font-serif text-[var(--color-text-primary)] mt-12 mb-6">3. 免責事項</h2>
            <p className="mb-8">
              当方は、当サイトの内容の正確性、有用性、確実性等について、いかなる保証もするものではありません。当サイトの利用により生じた損害について、当方は一切の責任を負わないものとします。
            </p>

            <h2 className="text-xl font-bold font-serif text-[var(--color-text-primary)] mt-12 mb-6">4. 規約の変更</h2>
            <p className="mb-8">
              当方は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、当サイトに掲載された時から効力を生じるものとします。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
