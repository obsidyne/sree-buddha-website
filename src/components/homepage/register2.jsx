"use client"

import React from 'react'
import "@/styles/homepage/register2024-252.css"
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from 'react';

export default function Register2() {
    useEffect(() => {
        AOS.init({
            once: true,
            //   disable: "phone",
            duration: 700,
            easing: "ease-out-cubic",
        });
    }, []);
    return (
        <div className="register2_container">
            <div className='register2'>
                <h3 data-aos="fade-up">REGISTER NOW  FOR 2026-2027</h3>
                <a data-aos="fade-up" href="/academics/courses" className="register_now">Register</a>
            </div>
        </div>

    )
}
