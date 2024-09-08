import { useSelector } from "react-redux";
import {
  selectCurrentToken,
  selectCurrentUserId,
} from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  const userId = useSelector(selectCurrentUserId);
  let isManager = false;
  let isAdmin = false;
  let status = "Employee";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;

    isManager = roles.includes("Manager");
    isAdmin = roles.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, roles, status, isManager, isAdmin, userId };
  }

  return { username: "", roles: [], isManager, isAdmin, status, userId };
};
export default useAuth;
