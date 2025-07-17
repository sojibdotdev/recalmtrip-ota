"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function RegistrationPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Show popup after 3 seconds if user is not logged in
    const timer = setTimeout(() => {
      const userData = localStorage.getItem("user")
      const hasSeenPopup = localStorage.getItem("hasSeenRegistrationPopup")

      if (!userData && !hasSeenPopup) {
        setIsVisible(true)
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem("hasSeenRegistrationPopup", "true")
  }

  const handleSignUp = () => {
    setIsVisible(false)
    router.push("/register")
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <Card className="max-w-md w-full shadow-2xl">
              <CardContent className="p-6 text-center relative">
                <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>

                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl bai-jamjuree-bold text-gray-900 mb-2">Special Offer!</h3>

                <p className="text-gray-600 bai-jamjuree-regular mb-4">
                  Sign up now and get <span className="text-orange-600 bai-jamjuree-bold">10% off</span> your first
                  booking!
                </p>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-gray-700 bai-jamjuree-regular">
                    ✨ Exclusive member prices
                    <br />🎯 Personalized recommendations
                    <br />📱 Easy booking management
                  </p>
                </div>

                <div className="space-y-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleSignUp}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white bai-jamjuree-semibold"
                    >
                      Sign Up & Save 10%
                    </Button>
                  </motion.div>

                  <Button variant="ghost" onClick={handleClose} className="w-full text-gray-500 bai-jamjuree-regular">
                    Maybe later
                  </Button>
                </div>

                <p className="text-xs text-gray-400 mt-4 bai-jamjuree-regular">
                  *Offer valid for new users only. Terms apply.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
