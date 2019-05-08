import React from "react";
import { NavLink } from "react-router-dom";

function Navbar(props) {
  return (
      <NavLink activeClassName="active" to={"/" + props.investment.id} className="list-group-item list-group-item-action text-truncate"><i className="far fa-circle"></i> {props.investment.name}</NavLink>
  );
}

export default Navbar;
