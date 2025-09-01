"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"
import api from "../../service/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token); // Guarda o token para chamadas futuras
      router.push("/"); // Redireciona para home
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao logar");
    }
  };

return (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Login
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200"
        >
          Entrar
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm text-center mt-4">{error}</p>
      )}

      <p className="text-sm text-gray-600 text-center mt-6">
        Não tem conta?{" "}
        <a
          href="/register"
          className="text-indigo-500 font-semibold hover:underline"
        >
          Cadastrar
        </a>
      </p>
    </div>
  </div>
);

};

export default Login;