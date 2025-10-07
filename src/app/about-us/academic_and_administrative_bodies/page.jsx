"use client"

import React from "react";
import { useEffect, useState } from "react";
import NAAC from "@/components/accreditation/NAAC/naac";
import { useFieldArray } from "react-hook-form";

export default function Page() {

  const [data, setData] = useState(null)

  useEffect(() => {

    fetch(`${process.env.NEXT_PUBLIC_STRAPI}/api/academic-and-administrative-bodies?populate=*`).then((response) => {
      return response.json()
    }).then((jsondata) => {
      setData(jsondata);
      // console.log(data)
      console.log(jsondata)
    })

  }, [])

  return (
    <div className="page">
      <h3 className="page_heading">Academic and Administrative Bodies</h3>
      <hr />
      <br />
      <br />

      {/* <NAAC
        name="mandatory disclosure 2024-2025"
        link="/assets/documents/mandatory_disclosure/mandatory_disclosure_2024-25.pdf"
      /> */}
      {
        data == null ? "loading.." :

          <NAAC
            name={data.data.title}
            link={`${process.env.NEXT_PUBLIC_STRAPI}${data.data.file.url}`}
          />
      }


    </div>
  );
}
