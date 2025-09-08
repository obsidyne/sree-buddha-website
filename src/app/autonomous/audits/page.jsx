'use client';
import React, { useState, useEffect } from 'react';
import DownloadButton from '@/components/common/DownloadButton';

export default function Page() {
  const [documents, setDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  const fetchAuditDocuments = async () => {
    setIsLoading(true);
    setApiError(null);
    
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI}/api/autonomous?populate[audits][populate]=file`,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Debug logging
      console.log('=== AUDITS DEBUG ===');
      console.log('Full Response:', data);
      console.log('Data:', data?.data);
      console.log('Audits:', data?.data?.audits);
      
      let processedDocuments = [];
      
      // Process audit documents based on API structure
      if (data?.data?.audits && Array.isArray(data.data.audits)) {
        console.log('Found audits array:', data.data.audits);
        
        processedDocuments = data.data.audits.map((item, index) => {
          console.log(`Processing audit ${index}:`, item);
          return {
            id: item.id || `audit-${index}`,
            title: item.Tittle || item.Title || item.title || `Audit Document ${index + 1}`,
            link: item.file ? `${process.env.NEXT_PUBLIC_STRAPI}${item.file.url}` : null,
            fileSize: item.file ? Math.round(item.file.size / 1024) : null,
            fileName: item.file ? item.file.name : null
          };
        }).filter(doc => doc.link); // Only include documents that have a valid file link
      } else {
        console.log('No valid audits array found');
      }
      
      console.log('=== FINAL RESULTS ===');
      console.log('Processed Documents:', processedDocuments);
      
      setDocuments(processedDocuments);
      
    } catch (error) {
      console.error('Error fetching audit documents:', error);
      setApiError(`Failed to load audit documents: ${error.message}`);
      setDocuments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAuditDocuments();
  }, []);

  if (isLoading) {
    return (
      <div className='page'>
        <h3 className='page_heading'>Audits</h3>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='page'>
      <h3 className='page_heading'>Audits</h3>

      {/* API Error Display */}
      {apiError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-red-700">{apiError}</p>
          </div>
          <button 
            onClick={fetchAuditDocuments}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      )}

      <div>
        {documents.length === 0 && !isLoading ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-500">No audit documents available.</p>
          </div>
        ) : (
          documents.map((document, index) => (
            <div key={document.id || index} className="mb-2">
              <DownloadButton 
                title={document.title} 
                link={document.link} 
              />
              {/* {document.fileSize && (
                <p className="text-xs text-gray-400 ml-4 mt-1">
                  File: {document.fileName} ({document.fileSize} KB)
                </p>
              )} */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}