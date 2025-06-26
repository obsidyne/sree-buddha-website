"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// Reusable components
const SectionTitle = ({ children }) => (
  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">
    {children}
  </h2>
);

const SectionSubtitle = ({ children }) => (
  <div className="flex justify-center items-center mb-8 md:mb-12 px-2">
    <div className="w-8 sm:w-12 md:w-16 h-1 bg-yellow-900 mr-2 md:mr-4 hidden sm:block"></div>
    <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 text-center">
      {children}
    </h3>
    <div className="w-8 sm:w-12 md:w-16 h-1 bg-yellow-900 ml-2 md:ml-4 hidden sm:block"></div>
  </div>
);

const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${active
      ? 'bg-yellow-900 text-white'
      : 'bg-yellow-50 text-yellow-900 hover:bg-yellow-100'
      } mb-2 mr-2`}
  >
    {children}
  </button>
);

const PublicationCard = ({ publication, highlight = false }) => {
  const cardClasses = highlight
    ? "bg-gradient-to-tr from-yellow-50 to-white border-l-4 border-yellow-900"
    : "bg-white hover:bg-yellow-50";

  return (
    <motion.div
      className={`p-4 sm:p-6 rounded-lg shadow-md mb-4 sm:mb-6 ${cardClasses} transition-all duration-300`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col">
        <div className="w-full">
          <h4 className="font-bold text-base sm:text-lg mb-2 text-gray-900">
            {publication.publication_description}
          </h4>
          <p className="text-yellow-900 mb-2 sm:mb-3 text-sm sm:text-base">
            {publication.Publisher_name}
          </p>
          <p className="text-gray-700 mb-1 text-sm sm:text-base">
            <span className="font-medium">Publication:</span> {publication.publish_at}
          </p>
          {publication.publication_link && (
            <p className="text-gray-600 text-xs sm:text-sm">
              {publication.publication_link}
            </p>
          )}
        </div>
        <div className="flex flex-row justify-between items-center mt-4">
          <div className="bg-yellow-100 text-yellow-900 px-2 sm:px-3 py-1 rounded-full text-center text-xs sm:text-sm font-medium">
            {publication.Category}
          </div>
          <p className="text-gray-500 font-bold text-sm sm:text-base">{publication.publication_date}</p>
          {publication.featured && (
            <div className="text-xs bg-yellow-900 text-white px-2 py-1 rounded">
              Featured
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const PublicationStats = ({ publications }) => {
  // Calculate statistics
  const stats = useMemo(() => {
    const totalPubs = publications.length;
    const journalPubs = publications.filter(p => p.Category === 'Journal').length;
    const conferencePubs = publications.filter(p => p.Category === 'Conference').length;
    const yearCounts = publications.reduce((acc, pub) => {
      acc[pub.publication_date] = (acc[pub.publication_date] || 0) + 1;
      return acc;
    }, {});

    return {
      totalPubs,
      journalPubs,
      conferencePubs,
      yearCounts
    };
  }, [publications]);



};

// Main component
export default function MechanicalDepartmentPaperPublications() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [authorFilter, setAuthorFilter] = useState('all');
  const [publications, setPublications] = useState([]);
  const [filteredPublications, setFilteredPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI}/api/cse-depts?filters[Dept_name][$eq]=me&populate[Publication]=*`
        );


        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const responseData = await response.json();
        console.log("Full API Response:", responseData);

        // Extract publications from the correct path in the data structure based on the provided sample
        if (responseData &&
          responseData.data &&
          Array.isArray(responseData.data) &&
          responseData.data.length > 0 &&
          responseData.data[0].Publication &&
          Array.isArray(responseData.data[0].Publication)) {

          const publicationsData = responseData.data[0].Publication;
          console.log("Found publications:", publicationsData);

          setPublications(publicationsData);
          setFilteredPublications(publicationsData);
        } else {
          console.error("Could not find Publications array in the response structure:", responseData);
          setError("Could not find publications data in the API response.");
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching publications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get unique years for filter
  const years = useMemo(() => {
    if (!publications.length) return [];
    const uniqueYears = [...new Set(publications.map(pub => pub.publication_date))];
    return uniqueYears.sort((a, b) => b - a); // Sort in descending order
  }, [publications]);

  // Get unique authors for filter
  const authors = useMemo(() => {
    if (!publications.length) return [];
    const uniqueAuthors = [...new Set(publications.map(pub => pub.Publisher_name))];
    return uniqueAuthors.sort();
  }, [publications]);

  // Filter publications
  useEffect(() => {
    let result = [...publications];

    // Filter by publication type
    if (filter !== 'all') {
      result = result.filter(pub => pub.Category && pub.Category.toLowerCase() === filter.toLowerCase());
    }

    // Filter by year
    if (yearFilter !== 'all') {
      result = result.filter(pub => pub.publication_date === parseInt(yearFilter));
    }

    // Filter by author
    if (authorFilter !== 'all') {
      result = result.filter(pub => pub.Publisher_name === authorFilter);
    }

    // Filter by search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(pub =>
        (pub.publication_description && pub.publication_description.toLowerCase().includes(term)) ||
        (pub.publish_at && pub.publish_at.toLowerCase().includes(term)) ||
        (pub.Publisher_name && pub.Publisher_name.toLowerCase().includes(term))
      );
    }

    setFilteredPublications(result);
  }, [filter, searchTerm, yearFilter, authorFilter, publications]);

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <header className="relative bg-gradient-to-b from-yellow-50 to-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-900/10 pattern-diagonal-lines pattern-yellow-500/20 pattern-bg-white pattern-size-4" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mb-4">
              Department Of Mechanical Engineering
            </h1>
            <div className="w-20 sm:w-40 h-1 bg-yellow-900 mx-auto mb-4 sm:mb-8" aria-hidden="true" />

            <SectionSubtitle>PUBLICATIONS/CONFERENCE DETAILS</SectionSubtitle>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12">
        {/* Filter and Search Section */}
        <section className="mb-8 sm:mb-12">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-100">
            <div className="flex flex-wrap justify-between items-center mb-4">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Filter Publications</h3>

            </div>

            {/* Search Box */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search publications, authors, journals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-900 focus:border-yellow-900 transition-colors text-sm sm:text-base"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Expanded Filter Options */}
            {isFilterMenuOpen && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                {/* Publication Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Publication Type</label>
                  <select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-900 focus:border-yellow-900"
                  >
                    <option value="all">All Types</option>
                    <option value="journal">Journal</option>
                    <option value="conference">Conference</option>
                  </select>
                </div>

                {/* Year Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <select
                    value={yearFilter}
                    onChange={(e) => setYearFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-900 focus:border-yellow-900"
                  >
                    <option value="all">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                {/* Author Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <select
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-900 focus:border-yellow-900"
                  >
                    <option value="all">All Authors</option>
                    {authors.map(author => (
                      <option key={author} value={author}>{author}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Quick Filter Buttons */}
            <div>
              <div className="flex flex-wrap">
                <FilterButton active={filter === 'all'} onClick={() => setFilter('all')}>
                  All
                </FilterButton>
                <FilterButton active={filter === 'journal'} onClick={() => setFilter('journal')}>
                  Journals
                </FilterButton>
                <FilterButton active={filter === 'conference'} onClick={() => setFilter('conference')}>
                  Conferences
                </FilterButton>

              </div>
            </div>
          </div>
        </section>

        {/* Publication Stats */}
        {!loading && !error && filteredPublications.length > 0 && <PublicationStats publications={filteredPublications} />}

        {/* Publications List */}
        <section>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-900"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 sm:py-16">
              <div className="text-6xl sm:text-9xl mb-4">⚠️</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">Error Loading Data</h3>
              <p className="text-gray-600 text-sm sm:text-base">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 bg-yellow-900 text-white rounded-lg hover:bg-yellow-800 transition-colors text-sm sm:text-base"
              >
                Retry
              </button>
            </div>
          ) : filteredPublications.length > 0 ? (
            <div className="space-y-4 sm:space-y-6">
              {filteredPublications.map(pub => (
                <PublicationCard key={pub.id} publication={pub} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 sm:py-16">
              <div className="text-6xl sm:text-9xl mb-4">🔍</div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-2">No publications found</h3>
              <p className="text-gray-600 text-sm sm:text-base">Try adjusting your filters or search terms</p>
              <button
                onClick={() => {
                  setFilter('all');
                  setYearFilter('all');
                  setAuthorFilter('all');
                  setSearchTerm('');
                }}
                className="mt-4 sm:mt-6 px-4 sm:px-6 py-2 bg-yellow-900 text-white rounded-lg hover:bg-yellow-800 transition-colors text-sm sm:text-base"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </section>

        {!loading && !error && filteredPublications.length > 0 && (
          <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500">
            Showing {filteredPublications.length} of {publications.length} publications
          </div>
        )}
      </main>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 p-2 rounded-full bg-yellow-900 text-white shadow-lg hover:bg-yellow-800 transition-colors z-10"
        aria-label="Scroll to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
      </button>
    </div>
  );
}