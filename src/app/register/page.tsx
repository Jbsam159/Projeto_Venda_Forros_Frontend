"use client";

import {useState} from "react"
import { useRouter } from "next/navigation"
import api from "../../service/api"

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) =>{

    e.preventDefault()
    setError("")
    try {
      await api.post("/auth/register", {name, email, password})
      router.push("/login")
    } catch (error: any) {
      console.log(error);
      setError(error.response?.data?.error || "Erro ao Cadastrar");
    }

  }

  return(

  <div className="flex flex-col items-center justify-center min-h-screen">
  <div className="w-full max-w-sm bg-white rounded-lg shadow-md p-8">
    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro</h2>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Nome do Usuário"
        value={name}
        onChange={e => setName(e.target.value)}
        required
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
      />
      <input
        type="email"
        placeholder="Email do Usuário"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
      />
      <button
        type="submit"
        className="bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
      >
        Cadastrar
      </button>
    </form>
    {error && (
      <p className="mt-4 text-red-500 text-sm text-center">
        {error}
      </p>
    )}
    <p className="mt-6 text-center text-gray-600">
      Já tem conta? <a href="/login" className="text-blue-600 hover:underline">Entrar</a>
    </p>
  </div>
</div>

  )

}

export default Register
