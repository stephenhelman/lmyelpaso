//Container for Update Feed on Home Page
//map over updates array to create a new array of updates providing the necessary information
//{id, productName, user, timestamp, message}
//passes the new updates array as a prop to UpdatesFeed

import UpdatesFeed from "./UpdatesFeed";
import { useGetUpdatesQuery } from "./updatesSlice";
import { PulseLoader } from "react-spinners";

import React from "react";

const HomeUpdates = () => {
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
        <td colSpan="4">
          <PulseLoader color={"#000"} />
        </td>
      </tr>
    );

  if (isError) {
    content = <p>{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const updatesProp = [];
    const type = "home";
    const { entities } = updates;
    const entitiesArray = Object.values(entities);
    entitiesArray.forEach((update) => {
      const newUpdate = {
        id: update.id,
        productName: update.product,
        user: update.user,
        timestamp: update.createdAt,
        message: update.message,
      };
      updatesProp.push(newUpdate);
    });
    content = <UpdatesFeed updates={updatesProp} type={type} />;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Product Name</th>
          <th>User</th>
          <th>Time</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>{content}</tbody>
    </table>
  );
};

export default HomeUpdates;
