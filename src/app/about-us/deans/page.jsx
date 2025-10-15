"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { FiLoader, FiMail, FiChevronDown, FiChevronUp } from "react-icons/fi";

function Deans() {
  const [deansData, setDeansData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBios, setExpandedBios] = useState({});

  useEffect(() => {
    const fetchDeansData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI}/api/dean?populate=*`
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setDeansData(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching deans data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDeansData();
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 * custom,
        duration: 0.7,
        ease: "easeOut"
      }
    })
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-yellow-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
          <FiLoader className="text-5xl mb-4" />
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg"
        >
          Loading deans information...
        </motion.p>
      </div>
    );
  }

  if (error) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-red-50 border-l-4 border-red-500 p-8 text-center rounded-lg my-8 max-w-2xl mx-auto shadow-lg"
      >
        <h2 className="text-2xl font-bold text-red-700">Oops!</h2>
        <p className="my-4">We couldn&apos;t load the deans information.</p>
        <p className="text-sm text-gray-600 mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
        >
          <motion.span
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            ↻
          </motion.span>
          Try Again
        </button>
      </motion.div>
    );
  }

  const toggleBio = (deanKey) => {
    setExpandedBios(prev => ({
      ...prev,
      [deanKey]: !prev[deanKey]
    }));
  };

  const renderContent = (content, deanKey) => {
    if (!content) return null;
    
    const paragraphs = content.split(/\n+/);
    const isExpanded = expandedBios[deanKey];
    const displayParagraphs = isExpanded ? paragraphs : paragraphs.slice(0, 1);
    
    return (
      <>
        {displayParagraphs.map((paragraph, index) => (
          <motion.p 
            key={index}
            custom={index}
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="my-4 leading-7 text-justify text-gray-700"
          >
            {paragraph}
          </motion.p>
        ))}
        {paragraphs.length > 1 && (
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => toggleBio(deanKey)}
              className="flex items-center gap-2 text-yellow-700 hover:text-yellow-900 bg-yellow-50 hover:bg-yellow-100 px-4 py-2 rounded-full text-sm transition-all duration-300"
            >
              {isExpanded ? (
                <>
                  Show Less <FiChevronUp />
                </>
              ) : (
                <>
                  Read More <FiChevronDown />
                </>
              )}
            </button>
          </div>
        )}
      </>
    );
  };

  const deans = [
    {
      key: 'ug_iqac',
      name: deansData?.UG_IQAC_name,
      description: deansData?.UG_IQAC_description,
      image: deansData?.UG_IQAC_image,
      title: 'Dean (UG & IQAC)',
    //   email: 'ugiqac@sbce.ac.in'
    },
    {
      key: 'pg',
      name: deansData?.PG_name,
      description: deansData?.PG_description,
      image: deansData?.PG_image,
      title: 'Dean (PG)',
    //   email: 'pg@sbce.ac.in'
    },
    {
      key: 'research',
      name: deansData?.Research_name,
      description: deansData?.Research_Description,
      image: deansData?.Research_Image,
      title: 'Dean (Research)',
    //   email: 'research@sbce.ac.in'
    },
    {
      key: 'cse',
      name: deansData?.CSE_name,
      description: deansData?.CSE_description,
      image: deansData?.CSE_image,
      title: 'Dean (CSE)',
    //   email: 'cse@sbce.ac.in'
    }
  ].filter(dean => dean.name && dean.description); // Only show deans with data

  return (
    <motion.div 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-gray-800"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Section */}
      <motion.div 
        className="text-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          type: "spring", 
          stiffness: 100,
          damping: 15,
          duration: 0.8
        }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-yellow-900 mb-2">The Deans</h1>
        <div className="h-1 w-36 bg-gradient-to-r from-transparent via-yellow-900 to-transparent mx-auto"></div>
      </motion.div>

      {/* Deans List */}
      <div className="space-y-12">
        {deans.map((dean, index) => (
          <motion.div
            key={dean.key}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          >
            <div className="flex flex-col lg:flex-row lg:items-start gap-8 p-6 lg:p-8">
              {/* Profile Image */}
              <motion.div 
                className="lg:w-1/3 relative rounded-lg overflow-hidden shadow-xl group mx-auto lg:mx-0 max-w-md flex-shrink-0"
                whileHover={{ scale: 1.02 }}
              >
                <div className="bg-gray-100">
                  {dean.image?.url ? (
                    <img 
                      src={`${process.env.NEXT_PUBLIC_STRAPI}${dean.image.url}`} 
                      alt={dean.name}
                      className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full aspect-[3/4] flex items-center justify-center bg-yellow-100 text-yellow-900 text-6xl font-bold">
                      {dean.name?.charAt(0)}
                    </div>
                  )}
                </div>
                
                {/* Profile Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-900/95 via-yellow-900/85 to-transparent text-white p-6 transform translate-y-0 lg:translate-y-14 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-xl font-semibold mb-1">{dean.name}</h3>
                  <p className="text-yellow-100 font-light mb-4">{dean.title}</p>
                  
                  {/* Contact Link */}
                  <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-2">
                    <a href={`mailto:${dean.email}`} className="h-[20px] text-white hover:text-yellow-200 flex items-center gap-2 text-sm">
                      {/* <FiMail /> {dean.email} */}
                    </a>
                  </div>
                </div>
              </motion.div>

              {/* Content Section */}
              <div className="lg:w-2/3 flex-grow">
                <div className="border-l-4 border-yellow-900 pl-4 mb-6">
                  <h2 className="text-3xl font-semibold text-yellow-900 mb-1">{dean.name}</h2>
                  <p className="text-lg text-gray-600 italic">{dean.title}</p>
                </div>
                
                <div className="relative bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <FaQuoteLeft className="absolute top-3 left-3 text-2xl text-yellow-200" />
                  {renderContent(dean.description, dean.key)}
                  <FaQuoteRight className="absolute bottom-3 right-3 text-2xl text-yellow-200" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Message Section */}
      {/* <motion.div 
        className="bg-yellow-900 text-white rounded-xl overflow-hidden shadow-xl mt-12 relative"
        whileHover={{ scale: 1.01 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="relative z-10 p-8">
          <h3 className="text-2xl font-semibold mb-4">Academic Leadership</h3>
          
          <motion.p 
            className="text-yellow-100 italic mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            &quot;Our deans bring decades of combined experience in engineering education, research, and 
            quality assurance. They are committed to fostering excellence in academics, promoting innovative 
            research, and ensuring the highest standards of education for our students.&quot;
          </motion.p>
          
          <div className="flex justify-end">
            <div className="text-right">
              <div className="font-semibold">The Deans</div>
              <div className="text-yellow-200 text-sm">Sree Buddha College of Engineering</div>
            </div>
          </div>
        </div>
      </motion.div> */}
    </motion.div>
  );
}

export default Deans;