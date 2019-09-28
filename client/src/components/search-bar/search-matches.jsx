import React, {useState, useEffect } from "react"

import SearchMatch from "./search-match"
import { usePrevious } from "../../hooks/index.js";
import { keyCodes } from "../../enums/key-enums.js";

const focusInput = () => {
  document.getElementById("header-search").focus();
}

// handle arrow navigation through menu
const handleKeyDown = ({ target, keyCode}, { current: parent}) => {
  switch (keyCode) {
    case keyCodes.DOWN:
      if (target === parent.lastChild) {
        focusInput();
      } else {
        target.nextSibling.focus()
      }
      break;
    case keyCodes.UP: 
      if (target === parent.firstChild) {
        focusInput();
      } else {
        target.previousSibling.focus()
      }
      break;
    default: return;
  }
}

const SearchMatches = React.forwardRef(({ matches, addPill }, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const previousMatches = usePrevious(matches);

  const handleClick = e => {
    // close content if open and user clicks anywhere else
    if (isOpen && ref.current && !ref.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    
    return () => {
      document.removeEventListener("click", handleClick);
    }
  }, [isOpen]);

  useEffect(() => {
    // open content if we receive new matches
    if (previousMatches !== matches && !isOpen) {
      setIsOpen(true);
    }    
  }, [matches, isOpen, previousMatches]);

  return matches.length ? (
    <ul
      className="SearchMatches"
      ref={ref}
      onKeyDown={e => handleKeyDown(e, ref)}
      style={{ ...!isOpen && { display: "none" } }}
    >
      {matches.map(match =>
        <SearchMatch
          key={`${match.imdbID}`}
          addPill={() => addPill(match)}
          match={match}
        />
      )}
    </ul>
  ) : null;
})

export default SearchMatches;