import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from'react-bootstrap/Card';

import ChartComp from '../components/ChartComp';
// import ChartTest from '../components/ChartTest';

import API from '../utils/API';
import './pages.css'

// function orderPins(arr){
//     var date = function(y, m, d){
//         this.year = y;
//         this.month = m;
//         this.day = d;
//     }

//     var dates =[]
//     for(var i=0; i<arr.length; i++){
//         var x = arr[i].date.split('-');
//         dates.push(new date(x[0], x[1], x[2]));
//     }
// }

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
    
    handleShow(obj, setting, notes) {
    if(this.state.graphInfo !== null){

        console.log({
            object: obj,
            settings: setting,
            notes: notes
        });
        let date = this.state.graphInfo.keys[obj.row];
        let values = this.state.graphInfo.data[date];
        let title = null;
        let body = null;

        if(notes){
            title = notes.title;
            body = notes.body;
        }

        if(obj){
            if(this.state.setting[0] === "high"){
                if(obj.column === 1){
                    console.log(obj);
                    this.setState({ 
                        modalValues: {
                            date: date,
                            value: values["2. high"],
                            string: "daily high",
                            title: title,
                            body: body
                        },
                        show: true 
                    });
                }else{
                    this.setState({ 
                        modalValues: {
                            date: date,
                            value: values["3. low"],
                            string: "daily low",
                            title: title,
                            body: body
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
                            string: "opening",
                            title: title,
                            body: body
                        },
                        show: true 
                    });
                }else{
                    this.setState({ 
                        modalValues: {
                            date: date,
                            value: values["4. close"],
                            string: "closing",
                            title: title,
                            body: body
                        },
                        show: true 
                    });
                }
            }
            console.log(this.state.modalValues);
        } else {
            this.setState({ show: true });
        }
    } else{
        this.setState({ 
            show: true 
        });
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
                    title: this.state.modalInputTitle,
                    body: this.state.modalInputBody,
                    user_id: 0,
                    date: this.state.modalValues.date
                }
            } else {
                sending = {
                    symbol: this.state.graphInfo.symbol,
                    title: this.state.modalInputTitle,
                    body: this.state.modalInputBody,
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
        console.log({
            STATE: this.state,
            PROPS: this.props
        });
    }

    mongo = (alpha) => {
        let sym = alpha.data["Meta Data"]["2. Symbol"]
        console.log("here");
        if(this.props.user){
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
                console.log(this.state.graphInfo);
            })
            .catch(err => console.log(err));
        }else {
            this.setState({
                graphInfo: {
                    symbol: alpha.data["Meta Data"]["2. Symbol"],
                    keys: Object.keys(alpha.data["Time Series (Daily)"]).reverse(),
                    data: alpha.data["Time Series (Daily)"],
                    pins:[]
                }
            })
        }
    }

    render() {
        let chart;
        let modal;

        if(this.state.graphInfo === null){
            chart = <ChartComp handleShow={this.handleShow} setting={this.state.setting}/>
        } else {
            chart = <ChartComp graphInfo={this.state.graphInfo} handleShow={this.handleShow} setting={this.state.setting} key={this.state.graphInfo.symbol}/>
        }

        if(this.state.modalValues === null){
            modal = 
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>You must be signed in and search for a valid stock to use this function properly</p>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleFormSubmit} disabled>
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
                        {this.state.modalValues.title || this.state.modalValues.title ? (
                            <div>
                                <p> You're current notes: </p> 
                                <h4>{this.state.modalValues.title}</h4>
                                <p>{this.state.modalValues.body}</p>
                            </div>
                         ) : (
                            <div>
                                <p>You selected the {this.state.modalValues.string} value of </p> 
                                <p>Date: {this.state.modalValues.date} at {this.state.modalValues.value} for {this.state.graphInfo.symbol}</p>
                                <div className="row">
                                    <label className="col-md-12" htmlFor="modalInputTitle">Title:</label>
                                    <input type="text" name="modalInputTitle" placeholder="Title" onChange={this.handleInputChange}/>
                                </div>
                                <div className="row">
                                    <label className="col-md-12" htmlFor="modalInputTitle">Body:</label>
                                    <textarea rows="4" cols="50" name="modalInputBody" placeholder="Save notes" onChange={this.handleInputChange} />
                                </div>
                            </div>
                         )}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button id="save-pin" variant="primary" onClick={this.handleFormSubmit}>
                        Save Pin
                    </Button>
                    </Modal.Footer>
                </Modal>
        }

        // if(this.state.graphInfo.pins){
        //     <Card>
        //         <Card.Body>
        //             <Card.Title>TEST</Card.Title>
        //             <Card.Text>TEXT</Card.Text>
        //         </Card.Body>
        //     </Card>
        // }

        return (

<div className="container-fluid">
    <div className="row">
        <div className="col-md-2">
            <h4>Control Panel</h4>
            <Button className="col-md-12" onClick={this.changeSetting}>
                Change Setting
            </Button>
            <Button className="col-md-12" onClick={this.tester}>
                Tester
            </Button>
            <Button className="col-md-12" onClick={this.handleShow}>
                    Launch demo modal
            </Button>
        </div>
        <div className="col-md-10">
            {chart}
            {/* <ChartTest /> */}
            {/* <!-- Here we create an HTML Form for handling the inputs--> */}
            <form>

                {/* <!-- Here we create the text box for capturing the search term--> */}
                <div className="form-group">
                    <label htmlFor="search">Search Term:</label>
                    <input className="col-md-3 form-control" onChange={this.handleInputChange} type="text" name="search_term" id="search_term" placeholder="" autoFocus autoComplete="off" />
                </div>

                {/* <!-- Here we have our final submit button --> */}
                <Button variant="primary" id="run-search" onClick={this.handleFormSubmit}>
                    Search
                </Button>
            </form>

            <>
                {modal}
            </>
        </div>
    </div>
</div>
            
        )
    }
}

export default GraphPage;