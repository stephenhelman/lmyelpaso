import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "./usersApiSlice";
import { memo } from "react";
import ActiveCheckBox from "./ActiveCheckBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

const User = ({ userId }) => {
  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  let content;

  const navigate = useNavigate();

  if (user) {
    const { username, phone, email, roles, active } = user;
    const userRolesString = roles.toString().replaceAll(",", ", ");

    const handleEdit = () => navigate(`/admin/users/${userId}`);
    content = (
      <tr className="table__row">
        <td className="table__cell user__title">{username}</td>
        <td className="table__cell user__title">{phone}</td>
        <td className="table__cell user__created">{email}</td>
        <td className="table__cell user__updated">{userRolesString}</td>
        <td className="table__cell">
          <ActiveCheckBox active={active} user={user} />
        </td>
        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  }

  return content;
};

const memoizedUser = memo(User);

export default memoizedUser;
