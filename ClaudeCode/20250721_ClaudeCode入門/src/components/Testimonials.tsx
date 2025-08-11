const legendaryGuitarists = [
  {
    id: 1,
    name: "Jimi Hendrix",
    era: "1960s-1970s",
    nationality: "American",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&w=400&q=80",
    primaryGuitar: "Fender Stratocaster",
    signature: "Right-handed Strat played upside down",
    musicalImpact: "エレキギターの可能性を極限まで押し上げた伝説的ギタリスト。フィードバック、ディストーション、ワウワウペダルなどのエフェクトを使った革新的なサウンドで、ロック音楽を永遠に変えました。",
    famousSongs: ["Purple Haze", "Voodoo Child", "All Along the Watchtower"],
    techniques: ["フィードバック奥義", "歯で弾く", "エフェクト革新"],
    culturalLegacy: "現代ロックギターの原点とされ、その影響は60年以上経った今でも色褪せていません。",
    tags: ["Rock", "Psychedelic", "Blues", "Pioneer"]
  },
  {
    id: 2,
    name: "B.B. King",
    era: "1940s-2010s",
    nationality: "American",
    image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?ixlib=rb-4.0.3&w=400&q=80",
    primaryGuitar: "Gibson ES-355 'Lucille'",
    signature: "ヴィブラートとベンディングテクニック",
    musicalImpact: "ブルースギターの王様と呼ばれ、エレクトリックブルースの確立者。彼のスタイルは無数のギタリストに影響を与え、現代ロック、ブルースの基礎を築きました。",
    famousSongs: ["The Thrill Is Gone", "Sweet Little Angel", "Every Day I Have the Blues"],
    techniques: ["ヴィブラート巧", "シングルノートの魔術師", "感情表現"],
    culturalLegacy: "ブルースを世界に広め、音楽の国境を越えた文化的大使でもありました。",
    tags: ["Blues", "Master", "Influence", "Technique"]
  },
  {
    id: 3,
    name: "Andrés Segovia",
    era: "1900s-1980s",
    nationality: "Spanish",
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&w=400&q=80",
    primaryGuitar: "Classical Guitar (various makers)",
    signature: "正統なクラシックギター奏法",
    musicalImpact: "20世紀のクラシックギター界を代表する巨匠。クラシックギターをコンサート楽器として地位を確立し、現代のクラシックギター教育の基礎を築きました。",
    famousSongs: ["Asturias", "Recuerdos de la Alhambra", "Concierto de Aranjuez"],
    techniques: ["トレモロ奏法", "ラスゲアード奏法", "音色コントロール"],
    culturalLegacy: "クラシックギターを芸術的楽器として地位を確立し、世界中にその美しさを伝えました。",
    tags: ["Classical", "Master", "Technique", "Education"]
  },
  {
    id: 4,
    name: "Jimmy Page",
    era: "1960s-2000s",
    nationality: "British",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-4.0.3&w=400&q=80",
    primaryGuitar: "Gibson Les Paul",
    signature: "ヘビーリフとパワフルなサウンド",
    musicalImpact: "Led Zeppelinのギタリストとして、ハードロックとヘビーメタルの基礎を築いた伝説的なギタリスツ。イノベーティブなレコーディング技術とプロデュース能力でも知られています。",
    famousSongs: ["Stairway to Heaven", "Whole Lotta Love", "Black Dog"],
    techniques: ["ダブルネック", "バイオリンボウ奏法", "マルチトラッキング"],
    culturalLegacy: "ロックギターの新しい可能性を開拓し、無数のミュージシャンに影響を与えました。",
    tags: ["Rock", "Heavy", "Innovation", "Production"]
  },
  {
    id: 5,
    name: "Django Reinhardt",
    era: "1930s-1950s",
    nationality: "French-Belgian",
    image: "https://images.unsplash.com/photo-1571327073757-71d13c24de30?ixlib=rb-4.0.3&w=400&q=80",
    primaryGuitar: "Selmer-Maccaferri",
    signature: "左手2指のみでの超絶技巧",
    musicalImpact: "ジプシージャズの創始者として、ヨーロッパのジャズシーンを一変させた伝説的ギタリスト。火事で左手に障害を負ったにも関わらず、独自の奏法を開発しました。",
    famousSongs: ["Minor Swing", "Nuages", "Djangology"],
    techniques: ["2指奏法", "ジプシースタイル", "ホットクラブスウィング"],
    culturalLegacy: "ハンディキャップを乗り越えた芸術家として、多くの音楽家に勇気とインスピレーションを与えました。",
    tags: ["Jazz", "Gypsy", "Innovation", "Inspiration"]
  },
  {
    id: 6,
    name: "Jaco Pastorius",
    era: "1970s-1980s",
    nationality: "American",
    image: "https://images.unsplash.com/photo-1520637836862-4d197d17c93a?ixlib=rb-4.0.3&w=400&q=80",
    primaryGuitar: "Fender Jazz Bass (Fretless)",
    signature: "フレットレスベースのパイオニア",
    musicalImpact: "フレットレスベースを主流に押し上げた革新的ベーシスト。Weather Reportでの活動を通じて、ベースをソロ楽器としての地位を確立し、ジャズフュージョンの発展に大きく貢献しました。",
    famousSongs: ["Portrait of Tracy", "Birdland", "Teen Town"],
    techniques: ["フレットレス奏法", "ハーモニクス奏法", "メロディックベース"],
    culturalLegacy: "ベースの可能性を拡大し、現代のベーシストたちに継続的な影響を与えています。",
    tags: ["Bass", "Jazz Fusion", "Innovation", "Fretless"]
  }
];

