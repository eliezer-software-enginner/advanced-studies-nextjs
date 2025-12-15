import { useNavigate } from "react-router-dom";
import { PaymentService } from "../../services/PaymentService";
import { AppUtils } from "../utils/AppUtils";

export function useMembershipHook() {
  const nav = useNavigate();
  const paymentService = new PaymentService(nav);

  const handleAssinatura = async (currentRoute: string) => {
    const userId = AppUtils.GetUserId();

    await paymentService.subscripe(
      currentRoute,
      userId,
      (responseMessage) => {
        const url = responseMessage.data;
        window.location.href = url;
      },
      (responseMessage) => {
        console.log(responseMessage);
      }
    );
  };

  return {
    handleAssinatura,
  };
}
