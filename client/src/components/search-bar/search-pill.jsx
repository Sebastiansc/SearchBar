import React from "react";

const SearchPill = ({ pill, removePill }) => {
	return (
		<li className="SearchPill">
			<span>{pill.Title}</span>
      <button 
        type="button"
        aria-label="Click here to remove this pill"
        onClick={removePill}
      >
        <span>X</span>
      </button>
		</li>
	);
}

export default SearchPill;
