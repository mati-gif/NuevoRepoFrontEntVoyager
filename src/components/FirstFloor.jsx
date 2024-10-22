import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonWaveEffect from "./ButtonWaveEffect";
import "../styles/componenteMesaPrueba.css";

const FirstFloor = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [tableStatus, setTableStatus] = useState({});
  const [allTables, setAllTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [firstFloorTables, setFirstFloorTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  // Fetch all tables
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("https://challengefinalbackvoyager.onrender.com/api/tables/")
        .then((response) => {
          setAllTables(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  // Fetch all reservations
  useEffect(() => {
    axios
      .get("https://challengefinalbackvoyager.onrender.com/api/clientTables/allReservations")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Filter tables by the first floor
  useEffect(() => {
    if (allTables.length > 0) {
      const filteredTables = allTables.filter(
        (table) => table.sector === "FIRST_FLOOR"
      );
      setFirstFloorTables(filteredTables);
    }
  }, [allTables]);

  // Update table status based on selected date and time
  useEffect(() => {
    if (selectedDate && selectedTime) {
      const updatedStatus = {};
      firstFloorTables.forEach((table) => {
        updatedStatus[table.id] = "free";
      });

      const selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);

      reservations.forEach((reservation) => {
        const reservationStart = new Date(reservation.reservationStart);
        const reservationEnd = new Date(reservation.reservationEnd);

        if (
          selectedDateTime >= reservationStart &&
          selectedDateTime < reservationEnd
        ) {
          updatedStatus[reservation.tableId] = "reserved";
        }
      });

      setTableStatus(updatedStatus);
    } else {
      const initialStatus = {};
      firstFloorTables.forEach((table) => {
        initialStatus[table.id] = "free";
      });
      setTableStatus(initialStatus);
    }
  }, [selectedDate, selectedTime, firstFloorTables, reservations]);

  const timeSlots = ["20:00", "21:30", "23:00"];

  const handleReservation = (e) => {
    e.preventDefault();

    let hasError = false;

    if (!selectedTableId) {
      setErrorMessage("Please select a table.");
      hasError = true;
    } else {
      setErrorMessage("");
    }

    if (!selectedDate) {
      setDateError("Please select a date.");
      hasError = true;
    } else {
      setDateError("");
    }

    if (!selectedTime) {
      setTimeError("Please select a time.");
      hasError = true;
    } else {
      setTimeError("");
    }

    if (hasError) return;

    const initialReservTime = `${selectedDate}T${selectedTime}`;
    const reservationData = {
      tableId: selectedTableId,
      initialReservTime: initialReservTime,
    };

    console.log(initialReservTime);

    axios
      .post("https://challengefinalbackvoyager.onrender.com/api/clientTables/create", reservationData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log("Reservation created:", response.data);
        // Add logic to handle success, e.g., showing a success message or resetting fields
      })
      .catch((error) => {
        console.error("Error creating the reservation:", error);
      });
  };

  return (
    // <div className="flex flex-col justify-center items-center gap-[30px]">
    //   <div className="flex flex-row-reverse gap-[30px] mt-[20px]">
    //     <form className="w-[50%] flex flex-col gap-[45px] items-center pt-[50px] relative">
    //       <h2 className="text-3xl font-bold text-yellow-500">
    //         Table Reservation
    //       </h2>

    //       <div className="flex flex-col gap-4 text-white font-bold">
    //         <div className="flex gap-4 items-center">
    //           <label className="whitespace-nowrap">Reservation Date:</label>
    //           <input
    //             className="text-black text-center border border-gray-300 rounded-lg p-2"
    //             type="date"
    //             value={selectedDate}
    //             onChange={(e) => setSelectedDate(e.target.value)}
    //             min={new Date().toISOString().split("T")[0]} // Desde hoy
    //             max={
    //               new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    //                 .toISOString()
    //                 .split("T")[0]
    //             } // Hasta 7 días adelante
    //           />
    //         </div>
    //         {dateError && <p className="text-red-500 font-bold text-sm text-center">{dateError}</p>}
    //         <div className="flex gap-4 items-center">
    //           <label className="whitespace-nowrap">Reservation Time:</label>
    //           <select
    //             className="text-black text-center border border-gray-300 rounded-lg p-2"
    //             value={selectedTime}
    //             onChange={(e) => setSelectedTime(e.target.value)}
    //           >
    //             <option value="">Select Time</option>
    //             {timeSlots.map((time, index) => (
    //               <option key={index} value={time}>
    //                 {time}
    //               </option>
    //             ))}
    //           </select>
    //         </div>
    //         {timeError && <p className="text-red-500 font-bold text-sm text-center">{timeError}</p>}
    //       </div>
    //       {errorMessage && (
    //         <p className="text-red-500 text-sm font-bold text-center">{errorMessage}</p>
    //       )}
    //       <button
    //         onClick={handleReservation}
    //         className="bg-yellow-500 hover:bg-yellow-600 p-5 font-bold text-blue-950 rounded-xl"
    //       >
    //         Reserve
    //       </button>
    //       <p className="w-[550px] text-yellow-500 text-xs">(*)Reservations can be made with a maximum of two hours in advance and are available from the current day up to 7 days ahead. We offer three dinner shifts, starting at 20:00 (8 PM) and running until 02:00 (2 AM). If you need to cancel your reservation, please do so with two hours' notice. Thank you for choosing us for your dining experience.</p>
    //     </form>
    //     <div className="bgTableFirstFloor border-2 border-yellow-500 relative h-[75vh] w-[600px] rounded-xl">
    //       <div className="bg-yellow-500 p-1 rounded-lg absolute text-[10px]">
    //         <p className="flex items-center gap-0.5">
    //           <i className="fa-solid fa-chair"></i> Capacity
    //         </p>
    //         <div className="flex items-center gap-0.5 mt-0.5">
    //           <div className="w-[8px] h-[8px] rounded-full border border-black bg-[#FFFFFF80]"></div>
    //           <p>Available</p>
    //         </div>
    //         <div className="flex items-center gap-0.5 mt-0.5">
    //           <div className="w-[8px] h-[8px] rounded-full border border-black bg-[#00800080]"></div>
    //           <p>Selected</p>
    //         </div>
    //         <div className="flex items-center gap-0.5 mt-0.5">
    //           <div className="w-[8px] h-[8px] rounded-full border border-black bg-red-500 bg-opacity-60"></div>
    //           <p>Reserved</p>
    //         </div>
    //       </div>

    //       {firstFloorTables.map((table, index) => {
    //         let customClass =
    //           "border-2 border-black absolute rounded-[100px] flex flex-col items-center justify-center text-[13px] font-bold";

    //         if (tableStatus[table.id] === "reserved") {
    //           customClass +=
    //             " bg-red-500 bg-opacity-60 text-white cursor-not-allowed"; // Reserved table
    //         } else if (selectedTableId === table.id) {
    //           customClass += " bg-[#00800080]"; // Selected table
    //         } else {
    //           customClass +=
    //             " bg-[#FFFFFF80] hover:bg-[#00000099] cursor-pointer"; // Free table
    //         }

    //         // Switch case for positioning the tables
    //         switch (index) {
    //           case 0:
    //             customClass += " top-[65%] left-[64%] w-[30%] h-[23%]";
    //             break;
    //           case 1:
    //             customClass += " top-[67%] left-[17%] w-[26%] h-[20%]";
    //             break;
    //           case 2:
    //             customClass += " top-[33%] left-[67%] w-[27%] h-[25%]";
    //             break;
    //           case 3:
    //             customClass += " top-[40%] left-[41%] w-[23%] h-[20%]";
    //             break;
    //           case 4:
    //             customClass += " top-[32%] left-[16%] w-[20%] h-[22%]";
    //             break;
    //           case 5:
    //             customClass += " top-[3%] left-[74%] w-[15%] h-[20%]";
    //             break;
    //           case 6:
    //             customClass += " top-[10%] left-[45%] w-[24%] h-[18%]";
    //             break;
    //           default:
    //             customClass += " top-[30%] left-[70%] w-[18%] h-[15%]";
    //             break;
    //         }

    //         return (
    //           <div
    //             key={table.id}
    //             className={customClass}
    //             onClick={() => {
    //               if (tableStatus[table.id] !== "reserved") {
    //                 setSelectedTableId(table.id);
    //               }
    //             }}
    //           >
    //             <p className="">{table.id}</p>
    //             <p>
    //               {table.seats} <i className="fa-solid fa-chair"></i>
    //             </p>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </div>
    // </div>


    <div className="flex flex-col w-full lg:flex-row justify-center items-center">
      <div className="flex flex-col lg:flex-row-reverse w-full justify-around items-center mt-[20px] border-2 border-green-600">
        {/* Formulario - Ocupando el 40% */}

        <form className="w-full lg:w-[30%] flex flex-col gap-[30px] lg:gap-[45px] items-center justify-center pt-[30px] lg:pt-[50px] relative">
          <h2 className="text-2xl lg:text-3xl font-bold text-yellow-500">
            Table Reservation
          </h2>

          <div className="flex flex-col gap-2 lg:gap-4 text-white font-bold">
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center">
              <label className="whitespace-nowrap text-center lg:text-left">Reservation Date:</label>
              <input
                className="text-black text-center border border-gray-300 rounded-lg p-2 w-full lg:w-auto"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]} // Desde hoy
                max={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]} // Hasta 7 días adelante
              />
            </div>
            {dateError && <p className="text-red-500 font-bold text-sm text-center">{dateError}</p>}
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center">
              <label className="whitespace-nowrap text-center lg:text-left">Reservation Time:</label>
              <select
                className="text-black text-center border border-gray-300 rounded-lg p-2 w-full lg:w-auto"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
              >
                <option value="">Select Time</option>
                {timeSlots.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            {timeError && <p className="text-red-500 font-bold text-sm text-center">{timeError}</p>}
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm font-bold text-center">{errorMessage}</p>
          )}
          <button
            onClick={handleReservation}
            className="bg-yellow-500 hover:bg-yellow-600 p-4 lg:p-5 font-bold text-blue-950 rounded-xl w-[70%] lg:w-auto"
          >
            Reserve
          </button>
          <p className="w-[90%] text-yellow-500 text-[12px] lg:text-[14px] text-center lg:text-left">
          (*) Reservations can be made with a maximum of two hours in advance and are available from the current day up to 7 days ahead. We offer three dinner shifts, starting at 20:00 (8 PM) and running until 02:00 (2 AM). If you need to cancel your reservation, please do so with two hours' notice. Thank you for choosing us for your dining experience.
        </p>
        </form>

        {/* Mapa de mesas - Ocupando el 60% */}
        <div className="bgTableFirstFloor border-2 border-yellow-500 relative h-[50vh] lg:h-[75vh] w-full lg:w-[60%] rounded-xl">
          <div className="bg-yellow-500 p-2 rounded-lg absolute right-0 text-[10px] lg:text-[11.5px]">
            <p className="flex items-center gap-0.5">
              <i className="fa-solid fa-chair"></i> Capacity
            </p>
            <div className="flex items-center gap-0.5 mt-0.5">
              <div className="w-[8px] h-[8px] rounded-full border border-black bg-[#FFFFFF80]"></div>
              <p>Available</p>
            </div>
            <div className="flex items-center gap-0.5 mt-0.5">
              <div className="w-[8px] h-[8px] rounded-full border border-black bg-[#00800080]"></div>
              <p>Selected</p>
            </div>
            <div className="flex items-center gap-0.5 mt-0.5">
              <div className="w-[8px] h-[8px] rounded-full border border-black bg-red-500 bg-opacity-60"></div>
              <p>Reserved</p>
            </div>
          </div>

          {firstFloorTables.map((table, index) => {
            let customClass =
              "border-2 border-black absolute rounded-[100px] flex flex-col items-center justify-center text-[12px] lg:text-[13px] font-bold";

            if (tableStatus[table.id] === "reserved") {
              customClass += " bg-red-500 bg-opacity-60 text-white cursor-not-allowed"; // Mesa reservada
            } else if (selectedTableId === table.id) {
              customClass += " bg-[#00800080]"; // Mesa seleccionada
            } else {
              customClass += " bg-[#FFFFFF80] hover:bg-[#00000099] cursor-pointer"; // Mesa libre
            }

            switch (index) {
              case 0:
                customClass += " top-[65%] left-[64%] w-[20%] lg:w-[30%] h-[15%] lg:h-[23%]";
                break;
              case 1:
                customClass += " top-[67%] left-[17%] w-[20%] lg:w-[26%] h-[15%] lg:h-[20%]";
                break;
              case 2:
                customClass += " top-[33%] left-[67%] w-[20%] lg:w-[27%] h-[15%] lg:h-[25%]";
                break;
              case 3:
                customClass += " top-[40%] left-[41%] w-[20%] lg:w-[23%] h-[15%] lg:h-[20%]";
                break;
              case 4:
                customClass += " top-[32%] left-[16%] w-[20%] lg:w-[20%] h-[15%] lg:h-[22%]";
                break;
              case 5:
                customClass += " top-[3%] left-[74%] w-[15%] lg:w-[15%] h-[15%] lg:h-[20%]";
                break;
              case 6:
                customClass += " top-[10%] left-[45%] w-[20%] lg:w-[24%] h-[15%] lg:h-[18%]";
                break;
              default:
                customClass += " top-[30%] left-[70%] w-[18%] lg:w-[18%] h-[15%] lg:h-[15%]";
            }

            return (
              <div
                key={table.id}
                className={customClass}
                onClick={() => {
                  if (tableStatus[table.id] !== "reserved") {
                    setSelectedTableId(table.id);
                  }
                }}
              >
                <p>{table.id}</p>
                <p>
                  {table.seats} <i className="fa-solid fa-chair"></i>
                </p>
              </div>
            );
          })}
        </div>
        
      </div>
    </div>


  );
};

export default FirstFloor;
