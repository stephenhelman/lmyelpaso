import { useState } from "react";
import { useUpdateUserMutation } from "./usersApiSlice";

const ActiveCheckBox = ({ active, user }) => {
  const [toggleActive, setToggleActive] = useState(active);
  const [updateUser] = useUpdateUserMutation();

  const { id, firstName, lastName, phone, email, username, roles } = user;

  const handleActiveClicked = async () => {
    setToggleActive((prev) => !prev);
    await updateUser({
      id,
      firstName,
      lastName,
      phone,
      email,
      username,
      roles,
      active: !active,
    });
  };
  return (
    <input
      type="checkbox"
      checked={toggleActive}
      onChange={handleActiveClicked}
    />
  );
};

export default ActiveCheckBox;
