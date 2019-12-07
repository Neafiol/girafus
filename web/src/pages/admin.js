import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { Dropdown, Menu, Tab, Label } from 'semantic-ui-react';
import CompaniesList from '../components/companies_list';

const mapStateToProps = state => ({
    logged: state.login.logged,
});

const companies = [
    { id: 3737, name: 'ОАО "Газпром"', users: [
            { id: 37, name: 'Иванов Иван Иванович', position: 'Директор' },
            { id: 73, name: 'Петров Пётр Петрович', position: 'Главный бухгалтер' },
            { id: 111, name: 'Сидоров Сидор Сидорович', position: 'Операционист' },
        ]},
    { id: 7373, name: 'ОАО "Рога и Копыта"', users: [
            { id: 37, name: 'Иванов Иван Иванович', position: 'Директор' },
            { id: 73, name: 'Петров Пётр Петрович', position: 'Главный бухгалтер' },
            { id: 111, name: 'Сидоров Сидор Сидорович', position: 'Операционист' },
        ]},
    { id: 111111, name: 'ОАО "Рожки и Копытца"', users: [
            { id: 37, name: 'Иванов Иван Иванович', position: 'Директор' },
            { id: 73, name: 'Петров Пётр Петрович', position: 'Главный бухгалтер' },
            { id: 111, name: 'Сидоров Сидор Сидорович', position: 'Операционист' },
        ]},
];

class Admin extends React.Component {
    handleLogout = () => {
        this.props.dispatch({type: 'LOGOUT'});
    };

    render() {
        if (!this.props.logged) {
            return <Redirect to='/'/>
        }

        const panes = [
            { menuItem: 'Предприятия', render: () => <Tab.Pane><CompaniesList companies={companies} /></Tab.Pane> },
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
