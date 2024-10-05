import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importar Link
import logo from "../assets/logo.png";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import CustomerButton from '../components/CustomerButton';
import { header } from 'framer-motion/client';
import { logoutAction } from '../redux/actions/authAction';



function AdminHeader() {

    const location = useLocation();
    const email = useSelector(store => store.auth.user.email)
    console.log(email);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleClick = () => {

        dispatch(logoutAction())

        console.log("hice click?");

        Swal.fire({
            title: 'Logged Out',
            text: 'You have been logged out successfully.',
            icon: 'success',
            confirmButtonText: 'OK',
        })


        navigate("/login")

    }

    return (
        <header className="z-10 absolute w-full p-[30px] mt-[2px] ">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 bg-[#0F1D15] border-[#E6BB4D] border-2 rounded-lg">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link className="block text-teal-600" to="/">
                            <img src={logo} alt="logo" className="w-[120px]" />
                        </Link>
                    </div>

                    {/* Navegación centrada */}
                    <nav aria-label="Global" className="hidden md:flex md:justify-center flex-1">
                        <ul className="flex items-center gap-10 text-lg">

                            <li
                                className={`transition transform ${location.pathname === '/admin' ? 'scale-150' : 'hover:scale-125'
                                    }`}
                            >
                                <Link
                                    to="/admin"
                                    className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/admin' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
                                        }`}
                                >
                                    Admin
                                </Link>
                            </li>

                            <li
                                className={`transition transform ${location.pathname === '/deliveryadmin' ? 'scale-150' : 'hover:scale-125'
                                    }`}
                            >
                                <Link
                                    to="/deliveryadmin"
                                    className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/deliveryadmin' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
                                        }`}
                                >
                                    DeliveryAdmin
                                </Link>
                            </li>

                            <li
                                className={`transition transform ${location.pathname === '/adminform' ? 'scale-150' : 'hover:scale-125'
                                    }`}
                            >
                                <Link
                                    to="/adminform"
                                    className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/adminform' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
                                        }`}
                                >
                                    adminForm
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Botones de Logout */}
                    <div className="flex items-center justify-end gap-4">
                        <CustomerButton
                            text="Logout"
                            onClick={handleClick}
                            textColor="text-[#0F1D15]" // Cambia al color deseado
                            bgColor="bg-[#E6BB4D]" // Cambia al color de fondo deseado
                            hoverBgColor="bg-[#FFD700]" // Cambia al color de fondo en hover deseado
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default AdminHeader