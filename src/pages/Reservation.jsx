import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Utensils, Sun, Moon, ArrowRight } from 'lucide-react';
import "./Reservation.css";

import TablePB from '../components/TablePB';
import FirstFloor from '../components/FirstFloor';

function Reservation() {
  const [sector, setSector] = useState('pb');
  const [selectedSectorGroundFloor, setSelectedSectorGroundFloor] = useState('border-[3px] border-amber-500');
  const [selectedSectorFirstFloor, setSelectedSectorFirstFloor] = useState('');
  const [selectedSectorOutDoor, setSelectedSectorOutDoor] = useState('');

  const [showPb, setShowPb] = useState('');
  const [showFirstFloor, setShowFirstFloor] = useState('hidden');
  const [showOutDoor, setShowOutDoor] = useState('hidden');

  return (
    <div className='bgViewReservation flex flex-col min-h-screen'>
      <div className='my-[30px]'>
        <h1 className="text-[40px] block text-center font-bold text-[white] mb-[50px]">Seating Area</h1>
        <div className='w-full flex flex-col items-center'>
          <div className="w-[90%] flex justify-center"> {/* Contenedor centrado */}
            <div className="text-white flex gap-[10px]"> {/* Mantener la cuadrícula */}
              <button className={`${selectedSectorGroundFloor} p-4 w-[200px] border bg-gray-700 text-white border-amber-300 rounded-md hover:bg-amber-50 hover:text-black transition duration-150 ease-in-out flex flex-col items-center`}
                onClick={() => {
                  setSelectedSectorOutDoor('');
                  setSelectedSectorFirstFloor('');
                  setSelectedSectorGroundFloor('border-[3px] border-amber-500');
                  setSector('pb');
                  setShowPb('');
                  setShowFirstFloor('hidden');
                  setShowOutDoor('hidden');
                }}
              >
                <MapPin className="text-[#dd9000] mb-2" />
                <span className=''>Ground Floor</span>
              </button>
              <button className={`${selectedSectorFirstFloor} p-4  w-[200px] border bg-gray-700 text-white border-amber-300 rounded-md hover:bg-amber-50 hover:text-black transition duration-150 ease-in-out flex flex-col items-center`}
                onClick={() => {
                  setSelectedSectorOutDoor('');
                  setSelectedSectorGroundFloor('');
                  setSelectedSectorFirstFloor('border-[3px] border-amber-500');
                  setSector('firstFloor');
                  setShowPb('hidden');
                  setShowFirstFloor('');
                  setShowOutDoor('hidden');
                }}
              >
                <Utensils className="text-[#dd9000] mb-2" />
                <span>First Floor</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='mb-[50px]'>
        
        <div className={`${showPb}`}>
          <TablePB />
        </div>
        <div className={`${showFirstFloor}`}>
          <FirstFloor/>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
