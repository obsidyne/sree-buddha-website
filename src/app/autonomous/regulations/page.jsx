'use client';

import React, { useState, useEffect } from 'react';
import DownloadButton from '@/components/common/DownloadButton';

export default function Page() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRegulations = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/autonomous?populate[regulations][populate]=*&pagination[limit]=-1`);
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const data = await response.json();
                
                // Check if regulations field exists
                if (!data.data.regulations) {
                    setDocuments([]);
                    return;
                }
                
                // Transform the API data to match the expected format
                const transformedDocuments = data.data.regulations
                    .filter(item => {
                        // Check for various file field names (PDF, pdf, file, image, etc.)
                        return item.PDF || item.pdf || item.file || item.image || item.attachment;
                    })
                    .sort((a, b) => {
                        // Handle null/undefined priorities - put them at the end
                        const priorityA = a.priority ?? 999;
                        const priorityB = b.priority ?? 999;
                        return priorityA - priorityB;
                    }) // Sort by priority (1, 2, 3, etc.)
                    .map(item => {
                        // Get the file object (could be PDF, image, or other file type)
                        const fileObj = item.PDF || item.pdf || item.file || item.image || item.attachment;
                        
                        // Determine file type for display
                        const fileType = fileObj.mime?.includes('image') ? 'Image' : 
                                        fileObj.mime?.includes('pdf') ? 'PDF' : 
                                        'Document';
                        
                        return {
                            title: item.Tittle || item.title,
                            link: `${process.env.NEXT_PUBLIC_STRAPI}${fileObj.url}`,
                            priority: item.priority,
                            fileType: fileType,
                            fileName: fileObj.name
                        };
                    });
                
                setDocuments(transformedDocuments);
            } catch (err) {
                console.error('Error fetching regulations:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRegulations();
    }, []);

    if (loading) {
        return (
            <div className='page'>
                <h3 className='page_heading'>Regulations</h3>
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                    <span className="ml-2">Loading regulations...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='page'>
                <h3 className='page_heading'>Regulations</h3>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Error:</strong> Failed to load regulations. {error}
                </div>
            </div>
        );
    }

    return (
        <div className='page'>
            <h3 className='page_heading'>Regulations</h3>
            <div>
                {documents.length > 0 ? (
                    documents.map((document, index) => {
                        return (
                            <DownloadButton 
                                key={index} 
                                title={`${document.title} (${document.fileType})`}
                                link={document.link} 
                            />
                        );
                    })
                ) : (
                    <p className="text-gray-600">No regulations available.</p>
                )}
            </div>
        </div>
    );
}