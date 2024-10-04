import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'


function PopUpProductWindow() {

  const [quantity, setQuantity] = useState(1)

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  }
  return (
  
<div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <motion.div 
        className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-4xl w-full flex flex-col md:flex-row gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="w-full md:w-1/2 aspect-square bg-gray-700 rounded-lg overflow-hidden"
          variants={itemVariants}
        >
          <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl font-bold">
            <img src="https://res.cloudinary.com/doo0vem8r/image/upload/v1727725053/american1_u89gom.png" alt="" />
          </div>
        </motion.div>

        <div className="w-full md:w-1/2 space-y-6">
          <motion.input
            type="text"
            placeholder="Nombre producto"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
            variants={itemVariants}
          />

          <motion.textarea
            placeholder="Descripción del producto"
            rows={3}
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200 resize-none"
            variants={itemVariants}
          />

          <motion.div className="flex items-center space-x-4" variants={itemVariants}>
            <span className="text-white">Unidades</span>
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <Minus size={20} />
            </button>
            <span className="text-white text-xl font-bold">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              <Plus size={20} />
            </button>
          </motion.div>

          <motion.input
            type="text"
            placeholder="requerimientos del cliente"
            className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
            variants={itemVariants}
          />

          <motion.div className="flex space-x-4" variants={itemVariants}>
            <button className="w-1/2 p-3 bg-yellow-500 text-gray-900 rounded-lg font-bold hover:bg-yellow-400 transition-colors duration-200">
              Confirmar
            </button>
            <button className="w-1/2 p-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600 transition-colors duration-200">
              Cancelar
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>

  )
}

export default PopUpProductWindow