import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import NavbarItem from "./NavbarItem";
import AddInvestment from "../AddInvestment";

function mapStateToProps(state) {
  return {
    investments: state.investments,
    theme: state.theme
  };
}

function Navbar(props) {
  return (
    <nav style={props.navbarOpen ? {left: "0"} : {left: "-240px"}}>
      <div className="card border-left-0 border-top-0">
        <ul className="list-group list-group-flush">
          <NavLink to="/" activeClassName="active" exact={true} className="list-group-item list-group-item-action">
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </NavLink>
        </ul>
        <div className={"card-body text-white bg-"+props.theme}><i className="fas fa-chart-line"></i> Investments <i className="fas fa-angle-down"></i></div>
        <ul className="list-group list-group-flush">
          {props.investments.map(investment => (
            <NavbarItem investment={investment} key={investment.id} />
          ))}
          <AddInvestment theme={props.theme} />
        </ul>
      </div>
    </nav>
  );
}

export default connect(mapStateToProps)(Navbar);
