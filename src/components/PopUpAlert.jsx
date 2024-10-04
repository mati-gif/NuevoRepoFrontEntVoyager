import React from 'react'
import "./PopUpAlert.css"
import { Link } from 'react-router-dom'


function PopUpAlert({gif, message, handleOnClick, link}) {
  return (
    <div className='w-full h-full absolute top-0 left-0 '>
    <div className='w-full h-full absolute flex flex-row justify-center items-center z-30'>
     <div id='conteinerAll' className='w-[500px] h-auto rounded-[30px] flex flex-col bg-[#ffffff] justify-around'>
        <div className='w-full flex flex-row justify-center'>
            <div className=''>
                <img src={gif} alt="" className='w-[180px] h-auto'/>
            </div>
        </div>
        <div>
            <p className='text-center text-[25px] font-bold px-[15px]'>{message}</p>
        </div>
        <div className='w-full flex flex-row justify-center my-[25px]'>
            <Link to={link}>
             <button onClick={handleOnClick} id='buttomAccept'>
                <p className='buttonPopUp p-[10px] text-[20px] text-black font-bold bg-yellow-500'>ACCEPT</p>
             </button>
            </Link>
        </div>
     </div>
    </div>
</div>
  )
}

export default PopUpAlert