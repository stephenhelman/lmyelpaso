import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const NewButton = ({ type, route }) => {
  const navigate = useNavigate();

  const handleNew = () => navigate(`/${route}/${type}/new`);

  return <button onClick={handleNew}>+</button>;
};

export default NewButton;
