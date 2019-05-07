import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import ChartComp from '../components/ChartComp';
import ChartTest from '../components/ChartTest';

import API from '../utils/API';

class GraphPage extends Component {
    constructor(props) {
        super(props);

        //functions for modal
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        //functions for chart
        this.mongo = this.mongo.bind(this);
        this.changeSetting = this.changeSetting.bind(this);
        this.tester = this.tester.bind(this);

        this.state = {
            //States for modal
            show: false,
            modalValues: null,
            modalInput: "",

            //states for chart
            setting: ["high", "low"],
            search_term: "",
            graphInfo: null
        }
    }

    handleClose() {
        this.setState({ show: false });
    }
    
    handleShow(obj, setting) {
        console.log(setting);
        let date = this.state.graphInfo.keys[obj.row];
        let values = this.state.graphInfo.data[date];

        if(obj){
            if(this.state.setting[0] === "high"){
                if(obj.column === 1){
                    console.log(obj);
                    this.setState({ 
                        modalValues: {
                            date: date,
                            value: values["2. high"],
                            string: "daily high"
                        },
                        show: true 
                    });
                }else{
                    this.setState({ 
                        modalValues: {
                            date: date,
                            value: values["3. low"],
                            string: "daily low"
                        },
                        show: true 
                    });
                }
            } else if(this.state.setting[0] === "open") {
                if(obj.column === 1){
                    console.log(obj);
                    this.setState({ 
                        modalValues: {
                            date: date,
                            value: values["1. open"],
                            string: "opening"
                        },
                        show: true 
                    });
                }else{
                    this.setState({ 
                        modalValues: {
                            date: date,
                            value: values["4. close"],
                            string: "closing"
                        },
                        show: true 
                    });
                }
            }
            console.log(this.state.modalValues);
        } else {
            this.setState({ show: true });
        }
    }

    componentDidMount() {
        API.apiTest()
        .then( (res) => console.log(res))
        .catch( (err) => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        console.log(name + value)
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();

        //for searching stocks
        if(event.target.id === "run-search"){
        console.log(this.state.search_term);

        //Check for ticker
        API.apiTicker(this.state.search_term)
        .then( result => {
            if(result.data.length > 0){
                console.log(result.data[0]);
                //Make AlphaApi Call
                API.apiAlpha(result.data[0].symbol)
                .then(result => {
                    console.log(result)
                    this.mongo(result);
                })
                .catch(err => console.log(err));
            }else{
                //Check for name
                API.apiName(this.state.search_term)
                .then(result => {
                    if(result.data.length > 0){
                        console.log(result.data[0].symbol);
                        //Make AlphaApi call
                        API.apiAlpha(result.data[0].symbol)
                        .then(result => {
                            console.log(result)
                            this.mongo(result);
                        })
                        .catch(err => console.log(err));
                    }else{
                        //All checks failed
                        console.log("no results");
                    }
                }).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));

        //save pin
        } else if(event.target.id === "save-pin"){
            let sending = {};
            if(!this.props.user){
                sending = {
                    symbol: this.state.graphInfo.symbol,
                    data: this.state.modalInput,
                    user_id: 0,
                    date: this.state.modalValues.date
                }
            } else {
                sending = {
                    symbol: this.state.graphInfo.symbol,
                    data: this.state.modalInput,
                    user_id: this.props.user.id,
                    date: this.state.modalValues.date
                }
            }
            API.postPin(sending)
            .then(res => console.log(res))
            .catch(err => console.log(err));

            console.log("save-pin");
        }
    }

    changeSetting = event => {
        event.preventDefault();
        // console.log(this.props);
        if(this.state.setting[0] === "high"){
            this.setState({setting: ["open", "close"]});
        } else {
            this.setState({setting: ["high", "low"]});
        }
        console.log(this.state);
        console.log(this.props);
    }

    tester = event => {
        event.preventDefault();
        console.log(this.state);
    }

    mongo = (alpha) => {
        let sym = alpha.data["Meta Data"]["2. Symbol"]

        API.getPins(sym)
        .then(res => {
            let pinsArr = res.data;
            this.setState({
                graphInfo: {
                    symbol: alpha.data["Meta Data"]["2. Symbol"],
                    keys: Object.keys(alpha.data["Time Series (Daily)"]).reverse(),
                    data: alpha.data["Time Series (Daily)"],
                    pins: pinsArr
                }
            })
        })
        .catch(err => console.log(err));
    }

    render() {
        let chart;
        let modal;

        if(this.state.graphInfo === null){
            chart = <p>Chart will appear here after search.</p>
        } else {
            chart = <ChartComp graphInfo={this.state.graphInfo} handleShow={this.handleShow} setting={this.state.setting} key={this.state.setting}/>
        }

        if(this.state.modalValues === null){
            modal = 
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input type="text" placeholder="How did you get here?" disabled/>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleFormSubmit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
        } else {
            modal =
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You selected the {this.state.modalValues.string} value of </p> 
                        <p>Date: {this.state.modalValues.date} at {this.state.modalValues.value} for {this.state.graphInfo.symbol}</p>
                        <input type="text" name="modalInput" placeholder="Has value" onChange={this.handleInputChange} />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button id="save-pin" variant="primary" onClick={this.handleFormSubmit}>
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
        }

        return (
            <div className="container">
                {chart}
                <ChartTest />
                {/* <!-- Here we create an HTML Form for handling the inputs--> */}
                <form>

                    {/* <!-- Here we create the text box for capturing the search term--> */}
                    <div className="form-group">
                        <label htmlFor="search">Search Term:</label>
                        <input onChange={this.handleInputChange} type="text" name="search_term" className="form-control" id="search_term" placeholder="" autoFocus autoComplete="off" />
                    </div>

                    {/* <!-- Here we have our final submit button --> */}
                    <button onClick={this.handleFormSubmit} type="submit" className="btn btn-default hvr-push" id="run-search" >Search</button>
                    <button onClick={this.changeSetting}>Change Setting</button>
                </form>
                <button onClick={this.tester}>Tester</button>
                <>
                    <Button variant="primary" onClick={this.handleShow}>
                        Launch demo modal
                    </Button>
            
                    {modal}
                </>
            </div>
            
        )
    }
}

export default GraphPage;