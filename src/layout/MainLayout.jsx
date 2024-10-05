import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import AdminHeader from '../pages/AdminHeader';
import { useSelector } from 'react-redux';

const MainLayout = () => {

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state)=> state.auth.user)

  console.log(auth);
  console.log(user);
  
  
  return (
    <div className="flex flex-col min-h-screen">
      {/* <Header />
      <AdminHeader/> */}

      {/* Verificamos si el usuario es admin para mostrar el header adecuado */}
      {auth && user?.email?.includes('admin') ? (
        <AdminHeader /> // Mostrar el header de administrador
      ) : (
        <Header /> // Mostrar el header normal
      )}

      <main className="flex-grow bg-black">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
