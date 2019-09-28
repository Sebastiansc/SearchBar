import React, { useState, useRef } from "react";

import "./search-bar.css";
import SearchMatches from "./search-matches";
import SearchPills from "./search-pills";
import { keyCodes } from "../../enums/key-enums.js";

const addPill = (pill, pills, setPills) => {
  if (pills.indexOf(pill) > -1 || pills.length === 5) {
    return;
  }

  return setPills([...pills, pill]);
}

const handleChange = async ({ target: { value } }, setMatches, setSearchValue) => {
  setSearchValue(value);

  const response = await fetch(`/api/search?movie=${value}`);
  const data = await response.json();
  setMatches(data.Search || []);
}

const handleKeyDown = (e, matchesRef) => {
  if (e.keyCode === keyCodes.DOWN && matchesRef.current) {
    matchesRef.current.children[0].focus();
  }
}

const SearchBarComponent = () => {
  const [searchValue, setSearchValue] = useState("");
  const [matches, setMatches] = useState([]);
  const [pills, setPills] = useState([]);
  const matchesRef = useRef();

  return (
    <div className="SearchBar">
      <SearchPills pills={pills} setPills={setPills}/>
      <div className="SearchBar-search">
        <form role='search' onSubmit={e => e.preventDefault()} autoComplete="off">
          <label htmlFor='header-search'>
            <span className='visually-hidden'>Search</span>
          </label>
          <input
            onChange={e => handleChange(e, setMatches, setSearchValue)}
            onKeyDown={e => handleKeyDown(e, matchesRef, matches)}
            type="text"
            id="header-search"
            placeholder="Search.."
            value={searchValue}
          />
        </form>
        <SearchMatches 
          ref={matchesRef}
          matches={matches}
          addPill={pill => addPill(pill, pills, setPills)}
        />
      </div>
    </div>
  );
}



export default SearchBarComponent;