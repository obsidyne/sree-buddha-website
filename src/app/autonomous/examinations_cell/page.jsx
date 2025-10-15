'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaBell, FaPencilAlt, FaCalendarAlt, FaSearch, FaExclamationTriangle, FaExternalLinkAlt, FaAward, FaBook, FaGavel, FaChevronDown, FaChevronUp, FaUserTie, FaDownload } from 'react-icons/fa';

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
  
  for (const [key, emoji] of Object.entries(examTypeEmojis)) {
    if (normalizedExamType.includes(key) || key.includes(normalizedExamType)) {
      return emoji;
    }
  }
  
  return '📚';
};

// Function to get icon component based on exam type
const getExamIcon = (examType) => {
  const normalizedType = normalizeString(examType || '');
  
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
  
  return <FaCalendarAlt className="text-yellow-600" />;
};

// Mock DownloadButton component
const DownloadButton = ({ title, link, className }) => (
  <a 
    href={link} 
    download 
    target="_blank"
    rel="noopener noreferrer"
    className={className}
  >
    {title}
  </a>
);

export default function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('about');
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [forms, setForms] = useState([]);
  const [apiError, setApiError] = useState(null);

  // PDF URLs from public folder - update these paths to match your file names
  const manualPDF = '/Examination manual.pdf';
  const malpracticesPDF = '/Malpractice Punishments.pdf';
  const feeRefundPolicyPDF = '/Fee Refund Policy.pdf';

  // Results URL - update this to your actual results page URL
  const resultsURL = 'https://www.sbce.etlab.app/universityexam/student/examresult';

  // Controller and Deputy Controller images - update paths as needed
  const controllerImage = '/Controller.jpeg'; // Add controller image to public folder
  const deputyController1Image = '/DeputyController.jpeg'; // Add to public folder
  const deputyController2Image = '/DeputyController2.jpeg'; // Add to public folder

  // Fetch exam notifications and forms from the API endpoints
  const fetchExamData = async () => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      // Fetch notifications
      const notificationsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI}/api/autonomous?populate[examination_cell][populate][notifications][populate]=PDF`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      // Fetch forms
      const formsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI}/api/autonomous?populate[examination_cell][populate][forms][populate]=PDF`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (!notificationsResponse.ok || !formsResponse.ok) {
        throw new Error(`HTTP error! Notifications: ${notificationsResponse.status}, Forms: ${formsResponse.status}`);
      }

      const notificationsData = await notificationsResponse.json();
      const formsData = await formsResponse.json();
      
      // Process notifications
      let processedNotifications = [];
      if (notificationsData?.data?.examination_cell?.[0]?.notifications && Array.isArray(notificationsData.data.examination_cell[0].notifications)) {
        processedNotifications = notificationsData.data.examination_cell[0].notifications.map((item, index) => ({
          id: item.id || `notification-${index}`,
          path: item.PDF ? `${process.env.NEXT_PUBLIC_STRAPI}${item.PDF.url}` : null,
          title: item.Tittle || item.Title || 'Notification',
          date: item.createdAt || item.updatedAt || new Date().toISOString(),
          type: item.exam_type || 'Notification',
          icon: getExamIcon(item.exam_type),
          emoji: getExamEmoji(item.exam_type),
          important: item.Important || false,
          fileSize: item.PDF ? Math.round(item.PDF.size / 1024) : null,
          fileName: item.PDF ? item.PDF.name : null
        }));
      }

      // Process forms
      let processedForms = [];
      if (formsData?.data?.examination_cell?.[0]?.forms && Array.isArray(formsData.data.examination_cell[0].forms)) {
        processedForms = formsData.data.examination_cell[0].forms.map((item, index) => ({
          id: item.id || `form-${index}`,
          path: item.PDF ? `${process.env.NEXT_PUBLIC_STRAPI}${item.PDF.url}` : null,
          title: item.Tittle || item.Title || 'Form',
          description: `Download ${item.Tittle || item.Title || 'form'}`,
          icon: <FaFileAlt className={`text-${['indigo', 'teal', 'orange', 'purple', 'green'][index % 5]}-600`} />,
          fileSize: item.PDF ? Math.round(item.PDF.size / 1024) : null,
          fileName: item.PDF ? item.PDF.name : null
        }));
      }
      
      // Sort notifications by date, newest first
      processedNotifications.sort((a, b) => new Date(b.date) - new Date(a.date));
      
      setNotifications(processedNotifications);
      setForms(processedForms);
      
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
        staggerChildren: 0.08
      }
    }
  };

  // Filter notifications based on search term
  const filteredNotifications = notifications.filter(
    item => item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle Results tab click
  const handleResultsClick = () => {
    window.open(resultsURL, '_blank');
  };

  // Static regulation documents
  const regulationDocuments = [
    {
      id: 'manual',
      title: 'Examination Manual',
      description: 'Complete examination guidelines and regulations',
      path: manualPDF,
      icon: <FaBook className="text-blue-600" />,
      color: 'blue'
    },
    {
      id: 'malpractices',
      title: 'Malpractices Policy',
      description: 'Examination malpractices and disciplinary actions',
      path: malpracticesPDF,
      icon: <FaGavel className="text-red-600" />,
      color: 'red'
    },
    {
      id: 'fee-refund',
      title: 'Fee Refund Policy',
      description: 'Guidelines for examination fee refund process',
      path: feeRefundPolicyPDF,
      icon: <FaFileAlt className="text-green-600" />,
      color: 'green'
    }
  ];

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
        <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4 px-4">
              Examination Cell
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-yellow-100 mb-4 md:mb-6 px-4">
              Notifications, Forms, and Important Updates
            </p>
            
            {/* Search Box - Only for Notifications tab */}
            {activeTab === 'notifications' && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="max-w-md mx-auto relative px-4"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-5 py-3 rounded-full pl-12 pr-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm md:text-base"
                  />
                  <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {/* Tabs Navigation - Responsive Dropdown for Mobile */}
        <div className="mb-6 md:mb-8">
          {/* Mobile Dropdown */}
          <div className="block md:hidden">
            <select
              value={activeTab}
              onChange={(e) => {
                if (e.target.value === 'results') {
                  handleResultsClick();
                } else {
                  setActiveTab(e.target.value);
                }
              }}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-900 text-sm font-medium text-gray-700"
            >
              <option value="about">About</option>
              <option value="notifications">Notifications</option>
              <option value="results">Results ↗</option>
              <option value="regulations">Regulations & Forms</option>
            </select>
          </div>

          {/* Desktop Tabs */}
          <div className="hidden md:flex justify-center">
            <div className="bg-white rounded-full shadow-md p-1 inline-flex">
              <button
                onClick={() => setActiveTab('about')}
                className={`px-4 lg:px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'about' 
                    ? 'bg-yellow-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                About
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`px-4 lg:px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'notifications' 
                    ? 'bg-yellow-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Notifications
              </button>
              <button
                onClick={handleResultsClick}
                className="px-4 lg:px-6 py-2 rounded-full text-sm font-medium transition-colors text-gray-700 hover:bg-gray-100 flex items-center gap-2 whitespace-nowrap"
              >
                Results <FaExternalLinkAlt className="text-xs" />
              </button>
              <button
                onClick={() => setActiveTab('regulations')}
                className={`px-4 lg:px-6 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === 'regulations' 
                    ? 'bg-yellow-900 text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Regulations & Forms
              </button>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-900"></div>
          </div>
        ) : (
          <>
            {/* About Section */}
            {activeTab === 'about' && (
              <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <div className="max-w-6xl mx-auto">
                  <motion.div
                    variants={cardVariants}
                    className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-12"
                  >
                    <div className="flex items-center justify-center mb-6">
                      <div className="bg-yellow-100 p-3 md:p-4 rounded-full">
                        <FaAward className="text-3xl md:text-4xl text-yellow-900" />
                      </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 md:mb-6 text-center">
                      About the Examination Cell
                    </h2>
                    <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
                      <p className="mb-4">
                        The Examination Cell of Sree Buddha College of Engineering (Autonomous) is a central academic unit entrusted with the smooth and transparent conduct of all examination-related activities of autonomous batches. Headed by the Controller of Examinations, along with two Deputy Controllers, the cell ensures that all processes are carried out in alignment with the academic regulations and autonomous framework of the institution.
                      </p>
                      <p className="mb-4">
                        Representatives from every department of the college, supported by clerical and technical staff, work in coordination to manage the preparation of question papers, scheduling, evaluation, and timely publication of results. The cell also oversees internal assessments, end-semester examinations, revaluation, and supplementary examinations with a focus on fairness and efficiency.
                      </p>
                      <p className="mb-8">
                        It continuously strives to adopt innovative practices and technology-driven solutions to enhance confidentiality, accuracy, and timeliness in the examination system. With its structured team, the Examination Cell upholds academic standards and plays a crucial role in maintaining the credibility and excellence of Sree Buddha College of Engineering (Autonomous).
                      </p>
                    </div>

                    {/* Leadership Team */}
                    <div className="mt-8 md:mt-12">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
                        Examination Cell Board
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
                        {/* Controller of Examinations */}
                        <motion.div
                          variants={cardVariants}
                          className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 text-center shadow-md"
                        >
                          <div className="mb-4">
                            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-yellow-900 shadow-lg bg-gray-200">
                              <img
                                src={controllerImage}
                                alt="Controller of Examinations"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="w-full h-full hidden items-center justify-center">
                                <FaUserTie className="text-5xl text-gray-400" />
                              </div>
                            </div>
                          </div>
                          <h4 className="text-lg font-bold text-yellow-900 mb-1">
Dr. Saji Varghese                          </h4>
                          <p className="text-sm text-gray-700 font-medium mb-1">Controller of Examinations</p>
                          <p className="text-xs text-gray-600">Head of Examination Cell</p>
                        </motion.div>

                        {/* Deputy Controller 1 */}
                        <motion.div
                          variants={cardVariants}
                          className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center shadow-md"
                        >
                          <div className="mb-4">
                            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-blue-900 shadow-lg bg-gray-200">
                              <img
                                src={deputyController1Image}
                                alt="Deputy Controller 1"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="w-full h-full hidden items-center justify-center">
                                <FaUserTie className="text-5xl text-gray-400" />
                              </div>
                            </div>
                          </div>
                          <h4 className="text-lg font-bold text-blue-900 mb-1">
Dr. Veena Priya Sukumaran                          </h4>
                          <p className="text-sm text-gray-700 font-medium mb-1">Deputy Controller</p>
                          <p className="text-xs text-gray-600">Examination Cell</p>
                        </motion.div>

                        {/* Deputy Controller 2 */}
                        <motion.div
                          variants={cardVariants}
                          className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center shadow-md"
                        >
                          <div className="mb-4">
                            <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-green-900 shadow-lg bg-gray-200">
                              <img
                                src={deputyController2Image}
                                alt="Deputy Controller 2"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              <div className="w-full h-full hidden items-center justify-center">
                                <FaUserTie className="text-5xl text-gray-400" />
                              </div>
                            </div>
                          </div>
                          <h4 className="text-lg font-bold text-green-900 mb-1">
Mr. Sabi S                          </h4>
                          <p className="text-sm text-gray-700 font-medium mb-1">Deputy Controller</p>
                          <p className="text-xs text-gray-600">Examination Cell</p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.section>
            )}

            {/* API Error Display */}
            {apiError && activeTab === 'notifications' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="flex items-center">
                  <FaExclamationTriangle className="text-red-500 mr-2" />
                  <p className="text-red-700 text-sm sm:text-base">{apiError}</p>
                </div>
                <button 
                  onClick={fetchExamData}
                  className="mt-2 px-4 py-2 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
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
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8 gap-2">
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl sm:text-3xl font-bold text-gray-900"
                  >
                    Latest Notifications
                  </motion.h2>
                  <p className="text-sm sm:text-base text-gray-500">
                    {filteredNotifications.length} {filteredNotifications.length === 1 ? 'notification' : 'notifications'}
                  </p>
                </div>
                
                {filteredNotifications.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <p className="text-sm sm:text-base text-gray-500">
                      {notifications.length === 0 ? 'No notifications available.' : 'No notifications match your search.'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                    {filteredNotifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        variants={cardVariants}
                        transition={{ duration: 0.5 }}
                        className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${
                          notification.important ? 'border-l-4 border-yellow-500' : ''
                        }`}
                        whileHover={{ y: -5 }}
                      >
                        <div className="p-3 md:p-4">
                          <div className="flex items-start justify-between mb-2 md:mb-3">
                            <div className="flex items-start gap-2 flex-1 min-w-0">
                              <span className="text-lg md:text-xl mt-1 flex-shrink-0">
                                {notification.icon}
                              </span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1 mb-1 flex-wrap">
                                  <p className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 whitespace-nowrap">
                                    {notification.emoji} {notification.type}
                                  </p>
                                  {notification.important && (
                                    <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                      !
                                    </span>
                                  )}
                                </div>
                                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 break-words">
                                  {notification.title}
                                </h3>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2 md:mt-3">
                            {notification.path ? (
                              <DownloadButton
                                title="Download"
                                link={notification.path}
                                className="w-full inline-flex items-center justify-center px-3 py-1.5 bg-yellow-900 text-white text-xs sm:text-sm rounded-md hover:bg-yellow-800 transition-colors"
                              />
                            ) : (
                              <span className="text-xs text-gray-400 italic block text-center">No file</span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.section>
            )}

            {/* Regulations & Forms Section */}
            {activeTab === 'regulations' && (
              <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <div className="max-w-6xl mx-auto">
                  {/* Regulations Documents */}
                  <div className="mb-12">
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6"
                    >
                      Examination Regulations
                    </motion.h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      {regulationDocuments.map((doc, index) => (
                        <motion.div
                          key={doc.id}
                          variants={cardVariants}
                          className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-${doc.color}-500`}
                          whileHover={{ y: -5 }}
                        >
                          <div className="p-6">
                            <div className="flex items-start gap-3 mb-4">
                              <span className="text-3xl">{doc.icon}</span>
                              <div className="flex-1">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">
                                  {doc.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  {doc.description}
                                </p>
                              </div>
                            </div>
                            <DownloadButton
                              title="Download PDF"
                              link={doc.path}
                              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Forms from Backend */}
                  <div>
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6"
                    >
                      Examination Forms
                    </motion.h2>
                    
                    {forms.length === 0 ? (
                      <div className="bg-white rounded-xl shadow-md p-8 text-center">
                        <p className="text-sm sm:text-base text-gray-500">
                          No forms available at the moment.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
                        {forms.map((form, index) => (
                          <motion.div
                            key={form.id}
                            variants={cardVariants}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                            whileHover={{ y: -5 }}
                          >
                            <div className="p-3 md:p-4">
                              <div className="flex items-start gap-2 mb-2 md:mb-3">
                                <span className="text-lg md:text-xl mt-1 flex-shrink-0">{form.icon}</span>
                                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 line-clamp-2 flex-1 break-words">
                                  {form.title}
                                </h3>
                              </div>
                              <div className="mt-2 md:mt-3">
                                {form.path ? (
                                  <DownloadButton
                                    title="Download Form"
                                    link={form.path}
                                    className="w-full inline-flex items-center justify-center px-3 py-1.5 bg-yellow-900 text-white text-xs sm:text-sm rounded-md hover:bg-yellow-800 transition-colors"
                                  />
                                ) : (
                                  <span className="text-xs text-gray-400 italic block text-center">No file</span>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.section>
            )}
          </>
        )}
      </div>
    </div>
  );
}