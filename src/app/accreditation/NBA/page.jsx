"use client";

import React, { useState, useEffect } from "react";
import NAAC from "@/components/accreditation/NAAC/naac";
import "./page.css";

const Page = () => {
  const [nbaData, setNbaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDept, setExpandedDept] = useState(null);
  const [expandedHeadings, setExpandedHeadings] = useState({});

  useEffect(() => {
    const fetchNbaData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI}/api/nba?populate=NBA.file.FILES&pagination[limit]=500`
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();

        if (data?.data?.NBA) {
          setNbaData(data.data.NBA);
        } else {
          setNbaData([]);
        }
      } catch (err) {
        console.error("Error fetching NBA data:", err);
        setError("Failed to load NBA data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNbaData();
  }, []);

  const processedDepartments = nbaData
    .filter((dept) => dept.VISIBILITY === 1)
    .map((dept) => {
      // Group files by heading
      const groupedFiles = {};
      const sortedFiles = [...(dept.file || [])].sort(
        (a, b) => (a.priority || 999) - (b.priority || 999)
      );

      sortedFiles.forEach((file) => {
        if (!groupedFiles[file.Heading]) {
          groupedFiles[file.Heading] = {
            heading: file.Heading,
            files: [],
            priority: file.priority || 999,
          };
        }
        groupedFiles[file.Heading].files.push(file);
      });

      // Convert back to array and sort by priority
      const groupedFilesArray = Object.values(groupedFiles).sort(
        (a, b) => a.priority - b.priority
      );

      return {
        ...dept,
        groupedFiles: groupedFilesArray,
      };
    });

  const toggleDepartment = (id) => {
    setExpandedDept((prev) => (prev === id ? null : id));
  };

  const toggleHeading = (deptId, headingId) => {
    setExpandedHeadings((prev) => ({
      ...prev,
      [`${deptId}-${headingId}`]: !prev[`${deptId}-${headingId}`]
    }));
  };

  // Check for hash in URL to auto-expand specific section
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        const [deptId, headingId] = hash.substring(1).split('-heading-');
        if (deptId && headingId) {
          setExpandedDept(parseInt(deptId));
          setExpandedHeadings(prev => ({
            ...prev,
            [`${deptId}-${headingId}`]: true
          }));

          // Scroll to the heading after a small delay to ensure rendering
          setTimeout(() => {
            const element = document.getElementById(`heading-${deptId}-${headingId}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }, 100);
        }
      }
    }
  }, [nbaData]);

  const copyShareLink = (shareUrl, e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <title>NBA Accreditation SBCE</title>

      {/* Page Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 text-gray-800 relative inline-block">
          NBA Accreditation
          <div className="absolute bottom-[-8px] left-[10%] w-[80%] h-[5px] bg-[rgb(179,101,0)] rounded"></div>
        </h1>
      </div>

      {/* NBA Logo Section */}
      <div className="flex justify-center items-center mb-10">
        <div className="relative group overflow-hidden rounded-lg shadow-xl">
          <img
            className="max-w-full h-auto object-contain transition-transform duration-300 hover:scale-105 w-full sm:w-2/3 md:w-1/2 mx-auto"
            src="/assets/images/accreditation/NBA_RITS_2.png"
            alt="NBA Accreditation Logo"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-gray-50 p-6 rounded-lg mb-12 border-l-4 border-[rgb(179,101,0)] leading-relaxed text-gray-700 shadow-md">
        <p className="text-lg">
          The National Board of Accreditation (NBA), India was initially established by AICTE (All India Council of Technical Education) under section 10(u) of AICTE act, in the year 1994, for periodic evaluations of technical institutions & programs basis according to specified norms and standards as recommended by AICTE council. NBA in its present form came into existence as an autonomous body with effect from 7th January 2010, with the objective of Assurance of Quality and Relevance of Education, especially of the programs in professional disciplines. The purpose of the accreditation by NBA is to promote and recognize excellence in technical education in colleges and universities—at both the undergraduate and post graduate levels. Institutions, students, employers, and the public at large all benefit from the external verification of quality provided through the NBA accreditation process. They also benefit from the process of continuous quality improvement that is encouraged by the NBA&apos;s developmental approach to promote excellence in technical education.
        </p>
      </div>

      {/* Section Heading */}
      <h2 className="text-3xl font-bold mb-8 pl-4 border-l-4 border-[rgb(179,101,0)] text-gray-800">
        NBA 2025
      </h2>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[rgb(179,101,0)]"></div>
          <p className="ml-3 text-lg text-gray-600">Loading NBA accreditation data...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded mb-8">
          <p>{error}</p>
        </div>
      ) : processedDepartments.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No NBA accreditation information available at the moment.</p>
      ) : (
        <div className="space-y-6">
          {processedDepartments.map((dept) => (
            <div
              key={dept.id}
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 transition-all duration-300 hover:shadow-lg"
            >
              {/* Department Header */}
              <div
                className={`px-6 py-4 cursor-pointer flex justify-between items-center transition-colors duration-200 border-l-6 ${expandedDept === dept.id
                    ? "bg-blue-50 border-l-6 border-[rgb(179,101,0)]"
                    : "bg-gray-50 border-l-6 border-[rgb(179,101,0)]"
                  }`}
                onClick={() => toggleDepartment(dept.id)}
              >
                <h3 className="text-xl font-semibold text-gray-800">{dept.DEPT_NAME}</h3>
                <span className="text-2xl text-blue-600 font-bold">
                  {expandedDept === dept.id ? "−" : "+"}
                </span>
              </div>

              {/* Department Content */}
              {expandedDept === dept.id && (
                <div className="p-4">
                  {dept.groupedFiles.length > 0 ? (
                    dept.groupedFiles.map((group, groupIndex) => {
                      const headingId = `${dept.id}-${groupIndex}`;
                      const isHeadingExpanded = expandedHeadings[headingId];
                      const shareUrl = `${typeof window !== 'undefined' ? window.location.origin + window.location.pathname : ''}#${dept.id}-heading-${groupIndex}`;

                      return (
                        <div key={groupIndex} className="mb-4">
                          {/* Group Heading */}
                          <div
                            id={`heading-${dept.id}-${groupIndex}`}
                            className={`flex justify-between items-center p-3 rounded-md cursor-pointer mb-1 border-l-4 transition-all duration-200 ${isHeadingExpanded
                                ? "bg-blue-50 border-[rgb(179,101,0)]"
                                : "bg-gray-50 border-[rgb(179,101,0)]"
                              }`}
                          >
                            <div
                              className="flex justify-between items-center w-full"
                              onClick={() => toggleHeading(dept.id, groupIndex)}
                            >
                              <span className="font-medium text-gray-700">{group.heading}</span>
                              <span className={`text-xl text-blue-600 transition-transform duration-200 ${isHeadingExpanded ? 'transform rotate-180' : ''}`}>
                                {isHeadingExpanded ? "−" : "+"}
                              </span>
                            </div>
                            <button
                              className="ml-2 p-1.5 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
                              onClick={(e) => copyShareLink(shareUrl, e)}
                              aria-label="Copy link to section"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                            </button>
                          </div>

                          {/* Files Container */}
                          {isHeadingExpanded && (
                            <div className="ml-6 pl-4 border-l-2 border-gray-200 py-2">
                              {group.files.map((file) => (
                                <div key={file.id} className="py-1">
                                  {file.FILES?.length > 0 ? (
                                    <ul className="space-y-2">
                                      {file.FILES.map((doc) => (
                                        <li key={doc.id} className="transition-all duration-200 hover:translate-x-1">
                                          <a
                                            href={`https://sbce.ac.in${doc.url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center p-2 bg-gray-50 hover:bg-blue-50 rounded-md text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                          >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[rgb(179,101,0)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            <span className="break-words">{doc.name || "Download File"}</span>
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  ) : null}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="py-4 px-2 text-gray-500 italic">
                      No documents available for this department.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* POAP User Manual Section */}
      <div className="mt-12">
        <NAAC
          name="POAP USER MANUAL"
          link="/assets/documents/accreditation/NBA/SBCE-POAP-User-Manual-Version-2.1.pdf"
        />
      </div>
    </div>
  );
};

export default Page;