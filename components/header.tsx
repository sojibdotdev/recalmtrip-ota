"use client"

import { useState } from "react"
import { Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Header() {
  const [language, setLanguage] = useState("English")
  const [currency, setCurrency] = useState("BDT")

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl bai-jamjuree-bold text-gray-900">RecalmTrip</span>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="/flight-results" className="text-gray-700 hover:text-blue-600 bai-jamjuree-medium">
              Flights
            </a>
            <a href="/hotel-results" className="text-gray-700 hover:text-blue-600 bai-jamjuree-medium">
              Stays
            </a>
            <a href="/tour-results" className="text-gray-700 hover:text-blue-600 bai-jamjuree-medium">
              Holiday
            </a>
            <a href="/esim-results" className="text-gray-700 hover:text-blue-600 bai-jamjuree-medium">
              eSIM
            </a>
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span className="bai-jamjuree-medium">{language}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLanguage("English")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("বাংলা")}>বাংলা (Bengali)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-1">
                <span className="bai-jamjuree-medium">{currency}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCurrency("BDT")}>BDT (৳)</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCurrency("USD")}>USD ($)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="outline" className="bai-jamjuree-medium" onClick={() => (window.location.href = "/login")}>
            Sign in
          </Button>
        </div>
      </div>
    </header>
  )
}
