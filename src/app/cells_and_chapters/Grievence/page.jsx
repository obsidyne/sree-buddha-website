"use client";
import React, { useState } from 'react';
import { Scale, HeartHandshake, ShieldCheck, Award, User, Mail, Phone, FileText, Download, Send } from 'lucide-react';

export default function StudentGrievanceCell() {
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    studentPhone: '',
    admissionNumber: '',
    department: '',
    semester: '',
    grievanceCategory: '',
    grievanceDescription: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Create the email message format
      const emailMessage = `
Student Grievance Submission

Student Details:
-----------------
Name: ${formData.studentName}
Email: ${formData.studentEmail}
Phone: ${formData.studentPhone}
Admission Number: ${formData.admissionNumber}
Department: ${formData.department}
Semester: ${formData.semester}

Grievance Details:
------------------
Category: ${formData.grievanceCategory}

Description:
${formData.grievanceDescription}

---
This grievance was submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `.trim();

      // Send to Strapi CMS
      const response = await fetch('https://sbce.ac.in/api/grievances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            message: emailMessage
          }
        }),
      });

      if (response.ok) {
        // Show success message
        setShowSuccess(true);
        setShowError(false);
        
        // Reset form after a delay
        setTimeout(() => {
          setFormData({
            studentName: '',
            studentEmail: '',
            studentPhone: '',
            admissionNumber: '',
            department: '',
            semester: '',
            grievanceCategory: '',
            grievanceDescription: ''
          });
          setShowSuccess(false);
        }, 5000);
      } else {
        throw new Error('Failed to send grievance');
      }
    } catch (error) {
      console.error('Error submitting grievance:', error);
      setShowError(true);
      setShowSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const objectives = [
    {
      icon: <Scale className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Fair & Impartial Mechanism",
      description: "Provide a fair, impartial, and consistent mechanism for redressal of student grievances."
    },
    {
      icon: <HeartHandshake className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Harmonious Environment",
      description: "Promote a harmonious educational environment by addressing issues promptly and effectively."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Confidentiality & Sensitivity",
      description: "Ensure confidentiality and sensitivity in handling grievances."
    },
    {
      icon: <Award className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />,
      title: "Uphold Dignity",
      description: "Uphold the dignity of the institution by fostering respectful relationships among students, faculty, and staff."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header section */}
          <div className="bg-gradient-to-r from-yellow-700 to-amber-500 p-4 sm:p-6 md:p-10">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
              Student Grievance Redressal Cell
            </h1>
            <div className="h-1 w-16 sm:w-20 bg-white opacity-70 mb-3 sm:mb-4"></div>
            <p className="text-white text-base sm:text-lg opacity-90">
              Ensuring a fair and harmonious educational environment
            </p>
          </div>
          
          <div className="p-4 sm:p-6 md:p-10">
            {/* Introduction */}
            <div className="mb-6 sm:mb-8 text-gray-700 text-base sm:text-lg leading-relaxed">
              <p>
                As per the directives of APJ Abdul Kalam Technological University (APJAKTU), engineering colleges affiliated with the university are required to establish a Student Grievance Redressal Committee (SGRC). This committee serves as a structured mechanism to address and resolve student grievances related to academic, administrative, and other matters within the institution.
              </p>
            </div>
            
            {/* Objectives */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Objectives</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
              {objectives.map((objective, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow duration-300 border-l-4 border-yellow-800">
                  <div className="flex flex-col sm:flex-row sm:items-start">
                    <div className="mb-3 sm:mb-0 sm:mr-4 sm:mt-1 flex-shrink-0">{objective.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">{objective.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{objective.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Convener Information */}
            <div className="mb-8 sm:mb-10">
              <div className="bg-amber-50 rounded-lg p-4 sm:p-6 border-l-4 border-yellow-800">
                <h3 className="text-lg sm:text-xl font-semibold text-amber-900 mb-4">Committee Convener</h3>
                <div className="space-y-3 text-amber-900">
                  <div className="flex items-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base"><strong>Dr. Sujith Kumar P.S.</strong></span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Email: <a href="mailto:cs.sujith@sbcemail.in" className="text-yellow-800 hover:underline">cs.sujith@sbcemail.in</a></span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Phone: <a href="tel:+919447712358" className="text-yellow-800 hover:underline">+91 9447712358</a></span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Additional Information */}
            <div className="mb-8 sm:mb-10">
              <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6">
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Additional Information
                </h4>
                <p className="text-gray-600 text-sm sm:text-base mb-3">
                  For detailed guidelines, committee structure, and grievance procedures, please refer to the official documentation.
                </p>
                <a 
                  href="Student Grievance Redressal Committee.docx"
                  download
                  className="text-yellow-800 hover:text-yellow-900 font-medium text-sm sm:text-base flex items-center"
                >
                  <Download className="w-4 h-4 mr-1" />
                  Click Here
                </a>
              </div>
            </div>
            
            {/* Grievance Submission Form */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Submit Your Grievance</h2>
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 md:p-8">
              {/* Success Message */}
              {showSuccess && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-800 p-4 mb-6 rounded">
                  <p className="font-semibold">Success!</p>
                  <p className="text-sm">Your grievance has been submitted successfully. The committee will review it and contact you soon.</p>
                </div>
              )}
              
              {/* Error Message */}
              {showError && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 mb-6 rounded">
                  <p className="font-semibold">Error!</p>
                  <p className="text-sm">There was a problem submitting your grievance. Please try again or contact the committee directly.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="studentName"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-800 focus:border-transparent outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="email"
                      id="studentEmail"
                      name="studentEmail"
                      value={formData.studentEmail}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-800 focus:border-transparent outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="studentPhone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="studentPhone"
                      name="studentPhone"
                      value={formData.studentPhone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-800 focus:border-transparent outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="admissionNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Admission Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="admissionNumber"
                      name="admissionNumber"
                      value={formData.admissionNumber}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-800 focus:border-transparent outline-none transition"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                      Course <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-800 focus:border-transparent outline-none transition"
                    >
                      <option value="">Select Course</option>
                      <option value="Computer Science">Computer Science Engineering</option>
                      <option value="Electronics">Electronics & Communication Engineering</option>
                      <option value="Electrical">Electrical & Electronics Engineering</option>
                      <option value="Mechanical">Mechanical Engineering</option>
                      <option value="Civil">Civil Engineering</option>
                      <option value="AI">Computer Science Engineering[AI]</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="semester" className="block text-sm font-medium text-gray-700 mb-2">
                      Semester <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="semester"
                      name="semester"
                      value={formData.semester}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-800 focus:border-transparent outline-none transition"
                    >
                      <option value="">Select Semester</option>
                      <option value="S1">S1</option>
                      <option value="S2">S2</option>
                      <option value="S3">S3</option>
                      <option value="S4">S4</option>
                      <option value="S5">S5</option>
                      <option value="S6">S6</option>
                      <option value="S7">S7</option>
                      <option value="S8">S8</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 sm:mt-6">
                  <label htmlFor="grievanceCategory" className="block text-sm font-medium text-gray-700 mb-2">
                    Grievance Category <span className="text-red-600">*</span>
                  </label>
                  <select
                    id="grievanceCategory"
                    name="grievanceCategory"
                    value={formData.grievanceCategory}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-800 focus:border-transparent outline-none transition"
                  >
                    <option value="">Select Category</option>
                    <option value="Academic">Academic Related</option>
                    <option value="Administrative">Administrative Related</option>
                    <option value="Infrastructure">Infrastructure Related</option>
                    <option value="Faculty">Faculty Related</option>
                    <option value="Examination">Examination Related</option>
                    <option value="Hostel">Hostel Related</option>
                    <option value="Library">Library Related</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="mt-4 sm:mt-6">
                  <label htmlFor="grievanceDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description of Grievance <span className="text-red-600">*</span>
                  </label>
                  <textarea
                    id="grievanceDescription"
                    name="grievanceDescription"
                    value={formData.grievanceDescription}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    placeholder="Please provide a detailed description of your grievance..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-800 focus:border-transparent outline-none transition resize-vertical"
                  ></textarea>
                </div>
                
                <div className="mt-6 sm:mt-8">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-yellow-700 to-amber-500 hover:from-yellow-800 hover:to-amber-600 text-white px-6 py-3 rounded-md font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Submit Grievance
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}