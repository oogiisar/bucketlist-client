import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './css/Header.css';

class Header extends Component {

    handleLogout = () => {
        this.props.handleLogin('false')
    }

    accountStatus = () => {
        // Give different options if logged in or out
        if(this.props.loggedIn === 'true') {
            return( 
                <>
                    <Link to='/' onClick={this.handleLogout} className="account_nav">Logout</Link>
                    <Link to={`/1/bucketlist`} className="account_nav">Account</Link>
                </>
            )
        } else {
            return (
                <>
                    <Link to='/login' className="account_nav">Login</Link>
                    <Link to='/signup' className="account_nav">Sign Up</Link>
                </>
            )
        }
    }

    render() {
        return(
            <nav role="navigation">
                <Link to='/' className="logo">Bucket List</Link>
                {this.accountStatus()}
            </nav>
        )
    };
}

export default Header;