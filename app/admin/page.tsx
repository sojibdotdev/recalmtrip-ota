"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, UserPlus, LogOut, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [users, setUsers] = useState<any[]>([])
  const [newUser, setNewUser] = useState({ name: "", email: "", password: "", phone: "" })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showAddUser, setShowAddUser] = useState(false)
  const router = useRouter()

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
                <div className="text-2xl bai-jamjuree-bold text-gray-900">
                  {
                    users.filter((u) => new Date(u.registrationDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">New This Week</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl bai-jamjuree-bold text-gray-900">Active</div>
                <div className="text-sm text-gray-600">System Status</div>
              </CardContent>
            </Card>
          </div>

          {/* Users Management */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="bai-jamjuree-bold">User Management</CardTitle>
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
                        <span
                          className={`px-2 py-1 rounded text-xs ${user.addedByAdmin ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}`}
                        >
                          {user.addedByAdmin ? "Admin" : "Self-registered"}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                  {users.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500 bai-jamjuree-regular">
                        No users found. Add your first user to get started.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  )
}
