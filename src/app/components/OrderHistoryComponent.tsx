"use client";
import { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";

import { getOrderHistory, cancelOrder, reorder} from "@/service/orderService";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
}

interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string;
  Product: Product;
}

interface Order {
  id: number;
  userId: number;
  status: string;
  total: string;
  createdAt: string;
  updatedAt: string;
  OrderItems: OrderItem[];
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { fetchCart } = useCart();

  // 🔹 Agora fetchOrders pode ser chamado em qualquer lugar
  const fetchOrders = async () => {
    try {
      const data = await getOrderHistory()
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Chama no carregamento inicial
  useEffect(() => {
    fetchOrders();
  }, []);

  const handleReorder = async (orderId: number) => {
    try {
      await reorder(orderId)
      await fetchCart(); // 🔄 Atualiza o carrinho
      alert("Itens adicionados ao carrinho!");
    } catch (error) {
      console.error("Erro ao recomprar:", error);
    }
  };

  const handleCancel = async (orderId: number) => {
    try {
      
      await cancelOrder(orderId)
      await fetchOrders(); // 🔄 atualiza lista após cancelar
    } catch (error) {
      console.error("Erro ao cancelar pedido:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Histórico de Pedidos</h1>
      {orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
      ) : (
        orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 mb-4 shadow-sm bg-white"
          >
            <h2 className="font-semibold mb-2">
              Pedido #{order.id} - {order.status}
            </h2>
            <p>Total: R$ {order.total}</p>
            <p>
              Criado em: {new Date(order.createdAt).toLocaleDateString("pt-BR")}
            </p>
            <h3 className="mt-2 font-medium">Itens:</h3>
            <ul className="list-disc list-inside">
              {order.OrderItems.map((item) => (
                <li key={item.id}>
                  {item.Product.name} - {item.quantity}x R$ {item.price}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleReorder(order.id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-2 mr-2"
            >
              Recomprar
            </button>

            {order.status !== "cancelado" && (
              <button
                onClick={() => handleCancel(order.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg mt-2"
              >
                Cancelar
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}
