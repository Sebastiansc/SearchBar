import React from "react"

import SearchPill from "./search-pill"

const SearchPills = ({ pills, setPills }) => {
  const updatePills = pill => {
    const newPills = [];
    pills.forEach(current => {
      if (current !== pill) {
        newPills.push(current);
      }
    });
    setPills(newPills);
  }

  return pills.length ? (
    <ul className="SearchBar-pills">
      {pills.map(pill => {
        return (
          <SearchPill
            key={`${pill.imdbID}`}
            pill={pill}
            removePill={() => updatePills(pill)}
          />
        )
      }
      )}
    </ul>
  ) : null;
}

export default SearchPills;