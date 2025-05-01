import { useState, useEffect } from 'react';
import { Calendar, User, Filter, Clock, Bell, BarChart2, Send, Check, X, ArrowRight, Search } from 'lucide-react';

const ActivityLogPage = () => {
  // Sample users for the filter dropdown
  const users = [
    { id: 1, name: "Admin One", role: "Admin" },
    { id: 2, name: "Manager Two", role: "Manager" },
    { id: 3, name: "Staff Three", role: "Staff" }
  ];

  // Activity log action types
  const actionTypes = [
    "User Login", 
    "User Logout", 
    "Order Created", 
    "Order Accepted", 
    "Order Processing", 
    "Order Delivering",
    "Order Completed", 
    "Order Cancelled", 
    "Product Added", 
    "Product Updated", 
    "Product Deleted"
  ];

  // State for activity logs
  const [activityLogs, setActivityLogs] = useState([]);
  
  // State for filters
  const [filters, setFilters] = useState({
    user: "",
    action: "",
    dateFrom: "",
    dateTo: ""
  });
  
  // State for Telegram notification settings
  const [telegramSettings, setTelegramSettings] = useState({
    channelId: "-1001234567890",
    botToken: "1234567890:ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    newOrderEnabled: true,
    statusChangeEnabled: true,
    dailyReportEnabled: true,
    dailyReportTime: "23:00"
  });
  
  // State for tabs
  const [activeTab, setActiveTab] = useState("logs");

  // Mock data for activity logs
  useEffect(() => {
    const mockLogs = [
      { id: 1, userId: 1, userName: "Admin One", action: "Order Accepted", details: "Order #1234 from John Doe", timestamp: "2025-04-25T09:15:30" },
      { id: 2, userId: 2, userName: "Manager Two", action: "Product Added", details: "Added product SKU-789", timestamp: "2025-04-25T10:22:15" },
      { id: 3, userId: 3, userName: "Staff Three", action: "Order Created", details: "New order #1235 from Jane Smith", timestamp: "2025-04-25T11:05:42" },
      { id: 4, userId: 1, userName: "Admin One", action: "User Login", details: "Login from 192.168.1.105", timestamp: "2025-04-25T08:00:12" },
      { id: 5, userId: 2, userName: "Manager Two", action: "Order Cancelled", details: "Order #1230 cancelled - out of stock", timestamp: "2025-04-24T16:45:20" },
      { id: 6, userId: 1, userName: "Admin One", action: "Order Completed", details: "Order #1225 delivered and confirmed", timestamp: "2025-04-24T14:30:00" }
    ];
    setActivityLogs(mockLogs);
  }, []);

  // Filter logs based on selected filters
  const filteredLogs = activityLogs.filter(log => {
    // Filter by user
    if (filters.user && log.userId !== parseInt(filters.user)) {
      return false;
    }
    
    // Filter by action
    if (filters.action && log.action !== filters.action) {
      return false;
    }
    
    // Filter by date range
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      const logDate = new Date(log.timestamp);
      if (logDate < fromDate) {
        return false;
      }
    }
    
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59); // End of the selected day
      const logDate = new Date(log.timestamp);
      if (logDate > toDate) {
        return false;
      }
    }
    
    return true;
  });

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  // Format timestamp to readable date and time
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Handle Telegram settings changes
  const handleTelegramSettingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTelegramSettings({
      ...telegramSettings,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Mock function to send test notification
  const sendTestNotification = () => {
    alert("Test notification sent to Telegram channel!");
    // In real implementation, this would make an API call to send a Telegram message
  };

  // Mock function to generate today's report
  const generateTodayReport = () => {
    alert("Today's report generated and sent to Telegram channel!");
    // In real implementation, this would generate a report and send it via Telegram
  };

  // Mock log creator for demonstration
  const createMockLog = (action) => {
    const newLog = {
      id: activityLogs.length + 1,
      userId: 1,
      userName: "Admin One",
      action,
      details: `Demo ${action.toLowerCase()} action`,
      timestamp: new Date().toISOString()
    };
    setActivityLogs([newLog, ...activityLogs]);
    alert(`New activity log created: ${action}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-8 py-4 w-full ml-60">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
        
        {/* Tabs */}
        <div className="flex mb-6 bg-white rounded-lg shadow p-1">
          <button 
            className={`flex items-center px-4 py-2 rounded ${activeTab === 'logs' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 cursor-pointer'}`}
            onClick={() => setActiveTab('logs')}
          >
            <Clock size={18} className="mr-2" />
            Activity Logs
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded ${activeTab === 'notifications' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 cursor-pointer'}`}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} className="mr-2" />
            Alert Notifications
          </button>
          <button 
            className={`flex items-center px-4 py-2 rounded ${activeTab === 'reports' ? 'bg-blue-600 text-white' : 'hover:bg-gray-100 cursor-pointer'}`}
            onClick={() => setActiveTab('reports')}
          >
            <BarChart2 size={18} className="mr-2" />
            Reports
          </button>
        </div>
        
        {/* Activity Logs Tab */}
        {activeTab === 'logs' && (
          <div>
            {/* Quick Actions for Demo */}
            <div className="mb-6 bg-white rounded-lg shadow p-4">
              <h2 className="text-lg font-medium mb-3">Create Sample Activity Log</h2>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => createMockLog("Order Created")}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 text-sm"
                >
                  Create New Order Log
                </button>
                <button 
                  onClick={() => createMockLog("Order Completed")}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm"
                >
                  Complete Order Log
                </button>
                <button 
                  onClick={() => createMockLog("Order Cancelled")}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm"
                >
                  Cancel Order Log
                </button>
                <button 
                  onClick={() => createMockLog("User Login")}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded hover:bg-purple-200 text-sm"
                >
                  User Login Log
                </button>
              </div>
            </div>
            
            {/* Filters */}
            <div className="mb-6 bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-4">
                <Filter size={18} className="mr-2 text-gray-500" />
                <h2 className="text-lg font-medium">Filter Activity Logs</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">User</label>
                  <select
                    id="user"
                    name="user"
                    value={filters.user}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Users</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                  <select
                    id="action"
                    name="action"
                    value={filters.action}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Actions</option>
                    {actionTypes.map(action => (
                      <option key={action} value={action}>{action}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dateFrom" className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                  <input
                    type="date"
                    id="dateFrom"
                    name="dateFrom"
                    value={filters.dateFrom}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="dateTo" className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                  <input
                    type="date"
                    id="dateTo"
                    name="dateTo"
                    value={filters.dateTo}
                    onChange={handleFilterChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setFilters({ user: "", action: "", dateFrom: "", dateTo: "" })}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 mr-2 hover:bg-gray-50 cursor-pointer"
                >
                  Clear Filters
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center cursor-pointer"
                >
                  <Search size={16} className="mr-2" />
                  Apply Filters
                </button>
              </div>
            </div>
            
            {/* Activity Logs Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Activity Logs</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Showing {filteredLogs.length} of {activityLogs.length} logs
                </p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Timestamp
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredLogs.map(log => (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatTimestamp(log.timestamp)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <User size={16} className="text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{log.userName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            log.action.includes("Created") ? "bg-green-100 text-green-800" :
                            log.action.includes("Cancelled") ? "bg-red-100 text-red-800" :
                            log.action.includes("Completed") ? "bg-blue-100 text-blue-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {log.details}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredLogs.length === 0 && (
                <div className="text-center py-10 text-gray-500">
                  No logs found with the selected filters
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Alert Notifications Tab */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Telegram Alert Notifications</h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure notifications sent to your Telegram channel
              </p>
            </div>
            
            <div className="p-4 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="channelId" className="block text-sm font-medium text-gray-700 mb-1">Telegram Channel ID</label>
                  <input
                    type="text"
                    id="channelId"
                    name="channelId"
                    value={telegramSettings.channelId}
                    onChange={handleTelegramSettingChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. -100123456789"
                  />
                </div>
                
                <div>
                  <label htmlFor="botToken" className="block text-sm font-medium text-gray-700 mb-1">Telegram Bot Token</label>
                  <input
                    type="text"
                    id="botToken"
                    name="botToken"
                    value={telegramSettings.botToken}
                    onChange={handleTelegramSettingChange}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g. 1234567890:ABCDEFG..."
                  />
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-700 mb-3">Notification Settings</h4>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="newOrderEnabled"
                        name="newOrderEnabled"
                        type="checkbox"
                        checked={telegramSettings.newOrderEnabled}
                        onChange={handleTelegramSettingChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="newOrderEnabled" className="font-medium text-gray-700">New Order Alerts</label>
                      <p className="text-gray-500">Send notification when a new order is placed</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="statusChangeEnabled"
                        name="statusChangeEnabled"
                        type="checkbox"
                        checked={telegramSettings.statusChangeEnabled}
                        onChange={handleTelegramSettingChange}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="statusChangeEnabled" className="font-medium text-gray-700">Order Status Change Alerts</label>
                      <p className="text-gray-500">Send notification when an order is completed or cancelled</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-end">
                  <button
                    onClick={sendTestNotification}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    <Send size={16} className="mr-2" />
                    Send Test Notification
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Daily Reports</h3>
              <p className="mt-1 text-sm text-gray-500">
                Configure daily reports sent to your Telegram channel
              </p>
            </div>
            
            <div className="p-4 space-y-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="dailyReportEnabled"
                    name="dailyReportEnabled"
                    type="checkbox"
                    checked={telegramSettings.dailyReportEnabled}
                    onChange={handleTelegramSettingChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="dailyReportEnabled" className="font-medium text-gray-700">Enable Daily Reports</label>
                  <p className="text-gray-500">Automatically generate and send a daily report to the Telegram channel</p>
                </div>
              </div>
              
              <div>
                <label htmlFor="dailyReportTime" className="block text-sm font-medium text-gray-700 mb-1">Daily Report Time</label>
                <input
                  type="time"
                  id="dailyReportTime"
                  name="dailyReportTime"
                  value={telegramSettings.dailyReportTime}
                  onChange={handleTelegramSettingChange}
                  className="w-full md:w-40 rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-700 mb-3">Report Content</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check size={16} className="mr-2 text-green-600" />
                      <span className="text-sm">Total orders received</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="mr-2 text-green-600" />
                      <span className="text-sm">Orders by status (pending, completed, cancelled)</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="mr-2 text-green-600" />
                      <span className="text-sm">Total revenue</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="mr-2 text-green-600" />
                      <span className="text-sm">Most popular products</span>
                    </li>
                    <li className="flex items-center">
                      <Check size={16} className="mr-2 text-green-600" />
                      <span className="text-sm">User activity summary</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4 flex justify-between">
                <div className="text-sm text-gray-500">
                  <Calendar size={16} className="inline mr-1" />
                  Next report will be sent today at {telegramSettings.dailyReportTime}
                </div>
                <button
                  onClick={generateTodayReport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <BarChart2 size={16} className="mr-2" />
                  Generate Today's Report Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityLogPage;