import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, ChevronRight, ChevronDown, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

//Connect this create category with user page 

const CategoryPage = () => {
  const [categories, setCategories] = useState([
    { 
      id: 1, 
      name: 'MacBook Pro', 
      description: 'Professional grade laptops', 
      productCount: 24,
      expanded: false,
      products: [
        { id: 101, name: 'MacBook Pro 16-inch', price: 1200, image: '/api/placeholder/80/60' },
        { id: 102, name: 'MacBook Pro 14-inch', price: 900, image: '/api/placeholder/80/60' },
        { id: 103, name: 'MacBook Pro M3', price: 1500, image: '/api/placeholder/80/60' }
      ]
    },
    { 
      id: 2, 
      name: 'MacBook Air', 
      description: 'Lightweight laptops for everyday use', 
      productCount: 12,
      expanded: false,
      products: [
        { id: 201, name: 'MacBook Air 13-inch', price: 850, image: '/api/placeholder/80/60' },
        { id: 202, name: 'MacBook Air M2', price: 1000, image: '/api/placeholder/80/60' }
      ]
    },
    { 
      id: 3, 
      name: 'iMac', 
      description: 'All-in-one desktop computers', 
      productCount: 8,
      expanded: false,
      products: [
        { id: 301, name: 'iMac 24-inch', price: 1300, image: '/api/placeholder/80/60' },
        { id: 302, name: 'iMac 27-inch', price: 1800, image: '/api/placeholder/80/60' }
      ]
    },
    { 
      id: 4, 
      name: 'Mac Mini', 
      description: 'Compact desktop computers', 
      productCount: 5,
      expanded: false,
      products: [
        { id: 401, name: 'Mac Mini M2', price: 700, image: '/api/placeholder/80/60' }
      ]
    },
    { 
      id: 5, 
      name: 'Mac Studio', 
      description: 'High-performance desktop computers', 
      productCount: 3,
      expanded: false,
      products: [
        { id: 501, name: 'Mac Studio M2 Max', price: 2000, image: '/api/placeholder/80/60' }
      ]
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: ''
  });

  // Filter categories based on search term
  const filteredCategories = categories.filter(category => 
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Toggle category expansion to show/hide products
  const toggleExpand = (id) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, expanded: !category.expanded } : category
    ));
  };

  // Move category up in the order
  const moveUp = (index) => {
    if (index === 0) return;
    const newCategories = [...categories];
    [newCategories[index], newCategories[index - 1]] = [newCategories[index - 1], newCategories[index]];
    setCategories(newCategories);
  };

  // Move category down in the order
  const moveDown = (index) => {
    if (index === categories.length - 1) return;
    const newCategories = [...categories];
    [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
    setCategories(newCategories);
  };

  // Open modal for creating a new category
  const openCreateModal = () => {
    setEditingCategory(null);
    setNewCategory({ name: '', description: '' });
    setIsModalOpen(true);
  };

  // Open modal for editing an existing category
  const openEditModal = (category) => {
    setEditingCategory(category);
    setNewCategory({ name: category.name, description: category.description });
    setIsModalOpen(true);
  };

  // Handle form submission for create/edit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id ? { ...cat, name: newCategory.name, description: newCategory.description } : cat
      ));
    } else {
      // Create new category
      const newId = Math.max(...categories.map(cat => cat.id)) + 1;
      setCategories([...categories, { 
        id: newId, 
        name: newCategory.name, 
        description: newCategory.description,
        productCount: 0,
        expanded: false,
        products: []
      }]);
    }
    
    setIsModalOpen(false);
  };

  // Delete a category
  const deleteCategory = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="container justify-center p-6 max-w-screen bg-gray-50 min-h-screen ml-62">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Category Management</h1>
        <div className="text-sm text-gray-500">Total Categories: {categories.length}</div>
      </div>

      {/* Search and Add Category */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search categories..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
        </div>
        
        <button 
          onClick={openCreateModal}
          className="flex items-center bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition">
          <Plus size={18} className="mr-2" />
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider w-10"></th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Products</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Order</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category, index) => (
                <>
                  <tr key={category.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={() => toggleExpand(category.id)}
                        className="text-gray-500 hover:text-blue-600"
                      >
                        {category.expanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {category.productCount} products
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => openEditModal(category)} 
                          className="text-blue-600 hover:text-blue-900">
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => deleteCategory(category.id)} 
                          className="text-red-600 hover:text-red-900">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className={`p-1 rounded ${index === 0 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}>
                          <ArrowUp size={18} />
                        </button>
                        <button 
                          onClick={() => moveDown(index)}
                          disabled={index === categories.length - 1}
                          className={`p-1 rounded ${index === categories.length - 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}>
                          <ArrowDown size={18} />
                        </button>
                        <div className="p-1 cursor-move text-gray-600">
                          <GripVertical size={18} />
                        </div>
                      </div>
                    </td>
                  </tr>
                  {category.expanded && (
                    <tr className="bg-gray-50">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="ml-8">
                          <h4 className="font-medium mb-3">Products in {category.name}</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {category.products.map(product => (
                              <Link 
                                key={product.id} 
                                to={`/products/${product.id}`}
                                className="flex items-center p-3 border rounded-lg hover:bg-blue-50 transition"
                              >
                                <img src={product.image} alt={product.name} className="w-16 h-12 object-cover rounded" />
                                <div className="ml-3">
                                  <div className="font-medium text-blue-600">{product.name}</div>
                                  <div className="text-sm text-gray-500">${product.price}</div>
                                </div>
                              </Link>
                            ))}
                          </div>
                          {category.products.length === 0 && (
                            <div className="text-gray-500 italic">No products in this category</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                  No categories found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? 'Edit Category' : 'Create New Category'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Category Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter category name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Enter category description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  rows="3"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingCategory ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;