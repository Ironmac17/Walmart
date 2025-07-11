import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  Send,
  QrCode,
  ShoppingCart,
  UserCircle,
  Settings,
  Bell,
  Moon,
  Volume2,
  Users,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";


const Notification = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
      {message}
    </div>
  );
};

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    message: "",
    isVisible: false,
  });
  const [showSettings, setShowSettings] = useState(false);
  const [activeTab, setActiveTab] = useState("pending");

  type CustomerQuery = {
    id: number;
    customer: string;
    cartNumber: string;
    query: string;
    location: string;
    priority: "high" | "medium" | "low";
    timestamp: string;
    status: "pending" | "in-progress" | "resolved";
    type: string;
  };

  const [selectedQuery, setSelectedQuery] = useState<CustomerQuery | null>(
    null
  );
  const goToInventory = () => {
    navigate('/inventory', { state: { from: 'employee' } });
  };
  const [customerQueries, setCustomerQueries] = useState([
    {
      id: 1,
      customer: "Sarah Johnson",
      cartNumber: "CART-001",
      query: "Cannot find organic milk in dairy section",
      location: "Aisle 1 - Dairy Section",
      priority: "high",
      timestamp: "2 minutes ago",
      status: "pending",
      type: "product",
    },
    {
      id: 2,
      customer: "Mike Chen",
      cartNumber: "CART-045",
      query: "Product scanner not working",
      location: "Aisle 3 - Produce",
      priority: "medium",
      timestamp: "5 minutes ago",
      status: "in-progress",
      type: "technical",
    },
    {
      id: 3,
      customer: "Emma Davis",
      cartNumber: "CART-023",
      query: "Need help with cart lid mechanism",
      location: "Aisle 2 - Bakery",
      priority: "low",
      timestamp: "8 minutes ago",
      status: "resolved",
      type: "technical",
    },
    {
      id: 4,
      customer: "John Smith",
      cartNumber: "CART-067",
      query: "Payment terminal showing error",
      location: "Checkout Lane 3",
      priority: "high",
      timestamp: "12 minutes ago",
      status: "pending",
      type: "technical",
    },
  ]);

  const showNotification = (message) => {
    setNotification({ message, isVisible: true });
  };

  const hideNotification = () => {
    setNotification((prev) => ({ ...prev, isVisible: false }));
  };
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getQueriesByStatus = (status) => {
    return customerQueries.filter((query) => query.status === status);
  };

  const handleStatusChange = (queryId, newStatus) => {
    setCustomerQueries((prev) =>
      prev.map((q) => (q.id === queryId ? { ...q, status: newStatus } : q))
    );
    setSelectedQuery((prev) =>
      prev && prev.id === queryId ? { ...prev, status: newStatus } : prev
    );

    const statusMessages = {
      "in-progress": "Query marked as in-progress!",
      resolved: "Query resolved successfully!",
    };
    showNotification(statusMessages[newStatus]);
  };

  const renderActionButton = (query) => {
    if (query.status === "resolved") {
      return (
        <div className="text-center py-2 text-green-600 font-medium">
          ✓ Already Resolved
        </div>
      );
    }

    if (query.status === "in-progress") {
      return (
        <button
          onClick={() => handleStatusChange(query.id, "resolved")}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Mark as Resolved</span>
        </button>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => handleStatusChange(query.id, "in-progress")}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
        >
          <Clock className="h-4 w-4" />
          <span>Start</span>
        </button>
        <button
          onClick={() => handleStatusChange(query.id, "resolved")}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Resolve</span>
        </button>
      </div>
    );
  };

  const tabsData = [
    {
      key: "pending",
      label: "Pending",
      count: getQueriesByStatus("pending").length,
      color: "text-red-600",
    },
    {
      key: "in-progress",
      label: "In Progress",
      count: getQueriesByStatus("in-progress").length,
      color: "text-blue-600",
    },
    {
      key: "resolved",
      label: "Resolved",
      count: getQueriesByStatus("resolved").length,
      color: "text-green-600",
    },
  ];

  const currentQueries = getQueriesByStatus(activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-xl font-bold text-gray-800">
                Employee Dashboard
              </h1>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative"
            >
              <Settings className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="bg-white/70 backdrop-blur-sm ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome back, Mahak!
            </h1>
            <p className="text-lg text-gray-600">
              Ready for efficient store management?
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions Section */}
      <div className="bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Quick Actions
          </h2>
          <div className="bg-white/30 backdrop-blur-sm">
            <div className="w-5xl px-4 sm:px-6 lg:px-8 py-6">
              <div className="grid grid-cols-5 gap-14">
                <button
                  onClick={() => {
                    navigate("/checkout");
                    showNotification("Opening Checkout Dashboard...");
                  }}
                  className="aspect-square flex flex-col items-center justify-center p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <QrCode className="h-8 w-8 mb-3" />
                  <span className="font-semibold text-center">
                    Checkout Dashboard
                  </span>
                </button>
                <button
                  onClick={goToInventory}
                  className="aspect-square flex flex-col items-center justify-center p-6 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white rounded-xl hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <MapPin className="h-8 w-8 mb-3" />
                  <span className="font-semibold text-center">Inventory</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/cart-manager");
                    showNotification("Opening Cart Manager...");
                  }}
                  className="aspect-square flex flex-col items-center justify-center p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <ShoppingCart className="h-8 w-8 mb-3" />
                  <span className="font-semibold text-center">
                    Cart Manager
                  </span>
                </button>
                <button
                  onClick={() => {
                    navigate("/store-map-staff");
                    showNotification("Opening Store Map...");
                  }}
                  className="aspect-square flex flex-col items-center justify-center p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <MapPin className="h-8 w-8 mb-3" />
                  <span className="font-semibold text-center">Store Map</span>
                </button>
                <button
                  onClick={() => {
                    navigate("/profile");
                    showNotification("Opening Employee Profile...");
                  }}
                  className="aspect-square flex flex-col items-center justify-center p-6 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <UserCircle className="h-8 w-8 mb-3" />
                  <span className="font-semibold text-center">
                    Employee Profile
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Management Tools */}
      <div className="bg-white/30 backdrop-blur-sm">
        <div className="max-w-lg mx-3 px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Query Status Tabs */}
            <div className="flex bg-white rounded-xl p-1 shadow-lg ml-auto">
              {tabsData.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === tab.key
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Settings Dropdown */}
      {showSettings && (
        <div className="fixed top-16 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 z-50 w-80">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Bell className="h-5 w-5 text-blue-500" />
                <span className="font-medium">Notifications</span>
              </div>
              <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Volume2 className="h-5 w-5 text-green-500" />
                <span className="font-medium">Sound Alerts</span>
              </div>
              <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5"></div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-3">
                <Moon className="h-5 w-5 text-purple-500" />
                <span className="font-medium">Dark Mode</span>
              </div>
              <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-pointer">
                <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Queries</p>
                <p className="text-2xl font-bold text-red-600">
                  {customerQueries.filter((q) => q.status === "pending").length}
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
                  {
                    customerQueries.filter((q) => q.status === "in-progress")
                      .length
                  }
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
                  {
                    customerQueries.filter((q) => q.status === "resolved")
                      .length
                  }
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
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Queries */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">
                  {activeTab.charAt(0).toUpperCase() +
                    activeTab.slice(1).replace("-", " ")}{" "}
                  Queries
                </h3>
                <span className="text-sm text-gray-500">
                  {currentQueries.length}{" "}
                  {currentQueries.length === 1 ? "query" : "queries"}
                </span>
              </div>

              <div className="space-y-4">
                {currentQueries.map((query) => (
                  <div
                    key={query.id}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                      selectedQuery?.id === query.id
                        ? "border-blue-300 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedQuery(query as CustomerQuery)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-800">
                          {query.customer}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Cart: {query.cartNumber}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            query.priority
                          )}`}
                        >
                          {query.priority}
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            query.status
                          )}`}
                        >
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

                {currentQueries.length === 0 && (
                  <div className="text-center py-8">
                    <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      No {activeTab} queries
                    </h3>
                    <p className="text-gray-600">
                      All caught up! No {activeTab} queries at the moment.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Query Details */}
          <div className="space-y-6">
            {selectedQuery ? (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Query Details
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-sm font-medium text-gray-600">
                      Customer
                    </label>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        selectedQuery.priority
                      )}`}
                    >
                      {selectedQuery.priority} priority
                    </span>
                  </div>
                  <p className="text-gray-800 font-semibold">
                    {selectedQuery.customer}
                  </p>

                  <div className="flex justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Cart Number
                      </label>
                      <p className="text-gray-800">
                        {selectedQuery.cartNumber}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">
                        Status
                      </label>
                      <p
                        className={`font-medium ${getStatusColor(
                          selectedQuery.status
                        )
                          .replace("bg-", "text-")
                          .replace("-100", "-700")}`}
                      >
                        {selectedQuery.status}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Issue
                    </label>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-gray-800">{selectedQuery.query}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">
                      Location
                    </label>
                    <div className="flex items-center space-x-2 mt-1 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <p className="text-blue-800 font-medium">
                        {selectedQuery.location}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                      Take Action
                    </label>
                    {renderActionButton(selectedQuery)}
                  </div>

                  <div className="pt-2">
                    <label className="text-sm font-medium text-gray-600 mb-2 block">
                      Customer Response
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Send a message to customer..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() =>
                          showNotification(
                            "Message sent to customer successfully!"
                          )
                        }
                        className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        <Send className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 text-center">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Select a Query
                </h3>
                <p className="text-gray-600">
                  Choose a customer query to view details and take action
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
