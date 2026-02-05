"use client";

import { useState } from "react";

const STRAPI = process.env.NEXT_PUBLIC_STRAPI;

export default function AlumniRegistrationPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    gender: "",
    graduationYear: "",
    email: "",
    contactNumber: "",
    address: "",
    additional_qualification: "",
    current_working_organization: "",
    current_designation: "",
    comments: "",
    resume: null,
  });

  /* ---------------- INPUT HANDLER ---------------- */
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  /* ---------------- UPLOAD RESUME ---------------- */
  const uploadResume = async (file) => {
    const fd = new FormData();
    fd.append("files", file);

    const res = await fetch(`${STRAPI}/api/upload`, {
      method: "POST",
      body: fd,
    });

    if (!res.ok) {
      throw new Error("Resume upload failed");
    }

    const uploaded = await res.json();
    return uploaded[0].id;
  };

  /* ---------------- SUBMIT FORM ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let resumeId = null;

      if (formData.resume) {
        resumeId = await uploadResume(formData.resume);
      }

      const payload = {
        data: {
          registration: [
            {
              data: JSON.stringify({
                name: formData.name,
                department: formData.department,
                gender: formData.gender,
                graduationYear: formData.graduationYear,
                email: formData.email,
                contactNumber: formData.contactNumber,
                address: formData.address,
                additional_qualification:
                  formData.additional_qualification,
                current_working_organization:
                  formData.current_working_organization,
                current_designation:
                  formData.current_designation,
                comments: formData.comments,
              }),
              ...(resumeId && { resume: resumeId }),
            },
          ],
        },
      };

      const res = await fetch(`${STRAPI}/api/alumnis`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to submit alumni registration");
      }

      alert("Alumni registration submitted successfully!");

      setFormData({
        name: "",
        department: "",
        gender: "",
        graduationYear: "",
        email: "",
        contactNumber: "",
        address: "",
        additional_qualification: "",
        current_working_organization: "",
        current_designation: "",
        comments: "",
        resume: null,
      });
    } catch (err) {
      console.error(err);
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">
        Alumni Registration
      </h1>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border px-3 py-2 rounded" name="name" placeholder="Name" required onChange={handleChange} />
        <input className="w-full border px-3 py-2 rounded" name="department" placeholder="Department" required onChange={handleChange} />

        <select className="w-full border px-3 py-2 rounded" name="gender" onChange={handleChange}>
          <option value="">Gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input className="w-full border px-3 py-2 rounded" name="graduationYear" placeholder="Graduation Year" onChange={handleChange} />
        <input className="w-full border px-3 py-2 rounded" type="email" name="email" placeholder="Email" required onChange={handleChange} />
        <input className="w-full border px-3 py-2 rounded" name="contactNumber" placeholder="Contact Number" required onChange={handleChange} />

        <textarea className="w-full border px-3 py-2 rounded" name="address" placeholder="Address" rows={3} onChange={handleChange} />
        <input className="w-full border px-3 py-2 rounded" name="additional_qualification" placeholder="Additional Qualification" onChange={handleChange} />
        <input className="w-full border px-3 py-2 rounded" name="current_working_organization" placeholder="Current Organization" onChange={handleChange} />
        <input className="w-full border px-3 py-2 rounded" name="current_designation" placeholder="Designation" onChange={handleChange} />
        <textarea className="w-full border px-3 py-2 rounded" name="comments" placeholder="Comments" rows={3} onChange={handleChange} />

        <div className="flex flex-col gap-2">
  <label
    htmlFor="resume"
    className="cursor-pointer inline-block text-center bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800"
  >
    Upload CV
  </label>

  <input
    id="resume"
    type="file"
    name="resume"
    accept=".pdf,.doc,.docx"
    onChange={handleChange}
    className="hidden"
  />

  {formData.resume && (
    <p className="text-sm text-gray-600">
      Selected file: <span className="font-medium">{formData.resume.name}</span>
    </p>
  )}
</div>


        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
