import React from "react";
import { connect } from "react-redux";

import Chart from "./Chart";

import { numberWithCommas } from "../func";

import {
  updateInvestment,
  deleteInvestment
} from "../actions/"

const mapStateToProps = (state, ownProps) => {
  return {
    investment: state.investments.find(investment => investment.id === ownProps.match.params.id),
    theme: state.theme
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateInvestment: (id, field, newValue) => dispatch(updateInvestment(id, field, newValue)),
    deleteInvestment: (id) => dispatch(deleteInvestment(id))
  };
}

const handleChange = (props, e) => {
  props.updateInvestment(props.match.params.id, e.target.name, e.target.value);
}

const handleDelete = (props) => {
  props.deleteInvestment(props.match.params.id);
}

function getTotalGrowth(initial, monthly, months, apy) {
  initial = parseInt(initial) || 0;
  monthly = parseInt(monthly) || 0;
  months = parseInt(months) || 0;
  apy = parseFloat(apy) / 100 || 0;

  var total = initial;

  var monthlyRate = apy / 12;
  for (var i = 1; i <= months; i++) {
    let growth = (total + parseInt(monthly)) * monthlyRate
    total = monthly + total + growth;
  }
  return total.toFixed(2);
}

function getTotalIntrest(initial, monthly, months, apy) {
  initial = parseInt(initial) || 0;
  monthly = parseInt(monthly) || 0;
  months = parseInt(months) || 0;
  apy = parseFloat(apy) / 100 || 0;

  var total = initial;
  var totalIntrest = 0;

  var monthlyRate = apy / 12;
  for (var i = 1; i <= months; i++) {
    let growth = (total + parseInt(monthly)) * monthlyRate
    total = monthly + total + growth;
    totalIntrest += growth;
  }
  return totalIntrest.toFixed(2);
}

function Investment(props) {
  if (props.investment == null) {
    props.history.push("/");
    return (<p className="text-center mt-5">Investment with id:<br/><strong>{props.match.params.id}</strong><br/>not found</p>);
  } else {
    const { name, initial, monthly, months, apy } = props.investment;
    return (
      <div className="row mx-0 my-3">
        <div className="col-12 col-md-5">
          <div className={"card border-"+props.theme}>
            <div className="card-header">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Name" value={name} name="name" onChange={(e) => handleChange(props, e)} />
              </div>
            </div>
            <div className="card-body">

              <label htmlFor="initial"><i className="fas fa-piggy-bank"></i> Initial Deposit</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="number" className="form-control" id="initial" placeholder="Initial Deposit" value={initial} name="initial" onChange={(e) => handleChange(props, e)} />
              </div>
              <label htmlFor="monthly"><i className="far fa-calendar-alt"></i> Monthly Deposit</label>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input type="number" className="form-control" id="monthly" placeholder="Monthly Deposit" value={monthly} name="monthly" onChange={(e) => handleChange(props, e)} />
              </div>
              <label htmlFor="monthly"><i className="far fa-clock"></i> Months</label>
              <div className="input-group mb-3">
                <input type="number" className="form-control" id="months" placeholder="Months" value={months} name="months" onChange={(e) => handleChange(props, e)} />
              </div>
              <label htmlFor="monthly"><i className="fas fa-chart-line"></i> APY</label>
              <div className="input-group mb-3">
                <input type="number" className="form-control" id="apy" placeholder="APY" value={apy} name="apy" onChange={(e) => handleChange(props, e)} />
                <div className="input-group-append">
                  <span className="input-group-text">%</span>
                </div>
              </div>

              <button className="btn btn-danger" onClick={() => handleDelete(props)}>
                <i className="fas fa-trash-alt"></i> Delete
              </button>

            </div>
          </div>
        </div>
        <div className="col-12 col-md-7">

          <div className={"card border-"+props.theme}>
            <div className="card-header">
              <h5 className="text-center mb-0">{months} Month Totals</h5>
            </div>

            <table className="table text-center border-0">
              <thead>
                <tr className={"text-white bg-"+props.theme}>
                  <th>Growth</th>
                  <th>Monthly Deposits</th>
                  <th>Intrest</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${numberWithCommas(getTotalGrowth(initial, monthly, months, apy))}</td>
                  <td>${numberWithCommas(months * monthly)}</td>
                  <td>${numberWithCommas(getTotalIntrest(initial, monthly, months, apy))}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <Chart investment={props.investment}/>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Investment);
