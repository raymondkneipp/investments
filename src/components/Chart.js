import React from "react";
import { Line } from "react-chartjs-2";

function Chart(props) {
  let { initial, monthly, months, apy, name } = props.investment;

  initial = parseInt(initial) || 0;
  monthly = parseInt(monthly) || 0;
  months = parseInt(months) || 0;
  apy = parseFloat(apy) / 100 || 0;


  var dataPoints = [];
  var labels = [];
  var total = initial;
  var monthlyRate = apy / 12;

  for (var i = 1; i <= months; i++) {
    let growth = (total + parseInt(monthly)) * monthlyRate
    total = monthly + total + growth;
    dataPoints.push(total.toFixed(2));
    labels.push("Month " + i);
  }

  const data = {
    labels,
    datasets: [
      {
        label: name,
        data: dataPoints
      }
    ]
  };

  return (

    <div className="chart mt-3">
      <Line
        data={data}
        options={{
          legend: {
            display: false
          }
        }}
      />
    </div>

  );
}

export default Chart;
