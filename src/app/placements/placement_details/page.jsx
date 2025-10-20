"use client"

import React, { useState, useEffect } from 'react';

export default function PlacementDetails() {
  const [placementFiles, setPlacementFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlacementFiles();
  }, []);

  const fetchPlacementFiles = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/placement-detailss?populate=*`);
      const data = await response.json();
      setPlacementFiles(data.data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching placement files:', error);
      setLoading(false);
    }
  };

  const handleDownload = (fileUrl, fileName) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-800 to-amber-600 p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Placement Details</h1>
            <div className="h-1 w-20 bg-white opacity-80 my-4"></div>
            <p className="text-white text-lg opacity-90">
              Launching careers with industry-leading companies
            </p>
          </div>

          {/* Main content */}
          <div className="p-6 md:p-8">
            {/* Introduction */}
            <div className="mb-10 text-gray-700 text-lg leading-relaxed">
              <p>
                Our college takes pride in its robust placement cell that consistently delivers excellent career opportunities 
                to students. With dedicated training programs, industry partnerships, and personalized career guidance, 
                we ensure our graduates are well-prepared for professional success. Our placement statistics reflect our 
                commitment to student careers and industry relevance.
              </p>
            </div>

            {/* Placement cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {/* Campus Recruitment */}
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src="/images/college-main.jpg"
                    alt="Sree Buddha College Main Building"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 bg-amber-800 text-white px-4 py-2 rounded-br-lg">
                    Campus Recruitment
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">On-Campus Drives</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-amber-600 mr-2"></div>
                      <span>Over 150+ companies visit annually</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-amber-600 mr-2"></div>
                      <span>Year-round recruitment calendar</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-amber-600 mr-2"></div>
                      <span>State-of-the-art interview facilities</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Recruiting Companies */}
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md transition-transform hover:shadow-lg">
                <div className="relative h-64 overflow-hidden bg-white p-4">
                  <div className="grid grid-cols-4 gap-4 h-full">
                    <img src="/images/logos/tcs.jpg" alt="TCS" className="w-full h-12 object-contain" />
                    <img src="/images/logos/info.jpg" alt="Infosys" className="w-full h-12 object-contain" />
                    <img src="/images/logos/UST.jpg" alt="UST" className="w-full h-12 object-contain" />
                    <img src="/images/logos/Accenture.jpg" alt="Accenture" className="w-full h-12 object-contain" />
                    
                    <img src="/images/logos/ibs.jpg" alt="IBS" className="w-full h-12 object-contain" />
                    <img src="/images/logos/Infosis.jpg" alt="Infosys" className="w-full h-12 object-contain" />
                    <img src="/images/logos/MRF.jpg" alt="MRF" className="w-full h-12 object-contain" />
                    <img src="/images/logos/Omnex.jpg" alt="Omnex" className="w-full h-12 object-contain" />
                    
                    <img src="/images/logos/sap.jpg" alt="SAP" className="w-full h-12 object-contain" />
                    <img src="/images/logos/SLK.jpg" alt="SLK" className="w-full h-12 object-contain" />
                    <img src="/images/logos/Speridian.jpg" alt="Speridian" className="w-full h-12 object-contain" />
                    <img src="/images/logos/sutherland.jpg" alt="Sutherland" className="w-full h-12 object-contain" />
                  </div>
                  <div className="absolute top-0 left-0 bg-amber-600 text-white px-4 py-2 rounded-br-lg">
                    Our Recruiters
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Industry Partners</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
                      <span>Top-tier tech and finance companies</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
                      <span>Strong alumni network in industry</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-indigo-600 mr-2"></div>
                      <span>Diverse sectors from IT to consulting</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Placement process section */}
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-700">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Placement Process</h2>
              <p className="text-gray-700 mb-4">
                Our structured placement process ensures students are well-prepared for their career journey. 
                From pre-placement training to final job offers, the placement cell provides comprehensive support at every step.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Pre-Placement Preparation</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Resume building workshops</li>
                    <li>Mock interviews and group discussions</li>
                    <li>Aptitude test preparation</li>
                    <li>Soft skills development</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800 mb-2">Selection Stages</h3>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Pre-placement talks by companies</li>
                    <li>Aptitude tests and technical assessments</li>
                    <li>Technical and HR interviews</li>
                    <li>Final job offers and documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Career statistics section */}
          <div className="p-6 md:p-8 bg-gray-50 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">2024 Placement Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="inline-flex p-3 rounded-full bg-amber-100 mb-3">
                  <span className="text-xl">🎓</span>
                </div>
                <h3 className="text-4xl font-bold text-amber-800">820+</h3>
                <p className="text-gray-600">Students Placed</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="inline-flex p-3 rounded-full bg-amber-100 mb-3">
                  <span className="text-xl">🏢</span>
                </div>
                <h3 className="text-4xl font-bold text-amber-800">150+</h3>
                <p className="text-gray-600">Recruiting Companies</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="inline-flex p-3 rounded-full bg-amber-100 mb-3">
                  <span className="text-xl">🏆</span>
                </div>
                <h3 className="text-4xl font-bold text-amber-800">28 LPA</h3>
                <p className="text-gray-600">Highest Package</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <div className="inline-flex p-3 rounded-full bg-amber-100 mb-3">
                  <span className="text-xl">🤝</span>
                </div>
                <h3 className="text-4xl font-bold text-amber-800">95%</h3>
                <p className="text-gray-600">Placement Rate</p>
              </div>
            </div>
          </div>

          {/* Downloadable Placement Files Section */}
          <div className="p-6 md:p-8 border-t border-gray-200">
            <div className="flex items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Download Placement Details</h2>
              <div className="ml-3 text-amber-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Access detailed placement reports from previous academic years. Download comprehensive data including company names, 
              packages offered, and student placements.
            </p>

            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {placementFiles.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                            <path d="M3 8a2 2 0 012-2v10h8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-800 mb-1">
                            {item.title}
                          </h3>
                          <p className="text-xs text-gray-500 mb-2">
                            {item.file.name}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-400">
                            <span>{(item.file.size).toFixed(2)} KB</span>
                            <span>•</span>
                            <span>XLSX</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() =>{ 
                        
                        console.log(item.file.url)
                        handleDownload(`${process.env.NEXT_PUBLIC_STRAPI}${item.file.url}`, item.file.name)}
                      
                      }
                      className="mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      <span>Download</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {!loading && placementFiles.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-2 text-gray-500">No placement files available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}