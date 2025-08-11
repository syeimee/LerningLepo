const specificGuitarModels = [
  {
    id: 1,
    name: "Gibson Les Paul Standard",
    manufacturer: "Gibson",
    model: "Les Paul Standard",
    yearIntroduced: "1952",
    priceRange: "¥350,000 - ¥500,000",
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Gibson Les Paulの代表的モデル。伝統的なマホガニーボディにメイプルキャップを組み合わせた構造で、温かく太いトーンが特徴。",
    specifications: [
      "ボディ: マホガニー + メイプルキャップ",
      "ネック: マホガニー (60's スリム テーパー)",
      "指板: ローズウッド",
      "ピックアップ: BurstBucker Pro ハムバッカー×2",
      "スケール: 24.75インチ"
    ],
    soundCharacteristics: "豊かなサステインと温かみのある中低域、クリアな高域が特徴。ロックからブルースまで幅広いジャンルに対応。",
    westernArtists: ["Slash", "Jimmy Page", "Gary Moore", "Joe Bonamassa"],
    japaneseArtists: ["松本孝弘 (B'z)", "HEATH (X JAPAN)", "HISASHI (GLAY)", "清春"],
    tags: ["ロック", "ハードロック", "ブルース", "クラシック"]
  },
  {
    id: 2,
    name: "Gibson Les Paul Custom",
    manufacturer: "Gibson",
    model: "Les Paul Custom",
    yearIntroduced: "1954",
    priceRange: "¥450,000 - ¥650,000",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "「Black Beauty」として知られるプレミアムモデル。エボニー指板とゴールドハードウェアが高級感を演出。",
    specifications: [
      "ボディ: マホガニー + メイプルキャップ",
      "ネック: マホガニー (SlimTaper)",
      "指板: エボニー",
      "ピックアップ: CustomBucker ハムバッカー×2",
      "ハードウェア: ゴールド"
    ],
    soundCharacteristics: "エボニー指板により、Standardよりもタイトでアタックの効いたトーン。高級感のあるサウンドが魅力。",
    westernArtists: ["Randy Rhoads", "Zakk Wylde", "Peter Frampton", "Ace Frehley"],
    japaneseArtists: ["SUGIZO (LUNA SEA/X JAPAN)", "PATA (X JAPAN)", "雅-MIYAVI-", "春畑道哉 (TUBE)"],
    tags: ["ハードロック", "メタル", "プレミアム", "ブラック"]
  },
  {
    id: 3,
    name: "Fender Player Stratocaster",
    manufacturer: "Fender",
    model: "Player Stratocaster",
    yearIntroduced: "2018",
    priceRange: "¥120,000 - ¥180,000",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "現代のプレイヤーのためにアップデートされたクラシックなStratocasterデザイン。優れたコストパフォーマンスが魅力。",
    specifications: [
      "ボディ: アルダー",
      "ネック: メイプル (Modern C シェイプ)",
      "指板: メイプル/パーフェロー",
      "ピックアップ: Player Series Alnico 5 シングルコイル×3",
      "ブリッジ: 2-Point Synchronized Tremolo"
    ],
    soundCharacteristics: "クラシックなStratocasterトーン。クリーンからオーバードライブまで幅広い表現力を持つ汎用性の高いサウンド。",
    westernArtists: ["John Mayer", "Eric Clapton", "David Gilmour", "Mark Knopfler"],
    japaneseArtists: ["野村義男", "CHAR", "今剛", "山下智久"],
    tags: ["オールラウンド", "コスパ", "クラシック", "ベーシック"]
  },
  {
    id: 4,
    name: "Fender American Professional II Stratocaster",
    manufacturer: "Fender",
    model: "American Professional II Stratocaster",
    yearIntroduced: "2020",
    priceRange: "¥280,000 - ¥350,000",
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Fenderのフラッグシップモデル。プロフェッショナルなパフォーマンスと快適なプレイアビリティを両立。",
    specifications: [
      "ボディ: アルダー",
      "ネック: メイプル (Deep C シェイプ)",
      "指板: メイプル/ローズウッド",
      "ピックアップ: V-Mod II シングルコイル×3",
      "ブリッジ: 2-Point Synchronized Tremolo with Pop-In Arm"
    ],
    soundCharacteristics: "V-Mod IIピックアップによるヴィンテージライクなトーンと現代的なクラリティを併せ持つ。プロレベルの演奏性。",
    westernArtists: ["H.E.R.", "Brad Paisley", "John Mayer", "Shawn Mendes"],
    japaneseArtists: ["斉藤和義", "奥田民生", "長渕剛", "福山雅治"],
    tags: ["プロフェッショナル", "ヴィンテージ", "ハイエンド", "USA"]
  },
  {
    id: 5,
    name: "Martin D-28 Standard",
    manufacturer: "Martin",
    model: "D-28 Standard",
    yearIntroduced: "1931",
    priceRange: "¥450,000 - ¥550,000",
    image: "https://images.unsplash.com/photo-1504509546545-e000b4a62425?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "アコースティックギターの王様と呼ばれるドレッドノート型の代表格。豊かな低音と明瞭な高音が特徴。",
    specifications: [
      "トップ: シトカスプルース",
      "バック&サイド: イーストインディアンローズウッド",
      "ネック: セレクトハードウッド",
      "指板: エボニー",
      "ブレーシング: Xブレーシング"
    ],
    soundCharacteristics: "パワフルで豊かな低音域と煌びやかな高音域。フラットピッキング、フィンガーピッキング両方に適応。",
    westernArtists: ["Johnny Cash", "Neil Young", "Bob Dylan", "Willie Nelson"],
    japaneseArtists: ["長渕剛", "森山直太朗", "Bank Band (櫻井和寿)", "竹原ピストル"],
    tags: ["ドレッドノート", "フォーク", "アコースティック", "伝統"]
  },
  {
    id: 6,
    name: "Taylor 814ce",
    manufacturer: "Taylor",
    model: "814ce",
    yearIntroduced: "1990s",
    priceRange: "¥550,000 - ¥650,000",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    description: "Taylorの代表的なグランドオーディトリアム型モデル。ESエレクトロニクスシステム搭載でライブパフォーマンスに最適。",
    specifications: [
      "トップ: シトカスプルース",
      "バック&サイド: インディアンローズウッド",
      "ネック: トロピカルマホガニー",
      "指板: エボニー",
      "エレクトロニクス: ES2エレクトロニクス"
    ],
    soundCharacteristics: "バランスの良いミッドレンジと優れた音の分離。エレクトリック時のナチュラルなサウンドが評価される。",
    westernArtists: ["Taylor Swift", "Jason Mraz", "Dave Matthews", "Zac Brown"],
    japaneseArtists: ["押尾コータロー", "miwa", "秦基博", "あいみょん"],
    tags: ["モダン", "エレアコ", "バランス", "ライブ"]
  }
];

