import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CreditCard, Lock, ChevronDown } from "lucide-react";
import axios from "axios";
import "./AddAddress.css";
import { GiBank } from "react-icons/gi";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const DebitCardPayment = () => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardHolder, setCardHolder] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    // const [isModalOpeb, setExpiryDate] = useState("");

    const [cvv, setCvv] = useState("");
    const [cardType, setCardType] = useState("silver");
    const [isCardTypeOpen, setIsCardTypeOpen] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    const producstSelected = JSON.parse(localStorage.getItem("product"));
    console.log(producstSelected);

    const ids = producstSelected.map((product) => product.idProduct);
    const quantity = producstSelected.map((product) => product.quantity);
    console.log(ids);
    console.log(quantity);

    const orderType = localStorage.getItem("orderType");
    console.log(orderType);

    const address = localStorage.getItem("address");
    console.log(address);

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
        const matches = v.match(/\d{4,16}/g);
        const match = (matches && matches[0]) || "";
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(" ");
        } else {
            return value;
        }
    };

    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        setCardNumber(formattedValue);
    };

    const handleExpiryDateChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 4) {
            const formattedValue = value.replace(/(\d{2})(\d{2})/, "$1/$2");
            setExpiryDate(formattedValue);
        }
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 3) {
            setCvv(value);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Crear el objeto dataPost
        const dataPost = {
            productIds: ids,
            quantities: quantity,
            addressId: orderType === "DELIVERY" ? address : null, // Solo asigna addressId si es DELIVERY
            orderType: orderType, // Asigna el orderType seleccionado
        };

        console.log("Order submitted:", dataPost); // Muestra el objeto en la consola

        // Realizar la petición POST con axios
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                "https://challengefinalbackvoyager.onrender.com/api/orders/create",
                dataPost,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Uso correcto de las comillas invertidas
                    },
                }
            );
            console.log("Response from server:", response.data); // Muestra la respuesta del servidor
        } catch (error) {
            console.error("Error submitting order:", error);
        }
    };

    //----------------------------------------------------------------HOME BANKING------------------------------------------
    const [number, setNumber] = useState("");
    const [restaurantAccountNumber, setRestaurantAccountNumber] = useState("");
    const [totalAmount, setTotalAmount] = useState(0);

    const handleOnclickPayment = () => {
        const body = {
            cardNumberClient: number,
            accountNumberRestaurant: restaurantAccountNumber,
            totalAmount: totalAmount,
        };
        console.log(body);
        // 3435-6736-2470-2857  TARJETA QUE ESTA EN EL BACK: SI QUIERES PROBAR EN EL MONTO PONE 1 PESO PORQUE A LA CUENTA SE LE VA DESCUENTA EL MONTO (VER RESPUESTA DE LA PETICION EN CONSOLA)
        // VIN003                ----------------- NUMERO DECUENTA A LA QUE SE TRANFIEREN LOS CONFODS
        axios
            .post(
                "https://homebanking-luisibanez-deply-back.onrender.com/api/external/payment",
                body
            )
            .then((response) => {
                console.log(response.data);

                Swal.fire({
                    icon: 'success',
                    title: 'We are processing your payment',
                    text: 'in a few minutes you will recieve a receipt to your email',
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };
    //----------------------------------------------------------------HOME BANKING------------------------------------------

    const cardColors = {
        gold: "bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500",
        silver: "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500",
        platinum: "bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300",
    };

    const cardTypeOptions = [
        { value: "silver", label: "Silver" },
        { value: "gold", label: "Gold" },
        { value: "platinum", label: "Platinum" },
    ];

    const navigate = useNavigate();
    const handleClick = () =>{

 
            Swal.fire({
                icon: 'success',
                title: '',
                text: 'Your order and payment have been successfully completed.In a few minutes you will recieve an email receipt',
                // timer: 2000, // El temporizador dura 3 segundos (3000 milisegundos)
                showConfirmButton: true, // Oculta el botón de confirmación
                willClose: () => {
                    navigate("/"); // Navegar después de que la alerta desaparezca
                }
            });

    }

    return (
        <div className="bground min-h-screen  flex items-center justify-center p-4 mt-[50px]">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="  bg-gray-800   rounded-3xl shadow-2xl p-8 max-w-4xl w-full"
            >
                <h2 className="text-4xl font-extrabold mb-6 text-center text-yellow-500">
                    Debit Card Payment
                </h2>
                <div className="flex flex-col  md:flex-row gap-8">
                    <div className="md:w-1/2">
                        <div className="perspective-1000 w-full h-56">
                            <motion.div
                                className="w-full h-full relative"
                                initial={false}
                                animate={{ rotateY: isFlipped ? 180 : 0 }}
                                transition={{ duration: 0.6 }}
                                style={{ transformStyle: "preserve-3d" }}
                            >
                                <div
                                    className={`absolute w-full h-full ${cardColors[cardType]} rounded-2xl shadow-lg p-6 text-white overflow-hidden backface-hidden`}
                                    style={{ backfaceVisibility: "hidden" }}
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                    <div className="relative z-10">
                                        <div className="flex justify-between items-start">
                                            <CreditCard size={32} />
                                            <GiBank size={32} />
                                        </div>
                                        <div className="mt-8">
                                            <div className="text-2xl mb-2 font-mono">
                                                {cardNumber || "•••• •••• •••• ••••"}
                                            </div>
                                            <div className="flex justify-between">
                                                <div>
                                                    <div className="text-xs opacity-75">Card Holder</div>
                                                    <div className="font-semibold">
                                                        {cardHolder || "YOUR NAME"}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-xs opacity-75">Expires</div>
                                                    <div className="font-semibold">
                                                        {expiryDate || "MM/YY"}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`absolute w-full h-full ${cardColors[cardType]} rounded-2xl shadow-lg p-6 text-white overflow-hidden backface-hidden`}
                                    style={{
                                        backfaceVisibility: "hidden",
                                        transform: "rotateY(180deg)",
                                    }}
                                >
                                    <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                                    <div className="relative z-10">
                                        <div className="w-full h-12 bg-black mt-4"></div>
                                        <div className="mt-8 px-6">
                                            <div className="bg-white text-black text-right p-2 font-mono">
                                                {cvv || "•••"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="relative">
                                <motion.button
                                    type="button"
                                    className="w-full text-left bg-white bg-opacity-20 text-white py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    onClick={() => setIsCardTypeOpen(!isCardTypeOpen)}
                                >
                                    <span>
                                        {
                                            cardTypeOptions.find(
                                                (option) => option.value === cardType
                                            )?.label
                                        }
                                    </span>
                                    <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2" />
                                </motion.button>
                                <AnimatePresence>
                                    {isCardTypeOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-20"
                                        >
                                            {cardTypeOptions.map((option) => (
                                                <motion.button
                                                    key={option.value}
                                                    type="button"
                                                    className="w-full text-left px-4 py-2 hover:bg-purple-100 focus:outline-none"
                                                    onClick={() => {
                                                        setCardType(option.value);
                                                        setIsCardTypeOpen(false);
                                                    }}
                                                    whileHover={{
                                                        backgroundColor: "rgba(167, 139, 250, 0.1)",
                                                    }}
                                                >
                                                    {option.label}
                                                </motion.button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <motion.input
                                type="text"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                className="w-full bg-white bg-opacity-20 text-white placeholder-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Card Number"
                                maxLength="19"
                                required
                                whileFocus={{ scale: 1.02 }}
                            />
                            <motion.input
                                type="text"
                                value={cardHolder}
                                onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                                className="w-full bg-white bg-opacity-20 text-white placeholder-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                placeholder="Card Holder Name"
                                required
                                whileFocus={{ scale: 1.02 }}
                            />

                            <div className="flex space-x-4">
                                <motion.input
                                    type="text"
                                    value={expiryDate}
                                    onChange={handleExpiryDateChange}
                                    className="w-16 flex-1 bg-white bg-opacity-20 text-white placeholder-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    placeholder="MM/YY"
                                    maxLength="5"
                                    required
                                    whileFocus={{ scale: 1.02 }}
                                />
                                <motion.input
                                    type="text"
                                    value={cvv}
                                    onChange={handleCvvChange}
                                    onFocus={() => setIsFlipped(true)}
                                    onBlur={() => setIsFlipped(false)}
                                    className="w-16 flex-1 bg-white bg-opacity-20 text-white placeholder-gray-300 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    placeholder="CVV"
                                    maxLength="3"
                                    required
                                    whileFocus={{ scale: 1.02 }}
                                />
                            </div>
                            <motion.button
                                onClick={handleClick}
                                type="submit"
                                className="w-full flex justify-center items-center py-3 px-4 bg-yellow-500 hover:bg-yellow-500 text-black font-semibold rounded-lg focus:outline-none "
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Lock className="mr-2" size={20} />
                                Pay Now
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default DebitCardPayment;
