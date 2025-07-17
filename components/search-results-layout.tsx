"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SearchFilters from "@/components/search-filters"
import SearchSummary from "@/components/search-summary"

interface SearchResultsLayoutProps {
  children: React.ReactNode
  filterType: "flight" | "hotel" | "esim" | "tour"
  searchData: any
  resultsCount: number
  loading: boolean
}

export default function SearchResultsLayout({
  children,
  filterType,
  searchData,
  resultsCount,
  loading,
}: SearchResultsLayoutProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Summary */}
      <SearchSummary type={filterType} searchData={searchData} />

      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-4">
        <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" className="w-full bai-jamjuree-medium">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SearchFilters type={filterType} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-6"
      >
        <h1 className="text-2xl bai-jamjuree-bold text-gray-900">
          {loading ? `Searching ${filterType}s...` : `${resultsCount} ${filterType}s found`}
        </h1>
        <div className="text-sm text-gray-500 bai-jamjuree-regular">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Desktop Filters Sidebar */}
        <div className="hidden lg:block lg:w-80 flex-shrink-0">
          <SearchFilters type={filterType} />
        </div>

        {/* Results Content */}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}
