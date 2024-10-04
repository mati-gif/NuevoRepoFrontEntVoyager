// import React from 'react'

// import { useState } from 'react'
// import { Users2, Users, User, Check, X } from 'lucide-react'



// function ReservationComponent({ sector }) {

//   const [tables, setTables] = useState([
//     {
//       sector: "pb", tables: [{ id: 1, seats: 2, isSelected: false, isLocked: false },
//       { id: 2, seats: 2, isSelected: false, isLocked: false },
//       { id: 3, seats: 4, isSelected: false, isLocked: false },
//       { id: 4, seats: 4, isSelected: false, isLocked: false },
//       { id: 5, seats: 6, isSelected: false, isLocked: false },
//       { id: 6, seats: 6, isSelected: false, isLocked: false },
//       { id: 7, seats: 6, isSelected: false, isLocked: false }]
//     },

//     {
//       sector: "firstFloor", tables: [{ id: 8, seats: 2, isSelected: false, isLocked: false },
//       { id: 9, seats: 6, isSelected: false, isLocked: false },
//       { id: 10, seats: 4, isSelected: false, isLocked: false },
//       { id: 11, seats: 6, isSelected: false, isLocked: false }]
//     },


//     {
//       sector: "outDoor", tables: [{ id: 12, seats: 2, isSelected: false, isLocked: false },
//       { id: 13, seats: 4, isSelected: false, isLocked: false },
//       { id: 14, seats: 4, isSelected: false, isLocked: false },
//       { id: 15, seats: 4, isSelected: false, isLocked: false },
//       { id: 16, seats: 6, isSelected: false, isLocked: false }]
//     }
//   ]
//   )
//   const [isInitialConfirmation, setIsInitialConfirmation] = useState(false)

//   console.log("-----------------" + tables[0].sector)
//   let oneTable = tables.filter(table => table.sector === `${sector}`)
//   console.log(oneTable[0].tables)

//   if (oneTable.length === 0) {
//     return <p>No tables available for this sector.</p>;
//   }

//   const handleTableSelect = (id) => {
//     setTables(prevTables =>
//       prevTables.map(table =>
//         table.id === id && !table.isLocked
//           ? { ...table, isSelected: !table.isSelected }
//           : table
//       )
//     )
//   }

//   const handleConfirmReservation = () => {
//     setTables(prevTables =>
//       prevTables.map(table =>
//         table.isSelected ? { ...table, isLocked: true } : table
//       )
//     )
//     if (!isInitialConfirmation) {
//       setIsInitialConfirmation(true)
//     }
//   }

//   const getTableIcon = (seats) => {
//     switch (seats) {
//       case 2:
//         return <User className="w-6 h-6" />
//       case 4:
//         return <Users className="w-6 h-6" />
//       case 6:
//         return <Users2 className="w-6 h-6" />
//       default:
//         return null
//     }
//   }

//   const hasNewSelection = tables.some(table => table.isSelected && !table.isLocked)

//   return (
//     <div className="p-6 bg-gray-900 rounded-lg mx-[50px] shadow-lg  text-white">
//       <h2 className="text-2xl font-bold mb-4 text-center">Select Your Table</h2>
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//         {oneTable[0].tables.map(table => (
//           <button
//             key={table.id}
//             onClick={() => handleTableSelect(table.id)}
//             className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${table.isSelected
//               ? 'bg-yellow-500 text-gray-900'
//               : 'bg-gray-800 hover:bg-gray-700'
//               } ${table.isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
//               }`}
//             disabled={table.isLocked}
//           >
//             {getTableIcon(table.seats)}
//             <span className="mt-2 font-semibold">
//               Table for {table.seats}
//             </span>
//             <span className="text-sm mt-1">
//               {table.isLocked ? 'Locked' : table.isSelected ? 'Selected' : 'Available'}
//             </span>
//             {table.isLocked && (
//               <X className="absolute top-2 right-2 w-4 h-4 text-red-500" />
//             )}
//           </button>
//         ))}
//       </div>
//       <div className="mt-6 text-center">
//         <p className="font-semibold mb-4">
//           Selected Tables: {oneTable[0].tables.filter(t => t.isSelected).length}
//         </p>
//         <button
//           onClick={handleConfirmReservation}
//           disabled={!hasNewSelection}
//           className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${hasNewSelection
//             ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
//             : 'bg-gray-700 text-gray-400 cursor-not-allowed'
//             }`}
//         >
//           {isInitialConfirmation ? 'Confirm Additional Tables' : 'Confirm Reservation'}
//         </button>
//         {isInitialConfirmation && (
//           <div className="mt-4 text-yellow-500 font-semibold">
//             <Check className="inline-block mr-2 w-5 h-5" />
//             Initial selection confirmed. You can select more tables if needed.
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default ReservationComponent





