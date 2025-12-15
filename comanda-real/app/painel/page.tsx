"use client";

import MenuDisplay from "@/components/MenuDisplay";
import ProductForm from "@/components/painel/ProductForm";
import StoreSettings from "@/components/painel/StoreSettings";
import { getCardapio, saveCardapio } from "@/services/dbService";
import { Cardapio, Produto } from "@/types/global";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PainelPage() {
  const [activeTab, setActiveTab] = useState<"produtos" | "loja">("produtos");
  const [loading, setLoading] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [message, setMessage] = useState("");
  
  // State for the cardapio being edited (initialized with empty/default values)
  const [cardapio, setCardapio] = useState<Cardapio>({
    id: "loja_teste_1",
    nomeLoja: "Minha Loja",
    produtos: [],
  });

  const [editingProduct, setEditingProduct] = useState<Produto | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // Load initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const data = await getCardapio("loja_teste_1");
        if (data) {
          setCardapio(data);
        } else {
            // If no data, maybe load test data or keep default
            console.log("Nenhum cardápio encontrado, usando estado inicial.");
        }
      } catch (error) {
        console.error("Erro ao carregar cardápio:", error);
      } finally {
        setInitLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const handleSaveProduct = (produto: Produto) => {
    setCardapio((prev) => {
      const exists = prev.produtos.find((p) => p.id === produto.id);
      let newProdutos;
      if (exists) {
        newProdutos = prev.produtos.map((p) => (p.id === produto.id ? produto : p));
      } else {
        newProdutos = [...prev.produtos, produto];
      }
      return { ...prev, produtos: newProdutos };
    });
    setEditingProduct(null);
    setIsAddingProduct(false);
  };

  const handleDeleteProduct = (produtoId: string) => {
    if (confirm("Tem certeza que deseja remover este produto?")) {
      setCardapio((prev) => ({
        ...prev,
        produtos: prev.produtos.filter((p) => p.id !== produtoId),
      }));
    }
  };

  const handleUpdateSettings = (settings: Partial<Cardapio>) => {
    setCardapio((prev) => ({ ...prev, ...settings }));
  };

  const saveToFirestore = async () => {
    setLoading(true);
    setMessage("");
    try {
      await saveCardapio(cardapio);
      setMessage("✅ Alterações salvas com sucesso!");
    } catch (error) {
       console.error(error);
       setMessage("❌ Erro ao salvar alterações.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (initLoading) {
     return <div className="flex justify-center items-center min-h-screen text-gray-500">Carregando painel...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white shadow-sm z-20 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">Painel do Lojista</h1>
            <div className="flex items-center gap-4">
                <Link href={`/cardapio/${cardapio.id}`} target="_blank" className="text-blue-600 hover:underline text-sm">
                    Ver Loja Online ↗
                </Link>
                <button 
                    onClick={saveToFirestore}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:opacity-50 text-sm font-bold"
                >
                    {loading ? "Salvando..." : "Salvar Alterações"}
                </button>
            </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar / Editor Area */}
        <aside className="w-full md:w-1/3 lg:w-[400px] bg-white border-r border-gray-200 overflow-y-auto flex flex-col">
            
            {/* Tabs */}
            <div className="flex border-b border-gray-200">
                <button 
                  onClick={() => setActiveTab("produtos")}
                  className={`flex-1 py-3 text-sm font-medium ${activeTab === "produtos" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                    Produtos
                </button>
                <button 
                  onClick={() => setActiveTab("loja")}
                  className={`flex-1 py-3 text-sm font-medium ${activeTab === "loja" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500 hover:text-gray-700"}`}
                >
                    Configurações
                </button>
            </div>

            <div className="p-4 flex-1">
                {activeTab === "produtos" && (
                    <div className="space-y-4">
                        {!isAddingProduct && !editingProduct ? (
                            <>
                                <button 
                                    onClick={() => setIsAddingProduct(true)}
                                    className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-green-500 hover:text-green-500 transition-colors"
                                >
                                    + Adicionar Novo Produto
                                </button>
                                
                                <div className="space-y-2">
                                  {cardapio.produtos.length === 0 && <p className="text-center text-gray-400 text-sm py-4">Nenhum produto cadastrado.</p>}
                                  {cardapio.produtos.map(produto => (
                                      <div key={produto.id} className="border border-gray-200 rounded p-3 flex justify-between items-center bg-gray-50">
                                          <div>
                                              <div className="font-medium text-gray-800">{produto.nome}</div>
                                              <div className="text-xs text-gray-500">
                                                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(produto.preco)}
                                              </div>
                                          </div>
                                          <div className="flex space-x-2">
                                              <button onClick={() => setEditingProduct(produto)} className="text-blue-500 text-sm hover:underline">Editar</button>
                                              <button onClick={() => handleDeleteProduct(produto.id)} className="text-red-500 text-sm hover:underline">Excluir</button>
                                          </div>
                                      </div>
                                  ))}
                                </div>
                            </>
                        ) : (
                            <ProductForm 
                                initialData={editingProduct || undefined}
                                onSave={handleSaveProduct}
                                onCancel={() => {
                                    setIsAddingProduct(false);
                                    setEditingProduct(null);
                                }}
                            />
                        )}
                    </div>
                )}

                {activeTab === "loja" && (
                    <StoreSettings cardapio={cardapio} onSave={handleUpdateSettings} />
                )}
            </div>
            
            {message && (
                <div className={`p-3 text-center text-sm ${message.includes("✅") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                    {message}
                </div>
            )}
        </aside>

        {/* Preview Area */}
        <main className="flex-1 bg-gray-100 overflow-y-auto relative hidden md:block">
            <div className="absolute inset-0 p-8 flex justify-center">
                <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl border-8 border-gray-800 overflow-hidden relative">
                    {/* Phone Frame Details */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-xl z-30"></div>
                 
                    {/* Screen Content */}
                    <div className="h-full overflow-y-auto no-scrollbar bg-gray-50">
                         <MenuDisplay cardapio={cardapio} isPreview={true} />
                    </div>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
