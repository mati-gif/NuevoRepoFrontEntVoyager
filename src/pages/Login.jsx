import React, { useEffect } from 'react'
import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { em } from 'framer-motion/client'
import PopUpAlert from '../components/PopUpAlert'
import Swal from 'sweetalert2'

import checkGif from "../assets/checkGif.gif"

import { loadUser } from '../redux/actions/authAction'


function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const [showPopUpAlert, setShowPopUpAlert] = useState("hidden");
    const [messageShowPopUpAlert, setMessageShowPopUpAlert] = useState("");
    const [gif, setGif] = useState("");
    const [link, setLink] = useState("");

    const [showInputErrorEmail, setShowInputErrorEmail] = useState("hidden");
    const [showInputPassword, setShowInputPassword] = useState("hidden");

    const [colorErrorInputEmail, setColorErrorInputEmail] = useState("");
    const [colorErrorInputPassword, setColorErrorInputPassword] = useState("");

    const [messageErrorInput, setMessageErrorInput] = useState("");


    const [activeTab, setActiveTab] = useState('login')

    const navigate = useNavigate();


    const status = useSelector((state) => state.authReducer.status);

    console.log(status);


    const inputVariants = {
        focus: { scale: 1.02, transition: { duration: 0.2 } },
    }

    const buttonVariants = {
        hover: { scale: 1.05, transition: { duration: 0.2 } },
        tap: { scale: 0.95, transition: { duration: 0.2 } },
    }


    // Manejar el envío del formulario
    const handleLogin = async (event) => {
        event.preventDefault(); // Evita que la página se recargue

        const user = {
            email: email,
            password: password,
        };

        console.log(user);

        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/login",
                user
            );
            console.log(response);

            // Si el login es exitoso, guarda la respuesta (token, etc.)
            // dispatch(loginAction(response.data)); // Maneja el login con Redux
            console.log(response.data);


            const token = response.data

            if (token) {
                localStorage.setItem("token", token)
                navigate('/')
                dispatch(loadUser())
            }

            // Swal.fire({
            //     title: 'Login Successful!',
            //     text: 'You have been logged in successfully.',
            //     icon: 'success',
            //     confirmButtonText: 'OK',
            // });

            // navigate('/')


            setMessageShowPopUpAlert(
                <>
                    <span className="font-extrabold">
                        LOGIN SUCCESSFUL <br /> Welcome{" "}<p className="text-[#26a026] font-extrabold inline-block">{response.data[1]}</p>
                    </span>
                </>
            );
            setGif(checkGif);
            setShowPopUpAlert("");
            setLink("/");

        } catch (error) {
            console.error(error.response ? error.response.data : error.message);
            let erroMessage = error.response ? error.response.data : error.message;
            setMessageErrorInput('')
            setShowInputErrorEmail('hidden')
            setShowInputPassword('hidden')
            setColorErrorInputEmail('')
            setColorErrorInputPassword('')
            if (erroMessage.includes("Email or Password invalid")) {
                console.log("Entra?")
                setMessageShowPopUpAlert(
                    <>
                        <p className="text-[#9e1919] font-extrabold inline-block">
                            {erroMessage}
                        </p>{" "}
                    </>
                );
                // setGif(xGif);
                setShowPopUpAlert("");
                setLink("");
            }
            if (erroMessage.includes("Email can not be empty")) {
                setMessageErrorInput(erroMessage)
                setShowInputErrorEmail('')
                setColorErrorInputEmail('border-2  border-[red]')
                setColorErrorInputEmail('border-2 border-red-600')
            }
            if (erroMessage.includes("Invalid email format")) {
                setMessageErrorInput(erroMessage)
                setShowInputErrorEmail('')
                setColorErrorInputEmail('border-2  border-[red]')
                setColorErrorInputEmail('border-2 border-red-600')
            }
            if (erroMessage.includes("Invalid email. It must")) {
                setMessageErrorInput(erroMessage)
                setShowInputErrorEmail('')
                setColorErrorInputEmail('border-2  border-[red]')
                setColorErrorInputEmail('border-2 border-red-600')
            }
            if (erroMessage.includes("Invalid email. Please enter")) {
                setMessageErrorInput(erroMessage)
                setShowInputErrorEmail('')
                setColorErrorInputEmail('border-2  border-[red]')
                setColorErrorInputEmail('border-2 border-red-600')
            }
            if (erroMessage.includes("Invalid email. Please provide")) {
                setMessageErrorInput(erroMessage)
                setShowInputErrorEmail('')
                setColorErrorInputEmail('border-2  border-[red]')
                setColorErrorInputEmail('border-2 border-red-600')
            }
            if (erroMessage.includes("Email not registered")) {
                setMessageErrorInput(erroMessage)
                setShowInputErrorEmail('')
                setColorErrorInputEmail('border-2  border-[red]')
                setColorErrorInputEmail('border-2 border-red-600')
            }
            if (erroMessage.includes("Password")) {
                setMessageErrorInput(erroMessage)
                setShowInputPassword('')
                setColorErrorInputPassword('border-2  border-[red]')
                setColorErrorInputPassword('border-2 border-red-600')
            }
            if (erroMessage.includes("Invalid password")) {
                setMessageErrorInput(erroMessage)
                setShowInputPassword('')
                setColorErrorInputPassword('border-2  border-[red]')
                setColorErrorInputPassword('border-2 border-red-600')
            }
        }
    };



    const handleOnClickPopAupAlert = (e) => {
        setShowPopUpAlert("hidden");
    };





    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg relative"
            >
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                    <Link to="/">
                        <X size={24} />
                    </Link>
                </motion.button>
                <h2 className="text-2xl font-bold text-center text-yellow-500 mb-2">We are waiting for you</h2>
                <h1 className="text-3xl font-bold text-center text-white mb-6">Book on VOYAGER</h1>
                <div className="flex justify-center space-x-4 mb-6">
                    <Link to="/register">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`text-sm text-gray-400 transition-colors duration-200 hover:text-yellow-500`}
                        >
                            Don't have an account yet? Sign up
                        </motion.button>
                    </Link>
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {activeTab === 'login' ? (
                        <form onSubmit={handleLogin} className="space-y-4">
                            <motion.input
                                variants={inputVariants}
                                whileFocus="focus"
                                type="text"
                                placeholder="Email"
                                className={`${colorErrorInputEmail} w-full p-3 bg-gray-700 text-white rounded transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setShowInputErrorEmail('hidden')
                                    setColorErrorInputEmail('')
                                }}
                            />
                            {/*  */}
                            <p className={`${showInputErrorEmail} text-[red] bg-[white] text-[17px] border-[3px] border-yellow-500 inline-block rounded-[10px] px-[8px] mt-[5px]`}>
                                &#10071; {messageErrorInput}
                            </p>
                            <motion.input
                                variants={inputVariants}
                                whileFocus="focus"
                                type="password"
                                placeholder="Password"
                                className={`${colorErrorInputPassword} w-full p-3 bg-gray-700 text-white  rounded transition-all duration-200 focus:ring-2 focus:ring-yellow-500 focus:outline-none`}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value)
                                    setShowInputPassword('hidden')
                                    setColorErrorInputPassword('')
                                }}
                            />
                            <p className={`${showInputPassword} text-[red] text-[17px] bg-white border-[3px] border-yellow-500 inline-block rounded-[10px] px-[8px] mt-[5px]`}> &#10071;{messageErrorInput}</p>
                            <button
                                className="relative w-full p-3 bg-gray-700 text-yellow-500 rounded font-bold overflow-hidden group"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    Sign in
                                    <ArrowRight size={20} className="ml-2" />
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-0 bg-yellow-500 transition-all duration-300 group-hover:h-full"></span>
                                <span className="absolute bottom-0 left-0 w-full h-0 bg-yellow-400 transition-all duration-500 delay-100 group-hover:h-full"></span>
                            </button>
                            {/* <p className="text-sm text-center text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer">¿Olvidaste tu contraseña?</p> */}
                        </form>
                    ) : (
                        ""
                    )
                    }
                </motion.div>
            </motion.div>
            <style jsx>{`
                .group:hover span {
                  color: #1F2937;
                }
              `}</style>

            <div className={`${showPopUpAlert}`}>
                <PopUpAlert
                    gif={gif}
                    message={messageShowPopUpAlert}
                    link={link}
                    handleOnClick={handleOnClickPopAupAlert}
                />
            </div>
        </div>
    )
}

export default Login