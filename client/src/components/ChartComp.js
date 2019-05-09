import React, { Component } from 'react';
import { Chart } from 'react-google-charts';

class ChartComp extends Component {
    constructor(props){
        super(props);

        this.state = {
            setting: "",
            //react-google-charts settings
            options: {
                title: "Results from search will appear here",
                hAxis: { title: "Sample"},
                vAxis: { title: "Example"},
                pointSize: 1
            },
            rows: [
                [1, 3.5, 7, null],
                [2, 5.5, 13, null],
                [3, 5, 5, null],
                [4, 7, 12, null],
                [5, 12, 6, null],
                [6, 14, 7, 'point { size: 18; shape-type: star; fill-color: #a52714; }']
            ],
            columns: [
                {type: "string", label: "day"},
                {type: "number", label: 'Test2'},
                {type: "number", label: 'Test'},
                {'type': 'string', 'role': 'style'}
            ],
            chartEvents: [
                {
                    eventName: "select",
                    callback({ chartWrapper }) {
                        let x = chartWrapper.getChart().getSelection();
                        let pins = []
                        console.log({
                            SELECTED: x[0], 
                            GRAPHINFO: props.graphInfo
                        });
                        if(x[0] !== undefined && props.graphInfo !== undefined){
                            console.log(x[0]);
                            if(props.graphInfo.pins.length > 0){
                                pins = props.graphInfo.pins;
                                for(var p=0; p<pins.length; p++){
                                    console.log(x);
                                    if(pins[p].date === props.graphInfo.keys[x[0].row]){
                                        console.log("??? SUCCESS: " + pins[p].data);
                                        props.handleShow(x[0], props.setting, {title: pins[p].title, body: pins[p].body});
                                        break;
                                    }else{
                                        console.log("!!!");
                                        props.handleShow(x[0], props.setting);
                                    }
                                }

                            }else {
                                console.log("Selected ", x[0]);
                                props.handleShow(x[0], props.setting);
                            }
                        } else if(x[0] !== undefined) {
                            console.log("Selected ", x[0]);
                            props.handleShow(x[0], props.setting);
                        }
                    }
                }
            ]
        }
        
    }

    componentDidMount() {
        if(this.props.graphInfo){
            let pinsArr = [];
            if(this.props.graphInfo.pins){
                pinsArr = this.props.graphInfo.pins;
            };

            let tempRows = [];
            let tempCol = [];
            let keys = this.props.graphInfo.keys;
            
            if(this.props.setting[0] === "high"){
                for(let i=0; i < this.props.graphInfo.keys.length; i++){
                    let pinCounter = 0;
                    if(pinsArr.length > 0){
                        for(let p=0; p < pinsArr.length; p++){
                            if(keys[i] === pinsArr[p].date){
                                tempRows.push([keys[i], this.props.graphInfo.data[keys[i]]["2. high"], this.props.graphInfo.data[keys[i]]["3. low"], 'point { size: 18; shape-type: star; fill-color: #a52714; }']);
                            } else {
                                pinCounter++
                            }
                        }
                        if(pinCounter == pinsArr.length){
                            tempRows.push([keys[i], this.props.graphInfo.data[keys[i]]["2. high"], this.props.graphInfo.data[keys[i]]["3. low"], null]);
                        }
                    }else{
                        tempRows.push([keys[i], this.props.graphInfo.data[keys[i]]["2. high"], this.props.graphInfo.data[keys[i]]["3. low"], null]);
                    }
                };
                tempCol = [
                    {type: "string", label: "day"},
                    {type: "number", label: this.props.setting[0]},
                    {type: "number", label: this.props.setting[1]},
                    {'type': 'string', 'role': 'style'}
                ];
            } else {
                for(let i=0; i < this.props.graphInfo.keys.length; i++){
                    let pinCounter = 0;
                    if(pinsArr.length > 0){
                        for(let p=0; p < pinsArr.length; p++){
                            if(keys[i] === pinsArr[p].date){
                                tempRows.push([keys[i], this.props.graphInfo.data[keys[i]]["1. open"], this.props.graphInfo.data[keys[i]]["4. close"], 'point { size: 18; shape-type: star; fill-color: #a52714; }']);
                            }else{
                                pinCounter++;
                            }
                        }
                        if(pinCounter == pinsArr.length){
                            tempRows.push([keys[i], this.props.graphInfo.data[keys[i]]["1. open"], this.props.graphInfo.data[keys[i]]["4. close"], null]);
                        }
                    }else{
                        tempRows.push([keys[i], this.props.graphInfo.data[keys[i]]["1. open"], this.props.graphInfo.data[keys[i]]["4. close"], null]);
                    }
                };
                tempCol = [
                    {type: "string", label: "day"},
                    {type: "number", label: this.props.setting[0]},
                    {type: "number", label: this.props.setting[1]},
                    {'type': 'string', 'role': 'style'}
                ];
            }
            console.log(tempRows);

            this.setState({
                setting: this.props.setting,
                options:{
                    title: this.props.graphInfo.symbol,
                    pointSize: 1
                },
                rows: tempRows,
                columns: tempCol
            });
        }
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