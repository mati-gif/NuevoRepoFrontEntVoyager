// import React, { useEffect, useState, useRef } from "react";
// import { motion, useAnimation } from "framer-motion";
// import "../styles/timeInfo.css";

// function TimeInfoComponent() {
//     const containerRef = useRef(null)

//     useEffect(() => {
//         const handleScroll = () => {
//             if (containerRef.current) {
//                 const { top, bottom } = containerRef.current.getBoundingClientRect()
//                 const inView = top < window.innerHeight && bottom >= 0
//                 containerRef.current.classList.toggle('in-view', inView)
//             }
//         }

//         window.addEventListener('scroll', handleScroll)
//         handleScroll() // Check initial state

//         return () => window.removeEventListener('scroll', handleScroll)
//     }, [])
//     return (
//         <div className="happy-hours-container border-4 border-green-600" ref={containerRef}>
//             <div className="left-side-container-time-info">
//                 <div className="image-overlay-container-time-info">
//                     {/* <h2>Happy Hours</h2> */}
//                     <p>
//                         {/* El after office que combina lo mejor de la coctelería internacional
//                         con la mística del rock */}
//                     </p>
//                     <button className="reserve-button-container-time-info">
//                         <span>Reservar</span>
//                     </button>
//                 </div>
//             </div>
//             <div className="right-side-container-time-info">
//                 <div className="content-time-info">
//                     <h3 className="h3-container-time-info">¡We are wating for you!</h3>
//                     <h2 className="h2-container-time-info">OUR SCHEDULES</h2>
//                     <div className="schedule-container-time-info">
//                         <div className="location-container-time-info">
//                             <h4>Rosario</h4>
//                             <p>19:00</p>
//                             <p>01:00</p>
//                         </div>
//                         <div className="divider-container-time-info"></div>
//                         <div className="location-container-time-info">
//                             <h4>Buenos Aires</h4>
//                             <p>17:00</p>
//                             <p>01:00</p>
//                         </div>
//                     </div>
//                     <button className="reserve-button-container-time-info">
//                         <span>Reservar</span>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TimeInfoComponent;


import React, { useEffect, useRef } from "react";
import "../styles/timeInfo.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

function TimeInfoComponent() {
    const containerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { top, bottom } = containerRef.current.getBoundingClientRect();
                const inView = top < window.innerHeight && bottom >= 0;
                containerRef.current.classList.toggle('in-view', inView);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navigate = useNavigate();
    const status = useSelector(state => state.auth.status)
    console.log(status);

    const handleButtonClick = () => {
        if (status === "success") {
            navigate("/reservation");
        } else {
            Swal.fire({
                icon: 'warning',
                title: '',
                text: 'To make a reservation you must first register or sign in',
                // timer: 2000, // El temporizador dura 3 segundos (3000 milisegundos)
                showConfirmButton: true, // Oculta el botón de confirmación
                willClose: () => {
                    navigate("/register"); // Navegar después de que la alerta desaparezca
                }
            });
        }
    };
    

    return (
        <div className="happy-hours-container" ref={containerRef}>
            <div className="left-side-container-time-info">
                <div className="image-overlay-container-time-info">
                    {/* <h2>Happy Hours</h2> */}
                    <p>
                        {/* El after office que combina lo mejor de la coctelería internacional
                        con la mística del rock */}
                    </p>
                    <button 
                    onClick={handleButtonClick}
                    className="text-[25px] text-yellow-400 border-2 border-yellow-500 p-[10px] hover:bg-[#0000002c] hover:text-yellow-400">
                        <span>Make a reservation</span>
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
                    <button
                    onClick={handleButtonClick} className="text-[25px] text-yellow-400 border-2 border-yellow-500 p-[10px] hover:bg-[#0000002c] hover:text-yellow-400">
                        <span>Make a reservation</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TimeInfoComponent;
