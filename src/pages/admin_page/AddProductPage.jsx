import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Save, X, Info, DollarSign, Plus } from 'lucide-react';

const AdminAddProductPage = () => {
  const navigate = useNavigate();
  
  // Product state
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Headphone',
    discount: '',
  });
  
  // Image states
  const [images, setImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [tags, setTags] = useState(['Headpiece', 'Headphone', 'Earphones']);
  const [newTag, setNewTag] = useState('');
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });
  };
  
  // Handle image selection
  const handleImageSelect = (e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      
      // Create preview URLs for the images
      const newImagePreviews = selectedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      
      // Set the first uploaded image as main if no main image exists
      if (!mainImage && selectedFiles.length > 0) {
        setMainImage(newImagePreviews[0].preview);
      }
      
      setImages([...images, ...selectedFiles]);
      setImagePreview([...imagePreview, ...newImagePreviews]);
    }
  };
  
  // Remove an image
  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreview];
    
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(newPreviews[index].preview);
    
    // If removing the main image, set the next available as main
    if (mainImage === newPreviews[index].preview) {
      if (newPreviews.length > 1) {
        // Find the next image that's not being removed
        const nextMainIndex = index === newPreviews.length - 1 ? 0 : index + 1;
        setMainImage(newPreviews[nextMainIndex].preview);
      } else {
        setMainImage(null);
      }
    }
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreview(newPreviews);
  };
  
  // Set an image as the main product image
  const setAsMainImage = (preview) => {
    setMainImage(preview);
  };
  
  // Add a new tag
  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };
  
  // Remove a tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create form data for sending files
    const formData = new FormData();
    
    // Add product details
    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
    });
    
    // Add all images
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });
    
    // Add main image index
    const mainImageIndex = imagePreview.findIndex(img => img.preview === mainImage);
    if (mainImageIndex !== -1) {
      formData.append('mainImageIndex', mainImageIndex);
    }
    
    // Add tags
    formData.append('tags', JSON.stringify(tags));
    
    // Here you would typically send the formData to your backend
    console.log('Product data to be submitted:', product);
    console.log('Images to be uploaded:', images);
    console.log('Main image index:', mainImageIndex);
    console.log('Tags:', tags);
    
    // Simulate successful save and redirect
    alert('Product added successfully!');
    navigate('/admin/products');
  };
  
  // Clean up object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      imagePreview.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, [imagePreview]);
  
  return (
    <div className="container min-h-screen max-w-screen mx-auto px-8 py-6 ml-60">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add Product</h1>
        <div className="flex text-sm text-gray-500">
          <span>Product</span>
          <span className="mx-1">/</span>
          <span className="text-blue-500">Add Product</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column - Image Uploads */}
          <div className="lg:w-1/3">
            {/* Main Image Display */}
            <div className="bg-gray-50 border-2 border-gray-400 rounded-xl mb-4 p-2 flex items-center justify-center h-96">
              {mainImage ? (
                <img 
                  src={mainImage} 
                  alt="Main product view" 
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center text-gray-400">
                  <p>No main image selected</p>
                </div>
              )}
            </div>
            
            {/* Image Thumbnails */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              {imagePreview.map((img, index) => (
                <div 
                  key={index} 
                  className={`relative cursor-pointer border rounded-lg overflow-hidden h-24 ${mainImage === img.preview ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setAsMainImage(img.preview)}
                >
                  <img
                    src={img.preview}
                    alt={`Product thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(index);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              
              {/* Add Image Button */}
              <div 
                className="border-2 border-gray-400 border-dashed rounded-lg flex items-center justify-center h-24 cursor-pointer hover:bg-gray-50"
                onClick={() => document.getElementById('image-upload').click()}
              >
                <div className="bg-blue-500 rounded-full p-2">
                  <Plus size={24} className="text-white" />
                </div>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageSelect}
                />
              </div>
            </div>
            
            {/* Image Upload Help */}
            <div className="text-center text-xs text-gray-500 mt-2">
              <p>Click on thumbnail to set as main image</p>
              <p>Click + to add more images</p>
            </div>
          </div>
          
          {/* Right Column - Product Details */}
          <div className="lg:w-2/3">
            {/* Product Name */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <label htmlFor="name" className="text-gray-700 font-medium">
                  Product Name
                </label>
                <Info size={16} className="ml-2 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={product.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="e.g. Sony MDRZX110 Series Stereo Headphones (Black)"
                required
              />
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <label htmlFor="description" className="text-gray-700 font-medium">
                  Description
                </label>
                <Info size={16} className="ml-2 text-gray-400" />
              </div>
              <div className="border border-gray-300 rounded-lg">
                <div className="flex border-b border-gray-300 p-2">
                  <button type="button" className="p-1"><span className="font-bold">A</span></button>
                  <button type="button" className="p-1 mx-1"><span className="font-bold">B</span></button>
                  <button type="button" className="p-1 mx-1"><span className="italic">I</span></button>
                  <button type="button" className="p-1 mx-1"><span className="underline">U</span></button>
                  <div className="border-l border-gray-300 mx-2"></div>
                  <button type="button" className="p-1 mx-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                      <line x1="17" y1="18" x2="3" y2="18"></line>
                    </svg>
                  </button>
                  <button type="button" className="p-1 mx-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="12" x2="9" y2="12"></line>
                      <line x1="21" y1="18" x2="7" y2="18"></line>
                    </svg>
                  </button>
                  <button type="button" className="p-1 mx-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="21" y1="6" x2="3" y2="6"></line>
                      <line x1="21" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="18" x2="3" y2="18"></line>
                    </svg>
                  </button>
                  <button type="button" className="p-1 mx-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="3" y1="9" x2="21" y2="9"></line>
                      <line x1="3" y1="15" x2="21" y2="15"></line>
                      <line x1="9" y1="3" x2="9" y2="21"></line>
                      <line x1="15" y1="3" x2="15" y2="21"></line>
                    </svg>
                  </button>
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  rows="5"
                  className="w-full px-4 py-2 border-0 rounded-b-lg focus:ring-0"
                  placeholder="Enter product description here"
                  required
                ></textarea>
              </div>
            </div>
            
            {/* Category */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <label htmlFor="category" className="text-gray-700 font-medium">
                  Category
                </label>
                <Info size={16} className="ml-2 text-gray-400" />
              </div>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none pr-10"
                  required
                >
                  <option value="Headphone">Headphone</option>
                  <option value="Earbuds">Earbuds</option>
                  <option value="Speakers">Speakers</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Price and Discount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="flex items-center mb-2">
                  <label htmlFor="price" className="text-gray-700 font-medium">
                    Price
                  </label>
                  <Info size={16} className="ml-2 text-gray-400" />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
                    placeholder="366"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center">
                    <div className="h-full border-r border-gray-300 flex items-center px-2">
                      <DollarSign size={16} className="text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-2">
                  <label htmlFor="discount" className="text-gray-700 font-medium">
                    Discount
                  </label>
                  <Info size={16} className="ml-2 text-gray-400" />
                </div>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder="50%"
                />
              </div>
            </div>
            
            {/* Tags */}
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <label className="text-gray-700 font-medium">
                  Search Tags
                </label>
                <Info size={16} className="ml-2 text-gray-400" />
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {tags.map((tag, index) => (
                  <div key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full flex items-center">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg"
                  placeholder="Add new tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 cursor-pointer"
                >
                  Add
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={() => navigate('/admin/products')}
                className="px-6 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center px-8 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:bg-[#2463EB] cursor-pointer"
              >
                <Save size={16} className="mr-2" />
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AdminAddProductPage;