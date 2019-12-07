import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { Dropdown, Menu } from 'semantic-ui-react';

const mapStateToProps = state => ({
    logged: state.login.logged,
});

class User extends React.Component {
    handleLogout = () => {
        this.props.dispatch({type: 'LOGOUT'});
    };

    render() {
        if (!this.props.logged) {
            return <Redirect to='/'/>
        }

        return (
            <div>
                <Menu attached='top'>
                    <Menu.Menu position='right'>
                        <Dropdown item text='Владимир Путин'>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.handleLogout}>Выйти</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(User);
