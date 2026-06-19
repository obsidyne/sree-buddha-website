"use client"

import React from "react";
import Image from "next/image";
import "@/styles/homepage/affiliations.css";

export default function Affiliations() {
  return (
    <div className="affiliations_and_cells">
      <div className="affiliations">
        <h3>Our Affiliations</h3>
        <ul >
          <div className="affiliation-item" data-aos="fade-up">
            <li><Image src="/assets/images/home images/aicte logo.png" alt="AICTE Logo" width={100} height={80} style={{height: 'auto'}} /></li>
            <span>Approved by AICTE New Delhi</span>
          </div>

          <div className="affiliation-item" data-aos="fade-up">
            <li><Image src="/assets/images/home images/ugc-logo.png" alt="UGC Logo" width={100} height={80} style={{height: 'auto'}} /></li>
            <span>University Grants Commision of India</span>
          </div>

          <div className="affiliation-item" data-aos="fade-up">
            <li><Image src="/assets/images/home images/ktu logo.png" alt="KTU Logo" width={100} height={80} style={{height: 'auto'}} /></li>
            <span>Kerala Technological University</span>
          </div>
        </ul>
      </div>

      <div className="cells_and_chapters">
        <h3>Cells & Chapters</h3>
        <ul >
          <div className="affiliation-item" data-aos="fade-up">
            <li><Image src="/assets/images/home images/IEEE Blue variant.png" alt="IEEE Logo" width={100} height={80} style={{height: 'auto'}} /></li>
            <span></span>
          </div>

          <div className="affiliation-item" data-aos="fade-up">
            <li><Image src="/assets/images/home images/nptel logo.png" alt="NPTEL Logo" width={100} height={80} style={{height: 'auto'}} /></li>
            <span></span>
          </div>

          <div className="affiliation-item" data-aos="fade-up">
            <li><Image src="/assets/images/home images/cs logo.png" alt="CS Logo" width={100} height={80} style={{height: 'auto'}} /></li>
            <span></span>
          </div>

          <div className="affiliation-item" data-aos="fade-up">
            <li><Image src="/assets/images/home images/sae logo.png" alt="SAE Logo" width={100} height={80} style={{height: 'auto'}} /></li>
            <span></span>
          </div>
        </ul>
      </div>

      {/* <div className="cells_and_chapters">
        <h3>Cells & Chapters</h3>
        <ul>
          <li data-aos="fade-up" ><img src={"/assets/images/home images/IEEE Blue variant.png"} alt="NPTEL Logo" /></li>
          <li data-aos="fade-up" ><img src={"/assets/images/home images/nptel logo.png"} alt="Computer Society Logo" /></li>
          <li data-aos="fade-up" ><img src={"/assets/images/home images/cs logo.png"} alt="SAE Logo" /></li>
          <li data-aos="fade-up" ><img src={"/assets/images/home images/sae logo.png"} alt="IEEE Logo" /></li>
        </ul>
      </div> */}

    </div>
  );
}