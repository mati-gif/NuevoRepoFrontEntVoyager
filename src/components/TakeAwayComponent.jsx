import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X ,Check} from 'lucide-react'

function TakeAwayComponent() {
    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00'
    ]


    const [selectedTime, setSelectedTime] = useState(null)
    const [confirmedTime, setConfirmedTime] = useState(null)

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 15
            }
        }
    }

    const handleTimeClick = (time) => {
        if (confirmedTime) return; // Prevent selection if time is already confirmed
        setSelectedTime(time === selectedTime ? null : time)
    }

    const handleConfirm = () => {
        if (selectedTime) {
            setConfirmedTime(selectedTime)
        }
    }

    const handleReset = () => {
        setSelectedTime(null)
        setConfirmedTime(null)
    }
    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-2xl w-full">
                <h2 className="text-2xl font-bold text-center text-white mb-6">
                    SELECT A TAKE AWAY TIME
                </h2>
                <motion.div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {timeSlots.map((time) => (
                        <motion.button
                            key={time}
                            className={`p-4 rounded-lg text-lg font-semibold transition-colors duration-200 relative ${confirmedTime === time
                                    ? 'bg-green-500 text-white'
                                    : selectedTime === time
                                        ? 'bg-yellow-500 text-gray-900'
                                        : 'bg-gray-700 text-white hover:bg-gray-600'
                                } ${confirmedTime && confirmedTime !== time ? 'opacity-50 cursor-not-allowed' : ''}`}
                            onClick={() => handleTimeClick(time)}
                            variants={itemVariants}
                            whileHover={confirmedTime ? {} : { scale: 1.05 }}
                            whileTap={confirmedTime ? {} : { scale: 0.95 }}
                            disabled={confirmedTime !== null}
                        >
                            {time}
                            {selectedTime === time && !confirmedTime && (
                                <motion.span
                                    className="absolute top-1 right-1 text-gray-900"
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0 }}
                                >
                                    <Check size={16} />
                                </motion.span>
                            )}
                        </motion.button>
                    ))}
                </motion.div>
                <AnimatePresence>
                    {selectedTime && !confirmedTime && (
                        <motion.div
                            className="mt-6 text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-white mb-4">
                                Hora seleccionada: <span className="font-bold text-yellow-500">{selectedTime}</span>
                            </p>
                            <motion.button
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 mr-4"
                                onClick={handleConfirm}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Confirmar horario
                            </motion.button>
                            <motion.button
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                                onClick={() => setSelectedTime(null)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Cancelar
                            </motion.button>
                        </motion.div>
                    )}
                    {confirmedTime && (
                        <motion.div
                            className="mt-6 text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <p className="text-white mb-4">
                                Hora confirmada: <span className="font-bold text-green-500">{confirmedTime}</span>
                            </p>
                            <motion.button
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                                onClick={handleReset}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Seleccionar otro horario
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}

export default TakeAwayComponent