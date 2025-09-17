import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function UniqueStays() {
  const stays = [
    {
      name: "Luxury Beach Villa",
      location: "Saint Martin's Island",
      price: "৳15,000",
      memberPrice: "৳12,750",
      rating: 4.8,
      reviews: 234,
      image: "/placeholder.svg?height=200&width=300&text=Beach+Villa",
      type: "Villa",
    },
    {
      name: "Heritage Boutique Hotel",
      location: "Old Dhaka",
      price: "৳4,500",
      memberPrice: "৳3,825",
      rating: 4.6,
      reviews: 456,
      image: "/placeholder.svg?height=200&width=300&text=Heritage+Hotel",
      type: "Boutique",
    },
    {
      name: "Eco Resort Sylhet",
      location: "Sylhet Hills",
      price: "৳7,200",
      memberPrice: "৳6,120",
      rating: 4.4,
      reviews: 189,
      image: "/placeholder.svg?height=200&width=300&text=Eco+Resort",
      type: "Eco Resort",
    },
    {
      name: "Floating Resort",
      location: "Sundarbans",
      price: "৳9,800",
      memberPrice: "৳8,330",
      rating: 4.7,
      reviews: 167,
      image: "/placeholder.svg?height=200&width=300&text=Floating+Resort",
      type: "Unique",
    },
  ]

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl bai-jamjuree-bold text-gray-900">Explore unique stays</h2>
        <Button variant="outline" className="bai-jamjuree-semibold">
          See all unique stays
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stays.map((stay, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={stay.image || "/placeholder.svg"}
                  alt={stay.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3 bg-white text-gray-900 px-2 py-1 rounded text-xs bai-jamjuree-semibold">
                  {stay.type}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="text-lg bai-jamjuree-semibold text-gray-900">{stay.name}</h3>
                <p className="text-sm text-gray-600 bai-jamjuree-regular">{stay.location}</p>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm bai-jamjuree-medium ml-1">{stay.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500 bai-jamjuree-regular">({stay.reviews} reviews)</span>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg bai-jamjuree-bold text-gray-900">{stay.memberPrice}</span>
                    <span className="text-sm text-gray-500 line-through bai-jamjuree-regular">{stay.price}</span>
                  </div>
                  <p className="text-xs text-blue-600 bai-jamjuree-semibold">Sign in for Member Price</p>
                  <p className="text-xs text-gray-500 bai-jamjuree-regular">per night</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </div>
  )
}
