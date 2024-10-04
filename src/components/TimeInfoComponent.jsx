import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "../styles/timeInfo.css";

function TimeInfoComponent() {
    const containerRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { top, bottom } = containerRef.current.getBoundingClientRect()
                const inView = top < window.innerHeight && bottom >= 0
                containerRef.current.classList.toggle('in-view', inView)
            }
        }

        window.addEventListener('scroll', handleScroll)
        handleScroll() // Check initial state

        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <div className="happy-hours-container" ref={containerRef}>
            <div className="left-side-container-time-info">
                <div className="image-overlay-container-time-info">
                    {/* <h2>Happy Hours</h2> */}
                    <p>
                        {/* El after office que combina lo mejor de la coctelería internacional
                        con la mística del rock */}
                    </p>
                    <button className="reserve-button-container-time-info">
                        <span>Reservar</span>
                    </button>
                </div>
            </div>
            <div className="right-side-container-time-info">
                <div className="content-time-info">
                    <h3 className="h3-container-time-info">¡We are wating for you!</h3>
                    <h2 className="h2-container-time-info">OUR SCHEDULES</h2>
                    <div className="schedule-container-time-info">
                        <div className="location-container-time-info">
                            <h4>Rosario</h4>
                            <p>19:00</p>
                            <p>01:00</p>
                        </div>
                        <div className="divider-container-time-info"></div>
                        <div className="location-container-time-info">
                            <h4>Buenos Aires</h4>
                            <p>17:00</p>
                            <p>01:00</p>
                        </div>
                    </div>
                    <button className="reserve-button-container-time-info">
                        <span>Reservar</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TimeInfoComponent;
