import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

const chartEvents = [
    {
      eventName: "select",
      callback({ chartWrapper }) {
        console.log("Selected ", chartWrapper.getChart().getSelection());
      }
    }
  ];

class ChartComp extends Component {
    constructor(props){
        super(props);

        this.state = {
            obj: null,
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
            ]
        }
        
    }

    componentDidMount() {
        let tempRows = [];
        let tempCol = [];
        let keys = this.props.obj.keys;
        // console.log(this.props);
        // switch(this.state.setting){
        //     case "highLow":
        //         for(let i=0; i < this.props.obj.keys.length; i++){
        //             tempRows.unshift([keys[i], this.props.obj.data[keys[i]]["2. high"], this.props.obj.data[keys[i]]["3. low"]]);
        //         }
        //         break;
        //     case "openClose":
        //         for(let i=0; i < this.props.obj.keys.length; i++){
        //             tempRows.unshift([keys[i], this.props.obj.data[keys[i]]["1. open"], this.props.obj.data[keys[i]]["4. close"]]);
        //         }
        //         break;
        //     default:
        //         console.log("Error with chart 'setting'");
        // }
        
        if(this.props.setting === "highLow"){
            for(let i=0; i < this.props.obj.keys.length; i++){
                tempRows.unshift([keys[i], this.props.obj.data[keys[i]]["2. high"], this.props.obj.data[keys[i]]["3. low"]]);
            };
            tempCol = [
                {type: "string", label: "day"},
                {type: "number", label: "high"},
                {type: "number", label: "low"}
            ];
        } else {
            for(let i=0; i < this.props.obj.keys.length; i++){
                tempRows.unshift([keys[i], this.props.obj.data[keys[i]]["1. open"], this.props.obj.data[keys[i]]["4. close"]]);
            };
            tempCol = [
                {type: "string", label: "day"},
                {type: "number", label: "open"},
                {type: "number", label: "close"}
            ];
        }

        this.setState({
            setting: this.props.setting,
            options:{
                title: this.props.foo
            },
            rows: tempRows,
            columns: tempCol
        });
    }

    render(){
        return (
            <div> {this.props.setting}
            <Chart
                chartType="Line"
                rows={this.state.rows}
                columns={this.state.columns}
                options={this.state.options}
                width="100%"
                height="400px"
                chartEvents={chartEvents}
            />
            </div>
        )
    }
}

export default ChartComp;