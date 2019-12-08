import React from 'react';
import {connect} from 'react-redux';
import {Tab, Menu } from 'semantic-ui-react';
import CompanyTab from './company_tab';

const mapStateToProps = state => ({
    companies: Object.values(state.context.companies || {}),
    roles: Object.values(state.context.roles || {}),
});

class CompaniesList extends React.Component {
    render() {
        return (
            <Tab
                menu={{ fluid: true, vertical: true }}
                panes={this.props.companies.map(company => {
                    return {
                        menuItem: <Menu.Item key={company.id}>{company.name}</Menu.Item>,
                        render: () => <Tab.Pane>
                            <CompanyTab
                                company={company}
                                roles={this.props.roles}
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

export default connect(mapStateToProps, null)(CompaniesList);
