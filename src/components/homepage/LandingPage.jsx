"use client"

import React, { useEffect } from 'react'
import Image from 'next/image'
import "@/styles/homepage/landing_page.css"

export default function LandingPage() {

  useEffect(() => {
    const initAOS = async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({
        once: true,
        duration: 700,
        easing: "ease-out-cubic",
      });
    };
    initAOS();
  }, []);

  return (
    <div className="landing_page">



      {/* <img className="college_background" src={"/assets/images/sree_buddha_college_image1.png"} alt="" /> */}
      <div className="college_background">
        <video
          className='video'
          loop
          autoPlay
          muted
          playsInline
          preload="metadata"
          poster="/assets/images/sree_buddha_college_image1.png"
        >
          <source src="/assets/videos/sree_buddha_final.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="black_overlay"></div>
      </div>




      <div className="social_media_links">
        <a href="https://www.instagram.com/sreebuddha.sbce?igsh=MW9xdDlzazZpYmFmOQ==" target="_blank" rel="noopener noreferrer"><Image src="/assets/images/home images/instagram.png" alt="Instagram" width={40} height={40} /></a>
        <a href="https://www.youtube.com/@sbceofficialyoutube2182" target="_blank" rel="noopener noreferrer"><Image src="/assets/images/home images/youtube.png" alt="YouTube" width={40} height={40} /></a>
        <a href="https://www.linkedin.com/school/sree-buddha-college-pattoor/" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="white" aria-label="LinkedIn">
            <rect width="40" height="40" rx="6" fill="#0A66C2"/>
            <path d="M13.5 16.5h-4v12h4v-12zm-2-6.5a2.3 2.3 0 1 1 0 4.6A2.3 2.3 0 0 1 11.5 10zm8 6.5h-3.8v12h3.8v-6.3c0-3.3 4.2-3.6 4.2 0V28.5H27.5V21c0-6.3-7-6.1-8-3V16.5z" fill="white"/>
          </svg>
        </a>
        <a href=""><Image src="/assets/images/home images/whatsapp.png" alt="WhatsApp" width={40} height={40} /></a>
        <a href=""><Image src="/assets/images/home images/facebook.png" alt="Facebook" width={40} height={40} /></a>
        <a href=""><Image src="/assets/images/home images/x.png" alt="X" width={40} height={40} /></a>
      </div>

      <div className="landing_page_content">
        <h3 className="landing_page_title1 text-white" data-aos="fade-right" data-aos-duration="600">SREE BUDDHA</h3>
        <h3 className="landing_page_title2 text-white" data-aos="fade-right" data-aos-duration="600">College Of Engineering , Pattoor</h3>
        <h3 className="landing_page_title3" data-aos="fade-right" data-aos-duration="600" >AUTONOMOUS</h3>
      </div>
      
    </div>
  )
}
