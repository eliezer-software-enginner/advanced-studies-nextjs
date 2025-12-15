import { Location } from "react-router-dom";
import { RoutesName } from "./RoutesName";

export class NavigationUtils {
  private location: Location;
  constructor(location: Location) {
    this.location = location;
  }

  public isAuthPage() {
    return [
      RoutesName.LOGIN,
      RoutesName.SIGN_UP,
      RoutesName.LANDING_PAGE,
    ].includes(this.location.pathname as any);
  }

  public isLandingPage() {
    return location.pathname === RoutesName.LANDING_PAGE;
  }
  public RedirectToHome() {
    return this.isAuthPage() ? RoutesName.LANDING_PAGE : RoutesName.HOME;
  }
}
