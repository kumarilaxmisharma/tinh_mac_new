// ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Star, Minus, Plus, Heart, Share2, Copy, Facebook, Twitter } from 'lucide-react';

export default function ProductDetail() {
  const { productId } = useParams(); // Get the productId from URL
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [product, setProduct] = useState(null);

  // Simulated product data - in a real app, you'd fetch this from an API
  // based on the productId from params
  useEffect(() => {
    console.log(`Loading product with ID: ${productId}`);

    // Simulate fetching product data
    // In a real app, replace this with your API call
    const fetchProduct = () => {
      // This would be an API call in a real app
      const productData = {
        id: productId,
        name: "2020 Apple MacBook Pro with Apple M1 Chip",
        price: "$1699",
        oldPrice: "$1999.00",
        discount: "21%",
        rating: 4.7,
        reviewCount: 21671,
        sku: "A264671",
        availability: "In Stock",
        brand: "Apple",
        category: "Electronics Devices",
        images: [
          "/images/macbook-1.jpg",
          "/images/macbook-2.jpg",
          "/images/macbook-3.jpg",
          "/images/macbook-4.jpg",
          "/images/macbook-5.jpg",
          "/images/macbook-6.jpg",
        ],
        features: [
          {
            title: "UNMATCHED PERFORMANCE & SPEED:",
            description:
              "Powered by Apple's M1 chip, the MacBook Pro delivers blazing fast performance with its 8-core CPU and GPU, ensuring smooth multitasking and power efficiency.",
          },
          {
            title: "STUNNING RETINA DISPLAY:",
            description:
              "The 13.3-inch Retina display with True Tone technology offers vibrant colors, sharp contrast, and incredible detail, making it perfect for creative professionals and everyday users.",
          },
          {
            title: "ALL-DAY BATTERY LIFE:",
            description:
              "With up to 20 hours of battery life, the MacBook Pro M1 lets you work, create, and stream without worrying about running out of power.",
          },
          {
            title: "ADVANCED COOLING SYSTEM:",
            description:
              "Stay productive without overheating – Apple's silent active cooling system ensures sustained peak performance during intensive tasks.",
          },
          {
            title: "SECURE & SEAMLESS EXPERIENCE:",
            description:
              "The Magic Keyboard, Touch ID, and macOS integration provide a smooth, secure, and intuitive user experience, while Apple's M1 chip enhances privacy protection.",
          },
        ],
      };

      // Add error handling
      if (!productData) {
        console.error(`Product with ID ${productId} not found`);
        // Could redirect to a 404 page or back to product listing
        // navigate('/');
      }

      setProduct(productData);
    };

    fetchProduct();
  }, [productId]);

  if (!product) {
    return <div className="container mx-auto p-8">Loading product...</div>;
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };
     

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Product Images */}
        <div className="lg:w-1/2">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
            <div className="relative">
              <img
                src={
                  product.images[currentImageIndex] ||
                  "/api/placeholder/500/400"
                }
                alt={product.name}
                className="w-full h-96 object-contain"
                onError={(e) => {
                  e.target.src = "/api/placeholder/500/400";
                }}
              />
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                <div className="rotate-180">→</div>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
              >
                →
              </button>
            </div>
          </div>

          {/* Thumbnail Images */}
          <div className="flex overflow-x-auto gap-2 pb-2">
            {product.images.map((img, index) => (
              <div
                key={index}
                className={`flex-shrink-0 border-2 rounded-lg cursor-pointer ${
                  index === currentImageIndex
                    ? "border-[#004aad]"
                    : "border-gray-200"
                }`}
                onClick={() => selectImage(index)}
              >
                <img
                  src={img || "/api/placeholder/80/80"}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  className="w-20 h-16 object-contain"
                  onError={(e) => {
                    e.target.src = "/api/placeholder/80/80";
                  }}
                />
              </div>
            ))}
          </div>

          {/* Review Summary */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-6xl font-bold">{product.rating}</div>
              <div className="text-lg">{product.reviewCount} reviews</div>
            </div>

            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2 mb-2">
                <div className="w-4">{rating}</div>
                <Star className="w-4 h-4" />
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-black rounded-full h-2"
                    style={{
                      width:
                        rating === 5
                          ? "70%"
                          : rating === 4
                          ? "20%"
                          : rating === 3
                          ? "5%"
                          : rating === 2
                          ? "3%"
                          : "2%",
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className="lg:w-1/2">
          {/* Rating */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-black" />
              ))}
            </div>
            <span className="font-medium">{product.rating} Star Rating</span>
            <span className="text-gray-500">
              ({product.reviewCount.toLocaleString()} User feedback)
            </span>
          </div>

          {/* Product Title */}
          <h1 className="text-2xl font-bold mb-4">
            {product.name} (13-inch, 8GB RAM, 256GB SSD Storage) - Space Gray
          </h1>

          {/* Product Info */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <div>
              <span className="text-gray-500">Sku:</span> {product.sku}
            </div>
            <div>
              <span className="text-gray-500">Availability:</span>{" "}
              {product.availability}
            </div>
            <div>
              <span className="text-gray-500">Brand:</span> {product.brand}
            </div>
            <div>
              <span className="text-gray-500">Category:</span>{" "}
              {product.category}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold">{product.price}</span>
            <span className="text-gray-500 line-through">
              {product.oldPrice}
            </span>
            <span className="bg-gray-200 px-2 py-1 text-sm">
              {product.discount} OFF
            </span>
          </div>

          {/* Product Options */}
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-8">
              {/* Color */}
              <div>
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex gap-2">
                  <option className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#004aad]"></option>
                  <option className="w-8 h-8 rounded-full bg-gray-200"></option>
                </div>
              </div>

              {/* Size */}
              <div>
                <h3 className="font-medium mb-2">Size</h3>
                <div className="relative">
                  <select className="w-full p-3 border rounded-lg appearance-none pr-10">
                    <option>14-inch Liquid Retina XDR display</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Memory */}
              <div>
                <h3 className="font-medium mb-2">Memory</h3>
                <div className="relative">
                  <select className="w-full p-3 border rounded-lg appearance-none pr-10">
                    <option>16GB unified memory</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Storage */}
              <div>
                <h3 className="font-medium mb-2">Storage</h3>
                <div className="relative">
                  <select className="w-full p-3 border rounded-lg appearance-none pr-10">
                    <option>1TV SSD Storage</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex gap-4 mb-6">
            <div className="flex items-center border-2 border-[#004aad] rounded-lg">
              <button className="px-4 py-3" onClick={decreaseQuantity}>
                <Minus className="w-4 h-4" />
              </button>
              <div className="px-4 py-3">
                {String(quantity).padStart(2, "0")}
              </div>
              <button className="px-4 py-3" onClick={increaseQuantity}>
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart and Buy Now buttons */}
            <Link
              to="/cart"
              className="bg-[#004aad] text-white px-8 py-3 rounded-lg flex items-center justify-center gap-2 flex-1">
              ADD TO CART
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </Link>

            <button className="border-2 border-[#004aad] text-[#004aad] px-8 py-3 rounded-lg">
              BUY NOW
            </button>
          </div>

          {/* Wishlist and Compare */}
          <div className="flex gap-6 mb-8">
            <button className="flex items-center gap-2 text-gray-600">
              <Heart className="w-5 h-5" />
              Add to Wishlist
            </button>

            <button className="flex items-center gap-2 text-gray-600">
              <Share2 className="w-5 h-5" />
              Add to Compare
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <span className="text-gray-600">Share product:</span>
              <button className="text-gray-600">
                <Copy className="w-5 h-5" />
              </button>
              <button className="text-gray-600">
                <Facebook className="w-5 h-5" />
              </button>
              <button className="text-gray-600">
                <Twitter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Security Info */}
          <div className="mb-8">
            <div className="text-left mb-2">100% Guarantee Safe Checkout</div>
            <div className="flex justify-start gap-2">
              <img className="w-12 h-6 bg-gray-200 rounded"></img>
              <img className="w-12 h-6 bg-gray-200 rounded"></img>
              <img className="w-12 h-6 bg-gray-200 rounded"></img>
              <img className="w-12 h-6 bg-gray-200 rounded"></img>
              <img className="w-12 h-6 bg-gray-200 rounded"></img>
            </div>
          </div>

          {/* Product Features */}
          <div>
            <h3 className="font-bold mb-4 text-[24px] text-gray-800">About Item</h3>
            <ul className="space-y-4">
              {product.features.map((feature, index) => (
                <li key={index} className="flex gap-2">
                  <div className="text-gray-800">•</div>
                  <div>
                    <span className="font-bold text-gray-800 text-[14px]">{feature.title}</span>{" "}
                    {feature.description}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
