import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4">
      <main className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4">VendaZap</h1>
        <p className="text-xl mb-8 opacity-90">
          A plataforma de cardápio digital mais rápida para delivery via WhatsApp.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/painel"
            className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-gray-100 transition shadow-lg"
          >
            Acessar Painel (Lojista)
          </Link>
          <Link
            href="/cardapio/loja_teste_1"
            className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition"
          >
            Ver Cardápio Demo
          </Link>
        </div>
      </main>
      <footer className="absolute bottom-4 text-sm opacity-70">
        MVP VendaZap - 2025
      </footer>
    </div>
  );
}
