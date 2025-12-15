"use client";

import MenuDisplay from "@/components/MenuDisplay";
import { getCardapio } from "@/services/dbService";
import { Cardapio } from "@/types/global";
import Link from "next/link";
import { use, useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CardapioPage({ params }: PageProps) {
  // Unwrap params using React.use()
  const { id } = use(params);

  const [cardapio, setCardapio] = useState<Cardapio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadCardapio(id);
    }
  }, [id]);

  const loadCardapio = async (lojaId: string) => {
    setLoading(true);
    try {
      const data = await getCardapio(lojaId);
      setCardapio(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        Carregando cardápio...
      </div>
    );
  }

  if (!cardapio) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Loja não encontrada</h1>
        <Link href="/" className="text-blue-600 underline">
          Voltar para Home
        </Link>
      </div>
    );
  }

  return <MenuDisplay cardapio={cardapio} />;
}

