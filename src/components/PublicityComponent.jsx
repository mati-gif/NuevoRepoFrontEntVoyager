import React, { useState, useEffect, useRef } from 'react'
import "../styles/publicityComponent.css"
import { div } from 'framer-motion/client'
import { Tooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'


function PublicityComponent() {

    const [scrollPosition, setScrollPosition] = useState(0)
    const containerRef = useRef(null)

    useEffect(() => {
        const handleScroll = () => {
            const position = window.pageYOffset
            setScrollPosition(position)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const calculateOpacity = () => {
        if (!containerRef.current) return 0
        const elementTop = containerRef.current.offsetTop
        const elementHeight = containerRef.current.offsetHeight
        const windowHeight = window.innerHeight

        if (scrollPosition > elementTop - windowHeight && scrollPosition < elementTop + elementHeight) {
            return (scrollPosition - (elementTop - windowHeight)) / windowHeight
        }
        return 0
    }

    const opacity = calculateOpacity()

    //----------------------------------------------------------------------------------------------//

    const [selectedTables, setSelectedTables] = useState([]);

    // Función para manejar la selección de mesas
    const handleTableClick = (tableId) => {
        if (selectedTables.includes(tableId)) {
            setSelectedTables(selectedTables.filter(id => id !== tableId));
        } else {
            setSelectedTables([...selectedTables, tableId]);
        }
    };

    //------------------------------------------------------------------------------------------
    const navigate = useNavigate();
    const status = useSelector(state => state.auth.status)
    console.log(status);
    

    // const handleButtonClick = () =>{

    //     if(status === "success"){
    //         navigate("/reservation")
    //     } else{
    //         Swal.fire({
    //             icon: 'warning',
    //             title: '',
    //             text: 'To make a reservation first must be register o sig in',
    //         })

    //         navigate("/register")
    //     }
    // }



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

        <div className="rock-business-container mt-[-50px] xl:flex xl:w-xl:w-[100%] xl:justify-center" ref={containerRef} style={{ opacity }}>
            <div className="left-content-container-publicity xl:w-[50%]">
                <h3>Business</h3>
                <h1 className='h1-container-publicity'>Rock & Business</h1>
                <p className='w-[100%] '>
                Exclusive spaces for business meetings and private events, equipped with a 4K UHD screen, WiFi, audio equipment and an exclusive menu for every occasion.
                </p>
                <button 
                onClick={handleButtonClick}
                className="reserve-button-container-publicity md:w-[60%]">
                    <span>Make a reservation</span>
                    <div className="liquid-container-publicity"></div>
                </button>
            </div>
            <div className="right-content-container-publicity xl:w-[50%]">
                <div className="image-container-publicity">
                    <div className="overlay-container-publicity text-center">
                        <h2>Events</h2>
                        <h1 className='h1-container-publicity'>Rock & Business</h1>
                        <button 
                        onClick={handleButtonClick}
                        className="reserve-button-container-publicity">
                            <span>Make a reservation</span>
                            <div className="liquid-container-publicity"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default PublicityComponent