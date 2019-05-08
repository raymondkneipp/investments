import React from "react";
import { connect } from "react-redux";
import uuid from "uuid";

import { addInvestment } from "../actions/"

function mapDispatchToProps(dispatch) {
  return {
    addInvestment: investment => dispatch(addInvestment(investment))
  };
}

const handleClick = (props) => {
  props.addInvestment({
    id: uuid.v4(),
    name: "New Investment",
    initial: 100,
    monthly: 10,
    apy: 0,
    months: 12
  });
}

function AddInvestment(props) {
  return (
    <button type="button" className={"list-group-item list-group-item-action text-white rounded-0 bg-"+props.theme} onClick={() => handleClick(props)}>
      <i className="fas fa-plus"></i> Add Investment
    </button>
  );
}

export default connect(null, mapDispatchToProps)(AddInvestment);
