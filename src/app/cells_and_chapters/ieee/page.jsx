"use client";
import React from 'react';
import Link from 'next/link';
import { FileText, Calendar, Users, Award, Lightbulb, Radio, Globe, Book } from 'lucide-react';

export default function IEEEPage() {
  // IEEE Activities
  const activities = [
    {
      icon: <Lightbulb className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Technical Workshops",
      description: "Hands-on workshops covering emerging technologies, programming languages, and engineering principles led by industry experts and faculty advisors."
    },
    {
      icon: <Radio className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Project Competitions",
      description: "Annual hardware and software project competitions that challenge students to apply theoretical knowledge to solve real-world engineering problems."
    },
    {
      icon: <Users className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Industry Connect",
      description: "Networking sessions, industry talks, and site visits connecting students with professionals from leading technology and engineering companies."
    },
    {
      icon: <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Technical Paper Presentations",
      description: "Opportunities to present research papers at regional and national IEEE conferences, with guidance on research methodology and publication."
    }
  ];

  // Upcoming Events
  const upcomingEvents = [
    {
      date: "April 15, 2025",
      title: "Workshop on Machine Learning with TensorFlow",
      location: "Engineering Block, Room 302",
      time: "2:00 PM - 5:00 PM"
    },
    {
      date: "April 28, 2025",
      title: "IEEE Regional Student Congress",
      location: "Central Auditorium",
      time: "9:00 AM - 4:00 PM"
    },
    {
      date: "May 10, 2025",
      title: "Industry Expert Talk: Future of IoT",
      location: "Virtual (Zoom)",
      time: "3:30 PM - 5:00 PM"
    }
  ];

  // Committee Members
  const committeeMembers = [
    {
      position: "Branch Counselor",
      name: "Prof. Ananthu Vijayakumar",
      department: "Electronics & Communication Engineering",
      contact: "+91 94953 14374"
    },
    {
      position: "Chairperson",
      name: "Adithya P Nair",
      department: "Computer Science",
      contact: "+91 7306404050"
    },
    {
      position: "Secretary",
      name: "Febin",
      department: "Electronics & Communication Engineering",
      contact: "+91 7736609677"
    },
    {
      position: "Treasurer",
      name: "Anshuman Biju",
      department: "Computer Science",
      contact: "+91 9895268544"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header section with title */}
          <div className="bg-gradient-to-r from-yellow-700 to-amber-500 p-4 sm:p-6 md:p-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              IEEE Student Branch
            </h1>
            <div className="h-1 w-16 sm:w-20 bg-white opacity-70 mb-3 sm:mb-4"></div>
            <p className="text-white text-base sm:text-lg opacity-90">
              Advancing Technology for Humanity
            </p>
          </div>
          
          <div className="p-4 sm:p-6 md:p-10">
            {/* Main description */}
            <div className="mb-6 sm:mb-8 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                The IEEE Student Branch at our college provides a platform for students to enhance their technical knowledge, 
                develop professional skills, and connect with the global community of engineers and technologists. 
                Established in 2010, our branch has consistently been recognized for excellence in technical activities and student engagement.
              </p>
            </div>
            
            {/* Activities grid */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
              Activities & Initiatives
            </h2>
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
            
            {/* Benefits of Membership */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                Benefits of IEEE Membership
              </h2>
              <div className="bg-amber-50 rounded-lg p-4 sm:p-6 border-l-4 border-yellow-800">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-800 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Access to IEEE Xplore Digital Library with over 5 million technical documents</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-800 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Networking opportunities with professionals and peers worldwide</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-800 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Discounted registration fees for IEEE conferences and events</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-800 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Eligibility for IEEE scholarships, awards, and competitions</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-800 mr-2 mt-1 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Leadership development and volunteer opportunities</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Executive Committee */}
            <div className="mb-8 sm:mb-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">
                Executive Committee
              </h2>
              
              {/* Mobile-friendly card layout for small screens */}
              <div className="block sm:hidden">
                {committeeMembers.map((member, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 mb-4 last:mb-0">
                    <div className="font-semibold text-yellow-800 text-sm mb-1">{member.position}</div>
                    <div className="font-medium text-gray-900 text-base mb-1">{member.name}</div>
                    <div className="text-gray-600 text-sm mb-2">{member.department}</div>
                    <a href={`tel:${member.contact}`} className="text-yellow-800 hover:text-yellow-900 text-sm font-medium">
                      {member.contact}
                    </a>
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
                        <th className="py-3 px-4 md:px-6 text-left text-sm font-semibold text-gray-700">Contact</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {committeeMembers.map((member, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="py-3 px-4 md:px-6 text-sm text-gray-700">{member.position}</td>
                          <td className="py-3 px-4 md:px-6 text-sm font-medium text-gray-900">{member.name}</td>
                          <td className="py-3 px-4 md:px-6 text-sm text-gray-700">{member.department}</td>
                          <td className="py-3 px-4 md:px-6 text-sm text-gray-700">
                            <a href={`tel:${member.contact}`} className="text-yellow-800 hover:text-yellow-900">
                              {member.contact}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Join section */}
            <div className="text-center bg-amber-50 rounded-lg p-4 sm:p-6 md:p-8 mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3">
                Join Our IEEE Student Branch
              </h3>
              <p className="text-gray-700 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                Become part of a global community of innovators and gain access to resources, 
                networking opportunities, and professional development that will enhance your academic journey.
              </p>
              <Link 
                href="https://www.ieee.org/membership/join/index.html?WT.mc_id=hc_join"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-yellow-800 hover:bg-yellow-900 text-white font-bold py-2 sm:py-3 px-4 sm:px-8 rounded-md transition-colors duration-300 inline-flex items-center text-sm sm:text-base"
              >
                <Users className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Apply for Membership
              </Link>
            </div>
            
            {/* Contact section */}
            <div className="mt-8 sm:mt-10 text-center">
              <h3 className="text-base sm:text-lg font-medium text-gray-700 mb-2">
                Contact IEEE Student Branch
              </h3>
              <div className="text-gray-600 text-sm sm:text-base space-y-2 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:justify-center sm:items-center sm:space-x-2">
                  <span>Email: <a href="mailto:ieee@college.edu" className="text-yellow-800 hover:underline">ieee@college.edu</a></span>
                  <span className="hidden sm:inline">|</span>
                  <span>Phone: <a href="tel:+1234567890" className="text-yellow-800 hover:underline">(123) 456-7890</a></span>
                </div>
                <div>Room: Engineering Block, Room 105</div>
              </div>
              
              {/* Social media links */}
              <div className="flex justify-center space-x-4 mt-4">
                <a href="https://facebook.com/ieeecollegebranch" className="text-yellow-800 hover:text-yellow-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="https://twitter.com/ieeecollegebranch" className="text-yellow-800 hover:text-yellow-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="https://instagram.com/ieeecollegebranch" className="text-yellow-800 hover:text-yellow-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/company/ieeecollegebranch" className="text-yellow-800 hover:text-yellow-900 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
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