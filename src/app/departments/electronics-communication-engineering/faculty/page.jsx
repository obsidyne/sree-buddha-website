"use client"

import React, { useState, useEffect } from 'react'
import { Poppins } from 'next/font/google'
import "../../department_style.css"
import "./style.css"

// Initialize Poppins font
const poppins = Poppins({
    weight: ['400', '500', '600', '700'],
    subsets: ['latin'],
    display: 'swap',
})

export default function ECEDepartmentFaculty() {
    const [faculty, setFaculty] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_STRAPI}/api/cse-depts?filters[Dept_name][$eq]=ECE&populate[Faculty][populate]=Faculty_image`
                );

                if (!response.ok) {
                    throw new Error(`Failed to fetch faculty data: ${response.status}`);
                }

                const data = await response.json();
                console.log('API Response:', data);


                if (data && data.data && data.data.length > 0) {

                    const aiMlDept = data.data.find(dept => dept.attributes && dept.attributes.Dept_name === 'AI_ML') || data.data[0];

                    let facultyArray;
                    if (aiMlDept.attributes && aiMlDept.attributes.Faculty && aiMlDept.attributes.Faculty.data) {

                        facultyArray = aiMlDept.attributes.Faculty.data.map(item => ({
                            ...item.attributes,
                            id: item.id
                        }));
                    } else if (aiMlDept.Faculty && Array.isArray(aiMlDept.Faculty)) {

                        facultyArray = aiMlDept.Faculty;
                    } else {
                        throw new Error('Faculty data not found in the expected structure');
                    }

                    // Sort by Priority if available
                    const sortedFaculty = [...facultyArray].sort((a, b) => {
                        // Sort by Priority, nulls go to the end
                        if (a.Priority === null && b.Priority === null) return 0;
                        if (a.Priority === null) return 1;
                        if (b.Priority === null) return -1;
                        return a.Priority - b.Priority;
                    });

                    setFaculty(sortedFaculty);
                } else {
                    throw new Error('Invalid API response structure');
                }

                setLoading(false);
            } catch (err) {
                console.error('Error fetching faculty data:', err);
                setError(`API error: ${err.message}`);
                setLoading(false);
            }
        };

        fetchFaculty();
    }, []);


    const handleImageError = (e) => {
        e.target.onerror = null;
        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='35' r='25' fill='%23ccc'/%3E%3Cpath d='M15,85 Q50,65 85,85 Z' fill='%23ccc'/%3E%3Ccircle cx='50' cy='50' r='50' fill='none' stroke='%23ccc' stroke-width='2'/%3E%3C/svg%3E";
    };


    const getImageUrl = (member) => {

        if (member.Faculty_image) {

          return `${process.env.NEXT_PUBLIC_STRAPI}${member.Faculty_image.url}`;
        } else {

            return '';
        }
    };

    return (
        <div className={`cs_department_faculty ${poppins.className}`}>
            {loading ? (
                <div>Loading faculty information...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <>
                    <table className="faculty_table_desktop">
                        <tbody>
                            <tr className='headrow'>
                                <td>Profile</td>
                                <td>Name</td>
                                <td>Qualification</td>
                                <td>Designation</td>
                                <td>Specialization</td>
                            </tr>

                            {faculty.map((member, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="faculty_img_container">
                                            <img
                                                src={getImageUrl(member)}
                                                alt={member.Faculty_Name}
                                                className="faculty_img"
                                                onError={handleImageError}
                                            />
                                        </div>
                                    </td>
                                    <td>{member.Faculty_Name}</td>
                                    <td>{member.Qualification}</td>
                                    <td>{member.Designation}</td>
                                    <td>{member.Specialization}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="faculty_table_mobile">
                        {faculty.map((member, index) => (
                            <div className="single_faculty" key={index}>
                                <div className="img_section">
                                    <div className="faculty_img_container">
                                        <img
                                            src={getImageUrl(member)}
                                            alt={member.Faculty_Name}
                                            className="faculty_img"
                                            onError={handleImageError}
                                        />
                                    </div>
                                </div>

                                <div className="details_section">
                                    <h3 className="faculty_name">{member.Faculty_Name}</h3>
                                    <h3 className="faculty_qualification">{member.Qualification}</h3>
                                    <h3 className="faculty_designation">{member.Designation}</h3>
                                    <h3 className="faculty_specialization">{member.Specialization}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <style jsx>{`
                .faculty_img_container {
                    width: 80px;
                    height: 80px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin: 0 auto;
                    background-color: #f0f0f0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .faculty_img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .error-message {
                    background-color: #f8d7da;
                    color: #721c24;
                    padding: 12px;
                    border-radius: 4px;
                    margin-bottom: 16px;
                }
                
                @media (max-width: 768px) {
                    .faculty_img_container {
                        width: 100px;
                        height: 100px;
                    }
                }
            `}</style>
        </div>
    )
}