// src/services/cartService.js
import axios from "axios";

const API_URL = "http://localhost:5000/cart"; // ajuste se necessário

export const getCart = async () => {
  const res = await axios.get(`${API_URL}/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await axios.post(`${API_URL}/add`, { productId, quantity }, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return res.data;
};

export const updateCartItem = async (productId, quantity) => {
  const res = await axios.put(`${API_URL}/update`, { productId, quantity }, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return res.data;
};

export const removeFromCart = async (productId) => {
  const res = await axios.delete(`${API_URL}/delete/${productId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return res.data;
};

