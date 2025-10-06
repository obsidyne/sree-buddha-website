// Next.js page component for /anti-ragging
'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';

export default function AntiRaggingCell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = 'http://91.99.112.1:1337';
  const BASE_URL = 'http://91.99.112.1:1337';
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/anti-ragging-cell?populate[anti_ragging_member][populate]=*&populate[anti_ragging_events][populate]=image&populate[anti_ragging_workshops][populate]=image&populate[orders][populate]=PDF&populate[anti_ragging_important_links][populate]=*`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.mobile-menu') && !e.target.closest('.menu-button')) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [menuOpen]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{fontFamily: "'Poppins', sans-serif"}}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4" style={{borderColor: '#667eea', borderTopColor: 'transparent'}}></div>
          <p className="text-lg" style={{color: '#2c3e50'}}>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{fontFamily: "'Poppins', sans-serif"}}>
        <div className="text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  const squadMembers = data?.anti_ragging_member?.sort((a, b) => a.No - b.No) || [];
  const events = data?.anti_ragging_events || [];
  const workshops = data?.anti_ragging_workshops || [];
  const orders = data?.orders || [];
  const importantLinks = data?.anti_ragging_important_links || [];

  return (
    <>
      <div className="min-h-screen bg-gray-50" style={{fontFamily: "'Poppins', sans-serif"}}>
        
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12" style={{fontFamily: "'Poppins', sans-serif", color: '#2c3e50'}}>
                {data?.title || '"Ragging is Strictly Prohibited in the Campus"'}
              </h2>
              <div className="space-y-6 text-lg leading-relaxed" style={{color: '#555', fontFamily: "'Poppins', sans-serif"}}>
                <p>
                  {data?.description || 'The Kerala Prohibition of Ragging Act 1988 is in force and those found guilty of ragging will be liable to be punished with imprisonment up to 2 years along with fine.'}
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Squad Members Section */}
        {squadMembers.length > 0 && (
          <section className="py-20 bg-white" id="squad">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16" style={{fontFamily: "'Poppins', sans-serif", color: '#2c3e50'}}>
                Anti-Ragging Squad Members
              </h2>
              
              <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl overflow-hidden" style={{boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'}}>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr style={{background: '#f8f9fa', borderBottom: '2px solid #dee2e6'}}>
                          <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: '#495057', fontFamily: "'Poppins', sans-serif"}}>No</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: '#495057', fontFamily: "'Poppins', sans-serif"}}>Position</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: '#495057', fontFamily: "'Poppins', sans-serif"}}>Name</th>
                          <th className="px-6 py-4 text-left text-sm font-semibold" style={{color: '#495057', fontFamily: "'Poppins', sans-serif"}}>Contact Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {squadMembers.map((member, index) => (
                          <tr key={index} className="transition-colors hover:bg-gray-50" style={{borderBottom: '1px solid #dee2e6'}}>
                            <td className="px-6 py-4" style={{color: '#212529', fontFamily: "'Poppins', sans-serif"}}>{member.No}</td>
                            <td className="px-6 py-4 font-medium" style={{color: '#212529', fontFamily: "'Poppins', sans-serif"}}>{member.region}</td>
                            <td className="px-6 py-4" style={{color: '#212529', fontFamily: "'Poppins', sans-serif"}}>{member.name}</td>
                            <td className="px-6 py-4">
                              <a href={`tel:${member.phone}`} className="font-medium hover:underline" style={{color: '#667eea', fontFamily: "'Poppins', sans-serif"}}>
                                {member.phone}
                              </a>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Events Section */}
        {events.length > 0 && (
          <section className="py-20" style={{background: '#f8f9fa'}}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16" style={{fontFamily: "'Poppins', sans-serif", color: '#2c3e50'}}>
                Anti-Ragging Events
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {events.map((event, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl" style={{boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'}}>
                    <div className="h-48 overflow-hidden" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                      {event.image ? (
                        <img 
                          src={`${BASE_URL}${event.image.url}`} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white text-4xl font-bold" style={{fontFamily: "'Poppins', sans-serif"}}>Event</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2" style={{color: '#2c3e50', fontFamily: "'Poppins', sans-serif"}}>{event.title}</h3>
                      <p className="leading-relaxed" style={{color: '#666', fontFamily: "'Poppins', sans-serif"}}>{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Workshops Section */}
        {workshops.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16" style={{fontFamily: "'Poppins', sans-serif", color: '#2c3e50'}}>
                Awareness Workshops
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {workshops.map((workshop, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl" style={{boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'}}>
                    <div className="h-48 overflow-hidden" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                      {workshop.image ? (
                        <img 
                          src={`${BASE_URL}${workshop.image.url}`} 
                          alt={workshop.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-white text-4xl font-bold" style={{fontFamily: "'Poppins', sans-serif"}}>Workshop</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2" style={{color: '#2c3e50', fontFamily: "'Poppins', sans-serif"}}>{workshop.title}</h3>
                      <p className="leading-relaxed" style={{color: '#666', fontFamily: "'Poppins', sans-serif"}}>{workshop.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Orders Section */}
        {orders.length > 0 && (
          <section className="py-20" style={{background: '#f8f9fa'}}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16" style={{fontFamily: "'Poppins', sans-serif", color: '#2c3e50'}}>
                Official Orders & Documents
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-xl overflow-hidden" style={{boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'}}>
                  <div className="divide-y divide-gray-200">
                    {orders.map((order, index) => (
                      <div key={index} className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <h3 className="text-base sm:text-lg font-medium break-words" style={{color: '#2c3e50', fontFamily: "'Poppins', sans-serif"}}>{order.title}</h3>
                        </div>
                        {order.PDF && (
                          <a 
                            href={`${BASE_URL}${order.PDF.url}`} 
                            download 
                            className="px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 w-full sm:w-auto justify-center whitespace-nowrap"
                            style={{background: '#f39c12', color: 'white', fontFamily: "'Poppins', sans-serif"}}
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                            </svg>
                            Download
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Important Links Section */}
        {importantLinks.length > 0 && (
          <section className="py-20 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16" style={{fontFamily: "'Poppins', sans-serif", color: '#2c3e50'}}>
                Important Links
              </h2>
              
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {importantLinks.map((link, index) => (
                    <a 
                      key={index}
                      href={link.link.startsWith('http') ? link.link : `https://${link.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white rounded-xl p-6 flex items-center justify-between transition-all duration-300 hover:shadow-xl group"
                      style={{boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'}}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium" style={{color: '#2c3e50', fontFamily: "'Poppins', sans-serif"}}>{link.title}</h3>
                      </div>
                      <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" style={{color: '#667eea'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
        
      </div>
    </>
  );
}