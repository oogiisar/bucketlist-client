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
                    <Link to='/' onClick={this.handleLogout} className="account_nav right_nav">Logout</Link>
                    <Link to={`/${this.getUser()}/bucketlist`} className="account_nav left_nav">Account</Link>
                </>
            )
        } else {
            return (
                <>
                    <Link to='/' className="account_nav right_nav">Login</Link>
                    <Link to='/signup' className="account_nav left_nav">Sign Up</Link>
                </>
            )
        }
    }

    render() {
        return(
            <nav role="navigation">
                <Link to='/' className="logo"><span className="logo" id="red">B</span><span className="logo" id="pink">u</span><span className="logo" id="yellow">c</span><span className="logo"id="green">k</span><span className="logo" id="orange">e</span><span className="logo" id="purple">t</span> <span className="logo" id="brown">L</span><span className="logo" id="white">i</span><span className="logo" id="grey">s</span><span className="logo" id="dark">t</span></Link>
                {this.accountStatus()}
            </nav>
        )
    };
}

export default Header;