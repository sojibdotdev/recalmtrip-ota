import { Card, CardContent } from "@/components/ui/card"

export default function HotelRecommendations() {
  const categories = [
    {
      title: "Beach",
      image: "/placeholder.svg?height=200&width=300&text=Beach+Resort",
      description: "Relax by the ocean",
    },
    {
      title: "Culture",
      image: "/placeholder.svg?height=200&width=300&text=Cultural+Hotel",
      description: "Immerse in local heritage",
    },
    {
      title: "Family",
      image: "/placeholder.svg?height=200&width=300&text=Family+Resort",
      description: "Fun for all ages",
    },
    {
      title: "Wellness & Relaxation",
      image: "/placeholder.svg?height=200&width=300&text=Spa+Resort",
      description: "Rejuvenate your spirit",
    },
    {
      title: "Adventure",
      image: "/placeholder.svg?height=200&width=300&text=Adventure+Lodge",
      description: "Thrilling experiences",
    },
  ]

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl bai-jamjuree-bold text-gray-900 mb-8">Discover your new favorite stay</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {categories.map((category, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 bg-black/20 rounded-t-lg"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg bai-jamjuree-bold">{category.title}</h3>
                  <p className="text-sm bai-jamjuree-regular">{category.description}</p>
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
