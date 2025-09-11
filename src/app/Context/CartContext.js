"use client"; // obrigatório em contextos no Next.js (para rodar no client)

import { createContext, useContext, useState, useEffect } from "react";
import { getCart, addToCart, updateCartItem, removeFromCart } from "../../service/cartService";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCart(data.items || []);
    } catch (error) {
      console.error("Erro ao carregar carrinho:", error);
    }
  };

  const handleAdd = async (productId, quantity = 1) => {
    await addToCart(productId, quantity);
    toast.success(`Produto adicionado ao carrinho!`);
    fetchCart();
  };

  const handleUpdate = async (productId, quantity) => {
    await updateCartItem(productId, quantity);
    toast.success(`Quantidade autlizada!`);
    fetchCart();
  };

  const handleRemove = async (productId) => {
    await removeFromCart(productId);
    toast.success(`Produto removido do carrinho!`);
    fetchCart();
  };
  return (
    <CartContext.Provider value={{ cart, fetchCart, handleAdd, handleUpdate, handleRemove }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
