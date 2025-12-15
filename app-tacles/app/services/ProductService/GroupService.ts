import { AxiosError } from "axios";
import { AppUtils } from "../data/utils/AppUtils";
import {
  api,
  getMessageFromError,
  ResponseMessage,
} from "../data/utils/RestUtils";
import { GeneralAPIHandler } from "./GeneralAPIHandler";
import { NavigateFunction } from "react-router-dom";
type GroupModelDTO = {
  id: string;
  name: string;
  link: string;
  description: string;
  categories: string[];
  cover: string; // base64
  userId: string;
  dtCriacao: string;
  dtUltimaEdicao: string;
};

export class GroupService extends GeneralAPIHandler {
  constructor(public useNavigate: NavigateFunction) {
    super(useNavigate);
  }

  public async list(): Promise<Group[]> {
    try {
      const request = await api.get(
        `groups?user_id=${this.userId}`,
        this.defaultHeader()
      );

      const response: ResponseMessage<GroupModelDTO[]> = request.data;

      return response.data.map((group) => ({
        id: group.id,
        name: group.name,
        link: group.link,
        description: group.description,
        categories: group.categories,
        image: `data:image/jpeg;base64,${group.cover}`, // base64
      }));
    } catch (e) {
      this.actionOnTokenExpired(e as AxiosError);
      return [];
    }
  }

  public async create(
    payload: GroupDto,
    onSuccess: () => void,
    onError: (e: ResponseMessage<undefined>) => void
  ): Promise<void> {
    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("link", payload.link);
    formData.append("description", payload.description);
    formData.append("categories", JSON.stringify(payload.categories));
    formData.append("image", payload.image);

    await api
      .post(`groups?user_id=${this.userId}`, formData, {
        headers: {
          Authorization: `Bearer ${AppUtils.GetToken()}`,
        },
      })
      .then(() => {
        onSuccess();
      })
      .catch((e: AxiosError) => {
        onError(getMessageFromError(e));
      });
  }
}

export type GroupDto = {
  name: string;
  link: string;
  image: File;
  categories: string[];
  description: string;
};

export type Group = {
  name: string;
  link: string;
  image: string;
  categories: string[];
  description: string;
};
