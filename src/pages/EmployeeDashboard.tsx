import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageSquare, MapPin, Clock, AlertTriangle, CheckCircle, User, Bot, Send } from 'lucide-react';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  type CustomerQuery = {
    id: number;
    customer: string;
    cartNumber: string;
    query: string;
    location: string;
    priority: string;
    timestamp: string;
    status: string;
  };

  const [selectedQuery, setSelectedQuery] = useState<CustomerQuery | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { type: 'bot', message: 'Hello! I\'m your AI assistant. How can I help you today?' }
  ]);

  const customerQueries = [
    {
      id: 1,
      customer: 'Sarah Johnson',
      cartNumber: 'CART-001',
      query: 'Cannot find organic milk in dairy section',
      location: 'Aisle 1 - Dairy Section',
      priority: 'high',
      timestamp: '2 minutes ago',
      status: 'pending'
    },
    {
      id: 2,
      customer: 'Mike Chen',
      cartNumber: 'CART-045',
      query: 'Product scanner not working',
      location: 'Aisle 3 - Produce',
      priority: 'medium',
      timestamp: '5 minutes ago',
      status: 'pending'
    },
    {
      id: 3,
      customer: 'Emma Davis',
      cartNumber: 'CART-023',
      query: 'Need help with cart lid mechanism',
      location: 'Aisle 2 - Bakery',
      priority: 'low',
      timestamp: '8 minutes ago',
      status: 'resolved'
    },
    {
      id: 4,
      customer: 'John Smith',
      cartNumber: 'CART-067',
      query: 'Payment terminal showing error',
      location: 'Checkout Lane 3',
      priority: 'high',
      timestamp: '12 minutes ago',
      status: 'in-progress'
    }
  ];

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatHistory([...chatHistory, { type: 'user', message: chatMessage }]);
      
      // Simulate AI response
      setTimeout(() => {
        const responses = [
          'I understand your concern. Let me help you with that.',
          'Based on store policy, here\'s what you should do...',
          'That\'s a great question! The procedure is...',
          'I can help you resolve this issue quickly.'
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        setChatHistory(prev => [...prev, { type: 'bot', message: randomResponse }]);
      }, 1000);
      
      setChatMessage('');
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">Employee Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className="relative p-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300"
              >
                <Bot className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-600" />
                <span className="text-gray-600">EMP001</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Queries</p>
                <p className="text-2xl font-bold text-red-600">
                  {customerQueries.filter(q => q.status === 'pending').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">In Progress</p>
                <p className="text-2xl font-bold text-blue-600">
                  {customerQueries.filter(q => q.status === 'in-progress').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Resolved Today</p>
                <p className="text-2xl font-bold text-green-600">
                  {customerQueries.filter(q => q.status === 'resolved').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Active Customers</p>
                <p className="text-2xl font-bold text-purple-600">47</p>
              </div>
              <User className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Queries */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Customer Queries</h3>
              <div className="space-y-4">
                {customerQueries.map((query) => (
                  <div
                    key={query.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedQuery?.id === query.id
                        ? 'border-blue-300 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedQuery(query)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">{query.customer}</h4>
                        <p className="text-sm text-gray-600">Cart: {query.cartNumber}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(query.priority)}`}>
                          {query.priority}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(query.status)}`}>
                          {query.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-3">{query.query}</p>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">{query.location}</span>
                      </div>
                      <span className="text-gray-500">{query.timestamp}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Query Details */}
          <div className="space-y-6">
            {selectedQuery ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Query Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Customer</label>
                    <p className="text-gray-800 font-semibold">{selectedQuery.customer}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Cart Number</label>
                    <p className="text-gray-800">{selectedQuery.cartNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Issue</label>
                    <p className="text-gray-800">{selectedQuery.query}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Location</label>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <p className="text-gray-800">{selectedQuery.location}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
                      Navigate to Customer
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-2 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300">
                      Mark Resolved
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Query</h3>
                <p className="text-gray-600">Choose a customer query to view details and take action</p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-800">Store Map</div>
                  <div className="text-sm text-gray-600">Navigate store layout</div>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-800">Inventory Check</div>
                  <div className="text-sm text-gray-600">Check product availability</div>
                </button>
                <button className="w-full text-left p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="font-medium text-gray-800">Emergency Alert</div>
                  <div className="text-sm text-gray-600">Send urgent notification</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chatbot */}
      {chatOpen && (
        <div className="fixed bottom-4 right-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50">
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bot className="h-5 w-5" />
                <span className="font-semibold">AI Assistant</span>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </div>
          </div>
          <div className="h-64 overflow-y-auto p-4 space-y-3">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    chat.type === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {chat.message}
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleSendMessage}
                className="p-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;