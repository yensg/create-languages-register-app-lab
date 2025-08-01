import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="container border border-secondary">
        <div className="col-sm-6">
          <Link to="languages">Langauges</Link>
        </div>
        <div className="col-sm-6">
          <Link to="users">Users</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
