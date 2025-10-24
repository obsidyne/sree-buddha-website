import React from 'react'
import "./style.css"

import DepartmentNavbar from '@/components/departments/department_navbar'

export default function page({children}) {
    const links =  [
        ["IQAC Brief" , "/about-us/iqac"] , 
        ["Members", "/about-us/iqac/members"],
        ["AQARS", "/about-us/iqac/aqars"],
        ["AQAR 2020-2021", "/about-us/iqac/aqar_2020-2021"],
        ["AQAR 2021-2022", "/about-us/iqac/aqar_2021-2022"],
        ["AQAR 2022-2023", "/about-us/iqac/aqar_2022-2023"],
        ["Minutes and ATR", "/about-us/iqac/minutes_and_atr"],
        ["Faculty Appraisal", "/about-us/iqac/faculty_appraisal"],

    ]
  return (
    <div className='page' >
        <h1 className="page_heading">Internal Quality Assurance Cell</h1>
        <div className="line"></div>
        <div className="iqac flex flex-col --bg-red-200">
       
        <DepartmentNavbar links = {links}  />
         <div className='mb-[20px]'></div>

        {children}
        </div>
      
    </div>
  )
}
