import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";  // Para redirigir y obtener datos

const PaymentGateway = () => {
    const location = useLocation();  // Obtener los datos del estado
    const { orderId, totalAmount, cardDetails } = location.state;  // Recibir datos del pago y tarjeta
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handlePayment = async () => {
        try {
          const token = localStorage.getItem('token');
          const paymentData = {
            orderId,
            amount: totalAmount,
            cardDetails // Detalles de la tarjeta enviados al backend
          };
      
          const response = await axios.post("http://localhost:8080/api/payments/pay-order", paymentData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.data.success) {
            Swal.fire("Success", "Payment processed successfully!", "success");
            navigate("/order-summary");  // Redirigir a la página de resumen de la orden
          } else {
            setError(response.data.message);
          }
        } catch (err) {
          setError("Payment failed. Please try again.");
        }
      };
      
    return (
        <div>
            <h2>Payment for Order #{orderId}</h2>
            <p>Total: ${totalAmount}</p>
            <button onClick={handlePayment}>Pay Now</button>

            {paymentStatus && <p>Payment Status: {paymentStatus}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default PaymentGateway;
