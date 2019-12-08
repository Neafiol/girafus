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
                console.log(resp.data);
                main.setState({value: resp.data.roles});
            });

    }

    newRole = () => {
        var main = this;
        console.log(this.state.new_role);
        axios.patch(ROOT_ROUTE + "user/", {
            user_id: this.state.user_id,
            role: this.state.new_role
        })
            .then((resp) => {
                console.log("Sucsess");
                main.close();
            });
    };


    handleLogout = () => {
        this.props.dispatch({type: 'LOGOUT'});
    };

    handleChange = (e, {value}) => {
        console.log(value);
        this.setState({value});
    };

    handleSeleced = (e, {name,value}) => {
        this.setState({[name]:value});
    };


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
                                <Input type="date" name={"date"} onChange={this.handleChange} label='Срок действия'/>
                            </Form.Group>
                            <Form.Group>
                                <Dropdown placeholder='State' onChange={this.handleSeleced} name={"new_role"} label='Роль пользователя' search selection options={this.state.roles} />
                            </Form.Group>
                        </Form>

                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.close} negative>Отмена</Button>
                        <Button
                            positive
                            icon='add'
                            onClick={this.newRole}
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
                    disabled
                    placeholder='Роли пользователя'
                />
                <Menu.Menu position='right'>
                    <Button color={"green"} onClick={this.show} style={{"margin-left": "10px"}}>Добавить</Button>
                </Menu.Menu>
            </Menu>

        )
    }
}

export default connect(mapStateToProps, null)(RoleEditor);
