"use client"
import React, { useState, useEffect } from 'react';
import './style.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
// import React, { useEffect, useState } from 'react';
const generateAndDownloadPDF = async (formData, applicationNo) => {
  const content = document.getElementById("pdf-content");
  if (!content) return;

  content.style.display = "block";
  const canvas = await html2canvas(content, {
    scale: 1.7,
    useCORS: true,
    allowTaint: true
  });
  content.style.display = "none";

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = pdfWidth;
  const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

  let heightLeft = imgHeight;
  let position = 0;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  // Additional pages
  while (heightLeft > 0) {
    position -= pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  const filename = `${applicationNo}.pdf`;
  pdf.save(filename);
};


const ApplicationForm = () => {
  const [applicationNo, setApplicationNo] = useState('');



  const [isSignedIn, setIsSignedIn] = useState(false);
  
  //  initializing google drive 
  
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    nationality: '',
    religion: '',
    community: '',
    motherTongue: '',
    parentName: '',
    relationship: '',
    address: '',
    pinCode: '',
    telephone: '',
    mobile: '',
    email: '',
    tenthBoard: '',
    tenthInstitution: '',
    tenthPassingDate: '',
    tenthMarks: '',
    tenthMaxMarks: '',
    tenthPercentage: '',
    twelfthBoard: '',
    twelfthInstitution: '',
    twelfthPassingDate: '',
    twelfthMarks: '',
    twelfthMaxMarks: '',
    twelfthPercentage: '',
    boardDiploma: '',
    institutionDiploma: '',
    dateDiploma: '',
    diplomaMarks: '',
    diplomaMaxMarks : '',
    // diplomaPercentage: '',
    mpcMarks: '',
    mpcMaxMarks: '',
    entranceExam: '',
    entranceRegNo: '',
    entranceRank: '',
    branchPreference: '',
    admissionType: '',
    photo: null,
    photoPreview: null,
    parentSignature: null,
    parentSignaturePreview: null,
    applicantSignature: null,
    applicantSignaturePreview: null
  });

  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form sections for navigation
  const formSections = [
    "Personal Information",
    "Guardian Information",
    "Contact Information",
    "Educational Details",
    "Entrance & Preferences",
    "Document Uploads"
  ];

  // Auto calculate percentages
  useEffect(() => {
    if (formData.tenthMarks && formData.tenthMaxMarks) {
      const percentage = ((parseFloat(formData.tenthMarks) / parseFloat(formData.tenthMaxMarks)) * 100).toFixed(2);
      setFormData(prev => ({ ...prev, tenthPercentage: percentage }));
    }
    
    if (formData.twelfthMarks && formData.twelfthMaxMarks) {
      const percentage = ((parseFloat(formData.twelfthMarks) / parseFloat(formData.twelfthMaxMarks)) * 100).toFixed(2);
      setFormData(prev => ({ ...prev, twelfthPercentage: percentage }));
    }
    
    if (formData.diplomaMarks && formData.diplomaMaxMarks) {
      const percentage = ((parseFloat(formData.diplomaMarks) / parseFloat(formData.diplomaMaxMarks)) * 100).toFixed(2);
      setFormData(prev => ({ ...prev, diplomaPercentage: percentage }));
    }
    
    // Clean up any created object URLs when component unmounts
    return () => {
      if (formData.photoPreview) URL.revokeObjectURL(formData.photoPreview);
      if (formData.parentSignaturePreview) URL.revokeObjectURL(formData.parentSignaturePreview);
      if (formData.applicantSignaturePreview) URL.revokeObjectURL(formData.applicantSignaturePreview);
    };
  }, [
    formData.tenthMarks, formData.tenthMaxMarks,
    formData.twelfthMarks, formData.twelfthMaxMarks,
    formData.diplomaMarks, formData.diplomaMaxMarks,
    formData.photoPreview, formData.parentSignaturePreview, formData.applicantSignaturePreview
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field when user makes changes
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      // Validate file type
      const fileType = files[0].type;
      if (!fileType.startsWith('image/')) {
        setErrors({
          ...errors,
          [name]: 'Please upload an image file (JPEG, PNG, etc.)'
        });
        return;
      }
      
      // Validate file size (max 2MB)
      if (files[0].size > 2 * 1024 * 1024) {
        setErrors({
          ...errors,
          [name]: 'File size must be less than 2MB'
        });
        return;
      }

      // Create URL for preview
      const fileUrl = URL.createObjectURL(files[0]);
      
      setFormData(prev => ({
        ...prev,
        [name]: files[0],
        [`${name}Preview`]: fileUrl
      }));
      
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: ''
        });
      }
    }
  };

  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Validate mandatory fields
    const mandatoryFields = [
      'name', 'dob', 'gender', 'nationality', 'religion', 'community', 'motherTongue',
      'parentName', 'relationship', 'address', 'pinCode', 'mobile', 'email',
      'mpcMarks', 'mpcMaxMarks', 'branchPreference', 'admissionType', 'photo',
      'parentSignature', 'applicantSignature'
    ];

    mandatoryFields.forEach(field => {
      if (!formData[field]) {
        tempErrors[field] = 'This field is required';
        isValid = false;
      }
    });

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    // Mobile validation
    if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
      tempErrors.mobile = 'Please enter a valid 10-digit mobile number';
      isValid = false;
    }

    // Pin code validation
    if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
      tempErrors.pinCode = 'Please enter a valid 6-digit PIN code';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Function to validate a specific section
  const validateSection = (sectionIndex) => {
    let tempErrors = {};
    let isValid = true;
    
    // Fields to validate for each section
    const sectionFields = {
      0: ['name', 'dob', 'gender', 'nationality', 'religion', 'community', 'motherTongue'],
      1: ['parentName', 'relationship'],
      2: ['address', 'pinCode', 'mobile', 'email'],
      3: ['mpcMarks', 'mpcMaxMarks'],
      4: ['branchPreference', 'admissionType'],
      5: ['photo', 'parentSignature', 'applicantSignature']
    };
    
    // Check required fields for this section
    sectionFields[sectionIndex].forEach(field => {
      if (['name', 'dob', 'gender', 'nationality', 'religion', 'community', 'motherTongue', 
           'parentName', 'relationship', 'address', 'pinCode', 'mobile', 'email',
           'mpcMarks', 'mpcMaxMarks', 'branchPreference', 'admissionType', 'photo',
           'parentSignature', 'applicantSignature'].includes(field) && !formData[field]) {
        tempErrors[field] = 'This field is required';
        isValid = false;
      }
    });
    
    // Section-specific validations
    if (sectionIndex === 2) {
      // Email validation
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        tempErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
      
      // Mobile validation
      if (formData.mobile && !/^\d{10}$/.test(formData.mobile)) {
        tempErrors.mobile = 'Please enter a valid 10-digit mobile number';
        isValid = false;
      }
      
      // Pin code validation
      if (formData.pinCode && !/^\d{6}$/.test(formData.pinCode)) {
        tempErrors.pinCode = 'Please enter a valid 6-digit PIN code';
        isValid = false;
      }
    }
    
    // Update errors state with the new errors
    setErrors(prev => ({
      ...prev,
      ...tempErrors
    }));
    
    return isValid;
  };
  
  // Handle section navigation with validation
  const handleNavigateSection = (nextIndex) => {
    // If moving forward, validate current section first
    if (nextIndex > activeSection) {
      if (!validateSection(activeSection)) {
        // Scroll to the first error in the section
        const firstErrorField = document.querySelector('.form-error');
        if (firstErrorField) {
          firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return; // Don't proceed if validation fails
      }
    }
    
    // If validation passes or moving backward, navigate to the next section
    navigateSection(nextIndex);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {

      const file1 = formData.photo;
      const parentSignature = formData.parentSignature;
      const applicantSignature = formData.applicantSignature;
      // Create a new FormData and append files with correct field names
      const file_upload_form_data = new FormData();
      if (file1) file_upload_form_data.append('files', file1);
      if (parentSignature) file_upload_form_data.append('files', parentSignature);
      if (applicantSignature) file_upload_form_data.append('files', applicantSignature);

        await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/upload`, {
          method : "POST",
          body: file_upload_form_data
        }).then((response)=>{
          return response.json()
        }).then(async (data)=>{
          console.log(data) 

          const jsonData = {
            data: {
              name: formData.name,
              dob: formData.dob,
              gender: formData.gender,
              nationality: formData.nationality,
              religion: formData.religion,
              community: formData.community,
              motherTongue: formData.motherTongue,
              parent: formData.parentName,
              relationship: formData.relationship,
              address: formData.address,
              pincode: formData.pinCode,
              telephone: formData.telephone || '',
              mobile: formData.mobile,
              email: formData.email,
              
              // Educational Information
              board10: formData.tenthBoard || '',
              institution10: formData.tenthInstitution || '',
              marks10: formData.tenthMarks || '',
              maximumMarks10: formData.tenthMaxMarks || '',
              percentage10: formData.tenthPercentage || '',
              date10: formData.tenthPassingDate || '',
              
              board12: formData.twelfthBoard || '',
              institution12: formData.twelfthInstitution || '',
              marks12: formData.twelfthMarks || '',
              maximumMarks12: formData.twelfthMaxMarks || '',
              percentage12: formData.twelfthPercentage || '',
              date12: formData.twelfthPassingDate || '',
              
              boardDiploma: formData.boardDiploma || '',
              institutionDiploma: formData.institutionDiploma || '',
              markDiploma: formData.diplomaMarks || '',
              maximumMarksDiploma: formData.diplomaMaxMarks || '',
              dateDiploma: formData.dateDiploma || '',
              
              pcm: formData.mpcMarks,
              maximumMarksPCM: formData.mpcMaxMarks,
              
              // Entrance & Preferences
              entrance: formData.entranceExam || '',
              regNo: formData.entranceRegNo || '',
              rank: formData.entranceRank || '',
              branchPrefered: formData.branchPreference,
              admissionType: formData.admissionType, 

              photo: data[0]['id'],
              parentSignature: data[1]['id'],
              applicantSignature: data[2]['id'],   
            }
          };
          
          console.log('Submitting JSON data:', jsonData);

                  // Submit to API
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/btech-admissions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
            body: JSON.stringify(jsonData)
          });
          
          // Log the response status for debugging
          console.log('Response status:', response.status);
          
          // Get response text first (safer than trying to parse JSON directly)
          const responseText = await response.text();
          console.log('Response text:', responseText);
          
          // Try to parse the response text as JSON if it's valid
          let responseData;
          try {
            if (responseText) {
              responseData = JSON.parse(responseText);
              console.log('Response data:', responseData);
            }
          } catch (parseError) {
            console.error('Error parsing response as JSON:', parseError);
          }
          
          if (!response.ok) {
            let errorMessage = 'Submission failed';
            
            // Use parsed JSON data if available, otherwise use text
            if (responseData) {
              errorMessage = responseData.error?.message || 
                            responseData.message || 
                            'API returned an error';
            } else if (responseText) {
              errorMessage = responseText;
            }
            
            throw new Error(errorMessage);
          }
          
          console.log('Form submitted successfully');
          
         
          
          setSubmitSuccess(true);
          setSubmitSuccess(true);
const today = new Date();
const datePart = today.toISOString().slice(2, 10).replace(/-/g, '');
const newApplicationNo = `SBCE25-UG-${datePart}${String(responseData.data.id).padStart(4, '0')}`;
setApplicationNo(newApplicationNo); // ✅ set it
await generateAndDownloadPDF(formData, newApplicationNo);

        } catch (apiError) {
          console.error('API error:', apiError);
          throw apiError; // Re-throw to be caught by the outer catch block
        }
        })
      } catch (error) {
        console.error('Submission error:', error);
        
        // Safely extract error message
        let errorMessage = 'Failed to submit the form';
        if (error instanceof Error) {
          errorMessage = `${errorMessage}: ${error.message}`;
        } else if (typeof error === 'object') {
          try {
            errorMessage = `${errorMessage}: ${JSON.stringify(error)}`;
          } catch (e) {
            errorMessage = `${errorMessage}: Unknown error object`;
          }
        }
        
        setErrors({
          submit: errorMessage
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Scroll to the first error
      const firstErrorField = document.querySelector('.form-error');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const navigateSection = (index) => {
    setActiveSection(index);
    // Scroll to section
    const sectionElement = document.getElementById(`section-${index}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Helper function to determine if a section has errors
  const sectionHasErrors = (sectionIndex) => {
    const sectionFields = {
      0: ['name', 'dob', 'gender', 'nationality', 'religion', 'community', 'motherTongue'],
      1: ['parentName', 'relationship'],
      2: ['address', 'pinCode', 'telephone', 'mobile', 'email'],
      3: ['tenthBoard', 'tenthMarks', 'tenthMaxMarks', 'twelfthBoard', 'twelfthMarks', 'twelfthMaxMarks', 'diplomaBoard', 'diplomaMarks', 'diplomaMaxMarks', 'mpcMarks', 'mpcMaxMarks'],
      4: ['entranceExam', 'entranceRegNo', 'entranceRank', 'branchPreference', 'admissionType'],
      5: ['photo', 'parentSignature', 'applicantSignature']
    };

    return sectionFields[sectionIndex]?.some(field => errors[field]);
  };

  if (submitSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon-container">
            <svg className="success-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="success-title">Application Submitted!</h2>
          <p className="success-message">Your application has been successfully submitted. You will receive a confirmation email shortly.</p>
          <button 
            onClick={() => setSubmitSuccess(false)}
            className="btn btn-primary"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="header">
        <div className="container">
          <h1>Application Form</h1>
        </div>
      </div>

      {/* Form Progress */}
      <div className="form-container py-8">
        <div className="hidden sm:block mb-8">
          <div className="form-progress">
            {formSections.map((section, index) => (
              <button
                key={index}
                onClick={() => navigateSection(index)}
                className={`form-progress-step ${activeSection === index ? 'active' : ''} ${sectionHasErrors(index) ? 'has-error' : ''}`}
              >
                <div className="hidden md:block">{section}</div>
                <div className="block md:hidden">
                  {index + 1}
                </div>
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {/* Personal Information */}
          <div id="section-0" className={`form-section ${activeSection === 0 ? 'block' : 'hidden'}`}>
            <div className="form-section-header">
              <h2>Personal Information</h2>
            </div>
            
            <div className="form-section-content">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Name of Applicant*
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="form-error">{errors.name}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="dob">
                    Date of Birth*
                  </label>
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`form-input ${errors.dob ? 'error' : ''}`}
                  />
                  {errors.dob && <p className="form-error">{errors.dob}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label">
                    Gender*
                  </label>
                  <div className="form-radio-group">
                    <label className="form-radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="male"
                        checked={formData.gender === 'male'}
                        onChange={handleChange}
                        className="form-radio"
                      />
                      <span className="ml-2">Male</span>
                    </label>
                    <label className="form-radio-label">
                      <input
                        type="radio"
                        name="gender"
                        value="female"
                        checked={formData.gender === 'female'}
                        onChange={handleChange}
                        className="form-radio"
                      />
                      <span className="ml-2">Female</span>
                    </label>
                  </div>
                  {errors.gender && <p className="form-error">{errors.gender}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="nationality">
                    Nationality*
                  </label>
                  <input
                    id="nationality"
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className={`form-input ${errors.nationality ? 'error' : ''}`}
                    placeholder="Enter nationality"
                  />
                  {errors.nationality && <p className="form-error">{errors.nationality}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="religion">
                    Religion*
                  </label>
                  <input
                    id="religion"
                    type="text"
                    name="religion"
                    value={formData.religion}
                    onChange={handleChange}
                    className={`form-input ${errors.religion ? 'error' : ''}`}
                    placeholder="Enter religion"
                  />
                  {errors.religion && <p className="form-error">{errors.religion}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="community">
                    Community*
                  </label>
                  <input
                    id="community"
                    type="text"
                    name="community"
                    value={formData.community}
                    onChange={handleChange}
                    className={`form-input ${errors.community ? 'error' : ''}`}
                    placeholder="Enter community"
                  />
                  {errors.community && <p className="form-error">{errors.community}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="motherTongue">
                    Mother Tongue*
                  </label>
                  <input
                    id="motherTongue"
                    type="text"
                    name="motherTongue"
                    value={formData.motherTongue}
                    onChange={handleChange}
                    className={`form-input ${errors.motherTongue ? 'error' : ''}`}
                    placeholder="Enter mother tongue"
                  />
                  {errors.motherTongue && <p className="form-error">{errors.motherTongue}</p>}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleNavigateSection(1)}
                  className="btn btn-primary btn-icon-right"
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Guardian Information */}
          <div id="section-1" className={`form-section ${activeSection === 1 ? 'block' : 'hidden'}`}>
            <div className="form-section-header">
              <h2>Guardian Information</h2>
            </div>
            
            <div className="form-section-content">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label" htmlFor="parentName">
                    Name of Parent/Guardian*
                  </label>
                  <input
                    id="parentName"
                    type="text"
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    className={`form-input ${errors.parentName ? 'error' : ''}`}
                    placeholder="Enter parent/guardian name"
                  />
                  {errors.parentName && <p className="form-error">{errors.parentName}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="relationship">
                    Relationship with Guardian*
                  </label>
                  <input
                    id="relationship"
                    type="text"
                    name="relationship"
                    value={formData.relationship}
                    onChange={handleChange}
                    className={`form-input ${errors.relationship ? 'error' : ''}`}
                    placeholder="e.g. Father, Mother, Uncle"
                  />
                  {errors.relationship && <p className="form-error">{errors.relationship}</p>}
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => navigateSection(0)}
                  className="btn btn-outline btn-icon-left"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigateSection(2)}
                  className="btn btn-primary btn-icon-right"
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div id="section-2" className={`form-section ${activeSection === 2 ? 'block' : 'hidden'}`}>
            <div className="form-section-header">
              <h2>Contact Information</h2>
            </div>
            
            <div className="form-section-content">
              <div className="form-group mb-6">
                <label className="form-label" htmlFor="address">
                  Address for Communication*
                </label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className={`form-input ${errors.address ? 'error' : ''}`}
                  placeholder="Enter your complete address"
                ></textarea>
                {errors.address && <p className="form-error">{errors.address}</p>}
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label" htmlFor="pinCode">
                    PIN Code*
                  </label>
                  <input
                    id="pinCode"
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleChange}
                    maxLength="6"
                    className={`form-input ${errors.pinCode ? 'error' : ''}`}
                    placeholder="Enter 6-digit PIN code"
                  />
                  {errors.pinCode && <p className="form-error">{errors.pinCode}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="telephone">
                    Telephone
                  </label>
                  <input
                    id="telephone"
                    type="text"
                    name="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Enter landline number (optional)"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="mobile">
                    Mobile*
                  </label>
                  <input
                    id="mobile"
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    maxLength="10"
                    className={`form-input ${errors.mobile ? 'error' : ''}`}
                    placeholder="Enter 10-digit mobile number"
                  />
                  {errors.mobile && <p className="form-error">{errors.mobile}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="email">
                    Email*
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter email address"
                  />
                  {errors.email && <p className="form-error">{errors.email}</p>}
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => navigateSection(1)}
                  className="btn btn-outline btn-icon-left"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigateSection(3)}
                  className="btn btn-primary btn-icon-right"
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Educational Information */}
          <div id="section-3" className={`form-section ${activeSection === 3 ? 'block' : 'hidden'}`}>
            <div className="form-section-header">
              <h2>Educational Information</h2>
            </div>
            
            <div className="form-section-content">
              {/* 10th Standard */}
              <div className="mb-8">
                <h3 className="form-section-title">10th Standard</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="tenthBoard">
                      Board of Examination
                    </label>
                    <input
                      id="tenthBoard"
                      type="text"
                      name="tenthBoard"
                      value={formData.tenthBoard}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g. CBSE, State Board"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="tenthInstitution">
                      Name of Institution
                    </label>
                    <input
                      id="tenthInstitution"
                      type="text"
                      name="tenthInstitution"
                      value={formData.tenthInstitution}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter school name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="tenthPassingDate">
                      Year and Month of Passing
                    </label>
                    <input
                      id="tenthPassingDate"
                      type="month"
                      name="tenthPassingDate"
                      value={formData.tenthPassingDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="tenthMarks">
                      Marks Obtained
                    </label>
                    <input
                      id="tenthMarks"
                      type="number"
                      name="tenthMarks"
                      value={formData.tenthMarks}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter marks obtained"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="tenthMaxMarks">
                      Maximum Marks
                    </label>
                    <input
                      id="tenthMaxMarks"
                      type="number"
                      name="tenthMaxMarks"
                      value={formData.tenthMaxMarks}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter maximum marks"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="tenthPercentage">
                      Percentage of Marks
                    </label>
                    <input
                      id="tenthPercentage"
                      type="number"
                      name="tenthPercentage"
                      value={formData.tenthPercentage}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Auto-calculated"
                      disabled
                    />
                  </div>
                </div>
              </div>
              
              {/* 12th Standard */}
              <div className="mb-8">
                <h3 className="form-section-title">12th Standard</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="twelfthBoard">
                      Board of Examination
                    </label>
                    <input
                      id="twelfthBoard"
                      type="text"
                      name="twelfthBoard"
                      value={formData.twelfthBoard}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g. CBSE, State Board"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="twelfthInstitution">
                      Name of Institution
                    </label>
                    <input
                      id="twelfthInstitution"
                      type="text"
                      name="twelfthInstitution"
                      value={formData.twelfthInstitution}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter school name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="twelfthPassingDate">
                      Year and Month of Passing
                    </label>
                    <input
                      id="twelfthPassingDate"
                      type="month"
                      name="twelfthPassingDate"
                      value={formData.twelfthPassingDate}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="twelfthMarks">
                      Marks Obtained
                    </label>
                    <input
                      id="twelfthMarks"
                      type="number"
                      name="twelfthMarks"
                      value={formData.twelfthMarks}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter marks obtained"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="twelfthMaxMarks">
                      Maximum Marks
                    </label>
                    <input
                      id="twelfthMaxMarks"
                      type="number"
                      name="twelfthMaxMarks"
                      value={formData.twelfthMaxMarks}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter maximum marks"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="twelfthPercentage">
                      Percentage of Marks
                    </label>
                    <input
                      id="twelfthPercentage"
                      type="number"
                      name="twelfthPercentage"
                      value={formData.twelfthPercentage}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Auto-calculated"
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="form-section-title">Diploma</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="form-group">
                    <label className="form-label" htmlFor="boardDiploma">
                      Board Diploma
                    </label>
                    <input
                      id="boardDiploma"
                      type="text"
                      name="boardDiploma"
                      value={formData.boardDiploma}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g. CBSE, State Board"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="diplomaInstitution">
                      Name of Institution
                    </label>
                    <input
                      id="diplomaInstitution"
                      type="text"
                      name="diplomaInstitution"
                      value={formData.diplomaInstitution}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter Institution name"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="dateDiploma">
                      Year and Month of Passing
                    </label>
                    <input
                      id="dateDiploma"
                      type="month"
                      name="dateDiploma"
                      value={formData.dateDiploma}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="diplomaMarks">
                      Marks Obtained
                    </label>
                    <input
                      id="diplomaMarks"
                      type="number"
                      name="diplomaMarks"
                      value={formData.diplomaMarks}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter marks obtained"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="diplomaMaxMarks">
                      Maximum Marks
                    </label>
                    <input
                      id="diplomaMaxMarks"
                      type="number"
                      name="diplomaMaxMarks"
                      value={formData.diplomaMaxMarks}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter maximum marks"
                    />
                  </div>
                  
                  
                </div>
              </div>
              
              {/* MPC Marks */}
              <div className="mb-8">
                <h3 className="form-section-title">Marks Secured for Mathematics, Physics & Chemistry</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="mpcMarks">
                      Total Mark Secured*
                    </label>
                    <input
                      id="mpcMarks"
                      type="number"
                      name="mpcMarks"
                      value={formData.mpcMarks}
                      onChange={handleChange}
                      className={`form-input ${errors.mpcMarks ? 'error' : ''}`}
                      placeholder="Enter total marks in PCM"
                    />
                    {errors.mpcMarks && <p className="form-error">{errors.mpcMarks}</p>}
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="mpcMaxMarks">
                      Out of*
                    </label>
                    <input
                      id="mpcMaxMarks"
                      type="number"
                      name="mpcMaxMarks"
                      value={formData.mpcMaxMarks}
                      onChange={handleChange}
                      className={`form-input ${errors.mpcMaxMarks ? 'error' : ''}`}
                      placeholder="Enter maximum possible marks"
                    />
                    {errors.mpcMaxMarks && <p className="form-error">{errors.mpcMaxMarks}</p>}
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => navigateSection(2)}
                  className="btn btn-outline btn-icon-left"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigateSection(4)}
                  className="btn btn-primary btn-icon-right"
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Entrance & Preferences */}
          <div id="section-4" className={`form-section ${activeSection === 4 ? 'block' : 'hidden'}`}>
            <div className="form-section-header">
              <h2>Entrance Examination & Preferences</h2>
            </div>
            
            <div className="form-section-content">
              {/* Entrance Examination */}
              <div className="mb-8">
                <h3 className="form-section-title">Entrance Examination (Not applicable for NRI/OCI applicants)</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="form-group">
                    <label className="form-label" htmlFor="entranceExam">
                      Name of Examination
                    </label>
                    <input
                      id="entranceExam"
                      type="text"
                      name="entranceExam"
                      value={formData.entranceExam}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="e.g. JEE Main, NEET"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="entranceRegNo">
                      Register No
                    </label>
                    <input
                      id="entranceRegNo"
                      type="text"
                      name="entranceRegNo"
                      value={formData.entranceRegNo}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter registration number"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label" htmlFor="entranceRank">
                      Rank
                    </label>
                    <input
                      id="entranceRank"
                      type="text"
                      name="entranceRank"
                      value={formData.entranceRank}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your rank"
                    />
                  </div>
                </div>
              </div>
              
              {/* Branch Preferences */}
              <div className="mb-8">
                <h3 className="form-section-title">Branch Preferred*</h3>
                <div className="form-check-group sm:grid-cols-2 md:grid-cols-3">
                  {['Computer Science  & Engineering (CS)', 'Biotechnology & Biochemical Engineering (BB)', 'Food Technology (FT)', 'Electronics & Communication Engineering', 'Computer Science & Engg. (Artificial Intelligence & Machine Learning) ', 'Civil Engineering', 'Electrical & Electronics Engineering', 'Electronics & Computer Engineering', 'Mechanical Engineering'].map((branch) => (
                    <label key={branch} className="form-check-label">
                      <input
                        type="radio"
                        name="branchPreference"
                        value={branch}
                        checked={formData.branchPreference === branch}
                        onChange={handleChange}
                        className="form-radio"
                      />
                      <span className="ml-2">{branch}</span>
                    </label>
                  ))}
                </div>
                {errors.branchPreference && <p className="form-error mt-2">{errors.branchPreference}</p>}
              </div>
              
              {/* Admission Type */}
              <div className="mb-6">
                <h3 className="form-section-title">Admission Sought Under*</h3>
                <div className="flex flex-wrap gap-4">
                  <label className="form-check-label">
                    <input
                      type="radio"
                      name="admissionType"
                      value="Management"
                      checked={formData.admissionType === 'Management'}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Management</span>
                  </label>
                  
                  <label className="form-check-label">
                    <input
                      type="radio"
                      name="admissionType"
                      value="NRI/OCI"
                      checked={formData.admissionType === 'NRI/OCI'}
                      onChange={handleChange}
                      className="form-radio"
                    />
                    <span className="ml-2">NRI/OCI</span>
                  </label>
                </div>
                {errors.admissionType && <p className="form-error mt-2">{errors.admissionType}</p>}
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => navigateSection(3)}
                  className="btn btn-outline btn-icon-left"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigateSection(5)}
                  className="btn btn-primary btn-icon-right"
                >
                  Next
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Document Uploads */}
          <div id="section-5" className={`form-section ${activeSection === 5 ? 'block' : 'hidden'}`}>
            <div className="form-section-header">
              <h2>Document Uploads</h2>
            </div>
            
            <div className="form-section-content">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-group">
                  <label className="form-label" htmlFor="photo">
                    Passport Size Photo*
                  </label>
                  <div className={`file-upload ${errors.photo ? 'error' : ''}`}>
                    <input
                      id="photo"
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-upload-input"
                    />
                    <label htmlFor="photo" className="file-upload-label">
                      <div className="flex flex-col items-center justify-center py-3">
                        <svg className="file-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <p className="text-sm text-gray-500 mb-1">Click to upload passport photo</p>
                        <p className="text-xs text-gray-400">(Max size: 2MB)</p>
                      </div>
                    </label>
                    {formData.photo && (
                      <div className="file-preview">
                        <p className="text-sm text-gray-700 mb-2">File selected: {formData.photo.name}</p>
                        {formData.photoPreview && (
                          <div className="photo-preview">
                            <img 
                              src={formData.photoPreview} 
                              alt="Passport photo preview" 
                              className="img-cover"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.photo && <p className="form-error">{errors.photo}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="parentSignature">
                    Signature of the Parent / Guardian*
                  </label>
                  <div className={`file-upload ${errors.parentSignature ? 'error' : ''}`}>
                    <input
                      id="parentSignature"
                      type="file"
                      name="parentSignature"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-upload-input"
                    />
                    <label htmlFor="parentSignature" className="file-upload-label">
                      <div className="flex flex-col items-center justify-center py-3">
                        <svg className="file-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                        <p className="text-sm text-gray-500 mb-1">Click to upload parents signature</p>
                        <p className="text-xs text-gray-400">(Max size: 2MB)</p>
                      </div>
                    </label>
                    {formData.parentSignature && (
                      <div className="file-preview">
                        <p className="text-sm text-gray-700 mb-2">File selected: {formData.parentSignature.name}</p>
                        {formData.parentSignaturePreview && (
                          <div className="signature-preview">
                            <img 
                              src={formData.parentSignaturePreview} 
                              alt="Parent signature preview" 
                              className="img-contain"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.parentSignature && <p className="form-error">{errors.parentSignature}</p>}
                </div>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="applicantSignature">
                    Signature of Applicant*
                  </label>
                  <div className={`file-upload ${errors.applicantSignature ? 'error' : ''}`}>
                    <input
                      id="applicantSignature"
                      type="file"
                      name="applicantSignature"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="file-upload-input"
                    />
                    <label htmlFor="applicantSignature" className="file-upload-label">
                      <div className="flex flex-col items-center justify-center py-3">
                        <svg className="file-upload-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                        <p className="text-sm text-gray-500 mb-1">Click to upload your signature</p>
                        <p className="text-xs text-gray-400">(Max size: 2MB)</p>
                      </div>
                    </label>
                    {formData.applicantSignature && (
                      <div className="file-preview">
                        <p className="text-sm text-gray-700 mb-2">File selected: {formData.applicantSignature.name}</p>
                        {formData.applicantSignaturePreview && (
                          <div className="signature-preview">
                            <img 
                              src={formData.applicantSignaturePreview} 
                              alt="Applicant signature preview" 
                              className="img-contain"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {errors.applicantSignature && <p className="form-error">{errors.applicantSignature}</p>}
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={() => navigateSection(4)}
                  className="btn btn-outline btn-icon-left"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Previous
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-lg ${isSubmitting ? 'btn-disabled' : 'btn-primary'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Submit Application
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </>
                  )}
                </button>
              </div>
              
              {errors.submit && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-500">{errors.submit}</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
<div id="pdf-content" style={{ display: "none", background: "white", padding: "30px", width: "800px", fontFamily: 'Arial, sans-serif', fontSize: '12px' }}>
  <div style={{ textAlign: "center" }}>
    <img src="/20a20944-c1b7-49d8-8e18-dfc3e2cddbc1.png" alt="College Logo" style={{ height: 80 }} />
    <h2 style={{ margin: "10px 0" }}>SREE BUDDHA COLLEGE OF ENGINEERING, PATTOOR</h2>
    <h3 style={{ textDecoration: "underline" }}>B.Tech Online Application</h3>
  </div>
  <br/>
  <p><strong>Application No:</strong> {applicationNo}</p>

  <p><strong>Name of the Applicant:</strong> {formData.name}</p>
  <p><strong>Date of Birth:</strong> {formData.dob}</p>
  <p><strong>Gender:</strong> {formData.gender}</p>
  <p><strong>Nationality:</strong> {formData.nationality}</p>
  <p><strong>Religion:</strong> {formData.religion}</p>
  <p><strong>Community:</strong> {formData.community}</p>
  <p><strong>Mother Tongue:</strong> {formData.motherTongue}</p>
  <p><strong>Name of Parent/Guardian:</strong> {formData.parentName}</p>
  <p><strong>Relationship:</strong> {formData.relationship}</p>
  <p><strong>Address for Communication:</strong> {formData.address}</p>
  <p><strong>Pin Code:</strong> {formData.pinCode}</p>
  <p><strong>Telephone:</strong> {formData.telephone || "-"}</p>
  <p><strong>Mobile:</strong> {formData.mobile}</p>
  <p><strong>Email:</strong> {formData.email}</p>

  <br/>
  <h4>Details of Mark / Grade Obtained in the Qualifying Exam</h4>
  <p><strong>10th:</strong> {formData.tenthBoard}, {formData.tenthInstitution}, {formData.tenthPassingDate} — {formData.tenthMarks}/{formData.tenthMaxMarks} ({formData.tenthPercentage}%)</p>
  <p><strong>12th:</strong> {formData.twelfthBoard}, {formData.twelfthInstitution}, {formData.twelfthPassingDate} — {formData.twelfthMarks}/{formData.twelfthMaxMarks} ({formData.twelfthPercentage}%)</p>
  <p><strong>Diploma:</strong> {formData.boardDiploma}, {formData.institutionDiploma}, {formData.dateDiploma} — {formData.diplomaMarks}/{formData.diplomaMaxMarks}</p>

  <br/>
  <h4>Marks Secured for Mathematics, Physics & Chemistry</h4>
  <p><strong>Total Mark Secured:</strong> {formData.mpcMarks} / {formData.mpcMaxMarks}</p>

  <br/>
  <h4>Entrance Examination (Not applicable for NRI/OCI applicants)</h4>
  <p><strong>Name of the Examination:</strong> {formData.entranceExam}</p>
  <p><strong>Register No:</strong> {formData.entranceRegNo}</p>
  <p><strong>Rank:</strong> {formData.entranceRank}</p>

  <p><strong>Branch Preferred:</strong> {formData.branchPreference}</p>
  <p><strong>Admission Sought Under:</strong> {formData.admissionType}</p>

  <br/>
  <p>I hereby declare, I shall abide by the rules and regulations of the College and the information furnished above are true to the best of my knowledge.</p>

  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "40px" }}>
    <p><strong>Signature of Parent/Guardian</strong></p>
    <p><strong>Signature of Applicant</strong></p>
  </div>

  {/* <p style={{ marginTop: "30px" }}>Date: {(new Date()).toLocaleDateString()}</p> */}
  <div style={{ height: "100px" }}></div>

</div>

    </div>
  );
};

export default ApplicationForm;
