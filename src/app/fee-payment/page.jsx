import React from "react";
import NAAC from "@/components/accreditation/NAAC/naac";
import "./page.css"
const page = () => {
  return (
    <div className="page">
      <div className="page_heading">Fees Payment</div>
      <div className="line"></div>
      <div className="content">
        <NAAC
          name="Fee Notification 2024-25 dummy get data from backend "
          link="/assets/documents/fee-payment/fee.pdf"
        />
        
        
      </div>
    </div>
  );
};

export default page;
