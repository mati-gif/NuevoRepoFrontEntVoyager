import React, { useEffect, useState } from 'react'
import "../styles/componenteMesaPrueba.css"
import { div } from 'framer-motion/client'
import axios from 'axios';


const ComponenteMesaPrueba = () => {


    // Estado para almacenar qué mesas están seleccionadas
    const [selectedTables, setSelectedTables] = useState([]);

    // Función para manejar la selección/deselección de mesas
    const handleTableClick = (tableId) => {
        if (selectedTables.includes(tableId)) {
            // Si la mesa ya está seleccionada, deseleccionarla
            setSelectedTables(selectedTables.filter(id => id !== tableId));
        } else {
            // Si no está seleccionada, agregarla
            setSelectedTables([...selectedTables, tableId]);
        }
    };

    const [allTables, setAllTables] = useState([])
    const [firstFloorTables, setFirstFloorTables] = useState([])


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
            console.log(token)
        }

    }, [])
    //---------------------------------------------------------------------PETICION PARA TRAER TODAS LAS MESAS---------------------------

    //-------------------------------------------------------------FILTRA LAS MESAS Y LAS RESERVAS DE LA PETICION POR EL SECTOR "GROUND_FLOOR"-------------------------  
  useEffect(() => {
    if (allTables.length > 0) {
      const filteredTables = allTables.filter((firstFloorTable) => firstFloorTable.sector === "FIRST_FLOOR");
      setFirstFloorTables(filteredTables);
      console.log(filteredTables);  // Muestra las tablas filtradas
    }
  }, [allTables]);  // Ejecuta el filtro cuando cambie allTables
  //-------------------------------------------------------------FILTRA LAS MESAS DE LA PETICION POR EL SECTOR "GROUND_FLOOR"-------------------------


  console.log(firstFloorTables)



    return (

        <div>
            <div className='flex flex-row justify-center'>
                <div className='bgTableFirstFloor border border-red-600 relative h-[95vh] w-[820px]'>
                    { 
                    /* <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[40%] left-[41%] w-[23%] h-[20%] rounded-[100px] hover:bg-white'>
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='font-bold'>Table for 6</h1>
                                <h1 className='text-[14px] text-[green]'>Available</h1>
                            </div>
                        </div>
                    </button>
                    <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[3%] left-[74%] w-[15%] h-[20%] rounded-[100px] hover:bg-[white]'>
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='font-bold'>Table for 2</h1>
                                <h1 className='text-[20px] font-bold text-[red]'>Reserved</h1>
                            </div>
                        </div>
                    </button>

                    <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[32%] left-[16%] w-[20%] h-[22%] rounded-[100px]'>
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='font-bold'>Table for 4</h1>
                                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
                            </div>
                        </div>
                    </button>

                    <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[67%] left-[17%] w-[26%] h-[20%] rounded-[100px]'>
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='font-bold'>Table for 6</h1>
                                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
                            </div>
                        </div>
                    </button>

                    <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[65%] left-[64%] w-[30%] h-[23%] rounded-[100px]'>
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='font-bold'>Table for 8</h1>
                                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
                            </div>
                        </div>
                    </button>

                    <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[10%] left-[45%] w-[24%] h-[18%] rounded-[100px]'>
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='font-bold'>Table for 5</h1>
                                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
                            </div>
                        </div>
                    </button>

                    <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[33%] left-[67%] w-[27%] h-[25%] rounded-[100px]'>
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='font-bold'>Table for 6</h1>
                                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
                            </div>
                        </div>
                    </button> */}



                    {firstFloorTables.map((table, index) => {
                        // Estilos basados en el Ã­ndice
                        let customClass = '';
                        switch (index) {
                            case 0:
                                //
                                customClass = 'border-2 border-green-500 absolute top-[65%] left-[64%] w-[30%] h-[23%] rounded-[100px] hover:bg-[white]';
                                break;
                            case 1:
                                // 
                                customClass = 'border-2 border-green-500 absolute top-[67%] left-[17%] w-[26%] h-[20%] rounded-[100px] hover:bg-[white]'; // 17
                                break;
                            case 2:
                                // 
                                customClass = 'border-2 border-green-500 absolute top-[33%] left-[67%] w-[27%] h-[25%] rounded-[100px] hover:bg-[white]';
                                break;
                            case 3:
                                customClass = "border-2 border-green-500 absolute top-[40%] left-[41%] w-[23%] h-[20%] rounded-[100px] hover:bg-white" ;
                                break;
                            case 4:
                                // 
                                customClass = 'border-2 border-green-500 absolute top-[32%] left-[16%] w-[20%] h-[22%] rounded-[100px] hover:bg-[white]';
                                break;
                            case 5:
                                // 
                                customClass = "border-2 border-green-500 absolute top-[3%] left-[74%] w-[15%] h-[20%] rounded-[100px] hover:bg-[white]"; //21
                                break;
                            case 6:
                                // 
                                customClass =  'border-2 border-green-500 absolute top-[10%] left-[45%] w-[24%] h-[18%] rounded-[100px] hover:bg-[white]'; // 22
                                break;
                            default:
                                customClass = 'bg-gray-200'; // Estilo por defecto
                                break;
                        }

                        return (
                            <button
                                key={table.id}
                                className={`border-2 border-red-500 ${customClass}`}
                                onClick={() => updateStatus(table.id, table.status === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE')}
                            >
                                <div className='flex flex-col items-center justify-center h-full'>
                                    <p>{table.id}</p>
                                    <p>{table.capacity}</p>
                                </div>
                            </button>
                        );
                    })}


                </div>
            </div>
        </div>
    )
}

export default ComponenteMesaPrueba