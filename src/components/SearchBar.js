import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/SearchBar.css";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchContainerRef = useRef(null);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/users/search-users?username=${e.target.value}`
      );
      setSearchResults(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error searching users:", error);
      setSearchResults([]);
      setShowDropdown(true);
    }
  };

  const handleClickOutside = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target)
    ) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleUserClick = (username) => {
    navigate(`/profile/${username}`);
  };

  return (
    <div className="search-container" ref={searchContainerRef}>
      <input
        type="text"
        className="search-input"
        placeholder="Search by username"
        value={searchTerm}
        onChange={handleSearch}
      />
      {showDropdown && (
        <div className="search-dropdown">
          {searchResults.length > 0 ? (
            searchResults.map((user) => (
              <div
                key={user.uid}
                className="search-dropdown-item"
                onClick={() => handleUserClick(user.username)}
              >
                {user.username}
              </div>
            ))
          ) : (
            <div className="no-results">No users found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
