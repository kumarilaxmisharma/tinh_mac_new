import { useState, useEffect } from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { Calendar, ChevronDown, Package, DollarSign, ShoppingCart, Users } from 'lucide-react';


// Mock data - this would be replaced with your actual API data
const generateMockData = () => {
  // Daily purchase data for the chart
  const dailyPurchases = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - 30 + i);
    return {
      date: date.toISOString().split('T')[0],
      totalAmount: Math.floor(Math.random() * 10000) + 1000,
    };
  });

  // Top products by quantity
  const topProducts = [
    { id: 1, name: "Premium Headphones", qty: 247, price: 199.99 },
    { id: 2, name: "Wireless Mouse", qty: 183, price: 49.99 },
    { id: 3, name: "Mechanical Keyboard", qty: 156, price: 129.99 },
    { id: 4, name: "27\" Monitor", qty: 132, price: 299.99 },
    { id: 5, name: "USB-C Hub", qty: 118, price: 39.99 },
    { id: 6, name: "External SSD 1TB", qty: 97, price: 149.99 },
    { id: 7, name: "Webcam HD", qty: 91, price: 79.99 },
    { id: 8, name: "Bluetooth Speaker", qty: 84, price: 89.99 },
    { id: 9, name: "Laptop Stand", qty: 76, price: 29.99 },
    { id: 10, name: "Graphics Tablet", qty: 68, price: 199.99 }
  ];

  // Top users by purchase amount
  const topUsers = [
    { id: 1, name: "John Smith", email: "john.s@example.com", totalSpent: 4782.45 },
    { id: 2, name: "Emily Johnson", email: "emily.j@example.com", totalSpent: 3891.20 },
    { id: 3, name: "Michael Brown", email: "michael.b@example.com", totalSpent: 3456.78 },
    { id: 4, name: "Sarah Davis", email: "sarah.d@example.com", totalSpent: 3105.50 },
    { id: 5, name: "David Wilson", email: "david.w@example.com", totalSpent: 2876.33 },
    { id: 6, name: "Jessica Taylor", email: "jessica.t@example.com", totalSpent: 2654.90 },
    { id: 7, name: "Robert Miller", email: "robert.m@example.com", totalSpent: 2543.21 },
    { id: 8, name: "Jennifer White", email: "jennifer.w@example.com", totalSpent: 2398.67 },
    { id: 9, name: "Thomas Anderson", email: "thomas.a@example.com", totalSpent: 2187.55 },
    { id: 10, name: "Lisa Martin", email: "lisa.m@example.com", totalSpent: 2054.12 }
  ];

  // Summary stats
  const summary = {
    totalUsers: 1845,
    totalProducts: 378,
    totalSales: 247892.50,
    averageOrderValue: 127.45,
    activeUsers: 763,
  };

  return { dailyPurchases, topProducts, topUsers, summary };
};

// DateRangePicker component
const DateRangePicker = ({ startDate, endDate, onDateChange }) => {
  return (
    <div className="flex items-center p-2 bg-white rounded-lg border border-gray-200">
      <Calendar className="text-gray-500 mr-2" size={16} />
      <input 
        type="date" 
        value={startDate} 
        onChange={(e) => onDateChange(e.target.value, endDate)}
        className="border-none text-sm focus:outline-none" 
      />
      <span className="mx-2 text-gray-500">to</span>
      <input 
        type="date" 
        value={endDate} 
        onChange={(e) => onDateChange(startDate, e.target.value)}
        className="border-none text-sm focus:outline-none" 
      />
      <ChevronDown className="text-gray-500 ml-2" size={16} />
    </div>
  );
};

// Dashboard component
export default function Dashboard() {
  const [dateRange, setDateRange] = useState({
    startDate: '2025-03-24',
    endDate: '2025-04-23'
  });
  
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // This would be your API call in a real application
    setData(generateMockData());
  }, [dateRange]);
  
  if (!data) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  
  const handleDateChange = (start, end) => {
    setDateRange({ startDate: start, endDate: end });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        {/* Date Filter */}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
          <DateRangePicker 
            startDate={dateRange.startDate} 
            endDate={dateRange.endDate} 
            onDateChange={handleDateChange} 
          />
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Customers</p>
                <p className="text-2xl font-bold">{data.summary.totalUsers}</p>
              </div>
              <div className="bg-indigo-100 p-3 rounded-full">
                <Users className="text-indigo-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+12%</span>
              <span className="ml-2 text-gray-500">from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Products</p>
                <p className="text-2xl font-bold">{data.summary.totalProducts}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Package className="text-purple-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+5%</span>
              <span className="ml-2 text-gray-500">from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Sales</p>
                <p className="text-2xl font-bold">${data.summary.totalSales.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="text-green-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-500 font-medium">+8.2%</span>
              <span className="ml-2 text-gray-500">from last month</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Order Value</p>
                <p className="text-2xl font-bold">${data.summary.averageOrderValue.toFixed(2)}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingCart className="text-blue-600" size={24} />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-red-500 font-medium">-2.3%</span>
              <span className="ml-2 text-gray-500">from last month</span>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Daily Purchase Amount</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data.dailyPurchases}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, 'Purchase Amount']} />
                <Area type="monotone" dataKey="totalAmount" stroke="#4f46e5" fill="#c7d2fe" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products and Users */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Products */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Top 10 Products by Quantity</h3>
            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="min-w-full divide-y divide-gray-100">
                <thead>
                  <tr className="bg-blue-600 ">
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Product Name</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Quantity</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Price</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.topProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">{product.qty}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">${product.price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Users */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 ">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Top 10 Customers by Purchase Amount</h3>
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr className="bg-blue-600">
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-white uppercase tracking-wider">Total Spent</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.topUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">${user.totalSpent.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}