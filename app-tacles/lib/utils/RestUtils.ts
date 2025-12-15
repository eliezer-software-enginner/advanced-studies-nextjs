import axios, { AxiosError, AxiosResponse } from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export type ResponseMessage<T> = {
  data: T;
  message: string;
  status: number;
};

export function getDataFromSuccess<T>(r: AxiosResponse): ResponseMessage<T> {
  console.log(r);

  const responseData = r.data as any;

  const responseMessage: ResponseMessage<T> = {
    message: responseData?.message ?? "Unknown error",
    data: responseData?.data as T,
    status: r.status ?? 400,
  };

  return responseMessage;
}

export function getMessageFromError(e: AxiosError): ResponseMessage<undefined> {
  console.log(e);
  const responseData = e.response?.data as any;

  const responseMessage: ResponseMessage<undefined> = {
    data: undefined,
    message: responseData?.message ?? "Unknown error",
    status: e.status ?? 400,
  };

  return responseMessage;
}
