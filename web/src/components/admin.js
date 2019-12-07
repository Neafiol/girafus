import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { Dropdown, Menu, Tab, Label } from 'semantic-ui-react';

const mapStateToProps = state => ({
    logged: state.login.logged,
});

class Admin extends React.Component {
    handleLogout = () => {
        this.props.dispatch({type: 'LOGOUT'});
    };

    render() {
        if (!this.props.logged) {
            return <Redirect to='/'/>
        }

        const firms = ['ОАО "Газпром"', 'ООО "Рога и копыта"', 'ООО "Рожки и копытца"',];

        let FirmTab = <Tab
            menu={{ fluid: true, vertical: true }}
            panes={firms.map(firm => {
                return {menuItem: firm, render: () => <Tab.Pane>{`Список пользователей ${firm}`}</Tab.Pane>}
            })}
        />;

        const panes = [
            { menuItem: 'Предприятия', render: () => <Tab.Pane>{FirmTab}</Tab.Pane> },
            { menuItem: 'Роли', render: () => <Tab.Pane>А тут - список ролей</Tab.Pane> },
            { menuItem: (
                <Menu.Item key='requests'>
                    Запросы
                    <Label>37</Label>
                </Menu.Item>),
                render: () => <Tab.Pane>Тут будет список запросов от дочерних компаний</Tab.Pane>
            },
        ];

        return (
            <div>
                <Menu attached='top'>
                    <Menu.Menu position='right'>
                        <Dropdown item text='Админ всея холдинга'>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.handleLogout}>Выйти</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
                <Tab panes={panes} />
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(Admin);
