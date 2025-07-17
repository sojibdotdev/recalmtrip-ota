"use client"

import { useState, useEffect } from "react"
import { User, LogOut, Settings, Bookmark, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"

export default function UserMenu() {
  const [user, setUser] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    document.cookie = "session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  if (!user) {
    return (
      <Button variant="outline" className="bai-jamjuree-medium" onClick={() => router.push("/login")}>
        Sign in
      </Button>
    )
  }

  const initials = user.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center space-x-2 p-2">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-blue-600 text-white text-sm bai-jamjuree-semibold">{initials}</AvatarFallback>
          </Avatar>
          <span className="hidden md:block bai-jamjuree-medium text-gray-700">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm bai-jamjuree-semibold text-gray-900">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard")} className="cursor-pointer">
          <User className="w-4 h-4 mr-2" />
          <span className="bai-jamjuree-regular">Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/profile")} className="cursor-pointer">
          <User className="w-4 h-4 mr-2" />
          <span className="bai-jamjuree-regular">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Bookmark className="w-4 h-4 mr-2" />
          <span className="bai-jamjuree-regular">Saved Trips</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <CreditCard className="w-4 h-4 mr-2" />
          <span className="bai-jamjuree-regular">My Bookings</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          <span className="bai-jamjuree-regular">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          <span className="bai-jamjuree-regular">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
