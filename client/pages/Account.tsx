import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
}

interface Order {
  id: string;
  date: string;
  status: "delivered" | "shipped" | "processing" | "cancelled";
  total: number;
  items: number;
}

interface Address {
  id: string;
  type: "shipping" | "billing";
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export default function Account() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data
  const [userProfile, setUserProfile] = useState<UserProfile>({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
  });

  const orders: Order[] = [
    {
      id: "VEC-2024-001",
      date: "2024-01-15",
      status: "delivered",
      total: 450,
      items: 2,
    },
    {
      id: "VEC-2024-002",
      date: "2024-01-10",
      status: "shipped",
      total: 280,
      items: 1,
    },
    {
      id: "VEC-2024-003",
      date: "2024-01-05",
      status: "processing",
      total: 320,
      items: 3,
    },
  ];

  const addresses: Address[] = [
    {
      id: "addr-1",
      type: "shipping",
      firstName: "John",
      lastName: "Doe",
      street: "123 Fashion Ave",
      city: "New York",
      state: "NY",
      zipCode: "10013",
      country: "United States",
      isDefault: true,
    },
    {
      id: "addr-2",
      type: "billing",
      firstName: "John",
      lastName: "Doe",
      street: "456 Style Street",
      city: "New York",
      state: "NY",
      zipCode: "10014",
      country: "United States",
      isDefault: false,
    },
  ];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "orders", label: "Orders", icon: "📦" },
    { id: "addresses", label: "Addresses", icon: "📍" },
    { id: "security", label: "Security", icon: "🔒" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 md:px-12 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-anonymous text-3xl md:text-4xl font-bold text-brand-dark-brown mb-2">
            My Account
          </h1>
          <p className="font-dm-sans text-gray-600">
            Manage your profile, orders, and account settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-brand-warm-beige rounded-lg p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-left font-dm-sans transition-colors ${
                      activeTab === tab.id
                        ? "bg-brand-sage text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </div>
            </nav>

            <div className="mt-6 bg-brand-warm-beige rounded-lg p-4">
              <h3 className="font-anonymous text-lg font-bold text-brand-dark-brown mb-3">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Link
                  to="/wishlist"
                  className="block w-full px-4 py-2 text-left font-dm-sans text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  View Wishlist
                </Link>
                <Link
                  to="/cart"
                  className="block w-full px-4 py-2 text-left font-dm-sans text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  View Cart
                </Link>
                <Link
                  to="/contact"
                  className="block w-full px-4 py-2 text-left font-dm-sans text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown">
                    Personal Information
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 text-brand-sage border border-brand-sage rounded-md hover:bg-brand-sage hover:text-white transition-colors font-dm-sans"
                  >
                    {isEditing ? "Cancel" : "Edit"}
                  </button>
                </div>

                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={userProfile.firstName}
                        onChange={(e) =>
                          setUserProfile((prev) => ({
                            ...prev,
                            firstName: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={userProfile.lastName}
                        onChange={(e) =>
                          setUserProfile((prev) => ({
                            ...prev,
                            lastName: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={userProfile.email}
                        onChange={(e) =>
                          setUserProfile((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans disabled:bg-gray-50"
                      />
                    </div>

                    <div>
                      <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={userProfile.phone}
                        onChange={(e) =>
                          setUserProfile((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans disabled:bg-gray-50"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-dm-sans text-sm font-medium text-gray-700 mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        value={userProfile.dateOfBirth}
                        onChange={(e) =>
                          setUserProfile((prev) => ({
                            ...prev,
                            dateOfBirth: e.target.value,
                          }))
                        }
                        disabled={!isEditing}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-brand-sage focus:border-brand-sage font-dm-sans disabled:bg-gray-50"
                      />
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="px-6 py-3 bg-brand-sage text-white font-dm-sans font-semibold rounded-md hover:bg-brand-green transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-6">
                  Order History
                </h2>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <h3 className="font-anonymous text-lg font-bold text-brand-dark-brown">
                              Order #{order.id}
                            </h3>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-dm-sans font-semibold ${getStatusColor(
                                order.status,
                              )}`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </span>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm font-dm-sans text-gray-600">
                            <span>Date: {order.date}</span>
                            <span>{order.items} item(s)</span>
                            <span className="font-bold text-brand-sage">
                              ${order.total}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 text-brand-sage border border-brand-sage rounded-md hover:bg-brand-sage hover:text-white transition-colors font-dm-sans text-sm">
                            View Details
                          </button>
                          {order.status === "delivered" && (
                            <button className="px-4 py-2 bg-brand-sage text-white rounded-md hover:bg-brand-green transition-colors font-dm-sans text-sm">
                              Reorder
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown">
                    Saved Addresses
                  </h2>
                  <button className="px-4 py-2 bg-brand-sage text-white rounded-md hover:bg-brand-green transition-colors font-dm-sans">
                    Add New Address
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-2">
                          <h3 className="font-anonymous text-lg font-bold text-brand-dark-brown">
                            {address.type.charAt(0).toUpperCase() +
                              address.type.slice(1)}{" "}
                            Address
                          </h3>
                          {address.isDefault && (
                            <span className="px-2 py-1 bg-brand-sage text-white text-xs font-dm-sans rounded-full">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="text-brand-sage hover:text-brand-green">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button className="text-red-500 hover:text-red-700">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="font-dm-sans text-gray-700 space-y-1">
                        <p>
                          {address.firstName} {address.lastName}
                        </p>
                        <p>{address.street}</p>
                        <p>
                          {address.city}, {address.state} {address.zipCode}
                        </p>
                        <p>{address.country}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="font-anonymous text-2xl font-bold text-brand-dark-brown mb-6">
                  Security Settings
                </h2>

                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-anonymous text-lg font-bold text-brand-dark-brown mb-2">
                      Change Password
                    </h3>
                    <p className="font-dm-sans text-gray-600 mb-4">
                      Keep your account secure by using a strong password
                    </p>
                    <button className="px-4 py-2 text-brand-sage border border-brand-sage rounded-md hover:bg-brand-sage hover:text-white transition-colors font-dm-sans">
                      Change Password
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-anonymous text-lg font-bold text-brand-dark-brown mb-2">
                      Two-Factor Authentication
                    </h3>
                    <p className="font-dm-sans text-gray-600 mb-4">
                      Add an extra layer of security to your account
                    </p>
                    <button className="px-4 py-2 bg-brand-sage text-white rounded-md hover:bg-brand-green transition-colors font-dm-sans">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-anonymous text-lg font-bold text-brand-dark-brown mb-2">
                      Login Activity
                    </h3>
                    <p className="font-dm-sans text-gray-600 mb-4">
                      Monitor recent login activity on your account
                    </p>
                    <button className="px-4 py-2 text-brand-sage border border-brand-sage rounded-md hover:bg-brand-sage hover:text-white transition-colors font-dm-sans">
                      View Activity
                    </button>
                  </div>

                  <div className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <h3 className="font-anonymous text-lg font-bold text-red-800 mb-2">
                      Delete Account
                    </h3>
                    <p className="font-dm-sans text-red-700 mb-4">
                      Permanently delete your account and all associated data
                    </p>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-dm-sans">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
