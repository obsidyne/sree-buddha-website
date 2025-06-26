"use client"

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import "./style.css";

export default function EventDetailPage() {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageAspectRatio, setImageAspectRatio] = useState(null);
    const params = useParams();
    const router = useRouter();
    const eventId = params.event_id;
    
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
        const fetchEvent = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/events?filters[documentId][$eq]=${eventId}&populate=Event_media`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch event');
                }
                
                const data = await response.json();
                
                // Check if we have data and at least one event
                if (data.data && data.data.length > 0) {
                    setEvent(data.data[0]); // Take the first event from the array
                } else {
                    throw new Error('Event not found');
                }
                setError(null);
            } catch (error) {
                console.error('Error fetching event:', error);
                setError('Unable to load event. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        
        if (eventId) {
            fetchEvent();
        }
    }, [eventId]);
    
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
            return 'image image-ultra-wide'; // Very wide images (banners, panoramic)
        } else if (imageAspectRatio > 1.5) {
            return 'image image-wide'; // Wide landscape images
        } else if (imageAspectRatio > 1.2) {
            return 'image image-landscape'; // Moderately rectangular
        } else if (imageAspectRatio > 0.8) {
            return 'image image-square'; // Nearly square
        } else if (imageAspectRatio > 0.65) {
            return 'image image-portrait'; // Portrait orientation
        } else if (imageAspectRatio > 0.5) {
            return 'image image-mobile-vertical'; // Mobile/vertical video ratios (9:16, etc.)
        } else if (imageAspectRatio > 0.4) {
            return 'image image-poster'; // Poster ratio (2:3, 3:4)
        } else if (imageAspectRatio > 0.25) {
            return 'image image-tall-poster'; // Very tall posters (movie posters, etc.)
        } else if (imageAspectRatio > 0.15) {
            return 'image image-skyscraper'; // Skyscraper banners, tall infographics
        } else {
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
    
    if (!event) {
        return (
            <div className="page">
                <div className="error">Event not found</div>
            </div>
        );
    }
    
    // Construct the full image URL
    const getImageUrl = () => {
        if (!event.Event_media) return null;
        
        // Try to get medium format first
        if (event.Event_media.formats?.medium?.url) {
            return `${process.env.NEXT_PUBLIC_STRAPI}${event.Event_media.formats.medium.url}`;
        }
        // Fallback to small format
        else if (event.Event_media.formats?.small?.url) {
            return `${process.env.NEXT_PUBLIC_STRAPI}${event.Event_media.formats.small.url}`;
        }
        // Fallback to thumbnail
        else if (event.Event_media.formats?.thumbnail?.url) {
            return `${process.env.NEXT_PUBLIC_STRAPI}${event.Event_media.formats.thumbnail.url}`;
        }
        // Last resort: use the original URL if available
        else if (event.Event_media.url) {
            return `${process.env.NEXT_PUBLIC_STRAPI}${event.Event_media.url}`;
        }
        
        return null;
    };
    
    const imageUrl = getImageUrl();
    
    return (
        <div className="page">
            <div className="event">
                {imageUrl && (
                    <div className={getImageContainerClass()}>
                        <img 
                            src={imageUrl} 
                            alt={event.Heading || 'Event image'} 
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
                        {formatDate(event.publishedAt)}
                    </div>
                    <h3 className="headline">{event.Heading}</h3>
                    
                    <p className="event_content">
                        {event.description}
                    </p>
                    
                    {event.event_link && (
                        <div className="mt-6">
                            <a 
                                href={event.event_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-amber-700 hover:text-amber-800 font-medium"
                            >
                                Learn more about the event
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