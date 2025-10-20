"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function FacultyInnovations() {
  const [innovations, setInnovations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedInnovation, setSelectedInnovation] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI}/api/cse-depts?filters[Dept_name][$eq]=BioTech&populate[Innovations][populate]=file`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        
        // Check if we have department data and innovations in the response
        if (data.data && data.data.length > 0) {
          const department = data.data[0];
          
          if (department.Innovations && department.Innovations.length > 0) {
            // Map innovations to the format expected by the component
            const mappedInnovations = department.Innovations.map((innovation, index) => {
              // Get file details if available
              let fileUrl = null;
              let fileName = null;
              let fileSize = null;
              let fileType = null;
              
              if (innovation.file && innovation.file.length > 0) {
                const file = innovation.file[0];
                fileUrl = `${process.env.NEXT_PUBLIC_STRAPI}${file.url}`;
                fileName = file.name;
                fileSize = (file.size / 1024).toFixed(2); // Convert to KB
                fileType = file.ext?.replace('.', '').toUpperCase() || 'FILE';
              }
              
              return {
                id: innovation.id,
                title: innovation.title || "Innovation Project",
                description: `This document contains detailed information about innovative teaching and learning methods implemented by the faculty of Biotechnology and Biochemical Engineering Department.`,
                category: "Teaching Innovation",
                fileUrl: fileUrl,
                fileName: fileName,
                fileSize: fileSize,
                fileType: fileType,
                uploadedDate: innovation.file?.[0]?.createdAt || new Date().toISOString(),
                faculty: "Biotechnology and Biochemical Engineering Department"
              };
            });
            
            setInnovations(mappedInnovations);
          } else {
            setInnovations([]);
          }
        } else {
          setInnovations([]);
        }
      } catch (err) {
        console.error("Error fetching innovations data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Close modal when clicking outside
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedInnovation(null);
      }
    };
    
    if (selectedInnovation) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedInnovation]);

  // Get file icon based on type
  const getFileIcon = (fileType) => {
    switch(fileType?.toLowerCase()) {
      case 'pdf':
        return '📄';
      case 'docx':
      case 'doc':
        return '📝';
      case 'pptx':
      case 'ppt':
        return '📊';
      case 'xlsx':
      case 'xls':
        return '📈';
      default:
        return '📎';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="relative bg-gradient-to-b from-yellow-50 to-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-900/10 pattern-diagonal-lines pattern-yellow-500/20 pattern-bg-white pattern-size-4" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
              Department Of Biotechnology and Biochemical Engineering
            </h1>
            <div className="w-24 sm:w-32 md:w-40 h-1 bg-yellow-900 mx-auto mb-4 sm:mb-6 md:mb-8" aria-hidden="true" />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800">
              Innovations by Faculty in Teaching & Learning
            </h2>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Innovation Description */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="bg-yellow-50 rounded-lg p-4 sm:p-6 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 border-l-4 border-yellow-900 pl-2 sm:pl-3">
              Teaching & Learning Innovations
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              The Department of Biotechnology and Biochemical Engineering at Sree Buddha College of Engineering is committed to
              excellence in teaching and learning. Our faculty members continuously innovate and implement
              cutting-edge pedagogical methods to enhance the educational experience of our students.
            </p>
            <p className="text-sm sm:text-base text-gray-700">
              These innovations include modern teaching methodologies, technology integration, practical
              learning approaches, and assessment tools that prepare students for real-world challenges in
              biotechnology and biochemical engineering.
            </p>
          </div>
        </div>

        {/* Stats Cards
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-yellow-900">
            <div className="flex items-center">
              <span className="text-3xl mr-3">💡</span>
              <div>
                <p className="text-2xl font-bold text-gray-900">{innovations.length}</p>
                <p className="text-sm text-gray-600">Total Innovations</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-green-600">
            <div className="flex items-center">
              <span className="text-3xl mr-3">👥</span>
              <div>
                <p className="text-2xl font-bold text-gray-900">15+</p>
                <p className="text-sm text-gray-600">Faculty Involved</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-blue-600">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🎓</span>
              <div>
                <p className="text-2xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Students Benefited</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-purple-600">
            <div className="flex items-center">
              <span className="text-3xl mr-3">🏆</span>
              <div>
                <p className="text-2xl font-bold text-gray-900">2024</p>
                <p className="text-sm text-gray-600">Latest Update</p>
              </div>
            </div>
          </div>
        </div> */}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-900 border-t-transparent"></div>
            <p className="mt-4 text-gray-700">Loading innovations...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-medium text-red-800 mb-2">Error Loading Data</h3>
            <p className="text-red-600">{error}</p>
            <p className="mt-4 text-gray-600">Please try refreshing the page or contact support.</p>
          </div>
        )}

        {/* Innovations Grid */}
        {!loading && !error && innovations.length > 0 && (
          <>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 border-l-4 border-yellow-900 pl-3">
              Innovation Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {innovations.map((innovation) => (
                <div
                  key={innovation.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group"
                >
                  {/* Card Header with Icon */}
                  <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-5xl">
                        {getFileIcon(innovation.fileType)}
                      </span>
                      <span className="bg-yellow-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {innovation.fileType}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-yellow-900 transition-colors">
                      {innovation.title}
                    </h3>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                      {innovation.description}
                    </p>

                    {/* File Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span className="truncate">{innovation.fileName}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                        </svg>
                        <span>Size: {innovation.fileSize} KB</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 flex-shrink-0 text-yellow-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>{formatDate(innovation.uploadedDate)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => setSelectedInnovation(innovation)}
                        className="flex-1 px-4 py-2 bg-yellow-50 text-yellow-900 rounded-md hover:bg-yellow-100 transition-colors text-sm font-medium"
                      >
                        View Details
                      </button>
                      {innovation.fileUrl && (
                        <a
                          href={innovation.fileUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition-colors text-sm font-medium text-center"
                        >
                          Download
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Innovation Areas Section */}
            {/* <div className="mt-12 bg-gradient-to-r from-yellow-50 to-white rounded-lg p-8 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 border-l-4 border-yellow-900 pl-3">
                Key Innovation Areas
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🎯</div>
                  <h4 className="font-bold text-gray-900 mb-2">Outcome-Based Education</h4>
                  <p className="text-sm text-gray-600">
                    Implementation of OBE framework with clearly defined program outcomes and course outcomes.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">💻</div>
                  <h4 className="font-bold text-gray-900 mb-2">Digital Learning Tools</h4>
                  <p className="text-sm text-gray-600">
                    Integration of modern software and simulation tools for enhanced understanding of concepts.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🏗️</div>
                  <h4 className="font-bold text-gray-900 mb-2">Industry Integration</h4>
                  <p className="text-sm text-gray-600">
                    Collaboration with industry partners for real-world project exposure and internships.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🎮</div>
                  <h4 className="font-bold text-gray-900 mb-2">Gamified Learning</h4>
                  <p className="text-sm text-gray-600">
                    Use of gamification techniques to make learning more engaging and interactive.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">📊</div>
                  <h4 className="font-bold text-gray-900 mb-2">Continuous Assessment</h4>
                  <p className="text-sm text-gray-600">
                    Regular evaluation methods to track student progress and provide timely feedback.
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-3xl mb-3">🤝</div>
                  <h4 className="font-bold text-gray-900 mb-2">Peer Learning</h4>
                  <p className="text-sm text-gray-600">
                    Encouraging collaborative learning through group projects and peer mentoring programs.
                  </p>
                </div>
              </div>
            </div> */}
          </>
        )}

        {/* No Innovations Found */}
        {!loading && !error && innovations.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <svg className="w-16 h-16 text-yellow-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
            <h3 className="text-xl font-medium text-gray-700">No innovations found</h3>
            <p className="text-gray-500 mt-2">Innovation documents will appear here once uploaded.</p>
          </div>
        )}
      </main>

      {/* Innovation Details Modal */}
      {selectedInnovation && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedInnovation(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h2 className="text-2xl font-bold text-gray-900">Innovation Details</h2>
              <button
                onClick={() => setSelectedInnovation(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/* File Type Badge */}
              <div className="mb-6 text-center">
                <span className="text-6xl mb-4 inline-block">
                  {getFileIcon(selectedInnovation.fileType)}
                </span>
                <div className="mt-2">
                  <span className="inline-block px-4 py-2 bg-yellow-100 text-yellow-900 text-sm font-semibold rounded-full uppercase tracking-wide">
                    {selectedInnovation.fileType} Document
                  </span>
                </div>
              </div>

              {/* Innovation Title */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                {selectedInnovation.title}
              </h3>

              {/* Innovation Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* File Name */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-yellow-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">File Name</p>
                      <p className="text-sm text-gray-900 mt-1 break-words">{selectedInnovation.fileName}</p>
                    </div>
                  </div>
                </div>

                {/* File Size */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-yellow-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"></path>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">File Size</p>
                      <p className="text-sm text-gray-900 mt-1">{selectedInnovation.fileSize} KB</p>
                    </div>
                  </div>
                </div>

                {/* Upload Date */}
                {/* <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-yellow-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Uploaded On</p>
                      <p className="text-sm text-gray-900 mt-1">{formatDate(selectedInnovation.uploadedDate)}</p>
                    </div>
                  </div>
                </div> */}

                {/* Department */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-yellow-900 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">Department</p>
                      <p className="text-sm text-gray-900 mt-1">{selectedInnovation.faculty}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="bg-yellow-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-yellow-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  About This Innovation
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  {selectedInnovation.description}
                </p>
              </div>

              {/* Download Button */}
              {selectedInnovation.fileUrl && (
                <div className="flex justify-center">
                  <a
                    href={selectedInnovation.fileUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition-colors font-medium"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    Download Document
                  </a>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <button
                onClick={() => setSelectedInnovation(null)}
                className="w-full sm:w-auto px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}