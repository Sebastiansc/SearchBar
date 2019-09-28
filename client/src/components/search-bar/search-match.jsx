import React from "react";

import { keyCodes } from "../../enums/key-enums.js";

const handleKeyDown = ({ keyCode }, addPill) => {
  if (keyCode === keyCodes.ENTER || keyCode === keyCodes.SPACE) {
    addPill();
  }
}
const SearchMatch = ({ match = {}, addPill }) => {
  const {
    Title
  } = match
  return (
    <li 
      className="SearchMatch"
      role="button"
      onKeyDown={e => handleKeyDown(e, addPill)}
      onClick={addPill}
      tabIndex="0">
      <span>{Title}</span>
    </li>
  );
}

export default SearchMatch;
