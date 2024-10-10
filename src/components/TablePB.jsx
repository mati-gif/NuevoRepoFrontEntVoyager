import "./TablePB.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";
import ButtonWaveEffect from "./ButtonWaveEffect";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const TablePB = ({ token }) => {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedTime, setSelectedTime] = useState("");
  const [tableStatus, setTableStatus] = useState({});
  const [allTables, setAllTables] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [groundFloorTables, setGroundFloorTables] = useState([]);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dateError, setDateError] = useState("");
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    axios
      .get("https://challengefinalbackvoyager.onrender.com/api/tables/")
      .then((response) => {
        console.log(response);
        setAllTables(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    axios
      .get("https://challengefinalbackvoyager.onrender.com/api/clientTables/allReservations")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  useEffect(() => {
    if (allTables.length > 0) {
      const filteredTables = allTables.filter(
        (table) => table.sector === "GROUND_FLOOR"
      );
      setGroundFloorTables(filteredTables);
    }
  }, [allTables]);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      const updatedStatus = {};
      groundFloorTables.forEach((table) => {
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
      groundFloorTables.forEach((table) => {
        initialStatus[table.id] = "free";
      });
      setTableStatus(initialStatus);
    }
  }, [selectedDate, selectedTime, groundFloorTables, reservations]);

  const timeSlots = ["20:00", "21:30", "23:00"];


  const navigate = useNavigate();

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


        Swal.fire({
          icon: 'success',
          title: '',
          text: 'your reserved has been created succesfully',
          // timer: 2000, // El temporizador dura 3 segundos (3000 milisegundos)
          showConfirmButton: true, // Oculta el botón de confirmación
          willClose: () => {
              navigate("/"); // Navegar después de que la alerta desaparezca
          }
      });




      })
      .catch((error) => {
        console.error("Error creating the reservation:", error);
      });
  };




  
  return (
    <div className="flex flex-col justify-center items-center gap-[30px]">
      <div className="flex flex-row-reverse gap-[30px] mt-[20px]">
        <form className="w-[50%] flex flex-col gap-[45px] items-center pt-[50px] relative">
          <h2 className="text-3xl font-bold text-yellow-500">
            Table Reservation
          </h2>

          <div className="flex flex-col gap-4 text-white font-bold">
            <div className="flex gap-4 items-center">
              <label className="whitespace-nowrap">Reservation Date:</label>
              <input
                className="text-black text-center border border-gray-300 rounded-lg p-2"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={today} // Desde hoy
                max={
                  new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
                    .toISOString()
                    .split("T")[0]
                } // Hasta 7 días adelante
              />
            </div>
            {dateError && <p className="text-red-500 font-bold text-sm text-center">{dateError}</p>}
            <div className="flex gap-4 items-center">
              <label className="whitespace-nowrap">Reservation Time:</label>
              <select
                className="text-black text-center border border-gray-300 rounded-lg p-2"
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
            className="bg-yellow-500 hover:bg-yellow-600 p-5 font-bold text-blue-950 rounded-xl"
          >
            Reserve
          </button>
          <p className="w-[550px] text-yellow-500 text-[14px]">
            (*)Reservations can be made with a maximum of two hours in advance
            and are available from the current day up to 7 days ahead. We offer
            three dinner shifts, starting at 20:00 (8 PM) and running until
            02:00 (2 AM). If you need to cancel your reservation, please do so
            with two hours' notice. Thank you for choosing us for your dining
            experience.
          </p>
        </form>
        <div className="bgTablePB border-2 border-yellow-500 relative h-[75vh] w-[600px] rounded-xl">
          <div className="bg-yellow-500 p-2  rounded-lg absolute right-0 text-[11.5px]">
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

          {groundFloorTables.map((table, index) => {
            let customClass =
              "border-2 border-black absolute rounded-[100px] flex flex-col items-center justify-center text-[13px] font-bold";

            if (tableStatus[table.id] === "reserved") {
              customClass +=
                " bg-red-500 bg-opacity-60 text-white cursor-not-allowed"; // Mesa reservada con estilos
            } else if (selectedTableId === table.id) {
              customClass += " bg-[#00800080]"; // Mesa seleccionada
            } else {
              customClass +=
                " bg-[#FFFFFF80] hover:bg-[#00000099] cursor-pointer"; // Mesa libre
            }

            switch (index) {
              case 0:
                customClass += " top-[7%] left-[7.5%] w-[12%] h-[12%]";
                break;
              case 1:
                customClass += " top-[15%] left-[23%] w-[23%] h-[14%]";
                break;
              case 2:
                customClass += " top-[31%] left-[16%] w-[12%] h-[12%]";
                break;
              case 3:
                customClass += " top-[47%] left-[13%] w-[12%] h-[12%]";
                break;
              case 4:
                customClass += " top-[61%] left-[18%] w-[12%] h-[12%]";
                break;
              case 5:
                customClass += " top-[71%] left-[8%] w-[12%] h-[12%]";
                break;
              case 6:
                customClass += " top-[81%] left-[18%] w-[12%] h-[12%]";
                break;
              case 7:
                customClass += " top-[71%] left-[28%] w-[12%] h-[12%]";
                break;
              case 8:
                customClass += " top-[70%] left-[59%] w-[12%] h-[12%]";
                break;
              case 9:
                customClass += " bottom-[7%] left-[68%] w-[12%] h-[12%]";
                break;
              case 10:
                customClass += " top-[46%] left-[72%] w-[12%] h-[12%]";
                break;
              case 11:
                customClass += " top-[60%] left-[68%] w-[12%] h-[12%]";
                break;
              case 12:
                customClass += " top-[70%] left-[79%] w-[12%] h-[12%]";
                break;
              case 13:
                customClass += " top-[31%] left-[71%] w-[12%] h-[12%]";
                break;
              case 14:
                customClass += " top-[14%] left-[65%] w-[22%] h-[15%]";
                break;
              default:
                customClass += " top-[30%] left-[70%] w-[18%] h-[15%]";
            }

            return (
              <div
                key={index}
                onClick={() => {
                  if (tableStatus[table.id] !== "reserved") {
                    if (selectedTableId === table.id) {
                      setSelectedTableId(null); // Deseleccionar la mesa
                    } else {
                      setSelectedTableId(table.id); // Seleccionar la mesa
                    }
                  }
                }}
                className={`${customClass} text-black hover:text-white text-[12px]`}
              >
                <p className="">{table.id}</p>
                <p>
                  {table.seats} <i className="fa-solid fa-chair"></i>{" "}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TablePB;