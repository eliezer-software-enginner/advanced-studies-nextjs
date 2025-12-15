import { AxiosError } from "axios";
import { api, ResponseMessage } from "../data/utils/RestUtils";
import { GeneralAPIHandler } from "./GeneralAPIHandler";
import { NavigateFunction } from "react-router-dom";

export type UserResponseDto = {
  id: string;
  name: string;
  premium: boolean;
  verificado: boolean;
  email: string;
};

export class UserService extends GeneralAPIHandler {
  constructor(public useNavigate: NavigateFunction) {
    super(useNavigate);
  }

  public async findUserById(userId: string): Promise<UserResponseDto> {
    try {
      const request = await api.get(`users/${userId}`, this.defaultHeader());
      const response: ResponseMessage<UserResponseDto> = request.data;

      return response.data;
    } catch (e) {
      this.actionOnTokenExpired(e as AxiosError);
      throw new Error("Error on fetch user data");
    }
  }

  public async updateProfilePicture(
    userId: string,
    file: File,
    onSuccess: () => void,
    onError: () => void
  ): Promise<void> {
    const formData = new FormData();
    formData.append("photo", file);

    await api
      .put(`users/profile-photo/${userId}`, formData, this.defaultHeader())
      .then(() => {
        onSuccess();
      })
      .catch((e: AxiosError) => {
        console.log(e);
        //this.actionOnTokenExpired(e);
        onError();
      });
  }
}
