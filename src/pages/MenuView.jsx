import React, { useEffect, useState } from "react";
import FoodCards from "../components/FoodCards";
import drink from "../assets/soft-drink.png"; // Icon for drinks
import burger from "../assets/burger.png"; // Icon for hamburgers
import fries from "../assets/potato-fries.png"; // Icon for sides
import dessertsIcon from "../assets/cake_icon.png";
import axios from "axios";
import CartModal from "../components/CartModal"; // Import your modal component
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveCartProducts } from "../redux/actions/cartActions";

const iconMap = {
  burger: burger,
  drink: drink,
  frying: fries,
  dessert: dessertsIcon,
};

function MenuView() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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
    const existingItem = cartItems.find(
      (item) => item.nameProduct === product.nameProduct
    );

    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if product is already in cart
      setCartItems([...cartItems]); // Update state to recognize change
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        {
          ...product,
          quantity: 1,
          idProduct: product.id,
          backgroundImage: product.img,
        },
      ]); // Add new product
    }
    setIsModalOpen(true); // Open modal when product is added
  };

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleSendCart = () => {
    console.log("Sending cart items:", cartItems);
    dispatch(saveCartProducts(cartItems));
    navigate("/sendOrder")
    setIsModalOpen(false); // Close modal after sending
  };

  const handleQuantityChange = (index, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = [...prevItems];
      updatedItems[index].quantity = newQuantity; // Update product quantity
      return updatedItems;
    });
  };

  const handleRemoveAll = () => {
    setCartItems([]); // Vacía el carrito
  };

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
                <img src={burger} alt="Burger" />
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
                <img src={fries} alt="Fries" />
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
                <img src={drink} alt="Drink" />
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
                <img src={dessertsIcon} alt="Desserts" />
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
                  typeIcon={iconMap[hamburguer.category]}
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
              {frying.map((side) => (
                <FoodCards
                  key={side.nameProduct}
                  name={side.nameProduct}
                  description={side.details}
                  price={side.priceProduct}
                  backgroundImage={side.img}
                  typeIcon={iconMap[side.category]}
                  onClick={() => addToCart(side)} // Add to cart
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
              {drinks.map((beverage) => (
                <FoodCards
                  key={beverage.nameProduct}
                  name={beverage.nameProduct}
                  description={beverage.details}
                  price={beverage.priceProduct}
                  backgroundImage={beverage.img}
                  typeIcon={iconMap[beverage.category]}
                  onClick={() => addToCart(beverage)} // Add to cart
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
                  typeIcon={iconMap[dessert.category]}
                  onClick={() => addToCart(dessert)} // Add to cart
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={() => setIsModalOpen(false)} // Close modal
          onSendCart={handleSendCart} // Logic to send the cart
          onRemoveFromCart={removeFromCart} // Remove from cart
          onQuantityChange={handleQuantityChange} // Handle quantity changes
          onRemoveAll={handleRemoveAll} // Handle removing all items
        />
      )}
    </div>
  );
}

export default MenuView;
