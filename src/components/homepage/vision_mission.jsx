"use client";

import React, { useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function VisionMission() {
  useEffect(() => {
    const initAOS = async () => {
      const AOS = (await import('aos')).default;
      await import('aos/dist/aos.css');
      AOS.init({
        duration: 600,
        easing: "ease-out-cubic",
        once: true,
      });
    };
    initAOS();
  }, []);
  
const router = useRouter();

  return (
    <section
      className="bg-[#fbe3bc] m-5  text-[#775A2D] py-9 px-4 md:px-16 rounded-3xl font-[italic]"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6" data-aos="fade-up">
          <p className="text-lg md:text-xl leading-relaxed">
            Sree Buddha College of Engineering, affiliated with APJ Abdul Kalam
            Technological University, excels in technical education, guided by
            the teachings of Lord Buddha. The institution nurtures aspiring
            technocrats and strives to be a model for the world.
          </p>
          {/* <button className="bg-black text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-gray-900 transition">
            About Us
          </button> */}
         


<button 
  onClick={() => router.push('/about-us/profile')}
  className="bg-black text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:bg-gray-900 transition"
>
  About Us
</button>
          
        </div>

        <div className="space-y-10" data-aos="fade-up">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase !text-black">
              Our Vision
            </h2>
            <p className="italic text-lg mt-2">
              To create professionally competent engineers with human values and
              social commitment.
            </p>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold uppercase !text-black">
              Our Mission
            </h2>
            <p className="italic text-lg mt-2">
              Offer well balanced curriculum with student-centric approach.
              Encourage students to participate in innovation, lifelong learning
              and research. Impart ethical and human values focusing on rural
              needs and sustainability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}