"use client"

import React, { memo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';


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
AnimatedSection.displayName = 'AnimatedSection';

// Profile Image Component with hover effect
const ProfileImage = memo(({ name, title, imagePath }) => (
  <motion.div 
    className="relative group"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    <div className="overflow-hidden rounded-2xl shadow-2xl">
      <div className="w-full h-[400px] relative">
        <Image
          src={imagePath}
          alt={name}
          className="object-cover transform transition-transform duration-500 group-hover:scale-110"
          fill
          sizes="(max-width: 768px) 100vw, 40vw"
          priority
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
        <h2 className="text-3xl font-bold">{name}</h2>
        <p className="text-xl mt-2 text-gray-200">{title}</p>
      </div>
    </div>
  </motion.div>
));
ProfileImage.displayName = 'ProfileImage';

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
InfoCard.displayName = 'InfoCard';

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
TimelineItem.displayName = 'TimelineItem';

export default function ComputerScienceDepartmentHod() {
  const [activeTab, setActiveTab] = useState('message');

  const profileData = {
    name: 'Prof. Pavitha P P',
    title: 'HOD - Electronics and Computer Engineering Department',
    imagePath: '/assets/images/departments/hod_ece.jpg',
    email: 'ecsbce@gmail.com',
    phone: '8075376012'
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
              Department Of Electronics and Computer Engineering
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
                    <span>Established department with strong academic history</span>
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
                    <span className="text-gray-700">State-of-art laboratories and equipment</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-900 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Strong industry connections and collaborations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-900 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Experienced faculty with research publications</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-yellow-900 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-700">Excellent placement records in top companies</span>
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
                        Welcome to the Department of Electronics and Computer Engineering at Sree Buddha College of Engineering. Our department 
                        is committed to providing students with a strong foundation in electronics and Computer technologies, preparing them for 
                        successful careers in this rapidly evolving field.
                      </p>
                      <p>
                        Prof. Pavitha P P took her B.Tech degree in Electronics and Computer Engineering, from Visvesvaraya Technological University, 
                        Karnataka in 2007 and M.Tech from Sir M. Visvesvaraya Institute of Technology, Bangalore. She started her career as a faculty of 
                        Electronics and Computer in 2007. She is a member of Board of Examination for both B.Tech and M.Tech programmes in Electronics 
                        and Computer Engineering at Kerala Technological University. She has got a number of publications in conferences and journals.
                      </p>
                      <p>
                        Our department focuses on providing hands-on experience with industry-standard equipment and software, ensuring our students 
                        gain practical skills alongside theoretical knowledge. We regularly organize workshops, seminars, and industry visits to keep 
                        our students updated with the latest trends and technologies in the field.
                      </p>
                      <div className="mt-6 space-y-1">
                        <p className="font-medium">With regards,</p>
                        <p className="font-medium">Prof. Pavitha P P</p>
                        <p className="font-medium">HOD, Department of Electronics and Computer Engineering</p>
                      </div>
                    </div>
                  </InfoCard>
                )}

                {activeTab === 'department' && (
                  <InfoCard title={tabData.department.title} icon={tabData.department.icon}>
                    <div className="prose prose-yellow max-w-none text-gray-700">
                      <p>
                        The Department of Electronics and Computer Engineering at Sree Buddha College of Engineering is dedicated to providing 
                        quality education and research opportunities in the field of electronics and Computer. With a strong focus on both theoretical 
                        knowledge and practical applications, our department prepares students for successful careers in various sectors.
                      </p>
                      <p>
                        Our curriculum is designed to cover fundamental principles as well as advanced topics in areas such as Computer systems, 
                        embedded systems, signal processing, VLSI design, and wireless technologies. The department boasts state-of-the-art laboratories 
                        that provide students with hands-on experience using industry-standard equipment and software.
                      </p>
                      <p>
                        Prof. Pavitha P P took her B.Tech degree in Electronics and Computer Engineering, from Visvesvaraya Technological University, 
                        Karnataka in 2007 and M.Tech from Sir M. Visvesvaraya Institute of Technology, Bangalore. She started her career as a faculty of 
                        Electronics and Computer in 2007. She is a member of Board of Examination for both B.Tech and M.Tech programmes in Electronics 
                        and Computer Engineering at Kerala Technological University. She has got a number of publications in conferences and journals.
                      </p>
                      <p>
                        Under her leadership, the department has established strong connections with industry partners, creating opportunities for 
                        internships, projects, and placements for our students. Our faculty members are actively engaged in research, contributing to 
                        advancements in various areas of electronics and Computer engineering.
                      </p>
                    </div>
                  </InfoCard>
                )}

                {activeTab === 'opportunities' && (
                  <InfoCard title={tabData.opportunities.title} icon={tabData.opportunities.icon}>
                    <div className="prose prose-yellow max-w-none text-gray-700">
                      <p>
                        The field of Electronics and Computer Engineering offers diverse and rewarding career opportunities across various sectors. 
                        Our graduates are well-prepared to excel in these roles due to our comprehensive curriculum, hands-on laboratory experience, 
                        and industry connections.
                      </p>
                      <p>
                        With the rapid advancement in technology, particularly in areas such as IoT, AI, machine learning, and wireless Computers, 
                        the demand for skilled electronics and Computer engineers continues to grow. Our department strives to keep our curriculum 
                        updated with these emerging trends, ensuring our graduates are ready to meet industry requirements.
                      </p>
                      <p>
                        Career opportunities for our graduates include:
                      </p>
                      <ul className="list-disc pl-6">
                        <li>Electronics Design Engineer</li>
                        <li>Computer Systems Engineer</li>
                        <li>VLSI Design Engineer</li>
                        <li>Embedded Systems Developer</li>
                        <li>RF Engineer</li>
                        <li>TeleComputers Engineer</li>
                        <li>Network Planning Engineer</li>
                        <li>IoT Solutions Developer</li>
                        <li>Research and Development in Electronics</li>
                        <li>Signal Processing Engineer</li>
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
                <h3 className="text-xl font-semibold mb-4">About Prof. Pavitha P P</h3>
                <div className="text-gray-700 leading-relaxed space-y-4">
                  <p>
                    Prof. Pavitha P P took her B.Tech degree in Electronics and Computer Engineering, from Visvesvaraya Technological University, 
                    Karnataka in 2007 and M.Tech from Sir M. Visvesvaraya Institute of Technology, Bangalore. She started her career as a faculty of 
                    Electronics and Computer in 2007.
                  </p>
                  <p>
                    She is a member of Board of Examination for both B.Tech and M.Tech programmes in Electronics and Computer Engineering at 
                    Kerala Technological University. She has got a number of publications in conferences and journals.
                  </p>
                  <p>
                    Under her leadership, the Department of Electronics and Computer Engineering continues to grow, focusing on quality education, 
                    research, and industry collaboration. Her vision is to prepare students who are not only technically competent but also possess the 
                    soft skills and ethical values needed to succeed in their professional careers.
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