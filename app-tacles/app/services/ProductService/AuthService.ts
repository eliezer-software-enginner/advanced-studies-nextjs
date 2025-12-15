import { AxiosError } from "axios";
import {
  api,
  getDataFromSuccess,
  getMessageFromError,
  ResponseMessage,
} from "../data/utils/RestUtils";

export class AuthService {
  public async signUp(
    name: string,
    email: string,
    password: string,
    onSuccess: (responseMessage: ResponseMessage<ResponseLoginDto>) => void,
    onError: (responseMessage: ResponseMessage<undefined>) => void
  ): Promise<void> {
    await api
      .post("/auth/sign-up", {
        name: name,
        email: email,
        password: password,
      })
      .then((r) => {
        onSuccess(getDataFromSuccess<ResponseLoginDto>(r));
      })
      .catch((e: AxiosError) => {
        onError(getMessageFromError(e));
      });
  }

  public async login(
    email: string,
    password: string,
    onSuccess: (responseMessage: ResponseMessage<ResponseLoginDto>) => void,
    onError: (responseMessage: ResponseMessage<undefined>) => void
  ): Promise<void> {
    await api
      .post("/auth/login", {
        email: email,
        password: password,
      })
      .then((r) => {
        onSuccess(getDataFromSuccess<ResponseLoginDto>(r));
      })
      .catch((e) => {
        onError(getMessageFromError(e));
      });
  }
}

export type ResponseLoginDto = {
  token: string;
  email: string;
  name: string;
  profile_picture_base64: string;
  is_membership: boolean;
  created_at: number;
  user_id: string;
};
