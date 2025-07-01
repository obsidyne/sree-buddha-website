"use client"

import React from 'react'
import Image from 'next/image';
import { useEffect, useState } from "react";
import './style.css'

export default function ComputerScienceDepartment() {
   
const [images, setImages] = useState([]);

useEffect(() => {
  async function fetchImages() {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/galleries?populate=*&pagination[limit]=500`);
      const data = await response.json();

      console.log("API Response:", data); // Debugging output

      // ✅ Ensure Department data exists and filter correctly
      let filteredImages = data.data.filter(item => 
        item.Department?.toLowerCase() === "ece" 
      );

      // ✅ Sort images by date (newest first)
      filteredImages.sort((a, b) => new Date(b.date) - new Date(a.date));

      // ✅ Extract small image URLs
      let imageUrls = filteredImages.flatMap(item =>
        item.images.map(img => {
          let smallImageUrl = img.formats?.small?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI}${img.formats.small.url}`
            : `${process.env.NEXT_PUBLIC_STRAPI}${img.url}`; // Fallback if small version doesn't exist
          return smallImageUrl;
        })
      );

      setImages(imageUrls); // Update state
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  }

  fetchImages();
}, []);

    
    return (
      <div className="cs-dept-container">
        <header className="cs-dept-header">
          <h1>Department of Electronics and Communication Engineering</h1>
          <p>Innovation • Connectivity • Technology</p>
        </header>
        
        <div className="cs-dept-hero">
          <div className="cs-dept-hero-image">
            <Image 
              src="/images/ece-hero2.png"
              alt="Electronics and Communication Students Working Together"
              width={1200}
              height={400}
              priority
            />
          </div>
          <div className="cs-dept-hero-text">
            <h2>Pioneering Communication Technologies</h2>
            <p>Join our innovative community of electronics engineers and innovators</p>
          </div>
        </div>
        
        <section className="cs-dept-section">
          <h2 className="cs-dept-section-title">Department Profile</h2>
          <div className="cs-dept-profile-content">
            <div className="cs-dept-profile-text">
              <p className="text-justify">
              Sree Buddha College of Engineering is one of the pioneers in introducing the Bachelor Program for Electronics and Communication Engineering in Kerala. The department of Electronics & Communication Engineering (ECE), started in the year 2002, has carved a niche for itself by offering the most competent instructional programme to the students. At present the sanctioned intake is 60 with a provision of admitting six diploma holders in the third semester under lateral entry scheme. The department also offers M Tech programme in Embedded Systems from the year 2010 onwards. The sanctioned intake is 6.
              </p>
                
              <p className="text-justify">
              The Department of Electronics and Communication Engineering (ECE) at Sree Buddha College of Engineering is dedicated to academic excellence, innovation, and technological advancement. With a team of expert faculty, fully equipped laboratories and Industry collaboration we equip students with the skills and knowledge needed to bridge the gap between the Institute and Industry. The strong partnership with industries and regular hands-on workshops, imparts a strong culture of innovation in design and development of socially relevant and sustainable hardware projects. The research and innovation ecosystem in the department exposes our students into the ever-evolving world of telecommunications, semiconductor technology, IoT, AI-driven automation, robotics, and embedded systems
              </p>
            </div>
          </div>
        </section>
        
        <section className="cs-dept-section">
          <h2 className="cs-dept-section-title">Department Highlights</h2>
          <div className="cs-dept-highlights-content">
            <div className="highlights-card">
              <h3 className="highlight-category">Academic Excellence & Research</h3>
              <ul>
                <li>Strong faculty expertise in core electronics and communication domains</li>
                <li>Cutting-edge research in emerging technologies like 5G, IoT, Embedded Systems, and Wireless Communications</li>
              </ul>
            </div>
              
            <div className="highlights-card">
              <h3 className="highlight-category">Industry Exposure and Research Collaborations</h3>
              <ul>
                <li>Students gain industry insights through seminars, workshops, and internships at leading telecommunications companies, semiconductor firms, and research institutions like ISRO, CDAC, and DRDO</li>
                <li>Strategic partnerships with industries like Qualcomm, Cisco, Nokia, and local tech startups to enhance research and innovation opportunities</li>
              </ul>
            </div>
              
            <div className="highlights-card">
              <h3 className="highlight-category">State-of-the-Art Infrastructure</h3>
              <ul>
                <li>Advanced laboratories for RF Design, Wireless Communications, and Embedded Systems</li>
                <li>High-end communication and signal processing equipment</li>
                <li>Access to industry-standard simulation and design tools like MATLAB, Simulink, and Cadence</li>
              </ul>
            </div>
              
            <div className="highlights-card">
              <h3 className="highlight-category">Skill Development & Student Success</h3>
              <ul>
                <li>Focus on hands-on learning, circuit design competitions, and robotics challenges</li>
                <li>Specialization tracks in IoT, Embedded Systems, Signal Processing, and Communication Technologies</li>
                <li>Strong placement records with top telecommunications, electronics, and semiconductor companies</li>
              </ul>
            </div>
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
               
        <style jsx>{`
          .text-justify {
            text-align: justify;
          }
          
          .cs-dept-container {
            background-color: #E6E6E6;
            color: #333;
            line-height: 1.6;
            font-family: 'Poppins', sans-serif;
            padding: 20px;
            max-width: 100%;
          }
          
          .cs-dept-header {
            padding: 20px 0;
            margin-bottom: 20px;
            border-bottom: 3px solid #845714;
          }
          
          .cs-dept-header h1 {
            color: #845714;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 5px;
          }
          
          .cs-dept-header p {
            font-size: 1.2rem;
          }
          
          .cs-dept-hero {
            height: 400px;
            background-color: #333;
            position: relative;
            overflow: hidden;
            margin: 30px 0;
            border-radius: 10px;
          }
          
          .cs-dept-hero-image {
            width: 100%;
            height: 100%;
          }
          
          .cs-dept-hero-image img {
            object-fit: cover;
            width: 100%;
            height: 100%;
          }
          
          .cs-dept-hero-text {
            position: absolute;
            bottom: 0;
            left: 0;
            padding: 30px;
            background: rgba(0, 0, 0, 0.7);
            color: white;
            width: 100%;
          }
          
          .cs-dept-hero-text h2 {
            font-size: 2rem;
            margin-bottom: 10px;
          }
          
          .cs-dept-section {
            padding: 30px 0;
          }
          
          .cs-dept-section-title {
            color: #845714;
            font-size: 2rem;
            padding-bottom: 10px;
            border-bottom: 2px solid #845714;
            margin-bottom: 20px;
          }
          
          .cs-dept-profile-content {
            display: block;
            width: 100%;
          }
          
          .cs-dept-profile-text {
            font-size: 1.1rem;
          }
          
          .cs-dept-highlights-content {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          
          .highlights-card {
            background-color: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }
          
          .highlights-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.15);
          }
          
          .highlight-category {
            color: #845714;
            font-size: 1.3rem;
            font-weight: 600;
            margin-bottom: 15px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e0e0e0;
          }
          
          .highlights-card ul {
            list-style: none;
            padding-left: 0;
          }
          
          .highlights-card li {
            padding: 8px 0;
            position: relative;
            padding-left: 20px;
          }
          
          .highlights-card li:before {
            content: '';
            position: absolute;
            left: 0;
            top: 16px;
            width: 8px;
            height: 8px;
            background-color: #845714;
            border-radius: 50%;
          }
          
          .cs-dept-gallery {
            padding: 30px 0;
          }
          
          .cs-dept-gallery-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
          
          .cs-dept-gallery-item {
            border-radius: 10px;
            overflow: hidden;
            height: 200px;
            transition: transform 0.3s ease;
          }
          
          .cs-dept-gallery-item:hover {
            transform: scale(1.03);
          }
          
          .cs-dept-gallery-item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
          
          @media (max-width: 1024px) {
            .cs-dept-highlights-content {
              grid-template-columns: 1fr 1fr;
            }
          }
          
          @media (max-width: 768px) {
            .cs-dept-highlights-content {
              grid-template-columns: 1fr;
            }
            
            .cs-dept-gallery-grid {
              grid-template-columns: 1fr 1fr;
            }
          }
          
          @media (max-width: 480px) {
            .cs-dept-gallery-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>
      </div>
    );
  }