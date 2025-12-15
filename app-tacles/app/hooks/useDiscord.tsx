// useDiscord.ts
import { useState } from "react";
import { Card, CardColor } from "../../components/discordComponents/cards";

export interface DiscordCardState {
  author: string;
  color: CardColor;
  title: string;
  description: string;
  footer: string;
  bigImageUrl: string;
  imageAtRightUrl: string;
  fieldLeftTitle: string;
  fieldLeftValue: string;
  fieldCenterTitle: string;
  fieldCenterValue: string;
  webhooksIds: string[];
}

export interface DiscordCardActions {
  setAuthor: (value: string) => void;
  setColor: (value: CardColor) => void;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setFooter: (value: string) => void;
  setBigImageUrl: (value: string) => void;
  setImageAtRightUrl: (value: string) => void;
  setFieldLeftTitle: React.Dispatch<React.SetStateAction<string>>;
  setFieldLeftValue: (value: string) => void;
  setFieldCenterTitle: (value: string) => void;
  setFieldCenterValue: (value: string) => void;
  setWebhookIds: (value: string[]) => void;
  removeImageUrl: () => void;
  removeImageUrlAtRight: () => void;
  fieldsToCard: () => Card;
}

export function useDiscord(): DiscordCardState & DiscordCardActions {
  const removeImageUrl = () => {
    setBigImageUrl("");
  };

  const [author, setAuthor] = useState("");
  const [color, setColor] = useState<CardColor>("BLUE");

  const [title, setTitle] = useState("Teste");
  const [description, setDescription] = useState("");
  const [footer, setFooter] = useState("");
  const [bigImageUrl, setBigImageUrl] = useState("");
  const [imageAtRightUrl, setImageAtRightUrl] = useState("");

  const [fieldLeftTitle, setFieldLeftTitle] = useState("");
  const [fieldLeftValue, setFieldLeftValue] = useState("");
  const [fieldCenterTitle, setFieldCenterTitle] = useState("");
  const [fieldCenterValue, setFieldCenterValue] = useState("");

  const [webhooksIds, setWebhookIds] = useState<string[]>([]);

  const removeImageUrlAtRight = () => {
    setImageAtRightUrl("");
  };

  const fieldsToCard = (): Card => {
    return {
      id: "",
      title: title,
      author: author,
      color: color,
      description: {
        imageAtRightUrl: imageAtRightUrl,
        text: description,
      },
      footer: footer,
      imageUrl: bigImageUrl,
      subdescription: {
        columnLeft: {
          top: fieldLeftTitle,
          bottom: fieldLeftValue,
        },
        columnCenter: {
          top: fieldCenterTitle,
          bottom: fieldCenterValue,
        },
      },
      webhooksIds: webhooksIds,
      //thumbnailUrl: discordState.cardState.thumbnailUrl,
    };
  };
  return {
    author,
    color,
    title,
    description,
    footer,
    bigImageUrl,
    imageAtRightUrl,
    setAuthor,
    setColor,
    setTitle,
    setDescription,
    setBigImageUrl,
    setImageAtRightUrl,
    setFooter,
    removeImageUrl,
    removeImageUrlAtRight,
    setFieldLeftValue,
    setFieldCenterTitle,
    setFieldCenterValue,
    fieldLeftTitle,
    fieldLeftValue,
    fieldCenterTitle,
    fieldCenterValue,
    setFieldLeftTitle,
    fieldsToCard,
    webhooksIds,
    setWebhookIds,
  };
}
