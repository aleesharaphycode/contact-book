function SearchBar({ searchTerm, onSearch }) {
  return (
    <input
      type="text"
      className="search-bar"
      placeholder="🔍 Search contacts..."
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

export default SearchBar;