import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from './src/component/user/WishlistContext';

const WishlistButton = ({ product, size = 'md', showText = false, className = '' }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product.id);
  
  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wasAdded = toggleWishlist(product);
    
    // Show feedback toast/notification
    if (wasAdded) {
      // You could implement a toast notification system here
      console.log(`${product.name} added to wishlist`);
    } else {
      console.log(`${product.name} removed from wishlist`);
    }
  };
  
  // Size variants
  const sizeClasses = {
    sm: 'p-1.5 rounded-full',
    md: 'p-2 rounded-full',
    lg: 'p-3 rounded-full'
  };
  
  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  };
  
  return (
    <button
      onClick={handleToggleWishlist}
      className={`${sizeClasses[size]} ${isWishlisted ? 'bg-red-50' : 'bg-gray-50'} 
        hover:bg-red-100 transition-colors duration-200 flex items-center justify-center ${className}`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart
        size={iconSizes[size]}
        className={`${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
      />
      
      {showText && (
        <span className={`ml-2 ${isWishlisted ? 'text-red-500' : 'text-gray-700'}`}>
          {isWishlisted ? 'Wishlisted' : 'Wishlist'}
        </span>
      )}
    </button>
  );
};

export default WishlistButton;