"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Users,
  UserPlus,
  LogOut,
  Shield,
  Search,
  BarChart3,
  Download,
  Eye,
  Trash2,
  TrendingUp,
  Activity,
  Plane,
  Building,
  Wifi,
  MapPin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [users, setUsers] = useState<any[]>([])
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", phone: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const [showUserDetails, setShowUserDetails] = useState<any>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<any>(null)
  const router = useRouter()

  // Mock analytics data
  const [analytics] = useState({
    searchActivity: {
      flights: 245,
      hotels: 189,
      esim: 67,
      tours: 123,
    },
    bookingStats: {
      totalBookings: 89,
      totalRevenue: 2450000,
      avgBookingValue: 27528,
    },
    userGrowth: {
      thisWeek: 12,
      thisMonth: 45,
      total: users.length,
    },
  })

  useEffect(() => {
    // Check if admin is logged in
    const adminSession = document.cookie.includes("admin_session=")
    if (adminSession) {
      setIsAuthenticated(true)
      loadUsers()
    }
  }, [])

  const loadUsers = () => {
    const usersData = JSON.parse(localStorage.getItem("users") || "[]")
    setUsers(usersData)
  }

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Hardcoded admin credentials
    if (loginForm.username === "admin" && loginForm.password === "recalmtrip2025") {
      document.cookie = `admin_session=admin_${Date.now()}; path=/; max-age=86400`
      setIsAuthenticated(true)
      loadUsers()
    } else {
      setError("Invalid admin credentials")
    }
    setLoading(false)
  }

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const userData = {
      id: Date.now(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      registrationDate: new Date().toISOString(),
      addedByAdmin: true,
    }

    const existingUsers = JSON.parse(localStorage.getItem("users") || "[]")
    existingUsers.push(userData)
    localStorage.setItem("users", JSON.stringify(existingUsers))

    setUsers(existingUsers)
    setNewUser({ name: "", email: "", password: "", phone: "" })
    setShowAddUser(false)
    setLoading(false)
  }

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter((user) => user.id !== userId)
    localStorage.setItem("users", JSON.stringify(updatedUsers))
    setUsers(updatedUsers)
    setShowDeleteConfirm(null)
  }

  const handleExportData = () => {
    // Simulate CSV export
    const csvData = users.map((user) => ({
      Name: user.name,
      Email: user.email,
      Phone: user.phone || "N/A",
      "Registration Date": new Date(user.registrationDate).toLocaleDateString(),
      Source: user.addedByAdmin ? "Admin" : "Self-registered",
    }))

    console.log("Exporting user data:", csvData)
    alert("User data exported to console (CSV simulation)")
  }

  const handleLogout = () => {
    document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    setIsAuthenticated(false)
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full mx-4">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl bai-jamjuree-bold text-gray-900">Admin Login</CardTitle>
              <p className="text-gray-600 bai-jamjuree-regular">Access RecalmTrip Admin Dashboard</p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <label className="text-sm bai-jamjuree-medium text-gray-700">Username</label>
                  <Input
                    type="text"
                    placeholder="Enter admin username"
                    className="bai-jamjuree-regular"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm bai-jamjuree-medium text-gray-700">Password</label>
                  <Input
                    type="password"
                    placeholder="Enter admin password"
                    className="bai-jamjuree-regular"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl bai-jamjuree-bold text-gray-900">RecalmTrip Admin</h1>
              <p className="text-sm text-gray-600">Dashboard Management</p>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="bai-jamjuree-medium">
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl bai-jamjuree-bold text-gray-900">{users.length}</div>
                <div className="text-sm text-gray-600">Total Users</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <UserPlus className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl bai-jamjuree-bold text-gray-900">{analytics.userGrowth.thisWeek}</div>
                <div className="text-sm text-gray-600">New This Week</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl bai-jamjuree-bold text-gray-900">
                  {Object.values(analytics.searchActivity).reduce((a, b) => a + b, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Searches</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl bai-jamjuree-bold text-gray-900">{analytics.bookingStats.totalBookings}</div>
                <div className="text-sm text-gray-600">Total Bookings</div>
              </CardContent>
            </Card>
          </div>

          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Search Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 bai-jamjuree-bold">
                  <Search className="w-5 h-5" />
                  <span>Search Activity Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Plane className="w-4 h-4 text-blue-600" />
                      <span className="bai-jamjuree-medium">Flights</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(analytics.searchActivity.flights / 300) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm bai-jamjuree-semibold">{analytics.searchActivity.flights}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Building className="w-4 h-4 text-green-600" />
                      <span className="bai-jamjuree-medium">Hotels</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(analytics.searchActivity.hotels / 300) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm bai-jamjuree-semibold">{analytics.searchActivity.hotels}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Wifi className="w-4 h-4 text-purple-600" />
                      <span className="bai-jamjuree-medium">eSIM</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(analytics.searchActivity.esim / 300) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm bai-jamjuree-semibold">{analytics.searchActivity.esim}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-orange-600" />
                      <span className="bai-jamjuree-medium">Tours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${(analytics.searchActivity.tours / 300) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm bai-jamjuree-semibold">{analytics.searchActivity.tours}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 bai-jamjuree-bold">
                  <BarChart3 className="w-5 h-5" />
                  <span>Booking Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Revenue</span>
                    <span className="text-lg bai-jamjuree-bold text-green-600">
                      ৳{analytics.bookingStats.totalRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Booking Value</span>
                    <span className="text-lg bai-jamjuree-bold text-blue-600">
                      ৳{analytics.bookingStats.avgBookingValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Conversion Rate</span>
                    <span className="text-lg bai-jamjuree-bold text-purple-600">14.2%</span>
                  </div>

                  {/* Simple Bar Chart */}
                  <div className="mt-4">
                    <div className="text-sm text-gray-600 mb-2">Monthly Bookings</div>
                    <div className="flex items-end space-x-2 h-20">
                      {[15, 23, 18, 31, 28, 35].map((value, index) => (
                        <div
                          key={index}
                          className="flex-1 bg-blue-200 rounded-t"
                          style={{ height: `${(value / 35) * 100}%` }}
                        >
                          <div className="text-xs text-center mt-1">{value}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Jan</span>
                      <span>Feb</span>
                      <span>Mar</span>
                      <span>Apr</span>
                      <span>May</span>
                      <span>Jun</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Users Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="bai-jamjuree-bold">User Management</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={handleExportData} className="bai-jamjuree-medium">
                    <Download className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Dialog open={showAddUser} onOpenChange={setShowAddUser}>
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold">
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle className="bai-jamjuree-bold">Add New User</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleAddUser} className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm bai-jamjuree-medium text-gray-700">Full Name</label>
                          <Input
                            type="text"
                            placeholder="Enter full name"
                            className="bai-jamjuree-regular"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm bai-jamjuree-medium text-gray-700">Email</label>
                          <Input
                            type="email"
                            placeholder="Enter email"
                            className="bai-jamjuree-regular"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm bai-jamjuree-medium text-gray-700">Password</label>
                          <Input
                            type="password"
                            placeholder="Enter password"
                            className="bai-jamjuree-regular"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm bai-jamjuree-medium text-gray-700">Phone (Optional)</label>
                          <Input
                            type="tel"
                            placeholder="Enter phone number"
                            className="bai-jamjuree-regular"
                            value={newUser.phone}
                            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-blue-600 hover:bg-blue-700 bai-jamjuree-semibold"
                          disabled={loading}
                        >
                          {loading ? "Adding..." : "Add User"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="bai-jamjuree-medium">Name</TableHead>
                    <TableHead className="bai-jamjuree-medium">Email</TableHead>
                    <TableHead className="bai-jamjuree-medium">Phone</TableHead>
                    <TableHead className="bai-jamjuree-medium">Registration Date</TableHead>
                    <TableHead className="bai-jamjuree-medium">Source</TableHead>
                    <TableHead className="bai-jamjuree-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="bai-jamjuree-medium">{user.name}</TableCell>
                      <TableCell className="bai-jamjuree-regular">{user.email}</TableCell>
                      <TableCell className="bai-jamjuree-regular">{user.phone || "N/A"}</TableCell>
                      <TableCell className="bai-jamjuree-regular">
                        {new Date(user.registrationDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.addedByAdmin ? "secondary" : "default"}>
                          {user.addedByAdmin ? "Admin" : "Self-registered"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => setShowUserDetails(user)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowDeleteConfirm(user)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500 bai-jamjuree-regular">
                        No users found. Add your first user to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* User Details Modal */}
          <Dialog open={!!showUserDetails} onOpenChange={() => setShowUserDetails(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="bai-jamjuree-bold">User Details</DialogTitle>
              </DialogHeader>
              {showUserDetails && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Name</label>
                    <p className="text-gray-900">{showUserDetails.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="text-gray-900">{showUserDetails.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="text-gray-900">{showUserDetails.phone || "Not provided"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Registration Date</label>
                    <p className="text-gray-900">{new Date(showUserDetails.registrationDate).toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Source</label>
                    <Badge variant={showUserDetails.addedByAdmin ? "secondary" : "default"}>
                      {showUserDetails.addedByAdmin ? "Added by Admin" : "Self-registered"}
                    </Badge>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Modal */}
          <Dialog open={!!showDeleteConfirm} onOpenChange={() => setShowDeleteConfirm(null)}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="bai-jamjuree-bold">Delete User</DialogTitle>
              </DialogHeader>
              {showDeleteConfirm && (
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Are you sure you want to delete user <strong>{showDeleteConfirm.name}</strong>? This action cannot
                    be undone.
                  </p>
                  <div className="flex space-x-2 justify-end">
                    <Button variant="outline" onClick={() => setShowDeleteConfirm(null)}>
                      Cancel
                    </Button>
                    <Button variant="destructive" onClick={() => handleDeleteUser(showDeleteConfirm.id)}>
                      Delete User
                    </Button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>
      </main>
    </div>
  )
}
