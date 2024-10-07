
import React, { useEffect, useState } from 'react'
import './TablePB.css'
import axios from 'axios';
import { header, table } from 'framer-motion/client';
import { useSelector } from 'react-redux';

function TablePB() {

  const [tables, setTables] = useState([
    { id: 1, number: 1, capacity: 2, status: 'AVAILABLE' },
    { id: 2, number: 2, capacity: 4, status: 'AVAILABLE' }
  ])

  const updateStatus = (id, newStatus) => {
    const updatedTables = tables.map(table =>
      table.id === id ? { ...table, status: newStatus } : table
    );
    setTables(updatedTables);
  };



  const [textColorStatusTable1, setTextColorStatusTable1] = useState('text-[green]')
  const [bgTable1, setBgTable1] = useState('')
  const [statusIsSelectedTable1, setStatusIsSelectedTable1] = useState('')
  const [isDisabledTable1, setIsDisabledTable1] = useState(false)

  const [textColorStatusTable2, setTextColorStatusTable2] = useState('text-[green]')
  const [bgTable2, setBgTable2] = useState('')
  const [statusIsSelectedTable2, setStatusIsSelectedTable2] = useState('')
  const [isDisabledTable2, setIsDisabledTable2] = useState(false)


  const [allTables, setAllTables] = useState([])
  const [pbTables, setPbTables] = useState([])

  const [tablesReserved, setTablesReserved] = useState([])
  const [tablesReservedPB, setTablesReservedPB] = useState([])

  const [date, setDate] = useState('')
  const [hour, setHour] = useState('')


  //---------------------------------------------------------------------PETICION PARA TRAER TODAS LAS MESAS---------------------------
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(token)
    if (token) {
      axios.get("http://localhost:8080/api/tables/", {
        headers: {
          Authorization: `Bearer ${token}`,
        }

      })
        .then(reponse => {
          console.log(reponse)
          setAllTables(reponse.data)
        })
        .catch(error => {
          console.log(error)
        })
    }

  }, [])
  //---------------------------------------------------------------------PETICION PARA TRAER TODAS LAS MESAS---------------------------


  //---------------------------------------------------------------------PETICION PARA TRAER TODAS LAS MESAS RESERVADAS---------------------------
  useEffect(() => {
    const token = localStorage.getItem("token")
    console.log(token)
    if (token) {
      axios.get("http://localhost:8080/api/clientTables/allReservations", {
        headers: {
          Authorization: `Bearer ${token}`,
        }

      })
        .then(reponse => {
          console.log(reponse.data)
          setTablesReserved(reponse.data)
        })
        .catch(error => {
          console.log(error)
        })
    }

  }, [])
  //---------------------------------------------------------------------PETICION PARA TRAER TODAS LAS MESAS RESERVADAS---------------------------



  //-------------------------------------------------------------FILTRA LAS MESAS Y LAS RESERVAS DE LA PETICION POR EL SECTOR "GROUND_FLOOR"-------------------------  
  useEffect(() => {
    if (allTables.length > 0) {
      const filteredTables = allTables.filter((pbTable) => pbTable.sector === "GROUND_FLOOR");
      setPbTables(filteredTables);
      console.log(filteredTables);  // Muestra las tablas filtradas
    }
    if (tablesReserved && tablesReserved.length > 0) {
      const filteredPBReserveations = tablesReserved.filter(table => table.sector == "GROUND_FLOOR")
      setTablesReservedPB(filteredPBReserveations)
    }
  }, [allTables]);  // Ejecuta el filtro cuando cambie allTables
  //-------------------------------------------------------------FILTRA LAS MESAS DE LA PETICION POR EL SECTOR "GROUND_FLOOR"-------------------------





  //----------------------------------------------------VERIFICA EL ESTADO DE CADA MESA Y SI ES IGUAL A RESERVADO SE INABILITA EL BOTON--------------------------
  useEffect(() => {
    console.log("---------------VUELVE A ENTRAR ACA?")
    if (pbTables && pbTables.length > 0 && pbTables[0].status == "RESERVED") {
      setIsDisabledTable1(true)
      setTextColorStatusTable1('text-[red] font-bold')
      setBgTable1('bg-[#00000077]')
    }
    else{
      setIsDisabledTable1(false)
      setTextColorStatusTable1('text-[green]')
      setBgTable1('')
    }

    if (pbTables && pbTables.length > 0 && pbTables[1].status == "RESERVED") {
      setIsDisabledTable2(true)
      setTextColorStatusTable2('text-[red] font-bold')
      setBgTable2('bg-[#00000077]')
    }
    else{
      setIsDisabledTable2(false)
      setTextColorStatusTable2('text-[green]')
      setBgTable2('')
    }
  }, [pbTables]);  // Ejecuta el filtro cuando cambie allTables
  //----------------------------------------------------VERIFICA EL ESTADO DE CADA MESA Y SI ES IGUAL A RESERVADO SE INABILITA EL BOTON--------------------------




  //-------------------------------------------------------------FUNCION PARA ACTUALIZAR ESTADO DE PBTABLE (MESAS DE PLANTA BAJA)--------------
  // function actualizarEstado(id, nuevoEstado) {
  //   // Crear un nuevo array con el objeto modificado
  //   const nuevosItems = pbTables.map(table => {
  //     // Si el id coincide, actualizamos la propiedad 'estado'
  //     if (table.id === id) {
  //       return { ...table, status: nuevoEstado }; // Devolver una copia del objeto con el 'estado' actualizado
  //     }
  //     return table; // Devolver el objeto tal cual si no coincide
  //   });

  //   // Actualizar el estado con el nuevo array
  //   setPbTables(nuevosItems);
  // }
  function actualizarEstado(id, nuevoEstado) {
    setPbTables(prevPbTables => prevPbTables.map(table => {
      if (table.id === id) {
        return { ...table, status: nuevoEstado };
      }
      return table;
    }));
  }
  //-------------------------------------------------------------FUNCION PARA ACTUALIZAR ESTADO DE PBTABLE (MESAS DE PLANTA BAJA)--------------



  //-----------------------------------------------------OBTENER FECHA ACTUAL------------------------------------
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    // Obtener la fecha actual
    const today = new Date();

    // Formatear la fecha a YYYY-MM-DD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    // Establecer la fecha mínima
    setMinDate(formattedDate);
  }, []);
  //-----------------------------------------------------OBTENER FECHA ACTUAL------------------------------------




  //--------------------------------------------------------------INPUT SELECT HOUR-----------------------------------
  // // Estado para almacenar el valor seleccionado
  // const [selectedOption, setSelectedOption] = useState('');

  // // Manejador de eventos para actualizar el estado cuando se selecciona una opción
  // const handleSelectChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  //--------------------------------------------------------------INPUT SELECT HOUR-----------------------------------


  //----------------------------------------------------
  useEffect(() => {
    tablesReservedPB && tablesReservedPB.length > 0 && console.log(tablesReservedPB)
    if (tablesReservedPB && tablesReservedPB.length > 0) {
      // Variables de fecha y hora a filtrar
      // const targetDate = "2024-10-05";
      // const targetTime = "18:00";
      const targetDate = date;
      const targetTime = hour;

      // Función para filtrar las reservas
      const filteredReservations = tablesReservedPB.filter((reservation) => {
        const [date, time] = reservation.reservationStart.split("T"); // Separa la fecha de la hora
        const formattedTime = time.slice(0, 5); // Obtén solo la hora en formato "HH:MM"

        return date === targetDate && formattedTime === targetTime;
      });

      console.log(filteredReservations);
      if (filteredReservations.length == 0) {
        console.log("-------------------------------------ENTRA????")
        pbTables.map(pbTable => actualizarEstado(pbTable.id, "FREE"))
        // actualizarEstado(1, "FREE")
        // setIsDisabledTable1(false)
        // setTextColorStatusTable1('text-[green]')
        // setBgTable1('')
      }
      filteredReservations && filteredReservations.length > 0 && filteredReservations.map(filteredReservation => {
        actualizarEstado(filteredReservation.tableId, "RESERVED")
      })
    }
  }, [hour, date]);



  return (
    <div>
      <div className='flex flex-col justify-center items-center'>



        <div className='flex flex-row justify-center gap-[40px] w-full'>
          <div className='bg-yellow-500 px-[10px] py-[5px] rounded-[10px]'>
            <label htmlFor="fecha" className='font-bold mr-[10px]'>SELECT DATE</label>
            <input className='p-[4px] rounded-[5px]' type="date" id="fecha" name="fecha" min={minDate} onChange={(e) => {
              setDate(e.target.value)
            }} />
          </div>
          <div className='bg-yellow-500 px-[10px] py-[5px] rounded-[10px]'>
            <div className=' mt-[5px]'>
              <label htmlFor="my-select" className='font-bold mr-[10px]'>SELECT HOUR</label>
              <select className='p-[4px] rounded-[5px]' id="my-select" onChange={(e) => {
                setHour(e.target.value)
              }}>
                <option value="">-- SELECT --</option>
                <option value="18:00">18:00</option>
                <option value="20:00">20:00</option>
                <option value="22:00">22:00</option>
                <option value="00:00">00:00</option>
              </select>
            </div>
          </div>

        </div>

        <div className='bgTablePB border border-red-600 relative h-[95vh] w-[820px]'>


          <button disabled={isDisabledTable1} onClick={() => {
            setTextColorStatusTable1('text-[green]')
            setBgTable1('')
            if (pbTables.length > 0 && pbTables[0].status == 'FREE') {
              actualizarEstado(pbTables[0].id, "SELECTED")
              // updateStatus(pbTables.length > 0 && pbTables[0].id, 'SELECTED')
              setStatusIsSelectedTable1('bg-white rounded-[7px] px-[2px]')
            } else if (pbTables.length > 0) {
              actualizarEstado(pbTables[0].id, "FREE");
              setStatusIsSelectedTable1('');
            }
          }}>
            <div className={`${bgTable1} border-2 border-green-500 absolute top-[6%] left-[7%] w-[13%] h-[14%] rounded-[100px] ${isDisabledTable1 ?
              'cursor-not-allowed' : 'cursor-pointer'} hover:bg-white`}>
              <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='text-[14px] text-[green]'>#{pbTables.length > 0 && pbTables[0].tableNumber}</h1>
                <h1 className='font-bold'> <i className="fa-solid fa-user-group"></i> {pbTables.length > 0 && pbTables[0].seats}</h1>
                <h1 className={`text-[14px] font-bold ${statusIsSelectedTable1} ${textColorStatusTable1}`}>{pbTables.length > 0 && pbTables[0].status}</h1>
              </div>
            </div>
          </button>


          <button disabled={isDisabledTable2} onClick={() => {
            setTextColorStatusTable2('text-[green]')
            setBgTable2('')
            if (pbTables.length > 0 && pbTables[1].status == 'FREE') {
              actualizarEstado(pbTables[1].id, "SELECTED")
              // updateStatus(pbTables.length > 0 && pbTables[0].id, 'SELECTED')
              setStatusIsSelectedTable2('bg-white rounded-[7px] px-[2px]')
            } else if (pbTables.length > 0) {
              actualizarEstado(pbTables[1].id, "FREE");
              setStatusIsSelectedTable2('');
            }
          }}>
            <div className={`${bgTable2} border-2 border-green-500 absolute top-[30%] left-[14%] w-[17%] h-[15%] rounded-[100px] ${isDisabledTable2 ?
              'cursor-not-allowed' : 'cursor-pointer'} hover:bg-white`}>
              <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='text-[14px] text-[green]'>#{pbTables.length > 0 && pbTables[1].tableNumber}</h1>
                <h1 className='font-bold'> <i className="fa-solid fa-user-group"></i> {pbTables.length > 0 && pbTables[1].seats}</h1>
                <h1 className={`text-[14px] font-bold ${statusIsSelectedTable2} ${textColorStatusTable2}`}>{pbTables.length > 0 && pbTables[1].status}</h1>
              </div>
            </div>
          </button>




          <button disabled={isDisabledTable2} onClick={() => {
            setTextColorStatusTable2('text-[green]')
            setBgTable2('')
            if (pbTables.length > 0 && pbTables[1].status == 'FREE') {
              actualizarEstado(pbTables[1].id, "SELECTED")
              // updateStatus(pbTables.length > 0 && pbTables[0].id, 'SELECTED')
              setStatusIsSelectedTable2('bg-white rounded-[7px] px-[2px]')
            } else if (pbTables.length > 0) {
              actualizarEstado(pbTables[1].id, "FREE");
              setStatusIsSelectedTable2('');
            }
          }}>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[45%] left-[11%] w-[16%] h-[16%] rounded-[100px] hover:bg-[white]'>
              <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='font-bold'>Table for 4</h1>
                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
              </div>
            </div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[59%] left-[17%] w-[15%] h-[15%] rounded-[100px] hover:bg-[white]'>
              <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='font-bold'>Table for 4</h1>
                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
              </div>
            </div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[69%] left-[6%] w-[16%] h-[15%] rounded-[100px] hover:bg-[white]'>
              <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='font-bold'>Table for 4</h1>
                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
              </div>
            </div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[69%] left-[26%] w-[17%] h-[15%] rounded-[100px] hover:bg-[white]'>
              <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='font-bold'>Table for 4</h1>
                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
              </div>
            </div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[80%] left-[16%] w-[17%] h-[13%] rounded-[100px] hover:bg-[white]'>
              <div className='w-full h-full flex flex-col justify-center items-center'>
                <h1 className='font-bold'>  Table for 4</h1>
                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
              </div>
            </div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[15%] left-[64%] w-[24%] h-[15%] rounded-[100px] hover:bg-[white]'></div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[15%] left-[23%] w-[24%] h-[15%] rounded-[100px] hover:bg-[white]'></div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[30%] left-[69%] w-[18%] h-[15%] rounded-[100px] hover:bg-[white]'></div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[45%] left-[70%] w-[17%] h-[15%] rounded-[100px] hover:bg-[white]'></div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[59%] left-[67%] w-[15%] h-[15%] rounded-[100px] hover:bg-[white]'></div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[69%] left-[77%] w-[15%] h-[15%] rounded-[100px] hover:bg-[white]'></div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute top-[69%] left-[58%] w-[15%] h-[15%] rounded-[100px] hover:bg-[white]'></div>
          </button>

          <button>
            <div className='bg-[#00000077] border-2 border-green-500 absolute bottom-[7%] left-[67%] w-[15%] h-[13%] rounded-[100px] hover:bg-[white]'></div>
          </button>
        </div>

        <button className='border border-red-500' onClick={() => {
          pbTables && pbTables.length > 0 && pbTables.map(table => {
            if (table.status == "SELECTED") {
              actualizarEstado(table.id, "RESERVED")
            }
          })
          console.log(date)
          // if (pbTables.length > 0 && pbTables[0].status == 'SELECTED') {
          //   actualizarEstado(pbTables[0].id, "RESERVED")
          //   // updateStatus(tables[0].id, 'RESERVED')
          //   // setTextColorStatusTable1('text-[red] font-bold')
          //   // setBgTable1('bg-[#00000077]')
          //   // setIsDisabledTable1(true)
          // }
          // if (pbTables.length > 0 && pbTables[1].status == 'SELECTED') {
          //   actualizarEstado(pbTables[1].id, "RESERVED")
          //   // updateStatus(tables[1].id, 'RESERVED')
          //   // setTextColorStatusTable2('text-[red] font-bold')
          //   // setBgTable2('bg-[#00000077]')
          //   // setIsDisabledTable2(true)
          // }
        }}>
          <div className=''>
            <h1 className='text-[25px] bg-yellow-500 font-extrabold p-[5px] rounded-[15px]'>CONFIRM</h1>
          </div>
        </button>
      </div>
    </div>
  )
}

export default TablePB




