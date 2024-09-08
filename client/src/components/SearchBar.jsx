import NewButton from "./NewButton";

const SearchBar = ({ search, setSearch, type, route }) => {
  const handleChange = (e) => setSearch(e.target.value);

  return (
    <>
      <input type="text" value={search} onChange={handleChange} />
      <NewButton type={type} route={route} />
    </>
  );
};

export default SearchBar;
