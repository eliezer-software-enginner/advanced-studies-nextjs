import { useState, useRef, useEffect, useLayoutEffect } from "react";

interface PopupProps {
  onConfirm: (url: string) => void;
  onClose: () => void;
  onBold: () => void;
  position: { x: number; y: number };
}

export function Popup({ onConfirm, onClose, onBold, position }: PopupProps) {
  const [url, setUrl] = useState("");
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState(position);
  const popupRef = useRef<HTMLDivElement>(null);

  // Sempre que a posição de seleção mudar, reposiciona, mas aguarda o popup renderizar
  useLayoutEffect(() => {
    if (!popupRef.current) return;
    const { innerWidth, innerHeight } = window;
    const { width, height } = popupRef.current.getBoundingClientRect();
    let newX = position.x;
    let newY = position.y;

    const margin = 8;
    // Ajuste horizontal
    if (newX + width + margin > innerWidth) {
      newX = innerWidth - width - margin;
    } else if (newX < margin) {
      newX = margin;
    }
    // Ajuste vertical
    if (newY + height + margin > innerHeight) {
      // Subir popup acima da seleção
      newY = position.y - height - margin;
    } else if (newY < margin) {
      newY = margin;
    }

    setPos({ x: newX, y: newY });
  }, [position]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (dragging) {
        setPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      }
    }
    function handleMouseUp() {
      setDragging(false);
    }
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, offset]);

  function handleMouseDown(e: React.MouseEvent) {
    if (!popupRef.current) return;
    const rect = popupRef.current.getBoundingClientRect();
    setOffset({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setDragging(true);
  }

  return (
    <div
      ref={popupRef}
      onMouseDown={handleMouseDown}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        backgroundColor: "#2f3136",
        padding: "16px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
        zIndex: 1000,
        border: "1px solid #40444b",
        minWidth: "300px",
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
    >
      {/* Header arrastável */}
      <div
        style={{
          height: "24px",
          marginBottom: "8px",
          background: "#40444b",
          borderRadius: "4px",
          cursor: "grab",
        }}
      >
        {/* Você pode colocar um ícone de “≡” aqui */}
      </div>

      <button
        onClick={onBold}
        style={{
          padding: "8px 16px",
          backgroundColor: "#40444b",
          color: "#dcddde",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontWeight: "500",
        }}
      >
        Negrito
      </button>

      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Digite a URL"
        style={{
          padding: "10px",
          border: "1px solid #40444b",
          borderRadius: "4px",
          margin: "12px 0",
          width: "100%",
          backgroundColor: "#40444b",
          color: "#dcddde",
          outline: "none",
        }}
      />

      <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
        <button
          onClick={() => onConfirm(url)}
          style={{
            padding: "8px 16px",
            backgroundColor: "#5865F2",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Confirmar
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "8px 16px",
            backgroundColor: "#40444b",
            color: "#dcddde",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "500",
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
