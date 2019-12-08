import React from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { Dropdown, Menu, Tab, Label, Dimmer, Loader } from 'semantic-ui-react';
import CompaniesList from '../components/companies_list';
import Requests from "../components/Requests";
import RolesList from "../components/roles_list";

const mapStateToProps = state => ({
    logged: state.login.logged,
    user: state.login.user || {},
    companies: state.context.companies,
    roles: state.context.roles,
    showWait: state.context.showWait,
});

class Admin extends React.Component {
    componentDidMount() {
        this.initIfRequired();
    }

    initIfRequired = () => {
        if (!this.props.companies) {
            this.loadCompanies();
        }

        if (!this.props.roles) {
            this.loadRoles();
        }
    };

    loadCompanies = () =>
        this.props.dispatch({type: 'GET_COMPANIES', userId: this.props.user.id});

    loadRoles = () =>
        this.props.dispatch({type: 'GET_ROLES'});

    getCompanyInfo = companyId =>
        this.props.dispatch({type: 'GET_COMPANY_INFO', companyId});

    getUserRules = (companyId, userId) =>
        this.props.dispatch({type: 'GET_USER_RULES', companyId, userId});

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
                            getCompanyInfo={this.getCompanyInfo}
                            getUserRules={this.getUserRules}
                        />
                    </Tab.Pane>
            },
            {
                menuItem: 'Роли',
                render: () => <Tab.Pane>
                    <RolesList roles={Object.values(this.props.roles || {})}/>
                </Tab.Pane>
            },
            { menuItem: (
                <Menu.Item key='requests'>
                    Запросы
                    <Label>5</Label>
                </Menu.Item>),
                render: () => <Tab.Pane><Requests/></Tab.Pane>
            },
        ];

        return (
            <div>
                <Dimmer inverted active={this.props.showWait}>
                    <Loader inverted />
                </Dimmer>
                <Menu attached='top'>
                    <Label size='huge' style={{'margin-left': 'auto'}}>Администрирование прав</Label>
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
