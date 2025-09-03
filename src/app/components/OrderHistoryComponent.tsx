"use client";
import { useEffect, useState } from "react";
import { useCart } from "../Context/CartContext";

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

  const {fetchCart} = useCart()

  useEffect(() => {
    const fetchOrders = async () => {
      try {

        const token = localStorage.getItem("token")

        if(!token){
          throw new Error("Token Inválido")
        }

        const res = await fetch("http://localhost:5000/orders/history", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          credentials: "include", // caso precise de cookies/session
        });
        if (!res.ok) throw new Error("Erro ao buscar pedidos");

        const data = await res.json();
        setOrders(data.orders); // <- Aqui pegamos o array "orders"
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrders();
  }, []);

  const handleReorder = async (orderId: number) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para recomprar!");
      return;
    }

    await fetch(`http://localhost:5000/orders/${orderId}/reorder`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    await fetchCart()

    alert("Itens adicionados ao carrinho!");
  } catch (error) {
    console.error("Erro ao recomprar:", error);
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
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
            >
              Recomprar
            </button>

          </div>           

        ))
      )}
    </div>
  );
}
