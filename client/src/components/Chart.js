import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

const options = {
    title: "Age vs. Weight comparison",
    hAxis: { title: "Age", viewWindow: { min: 0, max: 15 } },
    vAxis: { title: "Weight", viewWindow: { min: 0, max: 15 } },
    legend: "none"
};

const data = [
    ["Age", "Weight"],
    [3, 3.5],
    [4, 5.5],
    [5, 5],
    [6.5, 7],
    [8, 12],
    [11, 14]
  ];

class ChartComp extends Component {
    constructor(props){
        super(props)
        
    }

    componentDidMount() {
        console.log(this.props.foo);
    }

    render(){
        return (
        <Chart
            chartType="LineChart"
            data={data}
            options={options}
            width="80%"
            height="400px"
            legendToggle
        />)
    }
}

export default ChartComp;