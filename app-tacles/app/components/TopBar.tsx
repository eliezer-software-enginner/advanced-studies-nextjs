import { useNavigate } from "react-router-dom";

interface TopBarProps {
  text: string;
}

export function TopBar({ text }: TopBarProps) {
  const iconSize = 20;
  const nav = useNavigate();
  return (
    <div
      onClick={() => nav(-1)}
      style={{
        display: "flex",
        columnGap: 40,
        alignItems: "center",
        width: "fit-content",
        marginTop: 50,
      }}
    >
      <img
        src="/seta_voltar.png"
        style={{
          height: iconSize,
          width: iconSize,
          objectFit: "contain",
        }}
      />

      <p style={{ fontSize: 15, fontFamily: "Inter" }}>{text}</p>
    </div>
  );
}
