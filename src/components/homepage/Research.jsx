"use client";

import React, { useEffect, useState, useRef } from 'react';
import { Poppins } from 'next/font/google';
import { motion } from 'framer-motion';

const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function ResearchPage() {
    const [researchData, setResearchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCard, setActiveCard] = useState(null);
    const [isPaused, setIsPaused] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(true);

    const carouselRef = useRef(null);
    const animationRef = useRef(null);

    useEffect(() => {
        async function fetchResearch() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/researchs?populate=Research_media`);
                if (!response.ok) throw new Error('Failed to fetch research data');
                const data = await response.json();
                setResearchData(data.data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchResearch();
    }, []);

    // Continuous scroll animation
    useEffect(() => {
        if (!carouselRef.current || isPaused || researchData.length <= 3) return;
        
        let lastTimestamp = 0;
        const SCROLL_SPEED = 0.1; // pixels per millisecond
        
        const animateScroll = (timestamp) => {
            if (!carouselRef.current) return;
            
            if (lastTimestamp !== 0) {
                const elapsed = timestamp - lastTimestamp;
                carouselRef.current.scrollLeft += SCROLL_SPEED * elapsed;
                
                // Reset when reached the end
                if (carouselRef.current.scrollLeft >= carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 20) {
                    carouselRef.current.scrollLeft = 0;
                }
            }
            
            lastTimestamp = timestamp;
            animationRef.current = requestAnimationFrame(animateScroll);
        };
        
        animationRef.current = requestAnimationFrame(animateScroll);
        
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [researchData, isPaused]);

    // Manual navigation
    const handleNavigate = (direction) => {
        setIsPaused(true);
        
        if (!carouselRef.current) return;
        
        const scrollAmount = direction === 'next' 
            ? carouselRef.current.clientWidth
            : -carouselRef.current.clientWidth;
            
        carouselRef.current.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        // Calculate new index (approximate)
        const newScrollPosition = carouselRef.current.scrollLeft + scrollAmount;
        const cardWidth = carouselRef.current.clientWidth / 3; // Assuming 3 cards visible
        const newIndex = Math.round(newScrollPosition / cardWidth) % researchData.length;
        setCurrentIndex(newIndex);
    };

    // Toggle auto-scroll
    const toggleAutoScroll = () => {
        setIsPaused(!isPaused);
        setIsAutoScrolling(!isAutoScrolling);
    };

    const truncateText = (text, maxLength) => {
        if (!text) return "";
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    if (loading) {
        return (
            <div className={`${poppins.className} min-h-screen bg-white flex items-center justify-center`}>
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-yellow-900 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-gray-700 font-medium">Loading research information...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${poppins.className} min-h-screen bg-white flex items-center justify-center p-4`}>
                <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500 text-center max-w-lg w-full">
                    <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Data</h3>
                    <p className="text-red-700">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Create duplicate items for infinite scroll effect
    const duplicatedResearch = [...researchData, ...researchData, ...researchData];

    return (
        <div className={`${poppins.className} min-h-screen bg-white`}>
            <div className="w-[80%] mx-auto px-4 py-12">
                <header className="mb-12 text-center">
                <div className="events_title_area">
                    <span className="event_left_border"></span>
                    <h3>Research Projects</h3>
                    <a href="/research/projects" className="events_know_more">KNOW MORE</a>
                    
                </div>
                  
                    <p className="text-lg text-left text-gray-600 max-w-3xl">
                        Exploring innovative solutions and advancing knowledge through research excellence at Sree Buddha College of Engineering.
                    </p>
                </header>

                {researchData.length === 0 ? (
                    <div className="w-full bg-yellow-50 text-yellow-800 p-10 text-center rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <h2 className="text-xl font-semibold mb-2">No Research Projects Found</h2>
                        <p>There are no research projects available at the moment.</p>
                    </div>
                ) : (
                    <div className="research-carousel-container">

                       

                        {/* Carousel wrapper with navigation buttons */}
                        <div className="relative">
                            {/* Navigation buttons */}
                            <div className="absolute inset-y-0 left-0 z-10 flex items-center">
                                <button
                                    onClick={() => handleNavigate('prev')}
                                    className="bg-white/80 hover:bg-white text-yellow-900 p-3 rounded-full shadow-lg -ml-3 focus:outline-none"
                                    aria-label="Previous slide"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                            </div>

                            <div className="absolute inset-y-0 right-0 z-10 flex items-center">
                                <button
                                    onClick={() => handleNavigate('next')}
                                    className="bg-white/80 hover:bg-white text-yellow-900 p-3 rounded-full shadow-lg -mr-3 focus:outline-none"
                                    aria-label="Next slide"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Scrolling cards container */}
                            <div
                                ref={carouselRef}
                                className="overflow-x-auto flex space-x-8 py-2 hide-scrollbar"
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => {
                                    if (isAutoScrolling) {
                                        setIsPaused(false);
                                    }
                                }}
                            >
                                {/* Loop through research data (duplicated for infinite scroll effect) */}
                                {duplicatedResearch.map((research, index) => {
                                    const imageUrl = research.Research_media
                                        ? `${process.env.NEXT_PUBLIC_STRAPI}${research.Research_media.url}`
                                        : null;

                                    return (
                                        <motion.div
                                            key={`${research.id}-${index}`}
                                            className="flex-none w-[280px] sm:w-[320px] md:w-[340px]"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: Math.min(index * 0.1, 0.5) }}
                                        >
                                            <div
                                                className={`h-full bg-white rounded-xl overflow-hidden border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl ${
                                                    activeCard === `${research.id}-${index}` ? 'scale-[1.03]' : ''
                                                }`}
                                                onMouseEnter={() => {
                                                    setActiveCard(`${research.id}-${index}`);
                                                    setIsPaused(true);
                                                }}
                                                onMouseLeave={() => {
                                                    setActiveCard(null);
                                                    if (isAutoScrolling) {
                                                        setIsPaused(false);
                                                    }
                                                }}
                                            >
                                                <div className="h-48 overflow-hidden">
                                                    {imageUrl ? (
                                                        <div className="w-full h-70 sm:h-80 md:h-97 overflow-hidden rounded-lg bg-gray-100">
  <img
    src={imageUrl}
    alt={research.heading || 'Research image'}
    className="w-full h-full object-fill -translate-y-7"
  />
</div>

                                                    ) : (
                                                        <div className="h-full bg-gradient-to-r from-yellow-50 to-yellow-100 flex items-center justify-center">
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-700/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="p-5">
                                                    <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-1">
                                                        {research.heading}
                                                    </h2>

                                                    {activeCard === `${research.id}-${index}` ? (
                                                        <div className="animate-fadeIn">
                                                            <div className="overflow-y-auto h-32 custom-scrollbar pr-2">
                                                                <p className="text-gray-600 leading-relaxed">{research.description}</p>
                                                            </div>
                                                            
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-600 mb-3 line-clamp-3">{truncateText(research.description, 120)}</p>
                                                    )}

                                                    <div className="mt-4 pt-3 border-t border-gray-100 text-sm text-gray-500">
                                                        {new Date(research.createdAt).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric',
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                        
                      
                        
                     
                    </div>
                )}
                
               
            </div>

            {/* Custom styles */}
            <style jsx global>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in-out;
                }

                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }

                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(245, 158, 11, 0.05);
                    border-radius: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(245, 158, 11, 0.3);
                    border-radius: 4px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(245, 158, 11, 0.5);
                }
                
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-250px * 7)); }
                }
                
                .research-carousel-container {
                    position: relative;
                    overflow: hidden;
                    padding: 1rem 0;
                }
            `}</style>
        </div>
    );
}