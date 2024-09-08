import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import PulseLoader from "react-spinners/PulseLoader";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";

const UsersList = () => {
  const [search, setSearch] = useState("");
  const route = "admin";

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 15000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;
  const type = "users";

  if (isLoading)
    content = (
      <tr>
        <td colSpan="5">
          <PulseLoader color={"#000"} />
        </td>
      </tr>
    );

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids, entities } = users;

    const filteredIds = ids.filter((userId) =>
      entities[userId].username.toLowerCase().includes(search.toLowerCase())
    );

    const tableContent =
      ids?.length &&
      filteredIds.map((userId) => <User key={userId} userId={userId} />);

    content = (
      <>
        <table className="table table--users">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th user__status">
                Username
              </th>
              <th scope="col" className="table__th user__created">
                Phone
              </th>
              <th scope="col" className="table__th user__updated">
                Email
              </th>
              <th scope="col" className="table__th user__title">
                Roles
              </th>
              <th scope="col" className="table__th user__title">
                Active
              </th>
              <th scope="col" className="table__th user__title">
                Edit
              </th>
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
export default UsersList;
