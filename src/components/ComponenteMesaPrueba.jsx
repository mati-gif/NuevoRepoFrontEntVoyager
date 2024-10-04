import React, { useState } from 'react'
import "../styles/componenteMesaPrueba.css"
import { div } from 'framer-motion/client'


const ComponenteMesaPrueba = () => {

    // const tables = [
    //     { id: 1, type: 'rectangular', seats: 4 },
    //     { id: 2, type: 'circular', seats: 6 },
    //     { id: 3, type: 'rectangular', seats: 4 },
    //     { id: 4, type: 'circular', seats: 6 },
    //     { id: 5, type: 'rectangular', seats: 4 },
    //     { id: 6, type: 'circular', seats: 6 },
    //     { id: 7, type: 'rectangular', seats: 4 },
    //     { id: 8, type: 'rectangular', seats: 8 },
    //     { id: 9, type: 'circular', seats: 6 },
    //     { id: 10, type: 'rectangular', seats: 4 },
    //     { id: 11, type: 'circular', seats: 6 },
    //     { id: 12, type: 'rectangular', seats: 4 },
    // ]
    // const [selectedTable, setSelectedTable] = useState(null)

    // const handleTableClick = (tableId) => {
    //     setSelectedTable(selectedTable === tableId ? null : tableId)
    // }


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

    return (

        <div>
            <div className='flex flex-row justify-center'>
                <div className='bgTableFirstFloor border border-red-600 relative h-[95vh] w-[820px]'>
                    <button>
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
{/* 
                    <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[69%] left-[26%] w-[17%] h-[15%] rounded-[100px]'>
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='font-bold'>Table for 4</h1>
                                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
                            </div>
                        </div>
                    </button> */}

                    {/* <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[80%] left-[16%] w-[17%] h-[13%] rounded-[100px]'>
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='font-bold'>Table for 4</h1>
                                <h1 className='text-[16px] font-bold text-[red]'>Reserved</h1>
                            </div>
                        </div>
                    </button> */}

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
                    </button>

                    {/* <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[45%] left-[70%] w-[17%] h-[15%] rounded-[100px]'></div>
                    </button> */}

                    {/* <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[59%] left-[67%] w-[15%] h-[15%] rounded-[100px]'></div>
                    </button>

                    <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[69%] left-[77%] w-[15%] h-[15%] rounded-[100px]'></div>
                    </button>

                    <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute top-[69%] left-[58%] w-[15%] h-[15%] rounded-[100px]'></div>
                    </button>

                    <button>
                        <div className='bg-[#00000077] border-2 border-green-500 absolute bottom-[7%] left-[67%] w-[15%] h-[13%] rounded-[100px]'></div>
                    </button> */}

                </div>
            </div>
        </div>
    )
}

export default ComponenteMesaPrueba