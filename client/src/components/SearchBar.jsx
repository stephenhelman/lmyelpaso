import NewButton from "./NewButton";
import useAuth from "../hooks/useAuth";

const SearchBar = ({ search, setSearch, type, route }) => {
  const handleChange = (e) => setSearch(e.target.value);
  const { isAdmin } = useAuth();

  return (
    <>
      <input type="text" value={search} onChange={handleChange} />
      {isAdmin ? <NewButton type={type} route={route} /> : null}
    </>
  );
};

export default SearchBar;
