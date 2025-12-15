"use client";

import { Cardapio } from "@/types/global";
import { useState } from "react";

interface StoreSettingsProps {
  cardapio: Cardapio;
  onSave: (settings: Partial<Cardapio>) => void;
}

export default function StoreSettings({ cardapio, onSave }: StoreSettingsProps) {
  const [nomeLoja, setNomeLoja] = useState(cardapio.nomeLoja);
  const [lojaId, setLojaId] = useState(cardapio.id);
  const [fotoUrl, setFotoUrl] = useState(cardapio.fotoUrl || "");
  const [whatsapp, setWhatsapp] = useState(cardapio.whatsapp || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      nomeLoja,
      id: lojaId,
      fotoUrl,
      whatsapp,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold mb-4">Configurações da Loja</h3>

      <div>
        <label className="block text-sm font-medium text-gray-700">Nome da Loja</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
          value={nomeLoja}
          onChange={(e) => setNomeLoja(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">URL da Logo / Foto da Loja</label>
        <input
          type="url"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
          value={fotoUrl}
          onChange={(e) => setFotoUrl(e.target.value)}
          placeholder="https://exemplo.com/logo.jpg"
        />
      </div>

      <div>
          <label className="block text-sm font-medium text-gray-700">WhatsApp para Pedidos</label>
          <input
            type="tel"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm p-2 border"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            placeholder="5511999999999 (com código do país e DDD)"
          />
          <p className="mt-1 text-xs text-gray-500">Número que receberá as mensagens dos pedidos.</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          ID da Loja (Slug na URL)
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
           <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
             /cardapio/
           </span>
           <input
            type="text"
            required
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm border"
            value={lojaId}
            onChange={(e) => setLojaId(e.target.value)}
           />
        </div>
        <p className="mt-1 text-sm text-gray-500">Este será o link que você enviará aos clientes.</p>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Salvar Configurações
        </button>
      </div>
    </form>
  );
}
