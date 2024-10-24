import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'

function AddAddress() {
    const [formData, setFormData] = useState({
        nombre: '',
        tel: '',
        telAlternativo: '',
        codigoPostal: '',
        nombreCalle: '',
        numeroCalle: '',
        entreCalles: '',
        tipoVivienda: '',
        numeroPiso: '',
        numeroDepto: '',
        detallesAdicionales: ''
    })

    const [showApartmentFields, setShowApartmentFields] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     console.log('Form submitted:', formData)
    //     // Here you would typically send the data to your backend
    // }


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);

        try {
            // Realiza una petición POST para crear la nueva dirección
            const response = await axios.post('http://localhost:8080/api/address/create', {
                firstName: formData.nombre, // Asegúrate de que estos nombres coincidan con lo que espera tu API
                phoneNumbers: [formData.tel, formData.telAlternativo],
                address: [{
                    nameStreet: formData.nombreCalle,
                    streetNumber: formData.numeroCalle,
                    zipCode: formData.codigoPostal,
                    betweenStreets: formData.entreCalles,
                    typeHome: formData.tipoVivienda,
                    floorNumber: formData.numeroPiso || null,
                    apartmentNumber: formData.numeroDepto || null,
                    extraDetails: formData.detallesAdicionales || ''
                }]
            });

            console.log('Address created successfully:', response.data);
            // Aquí podrías hacer algo después de la creación exitosa, como redirigir o mostrar una confirmación
        } catch (error) {
            console.error('Error creating address:', error);
        }
    };

    const handleTipoViviendaChange = (e) => {
        const value = e.target.value
        setFormData(prevData => ({
            ...prevData,
            tipoVivienda: value
        }))
        setShowApartmentFields(value === 'DEPARTAMENTO')
    }

    const inputVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 30
            }
        }
    }

    const handleSubmitForm = () => {
        console.log("funciona");

    }
    return (
        <div className="min-h-screen flex items-center justify-end mt-[5%] p-4  bground  flex-col">
            <motion.div
                className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-2xl w-full "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <form onSubmit={handleSubmit} className="space-y-4 ">
                    <h1 className='text-white text-[24px] text-center'>Enter the new address </h1>

                    <motion.input
                        type="text"
                        name="zipCode"
                        placeholder="Zip code"
                        value={formData.codigoPostal}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                        variants={inputVariants}
                    />
                    <div className="flex space-x-4">
                        <motion.input
                            type="text"
                            name="nameStreet"
                            placeholder="Name of street"
                            value={formData.nombreCalle}
                            onChange={handleInputChange}
                            className="w-1/2 p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                            variants={inputVariants}
                        />
                        <motion.input
                            type="text"
                            name="numberStreet"
                            placeholder="Number of street"
                            value={formData.numeroCalle}
                            onChange={handleInputChange}
                            className="w-1/2 p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                            variants={inputVariants}
                        />
                    </div>
                    <motion.input
                        type="text"
                        name="betweenStreet"
                        placeholder="Between Street"
                        value={formData.entreCalles}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                        variants={inputVariants}
                    />
                    <motion.select
                        name="tipoVivienda"
                        value={formData.tipoVivienda}
                        onChange={handleTipoViviendaChange}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                        variants={inputVariants}
                    >
                        <option value="">SELECT HOUSE-DEPARTAMENT</option>
                        <option value="CASA">HOUSE</option>
                        <option value="DEPARTAMENTO">DEPARTAMENT</option>
                    </motion.select>
                    <AnimatePresence>
                        {showApartmentFields && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-4"
                            >
                                <motion.input
                                    type="text"
                                    name="numeroPiso"
                                    placeholder="Numero depiso (String)"
                                    value={formData.numeroPiso}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                                    variants={inputVariants}
                                />
                                <motion.input
                                    type="number"
                                    name="numeroDepto"
                                    placeholder="Numero de departamento (int)"
                                    value={formData.numeroDepto}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                                    variants={inputVariants}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <motion.textarea
                        name="extraDetails"
                        placeholder="Extra Details"
                        value={formData.detallesAdicionales}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200 resize-none"
                        rows="3"
                        variants={inputVariants}
                    />
                    <motion.button
                        type="submit"
                        className="relative w-full p-3 bg-gray-700 text-yellow-500 rounded-lg font-bold text-lg overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        
                    >
                        <span className="relative z-10">CONFIRM</span>
                        <span className="absolute left-0 top-0 h-full w-0 bg-yellow-500 transition-all duration-300 group-hover:w-full"></span>
                    </motion.button>
                </form>
            </motion.div>
            <style jsx>{`
        .group:hover span:first-child {
          color: #1F2937;
        }
      `}</style>
        </div>
    )
}

export default AddAddress