'use client';
import React, { useState, useEffect } from "react";
import DownloadButton from "@/components/common/DownloadButton";
import { motion } from "framer-motion";
import Image from 'next/image';

export default function Page() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMeetingMinutes();
  }, []);

  const fetchMeetingMinutes = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/iqac-meeting-minutess?populate=*`);
      if (!response.ok) {
        throw new Error('Failed to fetch meeting minutes');
      }
      const data = await response.json();
      setMeetings(data.data || []);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching meeting minutes:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const features = [
    {
      icon: "📚",
      title: "Academic Excellence",
      description: "Ensuring timely, efficient, and progressive performance of academic tasks"
    },
    {
      icon: "🎓",
      title: "Quality Programs",
      description: "Maintaining relevance and quality of academic and research programs"
    },
    {
      icon: "🤝",
      title: "Inclusive Education",
      description: "Providing equitable access to academic programs for various sections of society"
    },
    {
      icon: "💡",
      title: "Modern Teaching",
      description: "Optimization and integration of modern teaching and learning methods"
    },
    {
      icon: "🛠️",
      title: "Support Services",
      description: "Ensuring adequacy and maintenance of support structure and services"
    },
    {
      icon: "🌐",
      title: "Research Network",
      description: "Research sharing and networking with institutions globally"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative bg-yellow-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
          <Image
            src="https://sbce.ac.in/assets/images/profile_pic.png"
            alt="College Campus"
            width={1920}
            height={1080}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 py-24 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Internal Quality Assurance Cell
            </h1>
            <p className="text-xl md:text-2xl text-yellow-100">
              Committed to Excellence in Higher Education
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md p-8 mb-12"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About IQAC</h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                In pursuance of action plan for performance evaluation, assessment, accreditation,
                and quality up-gradation of institutions of higher education, NAAC proposes that
                every accredited institution should establish an Internal Quality Assurance Cell (IQAC)
                as a post-accreditation quality sustenance measure. Since quality enhancement is a
                continuous process, the IQAC will become a part of the institution&apos;s system & work
                towards realization of the goals of quality enhancement & sustenance.
              </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-4">
                    <span className="text-2xl mr-3">{feature.icon}</span>
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* Meeting Minutes Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Meeting Minutes</h2>
              
              {loading ? (
                <div className="flex justify-center items-center py-12 bg-white rounded-lg">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-900"></div>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                  <p className="text-red-600">Error loading meeting minutes: {error}</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {meetings && meetings.length > 0 ? (
                    meetings.map((meeting, index) => (
                      <motion.div
                        key={meeting.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {meeting.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">
                              Date: {new Date(meeting.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                            {meeting.description && (
                              <p className="text-gray-600 text-sm">
                                {meeting.description}
                              </p>
                            )}
                          </div>
                          <DownloadButton
                            title="Download Minutes"
                            link={`${process.env.NEXT_PUBLIC_STRAPI}${meeting.file.url}`}
                            className="mt-4 md:mt-0 md:ml-4 inline-flex items-center px-4 py-2 bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition-colors whitespace-nowrap"
                          />
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-12 text-center">
                      <svg 
                        className="mx-auto h-12 w-12 text-gray-400 mb-4" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                        />
                      </svg>
                      <p className="text-gray-600">
                        No meeting minutes available at the moment.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}