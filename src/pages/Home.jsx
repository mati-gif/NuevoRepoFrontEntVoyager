import React, { useEffect, useState } from 'react'
import Carrousel from '../components/Carrousel'
import Menu from '../components/Menu'
import "./Home.css"
import PopUpProductWindow from '../components/PopUpProductWindow'
import TimeInfoComponent from '../components/TimeInfoComponent'
import PublicityComponent from '../components/PublicityComponent'
import MapComponent from '../components/MapComponent'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../redux/actions/authAction'
import DebitCardPayment from '../components/DebitCardPayment'
import Prueba from '../components/Prueba'
import axios from 'axios'





const home = () => {
  const user = useSelector((store)=> store.auth.user)
  // const isLoggedIn = useSelector((store)=> store.authReducer)
  const status = useSelector((store)=> store.auth.status)
  console.log(user);

  
  
  const dispatch = useDispatch()
  useEffect(() => {
    // const token = localStorage.getItem("token");
    
    if (status != "success") {
        dispatch(loadUser());  // Cargar el usuario si hay un token presente
    }
}, [dispatch]);



//----------------------------------------------------------------HOME BANKING------------------------------------------
const [cardNumber, setCardNumber] = useState('')
const [restaurantAccountNumber, setRestaurantAccountNumber] = useState('')
const [totalAmount, setTotalAmount] = useState(0)

const handleOnclickPayment = () => {
  const body = {
    cardNumberClient: cardNumber,
    accountNumberRestaurant: restaurantAccountNumber,
    totalAmount: totalAmount ,
};
console.log(body)
// 3435-6736-2470-2857  TARJETA QUE ESTA EN EL BACK: SI QUIERES PROBAR EN EL MONTO PONE 1 PESO PORQUE A LA CUENTA SE LE VA DESCUENTA EL MONTO (VER RESPUESTA DE LA PETICION EN CONSOLA)
// VIN003                ----------------- NUMERO DECUENTA A LA QUE SE TRANFIEREN LOS CONFODS
  axios.post("https://homebanking-luisibanez-deply-back.onrender.com/api/external/payment", body)
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
}
//----------------------------------------------------------------HOME BANKING------------------------------------------




  return (
    <div className='bgBody flex flex-col min-h-screen'>
      <div className='flex flex-col gap-[50px] mb-[50px]'>

      {/* //----------------------------------------------------------------HOME BANKING------------------------------------------ */}
        <div className='w-[600px] h-[550px] border flex flex-col border-white mt-[150px]'>
          <label htmlFor="" className='text-white'>Card number</label>
          <input className='ml-[20px]' type="text"  value={cardNumber} onChange={(e) => setCardNumber(e.target.value)}/>
          <label htmlFor="" className='text-white'>Restaurant account number</label>
          <input className='ml-[20px]' type="text"  value={restaurantAccountNumber} onChange={(e) => setRestaurantAccountNumber(e.target.value)}/>
          <label htmlFor="" className='text-white'>Total amount</label>
          <input className='ml-[20px]' type="number"  value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)}/>
          <button className='text-black bg-yellow-500 p-[10px] border border-black' onClick={handleOnclickPayment}>ENVIAR</button>
        </div>
        {/* //----------------------------------------------------------------HOME BANKING------------------------------------------ */}



        <Carrousel />
        <Menu />
        {/* <PopUpProductWindow/> */}
        <TimeInfoComponent/> 
        {/* <DebitCardPayment/> */}
        <PublicityComponent/>
        <MapComponent/>
      </div>
    </div>
  )
}

export default home










