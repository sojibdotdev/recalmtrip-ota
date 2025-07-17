"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Globe, ChevronDown, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import UserMenu from "@/components/user-menu"
import MobileMenu from "@/components/mobile-menu"

export default function Header() {
  const [language, setLanguage] = useState("English")
  const [currency, setCurrency] = useState("BDT")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="text-xl bai-jamjuree-bold text-gray-900">RecalmTrip</span>
            </motion.div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 bai-jamjuree-medium transition-colors">
              Flights
            </Link>
            <Link href="/" className="text-gray-700 hover:text-blue-600 bai-jamjuree-medium transition-colors">
              Stays
            </Link>
            <Link href="/" className="text-gray-700 hover:text-blue-600 bai-jamjuree-medium transition-colors">
              Holiday
            </Link>
            <Link href="/" className="text-gray-700 hover:text-blue-600 bai-jamjuree-medium transition-colors">
              eSIM
            </Link>
          </nav>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector - Desktop */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="bai-jamjuree-medium">
                    <Globe className="w-4 h-4 mr-1" />
                    {language}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage("English")}>English</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("বাংলা")}>বাংলা</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Currency Selector - Desktop */}
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="bai-jamjuree-medium">
                    {currency}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setCurrency("BDT")}>BDT</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrency("USD")}>USD</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* User Menu - Desktop */}
            <div className="hidden md:block">
              <UserMenu />
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        language={language}
        setLanguage={setLanguage}
        currency={currency}
        setCurrency={setCurrency}
      />
    </header>
  )
}
