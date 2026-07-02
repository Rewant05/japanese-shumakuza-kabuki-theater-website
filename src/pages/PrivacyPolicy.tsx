import React, { useEffect } from 'react';

export const PrivacyPolicy: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[var(--color-bg-secondary)] min-h-screen pt-32 pb-24">
      <div className="container max-w-3xl">
        
        <div className="text-center mb-16">
          <span className="text-[var(--color-accent-red)] tracking-[0.2em] text-xs uppercase font-bold mb-6 block">
            Legal
          </span>
          <h1 className="title-large text-[var(--color-text-primary)] mb-8">
            プライバシーポリシー
          </h1>
          <p className="text-subtle text-sm">
            最終更新日: {new Date().getFullYear()}.{String(new Date().getMonth() + 1).padStart(2, '0')}.01
          </p>
        </div>

        <div className="glass-card p-12">
          <div className="prose prose-sm max-w-none text-subtle font-serif leading-loose">
            <p className="mb-8">
              当サイトは、ユーザーの皆様の個人情報保護を重要視し、以下の通りプライバシーポリシーを定めます。本サイトは架空の伝統芸能案内所としてのデモンストレーションサイトであり、実際のサービス提供や個人情報の収集は行っておりません。
            </p>
            
            <h2 className="text-xl font-bold font-serif text-[var(--color-text-primary)] mt-12 mb-6">1. 個人情報の収集について</h2>
            <p className="mb-8">
              当サイトでは、お問い合わせフォーム等を通じてお名前、メールアドレス等の個人情報をご提供いただく場合がございますが、これらの情報はデモンストレーション目的でのみ使用され、実際のデータベース等への保存、第三者への提供は行われません。
            </p>
            
            <h2 className="text-xl font-bold font-serif text-[var(--color-text-primary)] mt-12 mb-6">2. クッキー（Cookie）の使用について</h2>
            <p className="mb-8">
              当サイトでは、ユーザーエクスペリエンスの向上のためにクッキーを使用する場合があります。クッキーはブラウザの設定により無効にすることが可能です。
            </p>

            <h2 className="text-xl font-bold font-serif text-[var(--color-text-primary)] mt-12 mb-6">3. アクセス解析ツールについて</h2>
            <p className="mb-8">
              当サイトでは、サイトの利用状況を把握するためにアクセス解析ツールを利用する場合があります。これらはトラフィックデータの収集のためにクッキーを使用していますが、匿名で収集されており、個人を特定するものではありません。
            </p>

            <h2 className="text-xl font-bold font-serif text-[var(--color-text-primary)] mt-12 mb-6">4. 免責事項</h2>
            <p className="mb-8">
              当サイトに掲載されている情報は架空のものであり、正確性や完全性を保証するものではありません。当サイトの利用により生じたいかなる損害についても、一切の責任を負いません。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
