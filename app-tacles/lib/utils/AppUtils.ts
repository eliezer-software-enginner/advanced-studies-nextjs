import { ResponseLoginDto } from "../../services/AuthService";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export class AppUtils {
  static NavigateToNewWindow(link: string) {
    window.open(link, "_blank");
  }

  static Branding: string = "🔹Powered by Tacles";

  static GetFooterText(text?: string) {
    return text != undefined ? text : AppUtils.Branding;
  }

  public static LOCAL_STORAGE = {
    USER_ID: "user_id",
    USER_NAME: "user_name",
    PROFILE_PICTURE_BASE_64: "profile_picture",
    EMAIL: "email",
    CREATED_ACCOUNT_DATE_TIME: "created_account_date_time",
    TOKEN: "token",
  };

  public static SaveUserDataFromAccountCreation(
    name: string,
    email: string,
    response: ResponseLoginDto
  ) {
    localStorage.setItem(this.LOCAL_STORAGE.USER_NAME, name);
    localStorage.setItem(this.LOCAL_STORAGE.EMAIL, email);
    this.SaveCommonDataToLocalStorage(response);
  }

  public static SaveUserDataFromLogin(response: ResponseLoginDto) {
    localStorage.setItem(this.LOCAL_STORAGE.USER_NAME, response.name);
    this.SaveCommonDataToLocalStorage(response);
  }

  private static SaveCommonDataToLocalStorage(response: ResponseLoginDto) {
    localStorage.setItem(this.LOCAL_STORAGE.USER_ID, response.user_id);
    localStorage.setItem(this.LOCAL_STORAGE.TOKEN, response.token);
    localStorage.setItem(
      this.LOCAL_STORAGE.CREATED_ACCOUNT_DATE_TIME,
      response.created_at.toString()
    );
    this.SaveProfilePictureAtLocalStorage(response.profile_picture_base64);
  }

  public static GetUserId(): string {
    return localStorage.getItem(this.LOCAL_STORAGE.USER_ID) || "";
  }

  public static GetToken(): string {
    return localStorage.getItem(this.LOCAL_STORAGE.TOKEN) || "";
  }

  public static GetAccountCreatedAtTime(): string {
    const iso =
      localStorage.getItem(this.LOCAL_STORAGE.CREATED_ACCOUNT_DATE_TIME) || "";

    if (iso == "") {
      return "Data inválida!";
    }
    const date = new Date(iso);

    const formatted = format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
    return formatted;
  }

  public static GetProfilePicture() {
    const profilePicture = localStorage.getItem(
      this.LOCAL_STORAGE.PROFILE_PICTURE_BASE_64
    );

    if (
      profilePicture != null &&
      profilePicture != undefined &&
      profilePicture != ""
    ) {
      return profilePicture;
    }
    return "../../assets/images/anime-girl.png";
  }
  public static SaveProfilePictureAtLocalStorage(
    profilePictureBase64: string
  ): string {
    if (profilePictureBase64 == null) {
      localStorage.setItem(this.LOCAL_STORAGE.PROFILE_PICTURE_BASE_64, "");
      return "";
    } else {
      const base64Image = profilePictureBase64.includes("data:image")
        ? profilePictureBase64
        : `data:image/png;base64,${profilePictureBase64}`; // Monta o src correto
      localStorage.setItem(
        this.LOCAL_STORAGE.PROFILE_PICTURE_BASE_64,
        base64Image
      );
      return base64Image;
    }
  }
}
