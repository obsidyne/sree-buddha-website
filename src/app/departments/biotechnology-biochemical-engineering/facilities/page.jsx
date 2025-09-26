"use client";

import React, { useState } from 'react';
import { Poppins } from 'next/font/google';


// Initialize Poppins font
const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function BiotechnologyDepartmentFacilities() {
  const [activeTab, setActiveTab] = useState('overview');

  // Labs data organized for better structure
  const labs = [
    {
      id: "hmt-lab",
      name: "HEAT AND MASS TRANSFER LAB",
      description: "HMT Lab is equipped with both the heat transfer and mass transfer operation equipment. The lab facilities include a U tube heat exchanger, emissivity apparatus, Stefan-Boltzmann's apparatus, natural convection apparatus, free convection apparatus, composite wall, rotary drier, steam distillation unit, simple distillation unit, Soxhlet extractor, etc. These experiments also pave way for inculcating certain innovative skills in the students and to use the experimental setups as starting point to take up higher level experimental studies in heat as well as mass transfer.",
      image: "/assets/images/departments/facilities/biot/lab1new.png"
      
    },
    {
      id: "fluid-flow-lab",
      name: "FLUID FLOW AND PARTICLE TECHNOLOGY LAB",
      description: "This lab is run in conjunction with the theory course BT201 Fluid flow and Particle Technology. The goals of the experiments aim at the explication of industrial applicability of various techniques of fluid flow and particle technology in process engineering. The facilities include manometers, Stokes Law apparatus, venturimeter, orificemeter, packed bed, fluidized bed, pipette analysis, beaker decantation, flocculator, viscometer, batch sedimentation test etc.",
      image: "/assets/images/departments/facilities/biot/fluidflow.png"

    },
    {
      id: "research-lab",
      name: "RESEARCH LABORATORY",
      description: "The research laboratory of the department of BT & BCE provides a propitious environment that ensures the participation of faculty and students in research and development. The facility has sophisticated instrumental facilities that support research in emerging areas like bio-nanotechnology, sensor development and validation, molecular biology, bio-processing and environmental remediation. The laboratory houses animal cell culture facility, photoluminescence spectro-photometric equipment and other state-of the art facilities. The nanotechnology wing of the laboratory is funded by the BioCARe scheme of the Department of Biotechnology, Government of India and has a dedicated research team working on quantum dot synthesis and allied areas. The facility also supports student internships and consultancy projects in bio-nanotechnology and basic microbiology.",
       image: "/assets/images/departments/facilities/biot/lab2new.png"
    },
    {
      id: "downstream-lab",
      name: "DOWNSTREAM PROCESSING LABORATORY",
      description: "The lab is equipped with instruments to give a technical knowhow to students on downstream processing of biomolecules to strengthen the knowledge in basic techniques of cell disruption, flocculation, precipitation, protein purification and polishing techniques. The downstream processing lab is equipped with ultra sonicator, dead end filtration unit, centrifuge, electronic balance, vortex shaker, autoclave etc.",
       image: "/assets/images/departments/facilities/biot/lab3new.png"
    },
    {
      id: "reaction-engineering-lab",
      name: "REACTION ENGINEERING AND PROCESS CONTROL LABORATORY",
      description: "In reaction engineering and process control laboratory, students will perform experiments to support their theoretical study of chemical reaction engineering and process dynamics and control. The experiments related to reaction engineering include kinetic studies and RTD studies of different types of reactors. The experiments related to process Control, provides exposure to the dynamic response of various process components namely thermometer, different controllers, level control systems etc.",
       image: "/assets/images/departments/facilities/biot/lab8.jpg"
    },
    {
      id: "microbiology-lab",
      name: "MICROBIOLOGY LABORATORY",
      description: "Microbiology laboratory in the department has a unique environment that houses special practices and containment facilities in order to properly protect persons working with microorganisms. Aim of the microbiology lab is to focus mainly on basic principles, safe practices and morphological characters of different types of cells. Specific experiments address topics in microbial isolation, quantification and characterization. The laboratory has basic devices, equipment and instruments needed in microbiology experiments such as microscopes, hot air oven, laminar air flow, incubator, refrigerator, centrifuge, autoclave, chemicals including media and consumables.",
       image: "/assets/images/departments/facilities/biot/lab7new.png"
    },
    {
      id: "biochemistry-lab",
      name: "BIOCHEMISTRY LAB",
      description: "In the biochemistry lab, the students will have an opportunity to get acquainted with various reagents, equipment and experiments for the qualitative and quantitative analysis of various biomolecules. Schematic qualitative analysis of carbohydrates (mono, di and polysaccharides), amino acids and proteins, and qualitative estimation of proteins, amino acids, DNA, RNA and lipids are carried out independently by the student.",
      image: "/assets/images/departments/facilities/biot/lab6.jpg"
    },
    {
      id: "ima-lab",
      name: "INSTRUMENTAL METHODS OF ANALYSIS LAB",
      description: "Overall the students will be exposed to various instruments used in analytical labs for the analysis of biological samples by qualitatively or quantitatively. Also they will be familiarizing with the general terminologies used in IMA such as calibration, precision, accuracy, resolution etc. Students will get an idea about UV spectra of Nucleic acids, Beer's-Lambert's law and calculation of Absorption maxima. The second part in the lab includes separation of amino acids by paper chromatography, identification of nucleic acids by gel electrophoresis, estimation of turbidity using spectrophotometer etc.",
     image: "/assets/images/departments/facilities/biot/lab5.jpg"
    },
    {
      id: "bioprocess-lab",
      name: "BIOPROCESS ENGINEERING LAB",
      description: "The Bioprocess Engineering Lab explore hands-on experience on the isolation and purification of various important enzymes (urease, amylase etc.) used in Bioprocess Industry. Further, they may study the effect of various environmental factors (pH, temperature, substrate concentration etc.) on enzyme activity under laboratory conditions. The second part the lab provides an idea about microbial growth curve, importance of immobilization technique, Residence Time Distribution (RTD) studies and estimation of total sugar and phenol content in wine sample.",
      image: "/assets/images/departments/facilities/biot/bioprocess.png"
    },
    {
      id: "software-lab",
      name: "SOFTWARE LABORATORY",
      description: "This lab is equipped with 20 systems with all the necessary programming software like C++, MATLAB, ChemCADD, DWSIM Simulator etc. The laboratory has facilities for students to have internet access.",
      image: "/assets/images/departments/facilities/biot/lab4.jpg"
    }
  ];

  // Research focus areas
  const researchAreas = [
    "Bio-nanotechnology",
    "Sensor development and validation",
    "Molecular biology",
    "Bio-processing",
    "Environmental remediation",
    "Quantum dot synthesis",
    "Protein purification techniques",
    "Enzymatic studies"
  ];

  return (
    <div className={`bt-department-facilities ${poppins.className}`}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-yellow-900 mb-2">
            Department of Biotechnology and Biochemical Engineering
          </h1>
          <div className="w-24 h-1 bg-yellow-900 mx-auto mb-4"></div>
          <h2 className="text-2xl font-semibold text-gray-700">Facilities</h2>
        </header>

        {/* Tab Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex border-b border-gray-200 min-w-max">
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'overview' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'labs' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('labs')}
            >
              Laboratory Facilities
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${activeTab === 'research' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('research')}
            >
              Research Facilities
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Department Overview</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  The Department of Biotechnology and Biochemical Engineering houses highly sophisticated state-of-the art laboratory facilities that cater basic to advance research in Biotechnology, life sciences and chemical engineering. The laboratories are designed to serve the academic curriculum, research projects and consultancy assignments.
                </p>
                
                <div className="bg-gradient-to-r from-yellow-50 to-white p-5 rounded-lg border-l-4 border-yellow-900 mb-6">
                  <h4 className="font-semibold text-gray-800 mb-2">State-of-the-Art Facilities</h4>
                  <p className="text-gray-700">
                    Our department boasts modern laboratory facilities with the latest equipment and research tools, ensuring students have access to industry-standard technologies for hands-on learning and research.
                  </p>
                </div>
              </div>

              {/* <h3 className="text-xl font-semibold mb-4 text-gray-800">Laboratory Highlights</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-8">
                {labs.slice(0, 6).map((lab, index) => (
                  <div key={`lab-highlight-${index}`} className="flex items-start">
                    <div className="mr-3 mt-1 flex-shrink-0">
                      <div className="h-6 w-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-900">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-700 font-medium">{lab.name}</p>
                  </div>
                ))}
              </div> */}

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto text-blue-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                    </svg>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">10+</div>
                  <div className="text-sm text-gray-600">Specialized Laboratories</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto text-green-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">Research Focus</div>
                  <div className="text-sm text-gray-600">Bio-nanotechnology & Processing</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mx-auto text-purple-500">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <div className="text-lg font-semibold text-gray-800">GOI Funded</div>
                  <div className="text-sm text-gray-600">BioCARe Nanotechnology Wing</div>
                </div>
              </div>
            </div>
          )}

          {/* Labs Tab */}
          {activeTab === 'labs' && (
            <div>
              <h3 className="text-xl font-semibold mb-5 text-gray-800">Laboratory Facilities</h3>
              
              <div className="grid grid-cols-1 gap-8">
                {labs.map((lab, index) => (
                  <div key={`lab-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex">
                      <div className="md:w-2/5 h-64 md:h-auto overflow-hidden bg-gray-100 flex items-center justify-center">
                        {/* Placeholder if no images */}
                        <img src={lab.image} alt={lab.name} className="w-full h-full object-cover" />
                        
                      </div>
                      <div className="p-6 md:w-3/5">
                        <h4 className="text-xl font-semibold text-gray-800 mb-3">{lab.name}</h4>
                        <p className="text-gray-700">{lab.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-900">
                <p className="text-gray-700 font-medium mb-1">Note:</p>
                <p className="text-gray-700">
                  All laboratories are well equipped with advanced instruments and equipment to ensure the best learning experience. 
                  Each lab has specialized facilities designed to meet specific course requirements and research needs.
                </p>
              </div>
            </div>
          )}

          {/* Research Tab */}
          {activeTab === 'research' && (
            <div>
              <h3 className="text-xl font-semibold mb-5 text-gray-800">Research Facilities</h3>
              
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Research Laboratory</h4>
                <p className="text-gray-700 mb-6">
                  The research laboratory of the department of BT & BCE provides a propitious environment that ensures the participation of faculty and students in research and development. The facility has sophisticated instrumental facilities that support research in emerging areas like bio-nanotechnology, sensor development and validation, molecular biology, bio-processing and environmental remediation.
                </p>
                
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Key Research Areas</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {researchAreas.map((area, index) => (
                    <div key={`area-${index}`} className="flex items-center bg-gray-50 p-3 rounded-lg hover:bg-yellow-50 transition-colors">
                      <div className="mr-3 flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-900 font-semibold">
                          {index + 1}
                        </div>
                      </div>
                      <p className="text-gray-700">{area}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gradient-to-r from-yellow-50 to-white p-5 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Government Funded Research</h4>
                  <p className="text-gray-700">
                    The nanotechnology wing of the laboratory is funded by the BioCARe scheme of the Department of Biotechnology, Government of India and has a dedicated research team working on quantum dot synthesis and allied areas. The facility also supports student internships and consultancy projects in bio-nanotechnology and basic microbiology.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-lg shadow-md text-center">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-blue-100 text-blue-600 mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Consultancy Projects</h4>
                  <p className="text-gray-600">
                    The department actively engages in industry consultancy projects, providing expert solutions for biotechnology challenges.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-md text-center">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-yellow-100 text-green-600 mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Student Internships</h4>
                  <p className="text-gray-600">
                    Opportunities for students to gain practical experience through research internships in specialized labs.
                  </p>
                </div>
                
                <div className="bg-white p-5 rounded-lg shadow-md text-center">
                  <div className="flex items-center justify-center h-14 w-14 rounded-full bg-purple-100 text-purple-600 mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                  </div>
                  <h4 className="font-semibold text-lg mb-2">Specialized Facilities</h4>
                  <p className="text-gray-600">
                    Access to animal cell culture facility, photoluminescence spectro-photometric equipment and other advanced tools.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}