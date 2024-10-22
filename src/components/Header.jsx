// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom"; // Importar Link
// import logo from "../assets/logo.png";
// import CustomerButton from "./CustomerButton";
// import { useDispatch, useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { ShoppingCart, Plus, Minus, X } from "lucide-react";
// import ProfileHeader from "./ProfileHeader";
// import { div } from "framer-motion/client";
// import CartModal from "./CartModal";

// const Header = () => {
//   const location = useLocation();
//   const status = useSelector((store) => store.auth.status);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [productsSelected, setProductsSelected] = useState([]);


//   // const handleClick = () => {

//   //   dispatch(logoutAction())

//   //   console.log("hice click?");

//   //   Swal.fire({
//   //     title: 'Logged Out',
//   //     text: 'You have been logged out successfully.',
//   //     icon: 'success',
//   //     confirmButtonText: 'OK',
//   //   })

//   //   navigate("/")

//   //   // dispatch(logoutAction())

//   //   // try {

//   //   //   Swal.fire({
//   //   //     title: 'Logged Out',
//   //   //     text: 'You have been logged out successfully.',
//   //   //     icon: 'success',
//   //   //     confirmButtonText: 'OK',
//   //   //   }).then(() => {
//   //   //     // navigate('/'); // Redirige al usuario al login después de cerrar sesión
//   //   //   });
//   //   // } catch (error) {
//   //   //   Swal.fire({
//   //   //     title: 'Logout Failed',
//   //   //     text: 'There was a problem logging out. Please try again.',
//   //   //     icon: 'error',
//   //   //     confirmButtonText: 'OK',
//   //   //   });
//   //   // }
//   // }

//   const cartClick = () => {
//     setIsModalOpen(true)
//     const storedProducts = JSON.parse(localStorage.getItem("product"));
//     if (storedProducts) {
//       setProductsSelected(storedProducts);
//     }
//   };

//   console.log(productsSelected);

//   console.log(isModalOpen);


//   // useEffect(() => {
//   //   const storedProducts = JSON.parse(localStorage.getItem("product"));
//   //   if (storedProducts) {
//   //     setProductsSelected(storedProducts);
//   //   }
//   // }, []); // El array vacío asegura que este efecto solo se ejecute al montar el componente.

//   console.log(productsSelected);

//   const removeFromCart = (index) => {
//     setProductsSelected((prevItems) => prevItems.filter((_, i) => i !== index));
//   };


//   return (

// <div>
// <header className="z-10 absolute w-full p-[30px] mt-[2px] ">
//       <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 bg-[#0F1D15] border-[#E6BB4D] border-2 rounded-lg">


//         <div className='flex flex-col'>
//           {status === "success" ?

//             <div className="flex h-16 items-center justify-between ">
//               {/* Logo */}
//               <div className="flex-shrink-0 w-[25%]">
//                 <Link className="block text-teal-600" to="/">
//                   <img src={logo} alt="logo" className="w-[120px]" />
//                 </Link>
//               </div>

//               {/* Navegación centrada */}
//               <nav aria-label="Global" className="hidden  md:flex md:justify-center flex-1 w-[50%]">
//                 <ul className="flex items-center gap-10 text-lg">

//                   <li
//                     className={`transition transform ${location.pathname === '/' ? 'scale-150' : 'hover:scale-125'
//                       }`}
//                   >
//                     <Link
//                       to="/"
//                       className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
//                         }`}
//                     >
//                       Home
//                     </Link>
//                   </li>
//                   <li
//                     className={`transition transform ${location.pathname === '/menu' ? 'scale-150' : 'hover:scale-125'
//                       }`}
//                   >
//                     <Link
//                       to="/menu"
//                       className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/menu' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
//                         }`}
//                     >
//                       Menu
//                     </Link>
//                   </li>

//                   <li className={`transition transform ${location.pathname === '/deliveryadmin' ? ' scale-150' : 'hover:scale-125'
//                     }`}
//                   >
//                     <Link
//                       to="/reservations"
//                       className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/deliveryadmin' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
//                         }`} >Reservations</Link>
//                   </li>

//                   {/* <li className="transition transform hover:scale-125">
//                     <Link className="text-[#E6BB4D] text-lg font-semibold transition hover:text-[#FFD700]" to="/dfasdas">dfasdas</Link>
//                   </li> */}
//                 </ul>
//               </nav>
//               <div className='flex justify-center items-center w-[25%]'>
//               <ProfileHeader />
//               <ShoppingCart size={24} onClick={() => setIsModalOpen(true)} className='text-yellow-400' />
//               </div>
//             </div>
//             :
//             <div className="flex h-16 items-center justify-between">
//               {/* Logo */}
//               <div className="flex-shrink-0 w-[25%]">
//                 <Link className="block text-teal-600" to="/">
//                   <img src={logo} alt="logo" className="w-[120px]" />
//                 </Link>
//               </div>

//               {/* Navegación centrada */}
//               <nav aria-label="Global" className="hidden md:flex md:justify-center flex-1 w-[75%]">
//                 <ul className="flex items-center gap-10 text-lg">

//                   <li
//                     className={`transition transform ${location.pathname === '/' ? 'scale-150' : 'hover:scale-125'
//                       }`}
//                   >
//                     <Link
//                       to="/"
//                       className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
//                         }`}
//                     >
//                       Home
//                     </Link>
//                   </li>

//                   <li
//                     className={`transition transform ${location.pathname === '/menu' ? 'scale-150' : 'hover:scale-125'
//                       }`}
//                   >
//                     <Link
//                       to="/menu"
//                       className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/menu' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
//                         }`}
//                     >
//                       Menu
//                     </Link>
//                   </li>
//                   {/* <li className={`transition transform ${location.pathname === '/deliveryadmin' ? ' scale-150' : 'hover:scale-125'

