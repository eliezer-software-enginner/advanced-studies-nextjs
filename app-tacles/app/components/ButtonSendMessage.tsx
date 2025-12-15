import { useState } from "react";
import { Card } from "./discordComponents/cards";
import { PostsService } from "../services/PostsService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DefaultButtonSend from "./DefaultButtonSend/DefaultButtonSend";

type props = {
  message: Card;
};

export default function ButtonSendMessage({ message }: props) {
  const [isSending, setIsSending] = useState(false);

  const postService = new PostsService(useNavigate);

  const handleSendMessage = async () => {
    if (message.webhooksIds?.length == 0) {
      alert("Selecione algum webhook e tente novamente :)");
      return;
    }
    setIsSending(true);

    console.log(message);

    await postService.sendMessage(
      message,
      () => {
        setIsSending(false);
        toast.success("Mensagem enviada com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      },
      () => {
        console.log("erro");
        setIsSending(false);
        toast.error("Erro ao enviar mensagem. Tente novamente.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    );
  };

  return (
    <DefaultButtonSend
      text={"Enviar Mensagem"}
      loading={isSending}
      handleClick={handleSendMessage}
    />
  );
}
