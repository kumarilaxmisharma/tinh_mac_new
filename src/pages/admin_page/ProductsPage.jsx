import { useState } from 'react';
import {  Plus, ChevronLeft, ChevronRight, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  
  // Sample electronics product data based on the second image
  const products = [
    { 
      id: '#761324', 
      name: 'MacBook Pro 16-inch', 
      category: 'MacBook Pro', 
      price: 1200, 
      originalPrice: 732,
      discount: '50% off', 
      rating: 5,
      image: '/api/placeholder/120/100',
      status: 'Stock',
      pieces: 32
    },
    { 
      id: '#761325', 
      name: 'MacBook Air 13-inch', 
      category: 'MacBook Air', 
      price: 850, 
      originalPrice: 450,
      discount: '', 
      rating: 5,
      image: '/api/placeholder/120/100',
      status: 'Stock',
      pieces: 45
    },
    { 
      id: '#761326', 
      name: 'MacBook Pro 14-inch', 
      category: 'MacBook Pro', 
      price: 900, 
      originalPrice: 1100,
      discount: '50% off', 
      rating: 5,
      image: '/api/placeholder/120/100',
      status: 'Stock',
      pieces: 32
    },
    { 
      id: '#761327', 
      name: 'IMac', 
      category: 'IMac', 
      price: 1300, 
      originalPrice: 1340,
      discount: '50% off', 
      rating: 5,
      image: '/api/placeholder/120/100',
      status: 'Stock',
      pieces: 9
    },
    
  ];

  // Pagination functionality for product cards
  const productsPerPage = 4;
  const totalPages = Math.ceil(products.length / productsPerPage);
  const displayedProducts = products.slice(0, productsPerPage);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= Math.min(10, totalPages); i++) {
    pageNumbers.push(i);
  }

  // Generate star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="flex flex-col min-h-screen ml-62 bg-gray-50 p-6 max-w-screen flex-grow">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Products</h1>
      
      {/* Filter and Upload Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-56">
          <select className="appearance-none bg-white border border-gray-300 rounded-lg py-2 px-4 pr-8 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:shadow-md">
            <option>All categories</option>
            <option>MacBook Air</option>
            <option>MacBook Pro</option>
            <option>IMac</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 size={16}">
            
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="flex items-center space-x-1 mr-4">
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-400 bg-white cursor-pointer hover:bg-blue-200 focus:bg-[#2463EB] focus:text-white"
            >
              <ChevronLeft size={16} />
            </button>
            
            <button className="w-8 h-8 flex items-center justify-center rounded-md border-gray-400 bg-blue-600 text-white cursor-pointer">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-400 bg-white cursor-pointer">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-400 bg-white cursor-pointer">3</button>
            
            <button 
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} 
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-400 bg-white cursor-pointer hover:bg-blue-200 focus:bg-[#2463EB] focus:text-white" 
            >
              <ChevronRight size={16} />
            </button>
          </div>
          
          <Link
            to="/add-product" 
            className="flex items-center bg-blue-600 text-white rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-700 focus:bg-[#2463EB] ">
            <Plus size={18} className="mr-2" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {displayedProducts.map((product, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform transform hover:scale-105">
            {product.discount && (
              <div className="absolute m-2">
                <span className={`text-xs font-semibold px-2 py-1 rounded ${
                  product.discount.includes('%') ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
                }`}>
                  {product.discount}
                </span>
              </div>
            )}
            
            <div className="p-4 flex flex-col h-full">
              <div className="flex justify-center items-center h-32 mb-4">
                <img src={product.image} alt={product.name} className="max-h-full" />
              </div>
              
              <div className="mb-2">
                <p className="text-sm text-gray-500">{product.category}</p>
                <h3 className="font-medium">{product.name}</h3>
                <div className="flex items-center mt-1">
                  {renderStars(product.rating)}
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center mt-2">
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through mr-2">${product.originalPrice}</span>
                  )}
                  <span className="font-bold">${product.price}</span>
                </div>
                
                <button className="w-full mt-4 py-2 bg-blue-100 text-blue-600 rounded-md font-medium transition hover:bg-blue-200 cursor-pointer ">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Products List Table */}
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-800 mb-2">Products List</h2>
        <div className="flex justify-end mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Show</span>
            <div className="relative">
              <select 
                className="appearance-none border rounded px-2 py-1 pr-6 text-sm"
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1 text-gray-700">
                {/* <ChevronDown size={12} /> */}
              </div>
            </div>
            <span className="text-sm text-gray-600 ml-2">Entries</span>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">ID Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Product Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Pieces</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.slice(0, entriesPerPage).map((product, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {product.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-md" src={product.image} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-blue-600">{product.name}</div>
                      <div className="text-xs text-gray-500">Model 2020</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.pieces}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex text-xs leading-5 font-semibold rounded-full px-2 py-1 ${
                    product.status === 'Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Table Pagination */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Showing 1 - {Math.min(entriesPerPage, products.length)} out of {products.length} entries
        </div>
        <div className="flex items-center space-x-1">
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-600 text-white">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 border">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 border">
            3
          </button>
          <span className="px-2">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded-md bg-white text-gray-700 border">
            10
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;