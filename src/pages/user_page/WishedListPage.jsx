import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

const WishlistPage = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Mock data for demonstration
  useEffect(() => {
    // This would normally be an API call to fetch the user's wishlist
    const fetchWishlist = async () => {
      setIsLoading(true);
      
      // Simulating API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock wishlist data
      const mockWishlistData = [
        {
          id: 1,
          name: "Sony MDRZX110 Series Stereo Headphones",
          price: 49.99,
          originalPrice: 79.99,
          discount: 38,
          image: "/api/placeholder/300/300",
          category: "Headphones",
          inStock: true
        },
        {
          id: 2,
          name: "Apple AirPods Pro (2nd Generation)",
          price: 249.00,
          originalPrice: 249.00,
          discount: 0,
          image: "/api/placeholder/300/300",
          category: "Earbuds",
          inStock: true
        },
        {
          id: 3,
          name: "Bose QuietComfort 45 Wireless Noise Cancelling Headphones",
          price: 279.00,
          originalPrice: 329.00,
          discount: 15,
          image: "/api/placeholder/300/300",
          category: "Headphones",
          inStock: false
        },
        {
          id: 4,
          name: "JBL Flip 6 Portable Waterproof Speaker",
          price: 99.95,
          originalPrice: 129.95,
          discount: 23,
          image: "/api/placeholder/300/300",
          category: "Speakers",
          inStock: true
        },
        {
          id: 5,
          name: "Samsung Galaxy Buds 2 Pro",
          price: 189.99,
          originalPrice: 229.99,
          discount: 17,
          image: "/api/placeholder/300/300",
          category: "Earbuds",
          inStock: true
        }
      ];
      
      setWishlistItems(mockWishlistData);
      setIsLoading(false);
    };
    
    fetchWishlist();
  }, []);

  // Handle removing item from wishlist
  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== itemId));
  };
  
  // Handle adding item to cart
  const addToCart = (item) => {
    // This would typically call an API to add the item to the cart
    console.log(`Added to cart: ${item.name}`);
    
    // Simulate success notification
    alert(`${item.name} added to your cart!`);
  };
  
  // Navigate to product details
  const viewProductDetails = (productId) => {
    navigate(`/product/${productId}`);
  };
  
  // Calculate pagination
  const totalPages = Math.ceil(wishlistItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlistItems.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">My Wishlist</h1>
            <div className="flex text-sm text-gray-500 mt-1">
              <span>Home</span>
              <span className="mx-1">/</span>
              <span className="text-blue-500">Wishlist</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <Heart className="text-red-500 mr-2" size={20} />
            <span className="font-medium">{wishlistItems.length} Items</span>
          </div>
        </div>
      </div>
      
      {/* Wishlist Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <Heart className="mx-auto text-gray-300" size={64} />
          <h2 className="mt-4 text-xl font-medium text-gray-700">Your wishlist is empty</h2>
          <p className="mt-2 text-gray-500">Browse our store and add items you love to your wishlist</p>
          <button 
            onClick={() => navigate('/products')}
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {currentItems.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                {/* Product Image with Overlay */}
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain p-4"
                  />
                  
                  {/* Discount Badge */}
                  {item.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -{item.discount}%
                    </div>
                  )}
                  
                  {/* Out of Stock Overlay */}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-medium px-3 py-1 bg-red-500 rounded">
                        Out of Stock
                      </span>
                    </div>
                  )}
                  
                  {/* Quick Actions */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-2 px-3 flex justify-between items-center transition-transform transform translate-y-full group-hover:translate-y-0">
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                    <button 
                      onClick={() => viewProductDetails(item.id)}
                      className="text-blue-500 hover:text-blue-700 underline text-sm"
                    >
                      View Details
                    </button>
                  </div>
                </div>
                
                {/* Product Details */}
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{item.category}</div>
                  <h3 
                    className="font-medium text-gray-800 mb-2 hover:text-blue-500 cursor-pointer truncate"
                    onClick={() => viewProductDetails(item.id)}
                  >
                    {item.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-center mb-3">
                    <span className="font-bold text-gray-800">${item.price.toFixed(2)}</span>
                    {item.discount > 0 && (
                      <span className="ml-2 text-sm text-gray-500 line-through">
                        ${item.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {/* Action Button */}
                  <button
                    onClick={() => addToCart(item)}
                    disabled={!item.inStock}
                    className={`w-full py-2 rounded-lg flex items-center justify-center ${
                      item.inStock 
                        ? 'bg-blue-500 hover:bg-blue-600 text-white cursor-pointer' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    {item.inStock ? 'Add to Cart' : 'Unavailable'}
                  </button>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="w-full mt-2 py-2 text-gray-600 hover:text-red-500 text-sm flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 size={14} className="mr-1" />
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <button
                onClick={prevPage}
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
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-full ${
                  currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-100'
                }`}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Recommendations */}
      {wishlistItems.length > 0 && (
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">You might also like</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
                <div className="h-40 bg-gray-100">
                  <img
                    src={`/api/placeholder/250/250?text=Product ${index + 1}`}
                    alt={`Recommendation ${index + 1}`}
                    className="w-full h-full object-contain p-2"
                  />
                </div>
                <div className="p-3">
                  <div className="text-xs text-gray-500 mb-1">Category</div>
                  <h3 className="font-medium text-gray-800 mb-2 truncate">Recommended Product {index + 1}</h3>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-800">$99.99</span>
                    <button className="text-blue-500 hover:text-blue-700">
                      <Heart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;