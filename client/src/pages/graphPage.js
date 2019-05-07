import React, { Component } from 'react';
import Modal from '../components/Modal';
import ChartComp from '../components/ChartComp';

import API from '../utils/API';

class GraphPage extends Component {
    constructor(props) {
        super(props);
        this.changeSetting = this.changeSetting.bind(this);

        this.state = {
            setting: "highLow",
            search_term: "",
            obj: null
        }
    }

    componentDidMount() {
        console.log(document.getElementById('search-term'));
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
                    this.setState({
                        obj: {
                            keys: Object.keys(result.data["Time Series (Daily)"]),
                            data: result.data["Time Series (Daily)"]
                        }
                    })
                    console.log(this.state);
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
                        .then(result => console.log(result))
                        .catch(err => console.log(err));
                    }else{
                        //All checks failed
                        console.log("no results");
                    }
                }).catch(err => console.log(err));
            }
        }).catch(err => console.log(err));
    }

    changeSetting = event => {
        event.preventDefault();
        // console.log(this.props);
        if(this.state.setting === "highLow"){
            this.setState({setting: "openClose"});
        } else {
            this.setState({setting: "highLow"});
        }
        console.log(this.state);
        console.log(this.props);
    }

    render() {
        let chart;

        if(this.state.obj === null){
            chart = <p>Chart will appear here after search.</p>
        } else {
            chart = <ChartComp obj={this.state.obj} setting={this.state.setting} key={this.state.setting} foo="test"/>
        }

        return (
            <div className="container">
                {chart}
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
                <Modal />
            </div>
            
        )
    }
}

export default GraphPage;