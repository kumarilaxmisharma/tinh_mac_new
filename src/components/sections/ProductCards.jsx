import { Heart } from "lucide-react"
import { useState } from "react"
// import { useRouter } from "next/router" // For Next.js
import { useNavigate } from "react-router-dom" // For React Router


export default function ProductCard() {
  const [currentPage, setCurrentPage] = useState(1)
  // const router = useRouter() // For Next.js
  const navigate = useNavigate() // For React Router

  // Sample product data with images and unique IDs
  const products = [
    {
      id: "imac-m-series",
      name: "IMac",
      price: "$1,200",
      rating: 4.8,
      description:
        "Apple M-series chip. It delivers lightning-fast processing, all-day battery life, and pro-grade graphics",
      image: "src/assets/images/IMac carousel.jpg",
    },
    {
      id: "macbook-air",
      name: "MacBook Air",
      price: "$1,200",
      rating: 4.8,
      description:
        "Apple M-series chip. It delivers lightning-fast processing, all-day battery life, and pro-grade graphics",
      image: "src/assets/images/Macbook Air.jpeg",
    },
    // {
    //   id: "macbook-pro-14-16",
    //   name: "Macbook Pro 14'' 16''",
    //   price: "$1,200",
    //   rating: 4.8,
    //   description:
    //     "Apple M-series chip. It delivers lightning-fast processing, all-day battery life, and pro-grade graphics",
    //   image: "src/assets/images/Macbook Pro 14'' 16''.png",
    // },
    {
      id: "macbook-pro-m4",
      name: "MacBook Pro",
      price: "$1,200",
      rating: 4.8,
      description:
        "Apple M-series chip. It delivers lightning-fast processing, all-day battery life, and pro-grade graphics",
      image: "src/assets/images/IMac M4 chip.png",
    },
    {
      id: "pro-display-xdr",
      name: "Pro Display XDR",
      price: "$1,200",
      rating: 4.8,
      description:
        "Apple M-series chip. It delivers lightning-fast processing, all-day battery life, and pro-grade graphics",
      image: "src/assets/images/Pro Display XDR.jpeg",
    },
    {
      id: "studio-display",
      name: "Studio Display",
      price: "$1,200",
      rating: 4.8,
      description:
        "Apple M-series chip. It delivers lightning-fast processing, all-day battery life, and pro-grade graphics",
      image: "src/assets/images/about_mac/Studio Display.png",
    },
  ]

  const totalPages = Math.ceil(products.length / 6)

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const goToProductDetail = (productId) => {
    // Actually navigate to the product detail page
    console.log(`Navigating to product: ${productId}`)
    
    // For Next.js:
    // router.push(`/products/${productId}`)
    
    // OR for React Router:
    navigate(`/products/${productId}`)
  }

  // Calculate which products to display based on current page
  const productsPerPage = 6
  const startIndex = (currentPage - 1) * productsPerPage
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage)

  return (
    <div className="container max-w-screen px-22 py-8">
      <h1 className="text-5xl font-bold mb-10 text-gray-800">Popular Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayedProducts.map((product) => (
          <div 
            key={product.id} 
            onClick={() => goToProductDetail(product.id)} 
            className="bg-white rounded-3xl p-4 relative shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
          >
            {/* <button 
              className="absolute top-3 right-3 text-red-400 hover:text-red-600 transition-all duration-300 z-10"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the parent onClick
                console.log(`Added ${product.id} to favorites`);
              }}
            >
              <Heart className="w-6 h-6" />
            </button> */}

            {/* Product image */}
            <div className="h-40 mb-4 overflow-hidden rounded-md bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/api/placeholder/240/160"
                }}
              />
            </div>
            {/* Product name and rating */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <div className="flex items-center">
                  <span className="text-base mr-1 text-amber-400">★</span>
                  <span className="text-base">{product.rating}</span>
                </div>
              </div>

              <p className="font-bold">{product.price}</p>

              <p className="text-xs text-gray-700 line-clamp-2">{product.description}</p>

              {/* Add to cart button */}
              <button 
                className="mt-2 py-2 px-3 border bg-gray-900 rounded-3xl text-sm text-white hover:bg-gray-500 transition-colors"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering the parent onClick
                  console.log(`Added ${product.id} to cart`);
                }}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 space-x-2">
        <button
          onClick={handlePrevPage}
          className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
        >
          <span className="sr-only">Previous</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              currentPage === index + 1 ? "bg-gray-800 text-white" : "hover:bg-gray-100"
            }`}
          >
            {String(index + 1).padStart(2, "0")}
          </button>
        ))}

        <button
          onClick={handleNextPage}
          className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
        >
          <span className="sr-only">Next</span>
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  )
}