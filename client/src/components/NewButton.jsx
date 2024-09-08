import { useNavigate, useLocation } from "react-router-dom";

const NewButton = ({ type, route }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleNew = () => navigate(`/${route}/${type}/new`);
  const ADMIN_REGEX = /^\/admin(\/)?$/;
  let content;

  if (!ADMIN_REGEX.test(pathname)) {
    content = <button onClick={handleNew}>+</button>;
  } else {
    content = null;
  }

  return content;
};

export default NewButton;
