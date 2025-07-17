import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg bai-jamjuree-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  Press
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg bai-jamjuree-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  Help center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  Contact us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  Terms of service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg bai-jamjuree-bold mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  Cox's Bazar
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  Sylhet
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  Chittagong
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white bai-jamjuree-regular">
                  Sundarbans
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg bai-jamjuree-bold mb-4">Follow us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400 bai-jamjuree-regular">
                Last updated: {new Date().toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 bai-jamjuree-regular mt-1">24-hour cache compliance</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl bai-jamjuree-bold">RecalmTrip</span>
          </div>
          <p className="text-gray-400 bai-jamjuree-regular">
            © 2024 RecalmTrip. All rights reserved. | Powered by Travelpayouts API
          </p>
        </div>
      </div>
    </footer>
  )
}
