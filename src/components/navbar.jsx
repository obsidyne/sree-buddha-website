"use client";

import React from "react";
import "../styles/navbar.css";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  // const [visibleSubMenus, setVisibleSubMenus]  = useState([0,0,0,0,0,0,0,0])

  const link_map = [
    {
      name: "About Us",
      links: [
        { name: "Profile", link: "/about-us/profile" },
        { name: "Vision and Mission", link: "/about-us/vision_and_mission" },
        { name: "Management", link: "/about-us/management" },
        { name: "Principal", link: "/about-us/principal" },
        { name: "Organogram", link: "/about-us/organogram" },
        {
          name: "Mandatory Disclosure",
          link: "/about-us/mandatory_disclosure",
        },
        {
          name: "Service Rules and Employment Policy",
          link: "/about-us/service_mansuals_and_employment_policies",
        },
        {
          name: "Administrative and Academic Bodies",
          link: "/about-us/academic_and_administrative_bodies",
        },
        {
          name: "Policy Manual",
          link: "/about-us/policy_manual",
        },
        { name: "AICTE EOA", link: "/about-us/EoA" },
        {
          name: "Student Code of Conduct and Ethics",
          link: "/about-us/student_code_of_conduct",
        },
        { name: "Internal Quality Assurance Cell", link: "/about-us/iqac" },
        { name: "Gallery", link: "/about-us/gallery" },
        {
          name: "Admission and Finance",
          link: "/about-us/admission_and_accounts",
        },
        { name: "PTA", link: "/about-us/pta" },
        { name: "Sister Institutions", link: "/about-us/sister_institutions" },
        { name: "Contact Us", link: "/about-us/contact_us" },
        { name: "Feedback", link: "/about-us/feedback" },
      ],
    },
    {
      name: "Autonomous",
      links: [
        { name: "About Autonomy", link: "/autonomous/about_autonomy" },
        { name: "Conferments", link: "/autonomous/conferments" },
        { name: "Governing Body", link: "/autonomous/governing_body" },
        { name: "Academic Council", link: "/autonomous/academic_council" },
        { name: "Finance Committee", link: "/autonomous/finance_committee" },
        { name: "Board of Studies", link: "/autonomous/board_of_studies" },
        { name: "Regulations", link: "/autonomous/regulations" },
        { name: "Examinations Cell", link: "/autonomous/examinations_cell" },
        {
          name: "Curriculum and Syllabus",
          link: "/autonomous/curriculum_and_syllabus",
        },
         {
          name: "Audits",
          link: "/autonomous/audits",
        },
      ],
    },
    {
      name: "Academics",
      links: [
        { name: "Courses Offered", link: "/academics/courses" },
        { name: "Advisory System", link: "/academics/advisory_systems" },
        { name: "Academic Calendar", link: "/academics/academic_calendar" },
        { name: "Professional Bodies", link: "/academics/professional_bodies" },
        { name: "Handbook", link: "/academics/handbook" },
        { name: "Syllabus", link: "https://ktu.edu.in/" },
        { name: "Campus Newsletter", link: "/academics/newsletter" },
      ],
    },
    {
      name: "Departments",
      links: [
        {
          name: "Basic Science and Mathematics",
          link: "/departments/mathematics-and-basic-sciences",
        },
        {
          name: "Biotechnology and Biochemical Engineering",
          link: "/departments/biotechnology-biochemical-engineering",
        },
        { name: "Civil Engineering", link: "/departments/civil-engineering" },
        {
          name: "Computer Science and Engineering",
          link: "/departments/computer-science-engineering",
        },
        // {
        //   name: "Computer Science and Engineering (Artificial Intelligence & Machine learning)",
        //   link: "/departments/artificial-intelligence-machine-learning",
        // },
        {
          name: "Electrical and Electronics Engineering",
          link: "/departments/electrical-electronics-engineering",
        },
        {
          name: "Electronics and Communication Engineering",
          link: "/departments/electronics-communication-engineering",
        },
        {
          name: "Electronics and Computer Engineering",
          link: "/departments/electronics-computer-engineering",
        },
        { name: "Food Technology", link: "/departments/food-technology" },
        { name: "Mechanical Engineering", link: "/departments/mechanical-engineering" },
      ],
    },
    {
      name: "Admissions",
      links: [

        { name: "Undergraduate", link: "/admissions/undergraduate" },
        { name: "Postgraduate", link: "/admissions/postgraduate" },
        { name: "PhD Research", link: "/admissions/phd_research" },
        {
          name: "International Students Admission",
          link: "/admissions/international2",
        },
      ],
    },
    {
      name: "Placements",
      links: [
        { name: "Team", link: "/placements/team" },
        { name: "Activities", link: "/placements/activities" },
        { name: "Recruiters", link: "/placements/recruiters" },
        { name: "Placement Details", link: "/placements/placement_details" },
        { name: "Contact Us", link: "/placements/contact_us" },
      ],
    },
    {
      name: "Cells and Chapter",
      links: [
        {
          name: "Academic and Administrative Bodies",
          link: "/cells_and_chapters/student-clubs",
        },
        { name: "IEEE", link: "/cells_and_chapters/ieee" },
        { name: "IE(I)", link: "/cells_and_chapters/ie_i" },
        { name: "SAE India", link: "/cells_and_chapters/sae_india" },
        { name: "NSS", link: "/cells_and_chapters/nss" },
        { name: "SAC", link: "/cells_and_chapters/sac" },
        { name: "Virtual Lab", link: "/cells_and_chapters/virtual_lab" },
        { name: "IEDC", link: "/cells_and_chapters/iedc" },
        { name: "NPTEL", link: "/cells_and_chapters/nptel" },
        { name: "IPR Cell", link: "/research/ipr" },
        { name: "Research Council", link: "/research/council" },
        {
          name: "IIT Remote Center",
          link: "/cells_and_chapters/remote_center",
        },
      ],
    },
    {
      name: "Facilities",
      links: [
        // { name: "Cells and Centers", link: "/facilities/cells" },
        { name: "Central Library", link: "/facilities/library" },
        { name: "Conference Hall", link: "/facilities/hall" },
        { name: "Conveyance and Bus Routes", link: "/facilities/bus" },
        { name: "Reprographics Facilities", link: "/facilities/reprographic" },
        { name: "Internal Lab", link: "/facilities/lab" },
        { name: "Hostel", link: "/facilities/hostel" },
        { name: "Canteen", link: "/facilities/canteen" },
        { name: "Other Facilities", link: "/facilities/other" },
      ],
    },
    {
      name: "Accreditation",
      links: [
        {
          name: "NAAC",
          links: [
            { name: "Cycle1", link: "/accreditation/NAAC/Cycle1" },
            { name: "Cycle2", link: "/accreditation/NAAC/Cycle2" },
            { name: "Cycle3", link: "/accreditation/NAAC/Cycle3" },
          ],
        },
        { name: "NBA", link: "/accreditation/NBA" },
        { name: "NIRF", link: "/accreditation/NIRF" },
        { name: "ARIIA", link: "/accreditation/ARIIA" },
      ],
    },
    {
      name: "Alumni",
      links: [
        { name: "Alumni Registration", link: "/alumni/registration" },
        { name: "Executive Body", link: "/alumni/executive_body" },
        { name: "Alumni Reports", link: "/alumni/alumni_reports" },
      ],
      side: "left",
    },
    {
      name: "Research",
      links: [
        { name: "Projects", link: "/research/projects" },
        { name: "Consultancy", link: "/research/consultancy" },
        { name: "Conferences Organized", link: "/research/conference" },
      ],
      side: "left",
    },
  ];

  return (
    <div className="navbar">
      <div className="logo_section">
        <Link
          href={{
            pathname: '/'

          }}>

          <img src={"/assets/images/sree_buddha_logo.png"} alt="" />
        </Link>
      </div>
      <div className="navbar_right">
        <div className="important_links">
          <Link href="/admissions/international2" className="important_link">
            {" "}
            <img
              src="/assets/images/home/international_admissions.png"
              alt=""
            />{" "}
            International Admissions

          </Link>

          <Link href="/academics/courses" className="important_link">
            {" "}
            <img src="/assets/images/home/careers.png" alt="" /> Courses
          </Link>
          <Link href="/fee-payment" className="important_link">
            {" "}
            <img src="/assets/images/home/fees.png" alt="" /> Fees Payment
          </Link>
          <a
            href="https://ktu.edu.in/"
            className="important_link last_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/assets/images/home/university.png" alt="" /> University
          </a>

          <Link href="/academics/courses" className="important_links_button">
            Admissions
          </Link>
          {/* <a href="">Result Analysis</a> */}
        </div>

        <div className="navbar_menus">
          {link_map.map((menu, index) => {
            // console.log(menu.side)
            return (
              <div className={`navbar_menu `} key={index}>
                <span>{menu.name}</span>
                <div
                  className={`submenu ${menu.side == "left" ? "towards_left" : ""
                    }`}
                >
                  <ul>
                    {menu.links.map((menul2, index2) => {
                      if (menul2.link != undefined) {
                        return (
                          <Link
                            className="submenu_link"
                            href={menul2.link}
                            key={index2}
                          >
                            {menul2.name}
                          </Link>
                        );
                      } else {
                        return (
                          <div className="submenu_link" href="" key={index2}>
                            {menul2.name}
                            <div className="submenu_2">
                              <ul>
                                {menul2.links.map((menul3, index3) => {
                                  return (
                                    <Link
                                      key={index3}
                                      href={menul3.link}
                                      className="submenu_2_link"
                                    >
                                      {menul3.name}
                                    </Link>
                                  );
                                })}
                              </ul>
                            </div>
                          </div>
                        );
                      }
                    })}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/*  
        <div className="navbar_menus">
          <div className="navbar_menu">
            <span>About Us</span>
            <div className="submenu">
              <ul>
                <a className="submenu_link" href="/about-us/profile">
                  Profile
                </a>
                <Link className="submenu_link" href="">
                  Vision and Mission
                </Link>
                <a className="submenu_link" href="/about-us/management">
                  Management
                </a>
                <Link className="submenu_link" href="">
                  Principal
                </Link>
                <a className="submenu_link" href="/about-us/oronogram">
                  Oranogram
                </a>
                <Link
                  className="submenu_link"
                  href="/about-us/mandatory_disclosure"
                >
                  Mandatory Disclosure
                </Link>
                <Link className="submenu_link" href="/about-us/EoA">
                  AICTCE EOA
                </Link>
                <Link className="submenu_link" href="">
                  Student code of conduct and ethics
                </Link>
                <Link className="submenu_link" href="">
                  Internal quality assurance cell
                </Link>
                <Link className="submenu_link" href="">
                  Gallery{" "}
                </Link>
                <Link
                  className="submenu_link"
                  href="/about-us/admission_and_accounts"
                >
                  admission and accounts{" "}
                </Link>
                <Link className="submenu_link" href="">
                  PTA{" "}
                </Link>
                <Link className="submenu_link" href="">
                  Sister institutions
                </Link>
                <Link className="submenu_link" href="">
                  contact us
                </Link>
                <Link className="submenu_link" href="/about-us/feedback">
                  feedback
                </Link>
              </ul>
            </div>
          </div>
          <div className="navbar_menu">
            <span>Autonomous</span>
            <div className="submenu">
              <ul>
                <Link className="submenu_link" href="">
                  conferments
                </Link>
                <Link className="submenu_link" href="">
                  governing body
                </Link>
                <Link className="submenu_link" href="">
                  academic council
                </Link>
                <Link className="submenu_link" href="">
                  Finance commitee
                </Link>
                <Link className="submenu_link" href="">
                  Board of studies
                </Link>
                <Link className="submenu_link" href="">
                  regulations{" "}
                </Link>
                <Link className="submenu_link" href="">
                  acadamic calandar
                </Link>
                <Link className="submenu_link" href="">
                  Examinations cell
                </Link>
                <Link className="submenu_link" href="">
                  curriculam and syllbus
                </Link>
              </ul>
            </div>
          </div>

          <div className="navbar_menu">
            <span>Academics</span>
            <div className="submenu">
              <ul>
                <Link className="submenu_link" href="">
                  advisory system
                </Link>
                <Link className="submenu_link" href="">
                  acadamic calendar
                </Link>
                <Link className="submenu_link" href="">
                  proffetinal bodies
                </Link>
                <Link className="submenu_link" href="">
                  handbook{" "}
                </Link>
                <Link className="submenu_link" href="">
                  NSS
                </Link>
                <Link className="submenu_link" href="">
                  syllubus{" "}
                </Link>
                <Link className="submenu_link" href="">
                  campus newsletter
                </Link>
              </ul>
            </div>
          </div>

          <div className="navbar_menu">
            <span>Departments</span>
            <div className="submenu">
              <ul>
                <Link
                  className="submenu_link"
                  href="/departments/computer-science-engineering/"
                >
                  Computer Science and engineering
                </Link>
                <Link
                  className="submenu_link"
                  href="/departments/electrical-electronics-engineering/"
                >
                  EEE
                </Link>
                <Link
                  className="submenu_link"
                  href="/departments/electronics-communication-engineering"
                >
                  ECE
                </Link>
                <Link
                  className="submenu_link"
                  href="/departments/mechanical-engineering"
                >
                  Mechanical
                </Link>
                <Link
                  className="submenu_link"
                  href="/departments/artificial-intelligence-machine-learning"
                >
                  Computer Science with AI
                </Link>
                <Link
                  className="submenu_link"
                  href="/departments/electronics-computer-engineering"
                >
                  Electronics and Computer Engineering
                </Link>
                <Link
                  className="submenu_link"
                  href="/departments/civil-engineering"
                >
                  Civil Engineering
                </Link>
                <Link
                  className="submenu_link"
                  href="/departments/mathematics-and-basic-sciences"
                >
                  Basic Science and Humanities
                </Link>
                <Link
                  className="submenu_link"
                  href="/departments/food-technology"
                >
                  Food Sciencess
                </Link>
                <Link
                  className="submenu_link"
                  href="/departments/biotechnology-biochemical-engineering"
                >
                  Biotechnology and Biochemical Engineering
                </Link>
              </ul>
            </div>
          </div>

          <div className="navbar_menu">
            <span>Admissions</span>
            <div className="submenu">
              <ul>
                <Link className="submenu_link" href="">
                  Under Grdaduate
                </Link>
                <Link className="submenu_link" href="">
                  Post Graduate
                </Link>
                <Link className="submenu_link" href="">
                  PHD Research
                </Link>
                <Link className="submenu_link" href="">
                  International Students Admimission
                </Link>
              </ul>
            </div>
          </div>

          <div className="navbar_menu">
            <span>Placements</span>
            <div className="submenu">
              <ul>
                <Link className="submenu_link" href="">
                  Team
                </Link>
                <Link className="submenu_link" href="">
                  Activities
                </Link>
                <Link className="submenu_link" href="">
                  Recruiters
                </Link>
                <Link className="submenu_link" href="">
                  Placement Details
                </Link>
                <Link className="submenu_link" href="">
                  Contact Us
                </Link>
              </ul>
            </div>
          </div>

          <div className="navbar_menu">
            <span>Cells and Chapters</span>
            <div className="submenu">
              <ul>
                <Link className="submenu_link" href="">
                  Various Cells and Commities{" "}
                </Link>
                <Link className="submenu_link" href="">
                  IEEE
                </Link>
                <Link className="submenu_link" href="">
                  IE(I)
                </Link>
                <Link className="submenu_link" href="">
                  SAE India
                </Link>
                <Link className="submenu_link" href="">
                  NSS
                </Link>
                <Link className="submenu_link" href="">
                  SAC
                </Link>
                <Link className="submenu_link" href="">
                  Virual Lab{" "}
                </Link>
                <Link className="submenu_link" href="">
                  IEDC
                </Link>
                <Link className="submenu_link" href="">
                  NPTEL
                </Link>
                <Link className="submenu_link" href="">
                  IIT-remote center
                </Link>
              </ul>
            </div>
          </div>

          <div className="navbar_menu">
            <span>Facilities</span>
            <div className="submenu">
              <ul>
                <Link className="submenu_link" href="/facilities/cells">
                  Cells and Centers
                </Link>
                <Link className="submenu_link" href="/facilities/library">
                  Central Library{" "}
                </Link>
                <Link className="submenu_link" href="/facilities/hall">
                  Conference hall
                </Link>
                <Link className="submenu_link" href="/facilities/bus">
                  conveyance and bus routes
                </Link>
                <Link className="submenu_link" href="/facilities/reprographic">
                  repographics facilities
                </Link>
                <Link className="submenu_link" href="/facilities/lab">
                  internal Lab
                </Link>
                <Link className="submenu_link" href="/facilities/hostel">
                  hostel{" "}
                </Link>
                <Link className="submenu_link" href="/facilities/canteen">
                  canteen{" "}
                </Link>
                <Link className="submenu_link" href="/facilities/other">
                  other facilities{" "}
                </Link>
              </ul>
            </div>
          </div>

          <div className="navbar_menu">
            <span>Accreditation</span>
            <div className="submenu">
              <ul>
                <div className="submenu_link" href="">
                  NAAC
                  <div className="submenu_2">
                    <ul>
                      <Link
                        href="/accreditation/NAAC/Cycle1"
                        className="submenu_2_link"
                      >
                        NAAC CYCLE1
                      </Link>
                      <Link
                        href="/accreditation/NAAC/Cycle2"
                        className="submenu_2_link"
                      >
                        NAAC CYCLE1
                      </Link>
                      <Link
                        href="/accreditation/NAAC/Cycle3"
                        className="submenu_2_link"
                      >
                        NAAC CYCLE1
                      </Link>
                    </ul>
                  </div>
                </div>

                <Link className="submenu_link" href="">
                  NBA
                </Link>
                <Link className="submenu_link" href="">
                  NIRF
                </Link>
                <Link className="submenu_link" href="">
                  ARIIA
                </Link>
              </ul>
            </div>
          </div>

          <div className="navbar_menu">
            <span>Alumini</span>
            <div className="towards_left submenu">
              <ul>
                <Link className="submenu_link" href="">
                  Alumini Registration
                </Link>
                <Link className="submenu_link" href="">
                  Executive Body
                </Link>
                <Link className="submenu_link" href="">
                  IPR
                </Link>
                <Link className="submenu_link" href="">
                  Alumini Reports
                </Link>
              </ul>
            </div>
          </div>

          <div className="navbar_menu">
            <span>Research</span>
            <div className="towards_left submenu">
              <ul>
                <Link className="submenu_link" href="/research/council">
                  Reserach Coucil
                </Link>
                <Link className="submenu_link" href="/research/projects">
                  Projects
                </Link>
                <Link className="submenu_link" href="/research/ipr">
                  IPR
                </Link>
                <Link className="submenu_link" href="/research/consultancy">
                  Consultency
                </Link>
              
                <Link className="submenu_link" href="/research/conference">
                  Conferences organized
                </Link>
              </ul>
            </div>
          </div>



        


        </div>
                */}
      </div>
    </div>
  );
}
