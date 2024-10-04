import React from 'react'

function MapComponent() {
    return (
        <div className='border-green-500 border-4 '>MapComponent
            <h2 className='text-4xl text-[#ffd700] text-center mb-5'>Where to find us?</h2>
            <div className='border-4 border-red-700 w-[80%] flex justify-between m-auto'>
                <div className='border-4 border-yellow-500  '>
                    <h2 className='text-[#ffd700] text-2xl text-center mb-4'>Rosario</h2>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.5831555371383!2d-60.65404892433071!3d-32.93560987359768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab37fce726cb%3A0x5198195e500bd0e0!2sRock%26Feller&#39;s%20Bv.%20Oro%C3%B1o!5e0!3m2!1ses!2sar!4v1727750572802!5m2!1ses!2sar" className='w-[400px] h-[300px] border-none' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>

                <div className='border-4 border-purple-500'>
                    <h2 className='text-[#ffd700] text-2xl text-center mb-4'>Buenos Aires</h2>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3290.272426456321!2d-58.87497972495257!3d-34.445231849144456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bc9c5706131183%3A0xd87c3e9a154a7f57!2sRock%26Feller&#39;s%20Pilar!5e0!3m2!1ses!2sar!4v1727750871769!5m2!1ses!2sar"  className='w-[400px] h-[300px] border-none' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
        </div>



    )
}

export default MapComponent