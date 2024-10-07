import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Navigate, useNavigate } from 'react-router-dom';

const EditProducts = () => {
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [productToDelete, setProductToDelete] = useState(null); // Almacena el producto a eliminar
    const [isModalOpen, setIsModalOpen] = useState(false); // Controla la visibilidad del modal
    const [isEditProductOpen, setIsEditProductOpen] = useState(false);
    const [idProductSelected, setIdProductSelected] = useState("");

    const navigate = useNavigate()

    // Estado para los datos del formulario
    const [formData, setFormData] = useState({
        id: "",
        nameProduct: '',
        priceProduct: '',
        category: '',
        details: '',
        img: '',
    });

    // Función para obtener productos de la API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/products/');
                setProducts(response.data);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };
        fetchProducts();
    }, []);

    // Función para manejar la selección de un producto para editar
    const handleEditClick = (id) => {
        setIdProductSelected(id);
        setIsEditProductOpen(true);
    };

    // Función para abrir el modal y establecer el producto a eliminar
    const handleDeleteClick = (id) => {
        setProductToDelete(id);
        setIsModalOpen(true); // Abre el modal
    };

    // Función para confirmar la eliminación
    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/products/delete/${productToDelete}`);
            setProducts(prevProducts => prevProducts.filter(product => product.id !== productToDelete));
            setIsModalOpen(false); // Cierra el modal
            setSelectedProductId(null); // Deselecciona el producto después de eliminar
        } catch (error) {
            console.error('Error al eliminar el producto:', error);
        }
    };

    // Función para cerrar el modal sin eliminar
    const closeModal = () => {
        setIsModalOpen(false);
        setProductToDelete(null);
    };

    // Actualiza formData cuando cambia idProductSelected
    useEffect(() => {
        if (idProductSelected) {
            const productToEdit = products.find((product) => product.id === idProductSelected);
            if (productToEdit) {
                setFormData({
                    id: idProductSelected,
                    nameProduct: productToEdit.nameProduct,
                    priceProduct: productToEdit.priceProduct,
                    category: productToEdit.category,
                    details: productToEdit.details,
                    img: productToEdit.img,
                });
            }
        }
    }, [idProductSelected, products]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log(formData);

    //     try {
    //         const response = await axios.put('http://localhost:8080/api/products/update', formData);
    //         console.log('Producto actualizado:', response.data);
    //         alert('Producto actualizado con éxito!');
    //     } catch (error) {
    //         console.error('Error al actualizar el producto:', error);
    //         alert('Error al actualizar el producto. Por favor, intenta nuevamente.');
    //     } finally {
    //         // Restablecer formData y cerrar el modal de edición
    //         setFormData({
    //             id: idProductSelected,
    //             nameProduct: '',
    //             priceProduct: '',
    //             category: '',
    //             details: '',
    //             img: '',
    //         });
    //         setIsEditProductOpen(false); // Cierra el modal de edición después de enviar
    //         setIdProductSelected(""); // Restablece el ID del producto seleccionado
    //     }
    // };





    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await axios.put('http://localhost:8080/api/products/update', formData);
            console.log('Producto actualizado:', response.data);



            // Actualiza el estado de products con el producto actualizado
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.id === formData.id ? response.data : product
                )
            );

            Swal.fire({
                icon: 'success',
                title: 'The product has been update  succesfully',
                text: 'The product has been update  succesfully',
            });

        } catch (error) {
            console.error('Error al actualizar el producto:', error);

        } finally {
            // Restablecer formData y cerrar el modal de edición
            setFormData({
                id: idProductSelected,
                nameProduct: '',
                priceProduct: '',
                category: '',
                details: '',
                img: '',
            });
            setIsEditProductOpen(false); // Cierra el modal de edición después de enviar
            setIdProductSelected(""); // Restablece el ID del producto seleccionado
        }
    };



    return (

        <div className="bground container mx-auto p-4">
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
                            <p className="text-gray-700">Precio: <span className="font-bold">${product.priceProduct}</span></p>
                            <p className="text-gray-700">Categoría: <span className="font-bold">{product.category}</span></p>
                            <p className="text-gray-700">Detalles: <span className="font-bold">{product.details}</span></p>
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

            {/* Renderizar el modal para la confirmación de eliminación */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Confirmar Eliminación</h2>
                        <p>¿Estás seguro de que quieres eliminar este producto?</p>
                        <div className="mt-4 flex space-x-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                            >
                                Confirmar
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal para editar el producto */}
            {isEditProductOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-600 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Nombre del Producto:</label>
                                <input
                                    type="text"
                                    name="nameProduct"
                                    value={formData.nameProduct}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded w-full px-3 py-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Precio:</label>
                                <input
                                    type="number"
                                    name="priceProduct"
                                    value={formData.priceProduct}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    required
                                    className="border rounded w-full px-3 py-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Categoría:</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded w-full px-3 py-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">Detalles:</label>
                                <input
                                    type="text"
                                    name="details"
                                    value={formData.details}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded w-full px-3 py-2"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-gray-700">URL de Imagen:</label>
                                <input
                                    type="text"
                                    name="img"
                                    value={formData.img}
                                    onChange={handleInputChange}
                                    required
                                    className="border rounded w-full px-3 py-2"
                                />
                            </div>

                            <div className='flex  justify-evenly'>
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded"
                                >
                                    Save Product
                                </button>


                                {/* <button
                                    type="submit"
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                   
                                >
                                    Cancel
                                </button> */}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProducts;
