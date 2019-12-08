import React from 'react';
import { Modal, Form, Dropdown, Button } from 'semantic-ui-react';

class CreateUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            createUserFields: {},
        }
    }

    handleOpen = () =>
        this.setState({
            open: true,
        });

    handleCancel = () =>
        this.setState({
            open: false,
            createUserFields: {},
        });

    handleInputChange = (e, name) => {
        this.setState({
            createUserFields: {
                ...this.state.createUserFields,
                [name]: e.target.value,
            }
        });
    };

    handleSelectRole = (e, {value}) => {
        this.setState({
            createUserFields: {
                ...this.state.createUserFields,
                roles: value,
            },
        })
    };

    handleCreateUser = () => {
        this.props.handleCreateUser(this.state.createUserFields);
        this.setState({
            open: false,
            createUserFields: {},
        });
    };

    render() {
        let roles = this.props.roles.map(role => ({
            key: role.id,
            value: role.id,
            text: role.name,
        }));
        return (
            <div>
                <Button basic onClick={this.handleOpen}>
                    Добавить пользователя
                </Button>
                <Modal
                    open={this.state.open}
                    closeOnDimmerClick={false}
                    centered={false}
                >
                    <Modal.Header>Создание пользователя</Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input
                                    fluid
                                    label='Фамилия'
                                    placeholder='Фамилия'
                                    value={this.state.createUserFields['lastName']}
                                    onChange={e => this.handleInputChange(e, 'lastName')}
                                />
                                <Form.Input
                                    fluid
                                    label='Имя'
                                    placeholder='Имя'
                                    value={this.state.createUserFields['firstName']}
                                    onChange={e => this.handleInputChange(e, 'firstName')}
                                />
                                <Form.Input
                                    fluid
                                    label='Отчество'
                                    placeholder='Отчество'
                                    value={this.state.createUserFields['middleName']}
                                    onChange={e => this.handleInputChange(e, 'middleName')}
                                />
                                <Form.Input
                                    fluid
                                    label='Должность'
                                    placeholder='Тварь дрожащая или право имеет?'
                                    value={this.state.createUserFields['position']}
                                    onChange={e => this.handleInputChange(e, 'position')}
                                />
                            </Form.Group>
                            <Dropdown
                                fluid
                                selection
                                multiple={true}
                                options={roles}
                                placeholder='Выберите роли'
                                onChange={this.handleSelectRole}
                            />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic onClick={this.handleCancel}>Отмена</Button>
                        <Button color='green' onClick={this.handleCreateUser}>Создать</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
}

export default CreateUser;
