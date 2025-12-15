import { useEffect } from "react";
import { AppUtils } from "../utils/AppUtils";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePath, RoutesName } from "../../navigation/RoutesName";

export function useAvoidUserAccessPrivateRoutes() {
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    const authPaths: RoutePath[] = [
      RoutesName.LOGIN,
      RoutesName.SIGN_UP,
      RoutesName.LANDING_PAGE,
    ];

    const currentPath = location.pathname as RoutePath;

    if (AppUtils.GetUserId() === "" && !authPaths.includes(currentPath)) {
      nav(RoutesName.LANDING_PAGE);
    }
  }, [location.pathname, nav]);
}
