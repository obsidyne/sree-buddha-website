import React from 'react';
import { Phone, Mail, Heart, Users, BookOpen, Brain, TrendingUp, Lightbulb, UserCheck } from 'lucide-react';

export default function CounsellingPage() {
  const services = [
    { 
      icon: <Users className="w-6 h-6 text-yellow-700" />, 
      title: "Individual & Group Counselling", 
      description: "One-on-one sessions and group support tailored to your needs" 
    },
    { 
      icon: <BookOpen className="w-6 h-6 text-yellow-700" />, 
      title: "Academic & Career Guidance", 
      description: "Navigate your academic journey and career path with confidence" 
    },
    { 
      icon: <Brain className="w-6 h-6 text-yellow-700" />, 
      title: "Stress & Anxiety Management", 
      description: "Learn effective coping strategies and stress relief techniques" 
    },
    { 
      icon: <Heart className="w-6 h-6 text-yellow-700" />, 
      title: "Personal Growth & Relationships", 
      description: "Develop healthier relationships and personal well-being" 
    },
    { 
      icon: <Lightbulb className="w-6 h-6 text-yellow-700" />, 
      title: "Emotional Well-being Workshops", 
      description: "Interactive sessions on mental health and emotional intelligence" 
    },
    { 
      icon: <TrendingUp className="w-6 h-6 text-yellow-700" />, 
      title: "Life Skills Development", 
      description: "Build essential skills for personal and professional success" 
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <div className="mx-auto px-8 md:px-24 lg:px-36 py-8 max-w-8xl">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-yellow-800 to-amber-600 p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Counselling and Wellness Centre
            </h1>
            <div className="h-1 w-20 bg-white opacity-80 my-4"></div>
            <p className="text-white text-lg opacity-90">
              Supporting your emotional, psychological, and social well-being
            </p>
          </div>

          {/* Main content */}
          <div className="p-6 md:p-8">
            
            {/* Introduction */}
            <div className="mb-10 text-gray-700 text-lg leading-relaxed" style={{ fontSize: '16px' }}>
              <p className="mb-4">
                The Counselling and Wellness Centre at our college is dedicated to supporting the emotional, 
                psychological, and social well-being of our students. College life brings many exciting 
                opportunities along with challenges — from academic pressures and career decisions to personal 
                growth and relationship concerns. Our counselling facility provides a safe, confidential, and 
                non-judgmental space where students can freely share their thoughts and feelings.
              </p>
              <p className="mb-4">
                Our goal is to help every student enhance their resilience, self-understanding, and emotional 
                balance, empowering them to thrive both personally and academically.
              </p>
              <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-yellow-700">
                <p className="text-lg font-semibold text-gray-800">
                  All services are free and strictly confidential.
                </p>
              </div>
            </div>

            {/* Services Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ color: '#845714' }}>
                Services Offered
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
                    <div className="mr-4 bg-amber-50 p-3 rounded-full">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{service.title}</h3>
                      <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Counsellor Details Section */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6" style={{ color: '#845714' }}>
                Details of Counsellor
              </h2>
              
              <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
                  
                  {/* Photo Section */}
                  <div className="flex justify-center items-start">
                    <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center border-4 border-white shadow-lg">
                      {/* Replace this div with actual image */}
                      {/* <UserCheck className="w-24 h-24 text-yellow-700" /> */}
                      {/* { Uncomment and use this for actual photo: */}
                      <img 
                        src="/counseler.jpg" 
                        alt="Counsellor" 
                        className="object-cover w-full h-full"
                      />
                      
                    </div>
                  </div>

                  {/* Details Section */}
                  <div className="md:col-span-2">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Dr, Shinudas S.</h3>
                    <p className="text-gray-600 mb-6">Consultant Psychologist</p>
                    
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="mr-4 bg-amber-50 p-3 rounded-full">
                          <Phone className="w-5 h-5 text-yellow-700" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Contact Number</p>
                          <p className="text-gray-800 font-semibold">9744296464</p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="mr-4 bg-amber-50 p-3 rounded-full">
                          <Mail className="w-5 h-5 text-yellow-700" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium">Email Address</p>
                          <p className="text-gray-800 font-semibold">shinudas123@gmail.com</p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 bg-amber-50 p-4 rounded-lg border-l-4 border-yellow-700">
                      <p className="text-gray-700 text-sm">
                        Ready to take the first step towards better well-being? Reach out today for a confidential conversation.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-yellow-700">
              <h2 className="text-xl font-bold text-gray-800 mb-4" style={{ color: '#845714' }}>
                Why Seek Counselling?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                <div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Professional guidance in a safe environment</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Confidential and judgment-free support</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Develop healthy coping mechanisms</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Improve academic performance</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Build stronger relationships</span>
                    </li>
                    <li className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-yellow-700 mr-2"></div>
                      <span>Enhance overall well-being</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

          {/* Footer Note */}
          <div className="border-t border-gray-200 p-6 bg-gray-50">
            <p className="text-center text-gray-700 font-medium">
              Remember: Seeking help is a sign of strength, not weakness. Your well-being matters to us.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}