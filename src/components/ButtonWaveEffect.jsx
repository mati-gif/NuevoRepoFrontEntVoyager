import React, { useState } from 'react'
import "./ButtonWaveEffect.css"

function ButtonWaveEffect() {
    const [isHovered, setIsHovered] = useState(false)
  return (
    <div className="flex items-center justify-center mt-[30px]">
      <button
        className="buttonWave relative overflow-hidden text-2xl font-bold py-4 px-8 rounded-lg bg-gray-800 text-yellow-500 transition-all duration-300 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <span className="relative z-10 text-[30px]">Confirmar</span>
        <div
          className={`absolute bottom-0 left-0 w-full bg-yellow-500 transition-all duration-300 ease-in-out ${
            isHovered ? 'h-full' : 'h-0'
          }`}
        >
          <div className="wave"></div>
        </div>
      </button>
    </div>
  )
}

export default ButtonWaveEffect