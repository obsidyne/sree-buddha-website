'use client';

import React, { useState, useEffect } from 'react';
import DownloadButton from '@/components/common/DownloadButton';

export default function Page() {
    const [pdfDocuments, setPdfDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGoverningBody = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/autonomous?populate[governing_body][populate]=*&pagination[limit]=-1`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Transform the API data to match the expected format
                const transformedDocuments = data.data.governing_body
                    .filter(item => item.PDF || item.pdf) // Check for both PDF and pdf fields
                    .sort((a, b) => {
                        // Handle null/undefined priorities - put them at the end
                        const priorityA = a.priority ?? 999;
                        const priorityB = b.priority ?? 999;
                        return priorityA - priorityB;
                    }) // Sort by priority (1, 2, 3, etc.)
                    .map(item => ({
                        title: item.Tittle || item.title, // Handle both field names
                        link: `${process.env.NEXT_PUBLIC_STRAPI}${(item.PDF || item.pdf).url}`,
                        priority: item.priority // Include priority for debugging
                    }));
                
                setPdfDocuments(transformedDocuments);
            } catch (err) {
                console.error('Error fetching governing body documents:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGoverningBody();
    }, []);

    if (loading) {
        return (
            <div className='page'>
                <h3 className='page_heading'>Governing Body</h3>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <span className="ml-2">Loading governing body documents...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='page'>
                <h3 className='page_heading'>Governing Body</h3>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Error:</strong> Failed to load governing body documents. {error}
                </div>
            </div>
        );
    }

    return (
        <div className='page'>
            <h3 className='page_heading'>Governing Body</h3>
            <div>
                {pdfDocuments.length > 0 ? (
                    pdfDocuments.map((document, index) => {
                        return (
                            <DownloadButton 
                                key={index} 
                                title={document.title} 
                                link={document.link} 
                            />
                        );
                    })
                ) : (
                    <p className="text-gray-600">No governing body documents available.</p>
                )}
            </div>
        </div>
    );
}