import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importar Link
import logo from "../assets/logo.png";
import CustomerButton from './CustomerButton';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import ProfileHeader from './profileHeader';

const Header = () => {
  const location = useLocation();
  const status = useSelector(store => store.authReducer.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const handleClick = () => {

  //   dispatch(logoutAction())

  //   console.log("hice click?");

  //   Swal.fire({
  //     title: 'Logged Out',
  //     text: 'You have been logged out successfully.',
  //     icon: 'success',
  //     confirmButtonText: 'OK',
  //   })


  //   navigate("/")




  //   // dispatch(logoutAction())

  //   // try {


  //   //   Swal.fire({
  //   //     title: 'Logged Out',
  //   //     text: 'You have been logged out successfully.',
  //   //     icon: 'success',
  //   //     confirmButtonText: 'OK',
  //   //   }).then(() => {
  //   //     // navigate('/'); // Redirige al usuario al login después de cerrar sesión
  //   //   });
  //   // } catch (error) {
  //   //   Swal.fire({
  //   //     title: 'Logout Failed',
  //   //     text: 'There was a problem logging out. Please try again.',
  //   //     icon: 'error',
  //   //     confirmButtonText: 'OK',
  //   //   });
  //   // }
  // }

console.log(status);

  return (


    <header className="z-10 absolute w-full p-[30px] mt-[2px] ">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 bg-[#0F1D15] border-[#E6BB4D] border-2 rounded-lg">


        <div className='flex flex-col'>
          {status === "success" &&

            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link className="block text-teal-600" to="/">
                  <img src={logo} alt="logo" className="w-[120px]" />
                </Link>
              </div>

              {/* Navegación centrada */}
              <nav aria-label="Global" className="hidden md:flex md:justify-center flex-1">
                <ul className="flex items-center gap-24 text-lg">
                  <li
                    className={`transition transform ${location.pathname === '/menu' ? 'scale-150' : 'hover:scale-125'
                      }`}
                  >
                    <Link
                      to="/menu"
                      className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/menu' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
                        }`}
                    >
                      Menu
                    </Link>
                  </li>

                  <li className={`transition transform ${location.pathname === '/deliveryadmin' ? ' scale-150' : 'hover:scale-125'
                    }`}
                  >
                    <Link
                      to="/deliveryadmin"
                      className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/deliveryadmin' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
                        }`} >Pedidos</Link>
                  </li>
                  <li className="transition transform hover:scale-125">
                    <Link className="text-[#E6BB4D] text-lg font-semibold transition hover:text-[#FFD700]" to="/reseña">Reseña</Link>
                  </li>
                  <li className="transition transform hover:scale-125">
                    <Link className="text-[#E6BB4D] text-lg font-semibold transition hover:text-[#FFD700]" to="/dfasdas">dfasdas</Link>
                  </li>
                  <ProfileHeader />
                </ul>
              </nav>
            </div>
          }



          {status === "idle" &&

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
                    className={`transition transform ${location.pathname === '/' ? 'scale-150' : 'hover:scale-125'
                      }`}
                  >
                    <Link
                      to="/"
                      className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
                        }`}
                    >
                    Home
                    </Link>
                  </li>
                  
                  <li
                    className={`transition transform ${location.pathname === '/menu' ? 'scale-150' : 'hover:scale-125'
                      }`}
                  >
                    <Link
                      to="/menu"
                      className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/menu' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
                        }`}
                    >
                      Menu
                    </Link>
                  </li>
                  {/* <li className={`transition transform ${location.pathname === '/deliveryadmin' ? ' scale-150' : 'hover:scale-125'

                    }`}
                  >
                    <Link
                      to="/deliveryadmin"
                      className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/deliveryadmin' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
                        }`} >Pedidos</Link>
                  </li>
                  <li className="transition transform hover:scale-125">
                    <Link className="text-[#E6BB4D] text-lg font-semibold transition hover:text-[#FFD700]" to="/reseña">Reseña</Link>
                  </li>
                  <li className="transition transform hover:scale-125">
                    <Link className="text-[#E6BB4D] text-lg font-semibold transition hover:text-[#FFD700]" to="/dfasdas">dfasdas</Link>
                  </li> */}
                </ul>
              </nav>

              {/* Botones de Login y Register */}
              <div className="flex items-center gap-4">
                <Link to="/login" >
                  <CustomerButton
                    text="Login"
                    onClick={() => console.log('Login clicked!')}
                    textColor="text-[#0F1D15]" // Cambia al color deseado
                    bgColor="bg-[#E6BB4D]" // Cambia al color de fondo deseado
                    hoverBgColor="bg-[#FFD700]" // Cambia al color de fondo en hover deseado
                  />
                </Link>
                <Link to="/register">
                  <CustomerButton
                    text="Register"
                    onClick={() => console.log('Register clicked!')}
                    textColor="text-[#0F1D15]" // Cambia al color deseado
                    bgColor="bg-[#E6BB4D]" // Cambia al color de fondo deseado
                    hoverBgColor="bg-[#FFD700]" // Cambia al color de fondo en hover deseado
                  />
                </Link>
              </div>
            </div>
          }
        </div>



      </div>
    </header>
  );
}

export default Header;
