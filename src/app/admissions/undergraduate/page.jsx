"use client";

import React from "react";
import course from "@/assets/images/admissions/ug_course.png";

export default function UndergraduatePage() {
  return (
    <div className="font-['Poppins'] text-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-12">
        {/* Header */}
        <div className="relative mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#73501C] mb-4">
            UNDERGRADUATE
          </h1>
          <div className="w-32 h-1.5 bg-[#E6B66D] rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-3xl">
            Explore our comprehensive undergraduate programs designed to empower the next generation of innovators and leaders.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-12">
          {[
            { text: "NBA Accredited", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { text: "NAAC Accredited", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
            { text: "Excellent Placement", icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
            { text: "Apply Now", icon: "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" }
          ].map((item, index) => (
            <a
              href="#"
              key={index}
              className="group relative flex flex-col items-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg border border-amber-100 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-300"></div>
              <svg
                className="w-8 h-8 text-amber-500 mb-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
              </svg>
              <span className="font-medium text-center group-hover:text-[#f48208] transition-colors duration-300">
                {item.text}
              </span>
            </a>
          ))}
        </div>

        {/* Programs Offered */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-amber-200 inline-block">Programs Offered</h2>
          <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
            <h3 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Course Seat Matrix</h3>
            <table className="w-full table-auto border-collapse border border-gray-300 text-lg">
              <thead>
                <tr className="bg-gray-100 text-gray-900">
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Course</th>
                  <th className="border border-gray-300 px-6 py-4 text-left font-semibold">Seats</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {[
                  ["Civil Engineering", "60 Seats"],
                  ["Computer Science & Engineering", "240 Seats"],
                  ["Electronics & Communication Engineering", "60 Seats"],
                  ["Electrical & Electronics Engineering", "30 Seats"],
                  ["Mechanical Engineering", "60 Seats"],
                  ["Biotechnology & Biochemical Engineering", "30 Seats"],
                  ["Food Technology", "30 Seats", true],
                  ["Computer Science & Engineering (AI & ML)", "60 Seats", true],
                  ["Electronics and Computer Engineering", "30 Seats", false, true]
                ].map(([course, seats, underline, italic], i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className={`border border-gray-300 px-6 py-4 ${underline ? "underline" : ""}`}>
                      {course}
                      {/* {italic && <span className="text-base italic"> *</span>} */}
                    </td>
                    <td className="border border-gray-300 px-6 py-4">{seats}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <p className="text-base italic text-gray-600 mt-4">*New course 2023–24</p> */}
          </div>
        </section>

        {/* Admission Criteria */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-amber-200 inline-block">Admission Criteria</h2>
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <p className="text-lg leading-relaxed">
              50% of the seats are under Government Quota, allotment to the same will be made by
              the Commissioner of Entrance Examinations (CEE Kerala). The remaining 50% seats are under Management Quota 
              and the admission will be made strictly on the basis of merit, which includes NRI/OCI seats also.
            </p>
          </div>
        </section>

        {/* How to Apply */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-amber-200 inline-block">How To Apply</h2>
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <p className="text-lg leading-relaxed mb-8">
              An application form can be obtained from the College office in person 
              on payment of INR 500/- or by post on sending a Demand Draft (DD) for INR 530/- in favour of the Principal.
              Application forms can also be downloaded from the website of the College. Such applications have to be 
              submitted along with a cash payment of INR 500/- or a DD of INR 500/-.
              <br /><br />
              Candidates can also submit an online application through the website.
            </p>

            <div className="flex flex-col md:flex-row md:justify-center md:space-x-6 space-y-4 md:space-y-0 my-10">
              <a
                href="/admissions/application-form"
                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-[#E6B66D] to-amber-500 text-center rounded-xl text-white text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Online Application Form
                </span>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
              </a>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdZkVC3f7rIeBlkVnW-One8uC1NnsHxQZtK013KVjP7ZKxzxg/viewform"
                className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-amber-500 to-[#73501C] text-center rounded-xl text-white text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Quick Registration
                </span>
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine"></div>
              </a>
            </div>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mt-8">
              <p className="text-lg font-medium flex items-center">
                <svg className="w-6 h-6 text-amber-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                For more information, please contact our PRO @ 9446014317
              </p>
            </div>
          </div>
        </section>

        {/* Final Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: "Scholarships",
              content: "Management offers scholarships to meritorious students on a merit cum means basis. Students securing GPA 8 and above from the lower-income groups are eligible for the scholarships."
            },
            {
              title: "Tuition Fee Waiver Scheme",
              content: "Eligible candidates of Government Quota can get admission under Tuition Fee Waiver Scheme."
            },
            {
              title: "Lateral Entry",
              content: "Lateral entry admission to the third semester is available for diploma holders as per Government norms."
            }
          ].map((item, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl shadow-md border-t-4 border-amber-400 hover:shadow-lg transition-shadow duration-300">
              <h2 className="text-xl font-bold mb-4 text-[#73501C]">{item.title}</h2>
              <p className="text-gray-700 leading-relaxed">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
