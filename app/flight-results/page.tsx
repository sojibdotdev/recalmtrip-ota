"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Plane, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingSkeleton from "@/components/loading-skeleton"
import { useState, useEffect } from "react"
import SearchFilters from "@/components/search-filters"
import SearchSummary from "@/components/search-summary"

export default function FlightResults() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [saveMessage, setSaveMessage] = useState("")

  const searchData = {
    from: searchParams?.get("from") || "Dhaka",
    to: searchParams?.get("to") || "Bangkok",
    departDate: searchParams?.get("departDate") || "2024-05-30",
    returnDate: searchParams?.get("returnDate") || "2024-06-01",
    travelers: searchParams?.get("travelers") || "1",
    class: searchParams?.get("class") || "Economy",
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSaveSearch = () => {
    const searchToSave = {
      id: Date.now(),
      type: "flight",
      destination: `${searchData.from} to ${searchData.to}`,
      dates: `${searchData.departDate} - ${searchData.returnDate}`,
      travelers: `${searchData.travelers} travelers`,
      class: searchData.class,
      savedAt: new Date().toLocaleDateString(),
      searchParams: `from=${searchData.from}&to=${searchData.to}&departDate=${searchData.departDate}&returnDate=${searchData.returnDate}&travelers=${searchData.travelers}&class=${searchData.class}`,
    }

    const existingSaved = JSON.parse(localStorage.getItem("savedSearches") || "[]")
    existingSaved.push(searchToSave)
    localStorage.setItem("savedSearches", JSON.stringify(existingSaved))

    setSaveMessage("Search saved successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const flightResults = [
    {
      id: 1,
      airline: "Thai Airways",
      logo: "/placeholder.svg?height=40&width=40&text=TG",
      departure: { time: "10:30", airport: "DAC", city: "Dhaka" },
      arrival: { time: "14:45", airport: "BKK", city: "Bangkok" },
      duration: "4h 15m",
      stops: "Non-stop",
      class: searchData.class,
      offers: [
        { supplier: "Travelpayouts", price: "৳35,000", available: 8, id: "tp1" },
        { supplier: "Expedia", price: "৳36,500", available: 5, id: "exp1" },
        { supplier: "Booking.com", price: "৳34,800", available: 10, id: "bc1" },
      ],
    },
    {
      id: 2,
      airline: "Emirates",
      logo: "/placeholder.svg?height=40&width=40&text=EK",
      departure: { time: "23:45", airport: "DAC", city: "Dhaka" },
      arrival: { time: "06:30+1", airport: "BKK", city: "Bangkok" },
      duration: "8h 45m",
      stops: "1 stop in Dubai",
      class: searchData.class,
      offers: [
        { supplier: "Travelpayouts", price: "৳42,500", available: 12, id: "tp2" },
        { supplier: "Kayak", price: "৳43,200", available: 7, id: "kay1" },
        { supplier: "Skyscanner", price: "৳41,900", available: 15, id: "sky1" },
      ],
    },
    {
      id: 3,
      airline: "Malaysia Airlines",
      logo: "/placeholder.svg?height=40&width=40&text=MH",
      departure: { time: "08:15", airport: "DAC", city: "Dhaka" },
      arrival: { time: "13:30", airport: "BKK", city: "Bangkok" },
      duration: "7h 15m",
      stops: "1 stop in Kuala Lumpur",
      class: searchData.class,
      offers: [
        { supplier: "Travelpayouts", price: "৳28,900", available: 5, id: "tp3" },
        { supplier: "Momondo", price: "৳29,800", available: 8, id: "mom1" },
        { supplier: "Cheapflights", price: "৳28,500", available: 12, id: "cf1" },
      ],
    },
    {
      id: 4,
      airline: "Singapore Airlines",
      logo: "/placeholder.svg?height=40&width=40&text=SQ",
      departure: { time: "16:20", airport: "DAC", city: "Dhaka" },
      arrival: { time: "22:10", airport: "BKK", city: "Bangkok" },
      duration: "7h 50m",
      stops: "1 stop in Singapore",
      class: searchData.class,
      offers: [
        { supplier: "Travelpayouts", price: "৳38,700", available: 15, id: "tp4" },
        { supplier: "Agoda", price: "৳39,200", available: 6, id: "ago1" },
        { supplier: "Traveloka", price: "৳37,900", available: 20, id: "trav1" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Summary */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-6 mb-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <SearchSummary type="flight" searchData={searchData} />
            <div className="flex items-center space-x-4">
              {saveMessage && <span className="text-green-600 text-sm bai-jamjuree-medium">{saveMessage}</span>}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleSaveSearch}
                  className="bg-green-600 hover:bg-green-700 text-white bai-jamjuree-medium"
                  size="sm"
                >
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save Search
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Results Header */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SearchFilters type="flight" />
          </div>

          {/* Results Content */}
          <div className="flex-1">
            {/* Results Header */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-6"
            >
              <h1 className="text-2xl bai-jamjuree-bold text-gray-900">
                {loading ? "Searching flights..." : `${flightResults.length} flights found`}
              </h1>
              <div className="text-sm text-gray-500 bai-jamjuree-regular">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </motion.div>

            {/* Results */}
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {flightResults.map((flight, index) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-4 sm:p-6">
                        {/* Flight Details - Responsive Layout */}
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6 mb-4 lg:mb-6">
                          {/* Airline Info */}
                          <div className="flex items-center space-x-3 lg:w-48 flex-shrink-0">
                            <img
                              src={flight.logo || "/placeholder.svg"}
                              alt={flight.airline}
                              className="w-10 h-10 rounded"
                            />
                            <div>
                              <div className="text-sm sm:text-base bai-jamjuree-semibold text-gray-900">
                                {flight.airline}
                              </div>
                              <div className="text-xs sm:text-sm text-gray-500">{flight.class}</div>
                            </div>
                          </div>

                          {/* Flight Route - Responsive */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="text-center">
                                <div className="text-lg sm:text-xl bai-jamjuree-bold text-gray-900">
                                  {flight.departure.time}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500">{flight.departure.airport}</div>
                                <div className="text-xs text-gray-400 hidden sm:block">{flight.departure.city}</div>
                              </div>

                              <div className="flex-1 px-2 sm:px-4">
                                <div className="flex items-center justify-center space-x-2">
                                  <div className="flex-1 border-t border-gray-300"></div>
                                  <Plane className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                                  <div className="flex-1 border-t border-gray-300"></div>
                                </div>
                                <div className="text-center mt-1">
                                  <div className="text-xs text-gray-500">{flight.duration}</div>
                                  <div className="text-xs text-gray-400">{flight.stops}</div>
                                </div>
                              </div>

                              <div className="text-center">
                                <div className="text-lg sm:text-xl bai-jamjuree-bold text-gray-900">
                                  {flight.arrival.time}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500">{flight.arrival.airport}</div>
                                <div className="text-xs text-gray-400 hidden sm:block">{flight.arrival.city}</div>
                              </div>
                            </div>
                          </div>

                          {/* Best Price Preview - Mobile/Desktop */}
                          <div className="text-center lg:text-right lg:w-32 flex-shrink-0">
                            <div className="text-xs sm:text-sm text-gray-500 mb-1">Starting from</div>
                            <div className="text-xl sm:text-2xl bai-jamjuree-bold text-blue-600">
                              ৳
                              {Math.min(
                                ...flight.offers.map((offer) => Number.parseInt(offer.price.replace(/[৳,]/g, ""))),
                              ).toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">per person</div>
                          </div>
                        </div>

                        {/* Supplier Offers - Responsive Grid */}
                        <div className="border-t border-gray-200 pt-4">
                          <h3 className="text-sm bai-jamjuree-semibold text-gray-700 mb-3">Available Offers</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                            {flight.offers.map((offer) => (
                              <motion.div
                                key={offer.id}
                                whileHover={{ scale: 1.02 }}
                                className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-blue-300 transition-colors"
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs sm:text-sm bai-jamjuree-medium text-gray-700 truncate">
                                    {offer.supplier}
                                  </span>
                                  <Badge variant="secondary" className="text-xs ml-2 flex-shrink-0">
                                    {offer.available} seats
                                  </Badge>
                                </div>
                                <div className="text-lg sm:text-xl bai-jamjuree-bold text-blue-600 mb-3">
                                  {offer.price}
                                </div>
                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                  <Button className="w-full bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold text-sm">
                                    Select Flight
                                  </Button>
                                </motion.div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No Results Message */}
            {!loading && flightResults.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <Plane className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl bai-jamjuree-semibold text-gray-600 mb-2">No flights found</h2>
                <p className="text-gray-500 bai-jamjuree-regular">Try adjusting your search criteria or dates</p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
