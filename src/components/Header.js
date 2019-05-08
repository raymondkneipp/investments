import React from "react";
import { connect } from "react-redux";

import {
  toggleNavbar,
  changeTheme
} from "../actions/";

function mapDispatchToProps(dispatch) {
  return {
    toggleNavbar: () => dispatch(toggleNavbar()),
    changeTheme: (theme) => dispatch(changeTheme(theme))
  };
}

function mapStateToProps(state) {
  return {
    theme: state.theme
  };
}

const handleToggle = (props) => {
  props.toggleNavbar();
}

const handleTheme = (props, theme) => {
  props.changeTheme(theme);
}

function Header(props) {
  return (
    <div className={"py-2 header d-flex justify-content-between align-items-center bg-"+props.theme}>
      <button className={"btn ml-2 btn-"+props.theme} onClick={() => handleToggle(props)}>
        <i className="fas fa-bars"></i>
      </button>
      <h2 className="text-white text-center mb-0 d-flex flex-row justify-content-center align-items-center">
        <i className="fas fa-chart-line mr-2"></i><span className="d-none d-sm-block"> Investments</span>
      </h2>

      <div className="dropdown mr-2">
        <button className={"btn dropdown-toggle btn-"+props.theme} type="button" data-toggle="dropdown">
          <i className={"fas fa-circle border border-light rounded-circle thick text-"+props.theme}></i>
        </button>
        <div className="dropdown-menu">
          <button className="dropdown-item" type="button" onClick={() => handleTheme(props, "primary")}>
            <i className="fas fa-circle border border-dark rounded-circle thick text-primary"></i>
          </button>
          <button className="dropdown-item" type="button" onClick={() => handleTheme(props, "danger")}>
            <i className="fas fa-circle border border-dark rounded-circle thick text-danger"></i>
          </button>
          <button className="dropdown-item" type="button" onClick={() => handleTheme(props, "success")}>
            <i className="fas fa-circle border border-dark rounded-circle thick text-success"></i>
          </button>
          <button className="dropdown-item" type="button" onClick={() => handleTheme(props, "dark")}>
            <i className="fas fa-circle border border-dark rounded-circle thick text-dark"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
