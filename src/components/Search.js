// @flow
import React from "react";

function Search({ searchHandler, setSortParam, value }) {
  return (
    <div className="search">
      <p>
        search: <input type="text" onChange={searchHandler} value={value} />
      </p>
      <div onChange={setSortParam}>
        sort by:{" "}
        <input type="radio" value="countryname" defaultChecked name="param" />{" "}
        Name <input type="radio" value="population" name="param" /> Population{" "}
        <input type="radio" value="language" name="param" /> Language{" "}
      </div>
    </div>
  );
}

export default Search;
