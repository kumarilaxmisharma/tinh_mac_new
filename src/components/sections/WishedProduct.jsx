import { useState } from "react"
import { Heart, Star } from "lucide-react"

export default function WishedProduct() {
  const [wishlist, setWishlist] = useState({
    "macbook-pro-1": false,
    "macbook-pro-2": false,
    "macbook-pro-3": false,
  })
  const toggleWishlist = (id) => {
    setWishlist((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }
  const products = [
    {
      id: "macbook-pro-1",
      name: "MacBook Pro",
      price: "$1,200",
      rating: 4.8,
      image: "/images/macbook-pro.png",
      description:
        "Apple M-series chip. It delivers lightning-fast processing, all-day battery life, and pro-grade graphics",
    },
    {
      id: "macbook-pro-2",
      name: "MacBook Pro",
      price: "$1,200",
      rating: 4.8,
      image: "/images/macbook-pro.png",
      description:
        "Apple M-series chip. It delivers lightning-fast processing, all-day battery life, and pro-grade graphics",
    },
    {
      id: "macbook-pro-3",
      name: "MacBook Pro",
      price: "$1,200",
      rating: 4.8,
      image: "/images/macbook-pro.png",
      description:
        "Apple M-series chip. It delivers lightning-fast processing, all-day battery life, and pro-grade graphics",
    },
  ]
  return (
    <div className="container max-w-screen px-22 py-20">
      <h1 className="text-5xl font-bold mb-10">Most Wished Product</h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Product Cards */}
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-3xl p-6 relative flex flex-col justify-between shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
            <button onClick={() => toggleWishlist(product.id)} className="absolute top-4 right-4 z-10 text-red-400 hover:text-red-600"> 
              <Heart className={`w-6 h-6 ${wishlist[product.id] ? "fill-red-500" : ""}`} />
            </button>
            <div className="mb-4 flex items-center justify-center">
              <img
                src={product.image || "/placeholder.svg?height=160&width=200"}
                alt={product.name}
                className="h-40 object-contain"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-[18px]">{product.name}</h3>
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-black mr-1" />
                  <div>{product.rating}</div>
                </div>
              </div>
              <p className="font-bold text-lg mb-1">{product.price}</p>
              <p className="text-[12px] mb-4">{product.description}</p>
              <button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-400 hover:cursor-pointer">
                Add to cart
                </button>
            </div>
          </div>
        ))}
  
        {/* Featured Product */}
        <div className="bg-gray-200 rounded-3xl p-6 flex flex-col justify-between relative lg:col-span-2 shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer">
          <div className="absolute top-4 right-4 z-10">
            <h2 className="text-4xl font-bold">MacBook Air</h2>
          </div>
          <div className="h-full flex items-center justify-center">
            <img src="/images/macbook-air.png" alt="MacBook Air" className="object-contain max-h-full" />
          </div>
          <div className="flex justify-end mt-4">
            <button className="border-2 border-gray-500 text-gray-700 px-6 py-2 rounded-full font-medium  hover:bg-gray-500 hover:text-white cursor-pointer">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}