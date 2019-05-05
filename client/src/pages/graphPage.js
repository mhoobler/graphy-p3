import React, { Component } from 'react';
import Modal from '../components/Modal';
import Chart from '../components/Chart';

import API from '../utils/API';

class GraphPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search_term: ""
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
        var resObj = null;

        //Check for ticker
        API.apiTicker(this.state.search_term)
        .then( result => {
            if(result.data.length > 0){
                console.log(result.data[0]);
                //Make AlphaApi Call
                API.apiAlpha(result.data[0].symbol)
                .then(result => console.log(result))
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

    render() {
        return (
            <div className="container">
                <Chart foo="test"/>
                {/* <!-- Here we create an HTML Form for handling the inputs--> */}
                <form>

                    {/* <!-- Here we create the text box for capturing the search term--> */}
                    <div className="form-group">
                        <label htmlFor="search">Search Term:</label>
                        <input onChange={this.handleInputChange} type="text" name="search_term" className="form-control" id="search_term" placeholder="" autoFocus autoComplete="off" />
                    </div>

                    {/* <!-- Here we have our final submit button --> */}
                    <button onClick={this.handleFormSubmit} type="submit" className="btn btn-default hvr-push" id="run-search" >Search</button>

                </form>
                <Modal />
            </div>
            
        )
    }
}

export default GraphPage;