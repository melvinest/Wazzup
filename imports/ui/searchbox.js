import React from 'react';

export default ({ handleSearchBoxChange, searchBoxInput }) => {
  return (
    <div className="search-container">
      <input
        className="searchbox"
        onChange={(e) => { handleSearchBoxChange(e); }}
        type="textbox"
        placeholder="Search or start new chat"
        value={searchBoxInput}
      />
    </div>
  );
};