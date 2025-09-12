"use client"

import React from 'react'
import "../../styles/homepage/events2.css"

import "@/styles/homepage/carousal.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Carousel } from "react-responsive-carousel";
import Carousel from '../carousal';

import { useEffect, useState } from 'react';
// import { resolveMotionValue } from 'framer-motion';

export default function Events2( ) {

    const [slidesToShow, setSlidesToShow] = useState(3); // Default 3 slides for desktop

    const [events , setEvents ] = useState([])

    useEffect(()=>{

        fetch( `${process.env.NEXT_PUBLIC_STRAPI}/api/newss?populate=News_media&pagination[pageSize]=800`).then((response)=>{
            return response.json()
        }).then(data=>{

            let response_items = data.data 

            for ( let i = 0 ; i < 5 ; i ++){
                response_items.push(response_items[0])
            }

            setEvents(response_items);
            console.log(data.data)



        })
    }, [])

    useEffect(() => {
        const handleResize = () => {
            const screenWidth = window.innerWidth;

            if (screenWidth <= 768) {
                setSlidesToShow(1); // 1 slide for mobile
            } else if (screenWidth <= 1024) {
                setSlidesToShow(2); // 2 slides for tablet
            } else {
                setSlidesToShow(3); // 3 slides for desktop
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set initial number of slides based on current window size

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className='carousal_section events ' >

            <div className="events_container">
                <div className="events_title_area">
                    <span className="event_left_border"></span>
                    <h3>NEWS</h3>
                    <a href="/news" className="events_know_more">KNOW MORE</a>
                </div>

                <div className="carousal_container">

                <Carousel items={events} background="white" mediaField="News_media" type = 'news' />

                    {/* <Carousel
                        showThumbs={false}
                        infiniteLoop
                        showIndicators={true}
                        showStatus={false}
                        swipeable
                        dynamicHeight={false}
                        centerMode
                       
                        centerSlidePercentage={100 / slidesToShow} // Dynamic slide percentage
                        renderArrowPrev={(onClickHandler, hasPrev) =>
                            hasPrev && (
                                <button type="button" onClick={onClickHandler} className="custom-arrow prev">
                                    <span>&#9664;</span>
                                </button>
                            )
                        }
                        renderArrowNext={(onClickHandler, hasNext) =>
                            hasNext && (
                                <button type="button" onClick={onClickHandler} className="custom-arrow next">
                                    <span>&#9654;</span>
                                </button>
                            )
                        }


                    >
                        <div className="event">
                            <h3 className="event_title">SEMINAR</h3>
                            <img src="/assets/images/home/events_sample.png" alt="" className="event_image" />
                            <p className="event_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deleniti.</p>
                            <div className="event_date"> 
                                 <img src="/assets/images/home/calendar.png" alt=""  />
                                 <span>5th December 2024</span>
                            </div>
                        </div>
                        <div className="event">
                            <h3 className="event_title">SEMINAR</h3>
                            <img src="/assets/images/home/events_sample.png" alt="" className="event_image" />
                            <p className="event_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deleniti.</p>
                            <div className="event_date"> 
                                 <img src="/assets/images/home/calendar.png" alt=""  />
                                 <span>5th December 2024</span>
                            </div>
                        </div>
                        <div className="event">
                            <h3 className="event_title">SEMINAR</h3>
                            <img src="/assets/images/home/events_sample.png" alt="" className="event_image" />
                            <p className="event_description">Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, deleniti.</p>
                            <div className="event_date"> 
                                 <img src="/assets/images/home/calendar.png" alt=""  />
                                 <span>5th December 2024</span>
                            </div>
                        </div>
                        


                    </Carousel> */}
                </div>
            </div>

        </div>
    )
}
