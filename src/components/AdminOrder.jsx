import React, { useEffect, useState } from "react";
import Ticket from "../components/Ticket"; // Asegúrate de que la ruta sea correcta

const AdminOrder = () => {
  const [customers, setCustomers] = useState([
    {
      id: 1,
      firstName: "Juan",
      lastName: "Pérez",
      orders: [
        {
          id: 1,
          products: [
            {
              id: 1,
              product: { name: "Oklahoma", price: 8.99 },
              quantity: 2,
            }, // 2 x Oklahoma
            {
              id: 2,
              product: { name: "Veggie Burger", price: 8.99 },
              quantity: 1,
            }, // 1 x Veggie Burger
          ],
          total: 8.99 * 2 + 8.99 * 1,
          dateTime: "2024-09-29T12:30:00",
          status: "cooking",
          orderType: "delivery",
        },
        ,
        {
          id: 2,
          products: [
            {
              id: 1,
              product: { name: "Cheddar Bacon Fries", price: 5.99 },
              quantity: 2,
            }, // 2 x Oklahoma
            {
              id: 2,
              product: { name: "Veggie Burger", price: 8.99 },
              quantity: 1,
            }, // 1 x Veggie Burger
          ],
          total: 8.99 * 2 + 8.99 * 1,
          dateTime: "2024-09-29T12:30:00",
          status: "cooking",
          orderType: "delivery",
        },
      ],
    },
    {
      id: 2,
      firstName: "María",
      lastName: "Gómez",
      orders: [
        {
          id: 2,
          products: [
            {
              id: 3,
              product: { name: "American", price: 7.49 },
              quantity: 1,
            }, // 1 x American
            {
              id: 4,
              product: { name: "Cheddar Bacon Fries", price: 5.99 },
              quantity: 2,
            }, // 2 x Cheddar Bacon Fries
            {
              id: 5,
              product: { name: "Coca", price: 1.99 },
              quantity: 1,
            }, // 1 x Coca
          ],
          total: 7.49 * 1 + 5.99 * 2 + 1.99 * 1,
          dateTime: "2024-09-29T12:45:00",
          status: "ready for delivery",
          orderType: "takeout",
        },
      ],
    },
    {
      id: 3,
      firstName: "Luis",
      lastName: "Martínez",
      orders: [
        {
          id: 3,
          products: [
            {
              id: 6,
              product: { name: "Voyager", price: 9.99 },
              quantity: 1,
            }, // 1 x Voyager
            {
              id: 7,
              product: { name: "Cheeseburger", price: 10.49 },
              quantity: 1,
            }, // 1 x Cheeseburger
            {
              id: 8,
              product: { name: "Coca", price: 1.99 },
              quantity: 3,
            }, // 3 x Coca
          ],
          total: 9.99 * 1 + 10.49 * 1 + 1.99 * 3,
          dateTime: "2024-09-29T13:00:00",
          status: "ready for delivery",
          orderType: "dine-in",
        },
      ],
    },
    {
      id: 4,
      firstName: "Carlos",
      lastName: "Sánchez",
      orders: [
        {
          id: 4,
          products: [
            {
              id: 9,
              product: { name: "Oklahoma", price: 8.99 },
              quantity: 1,
            }, // 1 x Oklahoma
            {
              id: 10,
              product: { name: "Coca", price: 1.99 },
              quantity: 2,
            }, // 2 x Coca
          ],
          total: 8.99 * 1 + 1.99 * 2,
          dateTime: "2024-09-29T14:00:00",
          status: "delivered",
          orderType: "delivery",
        },
      ],
    },
    {
      id: 5,
      firstName: "Ana",
      lastName: "López",
      orders: [
        {
          id: 5,
          products: [
            {
              id: 11,
              product: { name: "American", price: 7.49 },
              quantity: 2,
            }, // 2 x American
            {
              id: 12,
              product: { name: "Cheeseburger", price: 10.49 },
              quantity: 1,
            }, // 1 x Cheeseburger
          ],
          total: 7.49 * 2 + 10.49 * 1,
          dateTime: "2024-09-29T15:30:00",
          status: "delivered",
          orderType: "dine-in",
        },
      ],
    },
    {
      id: 6,
      firstName: "Pedro",
      lastName: "Ramírez",
      orders: [
        {
          id: 6,
          products: [
            {
              id: 13,
              product: { name: "Oklahoma", price: 8.99 },
              quantity: 1,
            }, // 1 x Oklahoma
            {
              id: 14,
              product: { name: "Voyager", price: 9.99 },
              quantity: 1,
            }, // 1 x Voyager
            {
              id: 15,
              product: { name: "Pepsi", price: 1.99 },
              quantity: 2,
            }, // 2 x Pepsi
          ],
          total: 8.99 * 1 + 9.99 * 1 + 1.99 * 2,
          dateTime: "2024-09-29T16:00:00",
          status: "delivered",
          orderType: "takeout",
        },
      ],
    },
  ]);

  const updateOrderStatus = (customerId, orderId, newStatus) => {
    const updatedCustomers = customers.map((customer) => {
      // Verificamos si el customer es el correcto
      if (customer.id === customerId) {
        // Hacemos una copia de los orders
        const updatedOrders = customer.orders.map((order) => {
          // Verificamos si es el order correcto
          if (order.id === orderId) {
            // Retornamos una copia del order con el nuevo status
            return {
              ...order,
              status: newStatus,
            };
          }
          return order; // Retornamos el order sin cambios si no es el correcto
        });

        // Retornamos una copia del customer con los orders actualizados
        return {
          ...customer,
          orders: updatedOrders,
        };
      }
      return customer; // Retornamos el customer sin cambios si no es el correcto
    });

    // Actualizamos el estado con el nuevo array
    setCustomers(updatedCustomers);
  };

  const handleCancelOrder = (order) => {
    updateOrderStatus(order.clientId, order.orderId, "CANCELED");
  };

  const handleCookingToReady = (order) => {
    updateOrderStatus(order.clientId, order.orderId, "ready for delivery");
  };

  const handleReadyToDelivered = (order) => {
    updateOrderStatus(order.clientId, order.orderId, "delivered");
    console.log(order.clientId);
    console.log(order.orderId);
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month} ${hours}:${minutes} hs`;
  };

  const orders = customers.flatMap((customer) =>
    customer.orders.map((order) => ({
      clientId: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      dateTime: formatDateTime(order.dateTime),
      status: order.status,
      products: order.products,
      total: order.total,
      orderType: order.orderType,
      orderId: order.id,
    }))
  );

  const cookingOrders = orders.filter((order) => order.status === "cooking");
  console.log(cookingOrders);

  const readyOrders = orders.filter(
    (order) => order.status === "ready for delivery"
  );
  const deliveredOrders = orders.filter(
    (order) => order.status === "delivered"
  );

  console.log(readyOrders);

  // Filtrar los pedidos
  const dineInOrders = readyOrders.filter(
    (order) => order.orderType === "dine-in"
  );
  const takeoutOrders = readyOrders.filter(
    (order) => order.orderType === "takeout"
  );
  const deliveryOrders = readyOrders.filter(
    (order) => order.orderType === "delivery"
  );

  // Total acumulado de todos los pedidos entregados
  const totalRevenue = deliveredOrders.reduce(
    (acc, order) => acc + order.total,
    0
  );

  useEffect(() => {
    // Aquí podrías hacer algo al cambiar el estado de los clientes
    console.log("Customers updated:", customers);
  }, [customers]);

  return (
    <div className="text-white p-6 mt-[100px] flex flex-col items-center gap-6 w-full bg-[#111827]">
      <h1 className="text-4xl font-bold mb-6">Orders Overview</h1>

      {/* Cooking Orders Section */}
      <section className="w-full">
        <h2 className="text-3xl text-center font-semibold mb-4">
          In Pocess
        </h2>
        <div className="border border-gray-700 p-4 rounded-lg flex gap-4 justify-center bg-yellow-500">
          {cookingOrders.length > 0 ? (
            cookingOrders.map((order) => (
              <Ticket
                key={order.orderId}
                firstName={order.firstName}
                lastName={order.lastName}
                dateTime={order.dateTime}
                status={order.status}
                products={order.products}
                total={order.total}
                onClick={() => handleCookingToReady(order)}
                onClick2={() => handleCancelOrder(order)}
                buttonText1={"Ready"}
              />
            ))
          ) : (
            <p className="text-center w-full text-white">
              No cooking orders available
            </p>
          )}
        </div>
      </section>

      {/* Ready for Delivery Section */}
      <section className="w-full">
        <h2 className="text-3xl text-center font-semibold mb-4">
          Ready for Delivery
        </h2>
        <div className="flex flex-col gap-6">
          {/* Dine-In Orders */}
          <div className="border border-gray-700 p-4 rounded-lg  bg-yellow-500">
            <h3 className="text-2xl text-center font-bold mb-2">Dine-In</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {dineInOrders.length > 0 ? (
                dineInOrders.map((order) => (
                  <Ticket
                    key={order.orderId}
                    firstName={order.firstName}
                    lastName={order.lastName}
                    dateTime={order.dateTime}
                    status={order.status}
                    products={order.products}
                    total={order.total}
                    onClick={() => handleReadyToDelivered(order)}
                    onClick2={() => handleCancelOrder(order)}
                    buttonText1={"Delivered"}
                  />
                ))
              ) : (
                <p className="text-center w-full text-white">
                  No dine-in orders ready
                </p>
              )}
            </div>
          </div>

          {/* Takeout Orders */}
          <div className="border border-gray-700 p-4 rounded-lg bg-yellow-500">
            <h3 className="text-2xl font-bold mb-2 text-center">Takeout</h3>
            <div className="flex flex-wrap gap-4 justify-center">
              {takeoutOrders.length > 0 ? (
                takeoutOrders.map((order) => (
                  <Ticket
                    key={order.orderId}
                    firstName={order.firstName}
                    lastName={order.lastName}
                    dateTime={order.dateTime}
                    status={order.status}
                    products={order.products}
                    total={order.total}
                    onClick={() => handleReadyToDelivered(order)}
                    onClick2={() => handleCancelOrder(order)}
                    buttonText1={"Delivered"}
                  />
                ))
              ) : (
                <p className="text-center w-full text-white">
                  No takeout orders ready
                </p>
              )}
            </div>
          </div>

          {/* Delivery Orders */}
          <div className="border border-gray-700 p-4 rounded-lg bg-yellow-500">
            <h3 className="text-2xl font-bold mb-2 text-center">Delivery</h3>
            <div className=" flex flex-wrap gap-4 justify-center">
              {deliveryOrders.length > 0 ? (
                deliveryOrders.map((order) => (
                  <Ticket
                    key={order.orderId}
                    firstName={order.firstName}
                    lastName={order.lastName}
                    dateTime={order.dateTime}
                    status={order.status}
                    products={order.products}
                    total={order.total}
                    onClick={() => handleReadyToDelivered(order)}
                    onClick2={() => handleCancelOrder(order)}
                    buttonText1={"Delivered"}
                  />
                ))
              ) : (
                <p className="text-center w-full text-white">
                  No delivery orders ready
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      <div className="mb-4 w-[80%]">
        <h3 className="text-lg font-semibold text-white">Delivery</h3>
        <table className="w-full bg-white border border-gray-300 shadow-lg rounded-t-[500px]">
          {" "}
          {/* Añadir rounded-t-lg aquí */}
          <thead>
            <tr className="bg-yellow-500 border-b border-gray-300">
              <th className="p-2 border-r border-[#1F2937] text-black">
                First Name
              </th>
              <th className="p-2 border-r border-[#1F2937] text-black">
                Last Name
              </th>
              <th className="p-2 border-r border-[#1F2937] text-black">
                Date & Time
              </th>
              <th className="p-2 border-r border-[#1F2937] text-black">
                Products
              </th>
              <th className="p-2 text-black">Total</th>
            </tr>
          </thead>
          <tbody>
            {deliveredOrders.map((order, index) => (
              <tr
                key={index}
                className="bg-white border-b border-[#1F2937] hover:bg-gray-100"
              >
                <td className="p-2 border-r border-[#1F2937] text-black">
                  {order.firstName}
                </td>
                <td className="p-2 border-r border-[#1F2937] text-black">
                  {order.lastName}
                </td>
                <td className="p-2 border-r border-[#1F2937] text-black">
                  {order.dateTime}
                </td>
                <td className="p-2 border-r border-[#1F2937] text-black">
                  {order.products.map((product) => (
                    <div key={product.id}>
                      {product.product.name} x {product.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-2 text-black">${order.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Revenue */}
      <div className="mt-6 text-xl font-bold text-gray-400">
        Total Revenue: ${totalRevenue.toFixed(2)}
      </div>
    </div>
  );
};

export default AdminOrder;
