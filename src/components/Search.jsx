import React, { useState } from 'react';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');

  return (
    <div className="header_container_search">
      <input
        className="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
    </div>
  );
};

export default Search;
