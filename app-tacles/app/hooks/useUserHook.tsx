import { useEffect, useState } from "react";
import { UserResponseDto, UserService } from "../../services/UserService";
import { AppUtils } from "../utils/AppUtils";
import { useNavigate } from "react-router-dom";

export function useUserHook() {
  const [user, setUser] = useState<UserResponseDto>();
  const nav = useNavigate();
  const userService = new UserService(nav);

  useEffect(() => {
    async function fetch() {
      const user_ = await userService.findUserById(AppUtils.GetUserId());
      setUser(user_);
    }
    fetch();
  }, []);

  return { user, userService };
}
