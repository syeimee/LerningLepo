export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 bg-brand-50">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-6 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="text-2xl font-display font-bold text-brand-900">
            Guitar Gallery
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#gallery" className="text-brand-700 hover:text-brand-900 font-medium transition-colors duration-200">
              Gallery
            </a>
            <a href="#categories" className="text-brand-700 hover:text-brand-900 font-medium transition-colors duration-200">
              Categories
            </a>
            <a href="#contact" className="text-brand-700 hover:text-brand-900 font-medium transition-colors duration-200">
              Contact
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="text-center max-w-4xl mx-auto fade-in">
        <div className="mb-6">
          <span className="inline-block px-4 py-2 bg-white rounded-full text-sm font-medium text-brand-600 shadow-soft mb-6">
            ギターの美しい世界へようこそ
          </span>
        </div>
        
        <h1 className="text-display-1 text-brand-900 mb-8">
          The Art of
          <br />
          <span className="text-gradient">
            Guitar
          </span>
        </h1>
        
        <p className="text-body-large text-brand-600 mb-16 max-w-3xl mx-auto">
          音楽史を彩った名器たちの美しさと、それらが紡ぎ出す音色の魔法を探求する旅へ。
          <br className="hidden md:block" />
          ギターが持つ無限の表現力と、その背景にある物語をお楽しみください。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <button className="btn-explore">
            ギターの世界を探索する
          </button>
          <button className="btn-learn">
            歴史と技術を学ぶ
          </button>
        </div>

        {/* Featured Image Grid - Curated Guitar Photography */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-20">
          <div className="aspect-square rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:scale-[1.03]">
            <img 
              src="https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Les Paul Standard - Classic sunburst finish"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:scale-[1.03] md:mt-8">
            <img 
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Fender Stratocaster - Elegant electric design"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:scale-[1.03]">
            <img 
              src="https://images.unsplash.com/photo-1504509546545-e000b4a62425?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Martin Acoustic - Natural wood beauty"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-square rounded-3xl overflow-hidden shadow-soft hover:shadow-medium transition-all duration-500 hover:scale-[1.03] md:mt-8">
            <img 
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
              alt="Taylor Guitar - Premium acoustic design"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <div className="animate-bounce opacity-60">
            <svg 
              className="w-5 h-5 text-brand-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}