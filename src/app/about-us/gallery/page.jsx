'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Instagram, Camera, Info } from 'lucide-react';

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showInfo, setShowInfo] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [layout, setLayout] = useState('grid');
  const [galleryData, setGalleryData] = useState([]);

  useEffect(() => {
    const fetchGalleryData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/galleries?populate=*&pagination[page]=1&pagination[pageSize]=100`);
        const data = await response.json();
        setGalleryData(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching gallery data:', error);
        setIsLoading(false);
      }
    };

    fetchGalleryData();
  }, []);

  // Transform gallery data into the format needed for the UI
  const transformedImages = galleryData.flatMap(item => 
    item.images.map(img => ({
      id: img.id,
      src: `${process.env.NEXT_PUBLIC_STRAPI}${img.url}`,
      alt: img.name || 'Gallery image',
      category: item.Department,
      date: new Date(item.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      description: img.caption || `Image from ${item.Department} department`
    }))
  );

  // Filter images based on selected category
  const filteredImages = selectedCategory === 'all' 
    ? transformedImages 
    : transformedImages.filter(img => img.category === selectedCategory);

  // Get all unique categories from gallery data
  const categories = ['all', ...new Set(transformedImages.map(img => img.category))];

  // Set the current index when an image is selected
  useEffect(() => {
    if (selectedImage) {
      const index = filteredImages.findIndex(img => img.id === selectedImage.id);
      setSelectedIndex(index);
    }
  }, [selectedImage, filteredImages]);

  // Next image in lightbox
  const handleNext = () => {
    if (selectedIndex < filteredImages.length - 1) {
      setSelectedImage(filteredImages[selectedIndex + 1]);
      setSelectedIndex(selectedIndex + 1);
    } else {
      setSelectedImage(filteredImages[0]);
      setSelectedIndex(0);
    }
  };

  // Previous image in lightbox
  const handlePrevious = () => {
    if (selectedIndex > 0) {
      setSelectedImage(filteredImages[selectedIndex - 1]);
      setSelectedIndex(selectedIndex - 1);
    } else {
      setSelectedImage(filteredImages[filteredImages.length - 1]);
      setSelectedIndex(filteredImages.length - 1);
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: { 
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero section */}
        <div className="relative mb-16 rounded-xl overflow-hidden">
          <div className="h-64 md:h-80 bg-gradient-to-r from-yellow-700 to-amber-500 flex items-center justify-center">
            <div className="text-center text-white z-10 px-4">
              <motion.h1 
                className="text-5xl md:text-7xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Our Gallery
              </motion.h1>
              <motion.div 
                className="h-1 w-24 bg-white mx-auto mb-6"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ duration: 1, delay: 0.3 }}
              ></motion.div>
              <motion.p 
                className="max-w-2xl mx-auto text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                Explore our vibrant campus life through this collection of images showcasing our facilities,
                events, and daily activities.
              </motion.p>
            </div>
            
            <div className="absolute inset-0 bg-black opacity-30"></div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-200 rounded-full opacity-20"></div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-300 rounded-full opacity-20"></div>
          </div>
        </div>

        {/* Controls section */}
        <div className="mb-10 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`capitalize ${selectedCategory === category ? 'bg-yellow-800 hover:bg-yellow-900' : 'border-yellow-700 text-yellow-800 hover:bg-yellow-50'}`}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* View toggle */}
          <div className="flex items-center space-x-3 bg-white p-2 rounded-lg shadow-sm">
            <Button
              variant="ghost"
              onClick={() => setLayout('grid')}
              className={`${layout === 'grid' ? 'bg-yellow-100 text-yellow-800' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <span className="ml-2">Grid</span>
            </Button>
            <Button
              variant="ghost"
              onClick={() => setLayout('masonry')}
              className={`${layout === 'masonry' ? 'bg-yellow-100 text-yellow-800' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="9"></rect>
                <rect x="14" y="3" width="7" height="5"></rect>
                <rect x="14" y="12" width="7" height="9"></rect>
                <rect x="3" y="16" width="7" height="5"></rect>
              </svg>
              <span className="ml-2">Masonry</span>
            </Button>
          </div>
        </div>

        {/* Loading state */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-800"></div>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <AnimatePresence>
              <div className={`
                ${layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 
                'columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6'}
              `}>
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    variants={imageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ delay: index * 0.1 }}
                    className={layout === 'masonry' ? 'mb-6 break-inside-avoid' : ''}
                  >
                    <Card className="overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow duration-300" onClick={() => setSelectedImage(image)}>
                      <CardContent className="p-0 relative">
                        <div className={`${layout === 'grid' ? 'aspect-w-16 aspect-h-9' : ''}`}>
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="object-cover w-full h-full transform transition-transform duration-500 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 w-full">
                            <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <div className="flex justify-between items-center">
                                <Badge variant="secondary" className="capitalize bg-yellow-800 text-white">
                                  {image.category}
                                </Badge>
                                <span className="text-white text-xs opacity-70">{image.date}</span>
                              </div>
                              <p className="text-white text-sm font-medium line-clamp-2">
                                {image.alt}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </>
        )}

        {/* No results */}
        {filteredImages.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="text-yellow-800 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
                <path d="M10.3 21H7a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5h-3.3M12 17l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2"></path>
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">No images found</h3>
            <p className="text-gray-600">Try selecting a different category filter</p>
          </div>
        )}

        {/* Enhanced Lightbox Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-black/90 border-none">
            {selectedImage && (
              <div className="relative">
                {/* Close button */}
                <Button 
                  variant="ghost" 
                  className="absolute right-2 top-2 z-20 text-white bg-black/20 hover:bg-black/40 rounded-full p-2 h-auto"
                  onClick={() => setSelectedImage(null)}
                >
                  <X size={20} />
                </Button>

                {/* Info toggle */}
                <Button 
                  variant="ghost" 
                  className="absolute right-2 top-14 z-20 text-white bg-black/20 hover:bg-black/40 rounded-full p-2 h-auto"
                  onClick={() => setShowInfo(!showInfo)}
                >
                  <Info size={20} />
                </Button>

                {/* Navigation buttons */}
                <Button 
                  variant="ghost" 
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-20 text-white bg-black/20 hover:bg-black/40 rounded-full p-2 h-auto"
                  onClick={handlePrevious}
                >
                  <ChevronLeft size={24} />
                </Button>

                <Button 
                  variant="ghost" 
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-20 text-white bg-black/20 hover:bg-black/40 rounded-full p-2 h-auto"
                  onClick={handleNext}
                >
                  <ChevronRight size={24} />
                </Button>

                {/* Main image */}
                <div className="flex justify-center items-center min-h-[60vh]">
                  <img
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    className="max-h-[80vh] w-auto object-contain"
                  />
                </div>

                {/* Image info panel */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="secondary" className="mb-2 capitalize bg-yellow-800 text-white">
                        {selectedImage.category}
                      </Badge>
                      <h3 className="text-white text-xl font-medium mb-1">{selectedImage.alt}</h3>
                      
                      {/* Extended info */}
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: showInfo ? 'auto' : 0, 
                          opacity: showInfo ? 1 : 0 
                        }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-300 mt-2">{selectedImage.description}</p>
                        <p className="text-gray-400 text-sm mt-2">{selectedImage.date}</p>
                      </motion.div>
                    </div>

                    {/* Social sharing */}
                    <div className="flex space-x-2">
                      <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full p-2 h-auto">
                        <Instagram size={18} />
                      </Button>
                      <Button variant="ghost" className="text-white hover:bg-white/10 rounded-full p-2 h-auto">
                        <Camera size={18} />
                      </Button>
                    </div>
                  </div>

                  {/* Navigation indicator */}
                  <div className="flex justify-center mt-4">
                    <div className="flex space-x-1">
                      {filteredImages.map((img, idx) => (
                        <div 
                          key={img.id}
                          className={`w-2 h-2 rounded-full ${idx === selectedIndex ? 'bg-white' : 'bg-white/30'}`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}