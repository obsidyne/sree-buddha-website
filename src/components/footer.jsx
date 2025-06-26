import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black  list-none text-white pt-12 pb-6">
      <div className="mx-auto w-full max-w-screen-xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-12 gap-y-10">
          {/* Logo and Address Section */}
          <div className="space-y-6">
            <div className="flex justify-center md:justify-start">
              <img
                src="/assets/images/logo-removebg-preview.png"
                alt="Sree Buddha College of Engineering"
                className="h-20 w-auto"
              />
            </div>
            <div className="text-center md:text-left">
              <p className="font-semibold text-yellow-500 mb-1">
                SREE BUDDHA COLLEGE OF ENGINEERING
              </p>
              <address className="text-gray-400 not-italic text-sm leading-relaxed">
                Pattoor, P.O, Nooranad, Padanilam,<br />
                Kerala, 690529
              </address>
            </div>
          </div>

          {/* Information Section */}
          <div className="md:mt-4">
            <h3 className="text-lg font-bold mb-5 text-center md:text-left after:content-[''] after:block after:w-12 after:h-1 after:bg-yellow-600 after:mt-1 after:mx-auto md:after:mx-0">
              Information
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <li><a href="/accreditation/NIRF" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">NIRF</a></li>
              <li><a href="/accreditation/NBA" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">NBA</a></li>
              <li><a href="/accreditation/NAAC/Cycle1" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">NAAC</a></li>
              <li><a href="/about-us/EoA" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">AICTE EoA</a></li>
              
            </ul>
          </div>

          {/* College Section */}
          <div className="md:mt-4">
            <h3 className="text-lg font-bold mb-5 text-center md:text-left after:content-[''] after:block after:w-12 after:h-1 after:bg-yellow-600 after:mt-1 after:mx-auto md:after:mx-0">
              College
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Mandatory Disclosure</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Anti Ragging Cell</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Corporate Video</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Sitemap</a></li>
            </ul>
          </div>

          {/* Links Section */}
          <div className="md:mt-4">
            <h3 className="text-lg font-bold mb-5 text-center md:text-left after:content-[''] after:block after:w-12 after:h-1 after:bg-yellow-600 after:mt-1 after:mx-auto md:after:mx-0">
              Links
            </h3>
            <ul className="list-none space-y-3 text-center md:text-left">
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Students</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Staff</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">SBCE Moodle</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition-colors text-sm">Grievance Redressal</a></li>
            </ul>
          </div>

          {/* Quick Enquiry Section */}
          <div className="md:mt-4">
            <h3 className="text-lg font-bold mb-5 text-center md:text-left after:content-[''] after:block after:w-12 after:h-1 after:bg-yellow-600 after:mt-1 after:mx-auto md:after:mx-0">
              Quick Enquiry
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              <li className="text-gray-400 text-sm">Ms. Sholly Joseph</li>
              <li className="text-gray-400 text-sm">PRO</li>
              <li>
                <a href="tel:+919446014317" className="text-yellow-500 hover:underline text-sm">
                  PH: 9446014317
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Social Media Links */}
        

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 pb-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-xs text-gray-500">
                © {currentYear} <span className="text-yellow-500">Sree Buddha College of Engineering</span>. All Rights Reserved.
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-xs text-gray-500">
                Designed and Developed by <a href="https://www.obsidyne.com" className="text-yellow-500 hover:underline">OBSIDYNE</a>
              </p></div>
          </div>
        </div>
      </div>
    </footer>
  );
}