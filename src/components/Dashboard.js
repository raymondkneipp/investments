import React from "react";
import { connect } from "react-redux";
import { Line, Pie } from "react-chartjs-2";

import { numberWithCommas } from "../func";

const mapStateToProps = (state) => {
  return {
    investments: state.investments,
    theme: state.theme
  };
}

function getTotalGrowth(initial, monthly, months, apy) {
  initial = parseFloat(initial) || 0;
  monthly = parseFloat(monthly) || 0;
  months = parseFloat(months) || 0;
  apy = parseFloat(apy) || 0;

  var total = initial;

  var monthlyRate = apy / 12;
  for (var i = 1; i <= months; i++) {
    let growth = (total + parseFloat(monthly)) * monthlyRate
    total = monthly + total + growth;
  }
  return total.toFixed(2);
}

function getTotalIntrest(initial, monthly, months, apy) {
  initial = parseInt(initial) || 0;
  monthly = parseInt(monthly) || 0;
  months = parseInt(months) || 0;
  apy = parseFloat(apy) || 0;

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

function randomColor() {
  var r = Math.floor(Math.random() * 200);
  var g = Math.floor(Math.random() * 200);
  var b = Math.floor(Math.random() * 200);
  return 'rgba(' + r + ', ' + g + ', ' + b + ', 0.5)';
}

function Dashboard(props) {

  var datasets = [];
  var maxMonths = 0;
  var colors = [];

  var totalGrowth = 0;
  var totalIntrest = 0;

  for (let investment in props.investments) {
    colors.push(randomColor());
    let inv = props.investments[investment];
    let { initial, monthly, months, apy, name } = inv;

    initial = parseFloat(initial) || 0;
    monthly = parseFloat(monthly) || 0;
    months = parseFloat(months) || 0;
    apy = parseFloat(apy) / 100 || 0;

    if (months > maxMonths) {
      maxMonths = months;
    }

    var dataPoints = [];
    var total = initial;
    var monthlyRate = apy / 12;

    for (var i = 1; i <= months; i++) {
      let growth = (total + parseFloat(monthly)) * monthlyRate
      total = monthly + total + growth;
      dataPoints.push(total.toFixed(2));
    }
    datasets.push({
      data: dataPoints,
      label: name,
      backgroundColor: colors[investment]
    });

    totalGrowth += parseFloat(getTotalGrowth(initial, monthly, months, apy));
    totalIntrest += parseFloat(getTotalIntrest(initial, monthly, months, apy));
  }

  var labels = [];
  for (let i = 1; i <= maxMonths; i++) {
    labels.push("Month " + i);
  }

  const lineData = {
    labels,
    datasets
  }


  var names = [];
  var amount = [];
  colors = [];
  for (let investment in props.investments) {
    names.push(props.investments[investment].name);
    amount.push(props.investments[investment].initial);
    colors.push(randomColor());
  }
  const pieData = {
    labels: names,
    datasets: [
      {
        data: amount,
        backgroundColor: colors
      }
    ]
  }

  return (
    <div className="jumbotron jumbotron-fluid px-3 mb-0">

      <table className="table table-bordered text-center">
        <thead>
          <tr className={"text-white bg-"+props.theme}>
            <th>Length</th>
            <th>Current Net Worth</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{numberWithCommas(maxMonths)} months</td>
            <td>${numberWithCommas(amount.reduce((total, num) => {return parseFloat(total)+parseFloat(num)}))}</td>
          </tr>
        </tbody>
        <thead>
          <tr className={"text-white bg-"+props.theme}>
            <th>Total Growth</th>
            <th>Total Intrest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>${numberWithCommas(totalGrowth.toFixed(2))}</td>
            <td>${numberWithCommas(totalIntrest.toFixed(2))}</td>
          </tr>
        </tbody>
      </table>

      <div className="row text-center">
        <div className="col-md-6">
          <Line
            data={lineData}
          />
        </div>
        <div className="col-md-6">
          <h3>Current Allocation</h3>
          <Pie
            data={pieData}
          />
        </div>
      </div>






    </div>
  );
}

export default connect(mapStateToProps)(Dashboard);
