
import React, { useState } from 'react'
import './TablePB.css'

function TablePB() {

    const [tables, setTables] = useState ([
        {id:1,number: 1, capacity: 2, status:'AVAILABLE'},
        {id:2, number: 2, capacity: 4, status:'AVAILABLE'}
    ])

    const updateStatus = (id, newStatus) => {
        const updatedTables = tables.map(table => 
          table.id === id ? { ...table, status: newStatus } : table
        );
        setTables(updatedTables);
      };

      console.log(tables[0]. id)
      console.log(tables[1]. id)


    const [textColorStatusTable1, setTextColorStatusTable1] = useState('text-[green]')
    const [bgTable1, setBgTable1] = useState('')
    const [statusIsSelectedTable1, setStatusIsSelectedTable1] = useState('')
    const [isDisabledTable1, setIsDisabledTable1] = useState(false)

    const [textColorStatusTable2, setTextColorStatusTable2] = useState('text-[green]')
    const [bgTable2, setBgTable2] = useState('')
    const [statusIsSelectedTable2, setStatusIsSelectedTable2] = useState('')
    const [isDisabledTable2, setIsDisabledTable2] = useState(false)
 
    //  bg-[#00000077]
    return (
        <div>
            <div className='flex flex-row justify-center'>
                <div className='bgTablePB border border-red-600 relative h-[95vh] w-[820px]'>


                    <button disabled={isDisabledTable1} onClick={() => {
                        setTextColorStatusTable1('text-[green]')
                        setBgTable1('')
                        if (tables[0].status == 'AVAILABLE') {
                            updateStatus(tables[0].id, 'SELECTED')
                            setStatusIsSelectedTable1('bg-white rounded-[7px] px-[2px]')
                        } else {
                            updateStatus(tables[0].id, 'AVAILABLE')
                            setStatusIsSelectedTable1('')
                        }
                    }}>
                        <div className={`${bgTable1} border-2 border-green-500 absolute top-[6%] left-[7%] w-[13%] h-[14%] rounded-[100px] ${isDisabledTable1 ? 
                            'cursor-not-allowed' : 'cursor-pointer'} hover:bg-white`}>
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='text-[14px] text-[green]'>#{tables[0].number}</h1>
                                <h1 className='font-bold'> <i className="fa-solid fa-user-group"></i> {tables[0].capacity}</h1>
                                <h1 className={`text-[14px] font-bold ${statusIsSelectedTable1} ${textColorStatusTable1}`}>{tables[0].status}</h1>
                            </div>
                        </div>
                    </button>


                    <button disabled={isDisabledTable2} onClick={() => {
                        setTextColorStatusTable2('text-[green]')
                        setBgTable2('')
                        if (tables[1].status == 'AVAILABLE') {
                            updateStatus(tables[1].id, 'SELECTED')
                            setStatusIsSelectedTable2('bg-white rounded-[7px] px-[2px]')
                        } else {
                            updateStatus(tables[1].id, 'AVAILABLE')
                            setStatusIsSelectedTable2('')
                        }
                    }}>
                        <div className={`${bgTable2} border-2 border-green-500 absolute top-[30%] left-[14%] w-[17%] h-[15%] rounded-[100px] ${isDisabledTable2 ?
                            'cursor-not-allowed' : 'cursor-pointer'} hover:bg-white`}>
                            <div className='w-full h-full flex flex-col justify-center items-center'>
                                <h1 className='text-[14px] text-[green]'>#{tables[1].number}</h1>
                                <h1 className='font-bold'> <i className="fa-solid fa-user-group"></i> {tables[1].capacity}</h1>
                                <h1 className={`text-[14px] font-bold ${statusIsSelectedTable2} ${textColorStatusTable2}`}>{tables[1].status}</h1>
                            </div>
                        </div>
                    </button>




                    {/* <button>
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
                    </button> */}
                </div>

                <button className='border border-red-500' onClick={() => {
                    if (tables[0].status == 'SELECTED') {
                        
                        updateStatus(tables[0].id, 'RESERVED')
                        setTextColorStatusTable1('text-[red] font-bold')
                        setBgTable1('bg-[#00000077]')
                        setIsDisabledTable1(true)
                    }
                    if (tables[1].status == 'SELECTED') {
                        
                        updateStatus(tables[1].id, 'RESERVED')
                        setTextColorStatusTable2('text-[red] font-bold')
                        setBgTable2('bg-[#00000077]')
                        setIsDisabledTable2(true)
                    }
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


