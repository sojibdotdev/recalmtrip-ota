"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function PromotionalBanners() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={itemVariants} className="bg-yellow-400 rounded-lg p-6 text-black">
          <h3 className="text-xl bai-jamjuree-bold mb-2">Book a last-minute package and save</h3>
          <p className="bai-jamjuree-regular mb-4">Combine flights and hotels for extra savings</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button className="bg-black text-white hover:bg-gray-800 bai-jamjuree-semibold">
              Explore package deals
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white"
        >
          <h3 className="text-xl bai-jamjuree-bold mb-2">Member prices available</h3>
          <p className="bai-jamjuree-regular mb-4">Sign in to unlock exclusive deals</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="bg-white text-purple-600 hover:bg-gray-100 bai-jamjuree-semibold">
              Sign in
            </Button>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-blue-600 rounded-lg p-6 text-white">
          <h3 className="text-xl bai-jamjuree-bold mb-2">Download our app</h3>
          <p className="bai-jamjuree-regular mb-4">Get exclusive mobile-only deals</p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 bai-jamjuree-semibold">
              Download now
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
