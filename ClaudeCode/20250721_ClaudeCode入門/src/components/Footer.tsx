const footerLinks = {
  products: [
    { name: "アコースティックギター", href: "#" },
    { name: "エレキギター", href: "#" },
    { name: "クラシックギター", href: "#" },
    { name: "ベースギター", href: "#" },
    { name: "ギターアクセサリー", href: "#" },
  ],
  services: [
    { name: "ギター選定サービス", href: "#" },
    { name: "メンテナンス・修理", href: "#" },
    { name: "無料相談", href: "#" },
    { name: "試奏サービス", href: "#" },
    { name: "アフターサポート", href: "#" },
  ],
  support: [
    { name: "よくある質問", href: "#" },
    { name: "お問い合わせ", href: "#" },
    { name: "店舗案内", href: "#" },
    { name: "配送について", href: "#" },
    { name: "返品・交換", href: "#" },
  ],
  company: [
    { name: "会社概要", href: "#" },
    { name: "採用情報", href: "#" },
    { name: "プライバシーポリシー", href: "#" },
    { name: "利用規約", href: "#" },
    { name: "特定商取引法", href: "#" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.017 5.5h3.966c.518 0 .937.42.937.937v3.966c0 .518-.42.937-.937.937H12.017c-.518 0-.937-.42-.937-.937V6.437c0-.518.42-.937.937-.937zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0-1a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.5.5a.5.5 0 11-1 0 .5.5 0 011 0z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h8a2 2 0 012 2v2.5a1.5 1.5 0 001.5 1.5H16a2 2 0 012 2V16a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm4.5 5L8 9.5 10.5 11 8 12.5 6.5 11z" clipRule="evenodd" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-3">厳選ギター</h2>
                <p className="text-gray-300 leading-relaxed">
                  プロの音楽家が選んだ、本当に価値のあるギターだけをお届け。
                  あなたの音楽人生を豊かにする最高の一本を見つけてください。
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-3">お問い合わせ</h3>
                <div className="space-y-2 text-gray-300">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>03-1234-5678</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                    </svg>
                    <span>info@guitar-select.com</span>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                    </svg>
                    <span>東京都渋谷区神南1-2-3<br />ギタービル3F</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">SNS</h3>
                <div className="flex space-x-4">
                  {socialLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="w-10 h-10 bg-white/10 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-300"
                      aria-label={item.name}
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">商品</h3>
              <ul className="space-y-3">
                {footerLinks.products.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">サービス</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">サポート</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-6">会社情報</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="text-gray-300 hover:text-primary-400 transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-400 text-sm">
                © 2025 厳選ギター. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                プライバシーポリシー
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                利用規約
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                特定商取引法に基づく表記
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                サイトマップ
              </a>
            </div>
          </div>
        </div>

        <div className="bg-primary-600 rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold text-white mb-1">ニュースレター登録</h3>
              <p className="text-primary-100 text-sm">
                新着ギター情報やセール情報をお届けします
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="メールアドレスを入力"
                className="flex-1 md:w-64 px-4 py-2 rounded-l-lg border-0 focus:ring-2 focus:ring-primary-300 focus:outline-none"
              />
              <button className="bg-secondary-900 hover:bg-secondary-700 text-white px-6 py-2 rounded-r-lg font-semibold transition-colors duration-200">
                登録
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}