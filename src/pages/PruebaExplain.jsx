import React, { useState } from 'react'

function PruebaExplain() {

    const listaPersonas = [
        {
          id: 1,
          nombre: "Juan",
          edad: 25,
          profesion: "Ingeniero"
        },
        {
          id: 2,
          nombre: "María",
          edad: 30,
          profesion: "Doctora"
        },
        {
          id: 3,
          nombre: "Carlos",
          edad: 22,
          profesion: "Estudiante"
        },
        {
          id: 4,
          nombre: "Ana",
          edad: 28,
          profesion: "Diseñadora"
        }
      ];
      

const [arrayCards,setArrayCards] =useState("")
  return (
    <div className='w-full h-[600px] border-4 border-red-500 '>
        <div>
            
        </div>
    </div>
  )
}

export default PruebaExplain