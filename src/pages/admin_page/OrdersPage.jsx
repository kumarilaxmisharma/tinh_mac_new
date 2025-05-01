import { useState, useEffect } from 'react';
import { Clock, Check, Package, Truck, History, X, ChevronDown, ChevronUp } from 'lucide-react';

const OrdersPage = () => {
  // Order status types
  const STATUS = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
    PROCESSING: 'processing',
    DELIVERING: 'delivering',
    COMPLETED: 'completed',
    CANCELLED: 'cancelled'
  };

  // Sample orders data - in a real app this would come from an API
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState(STATUS.PENDING);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  // Simulate fetching orders from an API
  useEffect(() => {
    const sampleOrders = [
      { id: 1, customerName: 'John Doe', items: ['T-shirt', 'Jeans'], total: 89.99, status: STATUS.PENDING, date: '2025-04-23' },
      { id: 2, customerName: 'Jane Smith', items: ['Dress', 'Shoes'], total: 149.99, status: STATUS.ACCEPTED, date: '2025-04-22' },
      { id: 3, customerName: 'Bob Johnson', items: ['Laptop', 'Mouse'], total: 1299.99, status: STATUS.PROCESSING, date: '2025-04-21' },
      { id: 4, customerName: 'Alice Brown', items: ['Phone Case'], total: 24.99, status: STATUS.DELIVERING, date: '2025-04-20' },
      { id: 5, customerName: 'Mike Wilson', items: ['Headphones'], total: 79.99, status: STATUS.COMPLETED, date: '2025-04-19' },
      { id: 6, customerName: 'Sarah Davis', items: ['Smart Watch'], total: 199.99, status: STATUS.CANCELLED, date: '2025-04-18' },
      { id: 7, customerName: 'Tom Taylor', items: ['Camera'], total: 549.99, status: STATUS.PENDING, date: '2025-04-24' },
      { id: 8, customerName: 'Emily White', items: ['Bluetooth Speaker'], total: 89.99, status: STATUS.ACCEPTED, date: '2025-04-23' },
    ];
    setOrders(sampleOrders);
  }, []);

  // Update order status (following logical flow)
  const updateOrderStatus = (orderId, currentStatus) => {
    const nextStatusMap = {
      [STATUS.PENDING]: STATUS.ACCEPTED,
      [STATUS.ACCEPTED]: STATUS.PROCESSING,
      [STATUS.PROCESSING]: STATUS.DELIVERING,
      [STATUS.DELIVERING]: STATUS.COMPLETED
    };

    if (nextStatusMap[currentStatus]) {
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: nextStatusMap[currentStatus] } 
          : order
      ));
    }
  };

  // Cancel order (can be done at any stage)
  const cancelOrder = (orderId) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: STATUS.CANCELLED } : order
    ));
  };

  // Toggle order details
  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'history') {
      return order.status === STATUS.COMPLETED || order.status === STATUS.CANCELLED;
    }
    return order.status === activeTab;
  });

  // Tab definitions with icons
  const tabs = [
    { id: STATUS.PENDING, label: 'Pending', icon: <Clock size={18} /> },
    { id: STATUS.ACCEPTED, label: 'Accepted', icon: <Check size={18} /> },
    { id: STATUS.PROCESSING, label: 'Processing', icon: <Package size={18} /> },
    { id: STATUS.DELIVERING, label: 'Delivering', icon: <Truck size={18} /> },
    { id: 'history', label: 'History', icon: <History size={18} /> },
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-4 px-8 ml-60 w-full">
      <div className="container max-w-screen justify-items-stretch">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Order Management</h1>
        
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 cursor-pointer'
              } transition-colors font-medium`}
            >
              {tab.icon}
              {tab.label}
              <span className="ml-1 bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 text-xs">
                {tab.id === 'history'
                  ? orders.filter(o => o.status === STATUS.COMPLETED || o.status === STATUS.CANCELLED).length
                  : orders.filter(o => o.status === tab.id).length}
              </span>
            </button>
          ))}
        </div>

        {/* Order List */}
        <div className="bg-white rounded-lg shadow">
          {filteredOrders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No orders found in this category
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {filteredOrders.map(order => (
                <li key={order.id} className="p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0">
                        {order.status === STATUS.PENDING && <Clock className="text-yellow-500" />}
                        {order.status === STATUS.ACCEPTED && <Check className="text-blue-500" />}
                        {order.status === STATUS.PROCESSING && <Package className="text-purple-500" />}
                        {order.status === STATUS.DELIVERING && <Truck className="text-orange-500" />}
                        {order.status === STATUS.COMPLETED && <Check className="text-green-500" />}
                        {order.status === STATUS.CANCELLED && <X className="text-red-500" />}
                      </div>
                      <div>
                        <h3 className="font-medium">Order #{order.id} - {order.customerName}</h3>
                        <p className="text-sm text-gray-500">{order.date} • ${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleOrderDetails(order.id)}
                        className=" text-white cursor-pointer p-2 rounded-4xl bg-blue-600 hover:bg-blue-500 transition-colors"
                      >
                        {expandedOrderId === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>

                  {expandedOrderId === order.id && (
                    <div className="mt-4 pl-12">
                      <div className="bg-gray-50 p-4 rounded-lg mb-4">
                        <h4 className="font-medium mb-2">Order Details</h4>
                        <ul className="list-disc pl-5 mb-2">
                          {order.items.map((item, index) => (
                            <li key={index} className="text-sm">{item}</li>
                          ))}
                        </ul>
                        <p className="text-sm font-medium">Total: ${order.total.toFixed(2)}</p>
                      </div>

                      <div className="flex gap-2">
                        {order.status !== STATUS.COMPLETED && order.status !== STATUS.CANCELLED && (
                          <>
                            <button
                              onClick={() => cancelOrder(order.id)}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-sm font-medium"
                            >
                              Cancel Order
                            </button>
                            
                            {/* Show update button based on current status */}
                            {order.status !== STATUS.COMPLETED && (
                              <button
                                onClick={() => updateOrderStatus(order.id, order.status)}
                                className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-sm font-medium"
                              >
                                {order.status === STATUS.PENDING && "Accept Order"}
                                {order.status === STATUS.ACCEPTED && "Start Processing"}
                                {order.status === STATUS.PROCESSING && "Start Delivery"}
                                {order.status === STATUS.DELIVERING && "Mark Completed"}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;