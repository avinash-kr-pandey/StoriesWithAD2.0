"use client";

import Image from "next/image";
import { useState } from "react";

interface UserProfile {
  name: string;
  email: string;
  joinDate: string;
  location: string;
  bio: string;
  avatar: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    joinDate: "January 2023",
    location: "New York, USA",
    bio: "Interior design enthusiast who loves creating beautiful living spaces. Passionate about modern furniture and sustainable home solutions.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const stats = [
    { label: "Orders", value: "12", icon: "📦" },
    { label: "Reviews", value: "8", icon: "⭐" },
    { label: "Wishlist", value: "15", icon: "❤️" },
    { label: "Points", value: "1.2K", icon: "🏆" },
  ];

  const quickActions = [
    { icon: "🛒", label: "My Orders", color: "bg-blue-500 hover:bg-blue-600" },
    { icon: "❤️", label: "Wishlist", color: "bg-pink-500 hover:bg-pink-600" },
    { icon: "⭐", label: "Reviews", color: "bg-amber-500 hover:bg-amber-600" },
    {
      icon: "🔔",
      label: "Notifications",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    { icon: "💳", label: "Payment", color: "bg-green-500 hover:bg-green-600" },
    { icon: "⚙️", label: "Settings", color: "bg-gray-500 hover:bg-gray-600" },
  ];

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen  py-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Welcome back, {profile.name}! 👋</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6">
              {/* Avatar Section */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <Image
                    src={profile.avatar}
                    alt="Profile"
                    width={120}
                    height={120}
                    className="rounded-full border-4 border-white shadow-lg mx-auto"
                  />
                  <button className="absolute bottom-2 right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-md hover:bg-blue-600 transition-colors">
                    <span className="text-sm">✎</span>
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mt-4">
                  {profile.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">{profile.email}</p>
                <span className="inline-block px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mt-2">
                  Gold Member
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-xl p-4 text-center"
                  >
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-lg font-bold text-gray-800">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-blue-500 text-white py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors shadow-sm"
                >
                  Edit Profile
                </button>
                <button className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Share Profile
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Information Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Profile Information
              </h3>

              {!isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">
                      Full Name
                    </label>
                    <p className="text-gray-800 font-medium">{profile.name}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-gray-800 font-medium">{profile.email}</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">
                      Location
                    </label>
                    <p className="text-gray-800 font-medium">
                      {profile.location}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-500">
                      Member Since
                    </label>
                    <p className="text-gray-800 font-medium">
                      {profile.joinDate}
                    </p>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-sm font-medium text-gray-500">
                      Bio
                    </label>
                    <p className="text-gray-800 leading-relaxed">
                      {profile.bio}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={editedProfile.name}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={editedProfile.email}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            email: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Location
                      </label>
                      <input
                        type="text"
                        value={editedProfile.location}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            location: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Join Date
                      </label>
                      <input
                        type="text"
                        value={editedProfile.joinDate}
                        onChange={(e) =>
                          setEditedProfile({
                            ...editedProfile,
                            joinDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bio
                    </label>
                    <textarea
                      value={editedProfile.bio}
                      onChange={(e) =>
                        setEditedProfile({
                          ...editedProfile,
                          bio: e.target.value,
                        })
                      }
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSave}
                      className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors shadow-sm"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions Grid */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Quick Actions
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className={`${action.color} text-white p-5 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-sm`}
                  >
                    <div className="text-2xl mb-2">{action.icon}</div>
                    <div className="font-medium text-sm">{action.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                Recent Activity
              </h3>
              <div className="space-y-4">
                {[
                  {
                    action: "Order placed",
                    item: "Modern Sofa",
                    time: "2 hours ago",
                    icon: "🛒",
                  },
                  {
                    action: "Review added",
                    item: "Dining Table",
                    time: "1 day ago",
                    icon: "⭐",
                  },
                  {
                    action: "Item added to wishlist",
                    item: "Office Chair",
                    time: "2 days ago",
                    icon: "❤️",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl"
                  >
                    <div className="text-2xl">{activity.icon}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600">{activity.item}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
