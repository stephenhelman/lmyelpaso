import { useNavigate, useLocation } from "react-router-dom";
import { useGetProductsQuery } from "./productsApiSlice";
import { memo } from "react";
import useAuth from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faClock } from "@fortawesome/free-solid-svg-icons";

const Product = ({ productId }) => {
  //add useLocation in order to determine if we are on admin dash
  //conditionally render the table based on location
  //admin => name, lastUpdated
  //products route => name, quantity, created, last updated, Edit button
  //destructure the product to get the variables
  const { product } = useGetProductsQuery("productsList", {
    selectFromResult: ({ data }) => ({
      product: data?.entities[productId],
    }),
  });
  const ADMIN_REGEX = /^\/admin\/updates(\/)?$/;
  const handleEdit = () => navigate(`/home/products/${productId}`);
  const handleHistory = () => {
    navigate(`/admin/updates/${productId}`);
  };

  const { isAdmin } = useAuth();
  const { pathname } = useLocation();

  let content;

  const navigate = useNavigate();
  const created = product.createdAt;

  const updated = product.updates.length
    ? product.updates[product.updates.length - 1].createdAt
    : product.createdAt;

  if (product) {
    if (ADMIN_REGEX.test(pathname)) {
      content = (
        <tr className="table__row">
          <td className="table__cell product__title">{product.name}</td>
          <td>{product.quantity}</td>
          <td>{created}</td>
          <td className="table__cell product__updated">{updated}</td>
          <td className="table__cell">
            <button className="icon-button table__button" onClick={handleEdit}>
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </td>
          <td className="table__cell">
            <button
              className="icon-button table__button"
              onClick={handleHistory}
            >
              <FontAwesomeIcon icon={faClock} />
            </button>
          </td>
        </tr>
      );
    } else {
      const handleEdit = () => navigate(`/home/products/${productId}`);
      content = (
        <tr className="table__row">
          <td className="table__cell product__title">{product.name}</td>
          <td className="table__cell product__title">{product.quantity}</td>
          <td className="table__cell product__created">{created}</td>
          <td className="table__cell product__updated">{updated}</td>
          {isAdmin ? (
            <td className="table__cell">
              <button
                className="icon-button table__button"
                onClick={handleEdit}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
            </td>
          ) : null}
        </tr>
      );
    }
  }

  return content;
};

const memoizedProduct = memo(Product);

export default memoizedProduct;
