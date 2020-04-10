import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import './css/Login.css';

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: {
                value: '',
                touched: false
            },
            password: {
                value: '',
                touched: false
            },
            error: ''
        }
    }


    handleSubmit = (e) => {
        e.preventDefault()


        // Use the handleLogin function to update state in app to force a refresh of the header
        this.props.handleLogin('true')
        this.props.history.push(`/1/mybucket`)
        
    }

    updateEmail(email) {
        // Wait for setState before validating email
        this.setState({email: {value: email, touched: true}}, () => {
            this.requireEmail()
        })
    }

    requireEmail() {
        // Make sure the user has entered an e-mail
        const email = this.state.email.value.trim();
        const touched = this.state.email.touched;
        const error = this.state.error;

        if(email.length === 0 && touched === true) {
            this.setState({error: 'Email is required'})
        } else if( error !== '') {
            this.setState({error: ''})
        }
    }

    validateEmail = () => {
        const email = this.state.email.value.trim()
        const re = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/

        if(re.test(String(email).toLowerCase())) {
            return true
        } else {
            this.setState({error: 'Please use a valid e-mail'})
        }
    }

    updatePassword(password) {
        // Wait for setState before validating email
        this.setState({password: {value: password, touched: true}}, () => {
            this.requirePassword()
        })
    }

    requirePassword() {
        // Make sure the user has entered a Password
        const password = this.state.password.value.trim();
        const touched = this.state.password.touched;
        const error = this.state.error;

        if(password.length === 0 && touched === true) {
            this.setState({error: 'Password is required'})
        } else if( error !== '') {
            this.setState({error: ''})
        }
    }

    validatePassword = () => {
        // This will be added as an endpoint in backend

    }

    render() {
        return (
            <>
                <h2>Intro Text</h2>
                <fieldset className='loginContainer'>
                    <form
                        className='LoginForm'
                        onSubmit={this.handleSubmit}
                    >
                        <div role='alert'>
                            <p className='alert'>{this.state.error}</p>
                        </div>
                        <div className='email'>
                        <label htmlFor='LoginForm__email'>
                            Email 
                        </label>
                        <input
                            required
                            onChange={e => this.updateEmail(e.target.value)}
                            name='email'
                            id='LoginForm__email'>
                        </input>
                        </div>
                        <div className='password'>
                        <label htmlFor='LoginForm__password'>
                            Password 
                        </label>
                        <input
                            required
                            name='password'
                            type='password'
                            onChange={e => this.updatePassword(e.target.value)}
                            id='LoginForm__password'>
                        </input>
                        </div>
                        
                        <button type='submit'>
                            Login
                        </button>
                    </form>
                </fieldset>
            </>
        )
    }
}

export default withRouter(LoginForm);