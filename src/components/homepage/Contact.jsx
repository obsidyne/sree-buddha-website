"use client";
import React from 'react'

function Contact() {
    return (
        <div>           <div className="relative overflow-hidden bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              animation: "slide 20s linear infinite"
            }}
          ></div>
        </div>

        {/* Main content */}

         <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left side - Text content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold text-white animate-fade-in-up">
                    Contact Us
                  </h1>
                  <p className="text-xl text-yellow-100 leading-relaxed animate-fade-in-up-delay-1">
                    Get in touch with us for any queries about admissions, programs, or general information.
                    Our team is here to help you.
                  </p>
                </div>

                {/* Quick contact options */}
                <div className="flex flex-wrap gap-4 mt-8 animate-fade-in-up-delay-2">
                  <a href="tel:+914792375440"
                    className="inline-flex items-center px-6 py-3 bg-white text-yellow-900 rounded-full hover:bg-yellow-100 transition-all transform hover:scale-105">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    Call Now
                  </a>
                  <a href="mailto:principal@sbce.ac.in"
                    className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-yellow-900 transition-all transform hover:scale-105">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Email Us
                  </a>
                </div>
              </div>

              {/* Right side - Interactive element */}
              <div className="hidden md:block">
                <div className="relative transform hover:scale-105 transition-transform duration-300">
                  <div className="absolute inset-0 bg-yellow-600 rounded-lg transform rotate-3 opacity-20"></div>
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-lg p-8 text-white">
                    <h3 className="text-2xl font-semibold mb-4">Quick Contact</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-sm text-yellow-100">Pattoor P.O., Nooranad</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Phone</p>
                          <p className="text-sm text-yellow-100">+91 9446014317</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Email</p>
                          <p className="text-sm text-yellow-100">principal@sbce.ac.in</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div></div></div>
    )
}

export default Contact