import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
    const [cardData, setCardData] = useState({
        cardHolder: '', // Nombre del titular
        type: 'DEBIT', // Tipo de tarjeta
        color: 'PLATINUM', // Color de la tarjeta
        number: '', // Número de tarjeta
        cvv: '', // CVV
        fromDate: '', // Fecha de expiración
        thruDate: '', // Fecha de emisión
    });

    const [transactionData, setTransactionData] = useState({
        amount: '', // Monto a cargar
        description: '' // Descripción de la transacción
    });

    const handleCardChange = (e) => {
        setCardData({ ...cardData, [e.target.name]: e.target.value });
    };

    const handleTransactionChange = (e) => {
        setTransactionData({ ...transactionData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Aquí se crea la transacción
        const transaction = {
            amount: parseFloat(transactionData.amount), // Asegúrate de convertir a float
            description: transactionData.description,
            sourceAccountNumber: 'VIN002',  // Ajustar según el contexto
            destinationAccountNumber: 'VIN001', // Ajustar según el contexto
        };

        try {
            // Enviar la transacción
            const response = await axios.post('https://proyectohomebanking-1.onrender.com/api/transactions', transaction);
            console.log('Transaction successful:', response.data);

            // Aquí podrías notificar al usuario que la "transacción" fue exitosa
            alert('Transacción realizada con éxito');
        } catch (error) {
            console.error('Transaction error:', error.response ? error.response.data : error.message);
            alert('Error al realizar la transacción');
        }

        // Opcional: enviar los datos de la tarjeta si es necesario
        const cardInfo = {
            cardHolder: cardData.cardHolder,
            type: cardData.type,
            color: cardData.color,
            number: cardData.number,
            cvv: cardData.cvv,
            fromDate: cardData.fromDate, // Usar desde la entrada del formulario
            thruDate: cardData.thruDate, // Usar desde la entrada del formulario
        };

        try {
            // Esto es opcional, puedes decidir si quieres crear la tarjeta o no
            const cardResponse = await axios.post('https://proyectohomebanking-1.onrender.com/api/cards/clients/current/cards', cardInfo);
            console.log('Card created successfully:', cardResponse.data);
        } catch (error) {
            console.error('Card creation error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className='bg-orange-500'>
            <h2>Simular Pago con Tarjeta</h2>
            <div>
                <label>Nombre del Titular</label>
                <input type="text" name="cardHolder" value={cardData.cardHolder} onChange={handleCardChange} required />
            </div>
            <div>
                <label>Número de Tarjeta</label>
                <input type="text" name="number" value={cardData.number} onChange={handleCardChange} required />
            </div>
            <div>
                <label>Fecha de Emisión</label>
                <input type="date" name="fromDate" value={cardData.fromDate} onChange={handleCardChange} required />
            </div>
            <div>
                <label>Fecha de Expiración</label>
                <input type="date" name="thruDate" value={cardData.thruDate} onChange={handleCardChange} required />
            </div>
            <div>
                <label>CVV</label>
                <input type="text" name="cvv" value={cardData.cvv} onChange={handleCardChange} required />
            </div>
            <div>
                <label>Monto</label>
                <input type="number" name="amount" value={transactionData.amount} onChange={handleTransactionChange} required />
            </div>
            <div>
                <label>Descripción</label>
                <input type="text" name="description" value={transactionData.description} onChange={handleTransactionChange} required />
            </div>
            <button  type="submit">Realizar Pago</button>
        </form>
    );
};

export default PaymentForm;
