"use client";

import { useCart } from "../Context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  description: string
  imageUrl: string
}

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  Product: Product;
}

export default function CartPage() {
  const { cart, handleUpdate, handleRemove, handleClear } = useCart();

  const total = cart.reduce(
    (acc: number, item: CartItem) => acc + item.Product.price * item.quantity,
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Meu Carrinho</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul>
            {cart.map((item: CartItem) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-2 border-b"
              >
                <div>
                  <h2>{item.Product.name}</h2>
                  <img src={`http://localhost:5000${item.Product.imageUrl}`} alt={item.Product.name} className="w-32 h-32 object-cover rounded"/>
                  <p>Descrição: {item.Product.description}</p>
                  <p>Preço: R$ {item.Product.price}</p>
                  <p>Qtd: {item.quantity}</p>

                  <button
                    className="bg-gray-300 px-2 py-1 rounded mr-2"
                    onClick={() =>
                      handleUpdate(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>

                  <button
                    className="bg-gray-300 px-2 py-1 rounded"
                    onClick={() =>
                      handleUpdate(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>

                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded ml-4"
                    onClick={() => handleRemove(item.productId)}
                  >
                    Remover
                  </button>
                </div>

              </li>
            ))}
          </ul>

          <h2 className="mt-4 font-bold text-lg">Total: R$ {total}</h2>

        </>
      )}
    </div>
  );
}
