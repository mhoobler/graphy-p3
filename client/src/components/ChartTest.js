import * as React from "react";
import { Chart } from "react-google-charts";

var options = {

    legend: 'none',
    hAxis: { minValue: 0, maxValue: 9 },
    curveType: 'function',
    pointSize: 7

}

var chartEvents = [
  {
    eventName: 'select',
    callback: ({ chartWrapper }) => {
      const chart = chartWrapper.getChart()
      const selection = chart.getSelection()
      if (selection.length === 1) {
        const [selectedItem] = selection
        const dataTable = chartWrapper.getDataTable()
        const { row, column } = selectedItem
        alert(
          'You selected : ' +
            JSON.stringify({
              row,
              column,
              value: dataTable.getValue(row, column),
            }),
          null,
          2,
        )
      }
      console.log(selection)
    },
  },
];
const ExampleChart = () => {
  return (
    <Chart
      chartType="LineChart"
      data={
        [['X', 'Y', {'type': 'string', 'role': 'style'}],
          [1, 3, null],
          [2, 2.5, null],
          [3, 3, null],
          [4, 4, null],
          [5, 4, null],
          [6, 3, 'point { size: 18; shape-type: star; fill-color: #a52714; }'],
          [7, 2.5, null],
          [8, 3, null]
        ]
      }
      options = {options}
      width={"100%"}
      height={"400px"}
      chartEvents={chartEvents}
      legendToggle
    />
  );
};
export default ExampleChart;