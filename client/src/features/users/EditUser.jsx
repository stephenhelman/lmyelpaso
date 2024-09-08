import { PulseLoader } from "react-spinners";
import EditUserForm from "./EditUserForm";
import { useGetUsersQuery } from "./usersApiSlice";
import { useParams } from "react-router-dom";

const EditUser = () => {
  const { userId } = useParams();

  const { user } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      user: data?.entities[userId],
    }),
  });

  if (!user) return <PulseLoader color={"#000"} />;

  const content = <EditUserForm user={user} />;

  return content;
};

export default EditUser;
