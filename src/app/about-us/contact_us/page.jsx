"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const undergraduatePrograms = [
  { title: "B.Tech in Computer Science and Engineering" },
  { title: "B.Tech in Mechanical Engineering" },
  { title: "B.Tech in Civil Engineering" },
  { title: "B.Tech in Electrical Engineering" },
];

export default function Page() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    interest: "", // Changed from program to interest to match API expectations
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    // Map the form fields to the API expected structure
    const data = {
      data: {
        Name: form.name,
        Email: form.email,
        Country: form.country,
        Interest: form.interest,
        Message: form.message,
      }
    };

    console.log('Sending data:', JSON.stringify(data));

    try {
      // Using the actual API endpoint from the first component (fixed the double slash)
      const response = await fetch('https://sbce.ac.in/api/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setStatus({ type: 'success', message: 'Form submitted successfully!' });
        toast.success("Message sent successfully! We'll get back to you soon.");
        console.log('API Response:', result);

        // Reset form after successful submission
        setForm({
          name: "",
          email: "",
          country: "",
          interest: "",
          message: "",
        });
      } else {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        toast.error("Failed to send message. Please try again.");
        setStatus({ type: 'error', message: 'An error occurred while submitting the form. Please try again.' });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to send message. Please try again.");
      setStatus({ type: 'error', message: 'An error occurred while submitting the form. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-yellow-900 via-yellow-800 to-yellow-900">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
              animation: "slide 20s linear infinite"
            }}
          ></div>
        </div>

        {/* Main content */}

      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-yellow-900 text-white flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Email</h3>
                      <a href="mailto:principal@sbce.ac.in"
                        className="text-yellow-900 hover:text-yellow-700 transition-colors">
                        principal@sbce.ac.in
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-yellow-900 text-white flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Phone</h3>
                      <a href="tel:+919446014317"
                        className="text-yellow-900 hover:text-yellow-700 transition-colors">
                        +91 9446014317
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-yellow-900 text-white flex items-center justify-center mr-4 flex-shrink-0">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Address</h3>
                      <p className="text-gray-600">
                        Sree Buddha College of Engineering<br />
                        Pattoor P.O., Nooranad<br />
                        Alappuzha District<br />
                        Kerala, 690529<br />
                        India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="bg-gray-100 p-4 rounded-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3938.4370289554703!2d76.63980737489798!3d9.212530691475758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06175636a5fcf9%3A0x8c3c160158a8b47f!2sPattoor%2C%20P.O%2C%20Nooranad%2C%20Padanilam%2C%20Kerala%20690529!5e0!3m2!1sen!2sin!4v1682782892424!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="SBCE Location Map"
                ></iframe>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-yellow-900">Send us a Message</h2>

              {/* Status Message Display */}
              {status && (
                <div
                  className={`p-4 mb-4 rounded ${status.type === 'success'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                    }`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your full name"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Enter your email address"
                    required
                    disabled={loading}
                  />
                </div>

                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={form.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                    disabled={loading}
                  >
                    <option value="">Select your country</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="KSA">Saudi Arabia</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Oman">Oman</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="India">India</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                    Program of Interest
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={form.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                    disabled={loading}
                  >
                    <option value="">Select a program</option>
                    {undergraduatePrograms.map((program, index) => (
                      <option key={index} value={program.title}>
                        {program.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Let us know how we can help you"
                    required
                    disabled={loading}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`w-full px-6 py-3 bg-yellow-900 text-white font-bold rounded-lg hover:bg-yellow-800 transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Inquiry'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}