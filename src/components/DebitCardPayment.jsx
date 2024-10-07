import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Lock, ChevronDown } from 'lucide-react'
import axios from 'axios'

const DebitCardPayment = () => {
    const [cardNumber, setCardNumber] = useState('')
    const [cardHolder, setCardHolder] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [cvv, setCvv] = useState('')
    const [cardType, setCardType] = useState('silver')
    const [isCardTypeOpen, setIsCardTypeOpen] = useState(false)
    const [isFlipped, setIsFlipped] = useState(false)

    const producstSelected = JSON.parse(localStorage.getItem("product"));
    console.log(producstSelected);
    
    const ids = producstSelected.map((product) => product.idProduct);
    const quantity = producstSelected.map((product) => product.quantity);
    console.log(ids);
    console.log(quantity);

    const orderType = localStorage.getItem("orderType")
    console.log(orderType);
    
    const address = localStorage.getItem("address")
    console.log(address);
    

    
    
  


    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
        const matches = v.match(/\d{4,16}/g)
        const match = (matches && matches[0]) || ''
        const parts = []

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4))
        }

        if (parts.length) {
            return parts.join(' ')
        } else {
            return value
        }
    }

    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value)
        setCardNumber(formattedValue)
    }

    const handleExpiryDateChange = (e) => {
        const value = e.target.value.replace(/\D/g, '')
        if (value.length <= 4) {
            const formattedValue = value.replace(/(\d{2})(\d{2})/, '$1/$2')
            setExpiryDate(formattedValue)
        }
    }

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, '')
        if (value.length <= 3) {
            setCvv(value)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = localStorage.getItem('token');
        // Crear el objeto dataPost
        const dataPost = {
            productIds: ids,
            quantities: quantity,
            addressId: orderType === "DELIVERY" ? Number(address) : null, // Solo asigna addressId si es DELIVERY
            orderType: orderType, // Asigna el orderType seleccionado
        };
        console.log(dataPost);
        
    
    
        // Realizar la petición POST con axios
        try {
            const response = await axios.post("http://localhost:8080/api/orders/create", dataPost, {
                headers: {
                    Authorization: `Bearer ${token}`, // Uso correcto de las comillas invertidas
                },
            });
            console.log("Response from server:", response.data); // Muestra la respuesta del servidor
        } catch (error) {
            console.error("Error submitting order:", error);
        }   
    

    
    };
    

    const cardColors = {
        gold: 'bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500',
        silver: 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500',
        platinum: 'bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300'
    }

    const cardTypeOptions = [
        { value: 'silver', label: 'Silver' },
        { value: 'gold', label: 'Gold' },
        { value: 'platinum', label: 'Platinum' }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="border-4 border-blue-600  bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-8 max-w-4xl w-full"
            >
                <h2 className="text-4xl font-extrabold mb-6 text-center text-white">Debit Card Payment</h2>
                <div className="flex flex-col border-4 border-red-600 md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <div className="perspective-1000 w-full h-56">
                            <motion.div
                                className="w-full h-full relative"
                                initial={false}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6 }}
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <div
                                    className={`absolute w-full h-full ${cardColors[cardType]} rounded-2xl shadow-lg p-6 text-white overflow-hidden backface-hidden`}
                                    style={{ backfaceVisibility: 'hidden' }}
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start">
                                            <CreditCard size={32} />
                                            <img src="/placeholder.svg?height=30&width=50" alt="Bank Logo" className="h-8" />
                                        </div>
                                        <div className="mt-8">
                                            <div className="text-2xl mb-2 font-mono">{cardNumber || '•••• •••• •••• ••••'}</div>
                                            <div className="flex justify-between">
                                                <div>
                                                    <div className="text-xs opacity-75">Card Holder</div>
                                                    <div className="font-semibold">{cardHolder || 'YOUR NAME'}</div>
                                                </div>
                                                <div>
                                                    <div className="text-xs opacity-75">Expires</div>
                                                    <div className="font-semibold">{expiryDate || 'MM/YY'}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`absolute w-full h-full ${cardColors[cardType]} rounded-2xl shadow-lg p-6 text-white overflow-hidden backface-hidden`}
                                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                    <div className="relative z-10">
                                        <div className="w-full h-12 bg-black mt-4"></div>
                                        <div className="mt-8 px-6">
                                            <div className="bg-white text-black text-right p-2 font-mono">
                                                {cvv || '•••'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <motion.button
                                    type="button"
                                    className="w-full text-left bg-white bg-opacity-20 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    onClick={() => setIsCardTypeOpen(!isCardTypeOpen)}
                                >
                                    <span>{cardTypeOptions.find(option => option.value === cardType)?.label}</span>
                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2" />
                                </motion.button>
                                <AnimatePresence>
                                    {isCardTypeOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-20"
                                        >
                                            {cardTypeOptions.map((option) => (
                                                <motion.button
                                                    key={option.value}
                                                    type="button"
                                                    className="w-full text-left px-4 py-2 hover:bg-purple-100 focus:outline-none"
                                                    onClick={() => {
                                                        setCardType(option.value)
                                                        setIsCardTypeOpen(false)
                                                    }}
                                                    whileHover={{ backgroundColor: 'rgba(167, 139, 250, 0.1)' }}
                                                >
                                                    {option.label}
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <motion.input
                                type="text"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                className="w-full bg-white bg-opacity-20 text-white placeholder-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Card Number"
                                maxLength="19"
                                required
                                whileFocus={{ scale: 1.02 }}
                            />
                            <motion.input
                                type="text"
                                value={cardHolder}
                                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                                className="w-full bg-white bg-opacity-20 text-white placeholder-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Card Holder Name"
                                required
                                whileFocus={{ scale: 1.02 }}
                            />


                            <div className="flex space-x-4">
                                <motion.input
                                    type="text"
                                    value={expiryDate}
                                    onChange={handleExpiryDateChange}
                                    className="w-16 flex-1 bg-white bg-opacity-20 text-white placeholder-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    required
                                    whileFocus={{ scale: 1.02 }}
                                />
                                <motion.input
                                    type="text"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    onFocus={() => setIsFlipped(true)}
                                    onBlur={() => setIsFlipped(false)}
                                    className="w-16 flex-1 bg-white bg-opacity-20 text-white placeholder-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder="CVV"
                                    maxLength="3"
                                    required
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </div>
                            <motion.button
                                onClick={handleSubmit}
                                type="submit"
                                className="w-full flex justify-center items-center py-3 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-900"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Lock className="mr-2" size={20} />
                                Pay Now
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default DebitCardPayment