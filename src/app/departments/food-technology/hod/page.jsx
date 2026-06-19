"use client"

import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image'; // Import Next.js Image component

// Animated Section Component
const AnimatedSection = memo(({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
));
AnimatedSection.displayName = 'AnimatedSection'; // Add display name

// Profile Image Component with hover effect
const ProfileImage = memo(({ name, title, imagePath }) => (
  <motion.div 
    className="relative group"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="overflow-hidden rounded-2xl shadow-2xl">
      <Image
        src={imagePath}
        alt={name}
        width={800}
        height={400}
        className="w-full h-[400px] object-cover transform transition-transform duration-500 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <h2 className="text-3xl font-bold">{name}</h2>
        <p className="text-xl mt-2 text-gray-200">{title}</p>
      </div>
    </div>
  </motion.div>
));
ProfileImage.displayName = 'ProfileImage'; // Add display name

// Info Card Component
const InfoCard = memo(({ title, children, icon }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300"
  >
    <div className="flex items-center mb-4">
      {icon}
      <h3 className="text-xl font-semibold ml-3">{title}</h3>
    </div>
    {children}
  </motion.div>
));
InfoCard.displayName = 'InfoCard'; // Add display name

// Timeline Item Component
const TimelineItem = memo(({ period, role }) => (
  <motion.div 
    className="relative pl-8 pb-6 border-l-2 border-yellow-900 last:pb-0"
    whileHover={{ x: 5 }}
  >
    <div className="absolute left-[-9px] top-0 w-4 h-4 bg-yellow-900 rounded-full" />
    <p className="text-yellow-900 font-semibold">{period}</p>
    <p className="text-gray-700 mt-1">{role}</p>
  </motion.div>
));
TimelineItem.displayName = 'TimelineItem'; // Add display name

export default function FoodTechnologyDepartmentHOD() {
  const [activeTab, setActiveTab] = useState('message');

  const profileData = {
    name: 'Dr.Malu Ravi',
    title: 'HOD - Food Technology Department',
    imagePath: '/assets/images/departments/hod_food_technology.jpeg',
    email: 'hod.food@sbce.ac.in',
    phone: '+91 9446462869'
  };

  const tabData = {
    message: {
      icon: <svg className="w-6 h-6 text-yellow-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
      title: "HOD's Message"
    },
    department: {
      icon: <svg className="w-6 h-6 text-yellow-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>,
      title: "About the Department"
    },
    opportunities: {
      icon: <svg className="w-6 h-6 text-yellow-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
      title: "Career Opportunities"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-yellow-900 opacity-10 pattern-diagonal-lines pattern-blue-500 pattern-bg-white pattern-size-4 pattern-opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatedSection>
            <h1 className="text-5xl md:text-6xl font-bold text-center text-gray-900 mb-4">
              Department Of Food Technology
            </h1>
            <div className="w-40 h-1 bg-yellow-900 mx-auto mb-8" />
          </AnimatedSection>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Profile Section */}
          <div className="lg:col-span-5">
            <AnimatedSection delay={0.2}>
              <ProfileImage {...profileData} />
              
              {/* Contact Card */}
              <motion.div 
                className="mt-6 bg-white rounded-2xl p-6 shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <a href={`mailto:${profileData.email}`} className="flex items-center text-blue-600 hover:text-blue-800">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {profileData.email}
                  </a>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {profileData.phone}
                  </div>
                  
                  {/* Department Info */}
                  <div className="flex items-center text-gray-700 mt-2">
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Department established in 2020</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Department Highlights Card */}
              <motion.div 
                className="mt-6 bg-white rounded-2xl p-6 shadow-xl"
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl font-semibold mb-4">Department Highlights</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-900 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Established in 2020 (VISION 2020)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-900 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Advanced facilities & modern equipment</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-900 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Industry partnerships & implant training</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-900 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Diverse career opportunities for graduates</span>
                  </li>
                </ul>
              </motion.div>
            </AnimatedSection>
          </div>

          {/* Content Section */}
          <div className="lg:col-span-7">
            <AnimatedSection delay={0.4}>
              {/* Tab Navigation */}
              <div className="flex space-x-4 mb-8 overflow-x-hidden pb-2">
                {Object.keys(tabData).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                      activeTab === tab
                        ? 'bg-yellow-900 text-white shadow-lg'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {activeTab === 'message' && (
                  <InfoCard title={tabData.message.title} icon={tabData.message.icon}>
                    <div className="prose prose-yellow max-w-none text-gray-700">
                      <p>
                        Welcome to the Department of Food Technology at Sree Buddha College of Engineering, which was started in the year 2020 
                        to commemorate the VISION 2020 of late Bharat Ratna Dr. APJ Abdul Kalam (Former Hon&apos;ble President of India, Scientist 
                        and Academician), committing to advancements in research and education in the field of Food Technology.
                      </p>
                      <p>
                        Our Food Technology curriculum is meticulously crafted, encompassing diverse courses and laboratory sessions and also 
                        with industrial involvement as Implant training, Visits and Expert talk. Our department is equipped with advanced facilities 
                        and modern equipment, overseen by experts from various disciplines within Food Technology. Moreover, our research endeavours 
                        are robust, supported by grants and strategic partnerships with leading industrial sectors and universities.
                      </p>
                      <p>
                        Once again, I welcome you to the Sree Buddha Family especially to the quality time in the Department of Food Technology, 
                        in which students will relish and have productive experience to meet out variety of scope of opportunities in the field 
                        during their time of study.
                      </p>
                      <div className="mt-6 space-y-1">
                        <p className="font-medium">With regards,</p>
                        <p className="font-medium">Dr. Malu Ravi</p>
                        <p className="font-medium">HOD, Department of Food Technology</p>
                      </div>
                    </div>
                  </InfoCard>
                )}

                {activeTab === 'department' && (
                  <InfoCard title={tabData.department.title} icon={tabData.department.icon}>
                    <div className="prose prose-yellow max-w-none text-gray-700">
                      <p>
                        The Department of Food Technology at Sree Buddha College of Engineering was established in 2020 to commemorate the VISION 2020 
                        of late Bharat Ratna Dr. APJ Abdul Kalam. Food Technology is not confined to science, technology, engineering, or management 
                        since it has a wide range of scope and is multidimensional in various applications.
                      </p>
                      <p>
                        Our SBCE management run by academicians envisioned the department of Food Technology because of the present and future demands 
                        in various sectors of food and allied processing arena. Globally, Food science and technology research has been making substantial 
                        development to ensure quality, hygiene and safety in production, packing, handling and storage divisions.
                      </p>
                      <p>
                        It is ultimate to develop state-of-art infrastructure in relation to various food sectors and equip students with specially designed 
                        curriculum of Food Technology programme and mould them into technocrats of the field. The most-suited branch to serve human society 
                        is this particular branch of study which takes all major commodities into account from all basic needs to higher-end space foods.
                      </p>
                      <p>
                        Our department is equipped with advanced facilities and modern equipment, overseen by experts from various disciplines within 
                        Food Technology. Our research endeavours are supported by grants and strategic partnerships with leading industrial sectors 
                        and universities.
                      </p>
                    </div>
                  </InfoCard>
                )}

                {activeTab === 'opportunities' && (
                  <InfoCard title={tabData.opportunities.title} icon={tabData.opportunities.icon}>
                    <div className="prose prose-yellow max-w-none text-gray-700">
                      <p>
                        Global problems like malnutrition, starvation, famine and other calamities interconnected with food crisis could be 
                        completely eradicated with advancements and research in Food Technology. Also, socio-economic and regional landscapes 
                        of different parts of our country especially Kerala has been actively involving in importing and exporting of various 
                        food products due to insufficiency of processing technology and experience.
                      </p>
                      <p>
                        To fulfill the requirements, nation building with food technology is the need of hour to address these emerging needs. 
                        Moreover, technological advancements and increased awareness about food quality, hygiene, and safety have created numerous 
                        job opportunities in food production and handling sectors.
                      </p>
                      <p>
                        Recognizing the vital importance of Food Processing and Technology, the Government of India and Kerala have implemented 
                        revolutionary measures to empower the field and developed various career opportunities such as:
                      </p>
                      <ul className="list-disc pl-6">
                        <li>FSSAI Officer</li>
                        <li>Food Safety Officer</li>
                        <li>Food Microbiologist</li>
                        <li>Food Quality Assurance Manager</li>
                        <li>Research & Development Specialist</li>
                        <li>Food Process Engineer</li>
                        <li>Food Product Development Scientist</li>
                        <li>Food Technologist in various industries</li>
                      </ul>
                    </div>
                  </InfoCard>
                )}
              </motion.div>

              {/* Full Message Section */}
              <motion.div 
                className="mt-8 bg-white rounded-2xl p-6 shadow-xl"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-xl font-semibold mb-4">About Food Technology</h3>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Food Technology is not confined to science, technology, engineering, or management since it has a wide range of scope and 
                    multidimensional in various applications. The field has been making substantial development globally to ensure quality, 
                    hygiene and safety in production, packing, handling and storage divisions.
                  </p>
                  <p>
                    The most-suited branch to serve the human society is this particular branch of study which takes all major commodities into 
                    account from all basic needs to higher-end space foods. Global problems like malnutrition, starvation, famine and other 
                    calamities interconnected with food crisis could be completely eradicated with advancements and research in Food Technology.
                  </p>
                  <p>
                    At Sree Buddha College of Engineering, our Food Technology curriculum is meticulously crafted, encompassing diverse courses 
                    and laboratory sessions with industrial involvement through implant training, visits, and expert talks. Our department is 
                    equipped with advanced facilities and modern equipment, overseen by experts from various disciplines within Food Technology.
                  </p>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}