import UpdatesFeed from "./UpdatesFeed";
import { useGetUpdatesQuery } from "./updatesSlice";
import { PulseLoader } from "react-spinners";

const ProductUpdate = ({ product }) => {
  const {
    data: updates,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUpdatesQuery("updatesList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading)
    content = (
      <tr>
        <td colSpan="5">
          <PulseLoader color={"#000"} />
        </td>
      </tr>
    );

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const updatesProp = [];
    const type = "admin";
    const { entities } = updates;
    const entitiesArray = Object.values(entities);
    const filteredArray = entitiesArray.filter(
      (update) => update.type && update.type !== "Admin"
    );
    const productUpdates = filteredArray.filter(
      (update) => update.product === product.name
    );
    productUpdates.forEach((update) => {
      const newUpdate = {
        id: update.id,
        productName: update.product,
        type: update.type,
        difference: update.difference,
        user: update.user,
        timestamp: update.createdAt,
      };
      updatesProp.push(newUpdate);
    });
    content = <UpdatesFeed updates={updatesProp} type={type} />;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Product</th>
          <th>Action</th>
          <th>QTY Change</th>
          <th>User</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

export default ProductUpdate;
