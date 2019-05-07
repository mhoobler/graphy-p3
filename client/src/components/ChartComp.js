import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class ChartComp extends Component {
    constructor(props){
        super(props);

        this.state = {
            setting: "",
            //react-google-charts settings
            options: {
                title: "Age vs. Weight comparison",
                hAxis: { title: "Age", viewWindow: { min: 0, max: 60 } },
                vAxis: { title: "Weight", viewWindow: { min: 0, max: 60 } },
            },
            rows: [
                [1, 3.5, 7],
                [2, 5.5, 13],
                [3, 5, 5],
                [4, 7, 12],
                [5, 12, 6],
                [6, 14, 7]
            ],
            columns: [
                {type: "string", label: "day"},
                {type: "number", label: "high"},
                {type: "number", label: "low"}
            ],
            chartEvents: [
                {
                    eventName: "select",
                    callback({ chartWrapper }) {
                        let x = chartWrapper.getChart().getSelection()
        
                        console.log("Selected ", x[0]);
                        props.handleShow(x[0], props.setting);
                    }

                }
            ]
        }
        
    }

    componentDidMount() {
        let tempRows = [];
        let tempCol = [];
        let keys = this.props.graphInfo.keys;
        
        if(this.props.setting[0] === "high"){
            for(let i=0; i < this.props.graphInfo.keys.length; i++){
                tempRows.push([keys[i], this.props.graphInfo.data[keys[i]]["2. high"], this.props.graphInfo.data[keys[i]]["3. low"]]);
            };
            tempCol = [
                {type: "string", label: "day"},
                {type: "number", label: this.props.setting[0]},
                {type: "number", label: this.props.setting[1]}
            ];
        } else {
            for(let i=0; i < this.props.graphInfo.keys.length; i++){
                tempRows.push([keys[i], this.props.graphInfo.data[keys[i]]["1. open"], this.props.graphInfo.data[keys[i]]["4. close"]]);
            };
            tempCol = [
                {type: "string", label: "day"},
                {type: "number", label: this.props.setting[0]},
                {type: "number", label: this.props.setting[1]}
            ];
        }

        this.setState({
            setting: this.props.setting,
            options:{
                title: this.props.graphInfo.symbol
            },
            rows: tempRows,
            columns: tempCol
        });
    }

    render(){
        return (
            <div> {this.props.setting}
            <Chart
                chartType="LineChart"
                rows={this.state.rows}
                columns={this.state.columns}
                options={this.state.options}
                width="100%"
                height="400px"
                chartEvents={this.state.chartEvents}
            />
            </div>
        )
    }
}

export default ChartComp;