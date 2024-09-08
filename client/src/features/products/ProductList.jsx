import { useGetProductsQuery } from "./productsApiSlice";
import Product from "./Product";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const ProductsList = () => {
  //add useLocation in order to determine if we are on admin dash
  //conditionally render the table based on location
  //admin => name, lastUpdated
  //products route => name, quantity, created, last updated, Edit button
  const { isAdmin } = useAuth();
  const [search, setSearch] = useState("");
  const route = "home";
  const ADMIN_REGEX = /^\/admin\/updates(\/)?$/;
  const { pathname } = useLocation();

  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery("productsList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  const type = "products";

  if (isLoading) content = <PulseLoader color={"#000"} />;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = products;

    const filteredIds = ids.filter((productId) =>
      entities[productId].name.toLowerCase().includes(search.toLowerCase())
    );

    const tableContent =
      ids?.length &&
      filteredIds.map((productId) => (
        <Product key={productId} productId={productId} />
      ));

    content = (
      <>
        <table className="table table--products">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th product__status">
                Name
              </th>
              <th scope="col" className="table__th product__created">
                Quantity
              </th>
              <th scope="col" className="table__th product__updated">
                Created
              </th>
              <th scope="col" className="table__th product__title">
                Updated
              </th>
              {isAdmin ? (
                <th scope="col" className="table__th product__title">
                  Edit
                </th>
              ) : null}
              {ADMIN_REGEX.test(pathname) ? <th>History</th> : null}
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    );
  }

  return (
    <>
      <SearchBar
        search={search}
        setSearch={setSearch}
        type={type}
        route={route}
      />
      {content}
    </>
  );
};
export default ProductsList;
