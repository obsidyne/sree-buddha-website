'use client';
import React, { useState, useEffect } from 'react';
import DownloadButton from '@/components/common/DownloadButton';
import { motion } from 'framer-motion';
import { FaFileAlt, FaBell, FaPencilAlt, FaCalendarAlt, FaSearch, FaExclamationTriangle } from 'react-icons/fa';

// Utility function to normalize strings for comparison
const normalizeString = (str) => {
  return str.toLowerCase().replace(/\s+/g, '');
};

// Emoji mapping for exam types
const examTypeEmojis = {
  'series': '📝',
  'seriesexam': '📝',
  'semester': '📚',
  'endsemester': '📚',
  'mid': '📝', 
  'midterm': '📝',
  'final': '🎓',
  'practical': '🔬',
  'lab': '🔬',
  'viva': '🗣️',
  'project': '💻',
  'assignment': '📋',
  'quiz': '❓',
  'test': '📊',
  'examination': '📖',
  'exam': '📖',
  'retest': '🔄',
  'registration': '📝',
  'internal': '📝',
  'external': '🎓',
  'notification': '🔔',
  'important': '⚠️'
};

// Function to get emoji for exam type
const getExamEmoji = (examType) => {
  if (!examType) return '📚';
  
  const normalizedExamType = normalizeString(examType);
  
  // Check direct matches first
  for (const [key, emoji] of Object.entries(examTypeEmojis)) {
    if (normalizedExamType.includes(key) || key.includes(normalizedExamType)) {
      return emoji;
    }
  }
  
  // Default emoji if no match found
  return '📚';
};

