import React from "react";
import {connect} from "react-redux";
import {Tab} from "semantic-ui-react";
import CreateUser from "./create_user";
import UsersList from "./users_list";

const mapDispatchToProps = dispatch => ({dispatch});

class CompanyTab extends React.Component {
    componentDidMount() {
        this.initIfRequired();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.company.id !== this.props.company.id) {
            this.initIfRequired();
        }
    }

    initIfRequired = () => {
        if (!this.props.company.users || !this.props.company.rules_list) {
            this.loadData();
        }
    };

    loadData = () =>
        this.props.getCompanyInfo(this.props.company.id);

    handleCreateUser = createUserFields =>
        this.props.dispatch({type: 'CREATE_USER', companyId: this.props.company.id, createUserFields});

    render() {
        return(
            <Tab
                menu={{ secondary: true, pointing: true }}
                panes={[
                    {
                        menuItem: 'Пользователи',
                        render: () => <Tab.Pane>
                            <CreateUser
                                roles={this.props.roles}
                                handleCreateUser={this.handleCreateUser}
                            />
                            <UsersList
                                users={this.props.company.users || {}}
                                getUserRules={userId => this.props.getUserRules(this.props.company.id, userId)}
                            />
                        </Tab.Pane>
                    },
                    { menuItem: 'Продукты', render: () => <Tab.Pane>Список продуктов</Tab.Pane>}
                ]}
            />
        )
    }
}

export default connect(null, mapDispatchToProps)(CompanyTab);
