"use client";

import React, { useState } from "react";
import Link from "next/link";
import "../styles/navbar_mobile.css"

export default function NavbarMobile() {
    const [sidebarVisible, setSidebarVisible] = useState(false);

    function toggleSubmenu(menu_link_index) {
        let temp = [...link_map];
        temp[menu_link_index].visible = !temp[menu_link_index].visible;
        setLinkMap(temp);
    }

    function toggleSubmenu2(index1, index2) {
        let temp = [...link_map];
        temp[index1].links[index2].visible = !temp[index1].links[index2].visible;
        setLinkMap(temp);
    }

    const [link_map, setLinkMap] = useState([
        {
            name: "About Us",
            visible: false,
            links: [
                { name: "Profile", link: "/about-us/profile", visible: false },
                { name: "Vision and Mission", link: "/about-us/vision_and_mission", visible: false },
                { name: "Management", link: "/about-us/management", visible: false },
                { name: "Principal", link: "/about-us/principal", visible: false },
                { name: "Organogram", link: "/about-us/oronogram", visible: false },
                { name: "Mandatory Disclosure", link: "/about-us/mandatory_disclosure", visible: false },
                {name: "Service Rules and Employment Policy",link: "/about-us/service_mansuals_and_employment_policies",visible: false},
                { name: "AICTE EOA", link: "/about-us/EoA", visible: false },
                { name: "Student Code of Conduct and Ethics", link: "/about-us/student_code_of_conduct", visible: false },
                { name: "Internal Quality Assurance Cell", link: "/about-us/iqac", visible: false },
                { name: "Gallery", link: "/about-us/gallery", visible: false },
                { name: "Admission and Accounts", link: "/about-us/admission_and_accounts", visible: false },
                { name: "PTA", link: "/about-us/pta", visible: false },
                { name: "Sister Institutions", link: "/about-us/sister_institutions", visible: false },
                { name: "Contact Us", link: "/about-us/contact_us", visible: false },
                { name: "Feedback", link: "/about-us/feedback", visible: false },
            ],
        },
        {
            name: "Autonomous",
            visible: false,
            links: [
                { name: "About Autonomy", link: "/autonomous/about_autonomy",visible:false },
                { name: "Conferments", link: "/autonomous/conferments", visible: false },
                { name: "Governing Body", link: "/autonomous/governing_body", visible: false },
                { name: "Academic Council", link: "/autonomous/academic_council", visible: false },
                { name: "Finance Committee", link: "/autonomous/finance_committee", visible: false },
                { name: "Board of Studies", link: "/autonomous/board_of_studies", visible: false },
                { name: "Regulations", link: "/autonomous/regulations", visible: false },
                { name: "Academic Calendar", link: "/autonomous/academic_calendar", visible: false },
                { name: "Examinations Cell", link: "/autonomous/examinations_cell", visible: false },
                { name: "Curriculum and Syllabus", link: "/autonomous/curriculum_and_syllabus", visible: false },
            ],
        },
        {
            name: "Academics",
            visible: false,
            links: [
                { name: "Courses Offered", link: "/academics/courses", visible: false },
                { name: "Advisory System", link: "/academics/advisory_system", visible: false },
                { name: "Academic Calendar", link: "/academics/academic_calendar", visible: false },
                { name: "Professional Bodies", link: "/academics/professional_bodies", visible: false },
                { name: "Handbook", link: "/academics/handbook", visible: false },
                { name: "NSS", link: "/academics/nss", visible: false },
                { name: "Syllabus", link: "/academics/syllabus", visible: false },
                { name: "Campus Newsletter", link: "/academics/campus_newsletter", visible: false },
            ],
        },
        {
            name: "Departments",
            visible: false,
            links: [
                { name: "Basic Science and Mathematics", link: "/departments/mathematics-and-basic-sciences", visible: false },
                { name: "Biotechnology and Biochemical Engineering", link: "/departments/biotechnology-biochemical-engineering", visible: false },
                { name: "Civil Engineering", link: "/departments/civil-engineering", visible: false },
                { name: "Computer Science and Engineering", link: "/departments/computer-science-engineering", visible: false },
                { name: "Computer Science and Engineering (Artificial Intelligence & Machine learning)", link: "/departments/artificial-intelligence-machine-learning", visible: false },
                { name: "Electrical and Electronics Engineering", link: "/departments/electrical-electronics-engineering", visible: false },
                { name: "Electronics and Communication Engineering", link: "/departments/electronics-communication-engineering", visible: false },
                { name: "Electronics and Computer Engineering", link: "/departments/electronics-computer-engineering", visible: false },
                { name: "Food Technology", link: "/departments/food-technology", visible: false },
                { name: "Mechanical Engineering", link: "/departments/mechanical-engineering", visible: false },
            ],
        },
        {
            name: "Admissions",
            visible: false,
            links: [
                { name: "Undergraduate", link: "/admissions/undergraduate", visible: false },
                { name: "Postgraduate", link: "/admissions/postgraduate", visible: false },
                { name: "PhD Research", link: "/admissions/phd_research", visible: false },
                { name: "International Students Admission", link: "/admissions/international2", visible: false },
            ],
        },
        {
            name: "Placements",
            visible: false,
            links: [
                { name: "Team", link: "/placements/team", visible: false },
                { name: "Activities", link: "/placements/activities", visible: false },
                { name: "Recruiters", link: "/placements/recruiters", visible: false },
                { name: "Placement Details", link: "/placements/placement_details", visible: false },
                { name: "Contact Us", link: "/placements/contact_us", visible: false },
            ],
        },
        {
            name: "Cells and Chapter",
            visible: false,
            links: [
                { name: "Academic and Administrative Bodies", link: "/cells_and_chapters/various_cells", visible: false },
                { name: "IEEE", link: "/cells_and_chapters/ieee", visible: false },
                { name: "IE(I)", link: "/cells_and_chapters/ie_i", visible: false },
                { name: "SAE India", link: "/cells_and_chapters/sae_india", visible: false },
                { name: "NSS", link: "/cells_and_chapters/nss", visible: false },
                { name: "SAC", link: "/cells_and_chapters/sac", visible: false },
                { name: "Virtual Lab", link: "/cells_and_chapters/virtual_lab", visible: false },
                { name: "IEDC", link: "/cells_and_chapters/iedc", visible: false },
                { name: "NPTEL", link: "/cells_and_chapters/nptel", visible: false },
                { name: "IIT Remote Center", link: "/cells_and_chapters/iit_remote_center", visible: false },
            ],
        },
        {
            name: "Facilities",
            visible: false,
            links: [
                // { name: "Cells and Centers", link: "/facilities/cells", visible: false },
                { name: "Central Library", link: "/facilities/library", visible: false },
                { name: "Conference Hall", link: "/facilities/hall", visible: false },
                { name: "Conveyance and Bus Routes", link: "/facilities/bus", visible: false },
                { name: "Reprographics Facilities", link: "/facilities/reprographic", visible: false },
                { name: "Internal Lab", link: "/facilities/lab", visible: false },
                { name: "Hostel", link: "/facilities/hostel", visible: false },
                { name: "Canteen", link: "/facilities/canteen", visible: false },
                { name: "Other Facilities", link: "/facilities/other", visible: false },
            ],
        },
        {
            name: "Accreditation",
            visible: false,
            links: [
                {
                    name: "NAAC",
                    visible: false,
                    links: [
                        { name: "Cycle1", link: "/accreditation/NAAC/Cycle1", visible: false },
                        { name: "Cycle2", link: "/accreditation/NAAC/Cycle2", visible: false },
                        { name: "Cycle3", link: "/accreditation/NAAC/Cycle3", visible: false },
                    ],
                },
                { name: "NBA", link: "/accreditation/NBA", visible: false },
                { name: "NIRF", link: "/accreditation/nirf", visible: false },
                { name: "ARIIA", link: "/accreditation/ariia", visible: false },
            ],
        },
        {
            name: "Alumni",
            visible: false,
            links: [
                { name: "Alumni Registration", link: "/alumni/registration", visible: false },
                { name: "Executive Body", link: "/alumni/executive_body", visible: false },
                { name: "IPR", link: "/alumni/ipr", visible: false },
                { name: "Alumni Reports", link: "/alumni/alumni_reports", visible: false },
            ],
        },
        {
            name: "Research",
            visible: false,
            links: [
                { name: "Research Council", link: "/research/council", visible: false },
                { name: "Projects", link: "/research/projects", visible: false },
                { name: "IPR", link: "/research/ipr", visible: false },
                { name: "Consultancy", link: "/research/consultancy", visible: false },
                { name: "Conferences Organized", link: "/research/conference", visible: false },
            ],
        },
    ]);

    return (
        <>
        <div className="relative w-full bg-white shadow-md navbar_mobile">
            <div className="flex items-center justify-between p-4 --bg-green-200 w-full">
               <Link href = "/"><div className="flex items-center">
                    <img src="/assets/images/sree_buddha_logo.png" alt="Logo" className="h-12 w-auto" />
                </div></Link> 

                <button 
                    className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
                    onClick={() => setSidebarVisible(!sidebarVisible)}
                >
                    <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${sidebarVisible ? 'transform rotate-45 translate-y-1.5' : 'mb-1.5'}`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${sidebarVisible ? 'opacity-0' : 'mb-1.5'}`}></span>
                    <span className={`block w-6 h-0.5 bg-gray-800 transition-all duration-300 ${sidebarVisible ? 'transform -rotate-45 -translate-y-1.5' : ''}`}></span>
                </button>
            </div>

            <div 
                className={`fixed top-0 right-0 w-4/5 h-full bg-white overflow-y-auto shadow-lg transition-all duration-300 ease-in-out z-50 ${sidebarVisible ? 'translate-x-0' : 'translate-x-full'}`} 
                style={{ maxWidth: '320px' }}
            >
                <div className="p-4 bg-[#845714] flex items-center justify-between">
                    <div className="text-white text-lg font-semibold">Menu</div>
                    <button 
                        className="text-white focus:outline-none" 
                        onClick={() => setSidebarVisible(false)}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div className="divide-y divide-gray-200">
                    {link_map.map((menu_link, menu_link_index) => (
                        <div className="py-1" key={menu_link_index}>
                            <button 
                                className="flex justify-between items-center w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100 focus:outline-none"
                                onClick={() => toggleSubmenu(menu_link_index)}
                            >
                                <span className="font-medium">{menu_link.name}</span>
                                <svg 
                                    className={`w-4 h-4 transition-transform duration-200 ${menu_link.visible ? 'transform rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24" 
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            
                            <div 
                                className={`overflow-hidden transition-all duration-300 ${menu_link.visible ? 'max-h-screen' : 'max-h-0'}`}
                            >
                                <div className="bg-gray-50 pl-4">
                                    {menu_link.links.map((menu_linkl2, index2) => {
                                        if (!menu_linkl2.links) {
                                            return (
                                                <Link 
                                                    key={index2} 
                                                    href={menu_linkl2.link}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    onClick={() => setSidebarVisible(false)}
                                                >
                                                    {menu_linkl2.name}
                                                </Link>
                                            );
                                        } else {
                                            return (
                                                <div key={index2}>
                                                    <button
                                                        className="flex justify-between items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleSubmenu2(menu_link_index, index2);
                                                        }}
                                                    >
                                                        <span>{menu_linkl2.name}</span>
                                                        <svg 
                                                            className={`w-3 h-3 transition-transform duration-200 ${menu_linkl2.visible ? 'transform rotate-180' : ''}`} 
                                                            fill="none" 
                                                            stroke="currentColor" 
                                                            viewBox="0 0 24 24" 
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                                        </svg>
                                                    </button>
                                                    
                                                    <div 
                                                        className={`overflow-hidden transition-all duration-300 ${menu_linkl2.visible ? 'max-h-64' : 'max-h-0'}`}
                                                    >
                                                        <div className="bg-gray-100 pl-4">
                                                            {menu_linkl2.links.map((menu_linkl3, index3) => (
                                                                <Link 
                                                                    key={index3} 
                                                                    href={menu_linkl3.link}
                                                                    className="block px-4 py-2 text-xs text-gray-600 hover:bg-gray-200"
                                                                    onClick={() => setSidebarVisible(false)}
                                                                >
                                                                    {menu_linkl3.name}
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Overlay to close sidebar when clicking outside */}
            {sidebarVisible && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setSidebarVisible(false)}
                ></div>
            )}
        </div>
        </>
    );
}