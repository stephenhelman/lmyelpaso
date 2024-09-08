import { store } from "../../app/store";
import { productsApiSlice } from "../products/productsApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { updatesApiSlice } from "../updates/updatesSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(
      productsApiSlice.util.prefetch("getProducts", "productsList", {
        force: true,
      })
    );
    store.dispatch(
      usersApiSlice.util.prefetch("getUsers", "usersList", { force: true })
    );
    store.dispatch(
      updatesApiSlice.util.prefetch("getUpdates", "updatesList", {
        force: true,
      })
    );
  }, []);

  return <Outlet />;
};
export default Prefetch;
