import React from 'react';
import {List} from 'semantic-ui-react';
import RulesTable from './rules_table';
import RoleEditor from "./role_editor";

class UsersList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedUser: '',
        }
    }

    handleSelectUser = userId => {
        this.setState({
            selectedUser: this.state.selectedUser === userId ? undefined : userId
        }, () => {
            let selectedUser = this.state.selectedUser;
            if (selectedUser && !this.props.users[selectedUser].rules) {
                this.props.getUserRules(selectedUser);
            }
        });
    };

    showRules = userId =>
        this.state.selectedUser === userId;

    render() {
        return (
            <List selection animated verticalAlign='middle'>
                {Object.values(this.props.users).map(user =>
                        <List.Item key={`user_${user.id}`}>
                            <List.Header onClick={() => this.handleSelectUser(user.id)}>
                                {`${user.name} - ${user.position}`}
                            </List.Header>
                            {this.showRules(user.id) && <div className={"user-role-card"}><RoleEditor/><RulesTable rows={user.rules}/></div>}
                        </List.Item>
                )}
            </List>
        )
    }
}

export default UsersList;
