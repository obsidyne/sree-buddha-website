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

const LoadingGallery = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
    {[...Array(6)].map((_, index) => (
      <div key={index} className="bg-gray-200 rounded-lg h-64"></div>
    ))}
  </div>
);

const ErrorDisplay = ({ message, retryFn }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-red-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
    <h3 className="text-lg font-medium text-red-800 mb-2">Unable to load gallery images</h3>
    <p className="text-sm text-red-600 mb-4">{message}</p>
    <button 
      onClick={retryFn} 
      className="px-4 py-2 bg-[#845714] text-white rounded-md hover:bg-[#6b450f] transition-colors"
    >
      Try Again
    </button>
  </div>
);

// Main Component
export default function ElectricalDepartment() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Highlights data structure
  const highlights = {
    faculty: [
      "Highly qualified, experienced and dedicated faculty and supporting staff",
      "All teachers hold M.Tech/M.E degrees with some pursuing Ph.D",
      "Effective advisory system for regular evaluation of students and communication with parents"
    ],
    industry: [
      "Excellent contact with neighboring industries like KSEB and NTPC",
      "High placement rate for department graduates",
      "Many students have achieved GATE qualification"
    ],
    infrastructure: [
      "Well-equipped laboratories for existing courses and project work",
      "Dedicated computer center with internet access",
      "Department library with comprehensive collection of prescribed textbooks"
    ],
    students: [
      "Department newsletter named 'Impulse' published monthly",
      "Strong academic performance in Kerala Technological University",
      "Alumni working in prestigious positions nationally and internationally"
    ]
  };

  const fetchImages = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Check if we have environment variable
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI;
      if (!strapiUrl) {
        throw new Error("STRAPI API URL not configured");
      }
      
      const response = await fetch(`${strapiUrl}/api/galleries?populate=*&pagination[limit]=500`);
      
      if (!response.ok) {
        throw new Error(`API returned status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Data validation
      if (!data || !data.data || !Array.isArray(data.data)) {
        throw new Error("Invalid data structure returned from API");
      }

      // Filter for EEE department images
      let filteredImages = data.data.filter(item => 
        item.attributes?.Department?.toLowerCase() === "eee" || 
        item.Department?.toLowerCase() === "eee"
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

      setImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(error.message || "Failed to load gallery images");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  return (
      <div className="cs-dept-container bg-[#E6E6E6] text-gray-800 font-['Poppins',sans-serif] p-5 md:p-8">
        <style jsx global>{`
          .text-justify {
            text-align: justify;
          }
        `}</style>

        <header className="cs-dept-header py-6 mb-6 border-b-2 border-[#845714]">
          <h1 className="text-[#845714] text-3xl md:text-4xl lg:text-5xl font-bold mb-2">
            Department of Electrical and Electronics Engineering
          </h1>
          <p className="text-lg md:text-xl">
            Powering Progress • Igniting Innovation • Electrifying the Future
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
              src="/images/electrical-hero.jpg" 
              alt="Electrical and Electronics Engineering Students working in a laboratory"
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
              Powering Innovations for a Brighter Tomorrow
            </h2>
            <p className="text-lg">
              Join our vibrant community of electrical engineers and innovators
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
              <p className="text-justify">
                The department of Electrical and Electronics Engineering was established in 2004, as the sixth department 
                of this college with an annual intake of 60 students. The Degree offered was B.Tech in Electrical and 
                Electronics Engineering. An M.Tech programme in Electrical Machines was started in 2014 with an annual 
                intake of 24 students.
              </p>
              
              <p className="text-justify">
                The department is dedicated to the promotion of excellence in Engineering education imparting knowledge 
                to the students in the field of Electrical and Electronics Engineering so that they can successfully 
                complete their graduation and get proper placement. Our students stands in a better position in Kerala 
                Technological University and a good number of them occupy prestigious positions within the country and abroad.
              </p>

              <p className="text-justify">
                The laboratories are well equipped for the conduct of the existing courses. The facilities available in 
                the department are sufficient to meet the requirements of B.Tech and M.Tech project works. The department 
                has a well equipped computer center with internet access. In addition to the central library, there is a 
                department library and most of the books prescribed in the syllabus are also available there.
              </p>
            </div>
          </motion.div>
        </section>
        
        <section className="cs-dept-section py-8" aria-labelledby="department-highlights">
          <SectionTitle>Department Highlights</SectionTitle>
          <div className="cs-dept-highlights-content grid grid-cols-1 md:grid-cols-2 gap-6">
            <HighlightCard title="Faculty Excellence" items={highlights.faculty} />
            <HighlightCard title="Strong Industry Connections" items={highlights.industry} />
            <HighlightCard title="Infrastructure & Resources" items={highlights.infrastructure} />
            <HighlightCard title="Student Engagement" items={highlights.students} />
          </div>
        </section>
        
       <section className="container mx-auto px-4 py-10">
                       <h2 className="text-3xl font-bold text-amber-800 pb-3 border-b-2 text-yellow-900 mb-6">
                         Department Gallery
                       </h2>
               
                       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                         {/* Conditionally render images */}
                         {images.length > 0 ? (
                           images.map((imgSrc, index) => (
                             <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                               <Image
                                 src={imgSrc}
                                 alt={`CE Department Image ${index + 1}`}
                                 width={400}
                                 height={300}
                                 className="w-full h-48 object-cover"
                               />
                             </div>
                           ))
                         ) : (
                           <>
                             <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                               <Image
                                 src="/images/csimg2.jpg"
                                 alt="CS Department Building Front View"
                                 width={400}
                                 height={300}
                                 className="w-full h-48 object-cover"
                               />
                             </div>
                             <div className="rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all">
                               <Image
                                 src="/images/csimg1.jpg"
                                 alt="CS Department Seminar Hall"
                                 width={400}
                                 height={300}
                                 className="w-full h-48 object-cover"
                               />
                             </div>
                           </>
                         )}
                       </div>
                     </section>
      </div>
  );
}