"use client"

import React from 'react'
import "./style.css"

export default function Page() {
    return (
        <div className='page'>
            <h1 className='page-heading'>Parent-Teacher Association (PTA)</h1>
            <div className='line'></div>
            <h2 className='college-name'>Sree Buddha College of Engineering, Pattoor (PTASBCE)</h2>
            <p className='description'>The PTA of Sree Buddha College of Engineering aims to foster and promote a good relationship among members of the faculty, students, and guardians of students. The administration of the association vests in an executive committee elected annually. The Principal is the ex-officio President, while the Chairman, Secretary, and Treasurer of the Managing Committee of the college are honorary members of the PTA.</p>
            <p className='description'>The association consists of 28 members, with 14 members from guardians and 14 from the teaching staff (HODs and faculty members from all departments). A secretary is elected from among the faculty.</p>

            <h3 className='section-heading'>PTA Executive Members</h3>
            <table className='table'>
                <thead>
                    <tr className='table-row'>
                        <th className='table-header'>Role</th>
                        <th className='table-header'>Name</th>
                        <th className='table-header'>Contact</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-row'>
                        <td className='table-data'>PTA President</td>
                        <td className='table-data'>Dr. K. Krishnakumar (Principal)</td>
                        <td className='table-data'>+91 8590332548</td>
                    </tr>
                    <tr className='table-row'>
                        <td className='table-data'>PTA Vice President</td>
                        <td className='table-data'>Mr. Jayakumar R (Parent of Sreeparvathy, S5 ECE)</td>
                        <td className='table-data'>9495478005</td>
                    </tr>
                    <tr className='table-row'>
                        <td className='table-data'>PTA Secretary</td>
                        <td className='table-data'>Mrs. T R Sangeeta (AP, Department of ECE)</td>
                        <td className='table-data'>-</td>
                    </tr>
                    <tr className='table-row'>
                        <td className='table-data'>PTA Joint Secretary</td>
                        <td className='table-data'>Mrs. Sheeja E Yohannan (Parent of Neha Siju, S5 CSE)</td>
                        <td className='table-data'>9495726027</td>
                    </tr>
                    <tr className='table-row'>
                        <td className='table-data'>PTA Treasurer</td>
                        <td className='table-data'>Ms. Pooja S Mohan (AP, Department of ECE)</td>
                        <td className='table-data'>9446394252</td>
                    </tr>
                    <tr className='table-row'>
                        <td className='table-data'>PTA Member</td>
                        <td className='table-data'>Dr. Saji Varghese (Vice Principal, SBCE Pattoor)</td>
                        <td className='table-data'>-</td>
                    </tr>
                </tbody>
            </table>

            <h3 className='section-heading'>Heads of Department</h3>
            <table className='table'>
                <thead>
                    <tr className='table-row'>
                        <th className='table-header'>Department</th>
                        <th className='table-header'>Name</th>
                        <th className='table-header'>Contact Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-row'><td className='table-data'>BT&BCE</td><td className='table-data'>Prof. Meera Bai S</td><td className='table-data'>9446589673</td></tr>
                    <tr className='table-row'><td className='table-data'>ME</td><td className='table-data'>Prof. Anil Kumar A V</td><td className='table-data'>9947758310</td></tr>
                    <tr className='table-row'><td className='table-data'>CE</td><td className='table-data'>Dr. Gouri Antherjanam</td><td className='table-data'>9446112617</td></tr>
                    <tr className='table-row'><td className='table-data'>CS</td><td className='table-data'>Dr. S V Annlin Jeba</td><td className='table-data'>9487274466</td></tr>
                    <tr className='table-row'><td className='table-data'>AI</td><td className='table-data'>Dr. Anil A R</td><td className='table-data'>9447477577</td></tr>
                    <tr className='table-row'><td className='table-data'>EEE</td><td className='table-data'>Dr. Vinod V P</td><td className='table-data'>9048260779</td></tr>
                    <tr className='table-row'><td className='table-data'>ECE</td><td className='table-data'>Prof. Pavitha P P</td><td className='table-data'>8075376012</td></tr>
                    <tr className='table-row'><td className='table-data'>HRD</td><td className='table-data'>Prof. Pradeep Kumar R</td><td className='table-data'>9446472562</td></tr>
                </tbody>
            </table>

            <h3 className='section-heading'>Executive Members (Faculty)</h3>
            <table className='table'>
                <thead>
                    <tr className='table-row'>
                        <th className='table-header'>Department</th>
                        <th className='table-header'>Name</th>
                        <th className='table-header'>Contact Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-row'><td className='table-data'>BT&BCE</td><td className='table-data'>Dr. Shamnamol</td><td className='table-data'>9539360681</td></tr>
                    <tr className='table-row'><td className='table-data'>ME</td><td className='table-data'>Mr. Prashanth V</td><td className='table-data'>9496877660</td></tr>
                    <tr className='table-row'><td className='table-data'>CE</td><td className='table-data'>Mr. Ashok Mathew</td><td className='table-data'>9645287537</td></tr>
                    <tr className='table-row'><td className='table-data'>CS</td><td className='table-data'>Ms. Dhanya S</td><td className='table-data'>9656800583</td></tr>
                    <tr className='table-row'><td className='table-data'>EEE</td><td className='table-data'>Ms. Sindhuja</td><td className='table-data'>9544112161</td></tr>
                    <tr className='table-row'><td className='table-data'>ECE</td><td className='table-data'>Ms. Pooja S Mohan</td><td className='table-data'>9446394252</td></tr>
                    <tr className='table-row'><td className='table-data'>BS</td><td className='table-data'>Ms. Prabhiya P S</td><td className='table-data'>9400154655</td></tr>
                </tbody>
            </table>

            <h3 className='section-heading'>Parents</h3>
            <table className='table'>
                <thead>
                    <tr className='table-row'>
                        <th className='table-header'>Year</th>
                        <th className='table-header'>Department</th>
                        <th className='table-header'>Name of Parent</th>
                        <th className='table-header'>Name of Student</th>
                        <th className='table-header'>Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='table-row'><td className='table-data'>III</td><td className='table-data'>CSE/AI</td><td className='table-data'>Mrs. Sheeja E Yohannan</td><td className='table-data'>Neha Siju</td><td className='table-data'>9495726027</td></tr>
                    <tr className='table-row'><td className='table-data'>III</td><td className='table-data'>ME</td><td className='table-data'>Mr. Lanil Kumar</td><td className='table-data'>Nanda Kishor A</td><td className='table-data'>9495118331</td></tr>
                    <tr className='table-row'><td className='table-data'>III</td><td className='table-data'>ECE</td><td className='table-data'>Mr. Jayakumar R</td><td className='table-data'>Sreeparvathy</td><td className='table-data'>9495478005</td></tr>
                    <tr className='table-row'><td className='table-data'>III</td><td className='table-data'>EEE</td><td className='table-data'>Mr. Anoop P K</td><td className='table-data'>Sandra Anoop</td><td className='table-data'>9446547271</td></tr>
                    <tr className='table-row'><td className='table-data'>II</td><td className='table-data'>BT/FT</td><td className='table-data'>Mrs. Sreelekha / Mr. Madhu S</td><td className='table-data'>Avani / Manasi</td><td className='table-data'>9539744827 / 9847493229</td></tr>
                    <tr className='table-row'><td className='table-data'>IV</td><td className='table-data'>CE</td><td className='table-data'>Mr. Pradeep C</td><td className='table-data'>Prince P</td><td className='table-data'>9349472018</td></tr>
                    <tr className='table-row'><td className='table-data'>I</td><td className='table-data'>ECE/ES</td><td className='table-data'>Mrs. Ambily R</td><td className='table-data'>Amitha/Amrutha</td><td className='table-data'>9847103375</td></tr>
                    <tr className='table-row'><td className='table-data'>I</td><td className='table-data'>EEE</td><td className='table-data'>Mrs. Bindhu R</td><td className='table-data'>Abhirami B</td><td className='table-data'>7012620587</td></tr>
                    <tr className='table-row'><td className='table-data'>I</td><td className='table-data'>BT</td><td className='table-data'>Mr. Harikrishnan Nair</td><td className='table-data'>Geethika Harikrishnan</td><td className='table-data'>9745268161</td></tr>
                    <tr className='table-row'><td className='table-data'>I</td><td className='table-data'>CE</td><td className='table-data'>Dr. Madhu A K</td><td className='table-data'>Giridhar Madhu</td><td className='table-data'>9447484345</td></tr>
                </tbody>
            </table>

        </div>
    )
}