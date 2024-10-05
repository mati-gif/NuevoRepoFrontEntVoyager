import "./App.css";
import MainLayout from "./layout/MainLayout.jsx";
import Admin from "./pages/Admin.jsx";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ReservationComponent from "./components/ReservationComponent.jsx";
import Reservation from "./pages/Reservation.jsx";



import Register from './pages/Register.jsx';
import ProductDetails from './pages/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';


import AdminPostProduct from './pages/AdminPostProduct.jsx';

import MenuView from './pages/MenuView.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import SendOrderForm from './pages/SendOrderForm.jsx';

import DeliveryComponent from './components/DeliveryComponent.jsx';
import AddAddress from './components/AddAddress.jsx';
import { loadUser } from './redux/actions/authAction.js';
import AdminOrder from './components/AdminOrder.jsx';




import DeliveryAdmin from "./pages/DeliveryAdmin.jsx";














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

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  console.log(auth);
  console.log(user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser()); // Cargar la información del usuario autenticado al montar la app
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Main Layout wrapping the routes (estas rutas ve la perosna que esta logueada) */}
        <Route path="/" element={<MainLayout />}>
          {/* Home Route */}
          <Route index element={<Home />} className="main" />

          {/* <Route path="/adminform" element={<AdminPostProduct />} className="adminform" /> */}
          <Route
            path="/sendOrder"
            element={<SendOrderForm />}
            className="sendOrderForm"
          ></Route>
          <Route path="/menu" element={<MenuView />} className="" />
          <Route path="/addAddress" element={<AddAddress />} />

          {/* Rutas protegidas para usuarios que contienen "admin" en su email */}
          {auth && user?.email?.includes("admin") && (
            <>
              <Route path="/admin" element={<Admin />} className="admin" />
              <Route path="/adminOrder" element={<AdminOrder />} />
              {/* <Route path="/deliveryadmin" element={<DeliveryAdmin />} className="deliveryadmin" /> */}
              <Route
                path="/adminform"
                element={<AdminPostProduct />}
                className="adminform"
              />
            </>
          )}
        </Route>

        {/* Main Layout wrapping the routes (estas rutas ve la persona que no esta logueada) */}

        <Route path="/login" element={<Login />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/reservation" element={<Reservation />} />

        <Route path="/register" element={<Register />} />
        <Route path="/productDetails" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
