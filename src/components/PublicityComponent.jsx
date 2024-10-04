import React, { useState, useEffect, useRef } from 'react'
import "../styles/publicityComponent.css"
import { div } from 'framer-motion/client'
import { Tooltip } from 'react-tooltip'


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
    return (

        <div className="rock-business-container" ref={containerRef} style={{ opacity }}>
            <div className="left-content-container-publicity">
                <h3>Negocios</h3>
                <h1 className='h1-container-publicity'>Rock & Business</h1>
                <p>
                    Espacios exclusivos para reuniones de trabajo y eventos privados,
                    equipados con pantalla 4K UHD, WiFi, equipos de audio y un menú exclusivo
                    para cada ocasión.
                </p>
                <button className="reserve-button-container-publicity">
                    <span>Reservar</span>
                    <div className="liquid-container-publicity"></div>
                </button>
            </div>
            <div className="right-content-container-publicity">
                <div className="image-container-publicity">
                    <div className="overlay-container-publicity">
                        <h2>Eventos</h2>
                        <h1 className='h1-container-publicity'>Rock & Business</h1>
                        <button className="reserve-button-container-publicity">
                            <span>Reservar</span>
                            <div className="liquid-container-publicity"></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default PublicityComponent