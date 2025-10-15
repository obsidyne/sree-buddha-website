"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight, FaLinkedin } from "react-icons/fa";
import { FiLoader, FiMail, FiPhone, FiExternalLink, FiChevronDown, FiChevronUp } from "react-icons/fi";

function VicePrincipal() {
  const [vicePrincipalData, setVicePrincipalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedBio, setExpandedBio] = useState(false);
  
  const bioRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(bioRef, { once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  useEffect(() => {
    const fetchVicePrincipalData = async () => {
      try {
        const response = await fetch(
          "http://91.99.112.1:1337/api/vice-principal?populate=*"
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setVicePrincipalData(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching vice principal data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchVicePrincipalData();
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
          Loading vice principal information...
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
        <p className="my-4">We couldn&apos;t load the vice principal&apos;s information.</p>
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

  const renderContent = (content, limit = false) => {
    if (!content) return null;
    
    const paragraphs = content.split(/\n+/);
    const displayParagraphs = (limit && !expandedBio) 
      ? paragraphs.slice(0, 1) 
      : paragraphs;
    
    return displayParagraphs.map((paragraph, index) => (
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
    ));
  };

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
        <h1 className="text-4xl md:text-5xl font-semibold text-yellow-900 mb-2">The Vice Principal</h1>
        <div className="h-1 w-36 bg-gradient-to-r from-transparent via-yellow-900 to-transparent mx-auto"></div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* Profile Image */}
        <motion.div 
          className="lg:w-1/3 relative rounded-lg overflow-hidden shadow-xl group mx-auto lg:mx-0 max-w-md"
          whileHover={{ scale: 1.02 }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="aspect-w-3 aspect-h-4 bg-gray-100">
            {vicePrincipalData?.image?.url ? (
              <img 
                src={`${process.env.NEXT_PUBLIC_STRAPI}${vicePrincipalData.image.url}`} 
                alt={vicePrincipalData.name || "Vice Principal"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <img 
                src="/images/vice-principal.png" 
                alt={vicePrincipalData?.name || "Vice Principal"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            )}
          </div>
          
          {/* Profile Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-yellow-900/95 via-yellow-900/85 to-transparent text-white p-6 transform translate-y-0 lg:translate-y-14 group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-xl font-semibold mb-1">{vicePrincipalData?.name || "Dr. Saji Varghese"}</h3>
            <p className="text-yellow-100 font-light mb-4">Vice Principal</p>
            
            {/* Contact Links */}
            <div className="flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pt-2">
              <a href="mailto:viceprincipal@sbce.ac.in" className="text-white hover:text-yellow-200 flex items-center gap-2 text-sm">
                {/* <FiMail /> viceprincipal@sbce.ac.in */}
              </a>
              {/* <a href="tel:+91-9446005706" className="text-white hover:text-yellow-200 flex items-center gap-2 text-sm">
                <FiPhone /> +91-94460 05706
              </a> */}
              <div className="flex gap-3 pt-2">
                {/* <a href="#" className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                  <FaLinkedin className="text-white" />
                </a> */}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div 
          className="lg:w-2/3"
          ref={bioRef}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="border-l-4 border-yellow-900 pl-4 mb-6">
            <h2 className="text-3xl font-semibold text-yellow-900 mb-1">{vicePrincipalData?.name || "Dr. Saji Varghese"}</h2>
            <p className="text-lg text-gray-600 italic">Vice Principal</p>
          </div>
          
          <div className="relative bg-white p-6 rounded-lg mb-8 shadow-md hover:shadow-xl transition-shadow duration-300">
            <FaQuoteLeft className="absolute top-3 left-3 text-2xl text-yellow-200" />
            {renderContent(vicePrincipalData?.description, true)}
            <FaQuoteRight className="absolute bottom-3 right-3 text-2xl text-yellow-200" />
            
            {vicePrincipalData?.description?.split(/\n+/).length > 1 && (
              <div className="flex justify-center mt-4">
                <button 
                  onClick={() => setExpandedBio(!expandedBio)}
                  className="flex items-center gap-2 text-yellow-700 hover:text-yellow-900 bg-yellow-50 hover:bg-yellow-100 px-4 py-2 rounded-full text-sm transition-all duration-300"
                >
                  {expandedBio ? (
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
          </div>
          
          {/* <div className="bg-yellow-50 p-4 rounded-lg flex gap-4 items-center">
            <div className="flex-shrink-0 bg-yellow-100 p-2 rounded-full">
              <FiExternalLink className="text-xl text-yellow-800" />
            </div>
            <div>
              <p className="text-sm text-yellow-900">
                Contact the vice principal&apos;s office to schedule an appointment or for any inquiries.
              </p>
            </div>
          </div> */}
        </motion.div>
      </div>
      
      {/* Message from Vice Principal */}
      {/* <motion.div 
        className="bg-yellow-900 text-white rounded-xl overflow-hidden shadow-xl mb-12 relative"
        whileHover={{ scale: 1.01 }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.png')] opacity-10"></div>
        <div className="relative z-10 p-8">
          <h3 className="text-2xl font-semibold mb-4">Message from the Vice Principal</h3>
          
          <motion.p 
            className="text-yellow-100 italic mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            &quot;Our commitment to academic excellence and quality assurance ensures that our students 
            receive world-class education. With decades of experience in accreditation and quality 
            management, we continuously strive to maintain the highest standards in engineering education.&quot;
          </motion.p>
          
          <div className="flex justify-end">
            <div className="text-right">
              <div className="font-semibold">{vicePrincipalData?.name || "Dr. Saji Varghese"}</div>
              <div className="text-yellow-200 text-sm">Vice Principal</div>
            </div>
          </div>
        </div>
      </motion.div>
       */}
      {/* Contact Section */}
      {/* <motion.div 
        className="bg-white rounded-xl shadow-lg overflow-hidden"
        whileHover={{ boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="p-8">
            <h3 className="text-2xl font-semibold text-yellow-900 mb-6">Contact the Vice Principal</h3>
            <p className="text-gray-600 mb-6">
              For appointments, academic queries, or feedback regarding quality assurance and accreditation matters.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <FiMail className="text-yellow-800" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <a href="mailto:viceprincipal@sbce.ac.in" className="text-yellow-900 hover:underline">viceprincipal@sbce.ac.in</a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <FiPhone className="text-yellow-800" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <a href="tel:+919446005706" className="text-yellow-900 hover:underline">+91 94460 05706</a>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                  <FiExternalLink className="text-yellow-800" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Office Hours</div>
                  <div className="text-yellow-900">Monday - Friday, 9:00 AM - 4:00 PM</div>
                </div>
              </div>
            </div>
          </div>
          
         
        </div>
      </motion.div> */}
    </motion.div>
  );
}

export default VicePrincipal;