"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Mail, Phone, Calendar, LogOut, Edit, Save, X, Search, Bookmark, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [editMode, setEditMode] = useState(false)
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (!userData) {
      router.push("/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setEditForm({
      name: parsedUser.name || "",
      email: parsedUser.email || "",
      phone: parsedUser.phone || "",
    })
    setLoading(false)
  }, [router])

  const handleSave = async () => {
    setSaving(true)
    setMessage("")

    // Simulate API call
    setTimeout(() => {
      const updatedUser = {
        ...user,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        lastUpdated: new Date().toISOString(),
      }

      // Update localStorage
      localStorage.setItem("user", JSON.stringify(updatedUser))

      // Update users list if exists
      const users = JSON.parse(localStorage.getItem("users") || "[]")
      const userIndex = users.findIndex((u: any) => u.id === user.id)
      if (userIndex !== -1) {
        users[userIndex] = updatedUser
        localStorage.setItem("users", JSON.stringify(users))
      }

      setUser(updatedUser)
      setEditMode(false)
      setMessage("Profile updated successfully!")
      setSaving(false)

      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000)
    }, 1000)
  }

  const handleCancel = () => {
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
    })
    setEditMode(false)
    setMessage("")
  }

  const handleLogout = () => {
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    localStorage.removeItem("user")
    router.push("/")
  }

  // Mock search history
  const searchHistory = [
    { id: 1, type: "Flight", query: "Dhaka to Bangkok", date: "2024-05-26", status: "Completed" },
    { id: 2, type: "Hotel", query: "Cox's Bazar Hotels", date: "2024-05-25", status: "Completed" },
    { id: 3, type: "eSIM", query: "Thailand eSIM", date: "2024-05-24", status: "Completed" },
    { id: 4, type: "Tour", query: "Maldives Tours", date: "2024-05-23", status: "Completed" },
  ]

  // Mock booking history
  const bookingHistory = [
    { id: 1, type: "Flight", details: "DAC → BKK", date: "2024-06-01", amount: "৳35,000", status: "Confirmed" },
    { id: 2, type: "Hotel", details: "Sea Pearl Resort", date: "2024-05-30", amount: "৳5,000", status: "Confirmed" },
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 bai-jamjuree-regular">Loading profile...</p>
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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl bai-jamjuree-bold text-gray-900">My Profile</h1>
              <p className="text-gray-600 bai-jamjuree-regular">Manage your account information and preferences</p>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" onClick={handleLogout} className="bai-jamjuree-medium">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </motion.div>
          </div>

          {/* Success Message */}
          {message && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
              <Alert className="border-green-200 bg-green-50">
                <AlertDescription className="text-green-800">{message}</AlertDescription>
              </Alert>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Information Card */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2 bai-jamjuree-bold">
                      <User className="w-5 h-5" />
                      <span>Personal Information</span>
                    </CardTitle>
                    {!editMode ? (
                      <Button variant="ghost" size="sm" onClick={() => setEditMode(true)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" onClick={handleCancel} disabled={saving}>
                          <X className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={handleSave} disabled={saving}>
                          <Save className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <div className="bai-jamjuree-semibold text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">Traveler</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Full Name</label>
                      {editMode ? (
                        <Input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="mt-1"
                          disabled={saving}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 mt-1">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 bai-jamjuree-regular">{user.name}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Email</label>
                      {editMode ? (
                        <Input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="mt-1"
                          disabled={saving}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 mt-1">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 bai-jamjuree-regular">{user.email}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-sm bai-jamjuree-medium text-gray-700">Phone</label>
                      {editMode ? (
                        <Input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                          className="mt-1"
                          placeholder="Enter phone number"
                          disabled={saving}
                        />
                      ) : (
                        <div className="flex items-center space-x-2 mt-1">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600 bai-jamjuree-regular">
                            {user.phone || "Not provided"}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600 bai-jamjuree-regular">
                        Member since {new Date(user.registrationDate || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {editMode && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-4 border-t">
                      <Button
                        onClick={handleSave}
                        className="w-full bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold"
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </Button>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Activity Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Search className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <div className="text-2xl bai-jamjuree-bold text-gray-900">{searchHistory.length}</div>
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
                    <div className="text-2xl bai-jamjuree-bold text-gray-900">{bookingHistory.length}</div>
                    <div className="text-sm text-gray-600">Bookings</div>
                  </CardContent>
                </Card>
              </div>

              {/* Search History */}
              <Card>
                <CardHeader>
                  <CardTitle className="bai-jamjuree-bold">Recent Search History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bai-jamjuree-medium">Type</TableHead>
                        <TableHead className="bai-jamjuree-medium">Search Query</TableHead>
                        <TableHead className="bai-jamjuree-medium">Date</TableHead>
                        <TableHead className="bai-jamjuree-medium">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {searchHistory.map((search) => (
                        <TableRow key={search.id}>
                          <TableCell className="bai-jamjuree-medium">{search.type}</TableCell>
                          <TableCell className="bai-jamjuree-regular">{search.query}</TableCell>
                          <TableCell className="bai-jamjuree-regular">{search.date}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">{search.status}</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Booking History */}
              <Card>
                <CardHeader>
                  <CardTitle className="bai-jamjuree-bold">Booking History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="bai-jamjuree-medium">Type</TableHead>
                        <TableHead className="bai-jamjuree-medium">Details</TableHead>
                        <TableHead className="bai-jamjuree-medium">Date</TableHead>
                        <TableHead className="bai-jamjuree-medium">Amount</TableHead>
                        <TableHead className="bai-jamjuree-medium">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookingHistory.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="bai-jamjuree-medium">{booking.type}</TableCell>
                          <TableCell className="bai-jamjuree-regular">{booking.details}</TableCell>
                          <TableCell className="bai-jamjuree-regular">{booking.date}</TableCell>
                          <TableCell className="bai-jamjuree-semibold text-blue-600">{booking.amount}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800">{booking.status}</Badge>
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
