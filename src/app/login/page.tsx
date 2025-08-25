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
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Não tem conta? <a href="/register">Cadastrar</a>
      </p>
    </div>
  );
};

export default Login;