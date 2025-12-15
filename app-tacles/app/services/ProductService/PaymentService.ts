import { AxiosError } from "axios";
import {
  api,
  getMessageFromError,
  getDataFromSuccess,
  ResponseMessage,
} from "../data/utils/RestUtils";
import { GeneralAPIHandler } from "./GeneralAPIHandler";

export class PaymentService extends GeneralAPIHandler {
  public async subscripe(
    currentRoute: string,
    userId: string,
    onSuccess: (responseMessage: ResponseMessage<string>) => void,
    onError: (responseMessage: ResponseMessage<undefined>) => void
  ): Promise<void> {
    await api
      .post(
        `/billing/checkout?user_id=${userId}&came_from=${currentRoute}`,
        undefined,
        this.defaultHeader()
      )
      .then((r) => {
        onSuccess(getDataFromSuccess<string>(r));
      })
      .catch((e: AxiosError) => {
        onError(getMessageFromError(e));
      });
  }
}
