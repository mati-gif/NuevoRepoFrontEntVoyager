import React, { useState } from "react";
import ButtonWaveEffect from "../components/ButtonWaveEffect";

const AdminPostProduct = () => {
  const [categories,setCaregories] = useState(["HAMBURGER", "DRINK", "FRIED_FOOD", "DESERT"]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    ingredients: "",
    category: "",
    img: ""
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Procesar los ingredientes
    const ingredientsArray = formData.ingredients.split(", ")
      .map(ingredient => ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase());
    
    // Actualizar formData con el array de ingredientes
    const updatedFormData = {
      ...formData,
      ingredients: ingredientsArray // Guardar como array
    };

    console.log("Form Data Submitted:", updatedFormData);
    // Aquí puedes agregar la lógica de envío (por ejemplo, llamada a la API)
  };

  // Función para formatear las categorías
  const formatCategory = (category) => {
    return category.replace(/_/g, " ")
                   .toLowerCase()
                   .split(' ')
                   .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                   .join(' ');
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 mt-[100px]">
      <form 
        id="productForm" 
        onSubmit={handleSubmit} 
        className="bg-gray-800 rounded-lg shadow-2xl p-8 max-w-4xl w-full flex flex-col gap-4"
      >
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-white">Name:</label>
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
          <label htmlFor="description" className="block text-sm font-medium text-white">Description:</label>
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
          <label htmlFor="price" className="block text-sm font-medium text-white">Price:</label>
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
          <label htmlFor="ingredients" className="block text-sm font-medium text-white">Ingredients (separate with commas and space ", "):</label>
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
          <label htmlFor="category" className="block text-sm font-medium text-white">Category:</label>
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
                {formatCategory(category)} {/* Formatear la categoría aquí */}
              </option>
            ))}
          </select>
        </div>
        
        <div className="mb-4">
          <label htmlFor="img" className="block text-sm font-medium text-white">Image URL:</label>
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
    </div>
  );
};

export default AdminPostProduct;
