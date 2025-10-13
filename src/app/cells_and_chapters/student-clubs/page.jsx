"use client";
import React from 'react';
import Link from 'next/link';
import { FileText, Download } from 'lucide-react';

export default function StudentClubs() {
  // Committee data with PDF links
  const committees = [
    // {
    //   id: 1,
    //   title: "Committee Page 1",
    //   pdf: "/pdfs/Committees-pages-1.pdf"
    // },
    // {
    //   id: 2,
    //   title: "Committee Page 2",
    //   pdf: "/pdfs/Committees-pages-2.pdf"
    // },
    // {
    //   id: 3,
    //   title: "Committee Page 3",
    //   pdf: "/pdfs/Committees-pages-3.pdf"
    // },
    // {
    //   id: 4,
    //   title: "Committee Page 4",
    //   pdf: "/pdfs/Committees-pages-4.pdf"
    // },
    // {
    //   id: 5,
    //   title: "Committee Page 5",
    //   pdf: "/pdfs/Committees-pages-5.pdf"
    // },
    // {
    //   id: 6,
    //   title: "Committee Page 6",
    //   pdf: "/pdfs/Committees-pages-6.pdf"
    // },
    // {
    //   id: 7,
    //   title: "Committee Page 7",
    //   pdf: "/pdfs/Committees-pages-7.pdf"
    // },
    {
      id: 8,
      title: "Academic and Administrative Bodies",
      // pdf: "/pdfs/Academic-and-Administrative-Bodies.pdf"
      pdf: "/pdfs/SBCE committes 2025-2026.pdf"
    }
  ];

  return (
    <div className="mx-auto px-4 md:px-8 py-8 max-w-6xl">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header section with title */}
        <div className="bg-gradient-to-r from-yellow-700 to-amber-500 p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Academic and Administrative Bodies</h1>
          <div className="h-1 w-20 bg-white opacity-70 mb-4"></div>
          <p className="text-white text-lg opacity-90">
            Download committee information and guidelines
          </p>
        </div>
        
        <div className="p-6 md:p-10">
          {/* Main description */}
          <div className="mb-8 text-gray-700 text-lg leading-relaxed">
            <p>
              Access detailed information about various committees through the downloadable PDF documents below.
              Each document contains comprehensive information about the respective committee&apos;s structure, guidelines, and activities.
            </p>
          </div>
          
          {/* Committees grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {committees.map((committee) => (
              <div 
                key={committee.id} 
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex flex-col items-center text-center">
                  <FileText className="w-12 h-12 text-yellow-800 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">{committee.title}</h3>
                  <Link 
                    href={committee.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-yellow-800 hover:bg-yellow-900 text-white font-medium py-2 px-4 rounded flex items-center justify-center transition-colors duration-300"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download PDF
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          
          
          {/* Contact section */}
          <div className="mt-10 text-center">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Need Help?</h3>
            <p className="text-gray-600">
              For any queries regarding the committees or documents, please contact the administration office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}