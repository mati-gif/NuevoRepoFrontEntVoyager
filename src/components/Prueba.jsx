import React, { useState, useEffect } from 'react';

const reservations = [
  {
    id: 1,
    tableNumber: 1,
    seats: 2,
    sector: "GROUND_FLOOR",
    status: "RESERVED",
    tableId: 1,
    reservationStart: "2024-10-05T19:00:00",
    reservationEnd: "2024-10-05T21:00:00"
  },
  {
    id: 2,
    tableNumber: 2,
    seats: 2,
    sector: "GROUND_FLOOR",
    status: "RESERVED",
    tableId: 2,
    reservationStart: "2024-10-05T22:00:00",
    reservationEnd: "2024-10-06T00:00:00"
  },
  {
    id: 3,
    tableNumber: 3,
    seats: 4,
    sector: "GROUND_FLOOR",
    status: "RESERVED",
    tableId: 3,
    reservationStart: "2024-10-06T18:30:00",
    reservationEnd: "2024-10-06T20:30:00"
  },
  {
    id: 4,
    tableNumber: 4,
    seats: 4,
    sector: "GROUND_FLOOR",
    status: "RESERVED",
    tableId: 4,
    reservationStart: "2024-10-06T21:00:00",
    reservationEnd: "2024-10-06T23:00:00"
  },
  {
    id: 5,
    tableNumber: 1,
    seats: 2,
    sector: "GROUND_FLOOR",
    status: "RESERVED",
    tableId: 1,
    reservationStart: "2024-10-07T19:00:00",
    reservationEnd: "2024-10-07T21:00:00"
  },
  {
    id: 6,
    tableNumber: 2,
    seats: 2,
    sector: "GROUND_FLOOR",
    status: "RESERVED",
    tableId: 2,
    reservationStart: "2024-10-07T20:00:00",
    reservationEnd: "2024-10-07T22:00:00"
  },
  {
    id: 7,
    tableNumber: 3,
    seats: 4,
    sector: "GROUND_FLOOR",
    status: "RESERVED",
    tableId: 3,
    reservationStart: "2024-10-08T19:30:00",
    reservationEnd: "2024-10-08T21:30:00"
  },
  {
    id: 8,
    tableNumber: 4,
    seats: 4,
    sector: "GROUND_FLOOR",
    status: "RESERVED",
    tableId: 4,
    reservationStart: "2024-10-09T22:00:00",
    reservationEnd: "2024-10-10T00:00:00"
  },
  {
    id: 9,
    tableNumber: 1,
    seats: 2,
    sector: "GROUND_FLOOR",
    status: "RESERVED",
    tableId: 1,
    reservationStart: "2024-10-10T19:00:00",
    reservationEnd: "2024-10-10T21:00:00"
  },
  {
    id: 10,
    tableNumber: 2,
    seats: 2,
    sector: "GROUND_FLOOR",
    status: "RESERVED",
    tableId: 2,
    reservationStart: "2024-10-10T19:00:00",
    reservationEnd: "2024-10-10T21:00:00"
  },
];

const TableReservation = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [tableStatus, setTableStatus] = useState({});

  // Manejar la selección de fecha
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  // Manejar la selección de hora
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  // Actualizar el estado de las mesas en base a la fecha y hora seleccionadas
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const updatedStatus = {
        1: 'free',
        2: 'free',
        3: 'free',
        4: 'free',
      };

      const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
      
      reservations.forEach((reservation) => {
        const reservationStart = new Date(reservation.reservationStart);
        const reservationEnd = new Date(reservation.reservationEnd);
        
        // Verificar si hay un choque en la fecha y hora seleccionadas
        if (selectedDateTime >= reservationStart && selectedDateTime < reservationEnd) {
          updatedStatus[reservation.tableId] = 'reserved';
        }
      });

      setTableStatus(updatedStatus);
    } else {
      setTableStatus({
        1: 'free',
        2: 'free',
        3: 'free',
        4: 'free',
      });
    }
  }, [selectedDate, selectedTime]);

  // Slots de tiempo
  const timeSlots = [
     "20:00", 
    "21:30",  "23:00"
  ];

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
      <h2>Reserva de Mesas</h2>

      {/* Formulario para seleccionar fecha y hora */}
      <form>
        <div>
          <label>Fecha de la Reserva: </label>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={handleDateChange} 
          />
        </div>
        <div>
          <label>Hora de la Reserva: </label>
          <select value={selectedTime} onChange={handleTimeChange}>
            <option value="">Seleccionar Hora</option>
            {timeSlots.map((time, index) => (
              <option key={index} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </form>

      {/* Layout de las mesas */}
      <div style={{ display: 'flex', marginTop: '20px' }}>
        {[1, 2, 3, 4].map((tableId) => (
          <div
            key={tableId}
            style={{
              width: '100px',
              height: '100px',
              backgroundColor: tableStatus[tableId] === 'reserved' ? 'red' : 'lightgreen',
              border: '1px solid #000',
              margin: '10px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              color: tableStatus[tableId] === 'reserved' ? 'white' : 'black' // Cambiar el color del texto
            }}
          >
            Mesa {tableId}
          </div>
        ))}
      </div>
    </div>
  );
}; 

export default TableReservation;
