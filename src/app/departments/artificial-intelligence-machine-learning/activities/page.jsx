"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AimlDepartmentActivities() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Categories for filtering (adjusted to match your API response)
  const categories = [
    { id: 'all', name: 'All Activities', icon: '📋' },
    { id: 'Workshop', name: 'Workshops', icon: '🔧' },
    { id: 'Competition', name: 'Competitions', icon: '🏆' },
    { id: 'Lectures', name: 'Guest Lectures', icon: '🎓' },
    { id: 'Seminar', name: 'Seminars', icon: '💬' },
    { id: 'Visit', name: 'Industry Visits', icon: '🚌' }
  ];

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI}/api/cse-depts?filters[Dept_name][$eq]=AI_ML&fields=Dept_name&populate=Activities.Images`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const data = await response.json();
        
        // Check if we have department data and activities in the response
        if (data.data && data.data.length > 0) {
          // Get the first department (EEE department)
          const department = data.data[0];
          
          if (department.Activities && department.Activities.length > 0) {
            // Map activities to the format expected by the component
            const mappedActivities = department.Activities.map(activity => {
              // Get the image URL if available
              let imageUrl = "/assets/images/departments/activities/placeholder.jpg";
              if (activity.Images && activity.Images.length > 0) {
                // Use medium format if available, otherwise use the original
                const image = activity.Images[0];
                if (image.formats && image.formats.medium) {
                  imageUrl = `${process.env.NEXT_PUBLIC_STRAPI}${image.formats.medium.url}`;
                } else if (image.formats && image.formats.small) {
                  imageUrl = `${process.env.NEXT_PUBLIC_STRAPI}${image.formats.small.url}`;
                } else {
                  imageUrl = `${process.env.NEXT_PUBLIC_STRAPI}${image.url}`;
                }
              }
              
              return {
                id: activity.id,
                title: activity.Heading || "Untitled Activity",
                category: activity.Category || "Other",
                date: activity.Date || "No date specified",
                location: activity.Venue || "Not specified",
                image: imageUrl,
                description: activity.About_activity || "No description available",
                coordinator: "Department Faculty" // Default value as coordinator is not provided in API
              };
            });
            
            setActivities(mappedActivities);
          } else {
            setActivities([]);
          }
        } else {
          setActivities([]);
        }
      } catch (err) {
        console.error("Error fetching department data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter activities based on active category
  const filteredActivities = activeFilter === 'all'
    ? activities
    : activities.filter(activity => activity.category === activeFilter);

  // Get recent activities - assuming activities are sorted by date
  const recentActivities = [...activities].sort((a, b) => {
    if (a.date === "No date specified") return 1;
    if (b.date === "No date specified") return -1;
    return new Date(b.date) - new Date(a.date);
  }).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="relative bg-gradient-to-b from-yellow-50 to-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-900/10 pattern-diagonal-lines pattern-yellow-500/20 pattern-bg-white pattern-size-4" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
              Department Of Artificial Intelligence & Machine Learning Engineering
            </h1>
            <div className="w-24 sm:w-32 md:w-40 h-1 bg-yellow-900 mx-auto mb-4 sm:mb-6 md:mb-8" aria-hidden="true" />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800">Activities</h2>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
        {/* Activity Description */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="bg-yellow-50 rounded-lg p-4 sm:p-6 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4 border-l-4 border-yellow-900 pl-2 sm:pl-3">
              Department Activities
            </h3>
            <p className="text-sm sm:text-base text-gray-700">
              The Department of Artificial Intelligence & Machine Learning Engineering at Sree Buddha College of Engineering conducts
              various activities throughout the academic year to enhance the technical skills and practical
              knowledge of students. These activities include workshops, technical competitions, guest lectures,
              industry visits, and seminars. These initiatives help students stay updated with the latest
              technologies and industry trends.
            </p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 sm:mb-8 md:mb-10 sticky top-0 bg-white pt-3 pb-3 sm:pt-4 sm:pb-4 z-10 shadow-sm rounded-lg">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-4 px-1">Filter Activities:</h3>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveFilter(category.id)}
                className={`px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-full flex items-center gap-1 sm:gap-2 transition-colors text-xs sm:text-sm md:text-base ${
                  activeFilter === category.id
                    ? 'bg-yellow-900 text-white'
                    : 'bg-yellow-50 text-yellow-900 hover:bg-yellow-100'
                }`}
              >
                <span role="img" aria-hidden="true">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
                <span className="sm:hidden">
                  {category.id === 'all' ? 'All' :
                    category.id === 'Workshop' ? 'Workshops' :
                    category.id === 'Competition' ? 'Comps' :
                    category.id === 'Lectures' ? 'Lectures' :
                    category.id === 'Seminar' ? 'Seminars' :
                    'Visits'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-yellow-900 border-t-transparent"></div>
            <p className="mt-4 text-gray-700">Loading activities...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12 bg-red-50 rounded-lg">
            <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-medium text-red-800 mb-2">Error Loading Data</h3>
            <p className="text-red-600">{error}</p>
            <p className="mt-4 text-gray-600">Please try refreshing the page or contact support.</p>
          </div>
        )}

        {/* Activities Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredActivities.map(activity => (
              <div
                key={activity.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg border border-gray-200 transition-shadow duration-300"
              >
                <div className="relative h-40 sm:h-48">
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/images/departments/activities/placeholder.jpg";
                    }}
                  />
                </div>

                <div className="p-3 sm:p-4 md:p-5">
                  <div className="flex justify-between items-start mb-2">
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-900 text-xs font-semibold rounded-full uppercase tracking-wide">
                      {activity.category}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-600">{activity.date}</span>
                  </div>

                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-1 sm:mb-2 line-clamp-2">{activity.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-4 line-clamp-3">{activity.description}</p>

                  <div className="flex items-center justify-between mt-2 sm:mt-4 border-t border-gray-100 pt-2 sm:pt-3">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-900 mr-1 sm:mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <span className="text-xs sm:text-sm text-gray-600 truncate max-w-[120px] sm:max-w-full">{activity.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Activities Found */}
        {!loading && !error && filteredActivities.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <svg className="w-12 sm:w-16 h-12 sm:h-16 text-yellow-300 mx-auto mb-3 sm:mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-lg sm:text-xl font-medium text-gray-700">No activities found</h3>
            <p className="text-sm sm:text-base text-gray-500 mt-1">Try changing your filter selection</p>
            <button
              onClick={() => setActiveFilter('all')}
              className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition-colors text-sm sm:text-base"
            >
              Show All Activities
            </button>
          </div>
        )}

        {/* Recent Activities Section */}
        {!loading && !error && activities.length > 0 && (
          <div className="mt-10 sm:mt-12 md:mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 border-l-4 border-yellow-900 pl-3">
              Recent Activities
            </h3>
            <div className="bg-white rounded-lg shadow-md overflow-hidden overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-yellow-50">
                  <tr>
                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Activity
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Location
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentActivities.length > 0 ? (
                    recentActivities.map((activity) => (
                      <tr key={`recent-${activity.id}`} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-normal text-xs sm:text-sm font-medium text-gray-900">
                          {activity.title}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                          {activity.date}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-normal text-xs sm:text-sm text-gray-500">
                          {activity.location}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-normal text-xs sm:text-sm text-gray-500">
                          {activity.category}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-3 sm:px-6 py-4 text-center text-sm text-gray-500">
                        No recent activities available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}