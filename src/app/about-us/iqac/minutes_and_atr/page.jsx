"use client"

import React, { useState, useEffect } from 'react';
import "./style.css"

export default function Page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/iqac-meetings-and-atrs?pagination[pageSize]=1000&populate=*`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const result = await response.json();
      setData(result.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // Group data by year
  const groupedData = data.reduce((acc, item) => {
    const year = item.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {});

  // Sort years in ascending order
  const sortedYears = Object.keys(groupedData).sort((a, b) => {
    const yearA = parseInt(a.split('-')[0]);
    const yearB = parseInt(b.split('-')[0]);
    return yearA - yearB;
  });

  if (loading) {
    return (
      <div className=''>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading IQAC data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className=''>
        <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          <p>Error: {error}</p>
          <button onClick={fetchData}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className='page'>
      <div id="tabs-7">
        {sortedYears.map((year) => (
          <div key={year} className="meeting_year">
            <h3>{year}</h3>
            <div className="meeting_minutes_links">
              {groupedData[year].map((item) => (
                <a
                  key={item.id}
                  href={`${process.env.NEXT_PUBLIC_STRAPI}${item.file.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}