import React, { useState } from 'react';
import { Users2, Users, User, Check, X } from 'lucide-react';

function ReservationComponent({ sector }) {

  const [tables, setTables] = useState([
    {
      sector: "pb", tables: [{ id: 1, seats: 2, isSelected: false, isLocked: false },
      { id: 2, seats: 2, isSelected: false, isLocked: false },
      { id: 3, seats: 4, isSelected: false, isLocked: false },
      { id: 4, seats: 4, isSelected: false, isLocked: false },
      { id: 5, seats: 6, isSelected: false, isLocked: false },
      { id: 6, seats: 6, isSelected: false, isLocked: false },
      { id: 7, seats: 6, isSelected: false, isLocked: false }]
    },
    {
      sector: "firstFloor", tables: [{ id: 8, seats: 2, isSelected: false, isLocked: false },
      { id: 9, seats: 6, isSelected: false, isLocked: false },
      { id: 10, seats: 4, isSelected: false, isLocked: false },
      { id: 11, seats: 6, isSelected: false, isLocked: false }]
    },
    {
      sector: "outDoor", tables: [{ id: 12, seats: 2, isSelected: false, isLocked: false },
      { id: 13, seats: 4, isSelected: false, isLocked: false },
      { id: 14, seats: 4, isSelected: false, isLocked: false },
      { id: 15, seats: 4, isSelected: false, isLocked: false },
      { id: 16, seats: 6, isSelected: false, isLocked: false }]
    }
  ]);

  const [isInitialConfirmation, setIsInitialConfirmation] = useState(false);

  let oneTable = tables.filter(table => table.sector === `${sector}`);

  if (oneTable.length === 0) {
    return <p>No tables available for this sector.</p>;
  }

  const handleTableSelect = (id) => {
    setTables(prevTables =>
      prevTables.map(sectorData => 
        sectorData.sector === sector
          ? {
              ...sectorData,
              tables: sectorData.tables.map(table =>
                table.id === id && !table.isLocked
                  ? { ...table, isSelected: !table.isSelected }
                  : table
              )
            }
          : sectorData
      )
    );
  };

  const handleConfirmReservation = () => {
    setTables(prevTables =>
      prevTables.map(sectorData => 
        sectorData.sector === sector
          ? {
              ...sectorData,
              tables: sectorData.tables.map(table =>
                table.isSelected ? { ...table, isLocked: true } : table
              )
            }
          : sectorData
      )
    );
    if (!isInitialConfirmation) {
      setIsInitialConfirmation(true);
    }
  };

  const getTableIcon = (seats) => {
    switch (seats) {
      case 2:
        return <User className="w-6 h-6" />;
      case 4:
        return <Users className="w-6 h-6" />;
      case 6:
        return <Users2 className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const hasNewSelection = oneTable[0].tables.some(table => table.isSelected && !table.isLocked);

  return (
    <div className="p-6 bg-gray-900 rounded-lg mx-[50px] shadow-lg  text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Select Your Table</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {oneTable[0].tables.map(table => (
          <button
            key={table.id}
            onClick={() => handleTableSelect(table.id)}
            className={`p-4 rounded-lg flex flex-col items-center justify-center transition-all duration-300 ${table.isSelected
              ? 'bg-yellow-500 text-gray-900'
              : 'bg-gray-800 hover:bg-gray-700'
              } ${table.isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            disabled={table.isLocked}
          >
            {getTableIcon(table.seats)}
            <span className="mt-2 font-semibold">
              Table for {table.seats}
            </span>
            <span className="text-sm mt-1">
              {table.isLocked ? 'Locked' : table.isSelected ? 'Selected' : 'Available'}
            </span>
            {table.isLocked && (
              <X className="absolute top-2 right-2 w-4 h-4 text-red-500" />
            )}
          </button>
        ))}
      </div>
      <div className="mt-6 text-center">
        <p className="font-semibold mb-4">
          Selected Tables: {oneTable[0].tables.filter(t => t.isSelected).length}
        </p>
        <button
          onClick={handleConfirmReservation}
          disabled={!hasNewSelection}
          className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${hasNewSelection
            ? 'bg-yellow-500 text-gray-900 hover:bg-yellow-600'
            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
        >
          {isInitialConfirmation ? 'Confirm Additional Tables' : 'Confirm Reservation'}
        </button>
        {isInitialConfirmation && (
          <div className="mt-4 text-yellow-500 font-semibold">
            <Check className="inline-block mr-2 w-5 h-5" />
            Initial selection confirmed. You can select more tables if needed.
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationComponent;