// Function to get icon component based on exam type
const getExamIcon = (examType) => {
  const normalizedType = normalizeString(examType);
  
  if (normalizedType.includes('series') || normalizedType.includes('retest')) {
    return <FaPencilAlt className="text-blue-600" />;
  }
  if (normalizedType.includes('semester') || normalizedType.includes('final')) {
    return <FaCalendarAlt className="text-green-600" />;
  }
  if (normalizedType.includes('registration')) {
    return <FaBell className="text-red-600" />;
  }
  if (normalizedType.includes('important')) {
    return <FaExclamationTriangle className="text-yellow-600" />;
  }
  
  // Default icon
  return <FaCalendarAlt className="text-yellow-600" />;
};

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('notifications');
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [forms, setForms] = useState([]);
  const [apiError, setApiError] = useState(null);

  // Fetch exam notifications and forms from API
  const fetchExamData = async () => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI}/api/exam-notifications?pagination[page]=1&pagination[pageSize]=300&populate=file`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data && data.data && Array.isArray(data.data)) {
        // Separate notifications and forms
        const notificationsData = [];
        const formsData = [];
        
        data.data.forEach(item => {
          if (item.notification === true) {
            // Transform for notifications
            notificationsData.push({
              id: item.id,
              path: item.file ? `${process.env.NEXT_PUBLIC_STRAPI}${item.file.url}` : null,
              title: item.Heading || 'Notification',
              date: item.Notification_date,
              type: item.exam_type || 'Notification',
              icon: getExamIcon(item.exam_type),
              emoji: getExamEmoji(item.exam_type),
              important: item.Important || false,
              fileSize: item.file ? Math.round(item.file.size / 1024) : null,
              fileName: item.file ? item.file.name : null
            });
          } else {
            // Transform for forms (only heading and file)
            if (item.file) {
              formsData.push({
                id: item.id,
                path: `${process.env.NEXT_PUBLIC_STRAPI}${item.file.url}`,
                title: item.Heading || 'Form',
                description: `Download ${item.Heading || 'form'}`,
                icon: <FaFileAlt className={`text-${['indigo', 'teal', 'orange', 'purple', 'green'][formsData.length % 5]}-600`} />,
                fileSize: Math.round(item.file.size / 1024),
                fileName: item.file.name
              });
            }
          }
        });
        
        // Sort notifications by date, newest first
        notificationsData.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        setNotifications(notificationsData);
        setForms(formsData);
      } else {
        console.warn('Unexpected API response structure:', data);
        setNotifications([]);
        setForms([]);
      }
    } catch (error) {
      console.error('Error fetching exam data:', error);
      setApiError(`Failed to load data: ${error.message}`);
      setNotifications([]);
      setForms([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchExamData();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Filter notifications and forms based on search term
  const filteredNotifications = notifications.filter(
    item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredForms = forms.filter(
    item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date to be more readable
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-yellow-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
          <img
            src="https://sbce.ac.in/assets/images/profile_pic.png"
            alt="College Campus"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Examination Cell</h1>
            <p className="text-xl md:text-2xl text-yellow-100 mb-6">
              Notifications, Forms, and Important Updates
            </p>
            
            {/* Search Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-md mx-auto relative"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search notifications and forms..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-3 rounded-full pl-12 pr-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16">
        {/* Tabs Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full shadow-md p-1">
            <button
              onClick={() => setActiveTab('notifications')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'notifications' 
                  ? 'bg-yellow-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('forms')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'forms' 
                  ? 'bg-yellow-900 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Forms
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-900"></div>
          </div>
        ) : (
          <>
            {/* API Error Display */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <FaExclamationTriangle className="text-red-500 mr-2" />
                  <p className="text-red-700">{apiError}</p>
                </div>
                <button 
                  onClick={fetchExamData}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Notifications Section */}
            {activeTab === 'notifications' && (
              <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className={activeTab === 'notifications' ? 'block' : 'hidden'}
              >
                <div className="flex justify-between items-center mb-8">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold text-gray-900"
                  >
                    Latest Notifications
                  </motion.h2>
                  <p className="text-gray-500">
                    {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'} found
                  </p>
                </div>
                
                {filteredNotifications.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <p className="text-gray-500">
                      {notifications.length === 0 ? 'No notifications available.' : 'No notifications match your search.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        variants={cardVariants}
                        transition={{ duration: 0.5 }}
                        className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${
                          notification.important ? 'border-l-4 border-yellow-500' : ''
                        }`}
                        whileHover={{ y: -5 }}
                      >
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                              <span className="text-2xl mr-3" title={`${notification.type} ${notification.emoji}`}>
                                {notification.icon}
                              </span>
                              <div>
                                <div className="flex items-center">
                                  <p className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 mr-2">
                                    {notification.emoji} {notification.type}
                                  </p>
                                  {notification.important && (
                                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                      Important
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mt-1">{notification.title}</h3>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500">
                                Date: {formatDate(notification.date)}
                              </p>
                              {notification.fileSize && (
                                <p className="text-xs text-gray-400 mt-1">
                                  File: {notification.fileName} ({notification.fileSize} KB)
                                </p>
                              )}
                            </div>
                            {notification.path ? (
                              <DownloadButton
                                title="Download"
                                link={notification.path}
                                className="inline-flex items-center px-4 py-2 bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition-colors"
                              />
                            ) : (
                              <span className="text-xs text-gray-400 italic">No file available</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.section>
            )}

            {/* Forms Section */}
            {activeTab === 'forms' && (
              <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className={activeTab === 'forms' ? 'block' : 'hidden'}
              >
                <div className="flex justify-between items-center mb-8">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-3xl font-bold text-gray-900"
                  >
                    Examination Forms
                  </motion.h2>
                  <p className="text-gray-500">
                    {filteredForms.length} {filteredForms.length === 1 ? 'form' : 'forms'} found
                  </p>
                </div>
                
                {filteredForms.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <p className="text-gray-500">No forms match your search.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {filteredForms.map((form, index) => (
                      <motion.div
                        key={form.id}
                        variants={cardVariants}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                        whileHover={{ y: -5 }}
                      >
                        <div className="p-6">
                          <div className="flex items-center mb-4">
                            <span className="text-2xl mr-3">{form.icon}</span>
                            <h3 className="text-lg font-semibold text-gray-900">{form.title}</h3>
                          </div>
                          <p className="text-gray-600 mb-6">{form.description}</p>
                          <DownloadButton
                            title="Download Form"
                            link={form.path}
                            className="w-full inline-flex items-center justify-center px-4 py-2 bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition-colors"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.section>
            )}
          </>
        )}
      </div>
    </div>
  );
}