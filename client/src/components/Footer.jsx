import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { username } = useAuth();
  const navigate = useNavigate();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  const logoutClicked = async () => {
    await sendLogout();
    navigate("/");
  };

  return (
    <footer>
      <button onClick={logoutClicked}>Logout</button>
      <p>User: {username}</p>
    </footer>
  );
};

export default Footer;
