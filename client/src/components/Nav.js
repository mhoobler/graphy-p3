import React, { Fragment } from "react";
import { Link } from 'react-router-dom';
import "./Nav.css";
import Logo from '../logo.svg';

function Nav(props) {
    let userLinks;
    if(props.user){
        userLinks = 
            <Link to={"./user"}>
                    User Page
            </Link>
            
    } else {
        userLinks =
            <Fragment>
            <Link to={{pathname: "./signin", state: {foo: false}}}>
                Sign In
            </Link>
            <Link to={{pathname: "./signup", state: {foo: true}}}>
                Sign up
            </Link>
            </Fragment>
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <Link to={"/"} className="logo-container">
                <img src={Logo} className="App-logo" alt="logo" />
            </Link>
            
            <Link to={"./graphs"}>
                Graphs
            </Link>
            {userLinks}
            {/* <Link to={{pathname: "./signin", state: {foo: false}}}>
                Sign In
            </Link>
            <Link to={{pathname: "./signup", state: {foo: true}}}>
                Sign up
            </Link> */}
        </nav>
    );
}

export default Nav;
