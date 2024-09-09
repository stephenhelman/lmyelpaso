import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NewButton = ({ type, route }) => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleNew = () => navigate(`/${route}/${type}/new`);
  let content;

  if (isAdmin) {
    content = <button onClick={handleNew}>+</button>;
  } else {
    content = null;
  }

  return content;
};

export default NewButton;
