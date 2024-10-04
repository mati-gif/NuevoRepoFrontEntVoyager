import React from 'react';

const DeliveryModal = ({ isOpen, onClose, onConfirm, title, children, confirmButtonColor }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-11/12 md:w-1/3 lg:w-1/4"> {/* Ajustar el ancho */}
        <h2 className="text-lg font-bold mb-4 text-black">{title}</h2>
        <div className="text-black">{children}</div>
        <div className="flex justify-end mt-4">
          <button 
            onClick={onClose} 
            className="mr-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Decline
          </button>
          <button 
            onClick={onConfirm} 
            className={`px-4 py-2 rounded bg-green-500`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryModal;
