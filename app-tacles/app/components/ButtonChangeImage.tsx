type Props = {
  text: string;
  onClick: () => void;
};

export default function ButtonChangeImage({ text, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: "16px",
        padding: "10px 20px",
        background: "#7289da",
        color: "#fff",
        fontWeight: "bold",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        transition: "background 0.2s ease",
      }}
      onMouseOver={(e) =>
        ((e.target as HTMLButtonElement).style.background = "#5b6eae")
      }
      onMouseOut={(e) =>
        ((e.target as HTMLButtonElement).style.background = "#7289da")
      }
    >
      {text}
    </button>
  );
}
