"use client";

import React, { useState } from 'react';
import { Poppins } from 'next/font/google';

// Initialize Poppins font
const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
});

export default function MechanicalEngineeringDepartmentFacilities() {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedLab, setExpandedLab] = useState(null);
  
  // Toggle experiment list visibility
  const toggleExperiments = (labId) => {
    if (expandedLab === labId) {
      setExpandedLab(null);
    } else {
      setExpandedLab(labId);
    }
  };

  // Labs data organized for better structure
  const labs = [
    {
      id: "basic-workshop",
      name: "Basic Mechanical Engineering Workshop",
      description: "Basic mechanical engineering workshop is intended to make the students aware of the basic mechanical engineering operations and familiarize them with different tools used for various mechanical engineering operations. Practices of engineering work like fitting, carpentry, foundry, forging, welding, sheet metal work, assembly are provided here.",
      inCharge: "Prof. Sreekumar.S",
      staff: "Sarath .S, Abhilash.S.Krishnan, Madhusoodhanan P.H, Anil Bhaskaran",
      image: "/assets/images/departments/facilities/me/basic_workshop.jpg",
      experiments: [
        "Carpentry: Study of tools and joints. Practice in planning, chiseling, marking and sawing. Joints – Cross joint, T joint, Dove tail joint.",
        "Fitting: Study of tools, Practice in filing, cutting, drilling and tapping. Male and female joints, Stepped joints.",
        "Sheet Metal Work: Study of tools. Selection of different gauge GI sheets for jobs. Practice on riveted joints. Preparing tube joints, frustums, trays and containers.",
        "Plumbing: Study of tools. Details of plumbing work in domestic and industrial applications. Study of pipe joints, cutting, threading and laying of pipes with different fittings using PVC pipes. Use of special tools in plumbing work.",
        "Foundry: Study of tools. Preparation of sand, moulding practice and demonstration of casting.",
        "Welding: Study of welding machines. Straight line practices, Making of But joint, T joint and Lap joint.",
        "Smithy: Study of tools. Demonstration on forging of square prism, hexagonal bolt, T bolt and Eye bolt.",
        "Machine Tools: Study and demonstration on working of machine tools. Lathe and Drilling machine"
      ],
      category: "Basic Engineering"
    },
    {
      id: "fluid-mechanics",
      name: "Fluid Mechanics and Machines Lab",
      description: "The Fluid Mechanics and Machines Laboratory is equipped with the commonly used turbines in power generation like Pelton Wheel, Francis Turbine and different types of flows through channels and pipes are in the experiment setup with periodically calibrated gauges.",
      inCharge: "Mr. Aswin Mohan, Mr. Gokul O",
      staff: "Akhil Chandran, Rejilal.N",
      image: "/assets/images/departments/facilities/me/fluid_mechanics.jpg",
      experiments: [
        "Determination of Coefficient of discharge and calibration of Notches, Orifice meter, Nozzle and Venturimeter.",
        "Determination of Chezy's constant and Darcy's coefficient on pipe friction apparatus",
        "Determination of Hydraulic coefficients of orifices",
        "Determination of Metacentric Height and Radius of gyration of floating bodies.",
        "Performance test on Roto dynamic and Positive displacement pumps",
        "Performance test on Impulse and Reaction turbines",
        "Speed variation test on Impulse turbine",
        "Determination of best guide vane opening for Reaction turbine",
        "Performance test on variable speed pump and plotting is efficiency curves"
      ],
      category: "Core Mechanical"
    },
    {
      id: "manufacturing-tech-1",
      name: "Manufacturing Technology Lab-I",
      description: "This is equipped with centre lathes, shaping machines, slotting machines, milling machines, radial drilling machine, tool and cutter grinding machine.",
      inCharge: "Mr.Kalesh.K.K",
      staff: "Sarath .S, Abhilash.S.Krishnan, Madhusoodhanan, Anil Bhaskaran",
      image: "/assets/images/departments/facilities/me/manufacturing_tech1.jpg",
      experiments: [
        "Turret and Capstan Lathes",
        "Horizontal Milling Machine",
        "Vertical Milling Machine",
        "Surface Grinding Machine",
        "Cylindrical Grinding Machine",
        "Radial Drilling Machine",
        "lathe Tool Dynamometer",
        "Milling Tool Dynamometer",
        "Gear Hobbling Machine",
        "Tool Makers Microscope",
        "CNC Lathe",
        "CNC milling machine",
        "Gear Shaper machine",
        "Center less grinding machine",
        "Tool and cutter grinder"
      ],
      category: "Manufacturing"
    },
    {
      id: "manufacturing-tech-2",
      name: "Manufacturing Technology Lab-II",
      description: "This lab helps students to study and practice the basic machining operations in the special purpose machines and acquire its applicability in the real time components manufacturing industries. And help us to Study and preparation of program, simulation and exercise on CNC lathe:-turning, step turning, taper turning, thread cutting, ball and cup turning etc.",
      inCharge: "Mr. Jinan.S",
      staff: "Sarath .S, Abhilash.S.Krishnan, Madhusoodhanan, Anil Bhaskaran",
      image: "/assets/images/departments/facilities/me/manufacturing_tech2.jpg",
      experiments: [
        "Basics for mechanical measurements",
        "Experiments on Limits, Fits and Tolerance",
        "Linear measurements",
        "Straightness error measurement",
        "Angle measurements",
        "Out of roundness measurement",
        "Screw thread measurement",
        "Bore measurement",
        "Calibration and determination of uncertainties",
        "Rotation measurement",
        "Area determination",
        "Gear metrology"
      ],
      category: "Manufacturing"
    },
    {
      id: "cad-lab",
      name: "CAD Lab",
      description: "CAD Lab has equipped with more than 85 Computer Systems with high end latest Configuration hardware. The software available include AutoCAD 2015, SolidWorks 2012, Pro/Engineer wildfire 3.0, SolidEdge, ANSYS 15, LS-DYNA, Materials Studio, MATLAB & Simulink, E Yantra (Design Software), I-DEAS, and CATIA V5R10 etc.",
      inCharge: "Mr.Arun.M",
      staff: "Biju K C",
      image: "/assets/images/departments/facilities/me/cad_lab.jpg",
      experiments: [
        "Structural analysis.",
        "Thermal analysis.",
        "Fluid flow analysis."
      ],
      category: "Computer Aided Design"
    },
    {
      id: "thermal-engineering",
      name: "Thermal Engineering Lab",
      description: "The machines and equipment used to determine experimental data include cut models of 4-stroke diesel engine, 2-stroke petrol engine, 4-stroke and two stroke petrol engines with required specifications, Multi cylinder SI engine, Single cylinder Diesel engine for performance and speed test which is suitable to tests on variable compression ratios.",
      inCharge: "Mr. Akhil K V",
      staff: "Akhil Chandran, K.K.Subramanian",
      image: "/assets/images/departments/facilities/me/thermal_engineering.jpg",
      experiments: [
        "Determination of flash and fire points of petroleum products -flash and fire point apparatus",
        "Determination of viscosity of lubricating oil- viscometer",
        "Determination of calorific value of solid and liquid fuels- calorimeter",
        "Determination of calorific value of and gaseous fuels – calorimeter",
        "Performance test on petrol engines with various types of loading systems",
        "Performance test on Diesel engines with various types of loading systems",
        "Heat Balance test on petrol/Diesel engines",
        "Cooling curve of IC engines",
        "Valve timing diagram of IC engines",
        "Economic speed test on IC engines",
        "Retardation test on IC engines",
        "Determination volumetric efficiency and Air-fuel ratio of IC engines",
        "Morse test on petrol engine",
        "Performance test on reciprocating compressor",
        "Performance test on rotary compressor/blower",
        "Draw velocity profile in a pipe flow using Prandtl -Pitot tube",
        "Analysis of automobile exhaust gas and flue gas using exhaust gas analyser"
      ],
      category: "Thermal Engineering"
    },
    {
      id: "cim-lab",
      name: "CIM Lab",
      description: "CIM laboratory is equipped with CNC production Lathe, CNC trainer Lathe, CNC Milling machine, Coordinate Measuring Machine, Vision Measuring Machine, Surface roughness tester and CADEM Software.",
      inCharge: "Mr.AnwarRajeev, Ms.Vidya.V",
      staff: "Biju K C",
      image: "/assets/images/departments/facilities/me/cim_lab.jpg",
      experiments: [
        "CNC part programming using CAM packages.",
        "Simulation of Turning, Drilling, Milling operations.",
        "Typical simulations to be carried out using simulation packages like Master- CAM, or any equivalent software."
      ],
      category: "Computer Integrated Manufacturing"
    },
    {
      id: "mechanical-engineering-lab",
      name: "Mechanical Engineering Lab",
      description: "The equipments are used to conduct the various heat transfer experiments, to practice calibration of thermometer and pressure gauges and to do experiments on dynamics.",
      inCharge: "Mr. Renjith Raj.R",
      staff: "Akhil Chandran, K K Subramanian",
      image: "/assets/images/departments/facilities/me/mechanical_engineering.jpg",
      experiments: [
        "Determination of LMTD and effectiveness of parallel flow, Counter flow and cross flow heat exchangers (double pipe heat exchanger)",
        "Determination of heat transfer coefficients in free convection (free convection apparatus)",
        "Determination of heat transfer coefficients in forced convection (forced convection apparatus)",
        "Determination of thermal conductivity of solids (composite wall)",
        "Determination of emissivity of a specimen (emissivity apparatus)",
        "Determination of Stefan Boltzman constant (Stefan Boltzmann apparatus)",
        "Study and performance test on refrigeration (Refrigeration Test rig)",
        "Calibration of Thermocouples",
        "Calibration of Pressure gauge"
      ],
      category: "Core Mechanical"
    }
  ];

  // Group labs by category
  const labCategories = {
    "Basic Engineering": labs.filter(lab => lab.category === "Basic Engineering"),
    "Core Mechanical": labs.filter(lab => lab.category === "Core Mechanical"),
    "Manufacturing": labs.filter(lab => lab.category === "Manufacturing"),
    "Computer Aided": labs.filter(lab => lab.category === "Computer Aided Design" || lab.category === "Computer Integrated Manufacturing"),
    "Thermal Engineering": labs.filter(lab => lab.category === "Thermal Engineering")
  };

  // Equipment count by category for visualization
  const equipmentCounts = {
    "Basic Engineering": 15,
    "Core Mechanical": 22,
    "Manufacturing": 30,
    "Computer Aided": 85,
    "Thermal Engineering": 18
  };

  return (
    <div className={`me-department-facilities ${poppins.className}`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <header className="mb-6 sm:mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-900 mb-2">
            Department of Mechanical Engineering
          </h1>
          <div className="w-20 sm:w-24 h-1 bg-yellow-900 mx-auto mb-3 sm:mb-4"></div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">Facilities</h2>
        </header>

        <div className="mb-6 sm:mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex border-b border-gray-200 min-w-max">
            <button
              className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm ${activeTab === 'overview' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm ${activeTab === 'labs' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('labs')}
            >
              Labs
            </button>
            <button
              className={`py-2 px-3 sm:px-4 font-medium text-xs sm:text-sm ${activeTab === 'equipment' ? 'text-yellow-900 border-b-2 border-yellow-900' : 'text-gray-500 hover:text-yellow-800'}`}
              onClick={() => setActiveTab('equipment')}
            >
              Equipment
            </button>
          </div>
        </div>

{/* Tab Content */}
<div className="tab-content">
  {/* Overview Tab */}
  {activeTab === 'overview' && (
    <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
      <div className="mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-gray-800">Department Overview</h3>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-6 text-justify">
          The Department of Mechanical Engineering is equipped with state-of-the-art laboratories and facilities to provide students with hands-on experience in various aspects of mechanical engineering. Our labs are designed to support both the academic curriculum and research activities, giving students practical exposure to engineering principles and manufacturing processes.
        </p>
        
        <div className="bg-gradient-to-r from-yellow-50 to-white p-4 sm:p-5 rounded-lg border-l-4 border-yellow-900 mb-4 sm:mb-6">
          <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">World-Class Infrastructure</h4>
          <p className="text-xs sm:text-sm text-gray-700 text-justify">
            The department boasts modern labs for manufacturing technology, fluid mechanics, thermal engineering, CAD/CAM, and basic engineering workshops. These facilities are regularly updated with the latest equipment and software to ensure students gain relevant industry experience.
          </p>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-yellow-50 p-3 sm:p-4 rounded-lg text-center">
          <div className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-yellow-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
            </svg>
          </div>
          <div className="text-base sm:text-lg font-semibold text-gray-800">8+</div>
          <div className="text-xs sm:text-sm text-gray-600">Advanced Labs</div>
        </div>
        <div className="bg-green-50 p-3 sm:p-4 rounded-lg text-center">
          <div className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-green-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <div className="text-base sm:text-lg font-semibold text-gray-800">85+</div>
          <div className="text-xs sm:text-sm text-gray-600">Computer Systems</div>
        </div>
        <div className="bg-purple-50 p-3 sm:p-4 rounded-lg text-center">
          <div className="mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-purple-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
            </svg>
          </div>
          <div className="text-base sm:text-lg font-semibold text-gray-800">10+</div>
          <div className="text-xs sm:text-sm text-gray-600">Advanced Software Tools</div>
        </div>
      </div>
    </div>
  )}
          {/* Labs Tab */}
          {activeTab === 'labs' && (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-5 text-gray-800">Laboratory Facilities</h3>
              
              <div className="grid grid-cols-1 gap-5 sm:gap-8">
                {labs.map((lab, index) => (
                  <div key={`lab-${index}`} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="md:flex flex-col md:flex-row">
                      <div className="md:w-2/5 h-36 sm:h-48 md:h-auto overflow-hidden bg-gray-100 flex items-center justify-center">
                        {/* Placeholder if no images */}
                        <div className="text-4xl sm:text-5xl text-gray-300">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-12 h-12 sm:w-16 sm:h-16">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                          </svg>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6 md:w-3/5">
                        <div className="flex flex-wrap items-center justify-between mb-2 sm:mb-3">
                          <h4 className="text-base sm:text-xl font-semibold text-gray-800 mr-2">{lab.name}</h4>
                          <span className="text-xs font-medium bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mt-1 sm:mt-0">
                            {lab.category}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 line-clamp-3">{lab.description}</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm mb-3 sm:mb-4">
                          <div className="bg-gray-50 p-2 sm:p-3 rounded">
                            <div className="font-semibold text-gray-700 mb-0.5 sm:mb-1">Lab in Charge</div>
                            <div className="text-gray-600 text-xs sm:text-sm">{lab.inCharge}</div>
                          </div>
                          <div className="bg-gray-50 p-2 sm:p-3 rounded">
                            <div className="font-semibold text-gray-700 mb-0.5 sm:mb-1">Technical Staff</div>
                            <div className="text-gray-600 text-xs sm:text-sm">{lab.staff}</div>
                          </div>
                        </div>
                        
                        <button 
                          onClick={() => toggleExperiments(lab.id)}
                          className="flex items-center justify-between w-full text-xs sm:text-sm font-medium text-yellow-800 bg-yellow-50 hover:bg-yellow-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded transition-colors"
                        >
                          <span>View Experiments ({lab.experiments.length})</span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${expandedLab === lab.id ? 'rotate-180' : ''}`}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                          </svg>
                        </button>
                        
                        {expandedLab === lab.id && (
                          <div className="mt-3 sm:mt-4 bg-gray-50 p-3 sm:p-4 rounded-lg">
                            <h5 className="font-semibold text-gray-700 mb-1.5 sm:mb-2 text-xs sm:text-sm">Experiments</h5>
                            <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                              {lab.experiments.map((experiment, idx) => (
                                <li key={`exp-${idx}`}>{experiment}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-900">
                <p className="text-xs sm:text-sm text-gray-700 font-medium mb-1">Note:</p>
                <p className="text-xs sm:text-sm text-gray-700">
                  All laboratories are well maintained and regularly updated with new equipment to ensure the best learning experience. 
                  Students are encouraged to utilize these facilities for their academic projects and research work.
                </p>
              </div>
            </div>
          )}

          {/* Equipment & Experiments Tab */}
          {activeTab === 'equipment' && (
            <div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-5 text-gray-800">Laboratory Equipment & Experiments</h3>
              
              <div className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {Object.entries(equipmentCounts).map(([category, count]) => (
                  <div key={`equip-${category}`} className="bg-white rounded-lg shadow-md p-3 sm:p-4 text-center">
                    <div className="mb-2">
                      <div className="inline-flex h-10 w-10 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-yellow-50 text-yellow-800">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 sm:w-8 sm:h-8">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-1">{category}</h4>
                    <div className="text-xl sm:text-3xl font-bold text-yellow-900 mb-1">{count}+</div>
                    <p className="text-xs sm:text-sm text-gray-600">Equipment Units</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 sm:mt-8">
                <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-800">Featured Lab Equipment</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-3 sm:p-5">
                      <h5 className="font-semibold text-gray-800 mb-1.5 sm:mb-2 text-sm sm:text-base">CNC Production & Training Units</h5>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        Our CIM lab is equipped with CNC production Lathe, CNC trainer Lathe, and CNC Milling machines that allow students to learn programming and operation of modern manufacturing systems.
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">CNC Lathe</span>
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">CNC Milling</span>
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">CADEM Software</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-3 sm:p-5">
                      <h5 className="font-semibold text-gray-800 mb-1.5 sm:mb-2 text-sm sm:text-base">CAD/CAM Software Suite</h5>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        Our CAD lab features a comprehensive range of industry-standard software including AutoCAD, SolidWorks, Pro/Engineer, ANSYS, and CATIA for design, analysis and simulation.
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">AutoCAD</span>
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">SolidWorks</span>
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">ANSYS</span>
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">CATIA</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-3 sm:p-5">
                      <h5 className="font-semibold text-gray-800 mb-1.5 sm:mb-2 text-sm sm:text-base">Fluid Mechanics & Turbines</h5>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        Our Fluid Mechanics lab includes Pelton Wheel, Francis Turbine, and various flow measurement apparatus with calibrated gauges for precise experimentation.
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Pelton Wheel</span>
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Francis Turbine</span>
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Venturimeter</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-3 sm:p-5">
                      <h5 className="font-semibold text-gray-800 mb-1.5 sm:mb-2 text-sm sm:text-base">IC Engine Test Facilities</h5>
                      <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                        The Thermal Engineering lab houses various engine models including 2-stroke and 4-stroke engines with variable compression ratios for performance testing.
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Diesel Engines</span>
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Petrol Engines</span>
                        <span className="text-[10px] sm:text-xs bg-yellow-50 text-blue-700 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">Calorimeters</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}