export default function Testimonials() {
  return (
    <section id="stories" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-light text-brand-900 mb-6">
            Guitar 
            <span className="font-semibold text-gradient">Legends</span>
          </h2>
          <p className="text-lg text-brand-600 max-w-3xl mx-auto font-light leading-relaxed">
            音楽史を形作った伝説的なギタリストたちの物語。
            <br />
            彼らの革新的な技術と独自のスタイルが、どのように音楽とギター文化を進化させたかを探求します。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {legendaryGuitarists.map((guitarist) => (
            <div 
              key={guitarist.id} 
              className="card group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={guitarist.image} 
                  alt={guitarist.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-brand-900 px-3 py-1 rounded-full text-sm font-medium">
                    {guitarist.era}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="bg-brand-900/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {guitarist.nationality}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <h3 className="text-white text-xl font-bold mb-1">{guitarist.name}</h3>
                  <p className="text-white/90 text-sm">{guitarist.signature}</p>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-900 mb-1">
                      {guitarist.name}
                    </h3>
                    <p className="text-sm text-brand-600">
                      {guitarist.era} • {guitarist.nationality}
                    </p>
                  </div>
                  <div className="text-right">
                    <svg className="w-6 h-6 text-brand-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-brand-900 mb-2 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                    </svg>
                    主要なギター
                  </h4>
                  <p className="text-sm text-brand-700 font-medium mb-2">
                    {guitarist.primaryGuitar}
                  </p>
                  <p className="text-xs text-brand-600 italic">
                    {guitarist.signature}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-brand-900 mb-2">音楽的影響</h4>
                  <p className="text-sm text-brand-700 leading-relaxed">
                    {guitarist.musicalImpact}
                  </p>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-brand-900 mb-2">代表曲</h4>
                  <div className="flex flex-wrap gap-1">
                    {guitarist.famousSongs.map((song, songIndex) => (
                      <span 
                        key={songIndex}
                        className="bg-brand-100 text-brand-700 px-2 py-1 rounded text-xs"
                      >
                        {song}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-brand-900 mb-2">特徴的技術</h4>
                  <div className="flex flex-wrap gap-1">
                    {guitarist.techniques.map((technique, techIndex) => (
                      <span 
                        key={techIndex}
                        className="bg-brand-50 text-brand-600 px-2 py-1 rounded text-xs border border-brand-200"
                      >
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-brand-900 mb-2">文化的遺産</h4>
                  <p className="text-sm text-brand-700 leading-relaxed">
                    {guitarist.culturalLegacy}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {guitarist.tags.map((tag, tagIndex) => (
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

        <div className="text-center mt-16">
          <div className="bg-brand-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-display font-semibold text-brand-900 mb-4">
              ギターの伝説をもっと学ぶ
            </h3>
            <p className="text-brand-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              各ギタリストの詳しいバイオグラフィー、演奏技術、音楽的影響について、
              さらに詳しく探求してみましょう。彼らの独自のスタイルがどのように生まれたかを理解できます。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-primary">
                ギタリスト百科事典
              </button>
              <button className="btn-secondary">
                テクニック解説集
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}