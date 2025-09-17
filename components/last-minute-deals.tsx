import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function LastMinuteDeals() {
  const deals = [
    {
      name: "Sea Pearl Beach Resort",
      location: "Cox's Bazar",
      price: "৳5,000",
      originalPrice: "৳7,500",
      rating: 4.2,
      reviews: 1250,
      image: "/placeholder.svg?height=200&width=300&text=Beach+Resort",
    },
    {
      name: "Pan Pacific Sonargaon",
      location: "Dhaka",
      price: "৳8,500",
      originalPrice: "৳12,000",
      rating: 4.5,
      reviews: 890,
      image: "/placeholder.svg?height=200&width=300&text=Luxury+Hotel",
    },
    {
      name: "Hotel Agrabad",
      location: "Chittagong",
      price: "৳3,200",
      originalPrice: "৳4,800",
      rating: 4.0,
      reviews: 567,
      image: "/placeholder.svg?height=200&width=300&text=Business+Hotel",
    },
    {
      name: "Royal Tulip Sea Pearl",
      location: "Cox's Bazar",
      price: "৳6,800",
      originalPrice: "৳9,500",
      rating: 4.3,
      reviews: 723,
      image: "/placeholder.svg?height=200&width=300&text=Resort+Hotel",
    },
  ]

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl bai-jamjuree-bold text-gray-900">Last-minute weekend deals</h2>
          <Button variant="outline" className="bai-jamjuree-semibold">
            See all deals
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer bg-white">
              <CardContent className="p-0">
                <div className="relative">
                  <img
                    src={deal.image || "/placeholder.svg"}
                    alt={deal.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-sm bai-jamjuree-semibold">
                    Save 33%
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <h3 className="text-lg bai-jamjuree-semibold text-gray-900">{deal.name}</h3>
                  <p className="text-sm text-gray-600 bai-jamjuree-regular">{deal.location}</p>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm bai-jamjuree-medium ml-1">{deal.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 bai-jamjuree-regular">({deal.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg bai-jamjuree-bold text-gray-900">{deal.price}</span>
                    <span className="text-sm text-gray-500 line-through bai-jamjuree-regular">
                      {deal.originalPrice}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 bai-jamjuree-regular">per night</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
