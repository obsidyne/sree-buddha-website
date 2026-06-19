import React from "react";
import NAAC from "@/components/accreditation/NAAC/naac";

export default function page() {
  return (
    <div className="page">
      <h3 className="page_heading">Mandatory Disclosure</h3>
      <hr/>
      <br />
      <br />

      {/* <NAAC
        name="mandatory disclosure 2024-2025"
        link="/assets/documents/mandatory_disclosure/mandatory_disclosure_2024-25.pdf"
      /> */}
         <NAAC
        name="mandatory disclosure 2025-2026"
        link="/assets/documents/mandatory_disclosure/mandatory_disclosure_2026-27.pdf"
      />
    </div>
  );
}
