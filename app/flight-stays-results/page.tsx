"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Plane, Building, Star, MapPin, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingSkeleton from "@/components/loading-skeleton"
import { useState, useEffect } from "react"

export default function FlightStaysResults() {
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
    destination: searchParams?.get("destination") || "Bangkok",
    checkin: searchParams?.get("checkin") || "2024-05-30",
    checkout: searchParams?.get("checkout") || "2024-06-01",
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSaveSearch = () => {
    const searchToSave = {
      id: Date.now(),
      type: "flight-stays",
      destination: `${searchData.from} to ${searchData.to} + Hotels in ${searchData.destination}`,
      dates: `${searchData.departDate} - ${searchData.returnDate}`,
      travelers: `${searchData.travelers} travelers`,
      class: searchData.class,
      savedAt: new Date().toLocaleDateString(),
      searchParams: `from=${searchData.from}&to=${searchData.to}&departDate=${searchData.departDate}&returnDate=${searchData.returnDate}&travelers=${searchData.travelers}&class=${searchData.class}&destination=${searchData.destination}&checkin=${searchData.checkin}&checkout=${searchData.checkout}`,
    }

    // Save to localStorage
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
      price: "৳35,000",
      class: searchData.class,
    },
    {
      id: 2,
      airline: "Emirates",
      logo: "/placeholder.svg?height=40&width=40&text=EK",
      departure: { time: "23:45", airport: "DAC", city: "Dhaka" },
      arrival: { time: "06:30+1", airport: "BKK", city: "Bangkok" },
      duration: "8h 45m",
      stops: "1 stop in Dubai",
      price: "৳42,500",
      class: searchData.class,
    },
  ]

  const hotelResults = [
    {
      id: 1,
      name: "Bangkok Palace Hotel",
      image: "/placeholder.svg?height=200&width=300&text=Bangkok+Hotel",
      rating: 4.5,
      reviews: 1250,
      location: "Sukhumvit, Bangkok",
      distance: "0.5 km from center",
      price: "৳8,500",
      originalPrice: "৳12,000",
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant"],
    },
    {
      id: 2,
      name: "Grand Bangkok Resort",
      image: "/placeholder.svg?height=200&width=300&text=Bangkok+Resort",
      rating: 4.3,
      reviews: 890,
      location: "Silom, Bangkok",
      distance: "1.2 km from center",
      price: "৳6,200",
      originalPrice: "৳8,500",
      amenities: ["Free WiFi", "Pool", "Gym", "Restaurant"],
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
          className="bg-gray-100 rounded-lg p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg bai-jamjuree-bold text-gray-900">Search Summary</h2>
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:divide-x lg:divide-gray-300">
            {/* Flight Summary */}
            <div className="lg:pr-6">
              <h3 className="text-lg bai-jamjuree-bold text-gray-900 mb-3 flex items-center">
                <Plane className="w-5 h-5 text-blue-600 mr-2" />
                Flight Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Route:</span>
                  <span className="bai-jamjuree-semibold">
                    {searchData.from} → {searchData.to}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dates:</span>
                  <span>
                    {searchData.departDate} - {searchData.returnDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Travelers:</span>
                  <span>{searchData.travelers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Class:</span>
                  <Badge variant="secondary">{searchData.class}</Badge>
                </div>
              </div>
            </div>

            {/* Hotel Summary */}
            <div className="lg:pl-6">
              <h3 className="text-lg bai-jamjuree-bold text-gray-900 mb-3 flex items-center">
                <Building className="w-5 h-5 text-blue-600 mr-2" />
                Hotel Details
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination:</span>
                  <span className="bai-jamjuree-semibold">{searchData.destination}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-in:</span>
                  <span>{searchData.checkin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Check-out:</span>
                  <span>{searchData.checkout}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Guests:</span>
                  <span>{searchData.travelers} guests, 1 room</span>
                </div>
              </div>
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
            {loading ? "Searching flights & hotels..." : "Flight & Hotel Packages"}
          </h1>
          <div className="text-sm text-gray-500 bai-jamjuree-regular">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </motion.div>

        {loading ? (
          <LoadingSkeleton />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Flights Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:border-r lg:border-gray-300 lg:pr-8"
            >
              <h2 className="text-2xl bai-jamjuree-bold text-gray-900 mb-6 flex items-center">
                <Plane className="w-6 h-6 text-blue-600 mr-3" />
                Available Flights
              </h2>
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {flightResults.map((flight, index) => (
                  <motion.div
                    key={flight.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={flight.logo || "/placeholder.svg"}
                              alt={flight.airline}
                              className="w-10 h-10 rounded"
                            />
                            <div>
                              <div className="bai-jamjuree-semibold text-gray-900">{flight.airline}</div>
                              <div className="text-xs text-gray-500">{flight.class}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl bai-jamjuree-bold text-blue-600">{flight.price}</div>
                            <div className="text-xs text-gray-500">per person</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                          <div className="text-center">
                            <div className="text-lg bai-jamjuree-bold">{flight.departure.time}</div>
                            <div className="text-xs text-gray-500">{flight.departure.airport}</div>
                          </div>
                          <div className="flex-1 px-4">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="flex-1 border-t border-gray-300"></div>
                              <Plane className="w-4 h-4 text-blue-600" />
                              <div className="flex-1 border-t border-gray-300"></div>
                            </div>
                            <div className="text-center text-xs text-gray-500 mt-1">{flight.duration}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg bai-jamjuree-bold">{flight.arrival.time}</div>
                            <div className="text-xs text-gray-500">{flight.arrival.airport}</div>
                          </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold">
                            Book Flight
                          </Button>
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Hotels Section */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <h2 className="text-2xl bai-jamjuree-bold text-gray-900 mb-6 flex items-center">
                <Building className="w-6 h-6 text-blue-600 mr-3" />
                Available Hotels
              </h2>
              <div className="space-y-6 max-h-96 overflow-y-auto">
                {hotelResults.map((hotel, index) => (
                  <motion.div
                    key={hotel.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white shadow-md hover:shadow-lg transition-shadow">
                      <CardContent className="p-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div className="relative">
                            <img
                              src={hotel.image || "/placeholder.svg"}
                              alt={hotel.name}
                              className="w-full h-24 object-cover rounded-lg"
                            />
                          </div>
                          <div className="col-span-2">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="text-sm bai-jamjuree-bold text-gray-900">{hotel.name}</h3>
                              <div className="flex items-center space-x-1">
                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs">{hotel.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-1 mb-2">
                              <MapPin className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-600">{hotel.location}</span>
                            </div>
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <div className="text-xs text-gray-500 line-through">{hotel.originalPrice}</div>
                                <div className="text-lg bai-jamjuree-bold text-blue-600">{hotel.price}</div>
                                <div className="text-xs text-gray-500">per night</div>
                              </div>
                            </div>
                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold">
                                Reserve Hotel
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
