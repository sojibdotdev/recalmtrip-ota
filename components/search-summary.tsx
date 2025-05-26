"use client"

import { motion } from "framer-motion"
import { Calendar, Users, MapPin, Plane, Building, Wifi, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface SearchSummaryProps {
  type: "flight" | "hotel" | "esim" | "tour"
  searchData: any
}

export default function SearchSummary({ type, searchData }: SearchSummaryProps) {
  const renderFlightSummary = () => (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Plane className="w-5 h-5 text-blue-600" />
        <span className="bai-jamjuree-semibold text-gray-900">
          {searchData.from} → {searchData.to}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">
          {searchData.departDate}
          {searchData.returnDate && ` - ${searchData.returnDate}`}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Users className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">{searchData.travelers} traveler(s)</span>
      </div>
      <Badge variant="secondary">Economy</Badge>
    </div>
  )

  const renderHotelSummary = () => (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Building className="w-5 h-5 text-blue-600" />
        <span className="bai-jamjuree-semibold text-gray-900">{searchData.destination}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">
          {searchData.checkin} - {searchData.checkout}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        <Users className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">{searchData.travelers}</span>
      </div>
    </div>
  )

  const renderEsimSummary = () => (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <Wifi className="w-5 h-5 text-blue-600" />
        <span className="bai-jamjuree-semibold text-gray-900">eSIM for {searchData.destination}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">{searchData.duration}</span>
      </div>
      <Badge variant="secondary">Digital SIM</Badge>
    </div>
  )

  const renderTourSummary = () => (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <MapPin className="w-5 h-5 text-blue-600" />
        <span className="bai-jamjuree-semibold text-gray-900">Tours to {searchData.destination}</span>
      </div>
      <div className="flex items-center space-x-2">
        <Calendar className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-600">
          {searchData.startDate} - {searchData.endDate}
        </span>
      </div>
      <Badge variant="secondary">Holiday Package</Badge>
    </div>
  )

  const renderSummary = () => {
    switch (type) {
      case "flight":
        return renderFlightSummary()
      case "hotel":
        return renderHotelSummary()
      case "esim":
        return renderEsimSummary()
      case "tour":
        return renderTourSummary()
      default:
        return null
    }
  }

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">{renderSummary()}</div>
            <div className="text-sm text-gray-500 bai-jamjuree-regular">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
