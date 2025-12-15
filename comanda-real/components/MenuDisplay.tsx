"use client";

import { ZapProcessor } from "@/services/zapProcessor";
import { Cardapio, ItemPedido, Pedido, Produto } from "@/types/global";
import { useState } from "react";

interface MenuDisplayProps {
  cardapio: Cardapio;
  isPreview?: boolean;
}

export default function MenuDisplay({ cardapio, isPreview = false }: MenuDisplayProps) {
  const [carrinho, setCarrinho] = useState<ItemPedido[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [clienteNome, setClienteNome] = useState("");
  const [clienteTelefone, setClienteTelefone] = useState("");
  const [enviando, setEnviando] = useState(false);

  const addToCart = (produto: Produto) => {
    setCarrinho((prev) => {
      const existing = prev.find((item) => item.produtoId === produto.id);
      if (existing) {
        return prev.map((item) =>
          item.produtoId === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          produtoId: produto.id,
          nome: produto.nome,
          precoUnitario: produto.preco,
          quantidade: 1,
        },
      ];
    });
  };

  const removeFromCart = (produtoId: string) => {
    setCarrinho((prev) => prev.filter((item) => item.produtoId !== produtoId));
  };

  const totalCarrinho = carrinho.reduce(
    (acc, item) => acc + item.precoUnitario * item.quantidade,
    0
  );

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isPreview) {
      alert("Modo de visualização: Pedido não será enviado.");
      return;
    }

    setEnviando(true);
    try {
      const pedido: Pedido = {
        id: `pedido_${Date.now()}`,
        lojaId: cardapio.id,
        cliente: {
          nome: clienteNome,
          telefone: clienteTelefone,
        },
        itens: carrinho,
        total: totalCarrinho,
        dataCriacao: new Date(),
        status: "pendente",
      };

      // Use o WhatsApp configurado na loja ou um fallback (que deve ser evitado em prod)
      const destino = cardapio.whatsapp || "5511999999999"; 
      await ZapProcessor.enviarPedido(pedido, destino);
      
      alert("Pedido enviado com sucesso! (Veja o console)");
      setCarrinho([]);
      setIsCheckoutOpen(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar pedido.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 relative">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
             {cardapio.fotoUrl && (
                 <img 
                    src={cardapio.fotoUrl} 
                    alt="Logo da Loja" 
                    className="w-12 h-12 rounded-full object-cover border border-gray-100 bg-gray-200"
                    onError={(e) => {
                        console.error("Erro ao carregar imagem:", cardapio.fotoUrl);
                        e.currentTarget.style.display = 'none'; // Hide if broken
                    }}
                 />
             )}
             <h1 className="text-xl font-bold text-gray-900">{cardapio.nomeLoja}</h1>
          </div>
          {carrinho.length > 0 && (
            <button
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-green-700 transition"
            >
              Ver Sacola ({carrinho.length})
            </button>
          )}
        </div>
      </header>

      {/* Menu List */}
      <main className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {cardapio.produtos.map((produto) => (
          <div
            key={produto.id}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex gap-4"
          >
            {produto.imagemUrl && (
              <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0 bg-cover bg-center" style={{backgroundImage: `url(${produto.imagemUrl})`}} />
            )}
            <div className="flex-1 flex flex-col justify-between">
               <div>
                  <h3 className="font-semibold text-lg text-gray-800">{produto.nome}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{produto.descricao}</p>
               </div>
               <div className="flex justify-between items-end mt-2">
                  <span className="font-bold text-gray-900">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
                  </span>
                  <button
                    onClick={() => addToCart(produto)}
                    className="text-blue-600 font-medium text-sm hover:underline"
                  >
                    + Adicionar
                  </button>
               </div>
            </div>
          </div>
        ))}
      </main>

      {/* Floating Checkout Button (Mobile Friendly) */}
      {carrinho.length > 0 && !isCheckoutOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg md:hidden z-20">
          <button
             onClick={() => setIsCheckoutOpen(true)}
             className="w-full bg-green-600 text-white font-bold py-3 rounded-lg flex justify-between px-6"
          >
            <span>Ver Sacola</span>
            <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCarrinho)}</span>
          </button>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Sua Sacola</h2>
                <button onClick={() => setIsCheckoutOpen(false)} className="text-gray-400 hover:text-gray-600">
                  ✕
                </button>
              </div>

              {carrinho.length === 0 ? (
                <p className="text-center text-gray-500 py-8">Sua sacola está vazia.</p>
              ) : (
                <div className="space-y-4 mb-8">
                  {carrinho.map((item, idx) => (
                    <div key={`${item.produtoId}-${idx}`} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                      <div>
                        <div className="font-medium text-gray-900">{item.nome}</div>
                        <div className="text-sm text-gray-500">{item.quantidade}x {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.precoUnitario)}</div>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="font-semibold text-gray-800">
                           {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.precoUnitario * item.quantidade)}
                         </span>
                         <button onClick={() => removeFromCart(item.produtoId)} className="text-red-500 hover:text-red-700 text-sm">
                           Remover
                         </button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4 border-t border-gray-200 flex justify-between items-center text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCarrinho)}</span>
                  </div>
                </div>
              )}

              {carrinho.length > 0 && (
                <form onSubmit={handleCheckout} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seu Nome</label>
                    <input
                      required
                      type="text"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                      value={clienteNome}
                      onChange={(e) => setClienteNome(e.target.value)}
                      placeholder="Ex: Maria"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seu WhatsApp</label>
                    <input
                      required
                      type="tel"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                      value={clienteTelefone}
                      onChange={(e) => setClienteTelefone(e.target.value)}
                      placeholder="Ex: 11999999999"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={enviando}
                    className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 disabled:opacity-50 mt-4"
                  >
                    {enviando ? "Enviando..." : isPreview ? "Simular Pedido" : "Finalizar Pedido pelo WhatsApp"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