//                   }`}
//                 >
//                   <Link
//                     to="/deliveryadmin"
//                     className={`text-[#E6BB4D] text-lg font-semibold transition ${location.pathname === '/deliveryadmin' ? 'text-[#FFD700]' : 'hover:text-[#FFD700]'
//                       }`} >Pedidos</Link>
//                 </li>
//                 <li className="transition transform hover:scale-125">
//                   <Link className="text-[#E6BB4D] text-lg font-semibold transition hover:text-[#FFD700]" to="/reseña">Reseña</Link>
//                 </li>
//                 <li className="transition transform hover:scale-125">
//                   <Link className="text-[#E6BB4D] text-lg font-semibold transition hover:text-[#FFD700]" to="/dfasdas">dfasdas</Link>
//                 </li> */}
//                 </ul>
//               </nav>

//               {/* Botones de Login y Register */}
//               <div className="flex items-center justify-end gap-4 w-[25%] ">
//                 <Link to="/login" >
//                   <CustomerButton
//                     text="Login"
//                     onClick={() => console.log('Login clicked!')}
//                     textColor="text-[#0F1D15]" // Cambia al color deseado
//                     bgColor="bg-[#E6BB4D]" // Cambia al color de fondo deseado
//                     hoverBgColor="bg-[#FFD700]" // Cambia al color de fondo en hover deseado
//                   />
//                 </Link>
//                 <Link to="/register">
//                   <CustomerButton
//                     text="Register"
//                     onClick={() => console.log('Register clicked!')}
//                     textColor="text-[#0F1D15]" // Cambia al color deseado
//                     bgColor="bg-[#E6BB4D]" // Cambia al color de fondo deseado
//                     hoverBgColor="bg-[#FFD700]" // Cambia al color de fondo en hover deseado
//                   />
//                 </Link>
//               </div>
//             </div>
//           }

//         </div>



//       </div>


//     </header>

//     {/* {isModalOpen && ()} */}
//     {isModalOpen && (
//         <CartModal
//           cartItems={productsSelected}
//           onRemoveFromCart={removeFromCart}
//           onQuantityChange={null}
//           onSendCart={null}
//           onClose={() => setIsModalOpen(false)}
//           onRemoveAll={null}
//         />
//       )}

// </div>



//   );
// }


// export default Header;





























import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import CustomerButton from "./CustomerButton";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ShoppingCart } from "lucide-react";
import ProfileHeader from "./ProfileHeader";
import CartModal from "./CartModal";
import "../styles/header.css"; // Asegúrate de tener este archivo de estilos

const Header = () => {
  const location = useLocation();
  const status = useSelector((store) => store.auth.status);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNav, setShowNav] = useState(false); // Estado para controlar el menú
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productsSelected, setProductsSelected] = useState([]);

  const cartClick = () => {
    setIsModalOpen(true);
    const storedProducts = JSON.parse(localStorage.getItem("product"));
    if (storedProducts) {
      setProductsSelected(storedProducts);
    }
  };

  const toggleNav = () => {
    setShowNav(!showNav);
  };

  const removeFromCart = (index) => {
    setProductsSelected((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full bgBody">
      <header className="z-10 w-[90%] py-[30px] bg-[#0F1D15] border-[#E6BB4D] border-2 rounded-lg flex justify-between items-center">
        {/* Logo en la izquierda, ocupando 20% */}
        <div className="flex-shrink-0 w-[20%]">
          <Link className="block text-teal-600" to="/">
            <img src={logo} alt="logo" className="w-[120px]" />
          </Link>
        </div>

        {/* Contenedor que ocupa el 80%, dividido en 50% para nav y 50% para perfil y carrito */}
        <div className="w-[80%] flex justify-center items-center">
          {/* Navegación, ocupando 50% */}
          <nav
            aria-label="Global"
            className={`nav ${showNav ? "show" : ""} md:flex md:justify-center w-[50%] bg-[#0F1D15] transition-all border-[#E6BB4D] border-2 rounded-lg`}
          >
            <ul className="flex flex-col md:flex-row items-center gap-5 md:gap-10 py-2 text-lg w-full justify-center">
              <li className={`transition transform ${location.pathname === "/" ? "scale-150" : "hover:scale-125"}`}>
                <Link to="/" className="text-[#FFD700] text-lg font-semibold">
                  Home
                </Link>
              </li>
              <li className={`transition transform ${location.pathname === "/menu" ? "scale-150" : "hover:scale-125"}`}>
                <Link to="/menu" className="text-[#FFD700] text-lg font-semibold">
                  Menu
                </Link>
              </li>
              <li className={`transition transform ${location.pathname === "/reservation" ? "scale-150" : "hover:scale-125"}`}>
                <Link to="/reservation" className="text-[#FFD700] text-lg font-semibold">
                  Reservation
                </Link>
              </li>
            </ul>
          </nav>

          {/* Perfil y carrito, ocupando 50% */}
          <div className="w-[50%] flex items-center justify-center gap-5 md:gap-1 xl:gap-[10px] xl:w-[30%]">
            <ProfileHeader />
            <ShoppingCart size={24} onClick={cartClick} className="text-[#E6BB4D] cursor-pointer" />
            <button id="menu" onClick={toggleNav} className="menu-button block md:hidden">
              {showNav ? "X" : "≡"}
            </button>
          </div>
        </div>
      </header>

      {isModalOpen && (
        <CartModal cartItems={productsSelected} onRemoveFromCart={removeFromCart} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default Header;
