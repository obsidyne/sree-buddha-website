'use client';
import React, { useState, useEffect } from 'react';
import DownloadButton from '@/components/common/DownloadButton';
import { motion } from 'framer-motion';
import { FaFileAlt, FaBell, FaPencilAlt, FaCalendarAlt, FaSearch } from 'react-icons/fa';

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('notifications');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const notifications = [
    {
      id: 1,
      path: "/assets/documents/autonomous/examination_cell/notification-auto.pdf",
      title: "First Series Examination – Oct 2024 Notification",
      date: "2024-10-01",
      type: "Series Exam",
      icon: <FaCalendarAlt className="text-yellow-600" />,
      important: true
    },
    {
      id: 2,
      path: "/assets/documents/autonomous/examination_cell/notification-auto3.pdf",
      title: "Retest – Nov 2024 Notification",
      date: "2024-11-15",
      type: "Retest",
      icon: <FaPencilAlt className="text-blue-600" />
    },
    {
      id: 3,
      path: "/assets/documents/autonomous/examination_cell/Registration-Notification.pdf",
      title: "End Semester Registration Notification – Jan 2025",
      date: "2025-01-05",
      type: "Registration",
      icon: <FaBell className="text-red-600" />,
      important: true
    },
    {
      id: 4,
      path: "/assets/documents/autonomous/examination_cell/S1-PG-END-SEMESTER-EXAMINATION-NOTIFICATION.pdf",
      title: "S1 PG End Semester Examination Notification – Jan 2025",
      date: "2025-01-10",  // Fixed date format error
      type: "End Semester",
      icon: <FaCalendarAlt className="text-green-600" />
    }
  ];

  const forms = [
    {
      id: 1,
      path: "/assets/documents/autonomous/examination_cell/APPLICATION-FORM-OF-ATTENDANCE.pdf",
      title: "Application Form of Attendance",
      description: "Form for attendance related matters",
      icon: <FaFileAlt className="text-indigo-600" />
    },
    {
      id: 2,
      path: "/assets/documents/autonomous/examination_cell/APPLICATION-FORM-TO-AVAIL-THE-SERVICE-OF-SCRIBE.pdf",
      title: "Application Form to Avail the Service of Scribe",
      description: "Special arrangements for examinations",
      icon: <FaFileAlt className="text-teal-600" />
    },
    {
      id: 3,
      path: "/assets/documents/autonomous/examination_cell/RETEST-FORM-2024.pdf",
      title: "Retest Form – 2024",
      description: "Application for retest examination",
      icon: <FaFileAlt className="text-orange-600" />
    }
  ];

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
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
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
                    <p className="text-gray-500">No notifications match your search.</p>
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
                              <span className="text-2xl mr-3">{notification.icon}</span>
                              <div>
                                <div className="flex items-center">
                                  <p className="text-sm font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 mr-2">{notification.type}</p>
                                  {notification.important && (
                                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">Important</span>
                                  )}
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 mt-1">{notification.title}</h3>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-500">
                              Date: {formatDate(notification.date)}
                            </p>
                            <DownloadButton
                              title="Download"
                              link={notification.path}
                              className="inline-flex items-center px-4 py-2 bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition-colors"
                            />
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