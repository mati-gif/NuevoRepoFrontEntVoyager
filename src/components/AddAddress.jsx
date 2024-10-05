import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import Swal from 'sweetalert2'
import { isRejectedWithValue } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { createAddress, loadUser } from '../redux/actions/authAction'



function AddAddress() {
    const dispatch = useDispatch(); // Obtener dispatch
    const user = useSelector((store) => store.auth.user)
    // const isLoggedIn = useSelector((store)=> store.authReducer)
    const status = useSelector((store) => store.auth.status)
    console.log(user);




    useEffect(() => {
        // const token = localStorage.getItem("token");

        if (status != "success") {
            dispatch(loadUser());  // Cargar el usuario si hay un token presente
        }
    }, [dispatch]);

    const [formData, setFormData] = useState({
        zipCode: '',
        nameStreet: '',
        streetNumber: 0,
        betweenStreets: '',
        typeHome: '',
        floorNumber: null,
        aparmentNumber: null,
        // extraDetails: ''
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



            const resultAction = await dispatch(createAddress(formData)).unwrap(); // Despachar la acción

            console.log(resultAction);
            
            Swal.fire({
                icon: 'success',
                title: 'Address created successfully',
                text: 'The address has been created successfully.',
            });


            setFormData({
                zipCode: '',
                nameStreet: '',
                streetNumber: '',
                betweenStreets: '',
                typeHome: '',
                floorNumber: '',
                aparmentNumber: '',
                extraDetails: ''
            });
        } catch (error) {
            // const errorMessage = error.response && error.response.data
            //     ? error.response.data.message || error.response.data
            //     : 'Ocurrió un error al procesar la transacción';

            console.log("error del back", error);

            // let errorMessage = error.response.data

            Swal.fire({
                icon: 'error',
                title: 'Error creating address',
                text: "Error creating address",
            });

        }
    };






    // Acción asincrónica para crear una transacción















    const handleTipoViviendaChange = (e) => {
        const value = e.target.value
        setFormData(prevData => ({
            ...prevData,
            typeHome: value
        }))
        setShowApartmentFields(value === 'APARTMENT')
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
        <div style={{
            backgroundImage: "url('../assets/black-background.jpg')",
            backgroundSize: 'cover',
        }} className="border-4 border-red-500 min-h-screen flex items-center justify-center mt-[5%]  p-4    flex-col">
            <motion.div
                className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-2xl w-full "
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <form className="space-y-4 border-4 border-green-500  ">
                    <h1 className='text-white text-[24px] text-center'>Enter the new address </h1>

                    <motion.input
                        type="text"
                        name="zipCode"
                        placeholder="Zip code"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                        variants={inputVariants}
                    />
                    <div className="flex space-x-4">
                        <motion.input
                            type="text"
                            name="nameStreet"
                            placeholder="Name of street"
                            value={formData.nameStreet}
                            onChange={handleInputChange}
                            className="w-1/2 p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                            variants={inputVariants}
                        />
                        <motion.input
                            type="text"
                            name="streetNumber"
                            placeholder="Number of street"
                            value={(formData.streetNumber)}
                            onChange={handleInputChange}
                            className="w-1/2 p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                            variants={inputVariants}
                        />
                    </div>
                    <motion.input
                        type="text"
                        name="betweenStreets"
                        placeholder="Between Street"
                        value={formData.betweenStreets}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                        variants={inputVariants}
                    />
                    <motion.select
                        name="typeHome"
                        value={formData.typeHome}
                        onChange={handleTipoViviendaChange}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                        variants={inputVariants}
                    >
                        <option value="">SELECT HOUSE-DEPARTAMENT</option>
                        <option value="HOUSE">HOUSE</option>
                        <option value="APARTMENT">DEPARTAMENT</option>
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
                                    name="floorNumber"
                                    placeholder="Numero depiso (String)"
                                    value={formData.floorNumber}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                                    variants={inputVariants}
                                />
                                <motion.input
                                    type="number"
                                    name="aparmentNumber"
                                    placeholder="Numero de departamento (int)"
                                    value={formData.aparmentNumber}
                                    onChange={handleInputChange}
                                    className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                                    variants={inputVariants}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {/* <motion.textarea
                        name="extraDetails"
                        placeholder="Extra Details"
                        value={formData.extraDetails}
                        onChange={handleInputChange}
                        className="w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200 resize-none"
                        rows="3"
                        variants={inputVariants}
                    /> */}
                    <motion.button
                        type="submit"
                        className="relative w-full p-3 bg-gray-700 text-yellow-500 rounded-lg font-bold text-lg overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}

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