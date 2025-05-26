"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, ChevronUp, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface FilterProps {
  type: "flight" | "hotel" | "esim" | "tour"
}

export default function SearchFilters({ type }: FilterProps) {
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [isOpen, setIsOpen] = useState({
    price: true,
    stops: true,
    airlines: true,
    times: true,
    rating: true,
    amenities: true,
    duration: true,
  })

  const toggleSection = (section: string) => {
    setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const FilterSection = ({
    title,
    children,
    sectionKey,
  }: { title: string; children: React.ReactNode; sectionKey: string }) => (
    <Collapsible open={isOpen[sectionKey]} onOpenChange={() => toggleSection(sectionKey)}>
      <CollapsibleTrigger className="flex items-center justify-between w-full p-3 hover:bg-gray-50 rounded-lg">
        <span className="bai-jamjuree-semibold text-gray-900">{title}</span>
        {isOpen[sectionKey] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-3 pb-3">{children}</CollapsibleContent>
    </Collapsible>
  )

  const renderFlightFilters = () => (
    <div className="space-y-4">
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-3">
          <Slider value={priceRange} onValueChange={setPriceRange} max={100000} step={1000} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>৳{priceRange[0].toLocaleString()}</span>
            <span>৳{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Stops" sectionKey="stops">
        <div className="space-y-2">
          {["Non-stop", "1 stop", "2+ stops"].map((stop) => (
            <div key={stop} className="flex items-center space-x-2">
              <Checkbox id={stop} />
              <label htmlFor={stop} className="text-sm text-gray-700 bai-jamjuree-regular">
                {stop}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Airlines" sectionKey="airlines">
        <div className="space-y-2">
          {["Thai Airways", "Emirates", "Malaysia Airlines", "Singapore Airlines", "Qatar Airways"].map((airline) => (
            <div key={airline} className="flex items-center space-x-2">
              <Checkbox id={airline} />
              <label htmlFor={airline} className="text-sm text-gray-700 bai-jamjuree-regular">
                {airline}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Departure Time" sectionKey="times">
        <div className="space-y-2">
          {["Early morning (6AM-12PM)", "Afternoon (12PM-6PM)", "Evening (6PM-12AM)", "Night (12AM-6AM)"].map(
            (time) => (
              <div key={time} className="flex items-center space-x-2">
                <Checkbox id={time} />
                <label htmlFor={time} className="text-sm text-gray-700 bai-jamjuree-regular">
                  {time}
                </label>
              </div>
            ),
          )}
        </div>
      </FilterSection>
    </div>
  )

  const renderHotelFilters = () => (
    <div className="space-y-4">
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-3">
          <Slider value={priceRange} onValueChange={setPriceRange} max={50000} step={500} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>৳{priceRange[0].toLocaleString()}</span>
            <span>৳{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Star Rating" sectionKey="rating">
        <div className="space-y-2">
          {["5 stars", "4 stars", "3 stars", "2 stars", "1 star"].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={rating} />
              <label htmlFor={rating} className="text-sm text-gray-700 bai-jamjuree-regular">
                {rating}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Amenities" sectionKey="amenities">
        <div className="space-y-2">
          {["Free WiFi", "Swimming Pool", "Breakfast Included", "Gym", "Spa", "Restaurant", "Parking"].map(
            (amenity) => (
              <div key={amenity} className="flex items-center space-x-2">
                <Checkbox id={amenity} />
                <label htmlFor={amenity} className="text-sm text-gray-700 bai-jamjuree-regular">
                  {amenity}
                </label>
              </div>
            ),
          )}
        </div>
      </FilterSection>

      <FilterSection title="Distance from Center" sectionKey="distance">
        <div className="space-y-2">
          {["Less than 1 km", "1-3 km", "3-5 km", "5+ km"].map((distance) => (
            <div key={distance} className="flex items-center space-x-2">
              <Checkbox id={distance} />
              <label htmlFor={distance} className="text-sm text-gray-700 bai-jamjuree-regular">
                {distance}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  const renderEsimFilters = () => (
    <div className="space-y-4">
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-3">
          <Slider value={priceRange} onValueChange={setPriceRange} max={5000} step={100} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>৳{priceRange[0]}</span>
            <span>৳{priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Data Amount" sectionKey="data">
        <div className="space-y-2">
          {["1GB", "3GB", "5GB", "10GB", "Unlimited"].map((data) => (
            <div key={data} className="flex items-center space-x-2">
              <Checkbox id={data} />
              <label htmlFor={data} className="text-sm text-gray-700 bai-jamjuree-regular">
                {data}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Duration" sectionKey="duration">
        <div className="space-y-2">
          {["1 Day", "3 Days", "7 Days", "15 Days", "30 Days"].map((duration) => (
            <div key={duration} className="flex items-center space-x-2">
              <Checkbox id={duration} />
              <label htmlFor={duration} className="text-sm text-gray-700 bai-jamjuree-regular">
                {duration}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Provider" sectionKey="provider">
        <div className="space-y-2">
          {["Airalo", "Nomad", "Holafly", "GigSky", "Ubigi"].map((provider) => (
            <div key={provider} className="flex items-center space-x-2">
              <Checkbox id={provider} />
              <label htmlFor={provider} className="text-sm text-gray-700 bai-jamjuree-regular">
                {provider}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  const renderTourFilters = () => (
    <div className="space-y-4">
      <FilterSection title="Price Range" sectionKey="price">
        <div className="space-y-3">
          <Slider value={priceRange} onValueChange={setPriceRange} max={200000} step={5000} className="w-full" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>৳{priceRange[0].toLocaleString()}</span>
            <span>৳{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </FilterSection>

      <FilterSection title="Tour Type" sectionKey="type">
        <div className="space-y-2">
          {["Adventure", "Cultural", "Family", "Romantic", "Luxury", "Budget"].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox id={type} />
              <label htmlFor={type} className="text-sm text-gray-700 bai-jamjuree-regular">
                {type}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Duration" sectionKey="duration">
        <div className="space-y-2">
          {["1-3 days", "4-7 days", "1-2 weeks", "2+ weeks"].map((duration) => (
            <div key={duration} className="flex items-center space-x-2">
              <Checkbox id={duration} />
              <label htmlFor={duration} className="text-sm text-gray-700 bai-jamjuree-regular">
                {duration}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>

      <FilterSection title="Rating" sectionKey="rating">
        <div className="space-y-2">
          {["4.5+ stars", "4.0+ stars", "3.5+ stars", "3.0+ stars"].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={rating} />
              <label htmlFor={rating} className="text-sm text-gray-700 bai-jamjuree-regular">
                {rating}
              </label>
            </div>
          ))}
        </div>
      </FilterSection>
    </div>
  )

  const renderFilters = () => {
    switch (type) {
      case "flight":
        return renderFlightFilters()
      case "hotel":
        return renderHotelFilters()
      case "esim":
        return renderEsimFilters()
      case "tour":
        return renderTourFilters()
      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full lg:w-80 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg bai-jamjuree-bold">
            <Filter className="w-5 h-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {renderFilters()}
          <div className="pt-4 border-t">
            <Button variant="outline" className="w-full bai-jamjuree-medium">
              Clear All Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
