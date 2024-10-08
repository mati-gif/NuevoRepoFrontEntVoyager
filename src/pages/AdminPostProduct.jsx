import React, { useState } from "react";
import ButtonWaveEffect from "../components/ButtonWaveEffect";
import EditProducts from "../components/EditProducts";
import axios from "axios"; // Asegúrate de instalar Axios: npm install axios

const AdminPostProduct = () => {
  const [categories, setCategories] = useState([
    "BURGER",
    "DRINK",
    "FRIED_FOOD",
    "DESERT",
  ]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    ingredients: "",
    category: "",
    img: "",
  });
  const [activeComponent, setActiveComponent] = useState("form");
   
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Procesa los ingredientes
    const ingredientsArray = formData.ingredients
      .split(", ")
      .map(
        (ingredient) =>
          ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase()
      );

    const updatedFormData = {
      nameProduct: formData.name,
      priceProduct: parseFloat(formData.price),
      category: formData.category,
      details: formData.description,
      img: formData.img,
    };

    try {
      const response = await axios.post(
        "https://challengefinalbackvoyager.onrender.com/api/products/create",
        updatedFormData
      );
      console.log("Product created:", response.data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const formatCategory = (category) => {
    return category
      .replace(/_/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4 mt-[150px]">
      <div className="mb-4 w-full flex flex-col justify-center items-center">
        <div className="flex gap-20">
          <button
            onClick={() => setActiveComponent("form")}
            className={`p-4 font-bold text-xl rounded-lg flex flex-col items-center justify-center transition-all duration-300 
            ${activeComponent === "form" ? "bg-yellow-500 text-gray-800" : "bg-gray-800 text-yellow-500 hover:bg-yellow-500"}`}
          >
            Add Product
          </button>
          <button
            onClick={() => setActiveComponent("edit")}
            className={`p-4 font-bold text-xl rounded-lg flex flex-col items-center justify-center transition-all duration-300 
            ${activeComponent === "edit" ? "bg-yellow-500 text-gray-800" : "bg-gray-800 text-yellow-500 hover:bg-yellow-500"}`}
          >
            Edit Products
          </button>
        </div>
      </div>

      {activeComponent === "form" && (
        <form
          id="productForm"
          onSubmit={handleSubmit}
          className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-4xl w-full flex flex-col gap-4"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-white">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-white"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-white">
              Price:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="ingredients" className="block text-sm font-medium text-white">
              Ingredients (separate with commas and space ", "):
            </label>
            <input
              type="text"
              id="ingredients"
              name="ingredients"
              className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
              value={formData.ingredients}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-white">
              Category:
            </label>
            <select
              id="category"
              name="category"
              className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {formatCategory(category)}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="img" className="block text-sm font-medium text-white">
              Image URL:
            </label>
            <input
              type="url"
              id="img"
              name="img"
              className="mt-1 block w-full p-3 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none transition-all duration-200"
              value={formData.img}
              onChange={handleChange}
              required
            />
          </div>

          <ButtonWaveEffect />
        </form>
      )}

      {activeComponent === "edit" && <EditProducts />}
    </div>
  );
};

export default AdminPostProduct;
