"use client"

import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Wifi, Smartphone, CheckCircle, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingSkeleton from "@/components/loading-skeleton"
import { useState, useEffect } from "react"
import SearchFilters from "@/components/search-filters"
import SearchSummary from "@/components/search-summary"

export default function EsimResults() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [saveMessage, setSaveMessage] = useState("")

  const searchData = {
    destination: searchParams?.get("destination") || "Thailand",
    duration: searchParams?.get("duration") || "7-days",
  }

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleSaveSearch = () => {
    const searchToSave = {
      id: Date.now(),
      type: "esim",
      destination: `eSIM for ${searchData.destination}`,
      dates: searchData.duration,
      travelers: "1 device",
      class: null,
      savedAt: new Date().toLocaleDateString(),
      searchParams: `destination=${searchData.destination}&duration=${searchData.duration}`,
    }

    const existingSaved = JSON.parse(localStorage.getItem("savedSearches") || "[]")
    existingSaved.push(searchToSave)
    localStorage.setItem("savedSearches", JSON.stringify(existingSaved))

    setSaveMessage("Search saved successfully!")
    setTimeout(() => setSaveMessage(""), 3000)
  }

  const esimResults = [
    {
      id: 1,
      provider: "Airalo",
      name: "Thailand Discovery",
      coverage: "Thailand",
      data: "5GB",
      validity: "7 Days",
      price: "৳850",
      originalPrice: "৳1,200",
      features: ["No Roaming Charges", "Instant Activation", "24/7 Support"],
      network: "AIS, DTAC, TrueMove",
      rating: 4.8,
      reviews: 2340,
    },
    {
      id: 2,
      provider: "Nomad",
      name: "Thailand Explorer",
      coverage: "Thailand",
      data: "10GB",
      validity: "15 Days",
      price: "৳1,450",
      originalPrice: "৳1,800",
      features: ["High Speed 4G/5G", "Hotspot Enabled", "Easy Setup"],
      network: "AIS, TrueMove H",
      rating: 4.7,
      reviews: 1890,
    },
    {
      id: 3,
      provider: "Holafly",
      name: "Thailand Unlimited",
      coverage: "Thailand",
      data: "Unlimited",
      validity: "7 Days",
      price: "৳1,650",
      originalPrice: "৳2,100",
      features: ["Unlimited Data", "No Speed Limits", "Premium Support"],
      network: "AIS Premium",
      rating: 4.9,
      reviews: 3120,
    },
    {
      id: 4,
      provider: "GigSky",
      name: "Thailand Traveler",
      coverage: "Thailand + Roaming",
      data: "3GB",
      validity: "30 Days",
      price: "৳1,200",
      originalPrice: "৳1,500",
      features: ["Regional Roaming", "Voice Calls", "SMS Included"],
      network: "DTAC, TrueMove",
      rating: 4.5,
      reviews: 980,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Summary */}
        <SearchSummary type="esim" searchData={searchData} />

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

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
        >
          <div className="flex items-start space-x-3">
            <Smartphone className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="text-sm bai-jamjuree-semibold text-blue-900 mb-1">What is an eSIM?</h3>
              <p className="text-sm text-blue-700 bai-jamjuree-regular">
                An eSIM is a digital SIM that allows you to activate a mobile plan without a physical SIM card. Perfect
                for travelers to stay connected abroad without roaming charges.
              </p>
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
            {loading ? "Finding eSIM plans..." : `${esimResults.length} eSIM plans available`}
          </h1>
          <div className="text-sm text-gray-500 bai-jamjuree-regular">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </motion.div>

        {/* Results */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <SearchFilters type="esim" />
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
                className="space-y-4"
              >
                {esimResults.map((esim, index) => (
                  <motion.div
                    key={esim.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                          {/* Provider Info */}
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Wifi className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <div className="bai-jamjuree-semibold text-gray-900">{esim.provider}</div>
                              <div className="text-sm text-gray-500">{esim.name}</div>
                              <div className="text-xs text-gray-400">
                                Rating: {esim.rating} ({esim.reviews})
                              </div>
                            </div>
                          </div>

                          {/* Plan Details */}
                          <div className="lg:col-span-2">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-sm text-gray-500">Data</div>
                                <div className="bai-jamjuree-semibold text-gray-900">{esim.data}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Validity</div>
                                <div className="bai-jamjuree-semibold text-gray-900">{esim.validity}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Coverage</div>
                                <div className="bai-jamjuree-semibold text-gray-900">{esim.coverage}</div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Network</div>
                                <div className="text-xs text-gray-600">{esim.network}</div>
                              </div>
                            </div>

                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mt-3">
                              {esim.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center space-x-1 text-xs text-green-600">
                                  <CheckCircle className="w-3 h-3" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Price and Buy */}
                          <div className="text-center lg:text-right">
                            <div className="text-sm text-gray-500 line-through mb-1">{esim.originalPrice}</div>
                            <div className="text-2xl bai-jamjuree-bold text-blue-600 mb-1">{esim.price}</div>
                            <div className="text-xs text-gray-500 mb-3">one-time</div>
                            <Badge variant="secondary" className="mb-3">
                              Instant Delivery
                            </Badge>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button className="w-full bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold">
                                Buy eSIM
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Setup Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gray-100 rounded-lg p-6 mt-8"
        >
          <h3 className="text-lg bai-jamjuree-bold text-gray-900 mb-4">How to setup your eSIM</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-lg bai-jamjuree-bold">
                1
              </div>
              <h4 className="bai-jamjuree-semibold text-gray-900 mb-1">Purchase</h4>
              <p className="text-sm text-gray-600">Buy your eSIM plan online</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-lg bai-jamjuree-bold">
                2
              </div>
              <h4 className="bai-jamjuree-semibold text-gray-900 mb-1">Install</h4>
              <p className="text-sm text-gray-600">Scan QR code to install eSIM</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-lg bai-jamjuree-bold">
                3
              </div>
              <h4 className="bai-jamjuree-semibold text-gray-900 mb-1">Activate</h4>
              <p className="text-sm text-gray-600">Activate when you arrive at your destination</p>
            </div>
          </div>
        </motion.div>

        {/* No Results Message */}
        {!loading && esimResults.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <Wifi className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl bai-jamjuree-semibold text-gray-600 mb-2">No eSIM plans found</h2>
            <p className="text-gray-500 bai-jamjuree-regular">Try selecting a different destination or duration</p>
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  )
}
