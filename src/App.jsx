import './App.css';

import MainLayout from './layout/MainLayout.jsx';
import Admin from './pages/Admin.jsx';
import Home from './pages/Home.jsx';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';

import ReservationComponent from './components/ReservationComponent.jsx';
import Reservation from './pages/Reservation.jsx';

import Register from './pages/Register.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';

import DeliveryAdmin from './pages/DeliveryAdmin.jsx';
import AdminPostProduct from './pages/AdminPostProduct.jsx';

import MenuView from './pages/MenuView.jsx';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import SendOrderForm from './pages/SendOrderForm.jsx';

import DeliveryComponent from './components/DeliveryComponent.jsx';
import AddAddress from './components/AddAddress.jsx';





function App() {

  // const dispatch = useDispatch();

  // useEffect(() => {
  //     const token = localStorage.getItem('token');
  //     console.log(token);
      
  //     if (token) {
  //         // Si hay un token en localStorage, actualiza el estado de autenticación
  //         dispatch(loginAction({ token, isLoggedIn: true }));
  //     }
  // }, [dispatch]);
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout wrapping the routes */}
        <Route path="/" element={<MainLayout />}>
          {/* Home Route */}
          <Route index element={<Home />} className="main" />
          <Route path="/admin" element={<Admin />} className="admin" />

          <Route path="/deliveryadmin" element={<DeliveryAdmin />} className="deliveryadmin" />
          <Route path="/adminform" element={<AdminPostProduct />} className="adminform" />



          <Route path='/sendOrder' element={<SendOrderForm/>} className="sendOrderForm"></Route>



          <Route path="/menu" element={<MenuView />} className="" />
          <Route path='/addAddress' element={<AddAddress/>}/>
        </Route>
        <Route path='/login' element={<Login/>} />

        <Route path='/reservation' element={<Reservation/>} />

        <Route path='/register' element={<Register/>} />
        <Route path='/productDetails' element={<ProductDetails/>} />
        <Route path='/cart' element={<Cart/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
