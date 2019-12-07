import React from 'react';
import { Tab } from 'semantic-ui-react';
import UsersList from "./users_list";

class CompaniesList extends React.Component {
    render() {
        return (
            <Tab
                menu={{ fluid: true, vertical: true }}
                panes={this.props.companies.map(company => {
                    return {
                        menuItem: company.name,
                        render: () => <Tab.Pane>
                            <CompanyTab
                                company={company}
                                getCompanyInfo={this.props.getCompanyInfo}
                                getUserRules={this.props.getUserRules}
                            />
                        </Tab.Pane>
                    }
                })}
            />
        )
    }
}

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

    render() {
        return(
            <Tab
                menu={{ secondary: true, pointing: true }}
                panes={[
                    {
                        menuItem: 'Пользователи',
                        render: () => <Tab.Pane>
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

export default CompaniesList;
