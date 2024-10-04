import React from "react";

const CartModal = ({ cartItems, onClose, onSendCart, onRemoveFromCart, onQuantityChange, onRemoveAll }) => {
  return (
    <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-start justify-end z-50">
      <div className="bg-white w-full h-screen sm:w-full md:w-3/4 lg:w-1/3 xl:w-1/4 p-4 rounded-l-lg shadow-lg overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 text-center p-4 bg-gray-200 rounded-t-lg">Your Cart</h2>
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="divide-y divide-gray-300">
              {cartItems.map((item, index) => (
                <li key={item.idProduct} className="flex justify-between items-center py-4 transition-all duration-300 hover:bg-gray-100 rounded-md">
                  <div className="flex items-center">
                    <img
                      src={item.backgroundImage}
                      alt={item.nameProduct}
                      className="w-24 h-24 mr-4 object-cover rounded-lg shadow-md"
                    />
                    <div>
                      <p className="font-semibold">{item.nameProduct}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-gray-600">Quantity: </span>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => onQuantityChange(index, parseInt(e.target.value))}
                          className="w-16 border border-gray-300 rounded-lg ml-2 p-1 text-center focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveFromCart(index)}
                    className="bg-red-500 text-white rounded-lg px-2 py-1 text-xs hover:bg-red-600 transition duration-200"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between items-center p-4">
              <button
                onClick={onRemoveAll}
                className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500 transition duration-200"
              >
                Clear Cart
              </button>
              <button
                onClick={onSendCart}
                className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-200"
              >
                Send Cart
              </button>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="w-full bg-gray-600 text-white py-2 rounded-b-lg hover:bg-gray-700 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartModal;
