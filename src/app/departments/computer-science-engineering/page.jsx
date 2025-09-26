"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './style.css';

// Reusable Components
const SectionTitle = ({ children }) => (
  <h2 className="cs-dept-section-title text-[#845714] text-2xl md:text-3xl pb-2 border-b-2 border-[#845714] mb-8">
    {children}
  </h2>
);

const HighlightCard = ({ title, items }) => (
  <motion.div
    className="highlights-card bg-white rounded-lg p-6 shadow-md hover:shadow-xl transition-all duration-300"
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
  >
    <h3 className="highlight-category text-[#845714] text-xl font-semibold mb-4 pb-2 border-b border-gray-200">
      {title}
    </h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="pl-6 relative before:content-[''] before:absolute before:left-0 before:top-4 before:w-2 before:h-2 before:bg-[#845714] before:rounded-full">
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const GalleryImage = ({ src, alt, index }) => (
  <motion.div 
    className="card overflow-hidden rounded-lg shadow-md hover:shadow-xl"
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <div className="relative h-64 w-full">
      <Image 
        src={src} 
        alt={alt || "Department gallery image"}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
        className="image object-cover hover:scale-110 transition-transform duration-500"
        loading={index < 4 ? "eager" : "lazy"}
      />
    </div>
  </motion.div>
);

// Main Component
export default function ComputerScienceDepartment() {
  // Use a single state for gallery data to prevent multiple re-renders
  const [galleryState, setGalleryState] = useState({
    images: [],
    loading: true,
    error: null,
    initialized: false
  });
  
  // Static gallery images - default images to show while loading or as fallback
  const staticImages = [
    "/images/csimg1.jpg",
    "/images/csimg2.jpg",
    "/images/cs-dept-building/cs-dept-building.png",
    "/images/cs-dept-building/cs-dept-building2.png",
  ];
  
  // Highlights data structure
  const highlights = {
    academic: [
      "Accredited by NBA since November 2019",
      "Faculty with postgraduate and doctoral qualifications from prestigious institutions",
      "Regular publications in reputed journals and conferences"
    ],
    student: [
      "Computer Society of India (CSI) student branch",
      "Association for Computing Machinery (ACM) student branch",
      "Department association named CYBORG with active student participation"
    ],
    industry: [
      // "Management of Remote Centre for IIT Bombay",
      "College membership of NASSCOM",
      "Regular invited lectures by experts from Industries and Academia"
    ],
    infrastructure: [
      "Well-equipped laboratories and computing facilities",
      "Departmental library in addition to Central library",
      "Good collection of project reports, seminar reports, journals, and technical magazines"
    ]
  };

  const fetchImages = useCallback(async () => {
    // Don't update loading state if we already have images - prevents flickering
    if (!galleryState.initialized) {
      setGalleryState(prev => ({ ...prev, loading: true, error: null }));
    }
    
    try {
      // Check if we have environment variable
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI;
      if (!strapiUrl) {
        throw new Error("STRAPI API URL not configured");
      }
      
      // const response = await fetch(`${strapiUrl}/api/galleries?populate=`);
      const response = await fetch(`${strapiUrl}/api/galleries?populate=*&pagination[limit]=500`);
      
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Data validation
      if (!data || !data.data || !Array.isArray(data.data)) {
        throw new Error("Invalid data structure returned from API");
      }

      // Filter for CS department images
      let filteredImages = data.data.filter(item => 
        item.attributes?.Department?.toLowerCase() === "cs" || 
        item.Department?.toLowerCase() === "cs"
      );

      // Sort images by date (newest first) if date property exists
      filteredImages.sort((a, b) => {
        const dateA = a.attributes?.date || a.date;
        const dateB = b.attributes?.date || b.date;
        return dateA && dateB ? new Date(dateB) - new Date(dateA) : 0;
      });

      // Extract image URLs with fallback handling
      let imageUrls = [];
      
      filteredImages.forEach(item => {
        // Handle different API response structures
        const imagesArray = item.attributes?.images?.data || item.images || [];
        
        if (Array.isArray(imagesArray)) {
          imagesArray.forEach(img => {
            // Handle both nested and flat response structures
            const formats = img.attributes?.formats || img.formats;
            const url = img.attributes?.url || img.url;
            
            let smallImageUrl = formats?.small?.url
              ? `${strapiUrl}${formats.small.url}`
              : url
                ? `${strapiUrl}${url}`
                : null;
                
            if (smallImageUrl) {
              imageUrls.push(smallImageUrl);
            }
          });
        }
      });

      // Update state with fetched images or static images if none found
      setGalleryState({
        images: imageUrls.length > 0 ? imageUrls : staticImages,
        loading: false,
        error: null,
        initialized: true
      });
    } catch (error) {
      console.error("Error fetching images:", error);
      
      // Update state with error and fallback to static images
      setGalleryState({
        images: staticImages,
        loading: false,
        error: error.message || "Failed to load gallery images",
        initialized: true
      });
    }
  }, [galleryState.initialized, staticImages]);

  // Fetch images only once on component mount
  useEffect(() => {
    fetchImages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Destructure gallery state for cleaner JSX
  const { images, loading, error } = galleryState;

  // Preload static images to prevent flickering - FIXED: use DOM API instead of constructor
  useEffect(() => {
    staticImages.forEach(src => {
      const imgElement = document.createElement('img');
      imgElement.src = src;
    });
  }, [staticImages]);

  return (
      <div className="cs-dept-container bg-[#E6E6E6] text-gray-800 font-['Poppins',sans-serif] p-5 md:p-8">
        <header className="cs-dept-header py-6 mb-6 border-b-2 border-[#845714]">
          <h1 className="text-[#845714] text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
          Department of Computer Science and Engineering
          </h1>
          <p className="text-lg md:text-xl">
            Innovation • Excellence • Future
          </p>
        </header>
        
        <motion.div 
          className="cs-dept-hero h-[400px] bg-gray-800 relative overflow-hidden my-8 rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="cs-dept-hero-image w-full h-full">
            <Image 
              src="/images/cs-dept-hero.jpg" 
              alt="Computer Science Students Working Together"
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <motion.div 
            className="cs-dept-hero-text absolute bottom-0 left-0 p-6 md:p-8 bg-black/70 text-white w-full"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-2">
              Shaping Tomorrow&apos;s Tech Leaders
            </h2>
            <p className="text-lg">
              Join our vibrant community of innovators and problem-solvers
            </p>
          </motion.div>
        </motion.div>
        
        <section className="cs-dept-section py-8" aria-labelledby="department-profile">
          <SectionTitle>Department Profile</SectionTitle>
          <motion.div 
            className="cs-dept-profile-content"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="cs-dept-profile-text text-lg space-y-4">
              <p className='text-justify'>
                Sree Buddha College of Engineering provides world-class infrastructure, state-of-the-art facilities, and an academic 
                ambience that suit the requirements of the dynamic and highly competitive global environment. In this era of 
                Information Technology, this institution offers courses in Computer Science and Engineering with the objective of imparting 
                quality education to equip students with a solid and thorough understanding of the fundamentals and core subjects of Computer Engineering.
              </p>
                
              <p className='text-justify'>
                The Department of Computer Science And Engineering was established in the year 2002. At present the sanctioned intake is 240 
                with a provision of admitting six diploma holders in the third semester under lateral entry scheme. The department also offers 
                M.Tech programme specialized in Computer Science and Engineering from the year 2011. The sanctioned intake at present is 6. 
                This department is accredited by NBA since November 2019.
              </p>

              <p className='text-justify'>
                The department has well-experienced faculty with postgraduate and doctoral qualifications from prestigious institutions with 
                many publications to their credit. The faculty members regularly update their skills by attending and organizing refresher 
                courses in their areas of specialization.
              </p>
            </div>
          </motion.div>
        </section>
        
        <section className="cs-dept-section py-8" aria-labelledby="department-highlights">
          <SectionTitle>Department Highlights</SectionTitle>
          <div className="cs-dept-highlights-content grid grid-cols-1 md:grid-cols-2 gap-6">
            <HighlightCard title="Academic Excellence & Research" items={highlights.academic} />
            <HighlightCard title="Student Organizations" items={highlights.student} />
            <HighlightCard title="Industry Connections" items={highlights.industry} />
            <HighlightCard title="Infrastructure & Resources" items={highlights.infrastructure} />
          </div>
        </section>
        
        <section className="container mx-auto px-4 py-10">
          <h2 className="text-3xl font-bold text-amber-800 pb-3 border-b-2 text-yellow-900 mb-6">
            Department Gallery
          </h2>
      
          {/* Display gallery with minimal conditional rendering to prevent flickering */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {loading ? (
              // Show static images with loading effect instead of empty placeholders
              staticImages.map((src, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all relative">
                  <div className="absolute inset-0 bg-gray-200 animate-pulse opacity-70 z-10"></div>
                  <div className="w-full h-48 bg-gray-100"></div>
                </div>
              ))
            ) : (
              // Show fetched images or static images when API call is complete
              images.map((src, index) => (
                <motion.div 
                  key={index} 
                  className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <Image
                    src={src}
                    alt={`CS Department Image ${index + 1}`}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                      // Handle image loading errors
                      console.error(`Failed to load image: ${src}`);
                      e.currentTarget.src = staticImages[index % staticImages.length];
                    }}
                  />
                </motion.div>
              ))
            )}
          </div>
          
          {/* Show error message below the gallery if there's an error */}
          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-sm text-red-600 mb-2">{error}</p>
              <button 
                onClick={fetchImages} 
                className="px-3 py-1 text-sm bg-amber-800 text-white rounded-md hover:bg-amber-900 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </section>
      </div>
  );
}