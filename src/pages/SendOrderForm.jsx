import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveCartProducts } from "../redux/actions/cartActions";
import { loadUser } from "../redux/actions/authAction";
import axios from "axios"; // Importar axios
import { Link } from "react-router-dom";

const SendOrderForm = () => {
  const dispatch = useDispatch();
  const productsQuantity = useSelector((store) => store.cart.productos);
  const user = useSelector((store) => store.auth.user);
  const [quantitys, setQuantitis] = useState([]);
  const [productId, setProductsId] = useState([]);
  const [orderType, setOrderType] = useState(""); 
  const [address, setAddress] = useState(""); 
  const [addresses, setAddresses] = useState([]); // Estado para las direcciones del usuario

  useEffect(() => {
    if (user.firstName === "") {
      dispatch(loadUser());
    } else if (user.address) {
      setAddresses(user.address); // Asigna las direcciones del usuario al estado
    }
  }, [dispatch, user]);

  console.log(addresses);

  const producstSelected = JSON.parse(localStorage.getItem("product"));

  const ids = producstSelected.map((product) => product.idProduct);
  const quantity = producstSelected.map((product) => product.quantity);

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
      const token = localStorage.getItem('token');
      const response = await axios.post("http://localhost:8080/api/orders/create", dataPost, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
      console.log("Response from server:", response.data); // Muestra la respuesta del servidor
    } catch (error) {
      console.error("Error submitting order:", error);
    }

    // Despachar acción para guardar productos (opcional)
    dispatch(saveCartProducts(dataPost));
  };

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };

  const totalPrice = producstSelected.reduce(
    (acc, product) => acc + product.priceProduct * product.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 items-center justify-center p-4 mt-[100px]">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl text-yellow-400 font-bold mb-6 text-center">
          Review Your Order
        </h1>

        {/* Productos seleccionados */}
        <form
          id="orderForm"
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-lg shadow-2xl p-8 w-full flex flex-col gap-6"
        >
          {/* Tipo de orden */}
          <div className="mb-4">
            <label className="block text-xl font-semibold text-yellow-400 mb-2">
              Order Type:
            </label>
            <div className="flex space-x-6">
              <label className="text-white flex items-center">
                <input
                  type="radio"
                  value="DELIVERY"
                  checked={orderType === "DELIVERY"}
                  onChange={handleOrderTypeChange}
                  className="mr-2 scale-150"
                />
                <span className="text-2xl">Delivery</span>
              </label>
              <label className="text-white flex items-center">
                <input
                  type="radio"
                  value="TAKEOUT"
                  checked={orderType === "TAKEOUT"}
                  onChange={handleOrderTypeChange}
                  className="mr-2 scale-150"
                />
                <span className="text-2xl">Takeout</span>
              </label>
            </div>
          </div>

          {/* Dirección (si selecciona Delivery) */}
          {orderType === "DELIVERY" && (
            <div className="mb-6">
              <label className="block text-lg font-semibold text-yellow-400 mb-2">
                Select Address:
              </label>
              <select
                value={address}
                onChange={(e) => setAddress(e.target.value)} // Almacena el ID de la dirección
                className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
                required
              >
                <option value="">Select Address</option>
                {/* Map sobre las direcciones del usuario */}
                {addresses.map((addr, index) => (
                  <option key={index} value={addr.id}> {/* Asignamos el ID */}
                    {addr.nameStreet} {addr.streetNumber}
                  </option>
                ))}
              </select>
            </div>
          )}

          {producstSelected.length > 0 &&
            producstSelected.map((product) => (
              <div
                key={product.idProduct}
                className="flex flex-col sm:flex-row justify-between items-center bg-gray-800 p-4 mb-4 rounded-lg shadow-lg border border-gray-700 w-full"
              >
                {/* Nombre del producto */}
                <p className="text-yellow-300 text-lg font-bold mb-2 sm:mb-0 w-[40%]">
                  {product.nameProduct}
                </p>

                {/* Cantidad */}
                <p className="text-gray-400 text-center text-sm sm:text-base w-[20%]">
                  X {product.quantity}
                </p>

                {/* Precio total */}
                <p className="text-white font-medium text-sm sm:text-base text-center w-[40%]">
                  ${product.priceProduct * product.quantity}
                </p>
              </div>
            ))}

          {/* Precio total de todos los productos */}
          <div className="mt-6 bg-gray-700 p-4 rounded-lg text-white text-lg font-semibold text-right">
            <p>Total Order Price: ${totalPrice.toFixed(2)}</p>
          </div>


          {/* Botón para enviar la orden */}
          <button
            type="submit"
            className="mt-6 p-3 bg-yellow-500 text-white text-lg font-bold rounded-lg hover:bg-yellow-600 transition-all duration-200 w-full"
          >
            Submit Order
          </button>

        </form>
      </div>
    </div>
  );
};

export default SendOrderForm;
