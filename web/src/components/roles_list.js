import React from 'react';
import {connect} from 'react-redux';
import {List, Button, Icon, Input} from 'semantic-ui-react';
import RulesTable from "./rules_table";

const mapDispatchToProps = dispatch => ({dispatch});

class RolesList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showRules: false,
            roleId: undefined,
            roleName: undefined,
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

    editRole = roleId => {
        let role = this.getRole(roleId);

        this.setState({
            showRules: !!role.rules,
            roleId,
            roleName: role.name,
            rules: role.rules,
        });

        if (!role.rules) {
            this.props.dispatch({type: 'GET_ROLE_RULES', roleId});
        }
    };

    handleRoleNameChange = e => {
        this.setState({
            roleName: e.target.value,
        })
    };

    saveRoleChanges = () => {
        this.props.dispatch({type: 'UPDATE_ROLE', roleId: this.state.roleId, roleName: this.state.roleName});

        this.setState({
            showRules: false,
            roleId: undefined,
            roleName: undefined,
            rules: [],
        });
    };

    render() {
        return (
            <div>
                <List divided animated size='big' className={'role-list'}>
                    {this.props.roles.map(role =>
                        <List.Item key={`role_item_${role.id}`} active={this.state.roleId === role.id}>
                            <List.Header>
                                {
                                    this.state.roleId === role.id ?
                                    <Input
                                        type='text'
                                        value={this.state.roleName}
                                        onChange={this.handleRoleNameChange}
                                    /> :
                                    role.name
                                }
                                <Button basic
                                        icon labelPosition='left'
                                        floated='right'
                                        onClick={() => this.editRole(role.id)}
                                >
                                    <Icon name='edit outline' />
                                    Изменить
                                </Button>
                            </List.Header>
                        </List.Item>
                    )}
                </List>
                {
                    this.state.showRules &&
                    <RulesTable
                        rows={this.state.rules}
                        initialEnabled={true}
                        save={this.saveRoleChanges}
                    />
                }
            </div>
        )
    }
}

export default connect(null, mapDispatchToProps)(RolesList);
