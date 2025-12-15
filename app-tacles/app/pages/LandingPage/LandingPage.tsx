import { useNavigate } from "react-router-dom";
import { CustomDiscordCard } from "../../components/DiscordComponentsBase/DiscordBaseContainer";
import { Card } from "../../components/discordComponents/cards";
import "./style.css";
import { RoutesName } from "../../navigation/RoutesName";
import girl_bg from "../../assets/images/girl_bg.jpg";
import girl_at_right from "../../assets/images/girl_ath_right.jpg";
import nature_bg from "../../assets/images/nature_bg.avif";
import ai_controller from "../../assets/images/ai_controller.avif";

// Mock de cards para exibição na landing page
const mockCards: Card[] = [
  {
    id: "1",
    title: "🚀 Promoção Especial!",
    author: "Bot",
    description: {
      text: "Oferta de surpresa!",
      imageAtRightUrl: girl_at_right,
    },
    imageUrl: girl_bg,
    subdescription: {
      columnLeft: {
        top: "Descontos exclusivos só hoje!",
      },
    },
    footer: "Siga o admin @teste pra detalhes",
  },
  {
    id: "2",
    title: "🌳 Natureza Viva",
    author: "Bot",
    description: { text: "Veja a beleza natural do nosso planeta." },
    imageUrl: nature_bg,
    footer: "#GoGreen",
  },

  {
    id: "6",
    author: "Bot",
    description: {
      text: "Playzinha Pro >> de Free Fire 😎",
      imageAtRightUrl: ai_controller,
    },
    subdescription: {
      top: {
        text: "Jogar agora",
      },
      columnLeft: {
        top: "Preço",
        bottom: "R$ 5,00",
      },
      columnCenter: {
        top: "Vagas até",
        bottom: "16 April 2025",
      },
    },
  },
  // {
  //   id: "3",
  //   title: "📚 Clube do Livro",
  //   author: "Bot",
  //   description: { text: "Livro do mês: Dom Casmurro" },
  //   imageUrl:
  //     "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
  //   footer: "#LeituraÉVida",
  // },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Cabeçalho */}
      <header className="landing-header">
        <h1>TURBINE SUA COMUNIDADE DO DISCORD</h1>
        <p>
          Envie mensagens personalizadas grátis para seus canais no Discord de
          forma fácil e rápida.
        </p>
      </header>

      {/* Cards de exemplo */}
      <section className="landing-cards">
        <h2>Seja um Mensageiro Profissional, sua criatividade ao extremo</h2>

        <div className="cards-grid">
          {mockCards.map((card, index) => (
            <CustomDiscordCard
              key={index}
              card={card}
              removeImageUrl={() => {}}
              removeImageUrlAtRight={() => {}}
            />
          ))}
        </div>
      </section>

      {/* Features */}
      <div className="features-container">
        {/* Benefícios */}
        <section className="landing-benefits">
          <h2>Benefícios do Pro</h2>
          <ul>
            <li>✅ Posts ilimitados</li>
            <li>✅ Webhooks ilimitados</li>
            <li>✅ Remoção de marca d'água nos posts</li>
            <li>✅ Repostar mensagens</li>
          </ul>
        </section>

        {/* Preço */}
        <section className="landing-price">
          <h2>Preço</h2>
          <p>R$ 15,00/mês</p>
        </section>
      </div>

      {/* CTA */}
      <section className="landing-cta">
        <button onClick={() => navigate(RoutesName.SIGN_UP)}>
          {/* Comece Agora */}
          Comece Agora
        </button>
      </section>

      {/* Rodapé */}
      <footer className="landing-footer">
        <p>Desenvolvido com ☕❤️</p>
        <p>Todos os direitos reservados ©️</p>
      </footer>
    </div>
  );
}
