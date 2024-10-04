import React from "react"; 
import Button from "./Button"; // Asegúrate de importar el botón correctamente

const Ticket = ({ firstName, lastName, dateTime, status, products, total, onClick, buttonText1, buttonText2, onClick2 }) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-lg flex flex-col w-[20%]">
      <h3 className="text-lg font-semibold text-black">{`${firstName} ${lastName}`}</h3>
      <p className="text-gray-700">{dateTime}</p>
      <ul className="mt-2">
        {products.map((item, index) => (
          <li key={index} className="text-sm text-black">
            {item.product.name} (x{item.quantity})
          </li>
        ))}
      </ul>
      <p className="mt-2 font-bold text-lg text-black">${total.toFixed(2)}</p>
      
      {/* Aquí agregamos los botones al final del ticket */}
      <div className="flex w-full space-x-2 mt-4">
        <Button 
          onClick={onClick} 
          text={buttonText1} 
          backgroundColor="bg-green-500 hover:bg-green-700" // Cambiado a verde
          borderColor="border-green-500" // Cambiado a verde
          arrowColor="text-white"
        />
        <Button 
          onClick={onClick2} 
          text="Cancel" 
          backgroundColor="bg-red-500 hover:bg-red-700" // Cambiado a rojo
          borderColor="border-red-500" // Cambiado a rojo
          arrowColor="text-white"
        />
      </div>
    </div>
  );
};

export default Ticket;