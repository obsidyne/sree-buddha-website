"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SectionHeader = ({ title }) => (
  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900 border-l-4 border-yellow-900 pl-4 py-1">
      {title}
    </h2>
  </div>
);

const AssociationCard = ({ title, description, logo = null }) => (
  <motion.div
    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md mb-6"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="p-4">
      <div className="flex items-center mb-3">
        {logo && <div className="mr-3 flex-shrink-0">{logo}</div>}
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
      </div>
      <div className="prose prose-gray max-w-none">
        <p className="text-gray-700 text-justify">{description}</p>
      </div>
    </div>
  </motion.div>
);

export default function EEEDepartmentAssociations() {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssociations = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://sbce.ac.in/api/cse-depts?filters[Dept_name][$eq]=EEE&populate=Association_and_clubs'
        );

        if (!response.ok) {
          throw new Error(`API call failed: ${response.status}`);
        }

        const json = await response.json();
        const clubs = json.data?.[0]?.Association_and_clubs || [];

        const processedData = clubs.map((assoc) => ({
          id: assoc.id,
          title: assoc.Heading,
          description: assoc.Description,
          logo: (
            <div className="w-10 h-10 rounded-full bg-yellow-900 flex items-center justify-center text-white font-bold text-sm">
              {assoc.Heading?.split(' ')?.[0]?.substring(0, 4).toUpperCase() || "CLB"}
            </div>
          ),
        }));

        setAssociations(processedData);
      } catch (err) {
        console.error("Error fetching associations data:", err);
        setError(err.message);

        // Fallback data
        setAssociations([
          

        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAssociations();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <style jsx global>{`
        .text-justify {
          text-align: justify;
        }
      `}</style>

<header className="relative bg-gradient-to-b from-yellow-50 to-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-900/10 pattern-diagonal-lines pattern-yellow-500/20 pattern-bg-white pattern-size-4" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center text-gray-900 mb-3 sm:mb-4">
              Department Of Electrical & Electronics Engineering
            </h1>
            <div className="w-24 sm:w-32 md:w-40 h-1 bg-yellow-900 mx-auto mb-4 sm:mb-6 md:mb-8" aria-hidden="true" />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center text-gray-800">Association and Clubs</h2>
          </div>
        </div>
      </header>


      <main className="max-w-5xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-900"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> Could not load associations data. Please try again later.</span>
          </div>
        ) : (
          <>
            <SectionHeader title="Department Associations" />
            <div>
              {associations.map((association) => (
                <AssociationCard key={association.id} {...association} />
              ))}
            </div>

            <div className="mt-12">
              <SectionHeader title="Get Involved" />
              <div className="bg-yellow-50 rounded-lg p-4 shadow-sm">
                <h3 className="text-lg font-bold mb-3 text-yellow-900">Join Our Associations</h3>
                <p className="text-gray-700 mb-4 text-justify">
                  Get involved with our department associations to enhance your skills, network with professionals,
                  and participate in exciting events and competitions.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-base mb-2">How to Join</h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      <li>Contact the Department Coordinator</li>
                      <li>Fill out the membership form</li>
                      <li>Attend the orientation meeting</li>
                      <li>Pay the membership fee, if applicable</li>
                    </ul>
                  </div>

                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium text-base mb-2">Benefits</h4>
                    <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                      <li>Access to workshops and seminars</li>
                      <li>Research activity participation</li>
                      <li>Industry professional networking</li>
                      <li>Leadership skill development</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
