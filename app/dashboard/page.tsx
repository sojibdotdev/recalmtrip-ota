"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, Calendar, LogOut, Search, Bookmark, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    setUser(JSON.parse(userData))
    setLoading(false)
  }, [router])

  const handleLogout = () => {
    // Clear session
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    localStorage.removeItem("user")
    router.push("/")
  }

  // Mock activity data
  const recentActivity = [
    {
      id: 1,
      type: "Flight Search",
      details: "Dhaka to Bangkok",
      date: "2024-05-26",
      status: "Completed",
    },
    {
      id: 2,
      type: "Hotel Search",
      details: "Cox's Bazar Hotels",
      date: "2024-05-25",
      status: "Completed",
    },
    {
      id: 3,
      type: "eSIM Search",
      details: "Thailand eSIM",
      date: "2024-05-24",
      status: "Completed",
    },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 bai-jamjuree-regular">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Welcome Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl bai-jamjuree-bold text-gray-900">Welcome back, {user.name}!</h1>
              <p className="text-gray-600 bai-jamjuree-regular">Manage your travel preferences and bookings</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={handleLogout} className="bai-jamjuree-medium">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Actions - Moved to Top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 lg:row-span-1"
            >
              <Card className="bg-gray-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="bai-jamjuree-bold text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white bai-jamjuree-medium py-3"
                        onClick={() => router.push("/")}
                      >
                        <Search className="w-4 h-4 mr-2" />
                        Search Flights
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white bai-jamjuree-medium py-3"
                        onClick={() => router.push("/dashboard/saved")}
                      >
                        <Bookmark className="w-4 h-4 mr-2" />
                        View Saved
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white bai-jamjuree-medium py-3"
                        onClick={() => router.push("/dashboard/bookings")}
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        My Bookings
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white bai-jamjuree-medium py-3"
                        onClick={() => router.push("/dashboard/settings")}
                      >
                        <User className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Profile Information - Moved Below Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-1 lg:row-span-1"
            >
              <Card className="bg-white border border-gray-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 bai-jamjuree-bold">
                    <User className="w-5 h-5" />
                    <span>Profile Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="bai-jamjuree-semibold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">Traveler</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 bai-jamjuree-regular">{user.email}</span>
                    </div>
                    {user.phone && (
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600 bai-jamjuree-regular">{user.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 bai-jamjuree-regular">
                        Member since {new Date(user.registrationDate || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bai-jamjuree-medium">
                    Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-1 lg:row-span-2"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Search className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl bai-jamjuree-bold text-gray-900">12</div>
                    <div className="text-sm text-gray-600">Total Searches</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <Bookmark className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl bai-jamjuree-bold text-gray-900">3</div>
                    <div className="text-sm text-gray-600">Saved Trips</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <CreditCard className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <div className="text-2xl bai-jamjuree-bold text-gray-900">1</div>
                    <div className="text-sm text-gray-600">Bookings</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="bai-jamjuree-bold">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bai-jamjuree-medium">Type</TableHead>
                        <TableHead className="bai-jamjuree-medium">Details</TableHead>
                        <TableHead className="bai-jamjuree-medium">Date</TableHead>
                        <TableHead className="bai-jamjuree-medium">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentActivity.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="bai-jamjuree-medium">{activity.type}</TableCell>
                          <TableCell className="bai-jamjuree-regular">{activity.details}</TableCell>
                          <TableCell className="bai-jamjuree-regular">{activity.date}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{activity.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
