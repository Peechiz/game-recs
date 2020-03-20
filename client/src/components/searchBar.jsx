import React from "react";

const SearchBar = ({ search, setSearch, onSearch }) => {

  const onEnter = e => {
    if (e.key === 'Enter' && search !== ''){
      onSearch();
    }
  }

  return (
    <div className="input-group mb-3">
      <input
        className="form-control"
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={e => onEnter(e)}
      />
      <div className="input-group-append">
        <button className="btn btn-primary" onClick={onSearch}>search</button>
      </div>
    </div>
  );
};

export default SearchBar;
