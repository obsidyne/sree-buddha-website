// Next.js page component for /autonomous/about_autonomy
'use client'
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import styles from './autonomy.module.css'; // assuming you'll save the CSS as a module

export default function AboutAutonomy() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuOpen && !e.target.closest('.mobile-menu') && !e.target.closest(`.${styles.menuButton}`)) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [menuOpen]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [menuOpen]);

  return (
    <>
      <Head>
        <title>Autonomy Status - Sree Buddha College of Engineering</title>
        <meta name="description" content="Sree Buddha College of Engineering has achieved autonomy status, marking a new era of academic excellence and innovation." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className={styles.pageContainer}>
        {/* Header */}
        {/* <header className={styles.header}>
          <div className={styles.container}>
            <div className={styles.headerContent}>
              <div className={styles.logo}>
                <img src="/logo.png" alt="Sree Buddha College of Engineering" />
                <span>SBCE</span>
              </div>
              
              <nav className={styles.desktopNav}>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/academics">Academics</a></li>
                  <li><a href="/admissions">Admissions</a></li>
                  <li><a href="/research">Research</a></li>
                  <li><a href="/contact">Contact</a></li>
                </ul>
              </nav>
              
              <div 
                className={styles.menuButton} 
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <span className={menuOpen ? styles.active : ''}></span>
                <span className={menuOpen ? styles.active : ''}></span>
                <span className={menuOpen ? styles.active : ''}></span>
              </div>
            </div>
          </div>
        </header> */}
        
        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ''}`}>
          <nav>
            <ul>
              <li><a href="/" onClick={() => setMenuOpen(false)}>Home</a></li>
              <li><a href="/about" onClick={() => setMenuOpen(false)}>About</a></li>
              <li><a href="/academics" onClick={() => setMenuOpen(false)}>Academics</a></li>
              <li><a href="/admissions" onClick={() => setMenuOpen(false)}>Admissions</a></li>
              <li><a href="/research" onClick={() => setMenuOpen(false)}>Research</a></li>
              <li><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
            </ul>
          </nav>
        </div>
        
        {/* Hero Section */}
        <section className={styles.heroSection}>
  <div className={styles.heroBackground}>
    <img src="/college-campus.jpg" alt="College Campus" />
  </div>
  <div className={styles.container}>
    <div className={styles.heroContent}>
      <div className={styles.heroText}>
        <h1>Sree Buddha College of Engineering Attains Autonomy</h1>
        <h2>A New Era of Excellence</h2>
        <div className={styles.heroButtons}>
          <a href="..\admissions\undergraduate" className={`${styles.btn} ${styles.primaryBtn}`}>Apply Now</a>
          <a href="..\about-us\profile" className={`${styles.btn} ${styles.secondaryBtn}`}>Learn More</a>
        </div>
      </div>
      <div className={styles.heroImage}>
        <img  src="/assets/images/profile_pic.png"  alt="Sree Buddha College of Engineering Main Building" />
      </div>
    </div>
  </div>
</section>
        
        {/* Introduction Section */}
        <section className={styles.introSection}>
          <div className={styles.container}>
            <div className={styles.introContent}>
              <p>
                Since its establishment in 2002, Sree Buddha College of Engineering has been dedicated to 
                offering top-tier professional education, with a special focus on students from diverse 
                backgrounds, particularly those from rural areas. Over the years, the college has progressed to 
                meet industry needs and maintain academic excellence. Its achievements have been 
                recognized by various accreditation boards including NBA and NAAC. The institution has 
                been accredited with an &apos;A&apos; grade for outstanding infrastructure and operations. Now, we 
                have achieved yet another milestone: attaining autonomous status from the academic year 
                2024-25.
              </p>
              <p>
                This prestigious recognition, granted by the University Grants Commission (UGC), marks     
                the beginning of a new chapter in our pursuit for excellence. With autonomy, the institution 
                now has greater flexibility to design a curriculum and syllabus that aligns with the National 
                Education Policy (NEP) 2020, providing us with the freedom to adapt quickly to changing 
                industry trends and technological advancements. This enhanced flexibility will also allow us 
                to offer more research opportunities, improve employability and provide a dynamic learning 
                experience for all our students.
              </p>
            </div>
          </div>
        </section>
        
        {/* Benefits Section */}
        <section className={styles.benefitsSection}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Key Benefits of Autonomy</h2>
            
            <div className={styles.benefitsGrid}>
              <div className={styles.benefitCard}>
                <div className={styles.benefitNumber}>1</div>
                <h3>Industry-Aligned Curriculum</h3>
                <p>
                  With autonomy, the institution has the freedom to design courses based on industry needs and global standards. A team of experienced professors from our institution and other reputed institutions, including foreign universities, along with industry experts for each field of study, guides the curriculum design.
                </p>
              </div>
              
              <div className={styles.benefitCard}>
                <div className={styles.benefitNumber}>2</div>
                <h3>Efficient Academic Administration</h3>
                <p>
                  As part of our autonomy, the institution has an independent academic administration system consisting of three main bodies: the Board of Studies, the Academic Council and the Governing Body. These committees include expert academicians, industry specialists, and other stakeholders.
                </p>
              </div>
              
              <div className={styles.benefitCard}>
                <div className={styles.benefitNumber}>3</div>
                <h3>Streamlined Assessment Processes</h3>
                <p>
                  With autonomy, the institution can independently plan, organize, schedule, and conduct exams to ensure a smooth and timely assessment process. We have an efficient examination administration system that maintains high standards and confidentiality.
                </p>
              </div>
              
              <div className={styles.benefitCard}>
                <div className={styles.benefitNumber}>4</div>
                <h3>Innovative Learning Environment</h3>
                <p>
                  The institution gives great importance to project-based learning, ensuring that students gain practical experience and develop essential skills through hands-on projects at different levels—micro, mini, and main—throughout the program.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* NAAC Section */}
        <section className={styles.naacSection}>
          <div className={styles.container}>
            <div className={styles.naacContent}>
              <div className={styles.naacImage}>
                <img src={"/assets/images/accreditation/cycle1.png"} alt="NAAC Accreditation" />
              </div>
              <div className={styles.naacText}>
                <h2>NAAC &apos;A&apos; Grade Reaccreditation</h2>
                <p>
                  Adding to its prestige, the college has recently been re-accredited with an &apos;A&apos; grade by the National Assessment and Accreditation Council (NAAC), recognizing its commitment to high academic standards, strong infrastructure, experienced faculty, and remarkable achievements. The Management&apos;s visionary leadership and expertise in academics and administration have played a key role in establishing and upholding the college as a center of excellence with reputed accreditations.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Examination & Evaluation Block Section */}
        <section className={styles.naacSection}>
          <div className={styles.container}>
            <div className={styles.naacContent}>
              <div className={styles.naacImage}>
                <img src="/assets/images/autonomous/examination-evaluation-block.jpeg" alt="Examination & Evaluation Block - Office of the Controller of Examinations" />
              </div>
              <div className={styles.naacText}>
                <h2>Examination & Evaluation Block</h2>
                <p>
                  As part of the infrastructure supporting our autonomous status, the college has a dedicated Examination & Evaluation Block that houses the Office of the Controller of Examinations. This facility manages all examination scheduling, conduct, and evaluation processes, ensuring the smooth, transparent, and confidential administration of assessments under our autonomous framework.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className={styles.quoteSection}>
          <div className={styles.container}>
            <blockquote>
              <p>&quot;An idea that is developed and put into action is more important than an idea that exists only as an idea.&quot;</p>
              <cite>- Buddha</cite>
            </blockquote>
            <p className={styles.conclusion}>
              Guided by this philosophy, Sree Buddha College of Engineering continues to transform knowledge into action, empowering students to build a better future for themselves and society in an autonomous environment.
            </p>
          </div>
        </section>

       
      </div>
    </>
  );
}