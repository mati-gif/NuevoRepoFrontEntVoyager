
import React, { useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { use } from 'framer-motion/client'
import PopUpAlert from '../components/PopUpAlert'
import axios from 'axios'
import checkGif from "../assets/checkGif.gif"



function Register() {


    //--------------------------------------Efectos visuales
    const inputVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24,
            },
        },
        focus: { scale: 1.02, transition: { duration: 0.2 } },
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    //--------------------------------------Efectos visuales

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstCel, setFirstCel] = useState("")
    const [secondCel, setSecondCel] = useState("")

    const [showPopUpAlert, setShowPopUpAlert] = useState('hidden')
    const [messageShowPopUpAlert, setMessageShowPopUpAlert] = useState('')
    const [gif, setGif] = useState('')
    const [link, setLink] = useState('')

    const [showInputFirstName, setShowInputFirstName] = useState('hidden')
    const [showInputLastName, setShowInputLastName] = useState('hidden')
    const [showInputEmail, setShowInputEmail] = useState('hidden')
    const [showInputPassword, setShowInputPassword] = useState('hidden')
    const [showInputFirstCel, setShowInputFirstCel] = useState('hidden')
    const [showInputSecondCel, setShowInputSecondCel] = useState('hidden')

    const [colorErrorInputFirstName, setColorErrorInputFirstName] = useState('')
    const [colorErrorInputLastName, setColorErrorInputLastName] = useState('')
    const [colorErrorInputEmail, setColorErrorInputEmail] = useState('')
    const [colorErrorInputPassword, setColorErrorInputPassword] = useState('')
    const [colorErrorInputFirstCel, setColorErrorInputFirstCel] = useState('')
    const [colorErrorInputSecondCel, setColorErrorInputSecondCel] = useState('')

    const [messageErrorInput, setMessageErrorInput] = useState('')


    function validarSoloNumeros(str) {
        // Expresión regular para verificar que solo contenga números
        const regex = /^[0-9]+$/;

        let containOnlyNumber = false;
        if (regex.test(str)) {
            console.log("El string es válido y contiene solo números.");
            containOnlyNumber = true;
            return true;
        } else {
            console.error("Error: El string contiene caracteres no numéricos.");
            containOnlyNumber = false;
            return false;
        }
    }


    const handleRegister = async (event) => {
        event.preventDefault();


        let firstCelAux = ""
        let secondCelAux = ""

        if (messageErrorInput == "") {
            firstCelAux = firstCel;
            secondCelAux = secondCel;
        }

        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumbers: [firstCelAux, secondCelAux],
            password: password,

            // firstCel: firstCel,
            // secondCel: secondCel,
        };


        console.log(user);
        console.log("-----------------" + firstName);
        console.log("-----------------" + lastName);
        console.log("-----------------" + email);
        console.log("-----------------" + password);
        console.log("-----------------" + firstCel);
        console.log("-----------------" + secondCel);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                user
            );
            console.log(response.data);
            setMessageShowPopUpAlert(response.data)
            setGif(checkGif)
            setShowPopUpAlert('')
            setLink('/login')
        } catch (error) {
            setMessageErrorInput('')
            setShowInputFirstName('hidden')
            setColorErrorInputFirstName('')
            setShowInputLastName('hidden')
            setColorErrorInputLastName('')
            setShowInputEmail('hidden')
            setColorErrorInputEmail('')
            setShowInputPassword('hidden')
            setColorErrorInputPassword('')
            setShowInputFirstCel('hidden')
            setColorErrorInputFirstCel('')
            setShowInputSecondCel('hidden')
            setColorErrorInputSecondCel('')
            console.error(error.response ? error.response.data : error.message);
            let errorMessage = error.response ? error.response.data : error.message;
            if (errorMessage.includes("First name") || errorMessage.includes("first name")) {
                setMessageErrorInput(errorMessage)
                setShowInputFirstName('')
                setColorErrorInputFirstName('border-2  border-[red]')
            }
            if (errorMessage.includes("Last name") || errorMessage.includes("last name")) {
                setMessageErrorInput(errorMessage)
                setShowInputLastName('')
                setColorErrorInputLastName('border-2  border-[red]')
            }
            if (errorMessage.includes("Email") || errorMessage.includes("email")) {
                setMessageErrorInput(errorMessage)
                setShowInputEmail('')
                setColorErrorInputEmail('border-2  border-[red]')
            }
            if (errorMessage.includes("Password") || errorMessage.includes("password")) {
                setMessageErrorInput(errorMessage)
                setShowInputPassword('')
                setColorErrorInputPassword('border-2  border-[red]')
            }
            if (firstName !== "" && lastName !== "" && email !== "" && password !== "" && !errorMessage.includes('Password') && firstCel == "") {
                console.log("primer validacion firstcel")
                setMessageErrorInput('Please provide first phone number.')
                setShowInputFirstCel('')
                setColorErrorInputFirstCel('border-2  border-[red]')
            }
            if (firstName !== "" && lastName !== "" && email !== "" && password !== "" && firstCel !== "" && firstCel.length !== 10) {
                console.log("segunda validacion firstcel")
                setMessageErrorInput('Invalid phone number. It must contain 10 characters.')
                setShowInputFirstCel('')
                setColorErrorInputFirstCel('border-2  border-[red]')
            }
            if (firstCel !== "") {
                if (!validarSoloNumeros(firstCel)) {
                    console.log("Entra?")
                    console.log("tercera validacion firstcel")
                    setMessageErrorInput('Please just enter numbers.')
                    setShowInputFirstCel('')
                    setColorErrorInputFirstCel('border-2  border-[red]')
                }
            }


            if (firstName !== "" && lastName !== "" && email !== "" && password !== "" && firstCel !== "" && secondCel == "" && firstCel.length == 10 && validarSoloNumeros(firstCel)) {
                setMessageErrorInput('Please provide second phone number.')
                setShowInputSecondCel('')
                setColorErrorInputSecondCel('border-2  border-[red]')
            }
            if (firstName !== "" && lastName !== "" && email !== "" && password !== "" && firstCel !== "" && secondCel !== "" && secondCel.length !== 10) {
                setMessageErrorInput('Invalid phone number. It must contain 10 characters.')
                setShowInputSecondCel('')
                setColorErrorInputSecondCel('border-2  border-[red]')
            }
            if (secondCel != "") {
                if (!validarSoloNumeros(secondCel)) {
                    console.log("Entra?")
                    setMessageErrorInput('Please just enter numbers.')
                    setShowInputSecondCel('')
                    setColorErrorInputSecondCel('border-2  border-[red]')
                }
            }
            if (firstCel !== "" && secondCel !== "" && firstCel == secondCel) {

                console.log("Entra?")
                setMessageErrorInput('Both phone numbers can not be equals.')
                setShowInputSecondCel('')
                setColorErrorInputSecondCel('border-2  border-[red]')

            }

        }
    };


    const handleOnClickPopAupAlert = (e) => {
        setShowPopUpAlert('hidden')
    }



    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-900 ">
            <motion.div
                className="w-full max-w-2xl p-8 bg-gray-800 rounded-lg shadow-lg relative"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.h2
                    className="text-2xl font-bold text-center text-yellow-500 mb-2"
                    variants={inputVariants}
                >
                    We are waiting for you
                </motion.h2>
                <motion.h1
                    className="text-3xl font-bold text-center text-white mb-2"
                    variants={inputVariants}
                >
                    Register on VOYAGER
                </motion.h1>
                <div className='w-full flex flex-row justify-center my-[15px]'>
                <Link to="/login" >
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`text-sm text-gray-400 transition-colors duration-200 hover:text-yellow-500`}
                        >
                            ¿Have you already have an account? Sing In
                        </motion.button>
                </Link>
                </div>
                
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute  right-[1%] top-[2%] text-gray-400 hover:text-white transition-colors duration-200"

                >
                    <Link to="/">
                        <X size={24} />
                    </Link>
                </motion.button>
                <form onSubmit={handleRegister} className="space-y-4 relative z-0">

                    <div className="grid grid-cols-2 gap-4">
                        <motion.input
                            variants={inputVariants}
                            whileFocus="focus"
                            type="text"
                            placeholder="Name"
                            className={`${colorErrorInputFirstName} w-full p-3 bg-gray-700 text-white rounded transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                                setColorErrorInputFirstName('')
                                setShowInputFirstName('hidden')
                            }}
                        />
                        <p className={`${showInputFirstName} absolute z-10 top-[20%] text-[red] bg-[white] text-[17px] border-[3px] border-yellow-500 inline-block rounded-[10px] px-[8px] mt-[5px]`}>
                            &#10071; {messageErrorInput}
                        </p>
                        <motion.input
                            variants={inputVariants}
                            whileFocus="focus"
                            type="text"
                            placeholder="Last Name"
                            className={`${colorErrorInputLastName} w-full p-3 bg-gray-700 text-white rounded transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                                setColorErrorInputLastName('')
                                setShowInputLastName('hidden')
                            }}
                        />
                        <p className={`${showInputLastName} absolute z-10 top-[20%] left-[51%] text-[red] bg-[white] text-[17px] border-[3px] border-yellow-500 inline-block rounded-[10px] px-[8px] mt-[5px]`}>
                            &#10071; {messageErrorInput}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 ">
                        <motion.input
                            variants={inputVariants}
                            whileFocus="focus"
                            type="text"
                            placeholder="Email"
                            className={`${colorErrorInputEmail} w-full p-3 bg-gray-700 text-white rounded transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setColorErrorInputEmail('')
                                setShowInputEmail('hidden')
                            }}
                        />
                        <p className={`${showInputEmail} absolute z-10 top-[46%] text-[red] bg-[white] text-[17px] border-[3px] border-yellow-500 inline-block rounded-[10px] px-[8px] mt-[5px]`}>
                            &#10071; {messageErrorInput}
                        </p>
                        <motion.input
                            variants={inputVariants}
                            whileFocus="focus"
                            type="password"
                            placeholder="Password"
                            className={`${colorErrorInputPassword} w-full p-3 bg-gray-700 text-white rounded transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setColorErrorInputPassword('')
                                setShowInputPassword('hidden')
                            }}
                        />
                        <p className={`${showInputPassword} absolute z-10 top-[46%] left-[51%] text-[red] bg-[white] text-[17px] border-[3px] border-yellow-500 inline-block rounded-[10px] px-[8px] mt-[5px]`}>
                            &#10071; {messageErrorInput}
                        </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <motion.input
                            variants={inputVariants}
                            whileFocus="focus"
                            type="cel"
                            placeholder="Cel "
                            className={`${colorErrorInputFirstCel} w-full p-3 bg-gray-700 text-white rounded transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                            value={firstCel}
                            onChange={(e) => {
                                setFirstCel(e.target.value)
                                setColorErrorInputFirstCel('')
                                setShowInputFirstCel('hidden')
                            }}
                        />
                        <p className={`${showInputFirstCel} absolute z-10 top-[73%] text-[red] bg-[white] text-[17px] border-[3px] border-yellow-500 inline-block rounded-[10px] px-[8px] mt-[5px]`}>
                            &#10071; {messageErrorInput}
                        </p>
                        <motion.input
                            variants={inputVariants}
                            whileFocus="focus"
                            type="cel"
                            placeholder="Extra Cel"
                            className={`${colorErrorInputSecondCel} w-full p-3 bg-gray-700 text-white rounded transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                            value={secondCel}
                            onChange={(e) => {
                                setSecondCel(e.target.value)
                                setColorErrorInputSecondCel('')
                                setShowInputSecondCel('hidden')

                            }}
                        />
                        <p className={`${showInputSecondCel} absolute z-10 top-[73%] left-[51%] text-[red] bg-[white] text-[17px] border-[3px] border-yellow-500 inline-block rounded-[10px] px-[8px] mt-[5px]`}>
                            &#10071; {messageErrorInput}
                        </p>
                    </div>
                    <motion.button
                        variants={inputVariants}
                        className="relative w-full p-3 bg-gray-700 text-yellow-500 rounded font-bold overflow-hidden group"
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            Register
                            <ArrowRight size={20} className="ml-2" />
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-0 bg-yellow-500 transition-all duration-300 group-hover:h-full"></span>
                        <span className="absolute bottom-0 left-0 w-full h-0 bg-yellow-400 transition-all duration-500 delay-100 group-hover:h-full"></span>
                    </motion.button>
                    <div className={`${showPopUpAlert}`}>
                <PopUpAlert gif={gif} message={messageShowPopUpAlert} link={link} handleOnClick={handleOnClickPopAupAlert} />
            </div>
                </form>
            </motion.div>

            {/* showPopUpAlert   */}
            

        </div>
    );
}

export default Register;
