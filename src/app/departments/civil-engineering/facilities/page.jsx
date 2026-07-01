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

export default function CivilDepartmentFacilities() {
  const [activeTab, setActiveTab] = useState('overview');

  // Facilities data organized by section for maintainability
  const facilities = {
    major: [
      "The Department of Civil Engineering is dedicated to the current needs of industry",
      "Application of the state-of-the-art technology in various fields",
      "Well-equipped for training students with a streamlined curriculum",
      "Provides sound theoretical background and good practical exposure",
      "Focus on modern infrastructure and advanced labs"
    ],
    labs: [
      {
        name: "Survey Laboratory",
        description: "Survey laboratory houses both conventional and modern equipment for practical surveying. The equipment available are LYNX Measuring Chain – 20m, LYNX Measuring Chain – 30m, LYNX Cross staff, LYNX Ranging rod, LYNX Offset rod, Measuring Tape – 30 m, Arrows, LYNX Prismatic Compass with aluminium stand, LYNX Plane Table with all accessories, LYNX Dumpy Level with aluminium tripod and all standard accessories, LYNX Auto Level with aluminium tripod and all standard accessories, LYNX Levelling Staff (4m), LYNX Standard Vernier Theodolite with aluminium tripod and all standard accessories, LYNX Planimeter with box, Total Station (Sokkia CX105), wooden mallet, wooden peg, distance meter and hand held G P S.",
        image: "/assets/images/departments/facilities/civil/survey_lab.jpeg",
        inCharge: "Dr. Jisa Johnson",
        staff: "Mr. Renjith C R"
      },
      {
        name: "Strength of Materials Lab",
        description: "This lab provides facilities for various tests for cement and concrete which includes test for compressive strength, flexural strength, fineness, and mix design of concrete etc. The main equipment include AIMIL AIL-317E-AN-2 Compression Testing machine (2000 KN), Electrically operated single phase with three load guage of 500 KN, 1000KN, 2000KN, LYNX Sieve Shaker (Gyratory motorized), Test Sieves 20 cm Diameter- 90 microns, LYNX Vicat Needle Apparatus, Le-Chatlier's Mould with 2 glass plate & 1 Lead wt., Le-Chatlier's Flask, Longitudinal Compresometer with dial gauge.",
        image: "/assets/images/departments/facilities/civil/concrete_lab.jpeg",
        inCharge: "Ms. Shobha Elizabeth Thomas",
        staff: "Mr. Syam Raj S"
      },
      {
        name: "Geo-Technical Engineering Laboratory",
        description: "The laboratory has facilities for conducting practical classes for undergraduate programmes. The undergraduate students are being encouraged to take up topics in the field of Geotechnical Engineering for their project work by making use of facilities available in the laboratory. Various equipment available in the lab are LYNX Direct Shear Apparatus (motorised), Dial Guage (0.01 X 25mm), Proving Ring (2 KN), Unconfined Compression Test Apparatus, Dial Guage 0.01 X 25mm, Extractor Frame for 38mm diameter sample with mould, Soil Permeability Apparatus.",
        image: "/assets/images/departments/facilities/civil/geo_tech_lab.jpeg",
        inCharge: "Ms Regi P Mohan",
        staff: "Mr Syam Raj S"
      },
      {
        name: "Transportation Engineering Laboratory",
        description: "The Transportation Engineering Laboratory is equipped with facilities for testing of Aggregates, Bitumen and Soil. The laboratory is fully equipped for conduct of regular experiments at UG level and consultancy works. Various equipment available in the lab are Abrasion Testing Machine, Ring and Ball Apparatus (motorised), Standard Penetrometer, Ductility Testing Machine, Crushing Value Test Apparatus, Test Sieves 30cm Dia, Thickness Gauge, Length Gauge, Density Basket, CBR Test Apparatus, Impact Value With Counter and Compression Testing Machine.",
        image: "/assets/images/departments/facilities/civil/transportation_lab.jpeg",
        inCharge: "Ms. Saritha V Raj",
        staff: "Mr. Syam Raj S"
      },
      {
        name: "Environmental Engineering Lab",
        description: "The environmental lab serves to acquaint students with the details of water and wastewater analysis for water and wastewater treatment. The lab is well equipped with Flame Photometer, UV- Visible Spectrophotometer (Double beam), BOD Incubator, Laminar Air flow cabinet (Vertical), Auto Clave (Vertical) and COD Digestion Apparatus.",
        image: "/assets/images/departments/facilities/civil/environmental_lab.jpeg",
        inCharge: "Ms. Aswathy S Kumar",
        staff: "Ms. Sindhu O"
      },
      {
        name: "Advanced Computational Lab",
        description: "This lab deals with the study of various distinctive features and tools used in AutoCAD in civil engineering drafting. Advanced Design and analysis softwares used are STAAD-PRO V8i, STAAD-PRO FOUNDATION, RESIST, AUTO CADD 2014, TOTAL STATION and MS PROJECT 2013.",
        image: "/assets/images/departments/facilities/civil/computational_lab.jpeg",
        inCharge: "Ms Namitha Chandran",
        staff: "Ms Sindhu O"
      },
      {
        name: "Civil Engineering Workshop",
        description: "This lab is intended to conduct the practical sessions of the first year B-tech students. Training sessions like setting out of building, area and volume calculation of building and building components, making of brick bonds and basics surveying using levelling instruments are conducted by using this lab facility.",
        image: "/assets/images/departments/facilities/civil/civil_workshop.jpeg",
        inCharge: "Ms. Cinaya Tony",
        staff: "Mr. Madhusoodanan Nair"
      },
      {
        name: "Structural Dynamics Laboratory (PG)",
        description: "Structural dynamics lab has testing facility for vibration testing and data analysis. Various lab equipment include Horizontal Shake Table with Electronic Cam (Harmonic Base Motor), Vertical Shake Table, Experimental Models Shake Table Instrumentation (Accelero Meters, Data Acquistion System and Vibration Analyser Software).",
        image: "/assets/images/departments/facilities/civil/structural_dynamics_lab.jpeg",
        inCharge: "Ms Ritzy R",
        staff: "Mr Renjith C R"
      },
      {
        name: "Structural Engineering Laboratory (PG)",
        description: "The lab mainly facilitates the post graduate students and the research scholars to conduct the experiments related to structural engineering. Some of the facilities available in the lab are Loading Frame (100 T) 5m X 3.1m, Ultrasonic Pulse Velocitymeter, Data Acquisition System. DT-800, DATA TAKER, AIM 388 Concrete Test Hammer, Rebar Locator, Accelerated Curing Tank, Vicat Apparatus, AIM-400.",
        image: "/assets/images/departments/facilities/civil/structural_engineering_lab.jpeg",
        inCharge: "Dr. S Sivasankar",
        staff: "Mr. Madhusoodanan Nair"
      }
    ],
    other: [
      {
        name: "Well equipped seminar Hall",
        description: "Modern seminar hall with audio-visual facilities for presentations and guest lectures.",
        image: "/assets/images/departments/facilities/civil/seminar_hall.jpeg"
      },
      {
        name: "Department Library",
        description: "Dedicated department library with specialized texts, reference books, and technical journals.",
        image: "/assets/images/departments/facilities/civil/library.jpeg"
      },
      {
        name: "Drawing Hall",
        description: "Dedicated drawing hall equipped with drafting tables for engineering drawing and graphics classes.",
        image: "/assets/images/departments/facilities/civil/drawing_hall.jpeg"
      },
      {
        name: "Research Facilities",
        description: "Specialized equipment and software for research and development in civil engineering."
      },
      {
        name: "Computer Lab",
        description: "Modern computer lab with civil engineering software for design and analysis."
      }
    ]
  };

  return (
    <div className={`cs-department-facilities ${poppins.className}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <header className="mb-6 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-900 mb-2">
            Department of Civil Engineering
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-yellow-900 mx-auto mb-3 sm:mb-4"></div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Facilities</h2>
        </header>

        {/* Tab Navigation - Enhanced for better small screen display */}
        <div className="mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
          <div className="flex border-b border-gray-200 min-w-max">
            <button
              className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm ${activeTab === 'overview' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm ${activeTab === 'labs' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('labs')}
            >
              Laboratories
            </button>
            <button
              className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm ${activeTab === 'other' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('other')}
            >
              Other Facilities
            </button>
            <button
              className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm ${activeTab === 'library' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('library')}
            >
              Library
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Department Overview</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                  The Department of Civil Engineering is dedicated to the current needs of industry with the flexibility to tune its programmes according to the different requirements. Application of the state-of-the-art technology in various fields is one of the main focuses in the activities of the department. The department is well-equipped for training the students with a streamlined curriculum that provides an ambient atmosphere for learning and acquiring new skills.
                </p>
                
                <div className="bg-gradient-to-r from-yellow-50 to-white p-4 sm:p-5 rounded-lg border-l-4 border-yellow-900 mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">World-Class Infrastructure</h4>
                  <p className="text-sm sm:text-base text-gray-700">
                    Our department boasts modern laboratory facilities with the latest hardware and equipment, ensuring students have access to industry-standard tools and technologies.
                  </p>
                </div>
              </div>

              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Major Facilities</h3>
              <div className="grid gap-3 sm:gap-4">
                {facilities.major.map((item, index) => (
                  <div key={`major-${index}`} className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0">
                      <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base text-gray-700">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                <div className="bg-blue-50 p-3 sm:p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-gray-800">Modern</div>
                  <div className="text-xs sm:text-sm text-gray-600">Lab Equipment</div>
                </div>
                <div className="bg-green-50 p-3 sm:p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                    </svg>
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-gray-800">9 Labs</div>
                  <div className="text-xs sm:text-sm text-gray-600">Specialized Facilities</div>
                </div>
                <div className="bg-purple-50 p-3 sm:p-4 rounded-lg text-center sm:col-span-2 md:col-span-1">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-purple-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <div className="text-base sm:text-lg font-semibold text-gray-800">Design Tools</div>
                  <div className="text-xs sm:text-sm text-gray-600">STAAD-PRO, AutoCAD</div>
                </div>
              </div>
            </div>
          )}

          {/* Labs Tab */}
          {activeTab === 'labs' && (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-gray-800">Laboratory Facilities</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {facilities.labs.map((lab, index) => (
                  <div key={`lab-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="h-36 sm:h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      <img
                        src={lab.image}
                        alt={lab.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">{lab.name}</h4>
                      <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{lab.description || "A well-equipped laboratory facility for student learning and research."}</p>
                      <div className="mt-2 sm:mt-3 text-xs sm:text-sm flex flex-col sm:grid sm:grid-cols-2 gap-1 sm:gap-2">
                        <div className="text-gray-600">
                          <span className="font-medium">In Charge:</span> {lab.inCharge}
                        </div>
                        <div className="text-gray-600">
                          <span className="font-medium">Staff:</span> {lab.staff}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-900">
                <p className="text-sm sm:text-base text-gray-700 font-medium mb-1">Note:</p>
                <p className="text-xs sm:text-sm text-gray-700">
                  All laboratories are well equipped with advanced machines and a sufficient number of terminals. 
                  Each lab has specialized software and hardware configurations to meet specific course requirements.
                </p>
              </div>
            </div>
          )}

          {/* Other Facilities Tab */}
          {activeTab === 'other' && (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-gray-800">Other Department Facilities</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {facilities.other.map((facility, index) => (
                  facility.name ? (
                    <div key={`other-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                      <div className="h-36 sm:h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                        {facility.image ? (
                          <img
                            src={facility.image}
                            alt={facility.name}
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          />
                        ) : (
                          <div className="text-4xl sm:text-5xl text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 sm:w-16 sm:h-16">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="p-3 sm:p-4">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">{facility.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{facility.description || "A valuable facility to enhance the learning experience."}</p>
                      </div>
                    </div>
                  ) : null
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8">
                <h4 className="font-semibold text-gray-800 mb-3">Additional Resources</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-gradient-to-r from-blue-50 to-white p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-2 sm:mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-medium text-gray-800">Digital Library</div>
                        <div className="text-xs sm:text-sm text-gray-600">Access to e-books and journals</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-white p-3 sm:p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-2 sm:mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-green-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-medium text-gray-800">Simulation Software</div>
                        <div className="text-xs sm:text-sm text-gray-600">STAAD-PRO, AutoCAD, MS Project</div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-white p-3 sm:p-4 rounded-lg sm:col-span-2 md:col-span-1">
                    <div className="flex items-center">
                      <div className="mr-2 sm:mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm sm:text-base font-medium text-gray-800">Survey Equipment</div>
                        <div className="text-xs sm:text-sm text-gray-600">Total Station and GPS units</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Library Tab */}
          {activeTab === 'library' && (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-5 text-gray-800">Department Library</h3>
              
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">
                  Apart from a highly equipped Central Library, the Civil Engineering Department separately owns a standard library. This Department Library has several foreign and well-known publishers&apos; books and study materials related to Civil Engineering along with the textbooks and reference books prescribed by the University of Kerala as part of the Civil Engineering curriculum.
                </p>
                
                <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
                  The Department is proud as the Faculty Members and students rely on the library faithfully for their reference, development, and research activities.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                  <div className="bg-gray-50 p-3 sm:p-5 rounded-lg">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">Available Resources</h4>
                    <ul className="space-y-1 sm:space-y-2">
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-700">Textbooks and Reference Books</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-700">Technical Journals and Magazines</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-700">Study Materials for Civil Engineering</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-700">Civil Engineering Standards and Codes</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 p-3 sm:p-5 rounded-lg">
                    <h4 className="text-sm sm:text-base font-semibold text-gray-800 mb-2 sm:mb-3">Library Services</h4>
                    <ul className="space-y-1 sm:space-y-2">
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-700">Book Lending for Students and Faculty</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-700">Reference Services</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-700">Reading Room Facilities</span>
                      </li>
                      <li className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs sm:text-sm text-gray-700">Digital Resources Access</span>
                      </li>
                    </ul>
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