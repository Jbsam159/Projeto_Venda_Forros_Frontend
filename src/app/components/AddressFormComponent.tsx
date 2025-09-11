// src/components/AddressForm.tsx
"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  cidade: string;
  estado: string;
  numero: string;
  complemento?: string;
}

interface AddressFormProps {
  onAddressChange: (address: Address) => void; // função recebida do pai (CartPage)
}

export default function AddressForm({ onAddressChange }: AddressFormProps) {
  const [cep, setCep] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");

  const buscarCep = async () => {
    try {
      if (cep.length !== 8) {
        alert("Digite um CEP válido com 8 dígitos");
        return;
      }

      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.data.erro) {
        alert("CEP não encontrado!");
        return;
      }

      setLogradouro(response.data.logradouro);
      setBairro(response.data.bairro);
      setCidade(response.data.localidade);
      setEstado(response.data.uf);
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      alert("Erro ao buscar o CEP. Tente novamente.");
    }
  };

  useEffect(() => {

    onAddressChange({
      cep,
      logradouro,
      bairro,
      cidade,
      estado,
      numero,
      complemento,
    });

  }, [cep, logradouro, bairro, cidade, estado, numero, complemento]);

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold">Endereço de Entrega</h2>

      <div> 
        <label htmlFor="cep">CEP:</label>
        <div className="flex space-x-2">
          <input
            type="text"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={buscarCep}
            maxLength={8}
            className="border rounded p-2 flex-1"
            placeholder="Digite seu CEP"
          />
          <button
            type="button"
            onClick={buscarCep}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Buscar
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="logradouro">Logradouro:</label>
        <input placeholder="Logradouro" type="text" value={logradouro} onChange={(e) => setLogradouro(e.target.value)} className="border rounded p-2 w-full" />
      </div>

      <div>
        <label>Bairro:</label>
        <input placeholder="Bairro" type="text" value={bairro} onChange={(e) => setBairro(e.target.value)} className="border rounded p-2 w-full" />
      </div>

      <div>
        <label>Cidade:</label>
        <input placeholder="Cidade" type="text" value={cidade} onChange={(e) => setCidade(e.target.value)} className="border rounded p-2 w-full" />
      </div>

      <div>
        <label>Estado:</label>
        <input placeholder="Estado" type="text" value={estado} onChange={(e) => setEstado(e.target.value)} className="border rounded p-2 w-full" />
      </div>

      <div>
        <label>Número:</label>
        <input placeholder="Número" type="text" value={numero} onChange={(e) => setNumero(e.target.value)} className="border rounded p-2 w-full" />
      </div>

      <div>
        <label>Complemento:</label>
        <input placeholder="Complemento" type="text" value={complemento} onChange={(e) => setComplemento(e.target.value)} className="border rounded p-2 w-full" />
      </div>

    </div>
  );
}
