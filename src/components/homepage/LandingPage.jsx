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
        <a href="https://www.linkedin.com/school/sree-buddha-college-pattoor/" target="_blank" rel="noopener noreferrer"><Image src="/assets/images/home images/linkedin.png" alt="LinkedIn" width={40} height={40} /></a>
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
