"use client";

import React from 'react';

export default function AIMachineLearningPEOSPSO() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-gray-800">
      <header className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-yellow-900 mb-2">
          PEOs, POs and PSOs
        </h1>
        <div className="w-24 h-1 bg-yellow-900 mx-auto"></div>
      </header>
      
      {/* Main Section */}
      <section className="mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-yellow-900 mb-6 pb-2 border-b-2">
          Artificial Intelligence and Machine Learning
        </h2>
        
        {/* PEO Section - Reordered to come first */}
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">
            Program Educational Objectives (PEOs)
          </h3>
          <ul className="space-y-3" style={{ textAlign: "justify" }}>
            <li>
              <span className="font-semibold">PEO1: </span>
              Graduates will possess strong logical, computing, and analytical reasoning skills, enabling them to excel as AI/ML Engineers, Robotics Engineers, Business Intelligence Developers, computer professionals, researchers, or entrepreneurs in their respective industries.
            </li>
            <li>
              <span className="font-semibold">PEO2: </span>
              Graduates will effectively adapt to emerging technological advancements and evolving industry trends by applying their computer engineering and mathematical expertise.
            </li>
            <li>
              <span className="font-semibold">PEO3: </span>
              Graduates will demonstrate strong ethical values and a deep sense of social responsibility, contributing to the betterment of society.
            </li>
          </ul>
        </div>
        
        {/* PSO Section */}
        <div>
          <h3 className="text-xl md:text-2xl font-semibold text-gray-700 mb-3">
            Program Specific Outcomes (PSOs)
          </h3>
          <ul className="space-y-3" style={{ textAlign: "justify" }}>
            <li>
              <span className="font-semibold">PSO1: </span>
              Graduates of the program will leverage computational knowledge and algorithmic principles in Artificial Intelligence and Machine Learning to develop innovative AI-based applications that will provide optimal solutions to complex computational challenges.
            </li>
            <li>
              <span className="font-semibold">PSO2: </span>
              Graduates will uphold ethical standards in Artificial Intelligence and Machine Learning, while applying scientific techniques to integrate intelligent systems.
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}