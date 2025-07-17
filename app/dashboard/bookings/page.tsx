"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CreditCard, Calendar, Plane, Building } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"

export default function BookingsPage() {
  const [bookings, setBookings] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    // Mock booking data for demonstration
    setBookings([
      {
        id: 1,
        type: "flight",
        title: "Flight: Dhaka to Bangkok",
        details: "Thai Airways TG 321",
        amount: "৳35,000",
        status: "Confirmed",
        bookedOn: "May 25, 2024",
        travelDate: "May 30, 2024",
        bookingRef: "TG123456789",
      },
      {
        id: 2,
        type: "hotel",
        title: "Hotel: Sea Pearl Beach Resort",
        details: "Cox's Bazar, 3 nights",
        amount: "৳15,000",
        status: "Confirmed",
        bookedOn: "May 20, 2024",
        travelDate: "Jun 15-18, 2024",
        bookingRef: "HTL987654321",
      },
      {
        id: 3,
        type: "esim",
        title: "eSIM: Thailand Data Plan",
        details: "5GB, 7 days validity",
        amount: "৳850",
        status: "Active",
        bookedOn: "May 15, 2024",
        travelDate: "May 30, 2024",
        bookingRef: "ESM456789123",
      },
    ])
  }, [])

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "flight":
        return <Plane className="w-4 h-4 text-blue-600" />
      case "hotel":
        return <Building className="w-4 h-4 text-green-600" />
      case "esim":
        return <CreditCard className="w-4 h-4 text-purple-600" />
      default:
        return <CreditCard className="w-4 h-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "active":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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
              <h1 className="text-3xl bai-jamjuree-bold text-gray-900">My Bookings</h1>
              <p className="text-gray-600 bai-jamjuree-regular">Your travel bookings and reservations</p>
            </div>
          </div>

          {/* Bookings */}
          <Card>
            <CardHeader>
              <CardTitle className="bai-jamjuree-bold flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Bookings ({bookings.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bai-jamjuree-medium">Type</TableHead>
                        <TableHead className="bai-jamjuree-medium">Booking Details</TableHead>
                        <TableHead className="bai-jamjuree-medium">Amount</TableHead>
                        <TableHead className="bai-jamjuree-medium">Travel Date</TableHead>
                        <TableHead className="bai-jamjuree-medium">Booked On</TableHead>
                        <TableHead className="bai-jamjuree-medium">Status</TableHead>
                        <TableHead className="bai-jamjuree-medium">Reference</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking, index) => (
                        <motion.tr
                          key={booking.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="odd:bg-gray-50"
                        >
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getTypeIcon(booking.type)}
                              <Badge variant="secondary" className="capitalize">
                                {booking.type}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="bai-jamjuree-medium text-gray-900">{booking.title}</div>
                              <div className="text-sm text-gray-500">{booking.details}</div>
                            </div>
                          </TableCell>
                          <TableCell className="bai-jamjuree-semibold text-blue-600">{booking.amount}</TableCell>
                          <TableCell className="bai-jamjuree-regular">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span>{booking.travelDate}</span>
                            </div>
                          </TableCell>
                          <TableCell className="bai-jamjuree-regular">{booking.bookedOn}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                          </TableCell>
                          <TableCell className="bai-jamjuree-regular font-mono text-xs">{booking.bookingRef}</TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg bai-jamjuree-semibold text-gray-600 mb-2">No bookings yet</h3>
                  <p className="text-gray-500 bai-jamjuree-regular mb-4">
                    Start booking flights, hotels, or other travel services to see them here.
                  </p>
                  <Button
                    onClick={() => router.push("/")}
                    className="bg-blue-600 hover:bg-blue-700 text-white bai-jamjuree-medium"
                  >
                    Start Booking
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
