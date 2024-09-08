//Container for Update Feed in Admin Section
//Filters updates based on 'add' or 'remove' on all updates
//map over updates array to create a new array of updates providing the necessary information
//{id, productName, type, user, timestamp}
//passes the new updates array as a prop to UpdatesFeed
import UpdatesFeed from "./UpdatesFeed";
import { useGetUpdatesQuery } from "./updatesSlice";
import { PulseLoader } from "react-spinners";

import React from "react";

const AdminUpdates = () => {
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
    filteredArray.forEach((update) => {
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

export default AdminUpdates;
