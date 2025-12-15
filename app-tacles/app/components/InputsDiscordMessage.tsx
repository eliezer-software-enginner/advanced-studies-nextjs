import { useRef, useState } from "react";
import CustomTextArea from "./CustomTextArea";
import ButtonChangeImage from "./ButtonChangeImage";
import { useFetchWebhook } from "../data/hooks/useFetchWebhook";
import BasicTextArea from "./BasicTextArea";

interface Props {
  title?: string;
  description?: string;
  footer?: string;

  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setFooter: (value: string) => void;
  setImageUrl: (value: string) => void;
  updateImageUrlAtRight: (value: string) => void;
  setWebhookIds: (value: string[]) => void;
}

export default function InputsDiscordMessage({
  title = "",
  description,
  footer,
  setTitle,
  setDescription,
  setFooter,
  setImageUrl,
  updateImageUrlAtRight,
  setWebhookIds,
}: Props) {
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const { webhooks } = useFetchWebhook();
  const [selectedWebhooks, setSelectedWebhooks] = useState<string[]>([]);

  const handleWebhookSelection = (webhookId: string) => {
    setSelectedWebhooks((prev) => {
      const newSelectedWebhooks = prev.includes(webhookId)
        ? prev.filter((id) => id !== webhookId)
        : [...prev, webhookId];

      setWebhookIds(newSelectedWebhooks);
      return newSelectedWebhooks;
    });
  };

  const handleChangeImage = () => {
    const newUrl = prompt("Insira a URL da nova imagem:");
    if (newUrl && newUrl.startsWith("http")) {
      setImageUrl(newUrl);
    }
  };

  const handleChangeImageAtRight = () => {
    const newUrl = prompt("Insira a URL da nova imagem:");
    if (newUrl && newUrl.startsWith("http")) {
      updateImageUrlAtRight(newUrl);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#b9bbbe",
            }}
          >
            Webhooks
          </label>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              backgroundColor: "#40444b",
              padding: "12px",
              borderRadius: "4px",
            }}
          >
            {webhooks?.map((webhook) => (
              <label
                key={webhook.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#dcddde",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  checked={selectedWebhooks.includes(webhook.id)}
                  onChange={() => handleWebhookSelection(webhook.id)}
                  style={{
                    width: "16px",
                    height: "16px",
                    cursor: "pointer",
                  }}
                />
                {webhook.name}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "14px",
              fontWeight: "600",
              color: "#b9bbbe",
            }}
          >
            Título
          </label>
          <input
            value={title}
            onCopy={(e) => e.preventDefault()}
            onCut={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "12px",
              border: "1px solid #40444b",
              borderRadius: "4px",
              minHeight: "40px",
              flex: 1,
              backgroundColor: "#40444b",
              color: "#dcddde",
              outline: "none",
              resize: "vertical",
              fontFamily: "inherit",
              fontSize: "14px",
              width: "100%",
            }}
          />
        </div>

        <CustomTextArea
          inputRef={descriptionRef}
          labelTitle="Descrição"
          inputText={description || ""}
          setInputText={setDescription}
        />

        <BasicTextArea
          labelTitle="Footer"
          inputText={footer || ""}
          setInputText={setFooter}
        />

        <ButtonChangeImage
          text="📷 Usar imagem a direita"
          onClick={handleChangeImageAtRight}
        />

        <ButtonChangeImage
          text="📷 Usar imagem de thumbnail"
          onClick={handleChangeImage}
        />
      </div>
    </div>
  );
}
