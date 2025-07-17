"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, Search, Calendar, Users, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"

export default function SavedSearchesPage() {
  const [savedSearches, setSavedSearches] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Load saved searches from localStorage
    const saved = localStorage.getItem("savedSearches")
    if (saved) {
      setSavedSearches(JSON.parse(saved))
    } else {
      // Mock data for demonstration
      setSavedSearches([
        {
          id: 1,
          type: "flight",
          destination: "Dhaka to Bangkok",
          dates: "May 30 - Jun 1, 2024",
          travelers: "2 travelers",
          class: "Economy",
          savedAt: "2024-05-26",
          searchParams: "from=Dhaka&to=Bangkok&departDate=2024-05-30&returnDate=2024-06-01&travelers=2&class=Economy",
        },
        {
          id: 2,
          type: "hotel",
          destination: "Cox's Bazar Hotels",
          dates: "Jun 15 - Jun 18, 2024",
          travelers: "2 guests, 1 room",
          class: null,
          savedAt: "2024-05-25",
          searchParams: "destination=Cox's Bazar&checkin=2024-06-15&checkout=2024-06-18&travelers=2",
        },
        {
          id: 3,
          type: "esim",
          destination: "Thailand eSIM",
          dates: "7 days",
          travelers: "1 device",
          class: null,
          savedAt: "2024-05-24",
          searchParams: "destination=Thailand&duration=7-days",
        },
      ])
    }
  }, [])

  const handleSearchAgain = (search: any) => {
    const baseUrl = `/${search.type}-results`
    router.push(`${baseUrl}?${search.searchParams}`)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Search className="w-4 h-4 text-blue-600" />
      case "hotel":
        return <MapPin className="w-4 h-4 text-green-600" />
      case "esim":
        return <Search className="w-4 h-4 text-purple-600" />
      default:
        return <Search className="w-4 h-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Header */}
          <div className="flex items-center mb-8">
            <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mr-4 bai-jamjuree-medium">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl bai-jamjuree-bold text-gray-900">Saved Searches</h1>
              <p className="text-gray-600 bai-jamjuree-regular">Your saved travel searches</p>
            </div>
          </div>

          {/* Saved Searches */}
          <Card>
            <CardHeader>
              <CardTitle className="bai-jamjuree-bold flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Saved Searches ({savedSearches.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {savedSearches.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bai-jamjuree-medium">Type</TableHead>
                        <TableHead className="bai-jamjuree-medium">Destination</TableHead>
                        <TableHead className="bai-jamjuree-medium">Dates</TableHead>
                        <TableHead className="bai-jamjuree-medium">Travelers</TableHead>
                        <TableHead className="bai-jamjuree-medium">Saved On</TableHead>
                        <TableHead className="bai-jamjuree-medium">Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {savedSearches.map((search, index) => (
                        <motion.tr
                          key={search.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="odd:bg-gray-50"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(search.type)}
                              <Badge variant="secondary" className="capitalize">
                                {search.type}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell className="bai-jamjuree-medium">{search.destination}</TableCell>
                          <TableCell className="bai-jamjuree-regular">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span>{search.dates}</span>
                            </div>
                          </TableCell>
                          <TableCell className="bai-jamjuree-regular">
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3 text-gray-400" />
                              <span>{search.travelers}</span>
                            </div>
                          </TableCell>
                          <TableCell className="bai-jamjuree-regular">{search.savedAt}</TableCell>
                          <TableCell>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white bai-jamjuree-medium"
                                onClick={() => handleSearchAgain(search)}
                              >
                                Search Again
                              </Button>
                            </motion.div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg bai-jamjuree-semibold text-gray-600 mb-2">No saved searches</h3>
                  <p className="text-gray-500 bai-jamjuree-regular mb-4">
                    Start searching for flights, hotels, or other travel services to save your searches here.
                  </p>
                  <Button
                    onClick={() => router.push("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white bai-jamjuree-medium"
                  >
                    Start Searching
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
