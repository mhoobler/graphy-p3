import React, { Component } from 'react';

import API from '../utils/API';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            foo: false
        };
    }
    componentDidMount() {
        this.setState({
            foo: this.props.foo
        })
        console.log(this.state.foo);
        API.apiTest()
        .then( (res) => console.log(res))
        .catch( (err) => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log("Email: " + this.state.email + " Password: " + this.state.password);
    };
    
    tester = () => {
        console.log(this.state.foo);
    }

    render() {
        return (

<div className="clogin">

    <form className="form-group form-signin">
        {this.state.foo ? (<h1 className="h3 mb-3 font-weight-normal centersignin">Signin</h1>) : (<h1 className="h3 mb-3 font-weight-normal centersignin">Signin2</h1>)}
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input onChange={this.handleInputChange} type="text" id="inputEmail" className="form-control" name="email" placeholder="Email address" required autoFocus />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input onChange={this.handleInputChange} type="password" id="inputPassword" className="form-control" name="password" placeholder="Password" required />
        <button onClick={this.handleFormSubmit} className="btn btn-warning btn-lg btn-primary btn-block" type="submit">Signup</button>
        <button onClick={this.tester}>TEST</button>
        {/* <p className="mt-5 mb-3 text-muted">Have an account? <a href="/signin">Signin</a></p> */}
    </form>
</div>  

        )
    }
}

export default SignIn;