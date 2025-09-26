"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FileText, Calendar, Users, Award, MapPin, Clock, Download } from 'lucide-react';

export default function NSS() {
  // State for API data
  const [nssData, setNssData] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch NSS data and gallery images on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch NSS data
        const nssResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/nss?populate[Report][populate]=file&populate=NSS_UNIT`);
        if (!nssResponse.ok) {
          throw new Error('Failed to fetch NSS data');
        }
        const nssResult = await nssResponse.json();
        
        // Fetch gallery images
        const galleryResponse = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/galleries?populate=*&pagination[limit]=100`);
        if (!galleryResponse.ok) {
          throw new Error('Failed to fetch gallery images');
        }
        const galleryResult = await galleryResponse.json();
        
        // Filter images where department = "NSS"
        const nssImages = galleryResult.data.filter(item => item.Department === "NSS");
        
        setNssData(nssResult.data);
        setGalleryImages(nssImages);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // NSS activities data (static)
  const activities = [
    {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Community Service",
      description: "Regular community service activities including cleaning drives, awareness campaigns, and assistance to underprivileged communities in surrounding areas."
    },
    {
      icon: <Award className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Special Camps",
      description: "Annual week-long special camps in adopted villages focusing on health awareness, environmental protection, and infrastructure development projects."
    },
    {
      icon: <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Blood Donation Drives",
      description: "Bi-annual blood donation camps organized in collaboration with local hospitals and health centers to address critical blood supply needs."
    },
    {
      icon: <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Disaster Management",
      description: "Training programs and rapid response initiatives for disaster management, including flood relief work and emergency assistance operations."
    }
  ];

  // Function to handle PDF viewing
  const handlePdfClick = (url) => {
    // Make sure to prepend the STRAPI URL if the URL is relative
    const fullUrl = url.startsWith('/') 
      ? `${process.env.NEXT_PUBLIC_STRAPI}${url}` 
      : url;
    window.open(fullUrl, '_blank');
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-800"></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
          <div className="text-center py-10">
            <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
            <p className="text-gray-700 text-sm sm:text-base">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-yellow-800 hover:bg-yellow-900 text-white px-4 py-2 rounded text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header section with title */}
          <div className="bg-gradient-to-r from-yellow-700 to-amber-500 p-4 sm:p-6 md:p-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              National Service Scheme (NSS)
            </h1>
            <div className="h-1 w-16 sm:w-20 bg-white opacity-70 mb-3 sm:mb-4"></div>
            <p className="text-white text-base sm:text-lg opacity-90">
              Not Me But You - Transforming lives through community service
            </p>
          </div>
          
          <div className="p-4 sm:p-6 md:p-10">
            {/* Main description */}
            <div className="mb-6 sm:mb-8 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                The National Service Scheme (NSS) unit at Sree Buddha College of Engineering, Pattoor is dedicated to 
                developing student personality through community service. Our volunteers actively engage in various 
                social service initiatives, environmental conservation projects, health awareness campaigns, and disaster 
                management efforts, fostering a sense of social responsibility and civic consciousness.
              </p>
            </div>
            
            {/* Activities grid */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Activities & Initiatives</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
              {activities.map((activity, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    <div className="mb-3 sm:mb-0 sm:mr-4 sm:mt-1 flex-shrink-0">{activity.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{activity.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{activity.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Benefits of Participating */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Benefits of NSS Participation</h2>
              <div className="bg-amber-50 rounded-lg p-4 sm:p-6 border-l-4 border-yellow-800">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-800 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">60 activity points for regular NSS volunteers as per KTU regulations</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-800 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Development of leadership skills and team management abilities</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-800 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Opportunities to participate in state and national-level NSS camps</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-800 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Priority in campus placements with recognition of social service experience</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-green-800 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Enhanced personality development and communication skills through community interaction</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Annual Reports - Fetched dynamically from API */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Annual Reports</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {nssData?.Report && nssData.Report.map((report, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-50 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 cursor-pointer"
                    onClick={() => report.file && report.file[0] && handlePdfClick(report.file[0].url)}
                  >
                    <div className="flex flex-col h-full">
                      <div className="mb-4">
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-800">{report.ReportHeading}</h3>
                        <div className="h-1 w-12 bg-yellow-800 my-2"></div>
                      </div>
                      <div className="flex-grow">
                        <ul className="text-gray-600 space-y-2 mb-4 sm:mb-6">
                          <li className="flex items-center text-xs sm:text-sm">
                            <div className="h-2 w-2 rounded-full bg-yellow-800 mr-2 flex-shrink-0"></div>
                            Annual NSS activities document
                          </li>
                          <li className="flex items-center text-xs sm:text-sm">
                            <div className="h-2 w-2 rounded-full bg-green-800 mr-2 flex-shrink-0"></div>
                            Published {new Date(report.file[0]?.publishedAt).toLocaleDateString()}
                          </li>
                          <li className="flex items-center text-xs sm:text-sm">
                            <div className="h-2 w-2 rounded-full bg-green-800 mr-2 flex-shrink-0"></div>
                            {(report.file[0]?.size / 1024).toFixed(2)} MB
                          </li>
                        </ul>
                      </div>
                      <div className="mt-auto">
                        <button className="flex items-center text-green-800 hover:text-yellow-900 font-medium text-sm sm:text-base">
                          <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          Download Report
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Executive Committee - Fetched dynamically from API */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">NSS Unit Team</h2>
              
              {/* Mobile-friendly card layout for small screens */}
              <div className="block sm:hidden">
                {nssData?.NSS_UNIT && nssData.NSS_UNIT
                  .sort((a, b) => a.priority - b.priority)
                  .map((member, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4 last:mb-0">
                      <div className="font-semibold text-yellow-800 text-sm mb-1">{member.Position}</div>
                      <div className="font-medium text-gray-900 text-base mb-1">
                        {member.Name.includes('.') ? member.Name.split('. ')[1] : member.Name}
                      </div>
                      <div className="text-gray-600 text-sm">{member.Department}</div>
                    </div>
                  ))}
              </div>

              {/* Table layout for larger screens */}
              <div className="hidden sm:block">
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-100 border-b">
                      <tr>
                        <th className="py-3 px-4 md:px-6 text-left text-sm font-semibold text-gray-700">Position</th>
                        <th className="py-3 px-4 md:px-6 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="py-3 px-4 md:px-6 text-left text-sm font-semibold text-gray-700">Department</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {nssData?.NSS_UNIT && nssData.NSS_UNIT
                        .sort((a, b) => a.priority - b.priority)
                        .map((member, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="py-3 px-4 md:px-6 text-sm text-gray-700">{member.Position}</td>
                            <td className="py-3 px-4 md:px-6 text-sm font-medium text-gray-900">
                              {member.Name.includes('.') ? member.Name.split('. ')[1] : member.Name}
                            </td>
                            <td className="py-3 px-4 md:px-6 text-sm text-gray-700">{member.Department}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Photo Gallery - Fetched dynamically from API */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Recent Activities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {galleryImages && galleryImages.length > 0 ? (
                  galleryImages.slice(0, 6).map((item, index) => (
                    item.images && item.images.length > 0 && (
                      <div key={index} className="rounded-lg overflow-hidden h-40 sm:h-48 relative group bg-gray-100">
                        <img 
                          src={`${process.env.NEXT_PUBLIC_STRAPI}${item.images[0].formats?.small?.url || item.images[0].formats?.thumbnail?.url || item.images[0].url}`} 
                          alt={`NSS Activity ${index + 1}`} 
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-2">
                          <span className="text-white font-medium text-center text-sm">
                            NSS Activity - {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    )
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-gray-600 text-sm sm:text-base">No recent activity images available.</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Contact section */}
            <div className="mt-8 sm:mt-10 text-center">
              <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">Contact NSS Unit</h3>
              <div className="text-gray-600 text-sm sm:text-base space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center sm:space-x-2">
                  <span>Email: <a href="mailto:sbcenss@sbcemail.in" className="text-yellow-800 hover:underline">sbcenss@sbcemail.in</a></span>
                  <span className="hidden sm:inline">|</span>
                  <span>Phone: <a href="tel:+9497377660" className="text-yellow-800 hover:underline">9497377660</a></span>
                </div>
                <div>Room: C Block, Room 303</div>
              </div>
              <div className="flex justify-center mt-4">
                <a href="https://www.instagram.com/nss.sbce/" className="text-yellow-800 hover:text-yellow-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}