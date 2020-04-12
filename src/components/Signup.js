import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import AuthApiService from '../services/auth-api-service';
import './css/Login.css';

class SignupForm extends Component {
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
            error: '',
            success: ''
        }
    }


    handleSubmit = (e) => {
        e.preventDefault()
        // Signup functionality to be added with backend
        if(this.validateEmail() && this.validatePassword()) {
            AuthApiService.postUser({
                email: this.state.email.value,
                password: this.state.password.value
            })
            .then( () => {
                // Reset the form
                const email = {...this.state.email}
                email.value = ''
                email.touched = false
                const password = {...this.state.password}
                password.value = ''
                password.touched = false
                this.setState({
                    email,
                    password,
                    success: 'Your user has been added'
                })
            })
            .catch(res => {
                this.setState({ error: res.error })
            })
        }
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
        const password = this.state.password.value

        if(password.length < 6 || password.length > 72 ) {
            this.setState({error: 'Password must be between 6 and 72 characters long'})
        } else if( !password.match(/[0-9]/)) {
            this.setState({error: 'Password must contain at least 1 number'})
        } else {
            return true
        }

    }

    render() {
        return (
            <>
                <div className='success'>{this.state.success}</div>
                <div className='error'>{this.state.error}</div>
                <h2>Sign Up</h2>
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
                            type="text"
                            value={this.state.email.value}
                            onChange={e => this.updateEmail(e.target.value)}
                            name='email'
                            id='LoginForm__email'
                            required
                        >
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
                            value={this.state.password.value}
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

export default withRouter(SignupForm);