import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductCardGrid from "./ProductCardGrid";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  // Sample product data
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
  ];

  const productsPerPage = 5;
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const goToProductDetail = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (productId) => {
    console.log(`Added ${productId} to cart`);
  };

  // Calculate which products to display based on current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);

  return (
    <div className="container max-w-screen px-22 py-8">
      <h1 className="text-5xl font-bold mb-10 text-gray-800">Popular Products</h1>

      {/* Product Grid */}
      <ProductCardGrid
        products={displayedProducts}
        onAddToCart={handleAddToCart}
        onCardClick={goToProductDetail}
      />

      {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-full ${
                  currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-100'
                }`}
              >
                <ChevronLeft size={20} />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-8 h-8 rounded-full ${
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${
                  currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-100'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
    </div>
  );
};

export default ProductCards;