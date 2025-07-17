import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <div className="relative h-96 bg-gradient-to-r from-blue-500 to-teal-400 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/placeholder.svg?height=400&width=800&text=Beautiful+Beach+Resort')`,
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="text-white max-w-2xl">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-lg inline-block mb-4">
            <span className="bai-jamjuree-semibold">Total price upfront</span>
          </div>
          <h1 className="text-4xl md:text-5xl bai-jamjuree-bold mb-4">No hidden fees. Just the trip you want.</h1>
          <p className="text-xl bai-jamjuree-regular mb-6">
            See exactly what you'll pay for your trip before you book.
          </p>
          <Button variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 bai-jamjuree-semibold">
            Learn more
          </Button>
        </div>
      </div>
    </div>
  )
}
