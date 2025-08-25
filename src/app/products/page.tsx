"use client";

import { useEffect, useState } from "react";
import api from "../../service/api"

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;

};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        // Como já configurou baseURL em /service/api,
        // basta passar só o path da rota:
        const res = await api.get("/products/all");
        setProducts(res.data.products); // Axios já retorna JSON no data
      }catch (err: any) {
        console.error("Erro ao carregar produtos:", err);
        setError("Não foi possível carregar os produtos.");
        setProducts([])
      }finally {
        setLoading(false);
      }
  }

  fetchProducts();
}, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        Lista de Produtos
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              {product.name}
            </h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <span className="text-lg font-bold text-green-600 mb-4">
              R$ {(product.price)}
            </span>
            <button className="mt-auto w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition">
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}