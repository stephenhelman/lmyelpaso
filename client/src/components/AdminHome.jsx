import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/updates">Updates</Link>
    </>
  );
};

export default AdminHome;
