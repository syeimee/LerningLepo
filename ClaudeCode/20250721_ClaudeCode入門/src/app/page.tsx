import HeroSection from '@/components/HeroSection'
import FeaturedGuitars from '@/components/FeaturedGuitars'
import GuitarCategories from '@/components/GuitarCategories'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <FeaturedGuitars />
      <GuitarCategories />
      <ContactSection />
      <Footer />
    </main>
  )
}