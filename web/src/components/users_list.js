import React from 'react';
import {List} from 'semantic-ui-react';
import RulesTable from './rules_table';

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
        });
    };

    showRules = userId =>
        this.state.selectedUser === userId;

    render() {
        return (
            <List selection animated verticalAlign='middle'>
                {this.props.users.map(user =>
                        <List.Item key={`user_${user.id}`}>
                            <List.Header onClick={() => this.handleSelectUser(user.id)}>
                                {`${user.name} - ${user.position}`}
                            </List.Header>
                            {this.showRules(user.id) && <RulesTable />}
                        </List.Item>
                )}
            </List>
        )
    }
}

export default UsersList;
