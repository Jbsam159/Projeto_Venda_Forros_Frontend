"use client";

import { useCart } from "../Context/CartContext";
import {useState} from "react"
import {createOrder} from "../../service/orderService"

import OrderHistoryComponent from "../components/OrderHistoryComponent";
import  AddressFormComponent, {Address} from "../components/AddressFormComponent";

import {sendOrderWhatsApp} from "../utils/whatsapp"

import toast from "react-hot-toast";
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
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState<Address | null>(null);
  const total = cart.reduce(
    (acc: number, item: CartItem) => acc + item.Product.price * item.quantity,
    0
  );

  // Estados para endereço
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");


  const handleCheckout = async () => {

    setLoading(true)
    setMessage("") 

    try {

      const token = localStorage.getItem("token")

      if (!token) {
        alert("Você precisa estar logado para finalizar a compra!");
        return;
      }

      const orderData = {
        cep: address!.cep,
        logradouro: address!.logradouro,
        numero: address!.numero,
        complemento: address!.complemento,
        bairro: address!.bairro,
        cidade: address!.cidade,
        estado: address!.estado,
      };

      const data = await createOrder(token, orderData);

      console.log("Resposta completa da API:", data);

      toast.success("Pedido Criado Com Sucesso")
      sendOrderWhatsApp(data.order)

    } catch (error: any) {

      toast.error(`❌ Erro ao criar pedido: ${error.message}`);

    }

  }

return (
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold mb-6 text-center">Meu Carrinho</h1>

    {cart.length === 0 ? (
      <p className="text-gray-600">Seu carrinho está vazio.</p>
    ) : (
      <>
        <ul className="space-y-4">
          {cart.map((item: CartItem) => (
            <li
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md rounded-xl p-4"
            >
              {/* Imagem */}
              <img
                src={`http://localhost:5000${item.Product.imageUrl}`}
                alt={item.Product.name}
                className="w-48 object-cover rounded-lg"
              />

              {/* Informações do produto */}
              <div className="flex-1 px-4">
                <h2 className="font-semibold text-lg">{item.Product.name}</h2>
                <p className="text-gray-500 text-sm">
                  {item.Product.description}
                </p>
                <p className="mt-1 font-medium text-gray-800">
                  R$ {item.Product.price}
                </p>
              </div>

              {/* Controles */}
              <div className="flex flex-col items-end space-y-2">
                {/* Quantidade */}
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                    onClick={() =>
                      handleUpdate(item.productId, item.quantity - 1)
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                    onClick={() =>
                      handleUpdate(item.productId, item.quantity + 1)
                    }
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p className="font-semibold text-gray-900">
                  R$ {item.Product.price * item.quantity}
                </p>

                {/* Botão remover */}
                <button
                  className="text-red-500 hover:text-red-700 text-sm"
                  onClick={() => handleRemove(item.productId)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>

        {/* Resumo do carrinho */}
        <div className="mt-8 bg-white shadow-md rounded-xl p-6">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total:</span>
            <span>R$ {total}</span>
          </div>

          <AddressFormComponent onAddressChange={(addr: Address) => setAddress(addr)} />

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition"
          >
            {loading ? "Processando..." : "Finalizar Pedido"}
          </button>

          {message && (
            <p className="mt-3 text-center text-sm text-gray-600">{message}</p>
          )}
        </div>
      </>
    )}

    <OrderHistoryComponent />

  </div>

  );

}
