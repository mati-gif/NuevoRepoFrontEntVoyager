import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ModalRegister = ({ onClose, onCancel }) => {
  const navigate = useNavigate();
  const [alertShown, setAlertShown] = useState(false); // Estado para controlar si el modal ya fue mostrado

  const showAlert = () => {
    if (!alertShown) { // Solo mostrar el modal si no ha sido mostrado aún
      setAlertShown(true); // Marcar como mostrado
      Swal.fire({
        title: 'Registration Required',
        text: "To perform this action, you need to register.",
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Register',
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Redirecting!',
            'We will take you to the registration page.',
            'success'
          ).then(() => {
            navigate('/register'); // Reemplaza '/register' con tu ruta de registro
          });
        } else if (result.isDismissed) { // Verifica si el modal fue cerrado
          if (onCancel) { // Verifica si onCancel es una función
            onCancel(); // Ejecuta la función pasada por props
          }
        }
        onClose(); // Cerrar el modal después de la interacción
      });
    }
  };

  useEffect(() => {
    showAlert(); // Mostrar el alert directamente al montar el componente
  }, []); // Array de dependencias vacío para que solo se ejecute una vez

  return null; // No renderizar nada ya que el modal es manejado por Swal
};

export default ModalRegister;
