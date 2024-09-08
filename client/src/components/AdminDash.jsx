import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const AdminDash = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default AdminDash;
