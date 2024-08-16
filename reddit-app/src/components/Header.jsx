import React, { useState } from "react";
import "../styling/Header.css";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <header className="header">
      <h1>Reddit Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Reddit"
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;
