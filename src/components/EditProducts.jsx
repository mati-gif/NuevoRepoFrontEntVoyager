import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EditProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null); // Store product to be deleted
    const [isModalOpen, setIsModalOpen] = useState(false); // Control modal visibility

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://challengefinalbackvoyager.onrender.com/api/products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Function to handle product selection for editing
    const handleEditClick = (id) => {
        setSelectedProductId(id);
    };

    // Function to open the modal and set the product to delete
    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setIsModalOpen(true); // Open the modal
    };

    // Function to confirm deletion
    const confirmDelete = async () => {
        try {
            await axios.delete(`https://challengefinalbackvoyager.onrender.com/api/products/delete/${productToDelete}`);
            setProducts(prevProducts => prevProducts.filter(product => product.id !== productToDelete));
            setIsModalOpen(false); // Close the modal
            setSelectedProductId(null); // Deselect product after deletion
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    // Function to close the modal without deleting
    const closeModal = () => {
        setIsModalOpen(false);
        setProductToDelete(null);
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
                            className="w-1/3 h-full object-cover rounded-md mr-4"
                        />
                        <div className="flex-grow">
                            <h2 className="text-xl font-semibold">{product.nameProduct}</h2>
                            <p className="text-gray-700">Price: <span className="font-bold">${product.priceProduct}</span></p>
                            <p className="text-gray-700">Category: <span className="font-bold">{product.category}</span></p>
                            <p className="text-gray-700">Details: <span className="font-bold">{product.details}</span></p>
                            <div className="flex space-x-2 mt-2">
                                <button 
                                    onClick={() => handleEditClick(product.id)} 
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                                >
                                    Edit
                                </button>
                                <button 
                                    onClick={() => handleDeleteClick(product.id)} 
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Render the modal for deletion confirmation */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
                        <p>Are you sure you want to delete this product?</p>
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProducts;
