import { useState } from "react";
import { Webhook, WebhookService } from "../../services/WebhookService";
import { useFetchWebhook } from "../../data/hooks/useFetchWebhook";
import { useNavigate } from "react-router-dom";
import { AppUtils } from "../../data/utils/AppUtils";

export function WebhookHook() {
  const { webhooks, setWebhooks } = useFetchWebhook();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedTitle, setEditedTitle] = useState("");
  const [editedUrl, setEditedUrl] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const webhookService = new WebhookService(useNavigate);

  const userId = AppUtils.GetUserId();

  const handleDelete = async (id: string) => {
    await webhookService.deletar(
      id,
      () => {
        console.log("deletado");
        setWebhooks((prev) => prev.filter((webhook) => webhook.id !== id));
      },
      () => {}
    );
  };

  const handleEdit = (webhook: Webhook) => {
    setEditingId(webhook.id);
    setEditedTitle(webhook.name);
    setEditedUrl(webhook.url);
  };

  const handleEditTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  const handleEditUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedUrl(event.target.value);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTitle("");
    setEditedUrl("");
  };

  const handleSave = async () => {
    console.log("salvando");
    await webhookService.create(
      newTitle.trim(),
      newUrl.trim(),
      userId,
      () => {
        console.log("sucesso");
        setWebhooks((prev) =>
          prev.map((webhook) =>
            webhook.id === editingId
              ? { ...webhook, title: editedTitle, url: editedUrl }
              : webhook
          )
        );
      },
      (e) => {
        console.log(e);
      }
    );

    handleCancelEdit();
  };

  //daqui pra baixo é referente a nova webhook

  const handleAddWebhook = async () => {
    const title_ = newTitle.trim();
    const url_ = newUrl.trim();

    if (title_ == "" || url_ == "") {
      alert("Preencha o nome e a url!");
      return;
    }

    await webhookService.create(
      title_,
      url_,
      userId,
      (r) => {
        const newWebhook: Webhook = {
          id: r.data,
          name: title_,
          url: url_,
        };
        setWebhooks((prev) => [...prev, newWebhook]);
        setNewTitle("");
        setNewUrl("");
      },
      (e) => {
        if (e.status == 401) {
          alert("Você atingiu seu limite de webhooks no plano gratuito");
        }
        console.log(e);
      }
    );

    setIsModalOpen(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
  };

  const handleUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUrl(event.target.value);
  };

  return {
    webhooks,
    editingId,
    editedTitle,
    editedUrl,
    isModalOpen,
    newTitle,
    newUrl,
    handleEdit,
    handleDelete,
    handleSave,
    handleCancelEdit,
    handleEditUrl,
    handleEditTitle,
    setIsModalOpen,
    handleTitle,
    handleUrl,
    handleAddWebhook,
  };
}
