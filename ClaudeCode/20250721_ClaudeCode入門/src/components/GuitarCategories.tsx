const guitarTypes = [
  {
    id: 1,
    title: "アコースティックギター",
    subtitle: "Acoustic Guitar",
    origin: "19世紀スペイン",
    image: "https://images.unsplash.com/photo-1504509546545-e000b4a62425?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    historicalOverview: "アコースティックギターの起源は19世紀のスペインに遡ります。アントニオ・デ・トーレスによって現代的なフォームが確立され、その後マーティンやギブソンなどのメーカーが発展させました。",
    technicalDetails: "サウンドホールと空洞ボディによる音の増幅が特徴。木材の種類やブレーシングパターンによって音色が大きく変化します。",
    keyInnovations: [
      "Xブレーシングシステム (Martin, 1840年代)",
      "ドレッドノート型ボディ (Martin D-28, 1931年)",
      "スカロップドブレーシング (Gibson, 1960年代)"
    ],
    culturalImpact: "フォークミュージックの中心的楽器として、Bob DylanやJohnny Cashなどのアーティストに愛用され、アメリカンミュージックの発展に大きく貢献しました。",
    tags: ["アコースティック", "フォーク", "カントリー", "フィンガーピッキング"]
  },
  {
    id: 2,
    title: "エレキトリックギター",
    subtitle: "Electric Guitar",
    origin: "1930年代アメリカ",
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    historicalOverview: "1930年代、ジャズビッグバンドでギターの音量不足を解決するために開発されました。Leo FenderやLes Paulなどのパイオニアが、現代的なエレキギターの基礎を築きました。",
    technicalDetails: "磁気ピックアップが弦振動を電気信号に変換し、アンプで増幅。ソリッドボディやセミアコースティックなどの構造で、多様な音色を実現します。",
    keyInnovations: [
      "ソリッドボディギター (Fender Telecaster, 1950年)",
      "ハムバッカーピックアップ (Gibson PAF, 1955年)",
      "トレモロシステム (Fender Stratocaster, 1954年)",
      "フロイドローズ (Floyd Rose, 1977年)"
    ],
    culturalImpact: "1950年代からロックンロール、ブルース、ハードロックの中心的楽器となり、現代ポピュラーミュージックの音景を決定づけました。",
    tags: ["エレキター", "ロック", "ブルース", "ジャズ"]
  },
  {
    id: 3,
    title: "クラシックギター",
    subtitle: "Classical Guitar",
    origin: "19世紀スペイン",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    historicalOverview: "クラシックギターは19世紀のスペインで、アントニオ・デ・トーレスによって現在の形に整えられました。ナイロン弦の使用と指弾き演奏法が特徴です。",
    technicalDetails: "ナイロン弦による柔らかく温かい音色。フラットフレットボードと幅広ネックが、クラシック演奏技法に最適化されています。",
    keyInnovations: [
      "現代的なフォームの確立 (Antonio de Torres, 1850年代)",
      "ナイロン弦の導入 (Albert Augustine, 1940年代)",
      "ファンブレーシングシステム (Robert Bouchet, 1950年代)"
    ],
    culturalImpact: "クラシック音楽、フラメンコ、ボサノヴァなどのジャンルで不可欠の楽器として、世界中で愛され続けています。Andrés Segoviaなどの巨匠がその地位を確立しました。",
    tags: ["クラシック", "ナイロン弦", "フラメンコ", "ボサノヴァ"]
  },
  {
    id: 4,
    title: "ベースギター",
    subtitle: "Bass Guitar",
    origin: "1930年代アメリカ",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=900&q=80",
    historicalOverview: "1930年代にアップライトベースの持ち運びや音量の問題を解決するために開発されました。Leo Fenderのプレシジョンベース（1951年）が現代エレキベースの原型です。",
    technicalDetails: "一般的に4弦で、スタンダードチューニングはE-A-D-G。ロングスケール（34インチ）が主流で、低音域の再現に特化しています。",
    keyInnovations: [
      "エレキトリックベースの登場 (Fender Precision Bass, 1951年)",
      "ジャズベーススタイル (Fender Jazz Bass, 1960年)",
      "アクティブピックアップシステム (1970年代)",
      "5弦・6弦ベースの登場 (1980年代)"
    ],
    culturalImpact: "ロック、ファンク、ジャズ、レゲエなど、あらゆるジャンルのリズムセクションの中心。James Jamerson、Jaco Pastoriusなどの巨匠がその可能性を広げました。",
    tags: ["ベース", "リズム", "ファンク", "ジャズ"]
  }
];

export default function GuitarCategories() {
  return (
    <section id="categories" className="py-20 bg-brand-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-light text-brand-900 mb-6">
            Guitar 
            <span className="font-semibold text-gradient">Evolution</span>
          </h2>
          <p className="text-lg text-brand-600 max-w-3xl mx-auto font-light leading-relaxed">
            ギターの歴史と進化を理解することで、各タイプの特徴と文化的意義を探求します。
            <br />
            技術革新から音楽的影響まで、各タイプの独自の物語をお楽しみください。
          </p>
        </div>

        <div className="space-y-12">
          {guitarTypes.map((type, index) => (
            <div key={type.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : ''
            }`}>
              {/* Image Section */}
              <div className={`relative ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative overflow-hidden rounded-2xl shadow-medium group">
                  <img 
                    src={type.image} 
                    alt={type.title}
                    className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                  <div className="absolute top-6 left-6">
                    <span className="bg-white/90 backdrop-blur-sm text-brand-900 px-3 py-1 rounded-full text-sm font-medium">
                      {type.origin}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                {/* Header */}
                <div>
                  <p className="text-brand-500 text-sm font-medium mb-2 tracking-wide uppercase">
                    {type.subtitle}
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-display font-semibold text-brand-900 mb-4">
                    {type.title}
                  </h3>
                </div>

                {/* Historical Overview */}
                <div>
                  <h4 className="font-medium text-brand-900 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    歴史的背景
                  </h4>
                  <p className="text-brand-700 leading-relaxed text-sm">
                    {type.historicalOverview}
                  </p>
                </div>

                {/* Technical Details */}
                <div>
                  <h4 className="font-medium text-brand-900 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    技術的特徴
                  </h4>
                  <p className="text-brand-700 leading-relaxed text-sm mb-4">
                    {type.technicalDetails}
                  </p>
                </div>

                {/* Key Innovations */}
                <div>
                  <h4 className="font-medium text-brand-900 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                    </svg>
                    主要な革新
                  </h4>
                  <ul className="space-y-2">
                    {type.keyInnovations.map((innovation, innovationIndex) => (
                      <li key={innovationIndex} className="text-sm text-brand-700 flex items-start">
                        <div className="w-1.5 h-1.5 bg-brand-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {innovation}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cultural Impact */}
                <div>
                  <h4 className="font-medium text-brand-900 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                    </svg>
                    文化的影響
                  </h4>
                  <p className="text-brand-700 leading-relaxed text-sm">
                    {type.culturalImpact}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {type.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-brand-100 text-brand-700 px-3 py-1 rounded-full text-xs font-medium border border-brand-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-20">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-soft">
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-brand-900 mb-4">
              ギターの進化をもっと学ぶ
            </h3>
            <p className="text-brand-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              各タイプのギターがどのように音楽史を形作ってきたか、
              その技術革新と文化的影響をさらに深く探求してみましょう。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                技術革新の歴史
              </button>
              <button className="btn-secondary">
                著名な製作者たち
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}