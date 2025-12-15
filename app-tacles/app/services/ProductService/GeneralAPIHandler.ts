import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { RoutesName } from "../navigation/RoutesName";
import { AppUtils } from "../data/utils/AppUtils";

export abstract class GeneralAPIHandler {
  protected userId!: string;

  constructor(public useNavigate: NavigateFunction) {
    this.userId = AppUtils.GetUserId();
  }

  protected actionOnTokenExpired(e: AxiosError) {
    if (e.status == 403) {
      this.useNavigate(RoutesName.LOGIN);
    }
  }

  protected defaultHeader() {
    return {
      headers: {
        Authorization: `Bearer ${AppUtils.GetToken()}`,
      },
    };
  }
}
