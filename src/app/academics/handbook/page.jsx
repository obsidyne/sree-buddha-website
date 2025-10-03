'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaSearch, FaDownload, FaExclamationTriangle } from 'react-icons/fa';

function Page() {
  const [searchTerm, setSearchTerm] = useState('');
  const [handbooksData, setHandbooksData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the handbooks data from the API
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/handbooks?populate=*`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setHandbooksData(data.data || []); // Extract data from the response
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleClick = (pdfPath) => {
    const fullPath = pdfPath.startsWith('http') ? pdfPath : `${process.env.NEXT_PUBLIC_STRAPI}${pdfPath}`;
    window.open(fullPath, '_blank');
  };

  // More flexible data mapping to handle different API structures
  const filteredFiles = handbooksData
    .map((item, index) => {
      // Extract handbook name
      const name = item.handbook_name || item.Handbook_name || item.Name || item.name || `Handbook ${index + 1}`;
      
      // Extract PDF path from pdf_name array
      let path = '';
      if (item.pdf_name && Array.isArray(item.pdf_name) && item.pdf_name.length > 0) {
        path = item.pdf_name[0].url;
      }
      
      return {
        name,
        path,
      };
    })
    .filter(handbook => {
      const hasPath = handbook.path && handbook.path.length > 0;
      const matchesSearch = handbook.name.toLowerCase().includes(searchTerm.toLowerCase());
      return hasPath && matchesSearch;
    });

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-yellow-900 to-yellow-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 py-16 sm:py-20 md:py-24 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <FaBook className="text-4xl sm:text-5xl md:text-6xl text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 md:mb-4">
              Handbooks
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-yellow-100 mb-6 md:mb-8">
              Access all academic handbooks and guidelines
            </p>

            {/* Search Box */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="max-w-md mx-auto relative"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search handbooks..."
                  className="w-full px-5 py-3 rounded-full pl-12 pr-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm md:text-base"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 md:py-12 lg:py-16">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-900"></div>
          </div>
        ) : error ? (
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <FaExclamationTriangle className="text-4xl text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-900 mb-2">Error Loading Handbooks</h3>
              <p className="text-red-700 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Available Handbooks
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {filteredFiles.length} {filteredFiles.length === 1 ? 'handbook' : 'handbooks'} found
              </p>
            </div>

            {/* Handbooks List */}
            {filteredFiles.length === 0 ? (
              <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
                <FaBook className="text-5xl text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {handbooksData.length === 0
                    ? 'No handbooks available at the moment.'
                    : 'No handbooks match your search.'}
                </p>
              </div>
            ) : (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto"
              >
                {filteredFiles.map((handbook, index) => (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    transition={{ duration: 0.5 }}
                    onClick={() => handleClick(handbook.path)}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group relative"
                    whileHover={{ y: -8 }}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-lg flex items-center justify-center group-hover:from-yellow-200 group-hover:to-yellow-300 transition-all">
                            <FaBook className="text-2xl text-yellow-900" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 group-hover:text-yellow-900 transition-colors line-clamp-2">
                            {handbook.name}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FaDownload className="text-xs" />
                            <span>Click to view</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Page;