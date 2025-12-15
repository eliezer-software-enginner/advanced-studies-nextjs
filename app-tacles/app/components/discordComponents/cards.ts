type Button = {
  text: string;
  url?: string;
};

export type Descripion = {
  text?: string;
  imageAtRightUrl?: string;
};

type ColumnContent = {
  top?: string;
  bottom?: string;
};

type Subdescription = {
  top?: Button;
  columnLeft?: ColumnContent;
  columnCenter?: ColumnContent;
  imageUrl?: string;
};

export type CardColor = "BLUE" | "RED" | "YELLOW" | "GREEN" | "PURPLE";
export const colorMap: Record<CardColor, string> = {
  BLUE: "#0099ff",
  RED: "#ff4d4d",
  YELLOW: "#ffcc00",
  GREEN: "#00cc66",
  PURPLE: "#9966cc",
};

/*
const cardColor: CardColor = "blue"; // Define a cor do cartão aqui

console.log(colorMap[cardColor]);
*/

//availability:public,private
//categories
type Card = {
  id: string;
  author?: string;
  title?: string;
  description?: Descripion;
  subdescription?: Subdescription;
  footer?: string;
  imageUrl?: string;
  thumbnailUrl?: string;
  // buttonLeft?: Button;
  color?: CardColor;
  webhooksIds?: string[];
};

const cards: Card[] = [
  {
    id: "1",
    title: "🚨 PROMOÇÃO RELÂMPAGO PARA DEVS JAVA! ⚡",
    description: {
      text: `🧪 **Teste gratuito liberado!**  
💥 **50% de desconto** no **Plano Premium Cryxie** por **tempo LIMITADO!**

📦 Publique pacotes **privados**, instale com \`cryxie install\` e gerencie com **segurança e agilidade**!

📅 **Disponível até:** \`30/04/2025 às 23:59\`  
⌛ **Restam apenas 4 dias!**

🔗 [Garanta já seu acesso](https://cryxie.com/premium)  
🧑‍💻 Comece com: \`cryxie init premium\`  
🌐 Acesse: https://cryxie.com`,
    },
    footer: "💻 Powered by Cryxie • Para Devs, por Devs.",
    imageUrl:
      "https://th.bing.com/th/id/OIP.6kk6kiVl5cpEv_cSkNOCqwHaF0?rs=1&pid=ImgDetMain",
  },
  {
    id: "2",
    title: "📚 Clube do Livro",
    description: {
      text: `Vamos ler juntos!\n\n📖 Livro do mês: *Dom Casmurro*\n\nComente o que achou!`,
    },
    footer: "#LeituraÉVida",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "3",
    title: "🎮 Noite dos Jogos",
    description: {
      text: `Prepare-se para uma maratona de jogos!\n\n🕹️ Qual seu game favorito?\n\n🏆 Prêmios para os melhores jogadores!`,
    },
    footer: "Powered by GameNight",
    imageUrl:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "4",
    title: "🌳 Natureza Viva",
    description: {
      text: `Sinta a energia da natureza!\n\n🌲 Árvores, rios e montanhas esperam por você.\n\n📸 Compartilhe sua foto favorita da natureza!`,
    },
    footer: "#GoGreen",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "5",
    title: "🌟 Lifestyle & Bem-estar",
    description: {
      text: `Dicas para uma vida mais leve!\n\n🧘‍♂️ Meditação, alimentação e exercícios.\n\nCompartilhe sua rotina!`,
    },
    footer: "#VivaBem",
    imageUrl:
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80",
  },
  //entrar em Black rada -> jogos gratispara ver os designs

  //5
  {
    id: "6",
    description: {
      text: "Metro 2033 Redux (Steam, GOG) Giveaway",
    },
    subdescription: {
      top: {
        text: "Claim Now",
        url: "https://www.gamerpower.com/open/metro-2033-redux-giveaway",
      },
      columnLeft: {
        top: "Price",
        bottom: "$19.99",
      },
      columnCenter: {
        top: "Free until",
        bottom: "16 April 2025",
      },
    },
  },
  {
    id: "7",
    description: {
      text: `
    Capital Sólido\n
**Boosters**\n
Vantagens dos **BOOSTERS**\n
• Mudança de apelido;\n
• Um **NOVO** cargo a escolha;\n
• Um cargo com o **NOME** do seu *NEGOCIO*;\n
• Cargo **Booster**\n
**Em breve mais vantagens** !\n
Contribua com um **BOOSTER** e tenha vantagens no servidor !!
    `,
    },
  },

  {
    id: "8",
    title: "Titulo do embed",
    description: {
      text: "Descrição com thumbnail",
      imageAtRightUrl: "https://avatarfiles.alphacoders.com/337/337077.jpg",
    },
  },

  {
    id: "9",
    description: {
      text: "Metro 2033 Redux (Steam, GOG) Giveaway",
    },
    subdescription: {
      top: {
        text: "Claim Now",
      },
      columnLeft: {
        top: "Price",
      },
      columnCenter: {
        top: "Free until",
      },
    },
  },
];

export { cards };
export type { Card };
