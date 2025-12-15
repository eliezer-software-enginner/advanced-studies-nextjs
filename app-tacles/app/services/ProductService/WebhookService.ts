import { AxiosError } from "axios";
import {
  api,
  getDataFromSuccess,
  getMessageFromError,
  ResponseMessage,
} from "../data/utils/RestUtils";
import { AppUtils } from "../data/utils/AppUtils";
import { GeneralAPIHandler } from "./GeneralAPIHandler";
import { NavigateFunction } from "react-router-dom";

export type Webhook = {
  id: string;
  name: string;
  url: string;
};

export class WebhookService extends GeneralAPIHandler {
  constructor(public useNavigate: NavigateFunction) {
    super(useNavigate);
  }
  public async create(
    name: string,
    url: string,
    userId: string,
    onSuccess: (responseMessage: ResponseMessage<string>) => void,
    onError: (responseMessage: ResponseMessage<undefined>) => void
  ): Promise<void> {
    await api
      .post(
        `webhooks/create?user_id=${userId}`,
        {
          name: name,
          url: url,
        },
        {
          headers: {
            Authorization: `Bearer ${AppUtils.GetToken()}`,
          },
        }
      )
      .then((r) => {
        onSuccess(getDataFromSuccess<string>(r));
      })
      .catch((e: AxiosError) => {
        onError(getMessageFromError(e));
      });
  }

  // public async edit(
  //   webhook: Webhook,
  //   userId: string,
  //   onSuccess: (responseMessage: ResponseMessage<string>) => void,
  //   onError: () => void
  // ): Promise<void> {}

  public async deletar(
    webhookId: string,
    onSuccess: (responseMessage: ResponseMessage<string>) => void,
    onError: () => void
  ): Promise<void> {
    await api
      .delete(`webhooks/${webhookId}`, this.defaultHeader())
      .then((r) => {
        onSuccess(getDataFromSuccess<string>(r));
      })
      .catch(() => {
        onError();
        //onError(getMessageFromError(e));
      });
  }

  public async list(userId: string): Promise<Webhook[]> {
    try {
      const request = await api.get(
        `webhooks?user_id=${userId}`,
        this.defaultHeader()
      );

      const response: ResponseMessage<Webhook[]> = request.data;
      return response.data;
    } catch (e: any) {
      this.actionOnTokenExpired(e as AxiosError);
      return [];
    }
  }
}
