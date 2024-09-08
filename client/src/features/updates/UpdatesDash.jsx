//hosts 2 sections
//Section 1: AdminProductList
//Section 2: AdminUpdates

import ProductsList from "../products/ProductList";
import AdminUpdates from "./AdminUpdates";

const UpdatesDash = () => {
  return (
    <>
      <ProductsList />
      <AdminUpdates />
    </>
  );
};

export default UpdatesDash;
