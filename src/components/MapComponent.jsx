import React from 'react'

function MapComponent() {
    return (
        <div className='   '>
            <h2 className='text-4xl text-[#ffd700] text-center mb-5 font-extrabold'>Where to find us?</h2>
            <div className=' w-[80%] flex flex-col justify-between  m-auto  md:flex-row'>
                <div className='  flex flex-col     '>
                    <h2 className='text-[#ffd700] text-2xl text-center mb-4 font-bold'>Rosario</h2>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.5831555371383!2d-60.65404892433071!3d-32.93560987359768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab37fce726cb%3A0x5198195e500bd0e0!2sRock%26Feller&#39;s%20Bv.%20Oro%C3%B1o!5e0!3m2!1ses!2sar!4v1727750572802!5m2!1ses!2sar" className='w-[100%] h-[300px] border-none md:flex md:flex-col md:w-[400px]' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div className=' flex flex-col '>
                    <h2 className='text-[#ffd700] text-2xl text-center mb-4 font-bold'>Buenos Aires</h2>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.272426456321!2d-58.87497972495257!3d-34.445231849144456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9c5706131183%3A0xd87c3e9a154a7f57!2sRock%26Feller&#39;s%20Pilar!5e0!3m2!1ses!2sar!4v1727750871769!5m2!1ses!2sar"  className='w-[100%] h-[300px] border-none md:flex md:flex-col md:w-[400px]' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>
    )
}

export default MapComponent