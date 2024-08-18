import React, { useState } from "react";
import "../styling/Header.css";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const [isInputInvalid, setIsInputInvalid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") {
      setIsInputInvalid(true);
    } else {
      setIsInputInvalid(false);
      onSearch(query, "search"); // Specify 'search' as the type
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() !== "") {
      setIsInputInvalid(false); // Reset the invalid state if the user enters a valid query
    }
  };

  return (
    <header className="header">
      <h1>Reddit</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Search Reddit"
          className={isInputInvalid ? "input-invalid" : ""}
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;
