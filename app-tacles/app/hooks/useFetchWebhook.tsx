import { useState, useEffect } from "react";
import { Webhook, WebhookService } from "../../services/WebhookService";
import { AppUtils } from "../utils/AppUtils";
import { useNavigate } from "react-router-dom";

export function useFetchWebhook() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);

  const webhookService = new WebhookService(useNavigate);

  useEffect(() => {
    async function fetchWebhooks() {
      setWebhooks(await webhookService.list(AppUtils.GetUserId()));
    }
    fetchWebhooks();
  }, []);

  return { webhooks, setWebhooks };
}
