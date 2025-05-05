import { useState, useEffect } from 'react';
import { Search, PlusCircle, Edit, Trash2, Check, ChevronLeft, MapPin, Home, Building, Briefcase } from 'lucide-react';

const AddressManagement = () => {
  // State for addresses
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      recipient: 'Rith',
      street: '123 Main Street',
      district: 'Toul Kork',
      city: 'Phnom Penh',
      phone: '(885) 982-188-32',
      isDefault: true,
      type: 'home'
    },
    {
      id: 2,
      name: 'Office',
      recipient: 'Rith',
      street: 'Street 310 Near Burger King',
      district: 'Boeng Keng Kang',
      city: 'Phnom Penh',
      zip: '10002',
      phone: '(855) 982-188-32',
      isDefault: false,
      type: 'work'
    }
  ]);
  
  // States for UI control
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [filteredAddresses, setFilteredAddresses] = useState([]);

  // New address template
  const emptyAddress = {
    id: null,
    name: '',
    recipient: '',
    street: '',
    district: '',
    city: '',
    zip: '',
    phone: '',
    isDefault: false,
    type: 'home'
  };

  // Filter addresses when search term changes
  useEffect(() => {
    const results = addresses.filter(address =>
      address.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      address.street.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAddresses(results);
  }, [searchTerm, addresses]);

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Start adding new address
  const handleAddNew = () => {
    setCurrentAddress(emptyAddress);
    setIsAddingAddress(true);
    setIsEditingAddress(false);
  };

  // Start editing an address
  const handleEdit = (address) => {
    setCurrentAddress({...address});
    setIsEditingAddress(true);
    setIsAddingAddress(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentAddress({
      ...currentAddress,
      [name]: value
    });
  };

  // Handle checkbox for default address
  const handleDefaultChange = (e) => {
    setCurrentAddress({
      ...currentAddress,
      isDefault: e.target.checked
    });
  };

  // Handle address type selection
  const handleTypeChange = (type) => {
    setCurrentAddress({
      ...currentAddress,
      type
    });
  };

  // Save new or edited address
  const handleSave = () => {
    if (isAddingAddress) {
      // Add new address with a new ID
      const newAddress = {
        ...currentAddress,
        id: addresses.length > 0 ? Math.max(...addresses.map(a => a.id)) + 1 : 1
      };
      
      // If this is set as default, update other addresses
      let updatedAddresses = [...addresses];
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          isDefault: false
        }));
      }
      
      setAddresses([...updatedAddresses, newAddress]);
    } else if (isEditingAddress) {
      // Update existing address
      let updatedAddresses = [...addresses];
      
      // If this is set as default, update other addresses
      if (currentAddress.isDefault) {
        updatedAddresses = updatedAddresses.map(addr => ({
          ...addr,
          isDefault: addr.id === currentAddress.id
        }));
      } else {
        // Make sure at least one address is default
        const hasDefault = updatedAddresses.some(addr => 
          addr.id !== currentAddress.id && addr.isDefault
        );
        
        if (!hasDefault) {
          // If no other default exists, keep this as default
          currentAddress.isDefault = true;
        }
      }
      
      // Replace the edited address in the array
      const index = updatedAddresses.findIndex(addr => addr.id === currentAddress.id);
      if (index !== -1) {
        updatedAddresses[index] = currentAddress;
      }
      
      setAddresses(updatedAddresses);
    }
    
    // Reset form state
    setIsAddingAddress(false);
    setIsEditingAddress(false);
    setCurrentAddress(null);
  };

  // Delete an address
  const handleDelete = (id) => {
    const addressToDelete = addresses.find(addr => addr.id === id);
    
    // Check if we're deleting the default address
    if (addressToDelete && addressToDelete.isDefault && addresses.length > 1) {
      // Set another address as default
      const newAddresses = addresses.filter(addr => addr.id !== id);
      newAddresses[0].isDefault = true;
      setAddresses(newAddresses);
    } else {
      // Just remove the address
      setAddresses(addresses.filter(addr => addr.id !== id));
    }
  };

  // Set an address as default
  const handleSetDefault = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }));
    setAddresses(updatedAddresses);
  };

  // Cancel adding/editing
  const handleCancel = () => {
    setIsAddingAddress(false);
    setIsEditingAddress(false);
    setCurrentAddress(null);
  };

  // Render address type icon
  const renderAddressTypeIcon = (type) => {
    switch (type) {
      case 'home':
        return <Home size={16} className="text-blue-500" />;
      case 'work':
        return <Briefcase size={16} className="text-orange-500" />;
      case 'other':
        return <Building size={16} className="text-purple-500" />;
      default:
        return <MapPin size={16} className="text-gray-500" />;
    }
  };

  return (

    <div className="bg-white rounded-lg shadow p-6 max-w-screen mx-auto">
      {/* Header Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Address Management</h2>
        <p className="text-gray-600">Manage your shipping and billing addresses</p>
      </div>

      {/* Main Content */}
      {!isAddingAddress && !isEditingAddress ? (
        <>
          {/* Search and Add New Bar */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search addresses..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <button
              onClick={handleAddNew}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
            >
              <PlusCircle size={18} className="mr-2 " />
              Add New Address
            </button>
          </div>

          {/* Address List */}
          {filteredAddresses.length > 0 ? (
            <div className="space-y-4">
              {filteredAddresses.map((address) => (
                <div 
                  key={address.id} 
                  className={`border rounded-lg p-4 ${address.isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      {renderAddressTypeIcon(address.type)}
                      <span className="ml-2 font-medium">{address.name}</span>
                      {address.isDefault && (
                        <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Default</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(address)}
                        className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(address.id)}
                        className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                        disabled={address.isDefault && addresses.length > 1}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-2">
                    <p className="text-gray-600">{address.recipient}</p>
                    <p className="text-gray-600">{address.street}</p>
                    <p className="text-gray-600">{address.district}, {address.city} </p>
                    <p className="text-gray-600">{address.phone}</p>
                  </div>
                  
                  {!address.isDefault && (
                    <button 
                      onClick={() => handleSetDefault(address.id)}
                      className="mt-3 text-sm text-blue-600 hover:text-blue-800 flex items-center cursor-pointer"
                    >
                      <Check size={14} className="mr-1" />
                      Set as Default
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-700">No addresses found</h3>
              <p className="text-gray-500 mt-1">
                {searchTerm ? "Try a different search term" : "Add your first address to get started"}
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-4 text-blue-600 hover:text-blue-800"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </>
      ) : (
        // Add/Edit Address Form
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <button 
              onClick={handleCancel}
              className="mr-3 text-gray-500 hover:text-blue-600 cursor-pointer"
            >
              <ChevronLeft size={20}/>
            </button>
            <h3 className="text-lg font-medium">
              {isAddingAddress ? "Add New Address" : "Edit Address"}
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Name</label>
              <input
                type="text"
                name="name"
                value={currentAddress?.name || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Home, Office"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Recipient Name</label>
              <input
                type="text"
                name="recipient"
                value={currentAddress?.recipient || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Street Address</label>
              <input
                type="text"
                name="street"
                value={currentAddress?.street || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Street Address"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District</label>
              <input
                type="text"
                name="district"
                value={currentAddress?.city || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="District"
              />
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City</label>
                <input
                  type="text"
                  name="city"
                  value={currentAddress?.state || ''}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="City"
                />
              </div>
              
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={currentAddress?.phone || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Phone Number"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
              <div className="flex space-x-4 mt-1">
                <button
                  type="button"
                  onClick={() => handleTypeChange('home')}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    currentAddress?.type === 'home' 
                      ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 cursor-pointer'
                  }`}
                >
                  <Home size={16} className="mr-2" />
                  Home
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('work')}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    currentAddress?.type === 'work' 
                      ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 cursor-pointer'
                  }`}
                >
                  <Briefcase size={16} className="mr-2" />
                  Work
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('other')}
                  className={`flex items-center px-3 py-2 rounded-md ${
                    currentAddress?.type === 'other' 
                      ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 cursor-pointer'
                  }`}
                >
                  <Building size={16} className="mr-2" />
                  Other
                </button>
              </div>
            </div>
            
            <div className="md:col-span-2 flex items-center mt-2">
              <input
                type="checkbox"
                id="isDefault"
                checked={currentAddress?.isDefault || false}
                onChange={handleDefaultChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                Set as default address
              </label>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isAddingAddress ? "Add Address" : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// For demo purposes: A wrapper component that simulates the settings page
const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('addresses');
  
  return (
    <div className="bg-white min-h-screen pt-10 pb-12 px-4 ">
      <div className="max-w-screen mx-auto px-22">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button 
            className={`px-4 py-2 font-medium ${
              activeTab === 'addresses' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 cursor-pointer'
            }`}
            onClick={() => setActiveTab('addresses')}
          >
            Addresses
          </button>
          <button 
            className={`px-4 py-2 font-medium ${
              activeTab === 'payment' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 cursor-pointer'
            }`}
            onClick={() => setActiveTab('payment')}
          >
            Payment Methods
          </button>
          <button 
            className={`px-4 py-2 font-medium ${
              activeTab === 'security' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700 cursor-pointer'
            }`}
            onClick={() => setActiveTab('security')}
          >
            Security
          </button>
        </div>
        
        {/* Content */}
        {activeTab === 'addresses' && <AddressManagement />}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold">Profile Settings</h2>
            <p className="text-gray-500">Profile settings would appear here</p>
          </div>
        )}
        {activeTab === 'payment' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
            <p className="text-gray-500">Payment methods would appear here</p>
          </div>
        )}
        {activeTab === 'security' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold">Security Settings</h2>
            <p className="text-gray-500">Security settings would appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;