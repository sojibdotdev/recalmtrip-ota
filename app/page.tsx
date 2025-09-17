import Header from "@/components/header"
import SearchForm from "@/components/search-form"
import HeroSection from "@/components/hero-section"
import PromotionalBanners from "@/components/promotional-banners"
import FlightDeals from "@/components/flight-deals"
import HotelRecommendations from "@/components/hotel-recommendations"
import LastMinuteDeals from "@/components/last-minute-deals"
import UniqueStays from "@/components/unique-stays"
import Footer from "@/components/footer"
import RegistrationPopup from "@/components/registration-popup"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-white">
        <SearchForm />
        <HeroSection />
        <PromotionalBanners />
        <FlightDeals />
        <HotelRecommendations />
        <LastMinuteDeals />
        <UniqueStays />
      </main>
      <Footer />
      <RegistrationPopup />
    </div>
  )
}
