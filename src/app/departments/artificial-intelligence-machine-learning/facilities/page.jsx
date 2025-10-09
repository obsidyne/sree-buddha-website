"use client";

import React, { useState } from 'react';
import { Poppins } from 'next/font/google';
import "../../department_style.css";


// Initialize Poppins font
const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function ComputerScienceDepartmentFacilities() {
  const [activeTab, setActiveTab] = useState('overview');

  // Facilities data organized by section for maintainability
  const facilities = {
    major: [
      "300 Mbps Leased-line Internet Connectivity",
      "MICROSOFT CAMPUS AGREEMENT – latest software made available.",
      "The department is having the following labs with LAN, loaded with Opensource Zorin OS.",
      "Labs are connected via Domain (sbce.lan) to facilitate individual students login",
      "Licensed versions of the latest tools for developing the front end and back end are available."
    ],
    labs: [
      {
        name: "Operating Systems and Network Programming Lab",
        description: "This lab provides hands-on experience with various operating systems and network programming concepts.",
        image: "/assets/images/departments/facilities/cs/os_lab.jpg"
      },
      {
        name: "Database Design Lab",
        description: "Students learn database design principles and work with various database management systems.",
        image: "/assets/images/departments/facilities/cs/db_lab.jpg"
      },
      {
        name: "Language Lab / Technology Enhanced Learning Lab",
        description: "A specialized lab for programming language learning and technology-enhanced education.",
        image: "/assets/images/departments/facilities/cs/language_lab.jpg"
      },
      {
        name: "Common Computing Lab",
        description: "A general-purpose computing lab accessible to all AI ML students.",
        image: "/assets/images/departments/facilities/cs/computing_lab.jpg"
      },
      {
        name: "FOSS LAB (Free and Opensource Software LAB)",
        description: "Dedicated to open source software development and learning using various FOSS tools.",
        image: "/assets/images/departments/facilities/cs/foss_lab.jpg"
      }
    ],
    other: [
      {
        name: "Well equipped seminar Hall",
        description: "Modern seminar hall with audio-visual facilities for presentations and guest lectures.",
        image: "/assets/images/departments/facilities/cs/seminar_hall.jpg"
      },
      {
        name: "Skill Development Platform of Kerala (SDPK)",
        description: "A dedicated center for enhancing technical and professional skills of students.",
        image: "/assets/images/departments/facilities/cs/sdpk.jpg"
      },
      {
        name: "Aakash Tablet Centre",
        description: "A facility providing access to Aakash tablets for educational purposes.",
        image: "/assets/images/departments/facilities/cs/aakash.jpg"
      },
      {
        name: "Nodal Centre of Spoken Tutorial Project",
        description: "A center that provides spoken tutorials on various topics to enhance learning.",
        image: "/assets/images/departments/facilities/cs/spoken_tutorial.jpg"
      }
    ]
  };

  return (
    <div className={`cs-department-facilities ${poppins.className}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-900 mb-2">
            Department of Computer Science ( Artificial Intelligence & Machine Learning)
          </h1>
          <div className="w-24 h-1 bg-yellow-900 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700">Facilities</h2>
        </header>

        {/* Tab Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex border-b border-gray-200 min-w-max">
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'overview' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'labs' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('labs')}
            >
              Laboratory Facilities
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'other' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('other')}
            >
              Other Facilities
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Department Overview</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Department of AI ML Engineering is dedicated to providing students with state-of-the-art facilities and resources to enhance their learning experience. Our well-equipped laboratories, modern infrastructure, and advanced software tools create an optimal environment for academic and research activities.
                </p>
                
                <div className="bg-gradient-to-r from-yellow-50 to-white p-5 rounded-lg border-l-4 border-yellow-900 mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">World-Class Infrastructure</h4>
                  <p className="text-gray-700">
                    Our department boasts modern computing facilities with the latest hardware and software resources, ensuring students have access to industry-standard tools and technologies.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-4 text-gray-800">Major Facilities</h3>
              <div className="grid gap-4">
                {facilities.major.map((item, index) => (
                  <div key={`major-${index}`} className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0">
                      <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">300 Mbps</div>
                  <div className="text-sm text-gray-600">Leased-line Connectivity</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">5 Labs</div>
                  <div className="text-sm text-gray-600">Specialized Computing</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto text-purple-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">Microsoft</div>
                  <div className="text-sm text-gray-600">Campus Agreement</div>
                </div>
              </div>
            </div>
          )}

          {/* Labs Tab */}
          {activeTab === 'labs' && (
            <div>
              <h3 className="text-xl font-semibold mb-5 text-gray-800">Laboratory Facilities</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {facilities.labs.map((lab, index) => (
                  <div key={`lab-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {/* If you have actual images, uncomment this */}
                      {/* <img 
                        src={lab.image} 
                        alt={lab.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      /> */}
                      
                      {/* Placeholder if no images */}
                      <div className="text-5xl text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{lab.name}</h4>
                      <p className="text-gray-600">{lab.description || "A well-equipped laboratory facility for student learning and research."}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-900">
                <p className="text-gray-700 font-medium mb-1">Note:</p>
                <p className="text-gray-700">
                  All laboratories are well equipped with advanced machines and a sufficient number of terminals. 
                  Each lab has specialized software and hardware configurations to meet specific course requirements.
                </p>
              </div>
            </div>
          )}

          {/* Other Facilities Tab */}
          {activeTab === 'other' && (
            <div>
              <h3 className="text-xl font-semibold mb-5 text-gray-800">Other Department Facilities</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {facilities.other.map((facility, index) => (
                  <div key={`other-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      {/* If you have actual images, uncomment this */}
                      {/* <img 
                        src={facility.image} 
                        alt={facility.name} 
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      /> */}
                      
                      {/* Placeholder if no images */}
                      <div className="text-5xl text-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-16 h-16">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                        </svg>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{facility.name}</h4>
                      <p className="text-gray-600">{facility.description || "A valuable facility to enhance the learning experience."}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <h4 className="font-semibold text-gray-800 mb-3">Additional Resources</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Digital Library</div>
                        <div className="text-sm text-gray-600">Access to e-books and journals</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-green-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Software Repositories</div>
                        <div className="text-sm text-gray-600">Licensed and open-source tools</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-purple-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">Certifications</div>
                        <div className="text-sm text-gray-600">Industry-recognized programs</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}