import React from 'react';
import {connect} from 'react-redux';
import { List, Button, Icon } from 'semantic-ui-react';
import RulesTable from "./rules_table";

const mapDispatchToProps = dispatch => ({dispatch});

class RolesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showRules: false,
            roleId: undefined,
            rules: [],
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {roleId, rules} = this.state;
        if (roleId && !rules && this.getRole(roleId).rules) {
            let role = this.getRole(roleId);
            this.setState({
                showRules: !!role.rules,
                rules: role.rules,
            })
        }
    }

    getRole = roleId => {
        let result;
        this.props.roles.forEach(role => {
           if (role.id === roleId) {
               result = role;
           }
        });
        return result;
    };

    showRoleRules = roleId => {
        let role = this.getRole(roleId);

        this.setState({
            showRules: !!role.rules,
            roleId,
            rules: role.rules,
        });

        if (!role.rules) {
            this.props.dispatch({type: 'GET_ROLE_RULES', roleId});
        }
    };

    render() {
        return (
            <div>
                <List divided animated size='big' className={'role-list'}>
                    {this.props.roles.map(role =>
                        <List.Item key={`role_item_${role.id}`} active={this.state.roleId === role.id}>
                            <List.Header>
                                {role.name}
                                <Button basic
                                        icon labelPosition='left'
                                        floated='right'
                                        onClick={() => this.showRoleRules(role.id)}
                                >
                                    <Icon name='edit outline' />
                                    Изменить
                                </Button>
                            </List.Header>
                        </List.Item>
                    )}
                </List>
                {this.state.showRules && <RulesTable rows={this.state.rules}/>}
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(RolesList);
