import React from 'react';
import './style.css';
import Person from "@/components/management/Person";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

function Principal() {
  return (
    <div className="principal">
          <div className="m-title">
            <h1 className='heading'>The Principal</h1>
            <hr />
          </div>
          <Person
          name="Dr. K Krishnakumar"
          position="The Principal"
          content="Dr. K Krishnakumar completed his Bachelor's Degree in Mechanical Engineering from TKM College of Engineering, the University of Kerala with the fourth rank in 1987, Master's Degree in Engineering from College of Engineering, Guindy, Anna University, and Ph.D. from IIT Madras. He also holds an MBA from Indira Gandhi National Open University (IGNOU).He started his career in College of Engineering, Trivandrum (CET) in the year 1990 and served there as Lecturer, Asst. professor, Professor, Head of the Department and Dean of Research till 2018. He retired from Govt. Service as Joint Director of Technical Education, Kerala in 2019. He has published about 75 research papers in International and national journals and conferences. He has also undertaken many sponsored research and consultancy projects of DST, ISRO, KSCSTE, etc.He is also a Research Guide to the University of Kerala and to APJ Abdul Kalam Technological University (KTU)."
          pic={"/images/principal.png"}
        />
    </div>
  );
}

export default Principal;
