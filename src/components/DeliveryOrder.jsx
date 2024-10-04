import React, { useState, useEffect } from "react";
import DeliveryTicket from "./DeliveryTicket";
import DeliveryModal from "./DeliveryModal";

const DeliveryOrder = () => {
  const [cadet, setCadet] = useState({
    id: 1,
    firstName: "Francisco",
    lastName: "Paez Lastra",
    order: null,
    availability: true,
  });

  const [customers, setCustomers] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      address: {
        street: "Main St",
        number: 123,
        floor: 2,
        description: "Apartment near the gaga",
      },
      orders: [
        {
          id: 1,
          products: [
            {
              id: 1,
              product: { name: "Oklahoma", price: 8.99 },
              quantity: 2,
            },
            {
              id: 2,
              product: { name: "Veggie Burger", price: 8.99 },
              quantity: 1,
            },
          ],
          total: 8.99 * 2 + 8.99 * 1,
          dateTime: "2024-09-29T12:30:00",
          status: "ready for delivery",
          orderType: "delivery",
          cadet: null,
        },
      ],
    },
    {
      id: 2,
      firstName: "Mary",
      lastName: "Smith",
      address: {
        street: "Oak Avenue",
        number: 456,
        floor: 1,
        description: "House with a red door",
      },
      orders: [
        {
          id: 2,
          products: [
            {
              id: 3,
              product: { name: "American", price: 7.49 },
              quantity: 1,
            },
            {
              id: 4,
              product: { name: "Cheddar Bacon Fries", price: 5.99 },
              quantity: 2,
            },
            {
              id: 5,
              product: { name: "Coca", price: 1.99 },
              quantity: 1,
            },
          ],
          total: 7.49 * 1 + 5.99 * 2 + 1.99 * 1,
          dateTime: "2024-09-29T12:45:00",
          status: "delivered",
          orderType: "delivery",
          cadet: null,
        },
      ],
    },
  ]);

  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [issueDescription, setIssueDescription] = useState("");
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [canceledOrders, setCanceledOrders] = useState([]);

  const orderIdToAssign = 1; // ID of the order to assign

  // Assign the specific order to the cadet
  const assignOrderToCadet = () => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) => ({
        ...customer,
        orders: customer.orders.map((order) => {
          if (order.id === orderIdToAssign) {
            return { ...order, cadet: cadet.id }; // Assign cadet ID to order
          }
          return order;
        }),
      }))
    );

    const assignedOrder = customers
      .flatMap((customer) => customer.orders)
      .find((order) => order.id === orderIdToAssign);

    setCadet((prev) => ({
      ...prev,
      order: assignedOrder, // Assign order to cadet
      availability: false, // Mark cadet as unavailable
    }));
  };

  useEffect(() => {
    assignOrderToCadet();
  }, []);

  // Create a structured orders array
  const orders = customers.flatMap((customer) =>
    customer.orders.map((order) => ({
      clientId: customer.id,
      firstName: customer.firstName,
      lastName: customer.lastName,
      address: customer.address,
      dateTime: new Date(order.dateTime).toLocaleString(),
      status: order.status,
      products: order.products,
      total: order.total,
      orderType: order.orderType,
      orderId: order.id,
      issueDescription: order.issueDescription || "",
      cadetId: order.cadet, // Include cadet ID for filtering
    }))
  );

  const handleDeliveryClick = () => {
    setIsDeliveryModalOpen(true);
  };

  const handleConfirmDelivery = () => {
    const updatedCustomers = customers.map((customer) => ({
      ...customer,
      orders: customer.orders.map((order) => {
        if (order.id === cadet.order.id) {
          return { ...order, status: "delivered" };
        }
        return order;
      }),
    }));

    setCustomers(updatedCustomers);
    setDeliveredOrders((prev) => [...prev, cadet.order]); // Add to delivered orders
    setCadet((prev) => ({ ...prev, availability: true, order: null }));
    setIsDeliveryModalOpen(false);
  };

  const handleReportClick = () => {
    setIsIssueModalOpen(true);
  };

  const handleConfirmIssue = () => {
    const updatedCustomers = customers.map((customer) => ({
      ...customer,
      orders: customer.orders.map((order) => {
        if (order.id === cadet.order.id) {
          return { ...order, status: "canceled", issueDescription };
        }
        return order;
      }),
    }));

    setCustomers(updatedCustomers);
    setCanceledOrders((prev) => [
      ...prev,
      { ...cadet.order, issueDescription },
    ]); // Add to canceled orders
    setCadet((prev) => ({ ...prev, availability: true, order: null }));
    setIssueDescription("");
    setIsIssueModalOpen(false);
  };

  // Filter orders by the specific cadet
  const cadetOrders = orders.filter((order) => order.cadetId === cadet.id);

  return (
    <div className="text-white p-6 mt-[100px] flex flex-col items-center gap-6 w-full bg-[#111827]">
      <h1 className="text-5xl text-center font-bold mb-6">WELCOME {cadet.firstName.toUpperCase()}</h1>
      <h2 className="text-4xl text-center font-bold mb-6">Orders to be delivered</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {cadetOrders
          .filter((order) => order.status === "ready for delivery")
          .map((order) => (
            <DeliveryTicket
              key={order.orderId}
              firstName={order.firstName}
              lastName={order.lastName}
              address={order.address}
              dateTime={order.dateTime}
              products={order.products}
              total={order.total}
              onCheckClick={handleDeliveryClick}
              onIssueClick={handleReportClick}
            />
          ))}
      </div>

      {/* Modal para confirmar entrega */}
      <DeliveryModal
        isOpen={isDeliveryModalOpen}
        onClose={() => setIsDeliveryModalOpen(false)}
        onConfirm={handleConfirmDelivery}
        title="Confirm Delivery"
      >
        <p>Are you sure the order has been delivered?</p>
      </DeliveryModal>

      {/* Modal para reportar un problema */}
      <DeliveryModal
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
        onConfirm={handleConfirmIssue}
        title="Report an Issue"
      >
        <textarea
          rows={4}
          value={issueDescription}
          onChange={(e) => setIssueDescription(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Describe the issue..."
        />
      </DeliveryModal>

      {/* Tabla para pedidos entregados */}
      <div className="mt-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Delivered Orders</h2>
        <table className="w-full bg-white border border-gray-300 shadow-none">
          <thead>
            <tr className="bg-yellow-500 border-b border-gray-300">
              <th className="p-2 border-r border-[#1F2937] text-black">Name</th>
              <th className="p-2 border-r border-[#1F2937] text-black">
                Address
              </th>
              <th className="p-2 border-r border-[#1F2937] text-black">
                Products
              </th>
              <th className="p-2 text-black">Total</th>
            </tr>
          </thead>
          <tbody>
            {cadetOrders.filter((order) => order.status === "delivered")
              .length > 0 ? (
              cadetOrders
                .filter((order) => order.status === "delivered")
                .map((order, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="p-2 border-r border-[#1F2937] text-black">{`${order.firstName} ${order.lastName}`}</td>
                    <td className="p-2 border-r border-[#1F2937] text-black">{`${order.address.street} ${order.address.number}, Floor: ${order.address.floor}`}</td>
                    <td className="p-2 border-r border-[#1F2937] text-black">
                      {order.products.map((product) => (
                        <div key={product.id}>
                          {`${product.product.name} (x${product.quantity})`}
                        </div>
                      ))}
                    </td>
                    <td className="p-2 text-black">
                      ${order.total.toFixed(2)}
                    </td>
                  </tr>
                ))
            ) : (
              <tr className="bg-white border-b">
                <td colSpan="4" className="p-2 text-center text-gray-500">
                  No delivered orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Tabla para pedidos cancelados */}
      <div className="mt-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Canceled Orders</h2>
        <table className="w-full bg-white border border-gray-300 shadow-none">
          <thead>
            <tr className="bg-red-500 border-b border-gray-300">
              <th className="p-2 border-r border-[#1F2937] text-black">Name</th>
              <th className="p-2 border-r border-[#1F2937] text-black">
                Address
              </th>
              <th className="p-2 border-r border-[#1F2937] text-black">
                Products
              </th>
              <th className="p-2 text-black">Issue Description</th>{" "}
              {/* Update header */}
            </tr>
          </thead>
          <tbody>
            {cadetOrders.filter((order) => order.status === "canceled").length >
            0 ? (
              cadetOrders
                .filter((order) => order.status === "canceled")
                .map((order, index) => (
                  <tr key={index} className="bg-white border-b">
                    <td className="p-2 border-r border-[#1F2937] text-black">{`${order.firstName} ${order.lastName}`}</td>
                    <td className="p-2 border-r border-[#1F2937] text-black">{`${order.address.street} ${order.address.number}, Floor: ${order.address.floor}`}</td>
                    <td className="p-2 border-r border-[#1F2937] text-black">
                      {order.products.map((product) => (
                        <div key={product.id}>
                          {`${product.product.name} (x${product.quantity})`}
                        </div>
                      ))}
                    </td>
                    <td className="p-2 text-black">{order.issueDescription}</td>{" "}
                    {/* Show issue description */}
                  </tr>
                ))
            ) : (
              <tr className="bg-white border-b">
                <td colSpan="4" className="p-2 text-center text-gray-500">
                  No canceled orders
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DeliveryOrder;
