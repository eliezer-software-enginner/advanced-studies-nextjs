"use client";

import { Produto } from "@/types/global";
import { useState } from "react";

interface ProductFormProps {
  onSave: (produto: Produto) => void;
  onCancel: () => void;
  initialData?: Produto;
}

export default function ProductForm({ onSave, onCancel, initialData }: ProductFormProps) {
  const [nome, setNome] = useState(initialData?.nome || "");
  const [descricao, setDescricao] = useState(initialData?.descricao || "");
  const [preco, setPreco] = useState(initialData?.preco.toString() || "");
  const [categoria, setCategoria] = useState(initialData?.categoria || "");
  const [imagemUrl, setImagemUrl] = useState(initialData?.imagemUrl || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoProduto: Produto = {
      id: initialData?.id || `prod_${Date.now()}`,
      nome,
      descricao,
      preco: parseFloat(preco.replace(",", ".")),
      categoria,
      imagemUrl,
    };
    onSave(novoProduto);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold mb-4">{initialData ? "Editar Produto" : "Novo Produto"}</h3>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Preço (R$)</label>
          <input
            type="number"
            step="0.01"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Categoria</label>
           <input
            type="text"
            required
            placeholder="Ex: Lanches"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">URL da Imagem</label>
        <input
          type="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
          placeholder="https://exemplo.com/imagem.jpg"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
        >
          Salvar Produto
        </button>
      </div>
    </form>
  );
}
