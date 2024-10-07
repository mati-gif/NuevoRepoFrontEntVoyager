import React, { useEffect, useState } from "react";
import FoodCards from "../components/FoodCards";
import image from "../assets/soft-drink.png"; // Icon for drinks
import image1 from "../assets/burger.png"; // Icon for hamburgers
import image2 from "../assets/potato-fries.png"; // Icon for sides
import image3 from "../assets/cake_icon.png";
import axios from "axios";
import CartModal from "../components/CartModal"; // Import your modal component
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCartProducts } from "../redux/actions/cartActions";
import { loadUser } from "../redux/actions/authAction";
import ModalRegister from "../components/ModalRegister";



function MenuView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpenRegisterModal, setisOpenRegisterModal] = useState(false); // Estado para el modal de registro

  console.log(isOpenRegisterModal);

  // Cargar los productos guardados en el carrito desde localStorage cuando se monta el componente
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("product")) || [];
    if (storedProducts.length !== 0) {
      setCartItems(storedProducts);
    }
  }, []);

  useEffect(() => {
    // Verifica si el usuario está logueado
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      dispatch(loadUser()); // El usuario está logueado
    } else {
      setIsLoggedIn(false); // El usuario no está logueado
    }
  }, [dispatch]);

  useEffect(() => {
    // Recuperar productos de la API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products/");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching the products", error);
      }
    };
    fetchProducts();
  }, []);

  // Sincronizar el carrito con el localStorage cada vez que cambia el estado de cartItems
  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(cartItems));
  }, [cartItems]);

  const burgers = products.filter((product) => product.category === "BURGER");
  const frying = products.filter((product) => product.category === "FRYING");
  const drinks = products.filter((product) => product.category === "DRINK");
  const desserts = products.filter((product) => product.category === "DESSERT");

  const [selectedAll, setSelectedAll] = useState("bg-yellow-500");
  const [selectedBurger, setSelectedBurger] = useState("bg-white");
  const [selectedFries, setSelectedFries] = useState("bg-white");
  const [selectedDrink, setSelectedDrink] = useState("bg-white");
  const [selectedDesserts, setSelectedDesserts] = useState("bg-white");

  const [showDivAll, setShowDivAll] = useState("");
  const [showDivBurger, setShowDivBurger] = useState("");
  const [showDivFries, setShowDivFries] = useState("");
  const [showDivDrink, setShowDivDrink] = useState("");
  const [showDivDesserts, setShowDivDesserts] = useState("");

  const addToCart = (product) => {
    if (!isLoggedIn) { // Cambia isUserLoggedIn a isLoggedIn
      setIsLoggedIn(false);
      setisOpenRegisterModal(true); // Abre el modal si el usuario no está logueado
      return; // Salimos de la función para no añadir el producto al carrito
    }

    const existingItem = cartItems.find(
      (item) => item.nameProduct === product.nameProduct
    );

    if (existingItem) {
      existingItem.quantity += 1; // Incrementar la cantidad si el producto ya está en el carrito
      setCartItems([...cartItems]); // Actualizar el estado para reconocer el cambio
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        {
          ...product,
          quantity: 1,
          idProduct: product.id,
          backgroundImage: product.img,
        },
      ]); // Agregar nuevo producto
    }
    setIsModalOpen(true); // Abrir el modal cuando se añade el producto
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSendCart = () => {
    console.log("Sending cart items:", cartItems);
    dispatch(saveCartProducts(cartItems));
    navigate("/sendOrder");
    setIsModalOpen(false); // Cierra el modal después de enviar el carrito
  };

  const handleQuantityChange = (index, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = newQuantity; // Actualiza la cantidad del producto
      return updatedItems;
    });
  };

  const handleRemoveAll = () => {
    setCartItems([]); // Vacía el carrito
  };

  console.log(cartItems);



  return (
    <div className="bground flex flex-col min-h-screen">
      <div className="mb-[70px] mt-[150px]">
        <div className="flex flex-col gap-5 mx-5 justify-center items-center">
          <div className="flex flex-row gap-5 flex-wrap justify-center">
            <button
              onClick={() => {
                setSelectedBurger("bg-white");
                setSelectedFries("bg-white");
                setSelectedDrink("bg-white");
                setSelectedDesserts("bg-white");
                setSelectedAll("bg-yellow-500");
                setShowDivBurger("");
                setShowDivFries("");
                setShowDivDrink("");
                setShowDivDesserts("");
              }}
            >
              <div
                className={`shadowButton ${selectedAll} p-2 w-16 flex flex-col items-center justify-center h-16 rounded-lg`}
              >
                <h1 className="text-2xl font-extrabold">ALL</h1>
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedAll("bg-white");
                setSelectedFries("bg-white");
                setSelectedDrink("bg-white");
                setSelectedDesserts("bg-white");
                setSelectedBurger("bg-yellow-500");
                setShowDivBurger("");
                setShowDivFries("hidden");
                setShowDivDrink("hidden");
                setShowDivDesserts("hidden");
              }}
            >
              <div
                className={`shadowButton ${selectedBurger} p-2 w-16 rounded-lg`}
              >
                <img src={image1} alt="Burger" />
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedBurger("bg-white");
                setSelectedAll("bg-white");
                setSelectedDrink("bg-white");
                setSelectedDesserts("bg-white");
                setSelectedFries("bg-yellow-500");
                setShowDivBurger("hidden");
                setShowDivFries("");
                setShowDivDrink("hidden");
                setShowDivDesserts("hidden");
              }}
            >
              <div
                className={`shadowButton ${selectedFries} p-2 w-16 rounded-lg`}
              >
                <img src={image2} alt="Fries" />
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedBurger("bg-white");
                setSelectedFries("bg-white");
                setSelectedAll("bg-white");
                setSelectedDesserts("bg-white");
                setSelectedDrink("bg-yellow-500");
                setShowDivBurger("hidden");
                setShowDivFries("hidden");
                setShowDivDrink("");
                setShowDivDesserts("hidden");
              }}
            >
              <div
                className={`shadowButton ${selectedDrink} p-2 w-16 rounded-lg`}
              >
                <img src={image} alt="Drink" />
              </div>
            </button>

            <button
              onClick={() => {
                setSelectedBurger("bg-white");
                setSelectedFries("bg-white");
                setSelectedDrink("bg-white");
                setSelectedAll("bg-white");
                setSelectedDesserts("bg-yellow-500");
                setShowDivBurger("hidden");
                setShowDivFries("hidden");
                setShowDivDrink("hidden");
                setShowDivDesserts("");
              }}
            >
              <div
                className={`shadowButton ${selectedDesserts} p-2 w-16 rounded-lg`}
              >
                <img src={image3} alt="Desserts" />
              </div>
            </button>
          </div>

          {/* Render Burgers */}
          <div className={`${showDivBurger} mb-[100px]`}>
            <h1 className="shadow text-5xl text-yellow-500 text-center font-extrabold mb-10">
              BURGERS
            </h1>
            <div className="gaga flex flex-wrap gap-10 w-full justify-center">
              {burgers.map((hamburguer) => (
                <FoodCards
                  key={hamburguer.nameProduct}
                  name={hamburguer.nameProduct}
                  description={hamburguer.details}
                  price={hamburguer.priceProduct}
                  backgroundImage={hamburguer.img}
                  typeIcon={image1}
                  onClick={() => addToCart(hamburguer)} // Add to cart
                />
              ))}
            </div>
          </div>

          {/* Render Fried */}
          <div className={`${showDivFries} mb-[100px]`}>
            <h1 className="shadow text-5xl text-yellow-500 text-center font-extrabold mb-10">
              FRIES
            </h1>
            <div className="gaga flex flex-wrap gap-10 w-full justify-center">
              {frying.map((fry) => (
                <FoodCards
                  key={fry.nameProduct}
                  name={fry.nameProduct}
                  description={fry.details}
                  price={fry.priceProduct}
                  backgroundImage={fry.img}
                  typeIcon={image2}
                  onClick={() => addToCart(fry)} // Add to cart
                />
              ))}
            </div>
          </div>

          {/* Render Drinks */}
          <div className={`${showDivDrink} mb-[100px]`}>
            <h1 className="shadow text-5xl text-yellow-500 text-center font-extrabold mb-10">
              DRINKS
            </h1>
            <div className="gaga flex flex-wrap gap-10 w-full justify-center">
              {drinks.map((drink) => (
                <FoodCards
                  key={drink.nameProduct}
                  name={drink.nameProduct}
                  description={drink.details}
                  price={drink.priceProduct}
                  backgroundImage={drink.img}
                  typeIcon={image}
                  onClick={() => addToCart(drink)} // Add to cart
                />
              ))}
            </div>
          </div>

          {/* Render Desserts */}
          <div className={`${showDivDesserts} mb-[100px]`}>
            <h1 className="shadow text-5xl text-yellow-500 text-center font-extrabold mb-10">
              DESSERTS
            </h1>
            <div className="gaga flex flex-wrap gap-10 w-full justify-center">
              {desserts.map((dessert) => (
                <FoodCards
                  key={dessert.nameProduct}
                  name={dessert.nameProduct}
                  description={dessert.details}
                  price={dessert.priceProduct}
                  backgroundImage={dessert.img}
                  typeIcon={image3}
                  onClick={() => addToCart(dessert)} // Add to cart
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Cart */}
      {isModalOpen && (
        <CartModal
          cartItems={cartItems}
          onRemoveFromCart={removeFromCart}
          onQuantityChange={handleQuantityChange}
          onSendCart={handleSendCart}
          onClose={() => setIsModalOpen(false)}
          onRemoveAll={handleRemoveAll}
        />
      )}

      {isOpenRegisterModal && (<ModalRegister />)}
    </div>
  );
}

export default MenuView;
