import React from 'react';
import Link from 'next/link';

export default function Consultancy() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="relative bg-gradient-to-b from-yellow-50 to-white">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-yellow-900/10 pattern-diagonal-lines pattern-yellow-500/20 pattern-bg-white pattern-size-4" aria-hidden="true" />
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-12">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-900 mb-2">
              CONSULTANCY
            </h1>
            <div className="w-16 sm:w-32 h-1 bg-yellow-900 mx-auto mb-3" aria-hidden="true" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Civil Engineering Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-yellow-900 pl-3">
            DEPARTMENT OF CIVIL ENGINEERING
          </h2>
          <div className="bg-yellow-50 rounded-lg p-4 sm:p-6 shadow-sm">
            <p className="text-sm sm:text-base text-gray-700">
              The Civil Engineering Department undertakes consultancy works of which the major clients are KSEB, PWD, Kerala 
              Housing Board, LSGD, Southern Railway, Manhaar Constructions, EJ constructions, Ultratech cements, RAMCO cements, 
              WAPCOS Pvt. Ltd. We also undertake consultancy for student project works from nearby colleges.
            </p>
          </div>
        </section>

        {/* Biotechnology Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-yellow-900 pl-3">
            DEPARTMENT OF BIOTECHNOLOGY & BIOCHEMICAL ENGINEERING
          </h2>
          
          <div className="bg-yellow-50 rounded-lg p-4 sm:p-6 shadow-sm mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 underline">
              The Bioresearch Division
            </h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              SBCE Pattoor- Bio-Research Division of the Department of Biotechnology & Biochemical Engineering 
              is undertaking Consultancy and Services to external users from academia/Industry at nominal rates.
            </p>
            <p className="text-sm sm:text-base text-gray-700 font-semibold">
              The following facilities/testing are available:
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow-sm mb-8">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-yellow-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Sl.No
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Name of the Equipment/ Test
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="bg-yellow-50 font-semibold">
                  <td colSpan="2" className="px-4 py-2 text-sm">Microbiology Division</td>
                </tr>
                {[
                  "Gram Staining",
                  "Total Microbial Load",
                  "Anti Microbial Activity testing by Agar Diffusion Method",
                  "Total Yeast/Mold Count"
                ].map((item, index) => (
                  <tr key={index} className="hover:bg-yellow-50">
                    <td className="px-4 py-2 text-sm">{index + 1}.</td>
                    <td className="px-4 py-2 text-sm">{item}</td>
                  </tr>
                ))}
                <tr className="bg-yellow-50 font-semibold">
                  <td colSpan="2" className="px-4 py-2 text-sm">Spectroscopy</td>
                </tr>
                {[
                  "UV-Visible Spectroscopy",
                  "Fluorescence Spectroscopy"
                ].map((item, index) => (
                  <tr key={index + 5} className="hover:bg-yellow-50">
                    <td className="px-4 py-2 text-sm">{index + 5}.</td>
                    <td className="px-4 py-2 text-sm">{item}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Instructions Section */}
          <div className="space-y-6">
            <div className="bg-yellow-50 rounded-lg p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">HOW TO SUBMIT THE SAMPLES</h3>
              <ul className="list-disc list-inside space-y-3 text-sm sm:text-base text-gray-700">
                <li>The samples should be submitted <span className="font-semibold">along with official letter from the institute/industry, attested by the head of the institute and the supervisor.</span> The Official letter should contain the mail ID and address to which the results and bill need to be dispatched.</li>
                <li>Only on receipt of the payment along with the samples, they will be registered for analysis and taken up for measurement. As soon as the analysis is over, the spectra along with the receipt / bill will be sent to the users.</li>
                <li>While submitting samples for more than one analysis separate samples are to be sent for each.</li>
                <li>Form-I, available in the website, need to be filled and submitted along with the samples.</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 sm:p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">MODE OF PAYMENT</h3>
              <p className="text-sm sm:text-base text-gray-700 mb-4">
                For details on analysis charges contact <span className="font-semibold">&quot;The In-Charge, Research & Consultancy, BT & BCE Dept, OR, HoD, BT & BCE&quot;</span> in the following:
              </p>
              <div className="space-y-2">
                <p className="text-sm sm:text-base">E-mail: <span className="font-semibold">bioresearchsbce@gmail.com</span></p>
                <p className="text-sm sm:text-base">Telephone: +91 9562562754, +91 8281868205</p>
              </div>
            </div>

            {/* Attachments */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Attachments</h3>
              <div className="flex flex-wrap gap-4">
                <Link href="/assets/documents/research/Work-Order-Form-1.pdf" target="_blank">
                  <button className="px-4 py-2 bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition-colors text-sm sm:text-base">
                    Work Order Form
                  </button>
                </Link>
                <Link href="/assets/documents/research/Instructions.pdf" target="_blank">
                  <button className="px-4 py-2 bg-yellow-900 text-white rounded-md hover:bg-yellow-800 transition-colors text-sm sm:text-base">
                    Instructions
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Computer Science and Engineering Section */}
        <section className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 border-l-4 border-yellow-900 pl-3">
            DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING
          </h2>
          <div className="bg-yellow-50 rounded-lg p-4 sm:p-6 shadow-sm">
            <p className="text-sm sm:text-base text-gray-700">
              Consultancy Project with Sree Narayana Ayurvedic Medical College and Research Center in &quot;Application of Artificial Intelligence in Ayurvedic Health Care&quot;
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}