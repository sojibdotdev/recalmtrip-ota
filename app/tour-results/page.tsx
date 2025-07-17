"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { MapPin, Star, Clock, Camera, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingSkeleton from "@/components/loading-skeleton"
import { useState, useEffect } from "react"
import SearchFilters from "@/components/search-filters"
import SearchSummary from "@/components/search-summary"

export default function TourResults() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [saveMessage, setSaveMessage] = useState("")

  const searchData = {
    destination: searchParams?.get("destination") || "Maldives",
    startDate: searchParams?.get("startDate") || "2024-05-30",
    endDate: searchParams?.get("endDate") || "2024-06-05",
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSaveSearch = () => {
    const searchToSave = {
      id: Date.now(),
      type: "tour",
      destination: `Tours to ${searchData.destination}`,
      dates: `${searchData.startDate} - ${searchData.endDate}`,
      travelers: "Tour package",
      class: null,
      savedAt: new Date().toLocaleDateString(),
      searchParams: `destination=${searchData.destination}&startDate=${searchData.startDate}&endDate=${searchData.endDate}`,
    }

    const existingSaved = JSON.parse(localStorage.getItem("savedSearches") || "[]")
    existingSaved.push(searchToSave)
    localStorage.setItem("savedSearches", JSON.stringify(existingSaved))

    setSaveMessage("Search saved successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const tourResults = [
    {
      id: 1,
      name: "Maldives Paradise Escape",
      image: "/placeholder.svg?height=200&width=300&text=Maldives+Resort",
      duration: "5 Days 4 Nights",
      rating: 4.8,
      reviews: 892,
      location: "Male, Maldives",
      price: "৳85,000",
      originalPrice: "৳120,000",
      highlights: ["Water Villa", "All Meals", "Seaplane Transfer", "Spa Treatment"],
      includes: ["Accommodation", "Meals", "Transfers", "Activities"],
      tourType: "Luxury Beach",
      groupSize: "2-8 people",
    },
    {
      id: 2,
      name: "Maldives Coral Discovery",
      image: "/placeholder.svg?height=200&width=300&text=Coral+Reef",
      duration: "6 Days 5 Nights",
      rating: 4.6,
      reviews: 654,
      location: "Ari Atoll, Maldives",
      price: "৳65,000",
      originalPrice: "৳90,000",
      highlights: ["Snorkeling", "Dolphin Watching", "Island Hopping", "Local Culture"],
      includes: ["Accommodation", "Breakfast", "Boat Transfers", "Guide"],
      tourType: "Adventure",
      groupSize: "4-12 people",
    },
    {
      id: 3,
      name: "Maldives Honeymoon Special",
      image: "/placeholder.svg?height=200&width=300&text=Romantic+Villa",
      duration: "7 Days 6 Nights",
      rating: 4.9,
      reviews: 445,
      location: "Baa Atoll, Maldives",
      price: "৳125,000",
      originalPrice: "৳180,000",
      highlights: ["Private Villa", "Couples Spa", "Sunset Cruise", "Fine Dining"],
      includes: ["Luxury Accommodation", "All Meals", "Private Butler", "Transfers"],
      tourType: "Romantic",
      groupSize: "2 people",
    },
    {
      id: 4,
      name: "Maldives Family Fun",
      image: "/placeholder.svg?height=200&width=300&text=Family+Resort",
      duration: "4 Days 3 Nights",
      rating: 4.4,
      reviews: 321,
      location: "North Male Atoll",
      price: "৳55,000",
      originalPrice: "৳75,000",
      highlights: ["Kids Club", "Family Activities", "Beach Games", "Cultural Show"],
      includes: ["Family Rooms", "Meals", "Activities", "Transfers"],
      tourType: "Family",
      groupSize: "2-6 people",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Summary */}
        <SearchSummary type="tour" searchData={searchData} />

        {/* Add save button after SearchSummary */}
        <div className="flex items-center justify-end mb-4">
          {saveMessage && <span className="text-green-600 text-sm bai-jamjuree-medium mr-4">{saveMessage}</span>}
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

        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <h1 className="text-2xl bai-jamjuree-bold text-gray-900">
            {loading ? "Finding tour packages..." : `${tourResults.length} tour packages available`}
          </h1>
          <div className="text-sm text-gray-500 bai-jamjuree-regular">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SearchFilters type="tour" />
          </div>

          {/* Results Content */}
          <div className="flex-1">
            {loading ? (
              <LoadingSkeleton />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-6"
              >
                {tourResults.map((tour, index) => (
                  <motion.div
                    key={tour.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                          {/* Tour Image */}
                          <div className="relative">
                            <img
                              src={tour.image || "/placeholder.svg"}
                              alt={tour.name}
                              className="w-full h-48 lg:h-64 object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
                            />
                            <div className="absolute top-3 left-3">
                              <Badge className="bg-green-500 text-white">{tour.tourType}</Badge>
                            </div>
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-sm bai-jamjuree-semibold">
                              30% OFF
                            </div>
                            <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-sm">
                              <Clock className="w-3 h-3 inline mr-1" />
                              {tour.duration}
                            </div>
                          </div>

                          {/* Tour Details */}
                          <div className="lg:col-span-2 p-6">
                            <div className="flex items-start justify-between mb-3">
                              <h3 className="text-xl bai-jamjuree-bold text-gray-900">{tour.name}</h3>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm bai-jamjuree-medium">{tour.rating}</span>
                                <span className="text-sm text-gray-500">({tour.reviews})</span>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{tour.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span>{tour.groupSize}</span>
                              </div>
                            </div>

                            {/* Highlights */}
                            <div className="mb-4">
                              <h4 className="text-sm bai-jamjuree-semibold text-gray-900 mb-2">Tour Highlights</h4>
                              <div className="flex flex-wrap gap-2">
                                {tour.highlights.map((highlight, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    <Camera className="w-3 h-3 mr-1" />
                                    {highlight}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            {/* Includes */}
                            <div>
                              <h4 className="text-sm bai-jamjuree-semibold text-gray-900 mb-2">Package Includes</h4>
                              <div className="grid grid-cols-2 gap-1 text-xs text-gray-600">
                                {tour.includes.map((item, idx) => (
                                  <div key={idx} className="flex items-center space-x-1">
                                    <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Price and Book */}
                          <div className="p-6 lg:text-right border-t lg:border-t-0 lg:border-l">
                            <div className="mb-4">
                              <div className="text-sm text-gray-500 line-through">{tour.originalPrice}</div>
                              <div className="text-2xl bai-jamjuree-bold text-blue-600">{tour.price}</div>
                              <div className="text-xs text-gray-500">per person</div>
                            </div>

                            <div className="text-xs text-green-600 bai-jamjuree-semibold mb-4">
                              ✓ Best Price Guarantee
                            </div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold mb-2">
                                Book Now
                              </Button>
                            </motion.div>

                            <Button variant="outline" className="w-full text-sm bai-jamjuree-medium">
                              View Itinerary
                            </Button>

                            <div className="text-xs text-gray-500 mt-2 text-center">Free cancellation up to 24h</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No Results Message */}
            {!loading && tourResults.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl bai-jamjuree-semibold text-gray-600 mb-2">No tour packages found</h2>
                <p className="text-gray-500 bai-jamjuree-regular">Try selecting a different destination or dates</p>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
