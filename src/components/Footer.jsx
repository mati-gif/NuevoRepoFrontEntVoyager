import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
          <footer className="bg-[#0F1D15] text-white p-4 flex">
      <p className='w-[50%] text-center'>© 2024 - All rights reserved.</p>
      <div className="w-[50%] flex justify-center space-x-4">
      <Link to="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-instagram text-4xl"></i>
      </Link>
      <Link to="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-facebook text-4xl"></i>
      </Link>
      <Link to="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
        <i className="fa-brands fa-whatsapp text-4xl"></i>
      </Link>
    </div>
    </footer>
    </div>
  )
}

export default Footer
