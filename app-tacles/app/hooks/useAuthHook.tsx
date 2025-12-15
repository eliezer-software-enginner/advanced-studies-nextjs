import { useState } from "react";
import { RoutesName } from "../../navigation/RoutesName";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../services/AuthService";
import { AppUtils } from "../utils/AppUtils";

export function useAuthHook() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const authService = new AuthService();

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleChangePasswordConfirm = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
  };

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password.trim().length < 8) {
      alert("a senha está muito curta");
      setLoading(false);
      return;
    }

    await authService.login(
      email,
      password,
      (response) => {
        AppUtils.SaveUserDataFromLogin(response.data);
        navigate(RoutesName.HOME);
      },
      (e) => {
        //not found
        if (e.status == 404) {
          alert("Este email não está cadastrado!");
        }

        //expectation failed
        if (e.status == 417) {
          alert("A sua senha está incorreta");
        }
      }
    );

    setLoading(false);
  };

  const handleSubmitSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password.trim() != passwordConfirm.trim()) {
      alert("senhas devem ser iguais!");
      setLoading(false);
      return;
    }

    if (password.trim().length < 8) {
      alert("a senha está muito curta");
      setLoading(false);
      return;
    }

    await authService.signUp(
      name,
      email,
      password,
      (response) => {
        AppUtils.SaveUserDataFromAccountCreation(name, email, response.data);
        console.log("account created");

        //evento de conversão google ads
        window.gtag?.("event", "conversion", {
          send_to: import.meta.env.CONVERSION_GOOGLE_ADS,
        });

        navigate(RoutesName.HOME);
      },
      (error) => {
        const { message } = error;

        console.log(message);

        if (
          message.trim() ===
          "the password is empty or has less than 8 characters"
        ) {
          alert("A senha está muito curta!");
        }

        console.log("account not created");
      }
    );
    setLoading(false);
  };

  const clickOnDontHaveAccount = () => {
    navigate(RoutesName.SIGN_UP);
  };

  const clickOnHaveAccount = () => {
    navigate(RoutesName.LOGIN);
  };

  return {
    clickOnDontHaveAccount,
    clickOnHaveAccount,
    name,
    email,
    password,
    passwordConfirm,
    handleChangeEmail,
    handleChangeName,
    handleChangePassword,
    handleChangePasswordConfirm,
    handleSubmitLogin,
    handleSubmitSignUp,
    loading,
  };
}
