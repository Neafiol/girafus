import React from 'react';
import {connect} from 'react-redux';
import {Button, Dropdown, Menu, Modal, Input, Form} from 'semantic-ui-react';
import axios from "axios";
import {ROOT_ROUTE} from "../constants/routes";

const mapStateToProps = state => ({
    logged: state.login.logged,
});

class RoleEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: 1,
            open:false,
            rules: [],
            roles: [{key: 1, text: "Бугалтер", value: 1},
                {key: 2, text: "Директор", value: 2}],
            addoptions: [{key: 1, text: "Добавить на всегда", value: 1},
                {key: 2, text: "Добавить на время", value: 2}]
        };
    }

    componentDidMount() {
        var main = this;
        axios.get(ROOT_ROUTE + "rules/", {
            params: {
                "user_id": 1
            }
        })
            .then((resp) => {
                main.setState({rules: resp.data});
            });

        axios.get(ROOT_ROUTE + "role/")
            .then((resp) => {
                var roles = [];
                for (var r in resp.data) {
                    roles.push({
                        key: r,
                        value: resp.data[r].id,
                        text: resp.data[r].name,
                    })
                }
                main.setState({roles: roles});
            });

        axios.get(ROOT_ROUTE + "user/", {
            params: {
                user_id: this.state.user_id
            }
        })
            .then((resp) => {
                main.setState({value: resp.data.roles});
            });

    }

    save = (roles) => {
        axios.patch(ROOT_ROUTE + "user/", {
            user_id: this.state.user_id,
            rules: roles
        })
            .then((resp) => {
                console.log("Sucsess");
            });
    };


    handleLogout = () => {
        this.props.dispatch({type: 'LOGOUT'});
    };

    handleChange = (e, {value}) => this.setState({value});


    show = () => this.setState({ open: true });
    close = () => this.setState({ open: false });


    render() {
        const {value,open} = this.state;

        return (
            <Menu secondary fluid>
                <Modal size={"tiny"} open={open} onClose={this.close}>
                    <Modal.Header>Добавить роль</Modal.Header>
                    <Modal.Content>
                        <p>Добавить пользователю новую роль</p>
                        <Form>
                            <Form.Group widths='equal'>
                                <Form.Input fluid label='First name' placeholder='First name' />
                                <Form.Input fluid label='Last name' placeholder='Last name' />
                                <Form.Select
                                    fluid
                                    label='Gender'
                                    options={options}
                                    placeholder='Gender'
                                />
                            </Form.Group>
                        </Form>

                        <Dropdown placeholder='State' search selection options={this.state.roles} />
                        <Input type="date" placeholder='Search...' />
                        <Dropdown floating placeholder='Продолжительность' search selection options={this.state.addoptions} />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative>Отмена</Button>
                        <Button
                            positive
                            icon='add'
                            labelPosition='right'
                            content='Добавить'
                        />
                    </Modal.Actions>
                </Modal>

                <Dropdown
                    fluid
                    selection
                    multiple={true}
                    options={this.state.roles}
                    value={value}
                    placeholder='Роли пользователя'
                    onChange={this.handleChange}
                    onSearchChange={this.handleSearchChange}
                />
                <Menu.Menu position='right'>
                    <Button color={"green"} onClick={this.show} style={{"margin-left": "10px"}}>Добавить</Button>
                </Menu.Menu>
            </Menu>

        )
    }
}

export default connect(mapStateToProps, null)(RoleEditor);
