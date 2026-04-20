"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import "@/styles/homepage/counts.css";

export default function Counts() {
  const countsRef = useRef([]);

  useEffect(() => {
    const handleCounting = (entry) => {
      const countItem = entry.target.querySelector(".count-number");
      const finalCount = parseInt(entry.target.dataset.count, 10);
      let currentCount = 0;

      const interval = setInterval(() => {
        currentCount += Math.ceil(finalCount / 50); // Adjust speed
        if (currentCount >= finalCount) {
          currentCount = finalCount;
          clearInterval(interval);
        }
        countItem.textContent = currentCount;
      }, 50); // Speed of counting
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            handleCounting(entry);
            observer.unobserve(entry.target); // Stop observing after animation starts
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    countsRef.current.forEach((ref) => observer.observe(ref));

    return () => observer.disconnect(); // Cleanup observer
  }, []);

  return (
    <div className="counts">
      <ul>
        <li>
          <div
            className="count-item"
            data-count="7355"
            ref={(el) => countsRef.current[0] = el}
          >
            <img src="/assets/images/home/counts_admissions.png" alt="" />
            <div className="count_data">
              <h3>ADMISSIONS</h3>
              <span className="count-number">0</span>
            </div>

          </div>
        </li>
        <li>
          <div
            className="count-item"
            data-count="5144"
            ref={(el) => countsRef.current[1] = el}
          >
             <Image src="/assets/images/home/counts_admissions.png" alt="" width={60} height={60} />
            <div className="count_data">
              <h3>UNDERGRADUATE</h3>
              <span className="count-number">0</span>
            </div>

          </div>
        </li>
        <li>
          <div
            className="count-item"
            data-count="572"
            ref={(el) => countsRef.current[2] = el}
          >
             <Image src="/assets/images/home/counts_admissions.png" alt="" width={60} height={60} />
            <div className="count_data">
              <h3>POSTGRADUATE</h3>
              <span className="count-number">0</span>
            </div>

          </div>
        </li>
        {/* <li>
          <div
            className="count-item"
            data-count="2004"
            ref={(el) => countsRef.current[3] = el}
          >
             <Image src="/assets/images/home/counts_admissions.png" alt="" width={60} height={60} />
            <div className="count_data">
              <h3>RESEARCH</h3>
              <span className="count-number">0</span>

            </div>

          </div>
        </li> */}
      </ul>
    </div>
  );
}
