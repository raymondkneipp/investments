import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/navbar/Navbar";
import Dashboard from "./components/Dashboard";
import Investment from "./components/Investment";

const mapStateToProps = state => {
  return {
    navbarOpen: state.navbarOpen
  };
}

function App(props) {
  return (
    <Router>
      <Header />
      <Navbar navbarOpen={props.navbarOpen} />
      <div className={props.navbarOpen ? "content" : "navClosed content" } >
        <Route path="/" exact component={Dashboard} />
        <Route path="/:id" exact component={Investment} />
      </div>
    </Router>
  );
}

export default connect(mapStateToProps)(App);
