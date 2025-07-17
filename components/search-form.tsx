"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Calendar, Plane, Building, Wifi, MapPin } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchForm() {
  const [activeTab, setActiveTab] = useState("flights")
  const router = useRouter()

  // Flight search state
  const [flightForm, setFlightForm] = useState({
    from: "",
    to: "",
    departDate: "",
    returnDate: "",
    travelers: "1",
    class: "Economy",
  })

  // Hotel search state
  const [hotelForm, setHotelForm] = useState({
    destination: "",
    checkin: "",
    checkout: "",
    travelers: "2 travelers, 1 room",
  })

  // eSIM search state
  const [esimForm, setEsimForm] = useState({
    destination: "",
    duration: "",
  })

  // Tour search state
  const [tourForm, setTourForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
  })

  const handleFlightSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      from: flightForm.from,
      to: flightForm.to,
      departDate: flightForm.departDate,
      returnDate: flightForm.returnDate,
      travelers: flightForm.travelers,
      class: flightForm.class,
    })
    router.push(`/flight-results?${params.toString()}`)
  }

  const handleHotelSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      destination: hotelForm.destination,
      checkin: hotelForm.checkin,
      checkout: hotelForm.checkout,
      travelers: hotelForm.travelers,
    })
    router.push(`/hotel-results?${params.toString()}`)
  }

  const handleEsimSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      destination: esimForm.destination,
      duration: esimForm.duration,
    })
    router.push(`/esim-results?${params.toString()}`)
  }

  const handleTourSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      destination: tourForm.destination,
      startDate: tourForm.startDate,
      endDate: tourForm.endDate,
    })
    router.push(`/tour-results?${params.toString()}`)
  }

  const handleFlightStaysSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      from: flightForm.from,
      to: flightForm.to,
      departDate: flightForm.departDate,
      returnDate: flightForm.returnDate,
      travelers: flightForm.travelers,
      class: flightForm.class,
      destination: flightForm.to, // Use 'to' as hotel destination
      checkin: flightForm.departDate,
      checkout: flightForm.returnDate,
    })
    router.push(`/flight-stays-results?${params.toString()}`)
  }

  return (
    <div className="bg-blue-600 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-white/10 backdrop-blur-sm">
            <TabsTrigger
              value="flights"
              className="flex items-center space-x-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <Plane className="w-4 h-4" />
              <span className="bai-jamjuree-medium">Flights</span>
            </TabsTrigger>
            <TabsTrigger
              value="hotels"
              className="flex items-center space-x-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <Building className="w-4 h-4" />
              <span className="bai-jamjuree-medium">Hotels</span>
            </TabsTrigger>
            <TabsTrigger
              value="esim"
              className="flex items-center space-x-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <Wifi className="w-4 h-4" />
              <span className="bai-jamjuree-medium">eSIM</span>
            </TabsTrigger>
            <TabsTrigger
              value="tours"
              className="flex items-center space-x-2 text-white data-[state=active]:bg-white data-[state=active]:text-blue-600"
            >
              <MapPin className="w-4 h-4" />
              <span className="bai-jamjuree-medium">Tour Package</span>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="flights" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <form onSubmit={handleFlightSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Leaving from</label>
                      <Input
                        placeholder="Dhaka (DAC)"
                        className="bai-jamjuree-regular"
                        value={flightForm.from}
                        onChange={(e) => setFlightForm({ ...flightForm, from: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Going to</label>
                      <Input
                        placeholder="Bangkok (BKK)"
                        className="bai-jamjuree-regular"
                        value={flightForm.to}
                        onChange={(e) => setFlightForm({ ...flightForm, to: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Departing</label>
                      <div className="relative">
                        <Input
                          type="date"
                          className="bai-jamjuree-regular"
                          value={flightForm.departDate}
                          onChange={(e) => setFlightForm({ ...flightForm, departDate: e.target.value })}
                          required
                        />
                        <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Returning</label>
                      <div className="relative">
                        <Input
                          type="date"
                          className="bai-jamjuree-regular"
                          value={flightForm.returnDate}
                          onChange={(e) => setFlightForm({ ...flightForm, returnDate: e.target.value })}
                        />
                        <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Travelers</label>
                      <Select
                        value={flightForm.travelers}
                        onValueChange={(value) => setFlightForm({ ...flightForm, travelers: value })}
                      >
                        <SelectTrigger className="bai-jamjuree-regular">
                          <SelectValue placeholder="1 traveler" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 traveler</SelectItem>
                          <SelectItem value="2">2 travelers</SelectItem>
                          <SelectItem value="3">3 travelers</SelectItem>
                          <SelectItem value="4">4 travelers</SelectItem>
                          <SelectItem value="5+">5+ travelers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Class</label>
                      <Select
                        value={flightForm.class}
                        onValueChange={(value) => setFlightForm({ ...flightForm, class: value })}
                      >
                        <SelectTrigger className="bai-jamjuree-regular">
                          <SelectValue placeholder="Economy" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Economy">Economy</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 mt-6">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 bai-jamjuree-semibold"
                      >
                        Search
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        type="button"
                        variant="outline"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black border-yellow-400 px-6 py-3 bai-jamjuree-semibold"
                        onClick={handleFlightStaysSearch}
                      >
                        Search Flight & Stays
                      </Button>
                    </motion.div>
                  </div>
                </form>
              </motion.div>
            </TabsContent>

            <TabsContent value="hotels" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <form onSubmit={handleHotelSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Where</label>
                      <Input
                        placeholder="Cox's Bazar"
                        className="bai-jamjuree-regular"
                        value={hotelForm.destination}
                        onChange={(e) => setHotelForm({ ...hotelForm, destination: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Check-in</label>
                      <div className="relative">
                        <Input
                          type="date"
                          className="bai-jamjuree-regular"
                          value={hotelForm.checkin}
                          onChange={(e) => setHotelForm({ ...hotelForm, checkin: e.target.value })}
                          required
                        />
                        <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Check-out</label>
                      <div className="relative">
                        <Input
                          type="date"
                          className="bai-jamjuree-regular"
                          value={hotelForm.checkout}
                          onChange={(e) => setHotelForm({ ...hotelForm, checkout: e.target.value })}
                          required
                        />
                        <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Travelers</label>
                      <Select
                        value={hotelForm.travelers}
                        onValueChange={(value) => setHotelForm({ ...hotelForm, travelers: value })}
                      >
                        <SelectTrigger className="bai-jamjuree-regular">
                          <SelectValue placeholder="2 travelers, 1 room" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1 traveler, 1 room">1 traveler, 1 room</SelectItem>
                          <SelectItem value="2 travelers, 1 room">2 travelers, 1 room</SelectItem>
                          <SelectItem value="3 travelers, 1 room">3 travelers, 1 room</SelectItem>
                          <SelectItem value="4 travelers, 2 rooms">4 travelers, 2 rooms</SelectItem>
                          <SelectItem value="5+ travelers, 2+ rooms">5+ travelers, 2+ rooms</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6">
                    <Button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 bai-jamjuree-semibold"
                    >
                      Search
                    </Button>
                  </motion.div>
                </form>
              </motion.div>
            </TabsContent>

            <TabsContent value="esim" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <form onSubmit={handleEsimSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Destination</label>
                      <Input
                        placeholder="Thailand"
                        className="bai-jamjuree-regular"
                        value={esimForm.destination}
                        onChange={(e) => setEsimForm({ ...esimForm, destination: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Duration</label>
                      <Select
                        value={esimForm.duration}
                        onValueChange={(value) => setEsimForm({ ...esimForm, duration: value })}
                      >
                        <SelectTrigger className="bai-jamjuree-regular">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-day">1 Day</SelectItem>
                          <SelectItem value="3-days">3 Days</SelectItem>
                          <SelectItem value="7-days">7 Days</SelectItem>
                          <SelectItem value="15-days">15 Days</SelectItem>
                          <SelectItem value="30-days">30 Days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-end">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 bai-jamjuree-semibold w-full"
                        >
                          Search eSIM
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </form>
              </motion.div>
            </TabsContent>

            <TabsContent value="tours" className="mt-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <form onSubmit={handleTourSearch}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Destination</label>
                      <Input
                        placeholder="Maldives"
                        className="bai-jamjuree-regular"
                        value={tourForm.destination}
                        onChange={(e) => setTourForm({ ...tourForm, destination: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Start Date</label>
                      <div className="relative">
                        <Input
                          type="date"
                          className="bai-jamjuree-regular"
                          value={tourForm.startDate}
                          onChange={(e) => setTourForm({ ...tourForm, startDate: e.target.value })}
                          required
                        />
                        <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm bai-jamjuree-medium text-gray-700">End Date</label>
                      <div className="relative">
                        <Input
                          type="date"
                          className="bai-jamjuree-regular"
                          value={tourForm.endDate}
                          onChange={(e) => setTourForm({ ...tourForm, endDate: e.target.value })}
                          required
                        />
                        <Calendar className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 bai-jamjuree-semibold w-full"
                        >
                          Search Tour
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </form>
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </div>
    </div>
  )
}
