"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import "./style.css";

export default function NewsDetailPage() {
    const [news, setNews] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageAspectRatio, setImageAspectRatio] = useState(null);
    const params = useParams();
    const newsId = params.news_id;
    
    // Hardcore reloading approach - uses URL modification
    useEffect(() => {
        // Check if URL already has our reload parameter
        const currentUrl = window.location.href;
        const hasReloadParam = currentUrl.includes('?reload=true');
        
        if (!hasReloadParam) {
            // If we're on the initial load (no reload parameter)
            // Add the parameter and force a hard navigation
            const reloadUrl = `${window.location.pathname}?reload=true`;
            
            // Short delay to allow component to render first
            setTimeout(() => {
                window.location.href = reloadUrl;
            }, 100);
        }
    }, []);
    
    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/newss?filters[documentId][$eq]=${newsId}&populate=News_media`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch news');
                }
                
                const data = await response.json();
                
                // Check if we have data and at least one news item
                if (data.data && data.data.length > 0) {
                    setNews(data.data[0]); // Take the first news item from the array
                } else {
                    throw new Error('News not found');
                }
                setError(null);
            } catch (error) {
                console.error('Error fetching news:', error);
                setError('Unable to load news. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        if (newsId) {
            fetchNews();
        }
    }, [newsId]);
    
    // Format date to a more readable format
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    
    // Handle image load to determine aspect ratio
    const handleImageLoad = (e) => {
        const img = e.target;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        setImageAspectRatio(aspectRatio);
    };
    
    // Get CSS class based on aspect ratio
    const getImageContainerClass = () => {
        if (imageAspectRatio === null) return 'image'; // Default while loading
        
       if (imageAspectRatio > 2.0) {
    console.log('Aspect Ratio > 2.0 → image-ultra-wide');
    return 'image image-ultra-wide'; // Very wide images (banners, panoramic)
} else if (imageAspectRatio > 1.5) {
    console.log('Aspect Ratio > 1.5 → image-wide');
    return 'image image-wide'; // Wide landscape images
} else if (imageAspectRatio > 1.2) {
    console.log('Aspect Ratio > 1.2 → image-landscape');
    return 'image image-landscape'; // Moderately rectangular
} else if (imageAspectRatio > 0.8) {
    console.log('Aspect Ratio > 0.8 → image-square');
    return 'image image-square'; // Nearly square
} else if (imageAspectRatio > 0.65) {
    console.log('Aspect Ratio > 0.65 → image-portrait');
    return 'image image-portrait'; // Portrait orientation
} else if (imageAspectRatio > 0.5) {
    console.log('Aspect Ratio > 0.5 → image-mobile-vertical');
    return 'image image-mobile-vertical'; // Mobile/vertical video ratios (9:16, etc.)
} else if (imageAspectRatio > 0.4) {
    console.log('Aspect Ratio > 0.4 → image-poster');
    return 'image image-poster'; // Poster ratio (2:3, 3:4)
} else if (imageAspectRatio > 0.25) {
    console.log('Aspect Ratio > 0.25 → image-tall-poster');
    return 'image image-tall-poster'; // Very tall posters (movie posters, etc.)
} else if (imageAspectRatio > 0.15) {
    console.log('Aspect Ratio > 0.15 → image-skyscraper');
    return 'image image-skyscraper'; // Skyscraper banners, tall infographics
} else {
    console.log('Aspect Ratio ≤ 0.15 → image-ultra-tall');
    return 'image image-ultra-tall'; // Extremely tall images
}

    };
    
    if (loading) {
        return (
            <div className="page">
                <div className="loading">Loading...</div>
            </div>
        );
    }
    
    if (error) {
        return (
            <div className="page">
                <div className="error">{error}</div>
            </div>
        );
    }
    
    if (!news) {
        return (
            <div className="page">
                <div className="error">News not found</div>
            </div>
        );
    }
    
    // Construct the full image URL
    const getImageUrl = () => {
        if (!news.News_media) return null;
        
        // Try to get medium format first
        if (news.News_media.formats?.medium?.url) {
            return `${process.env.NEXT_PUBLIC_STRAPI}${news.News_media.formats.medium.url}`;
        }
        // Fallback to small format
        else if (news.News_media.formats?.small?.url) {
            return `${process.env.NEXT_PUBLIC_STRAPI}${news.News_media.formats.small.url}`;
        }
        // Fallback to thumbnail
        else if (news.News_media.formats?.thumbnail?.url) {
            return `${process.env.NEXT_PUBLIC_STRAPI}${news.News_media.formats.thumbnail.url}`;
        }
        // Last resort: use the original URL if available
        else if (news.News_media.url) {
            return `${process.env.NEXT_PUBLIC_STRAPI}${news.News_media.url}`;
        }
        
        return null;
    };
    
    const imageUrl = getImageUrl();
    
    return (
        <div className="page">
            <div className="news">
                {imageUrl && (
                    <div className={getImageContainerClass()}>
                        <img 
                            src={imageUrl} 
                            alt={news.Heading || 'News image'} 
                            onLoad={handleImageLoad}
                            onError={(e) => {
                                console.error('Image failed to load');
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                )}
                
                <div className="details">
                    <div className="date mb-4 text-amber-700">
                        {formatDate(news.publishedAt)}
                    </div>
                    <h3 className="headline">{news.Heading}</h3>
                    
                    <p className="news_content">
                        {news.description}
                    </p>
                    
                    {news.news_link && (
                        <div className="mt-6">
                            <a 
                                href={news.news_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium"
                            >
                                Read more
                                <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}