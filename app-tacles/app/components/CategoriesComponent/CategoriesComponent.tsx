import "./style.css";

const categories = [
  "RPG",
  "GAMES",
  "SOCIAL",
  "ANIMES",
  "COMUNIDADE",
  "AMIZADE",
  "ROBLOX",
  "BATE-PAPO",
  "JOGOS",
  "PARCERIAS",
  "YOUTUBE",
  "NOTÍCIA",
  "ZOEIRA",
  "PURO-CAOS",
  "GTA",
  "MEMES",
  "LGBT",
  "RESPEITO",
  "FEMBOY",
  "MUSICA",
  "MINECRAFT",
  "DIVULGAÇÃO",
  "EDIÇÃO",
  "LOL",
  "ESPAÇO",
  "BRASIL",
  "ASTRONOMIA",
  "FUTEBOL",
  "IA",
  "POKEMON",
  "ANIME",
  "GEEK",
  "MANGA",
  "JAVA",
  "PROGRAMAÇÃO",
  "ESTUDOS",
  "MARKETING",
];

type Props = {
  categoriesSelected: string[];
  onClickCallback: (v: string) => void;
};

export default function CategoriesComponent(props: Props) {
  return (
    <div className="categories-container">
      <label
        style={{
          display: "block",
          marginBottom: "8px",
          marginTop: -20,
          fontSize: "14px",
          fontWeight: "600",
          color: "#b9bbbe",
        }}
      >
        Escolha a categoria
      </label>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <div
            style={{
              backgroundColor: props.categoriesSelected.includes(
                categories[index]
              )
                ? "red"
                : "white",
            }}
            key={index}
            className="category-item"
            onClick={() => {
              props.onClickCallback(category);
            }}
          >
            <p>{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
