"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Building, Star, Wifi, Car, Coffee, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingSkeleton from "@/components/loading-skeleton"
import { useState, useEffect } from "react"
import SearchFilters from "@/components/search-filters"
import SearchSummary from "@/components/search-summary"

export default function HotelResults() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [saveMessage, setSaveMessage] = useState("")

  const searchData = {
    destination: searchParams?.get("destination") || "Cox's Bazar",
    checkin: searchParams?.get("checkin") || "2024-05-30",
    checkout: searchParams?.get("checkout") || "2024-06-01",
    travelers: searchParams?.get("travelers") || "2 travelers, 1 room",
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSaveSearch = () => {
    const searchToSave = {
      id: Date.now(),
      type: "hotel",
      destination: `Hotels in ${searchData.destination}`,
      dates: `${searchData.checkin} - ${searchData.checkout}`,
      travelers: searchData.travelers,
      class: null,
      savedAt: new Date().toLocaleDateString(),
      searchParams: `destination=${searchData.destination}&checkin=${searchData.checkin}&checkout=${searchData.checkout}&travelers=${searchData.travelers}`,
    }

    const existingSaved = JSON.parse(localStorage.getItem("savedSearches") || "[]")
    existingSaved.push(searchToSave)
    localStorage.setItem("savedSearches", JSON.stringify(existingSaved))

    setSaveMessage("Search saved successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const hotelResults = [
    {
      id: 1,
      name: "Sea Pearl Beach Resort & Spa",
      image: "/placeholder.svg?height=200&width=300&text=Beach+Resort",
      rating: 4.2,
      reviews: 1250,
      location: "Cox's Bazar Beach, Bangladesh",
      distance: "0.2 km from beach",
      price: "৳5,000",
      originalPrice: "৳7,500",
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant"],
      features: ["Beach Access", "Family Friendly"],
    },
    {
      id: 2,
      name: "Royal Tulip Sea Pearl Beach Resort",
      image: "/placeholder.svg?height=200&width=300&text=Royal+Resort",
      rating: 4.5,
      reviews: 890,
      location: "Inani Beach, Cox's Bazar",
      distance: "15 km from center",
      price: "৳6,800",
      originalPrice: "৳9,500",
      amenities: ["Free WiFi", "Pool", "Gym", "Spa"],
      features: ["Private Beach", "Luxury"],
    },
    {
      id: 3,
      name: "Long Beach Hotel",
      image: "/placeholder.svg?height=200&width=300&text=Beach+Hotel",
      rating: 4.0,
      reviews: 567,
      location: "Cox's Bazar Beach Road",
      distance: "0.5 km from beach",
      price: "৳3,200",
      originalPrice: "৳4,800",
      amenities: ["Free WiFi", "Restaurant", "AC"],
      features: ["Budget Friendly", "City Center"],
    },
    {
      id: 4,
      name: "Praasad Paradise Hotel & Resort",
      image: "/placeholder.svg?height=200&width=300&text=Paradise+Resort",
      rating: 4.3,
      reviews: 723,
      location: "Kolatoli Beach, Cox's Bazar",
      distance: "1.2 km from center",
      price: "৳4,500",
      originalPrice: "৳6,000",
      amenities: ["Free WiFi", "Pool", "Restaurant", "Parking"],
      features: ["Family Resort", "Pool Access"],
    },
  ]

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "free wifi":
        return <Wifi className="w-4 h-4" />
      case "parking":
        return <Car className="w-4 h-4" />
      case "restaurant":
        return <Coffee className="w-4 h-4" />
      default:
        return <Building className="w-4 h-4" />
    }
  }

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
            <SearchSummary type="hotel" searchData={searchData} />
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <h1 className="text-2xl bai-jamjuree-bold text-gray-900">
            {loading ? "Searching hotels..." : `${hotelResults.length} hotels found`}
          </h1>
          <div className="text-sm text-gray-500 bai-jamjuree-regular">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SearchFilters type="hotel" />
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
                {hotelResults.map((hotel, index) => (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-0">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-0">
                          {/* Hotel Image */}
                          <div className="relative">
                            <img
                              src={hotel.image || "/placeholder.svg"}
                              alt={hotel.name}
                              className="w-full h-48 lg:h-64 object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-t-none"
                            />
                            <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-sm bai-jamjuree-semibold">
                              Save 33%
                            </div>
                          </div>

                          {/* Hotel Details */}
                          <div className="lg:col-span-2 p-6">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-xl bai-jamjuree-bold text-gray-900">{hotel.name}</h3>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="text-sm bai-jamjuree-medium">{hotel.rating}</span>
                                <span className="text-sm text-gray-500">({hotel.reviews})</span>
                              </div>
                            </div>

                            <p className="text-gray-600 bai-jamjuree-regular mb-1">{hotel.location}</p>
                            <p className="text-sm text-gray-500 bai-jamjuree-regular mb-4">{hotel.distance}</p>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {hotel.features.map((feature, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>

                            {/* Amenities */}
                            <div className="flex flex-wrap gap-3">
                              {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                                <div key={idx} className="flex items-center space-x-1 text-sm text-gray-600">
                                  {getAmenityIcon(amenity)}
                                  <span>{amenity}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Price and Book */}
                          <div className="p-6 lg:text-right border-t lg:border-t-0 lg:border-l">
                            <div className="mb-4">
                              <div className="text-sm text-gray-500 line-through">{hotel.originalPrice}</div>
                              <div className="text-2xl bai-jamjuree-bold text-blue-600">{hotel.price}</div>
                              <div className="text-xs text-gray-500">per night</div>
                            </div>

                            <div className="text-xs text-blue-600 bai-jamjuree-semibold mb-4">
                              Sign in for Member Price
                            </div>

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold mb-2">
                                View Deal
                              </Button>
                            </motion.div>

                            <Button variant="outline" className="w-full text-sm bai-jamjuree-medium">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No Results Message */}
            {!loading && hotelResults.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                <Building className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl bai-jamjuree-semibold text-gray-600 mb-2">No hotels found</h2>
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
