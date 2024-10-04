import React from "react";
import Button from "./Button";

const DeliveryTicket = ({
  firstName,
  lastName,
  address,
  dateTime,
  products = [],
  total,
  onCheckClick,
  onIssueClick,
}) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded-lg flex flex-col w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"> {/* Ajustes para el ancho */}
      <h3 className="text-lg font-semibold text-black">
        {`${firstName} ${lastName}`}
      </h3>
      <p className="text-gray-700">{dateTime}</p>
      <p className="text-gray-500">
        {`${address.street}, ${address.number}, Floor: ${address.floor}, ${address.description}`}
      </p>
      <ul className="mt-2">
        {products.length > 0 ? (
          products.map((item, index) => (
            <li key={index} className="text-sm text-black">
              {item.product.name} (x{item.quantity})
            </li>
          ))
        ) : (
          <li className="text-sm text-gray-500">No products available</li>
        )}
      </ul>
      <p className="mt-2 font-bold text-lg text-black">${total.toFixed(2)}</p>
      <div className="mt-2 flex gap-2"> {/* Añadir flex-wrap para mejorar la disposición */}
        <Button
          onClick={onCheckClick}
          text="Check"
          backgroundColor="bg-green-500 hover:bg-green-700"
          borderColor="border-gray-500"
          arrowColor="text-white"
        />
        <Button
          onClick={onIssueClick}
          text="Issue"
          backgroundColor="bg-red-500 hover:bg-red-700"
          borderColor="border-blue-500"
          arrowColor="text-white"
        />
      </div>
    </div>
  );
};

export default DeliveryTicket;
