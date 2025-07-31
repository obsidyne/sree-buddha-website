"use client"

import React, { useState, useEffect } from 'react';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = `${process.env.NEXT_PUBLIC_STRAPI}/api/newss?populate=News_media`;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        
        const data = await response.json();
        setEvents(data.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Unable to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Format date to a more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-10">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <nav className="text-sm">
          <ol className="list-none p-0 flex text-gray-500">
            <li className="flex items-center">
              <a href="#" className="hover:text-amber-700">Home</a>
              <svg className="h-4 w-4 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            <li className="text-amber-800 font-medium">Events</li>
          </ol>
        </nav>
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-10">
          {/* Hero section */}
          <div className="relative h-48 md:h-64 overflow-hidden">
            <img 
             src="/assets/images/profile_pic.png"
              alt="College Events" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black opacity-40"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h2 className="text-2xl md:text-3xl font-bold">College News</h2>
              <p className="text-sm md:text-base">Know and whats happening in the campus</p>
            </div>
          </div>

          {/* Content section */}
          <div className="p-6 md:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">CAMPUS NEWS</h1>
            <div className="w-16 h-1 bg-amber-800 mb-6"></div>
            
            {/* Loading state */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
                <p className="mt-4 text-gray-600">Loading events...</p>
              </div>
            )}
            
            {/* Error state */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-600">{error}</span>
                </div>
              </div>
            )}
            
            {/* Events grid */}
            {!loading && !error && events.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  
                  <div 
                    key={event.id} 
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => window.location.href = `/news/${event.documentId}`}
                  >
                    <div className="relative h-48">
                    <img 
  src={ event.News_media?   `${process.env.NEXT_PUBLIC_STRAPI}${event.News_media.formats.medium.url}` : ''}

  
  alt={event.Heading} 
  className="w-full h-full object-cover"
/>
                      <div className="absolute top-0 right-0 bg-amber-800 text-white py-1 px-3 rounded-bl-lg">
                        {formatDate(event.publishedAt)}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-amber-700 mb-2">{event.Heading}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{event.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-amber-700 font-medium text-sm">View Details</span>
                        <svg className="w-4 h-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Empty state */}
            {!loading && !error && events.length === 0 && (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No events available</h3>
                <p className="text-gray-600">Check back later for upcoming events.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}