"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "@/styles/homepage/NewsTicker.module.css";

export default function NewsTicker() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI}/api/scroll?populate[sentences][populate]=*`
        );
        const result = await response.json();
        const sentences = result.data?.sentences || [];
        const items = sentences.map(sentence => sentence.text);
        
        // Duplicate items to create seamless loop
        setNewsItems(items.length > 0 ? items : ["No news available"]);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback to default items
        setNewsItems([
          "ADMISSION STARTED 2025",
          "COLLEGE CODE - SBC"
        ]);
        setLoading(false);
      }
    };

    fetchNewsItems();
  }, []);

  if (loading) {
    return (
      <div className={`${styles.tickerContainer} !flex !items-center !min-h-fit !h-auto !overflow-visible`}>
        <div className={`${styles.newsLabel} !flex !items-center !justify-center !h-auto`}>NEWS</div>
        <div className={`${styles.tickerWrapper} !flex !items-center !justify-center !h-auto`}>
          <span style={{fontFamily: "'Poppins', sans-serif"}}>Loading...</span>
        </div>
      </div>
    );
  }

  // Create duplicates for seamless infinite scroll
  const displayItems = [...newsItems, ...newsItems, ...newsItems];

  return (
    <div className={`${styles.tickerContainer} !flex !items-center !min-h-fit !h-auto !overflow-visible`}>
      {/* News Label */}
      <div className={`${styles.newsLabel} !flex !items-center !justify-center !h-auto`}>NEWS</div>
      
      {/* Scrolling Text */}
      <div className={`${styles.tickerWrapper} !overflow-hidden !flex !items-center !flex-1 !h-auto`}>
        <motion.div
          className={`${styles.tickerContent} !flex !items-center !h-auto`}
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ 
            repeat: Infinity, 
            duration: newsItems.length * 5,
            ease: "linear" 
          }}
        >
          {displayItems.map((item, index) => (
            <div key={index} className={`${styles.tickerItem} !whitespace-nowrap !flex !items-center !h-auto`}>
              {item} <span className={styles.separator}>•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
