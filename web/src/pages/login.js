import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { Button, Form, Dimmer, Loader } from 'semantic-ui-react';
import logoImg from '../img/logo.png';

const mapStateToProps = state => ({
    login: state.login.login,
    password: state.login.password,
    errorMessage: state.login.errorMessage,
    logged: state.login.logged,
    isAdmin: state.login.isAdmin,
    showWait: state.login.showWait,
});

class Login extends React.Component {
    componentDidMount() {
        if (this.loginInput) {
            this.loginInput.focus();
        }
    }

    handleLoginChange = e =>
        this.props.dispatch({type: 'SET_LOGIN_FIELD', name: 'login', value: e.target.value});

    handleLoginKey = e => {
        if (e.charCode === 13) {
            this.loginPassword.focus();
        }
    };

    handlePasswordChange = e =>
        this.props.dispatch({type: 'SET_LOGIN_FIELD', name: 'password', value: e.target.value});

    handlePasswordKey = e => {
        if (e.charCode === 13) {
            this.handleDoLogin();
        }
    };

    handleDoLogin = () =>
        this.props.dispatch({type: 'DO_LOGIN'});

    render() {
        if (this.props.logged) {
            if (this.props.isAdmin) {
                return <Redirect to='/admin'/>;
            }
            return <Redirect to='/user'/>;
        }
        return (
            <div className='login-panel'>
                <Dimmer inverted active={this.props.showWait}>
                    <Loader inverted />
                </Dimmer>
                <img src={logoImg} className="login-logo"/>
                <Form>
                    <Form.Field>
                        {this.props.errorMessage && <span className='login-error'>{this.props.errorMessage}</span>}
                        <span className='login-label'>Имя пользователя</span>
                        <input
                            className='login-field'
                            type='text'
                            value={this.props.login}
                            onChange={this.handleLoginChange}
                            onKeyPress={this.handleLoginKey}
                            placeholder='Введите имя пользователя'
                            ref={input => { this.loginInput = input; }}
                        />
                    </Form.Field>
                    <Form.Field>
                        <span className='login-label'>Пароль</span>
                        <input
                            className='login-field'
                            type='password'
                            value={this.props.password}
                            onChange={this.handlePasswordChange}
                            onKeyPress={this.handlePasswordKey}
                            placeholder='Введите пароль'
                            ref={input => { this.loginPassword = input; }}
                        />
                    </Form.Field>
                    <Button className='login-button' type='button' onClick={this.handleDoLogin}>Войти</Button>
                </Form>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(Login);
