import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { isAdmin, isManager } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const HOME_REGEX = /^\/home(\/)?$/;
  const PRODUCTS_REGEX = /^\/home\/products(\/)?$/;
  const SCAN_REGEX = /^\/home\/scan(\/)?$/;
  const USERS_REGEX = /^\/home\/users\/new(\/)?$/;
  const ADMIN_REGEX = /^\/admin(\/)?$/;

  let homeButton = null;
  let productsButton = null;
  let scanButton = null;
  let registerButton = null;
  let adminButton = null;

  const onHomeClicked = () => navigate("/home");
  const onProductsClicked = () => navigate("/home/products");
  const onScanClicked = () => navigate("/home/scan");
  const onRegisterClicked = () => navigate("/home/users/new");
  const onAdminClicked = () => navigate("/admin");

  if (!HOME_REGEX.test(pathname)) {
    homeButton = (
      <button type="button" title="Go Home" onClick={onHomeClicked}>
        Home
      </button>
    );
  }

  if (!PRODUCTS_REGEX.test(pathname)) {
    productsButton = (
      <button
        type="button"
        title="Open Products List"
        onClick={onProductsClicked}
      >
        Products
      </button>
    );
  }
  if (!SCAN_REGEX.test(pathname)) {
    scanButton = (
      <button type="button" title="Scan Product" onClick={onScanClicked}>
        Scan
      </button>
    );
  }
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname)) {
      registerButton = (
        <button
          type="button"
          title="Register New User"
          onClick={onRegisterClicked}
        >
          Register
        </button>
      );
    }
  }
  if (isAdmin) {
    if (!ADMIN_REGEX.test(pathname)) {
      adminButton = (
        <button type="button" title="Go to admin dash" onClick={onAdminClicked}>
          Admin
        </button>
      );
    }
  }

  return (
    <header>
      <nav>
        {homeButton}
        {productsButton}
        {scanButton}
        {registerButton}
        {adminButton}
      </nav>
    </header>
  );
};

export default Header;
