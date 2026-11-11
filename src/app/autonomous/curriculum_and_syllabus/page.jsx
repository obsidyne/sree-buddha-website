'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// DownloadButton Component
const DownloadButton = ({ title, link, className }) => {
  return (
    <a
      href={link}
      download
      className={className}
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      {title}
    </a>
  );
};

export default function Page() {
  const [selectedYear, setSelectedYear] = useState('1st');
  const [searchQuery, setSearchQuery] = useState('');

  const firstYearGroups = [
    {
      id: "group-a",
      path: "/syllabus/1st_year/A-3-133-2-131_merged.pdf",
      title: "Group A",
      icon: "📘",
      description: "First year engineering curriculum for Group A students.",
      groupLabel: "A"
    },
    {
      id: "group-b",
      path: "/syllabus/1st_year/B-3-183-2-181_merged.pdf",
      title: "Group B",
      icon: "📗",
      description: "First year engineering curriculum for Group B students.",
      groupLabel: "B"
    },
    {
      id: "group-c",
      path: "/syllabus/1st_year/C-3-209-2-207_merged.pdf",
      title: "Group C",
      icon: "📙",
      description: "First year engineering curriculum for Group C students.",
      groupLabel: "C"
    },
    {
      id: "group-d",
      path: "/syllabus/1st_year/D-3-150-2-148_merged.pdf",
      title: "Group D",
      icon: "📕",
      description: "First year engineering curriculum for Group D students.",
      groupLabel: "D"
    }
  ];

  const secondYearDepartments = [
    {
      id: "ce",
      path: "/syllabus/2nd_year/CE.pdf",
      title: "Civil Engineering",
      icon: "🏗️",
      description: "Design and construction of infrastructure and built environment."
    },
    {
      id: "cse-aiml",
      path: "/syllabus/2nd_year/CSE AIML.pdf",
      title: "Computer Science (AI & ML)",
      icon: "🤖",
      description: "Advanced computing with focus on AI and machine learning."
    },
    {
      id: "ece",
      path: "/syllabus/2nd_year/ECE.pdf",
      title: "Electronics & Communication Engineering",
      icon: "📡",
      description: "Study of electronic communication systems and networks."
    },
    {
      id: "er",
      path: "/syllabus/2nd_year/ER.pdf",
      title: "Electronics and Computer Engineering",
      icon: "🔌",
      description: "Integration of electronics with computer systems."
    },
    {
      id: "eee",
      path: "/syllabus/2nd_year/EEE.pdf",
      title: "Electrical and Electronics Engineering",
      icon: "⚡",
      description: "Study of electrical systems and electronic devices."
    },
    {
      id: "ft",
      path: "/syllabus/2nd_year/FT.pdf",
      title: "Food Technology",
      icon: "🍲",
      description: "Study of food processing and preservation technologies."
    },
    {
      id: "me",
      path: "/syllabus/2nd_year/ME.pdf",
      title: "Mechanical Engineering",
      icon: "⚙️",
      description: "Study of mechanical systems and manufacturing."
    }
  ];

  const curriculum2024Departments = [
    {
      id: "cse",
      path: "/syllabus/2024_curriculum/CSE.pdf",
      title: "Computer Science & Engineering",
      code: "CSE",
      icon: "💻",
      description: "Updated 2024 curriculum for Computer Science & Engineering.",
      keywords: ["cse", "computer science", "computer science and engineering"]
    },
    {
      id: "cse-aiml",
      path: "/syllabus/2024_curriculum/CSE_AIML.pdf",
      title: "CSE (AI & ML)",
      code: "CSE (AI&ML)",
      icon: "🤖",
      description: "Updated 2024 curriculum for Computer Science (AI & Machine Learning).",
      keywords: ["cse ai", "cse ml", "ai", "ml", "artificial intelligence", "machine learning", "aiml"]
    },
    {
      id: "ce",
      path: "/syllabus/2024_curriculum/CE.pdf",
      title: "Civil Engineering",
      code: "CE",
      icon: "🏗️",
      description: "Updated 2024 curriculum for Civil Engineering.",
      keywords: ["ce", "civil", "civil engineering"]
    },
    {
      id: "eee",
      path: "/syllabus/2024_curriculum/EEE.pdf",
      title: "Electrical & Electronics Engineering",
      code: "EEE",
      icon: "⚡",
      description: "Updated 2024 curriculum for Electrical & Electronics Engineering.",
      keywords: ["eee", "electrical", "electronics", "electrical and electronics"]
    },
    {
      id: "ec-er",
      path: "/syllabus/2024_curriculum/EC_and_ER.pdf",
      title: "EC and ER",
      code: "EC and ER",
      icon: "📡",
      description: "Updated 2024 curriculum for EC and ER.",
      keywords: ["ec", "er", "ec and er"]
    },
    {
      id: "bt-bce",
      path: "/syllabus/2024_curriculum/BT_BCE.pdf",
      title: "Biotechnology & Biochemical Engineering",
      code: "BT&BCE",
      icon: "🧬",
      description: "Updated 2024 curriculum for Biotechnology & Biochemical Engineering.",
      keywords: ["bt", "bce", "biotechnology", "biochemical", "bt bce", "bt&bce"]
    },
    {
      id: "ece",
      path: "/syllabus/2024_curriculum/ECE.pdf",
      title: "Electronics & Communication Engineering",
      code: "ECE",
      icon: "📡",
      description: "Updated 2024 curriculum for Electronics & Communication Engineering.",
      keywords: ["ece", "electronics", "communication", "electronics and communication"]
    },
    {
      id: "me",
      path: "/syllabus/2024_curriculum/ME.pdf",
      title: "Mechanical Engineering",
      code: "ME",
      icon: "⚙️",
      description: "Updated 2024 curriculum for Mechanical Engineering.",
      keywords: ["me", "mechanical", "mechanical engineering"]
    },
    {
      id: "ft",
      path: "/syllabus/2024_curriculum/FT.pdf",
      title: "Food Technology",
      code: "FT",
      icon: "🍲",
      description: "Updated 2024 curriculum for Food Technology.",
      keywords: ["ft", "food technology", "food"]
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const currentDocuments =
    selectedYear === '1st'
      ? firstYearGroups
      : selectedYear === '2nd'
      ? secondYearDepartments
      : curriculum2024Departments;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredDocuments = normalizedQuery
    ? currentDocuments.filter((document) => {
        const haystack = [
          document.title,
          document.code,
          document.groupLabel,
          ...(document.keywords || [])
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
        return haystack.includes(normalizedQuery);
      })
    : currentDocuments;

  const topMatch = normalizedQuery && filteredDocuments.length > 0 ? filteredDocuments[0] : null;

  const openDocument = (path) => {
    window.open(path, '_blank', 'noopener,noreferrer');
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === 'Enter' && topMatch) {
      openDocument(topMatch.path);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Hero Section */}
      <section className="relative bg-yellow-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10"></div>
          <img
            src="https://sbce.ac.in/assets/images/profile_pic.png"
            alt="College Campus"
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
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Course Syllabus</h1>
            <p className="text-xl md:text-2xl text-yellow-100">
              Comprehensive curriculum details for all engineering programs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Year Selector Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
              <button
                onClick={() => { setSelectedYear('1st'); setSearchQuery(''); }}
                className={`px-8 py-3 rounded-md font-semibold text-base transition-all duration-300 ${
                  selectedYear === '1st'
                    ? 'bg-yellow-900 text-white shadow-md'
                    : 'bg-transparent text-gray-700 hover:text-yellow-900'
                }`}
              >
                1st Year
              </button>
              <button
                onClick={() => { setSelectedYear('2nd'); setSearchQuery(''); }}
                className={`px-8 py-3 rounded-md font-semibold text-base transition-all duration-300 ${
                  selectedYear === '2nd'
                    ? 'bg-yellow-900 text-white shadow-md'
                    : 'bg-transparent text-gray-700 hover:text-yellow-900'
                }`}
              >
                2nd Year
              </button>
              <button
                onClick={() => setSelectedYear('2024')}
                className={`px-8 py-3 rounded-md font-semibold text-base transition-all duration-300 ${
                  selectedYear === '2024'
                    ? 'bg-yellow-900 text-white shadow-md'
                    : 'bg-transparent text-gray-700 hover:text-yellow-900'
                }`}
              >
                Curriculum 2024
              </button>
            </div>
          </div>

          {selectedYear === '2024' && (
            <div className="max-w-xl mx-auto mt-6">
              <label htmlFor="dept-search" className="sr-only">
                Search department
              </label>
              <div className="relative">
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1 0 6.3 6.3a7.5 7.5 0 0 0 10.35 10.35z"
                  />
                </svg>
                <input
                  id="dept-search"
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search your department (e.g. CSE, Civil, EEE)..."
                  className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-900 text-sm"
                  autoComplete="off"
                />
              </div>
              {normalizedQuery && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  {topMatch
                    ? <>Press <kbd className="px-1.5 py-0.5 bg-gray-100 border rounded text-xs">Enter</kbd> to open <span className="font-semibold">{topMatch.title}</span></>
                    : 'No matching department found. Try a different department name or code.'}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Syllabus Cards Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <motion.div
            key={selectedYear}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {selectedYear === '1st' && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">First Year Groups</h2>
                <p className="text-gray-600">Select and download your group's syllabus</p>
              </div>
            )}
            {selectedYear === '2nd' && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Second Year Departments</h2>
                <p className="text-gray-600">Select and download your department's syllabus</p>
              </div>
            )}
            {selectedYear === '2024' && (
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Curriculum 2024 — Department Wise</h2>
                <p className="text-gray-600">Search or select your department to view the updated 2024 curriculum</p>
              </div>
            )}

            {filteredDocuments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No departments match your search.
              </div>
            ) : (
              <div className={`grid grid-cols-1 md:grid-cols-2 ${selectedYear === '1st' ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-6`}>
                {filteredDocuments.map((document, index) => (
                  <motion.div
                    key={document.id}
                    initial="hidden"
                    animate="visible"
                    variants={cardVariants}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:translate-y-[-5px] transition-all duration-300 ${
                      topMatch && document.id === topMatch.id ? 'ring-2 ring-yellow-900' : ''
                    }`}
                  >
                    <div className="px-6 py-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 flex items-center">
                          <span className="mr-2 text-2xl">{document.icon}</span>
                          <span className="text-base">{document.title}</span>
                        </h3>
                        {document.groupLabel && (
                          <span className="bg-yellow-100 text-yellow-900 text-lg font-bold px-3 py-1 rounded-full">
                            {document.groupLabel}
                          </span>
                        )}
                        {document.code && (
                          <span className="bg-yellow-100 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
                            {document.code}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-6 text-sm">{document.description}</p>
                      <div className="mt-4">
                        <DownloadButton
                          title={selectedYear === '2024' ? 'Download Curriculum' : 'Download Syllabus'}
                          link={document.path}
                          className="w-full px-6 py-3 bg-yellow-900 text-white font-medium rounded-md hover:bg-yellow-800 transition-colors flex items-center justify-center text-sm"
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 md:p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Important Information</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-yellow-900">📚</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Syllabus Updates</h4>
                    <p className="text-gray-700">
                      The syllabus is regularly updated to meet industry standards and academic requirements.
                      Always ensure you are referring to the latest version.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-yellow-900">📝</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">Course Structure</h4>
                    <p className="text-gray-700">
                      Each syllabus contains detailed information about course objectives, 
                      learning outcomes, and evaluation criteria.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="text-yellow-900">👥</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">First Year Groups</h4>
                    <p className="text-gray-700">
                      First year students are divided into groups A, B, C, and D. 
                      Please download the syllabus for your assigned group.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}