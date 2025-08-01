import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="container border border-secondary">
        <div className="col-sm-4">
          <Link to="languages">Languages</Link>
        </div>
        <div className="col-sm-4">
          <Link to="users">Users</Link>
        </div>
        <div className="col-sm-4">
          <Link to="updateModal">UpdateModal</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
