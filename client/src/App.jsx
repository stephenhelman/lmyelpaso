import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Welcome from "./components/Welcome";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Home from "./components/Home";
import Scanner from "./components/Scanner";
import Results from "./features/products/Results";
import ProductList from "./features/products/ProductList";
import EditProduct from "./features/products/EditProduct";
import NewProduct from "./features/products/NewProduct";
import { ScannerProvider } from "./features/context/ScannerProvider";
import Prefetch from "./features/auth/Prefetch";
import RequireAuth from "./features/auth/RequireAuth";
import { ROLES } from "./config/roles";
import PersistLogin from "./features/auth/PersistLogin";
import Inactive from "./components/Inactive";
import AdminDash from "./components/AdminDash";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUser from "./features/users/NewUser";
import AdminHome from "./components/AdminHome";
import NotFound from "./components/NotFound";
import UpdatesDash from "./features/updates/UpdatesDash";
import ProductPageLayout from "./features/products/ProductPageLayout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Unprotected Routes */}
        <Route index element={<Welcome />} />
        <Route path="login" element={<Login />} />
        <Route path="inactive" element={<Inactive />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route
            element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}
          >
            <Route element={<Prefetch />}>
              <Route path="home" element={<DashLayout />}>
                <Route index element={<Home />} />
                <Route element={<ScannerProvider />}>
                  <Route path="scan" element={<Scanner />} />
                  <Route path="results" element={<Results />} />
                </Route>
                <Route path="not-found" element={<NotFound />} />

                <Route path="products">
                  <Route index element={<ProductList />} />
                  <Route path=":productId" element={<EditProduct />} />
                  <Route path="new" element={<NewProduct />} />
                </Route>
                <Route path="users/new" element={<NewUser />} />
              </Route>
              <Route element={<RequireAuth allowedRoles={ROLES.Admin} />}>
                <Route path="admin" element={<AdminDash />}>
                  <Route index element={<AdminHome />} />
                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route path="new" element={<NewUser />} />
                    <Route path=":userId" element={<EditUser />} />
                  </Route>
                  <Route path="updates">
                    <Route index element={<UpdatesDash />} />
                    <Route path=":productId" element={<ProductPageLayout />} />
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
