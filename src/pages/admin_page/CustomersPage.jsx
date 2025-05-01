import { useState } from 'react';
import { Search, Edit, Lock, Trash, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  // Mock customer data
  const customers = Array(50).fill().map((_, index) => ({
    id: index + 1,
    name: 'Robert Fox',
    email: 'robert@gmail.com',
    phone: '(201) 555-0124',
    created: '6 April 2023',
    avatar: `https://api.dicebear.com/6.x/micah/svg?seed=${index}` // Using DiceBear for placeholder avatars
  }));
  
  // Filter customers based on search query
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.phone.includes(searchQuery)
  );
  
  // Pagination
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);
  
  // Navigate to specific page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Get page numbers array
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <div className="w-full bg-gray-50 p-6 ml-62">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      {/* Search Bar */}
      <div className="mb-6 relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {/* Customer Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="text-left text-white text-sm uppercase bg-blue-600">
              <th className="px-6 py-3 font-medium tracking-wider">Name</th>
              <th className="px-6 py-3 font-medium tracking-wider">Phone Number</th>
              <th className="px-6 py-3 font-medium tracking-wider">Created</th>
              <th className="px-6 py-3 font-medium tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCustomers.map((customer) => (
              <tr key={customer.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-500">
                          {customer.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                      <div className="text-sm text-gray-500">{customer.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {customer.created}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <div className="flex justify-end space-x-3">
                    <button className="text-gray-400 hover:text-blue-600">
                      <Edit size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-blue-600">
                      <Lock size={18} />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Show
          <select 
            className="mx-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1); // Reset to first page when changing items per page
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select> 
          of {filteredCustomers.length}
        </div>

        {/* Pagination Controls */}
        <div className="flex space-x-1">
          <button 
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-2 py-1 rounded-md ${
              currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          
          {pageNumbers.map(number => {
            // Show first page, current page, last page, and one before/after current
            const showPage = number === 1 || 
                            number === totalPages || 
                            Math.abs(currentPage - number) <= 1;
            
            // Show ellipsis for page gaps
            const showEllipsis = (number === 2 && currentPage > 3) || 
                                (number === totalPages - 1 && currentPage < totalPages - 2);
            
            if (showEllipsis) {
              return <span key={number} className="px-3 py-1 text-gray-500">...</span>;
            }
            
            if (showPage) {
              return (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-8 h-8 rounded-md ${
                    currentPage === number 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {number}
                </button>
              );
            }
            
            return null;
          })}
          
          <button 
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`px-2 py-1 rounded-md ${
              currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomersPage;