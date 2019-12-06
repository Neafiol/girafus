import React from 'react';
import {connect} from 'react-redux';
import { Button, Form } from 'semantic-ui-react';

const mapStateToProps = state => ({
    login: state.login.login,
    password: state.login.password,
    errorMessage: state.login.errorMessage,
});

class Login extends React.Component {
    componentDidMount() {
        this.loginInput.focus();
    }

    handleLoginChange = (e) =>
        this.props.dispatch({type: 'SET_LOGIN_FIELD', name: 'login', value: e.target.value});

    handlePasswordChange = (e) =>
        this.props.dispatch({type: 'SET_LOGIN_FIELD', name: 'password', value: e.target.value});

    handleDoLogin = () =>
        this.props.dispatch({type: 'DO_LOGIN'});

    render() {
        return (
            <div className='login-panel'>
                <Form>
                    <Form.Field>
                        {this.props.errorMessage && <span className='login-error'>{this.props.errorMessage}</span>}
                        <span className='login-label'>Имя пользователя</span>
                        <input
                            className='login-field'
                            type='text'
                            value={this.props.login}
                            onChange={this.handleLoginChange}
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
                            placeholder='Введите пароль'
                        />
                    </Form.Field>
                    <Button className='login-button' type='button' onClick={this.handleDoLogin}>Войти</Button>
                </Form>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(Login);