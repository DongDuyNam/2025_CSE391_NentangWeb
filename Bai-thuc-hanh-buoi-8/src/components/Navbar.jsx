import React from 'react';

const Navbar = () => {
  return (
    <nav className="nav-bar">
      <div className="nav-links">
        <h1>TLU</h1>
        <a href="#">Home</a>
        <a href="#" className="active">Employees</a>
      </div>
      <div className="search-area">
        <input type="text" placeholder="Search" />
        <button>Search</button>
      </div>
    </nav>
  );
};

export default Navbar;