import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null); // Initially no product is selected

    const handleDelete = (id) => {
        // Here you can add an API call to delete the product if needed
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
        setSelectedProductId(null); // Deselect product after deletion
    };

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Function to handle product selection
    const handleEditClick = (id) => {
        setSelectedProductId(id); // Set the selected product ID for editing
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4 text-white">Edit Products</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map(product => (
                    <div key={product.id} className="flex h-60 p-4 border rounded-lg shadow-md bg-white">
                        <img 
                            src={product.img} 
                            alt={product.nameProduct} 
                            className="w-1/3 h-full object-cover rounded-md mr-4" // Set image to take up 1/3 of the card
                        />
                        <div className="flex-grow">
                            <h2 className="text-xl font-semibold">{product.nameProduct}</h2>
                            <p className="text-gray-700">Price: <span className="font-bold">${product.priceProduct}</span></p>
                            <p className="text-gray-700">Category: <span className="font-bold">{product.category}</span></p>
                            <p className="text-gray-700">Details: <span className="font-bold">{product.details}</span></p>
                            {/* Add buttons for editing and deleting */}
                            <div className="flex space-x-2 mt-2">
                                <button 
                                    onClick={() => handleEditClick(product.id)} 
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDelete(product.id)} 
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Render the edit form if a product is selected */}
            {selectedProductId && <div className="mt-4"> {/* Your edit form goes here */} </div>}
        </div>
    );
};

export default EditProducts;
