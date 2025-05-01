import React from "react";

const ProductCardItem = ({ product, onAddToCart, onCardClick }) => {
  return (
    <div
      onClick={() => onCardClick(product.id)}
      className="bg-white rounded-3xl p-4 relative shadow-md transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer"
    >
      {/* Product image */}
      <div className="h-40 mb-4 overflow-hidden rounded-md bg-white">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "/api/placeholder/240/160";
          }}
        />
      </div>

      {/* Product details */}
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
            onAddToCart(product.id);
          }}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCardItem;