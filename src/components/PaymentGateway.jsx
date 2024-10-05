import React, { useState } from "react";
import axios from "axios";

const PaymentGateway = ({ orderId, totalAmount }) => {
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [error, setError] = useState(null);

    const handlePayment = async () => {
        try {
            const response = await axios.post("http://localhost:8081/api/orders/create", {
                orderId,
                amount: totalAmount
            });

            setPaymentStatus(response.data.message);  // El backend de restaurante retorna el estado del pago
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
