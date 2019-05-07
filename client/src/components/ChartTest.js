import * as React from "react";
import { Chart } from "react-google-charts";
 
const ExampleChart = () => {
  return (
    <Chart
      chartType="ScatterChart"
      rows={[[8, true], [4, true], [11, true], [4, true], [3, true], [6.5, true]]}
      columns={[
        {
          type: "number",
          label: "Age"
        },
        {
            type: "boolean",
            label: "Bool"
        }
      ]}
      options={
        // Chart options
        {
          title: "Age vs. Weight comparison",
          hAxis: {
            title: "Age",
            viewWindow: { min: 0, max: 15 }
          },
          vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
          legend: "none"
        }
      }
      width={"100%"}
      height={"400px"}
      legendToggle
    />
  );
};
export default ExampleChart;