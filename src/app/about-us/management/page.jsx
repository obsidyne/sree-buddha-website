"use client";
import React from "react";
import "@/styles/management/style.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Person from "@/components/management/Person";
import { useState, useEffect } from "react";

const Management = () => {
  const [managementData, setManagementData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManagementData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI}/api/management?populate=*`
        );
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setManagementData(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching management data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchManagementData();
  }, []);

  if (loading) {
    return (
      <div className="management loading">
        Loading management information...
      </div>
    );
  }

  if (error) {
    return <div className="management error">Error loading data: {error}</div>;
  }

  return (
    <div className="management">
      <div className="majContainer">
        <div className="m-title">
          <h1 className="heading">The Management</h1>
          <hr />
        </div>

        {/* Chairman */}
        <Person
          name={managementData.Chairman_name}
          position="The Chairman"
          content={managementData.Chairman_info}
          pic={
            managementData.Chairman_image?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI}${managementData.Chairman_image.url}`
              : "/assets/images/chairperson.png"
          }
        />
        <img className="line" src={"/assets/Line_2.png"} alt="Line separator" />

        {/* Vice Chairman */}
          {/* <Person
            name={managementData.Vice_chairman_name}
            position="Vice-Chairman"
            content={managementData.Vice_chairman_info}
            pic={
              managementData.Vice_chairman_image?.url
                ? `${process.env.NEXT_PUBLIC_STRAPI}${managementData.Vice_chairman_image.url}`
                : "/assets/images/DharmaRajan.png"
            }
          /> */}
        <img className="line" src={"/assets/Line_2.png"} alt="Line separator" />

        {/* Secretary */}
        <Person
          name={managementData.Secretary_name}
          position="The Secretary"
          content={managementData.Secretary_info}
          pic={
            managementData.Secretary_image?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI}${managementData.Secretary_image.url}`
              : "/assets/images/VPrasad.png"
          }
        />
        <img className="line" src={"/assets/Line_2.png"} alt="Line separator" />

        {/* Joint Secretary */}
        <Person
          name={managementData.Joint_secretary_name}
          position="Joint Secretary"
          content={managementData.Joint_secretary_info}
          pic={
            managementData.Joint_secretary_image?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI}${managementData.Joint_secretary_image.url}`
              : "/assets/images/BUdhayan.png"
          }
        />
        <img className="line" src={"/assets/Line_2.png"} alt="Line separator" />

        {/* Treasurer */}
        <Person
          name={managementData.Treasurer_name}
          position="The Treasurer"
          content={managementData.Treasurer_info}
          pic={
            managementData.Treasurer_image?.url
              ? `${process.env.NEXT_PUBLIC_STRAPI}${managementData.Treasurer_image.url}`
              : "/assets/images/ASunilKumar.png"
          }
        />
        <img className="line" src={"/assets/Line_2.png"} alt="Line separator" />

        {/* Advisory Committee */}
        <div className="advisorys">Advisory Committee</div>
        <div className="extracontents">
          <p className="listofppl">
            {managementData.Advisory_committee?.members &&
              Object.entries(managementData.Advisory_committee.members).map(
                ([name, position]) => (
                  <React.Fragment key={name}>
                    {name} <br />
                    {position} <br />
                  </React.Fragment>
                )
              )}
          </p>

          <p className="content2">
            The Managing body consists of persons from different walks of life.
            Many of them are professionals and are associated with a number of
            other educational institutions like:
          </p>
          <ul className="list">
            {managementData.Advisory_committee?.institutions?.map(
              (institution, index) => (
                <li key={index}>{institution}</li>
              )
            )}
          </ul>
        </div>

        {/* Other Members */}
        <h2 className="others">Other Members</h2>
        <div className="extracontents">
          <p className="members">
            {managementData.Advisory_committee?.other_members?.names?.map(
              (name, index) => (
                <React.Fragment key={index}>
                  {name} <br />
                </React.Fragment>
              )
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Management;