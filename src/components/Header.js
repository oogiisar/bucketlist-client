import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../services/token-service';
import './css/Header.css';

class Header extends Component {

    getUser() {
        const getAuthToken = TokenService.getAuthToken()
        const token = TokenService.parseJwt(getAuthToken)
        const user = token.user_is
        return user
    }

    handleLogout = () => {
        sessionStorage.removeItem("client-auth-token"); 
        this.props.handleLogin('false')
    }

    accountStatus = () => {
        // Give different options if logged in or out
        if(TokenService.hasAuthToken()) {
            return( 
                <>
                    <Link to='/' onClick={this.handleLogout} className="account_nav">Logout</Link>
                    <Link to={`/${this.getUser()}/bucketlist`} className="account_nav">Account</Link>
                </>
            )
        } else {
            return (
                <>
                    <Link to='/' className="account_nav">Login</Link>
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