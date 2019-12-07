import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { Dropdown, Menu, Tab, Label, Dimmer, Loader } from 'semantic-ui-react';
import CompaniesList from '../components/companies_list';

const mapStateToProps = state => ({
    logged: state.login.logged,
    user: state.login.user || {},
    companies: state.companies,
    showWait: state.context.showWait,
});

class Admin extends React.Component {
    componentDidMount() {
        this.initIfRequired();
    }

    initIfRequired = () => {
        if (this.props.companies.length === 0) {
            this.loadData();
        }
    };

    loadData = () =>
        this.props.dispatch({type: 'GET_COMPANIES', userId: this.props.user.id});

    getCompanyInfo = companyId =>
        this.props.dispatch({type: 'GET_COMPANY_INFO', companyId});

    handleLogout = () => {
        this.props.dispatch({type: 'LOGOUT'});
    };

    render() {
        if (!this.props.logged) {
            return <Redirect to='/'/>
        }

        const panes = [
            {
                menuItem: 'Предприятия',
                render: () =>
                    <Tab.Pane>
                        <CompaniesList
                            companies={this.props.companies}
                            getCompanyInfo={this.getCompanyInfo}
                        />
                    </Tab.Pane>
            },
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
                <Dimmer inverted active={this.props.showWait}>
                    <Loader inverted />
                </Dimmer>
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
