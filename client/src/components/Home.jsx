import { Link } from "react-router-dom";
import HomeUpdates from "../features/updates/HomeUpdates";
const Home = () => {
  return (
    <>
      <div>
        <HomeUpdates />
      </div>
      <div>
        <Link to="/home/products">Products</Link>
        <Link to="/home/scan">Scanner</Link>
      </div>
    </>
  );
};

export default Home;
