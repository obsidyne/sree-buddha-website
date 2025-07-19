'use client';
import React, { useState, useEffect } from 'react';
import './eoa.css';

function Page() {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const API_URL = `${process.env.NEXT_PUBLIC_STRAPI}/api/eoas?populate=*`;

  useEffect(() => {
    const fetchPdfFiles = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(API_URL);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        // Map the response to extract handbook names and PDF URLs
        const files = data.data.map((item, index) => ({
          id: item.id || index,
          name: item.heading || 'Unnamed Document',
          order: item.order || 0, // Default order if not provided
          path: new URL(item.EoA_pdf[0].url, process.env.NEXT_PUBLIC_STRAPI).href, // Properly join URLs
        }));

        // Sort files by order (descending) - fixed sorting algorithm
        const sortedFiles = files.sort((a, b) => b.order - a.order);

        console.log('Fetched and sorted files:', sortedFiles);
        setPdfFiles(sortedFiles);
        
      } catch (error) {
        console.error('Error fetching PDF files:', error);
        setError('Failed to load PDF files. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPdfFiles();
  }, [API_URL]);

  const handleClick = (pdfPath, pdfName) => {
    try {
      window.open(pdfPath, '_blank', 'noopener,noreferrer');
    } catch (error) {
      console.error('Error opening PDF:', error);
      alert('Unable to open PDF. Please try again.');
    }
  };

  const handleKeyPress = (event, pdfPath, pdfName) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick(pdfPath, pdfName);
    }
  };

  if (loading) {
    return (
      <div className="app-container">
        <h1 style={{ textAlign: 'left', fontFamily: 'Poppins, sans-serif', color: '#73501c' }}>
          AICTE&nbsp; EoA
        </h1>
        <hr />
        <br />
        <div className="loading-message" style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif' }}>Loading PDF files...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <h1 style={{ textAlign: 'left', fontFamily: 'Poppins, sans-serif', color: '#73501c' }}>
          AICTE&nbsp; EoA
        </h1>
        <hr />
        <br />
        <div className="error-message" style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: '#e74c3c' }}>
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              marginTop: '10px', 
              padding: '10px 20px', 
              fontFamily: 'Poppins, sans-serif',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1 style={{ textAlign: 'left', fontFamily: 'Poppins, sans-serif', color: '#73501c' }}>
        AICTE&nbsp; EoA
      </h1>
      <hr />
      <br />
      
      {pdfFiles.length === 0 ? (
        <div className="no-files-message" style={{ textAlign: 'center', padding: '20px' }}>
          <p style={{ fontFamily: 'Poppins, sans-serif', color: '#666' }}>
            No PDF files available at the moment.
          </p>
        </div>
      ) : (
        <ul className="pdf-list" role="list">
          {pdfFiles.map((pdf) => (
            <li
              key={pdf.id}
              className="pdf-item"
              onClick={() => handleClick(pdf.path, pdf.name)}
              onKeyPress={(e) => handleKeyPress(e, pdf.path, pdf.name)}
              tabIndex={0}
              role="button"
              aria-label={`Open ${pdf.name} PDF in new tab`}
              style={{ cursor: 'pointer' }}
            >
              <i 
                className="far fa-file-pdf" 
                style={{ marginRight: '10px', color: '#e74c3c' }}
                aria-hidden="true"
              ></i>
              <span style={{ fontFamily: 'Poppins, sans-serif' }}>
                {pdf.name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Page;