export default function FeaturedGuitars() {
  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-20 fade-in">
          <h2 className="text-display-2 text-brand-900 mb-8">
            Legendary 
            <span className="text-gradient">Instruments</span>
          </h2>
          <p className="text-body-large text-brand-600 max-w-4xl mx-auto">
            音楽史に名を刻んだ名器たちの物語。それぞれの個性と魅力、
            <br className="hidden md:block" />
            そして数々のアーティストたちに愛され続ける理由を探ります。
          </p>
        </div>

        {/* Specific Guitar Models Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {specificGuitarModels.map((guitar) => (
            <div key={guitar.id} className="card group">
              <div className="relative overflow-hidden">
                <img 
                  src={guitar.image} 
                  alt={guitar.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-brand-900 px-3 py-1 rounded-full text-sm font-medium">
                    {guitar.manufacturer}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-brand-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {guitar.priceRange}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-brand-900 mb-1">
                    {guitar.name}
                  </h3>
                  <p className="text-sm text-brand-600">
                    {guitar.manufacturer} • {guitar.yearIntroduced}年〜
                  </p>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-brand-700 leading-relaxed">
                    {guitar.description}
                  </p>
                </div>

                {/* Specifications */}
                <div className="mb-4">
                  <h4 className="font-medium text-brand-900 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    仕様
                  </h4>
                  <div className="grid grid-cols-1 gap-1">
                    {guitar.specifications.map((spec, specIndex) => (
                      <div key={specIndex} className="text-sm text-brand-600 flex items-center">
                        <div className="w-1 h-1 bg-brand-400 rounded-full mr-2"></div>
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sound Characteristics */}
                <div className="mb-4">
                  <h4 className="font-medium text-brand-900 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>
                    </svg>
                    サウンド特性
                  </h4>
                  <p className="text-sm text-brand-700 leading-relaxed">
                    {guitar.soundCharacteristics}
                  </p>
                </div>

                {/* Western Artists */}
                <div className="mb-4">
                  <h4 className="font-medium text-brand-900 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"></path>
                    </svg>
                    海外アーティスト
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {guitar.westernArtists.map((artist, artistIndex) => (
                      <span 
                        key={artistIndex}
                        className="bg-brand-100 text-brand-700 px-2 py-1 rounded-lg text-xs font-medium"
                      >
                        {artist}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Japanese Artists */}
                <div className="mb-4">
                  <h4 className="font-medium text-brand-900 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    日本アーティスト
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {guitar.japaneseArtists.map((artist, artistIndex) => (
                      <span 
                        key={artistIndex}
                        className="bg-brand-50 text-brand-600 px-2 py-1 rounded-lg text-xs font-medium border border-brand-200"
                      >
                        {artist}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {guitar.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="bg-gradient-to-r from-brand-500 to-brand-600 text-white px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-24">
          <div className="bg-brand-50 rounded-3xl p-12">
            <h3 className="text-display-3 text-brand-900 mb-6">
              ギターが紡ぐ無限の物語
            </h3>
            <p className="text-body text-brand-700 mb-10 max-w-3xl mx-auto">
              一本一本のギターには、その誕生から現在まで数え切れない物語が宿っています。
              製作者の情熱、演奏者の想い、そして聴衆の心に響いた無数の瞬間。
              <br className="hidden md:block" />
              これらの楽器が持つ深い歴史と魅力を、ぜひじっくりとお楽しみください。
            </p>
            <button className="btn-learn group">
              ギター文化の探究を続ける
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}