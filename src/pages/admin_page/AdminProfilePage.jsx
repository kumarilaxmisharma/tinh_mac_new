import { useState } from 'react';
import { Search, Edit, Plus, ChevronLeft, ChevronRight, User } from 'lucide-react';
import {Link} from 'react-router-dom';

const AdminProfilePage = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Mock user data
  const users = [
    {
      id: 1,
      firstName: 'Jack',
      lastName: 'Adams',
      email: 'jackadams@gmail.com',
      phone: '(213) 555-1234',
      role: 'Product Designer',
      location: 'Los Angeles, California, USA',
      country: 'United States of America',
      city_state: 'California, USA',
      postalCode: 'ERT 62574',
      taxId: 'AS564178969',
      status: 'active',
      bio: 'Product Designer'
    },
    {
      id: 2,
      firstName: 'Emily',
      lastName: 'Johnson',
      email: 'emily.j@example.com',
      phone: '(415) 555-6789',
      role: 'UX Researcher',
      location: 'San Francisco, California, USA',
      status: 'active'
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'mchen@example.com',
      phone: '(312) 555-9876',
      role: 'Frontend Developer',
      location: 'Chicago, Illinois, USA',
      status: 'inactive'
    }
  ];

  // Filtered users based on search
  const filteredUsers = users.filter(user => 
    user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const usersPerPage = 5;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setActiveTab('detail');
  };

  const handleCreateNew = () => {
    setSelectedUser(null);
    setActiveTab('create');
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setActiveTab('edit');
  };

  return (
    <div className="container justify-center p-6 max-w-screen bg-gray-50 min-h-screen ml-60">
      <div className="container px-4 py-2 max-w-screen mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Users</h1>
          <Link 
            onClick={handleCreateNew}
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md flex items-center cursor-pointer"
          >
            <Plus size={20} className="mr-2" />
            Add Users
          </Link>
        </div>

        {/* User Listing */}
        {activeTab === 'list' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="mb-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={20} className="text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search users..." 
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-blue-600">
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User size={20} className="text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.firstName} {user.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{user.location}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleUserSelect(user)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View
                        </button>
                        <button 
                          onClick={() => handleEditUser(user)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          <Edit size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6">
                <div className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * usersPerPage + 1} to {Math.min(currentPage * usersPerPage, filteredUsers.length)} of {filteredUsers.length} results
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-8 h-8 rounded-md ${
                        currentPage === i + 1 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* User Detail View */}
        {activeTab === 'detail' && selectedUser && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <button 
                onClick={() => setActiveTab('list')}
                className="mb-4 flex items-center text-blue-500 hover:text-blue-700"
              >
                <ChevronLeft size={16} className="mr-1" />
                Back to users
              </button>

              <div className="mb-6 flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Profile</h2>
              </div>

              <div className="border rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <User size={32} className="text-gray-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedUser.firstName} {selectedUser.lastName}</h3>
                      <p className="text-gray-500">{selectedUser.role}</p>
                      <p className="text-gray-500">{selectedUser.location}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleEditUser(selectedUser)}
                    className="flex items-center text-gray-500 hover:text-gray-700"
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Personal information</h3>
                  <button 
                    onClick={() => handleEditUser(selectedUser)}
                    className="flex items-center text-gray-500 hover:text-gray-700"
                  >
                    <Edit size={16} className="mr-1" />
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-500">First Name</p>
                    <p className="text-gray-700">{selectedUser.firstName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Name</p>
                    <p className="text-gray-700">{selectedUser.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email address</p>
                    <p className="text-gray-700">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="text-gray-700">{selectedUser.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-gray-500">Bio</p>
                    <p className="text-gray-700">{selectedUser.bio || 'No bio provided'}</p>
                  </div>
                </div>
              </div>

              {selectedUser.country && (
                <div className="border rounded-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Address</h3>
                    <button 
                      onClick={() => handleEditUser(selectedUser)}
                      className="flex items-center text-gray-500 hover:text-gray-700"
                    >
                      <Edit size={16} className="mr-1" />
                      Edit
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="text-gray-700">{selectedUser.country}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Province</p>
                      <p className="text-gray-700">{selectedUser.address}</p>
                    </div>
                    </div>
                  </div>
              )}
            </div>
          </div>
        )}

        {/* Create User Form */}
        {activeTab === 'create' && (
          <UserForm 
            onCancel={() => setActiveTab('list')} 
            onSubmit={(data) => {
              // Here you would handle creating the user
              console.log('Creating user:', data);
              setActiveTab('list');
            }} 
          />
        )}

        {/* Edit User Form */}
        {activeTab === 'edit' && selectedUser && (
          <UserForm 
            initialData={selectedUser}
            onCancel={() => setActiveTab(selectedUser ? 'detail' : 'list')} 
            onSubmit={(data) => {
              // Here you would handle updating the user
              console.log('Updating user:', data);
              setActiveTab('detail');
            }} 
          />
        )}
      </div>
    </div>
  );
}

// User Form Component
function UserForm({ initialData = {}, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    role: initialData.role || '',
    bio: initialData.bio || '',
    address: initialData.address || '',
    provice: initialData.city_state || '',
    status: initialData.status || 'active',
    ...initialData
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (

    //Form
    <div className="grid grid-grow grid-cols-1 md:grid-cols-2 justify-between container bg-white rounded-[24px] shadow-lg ml-10">
      {/* Personal Info */}
      <div className="p-6 rounded-lg container max-w-screen">
        <button 
          onClick={onCancel}
          className="mb-4 flex items-center text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          <ChevronLeft size={16} className="mr-1" />
          Back
        </button>

        <h2 className="text-xl font-semibold mb-6">
          {initialData.id ? 'Edit User' : 'Create New User'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="border border-gray-400 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 (Optional)">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="3"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="border border-gray-400 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Address</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Province
                </label>
                <input
                  type="text"
                  name="city_state"
                  value={formData.city_state}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md cursor-pointer"
            >
              {initialData.id ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProfilePage;