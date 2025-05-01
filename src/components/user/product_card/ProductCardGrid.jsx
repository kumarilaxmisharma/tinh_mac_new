import React from "react";
import ProductCardItem from "./ProductCardItem";

const ProductCardGrid = ({ products, onAddToCart, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCardItem
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
};

export default ProductCardGrid;