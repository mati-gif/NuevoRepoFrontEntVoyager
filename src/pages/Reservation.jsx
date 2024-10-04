import React, { useState } from 'react'
import ReservationComponent from '../components/ReservationComponent'
import { Calendar, Clock, Users, MapPin, Utensils, Sun, Moon, ArrowRight } from 'lucide-react';
import ButtonWaveEffect from '../components/ButtonWaveEffect';
import "./Reservation.css"
import ComponenteMesaPrueba from '../components/ComponenteMesaPrueba'
import TablePB from '../components/TablePB';
import TableOutDoor from '../components/TableOutDoor';


function Reservation() {


  const [sector, setSector] = useState('pb')
  const [selectedSectorGroundFloor, setSelectedSectorGroundFloor] = useState('border-[3px] border-amber-500')
  const [selectedSectorFirstFloor, setSelectedSectorFirstFloor] = useState('')
  const [selectedSectorOutDoor, setSelectedSectorOutDoor] = useState('')


  return (
    <div className='bgViewReservation flex flex-col min-h-screen'>
      <div className='my-[30px]'>
        <h1 className="text-[40px] block  text-center font-bold  text-[white] mb-[50px]">Seating Area</h1>
        <div className='w-full flex flex-row justify-center'>
          <div className=" w-[90%] grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button className={`${selectedSectorGroundFloor} p-4 border bg-gray-700 text-white border-amber-300 rounded-md hover:bg-amber-50 hover:text-black transition duration-150 ease-in-out flex flex-col items-center`}
              onClick={() => {
                setSelectedSectorOutDoor('')
                setSelectedSectorFirstFloor('')
                setSelectedSectorGroundFloor('border-[3px] border-amber-500')
                setSector('pb')
              }}
            >
              <MapPin className="text-[#dd9000] mb-2" />
              <span className=''>Ground Floor</span>
            </button>
            <button className={`${selectedSectorFirstFloor} p-4 border bg-gray-700 text-white border-amber-300 rounded-md hover:bg-amber-50 hover:text-black transition duration-150 ease-in-out flex flex-col items-center`}
              onClick={() => {
                setSelectedSectorOutDoor('')
                setSelectedSectorGroundFloor('')
                setSelectedSectorFirstFloor('border-[3px] border-amber-500')
                setSector('firstFloor')
              }}
            >
              <Utensils className="text-[#dd9000] mb-2" />
              <span>First Floor</span>
            </button>
            <button className={`${selectedSectorOutDoor} p-4 border bg-gray-700 text-white border-amber-300 rounded-md hover:bg-amber-50 hover:text-black transition duration-150 ease-in-out flex flex-col items-center`}
              onClick={() => {
                setSelectedSectorFirstFloor('')
                setSelectedSectorGroundFloor('')
                setSelectedSectorOutDoor('border-[3px] border-amber-500')
                setSector('outDoor')
              }}
            >
              <Sun className="text-[#dd9000] mb-2" />
              <span>Outdoor</span>
            </button>
          </div>
        </div>
      </div>
      {/* <ReservationComponent sector={sector} /> */}
      <div className='mb-[50px]'>

       <ButtonWaveEffect />
       <ComponenteMesaPrueba/>
       <TablePB/>
       <TableOutDoor/>

      </div>
      {/* <button
        className="relative w-[200px] h-[70px] p-3 bg-gray-700 text-yellow-500 rounded font-bold overflow-hidden group"
      >
        <span className="relative text-[30px] z-10 flex items-center justify-center">
          Ingresar
          <ArrowRight size={30} className="ml-2" />
        </span>
        <span className="absolute bottom-0 left-0 w-full h-0 bg-yellow-500 transition-all duration-300 group-hover:h-full"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 bg-yellow-400 transition-all duration-500 delay-100 group-hover:h-full"></span>
      </button> */}
    </div>
  )
}

export default Reservation