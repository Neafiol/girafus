import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Button, Dropdown, Grid, Image, Menu} from 'semantic-ui-react';
import RulesTable from "../components/rules_table";
import axios from "axios";
import {ROOT_ROUTE} from "../constants/routes";

const mapStateToProps = state => ({
    logged: state.login.logged,
});

class User extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user_id: 1,
            rules: [],
            roles:[{ key: 1, text: "Бугалтер", value:1 },
                { key: 2, text: "Директор", value: 2 }]
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

    }

    save = (rules) => {
        axios.patch(ROOT_ROUTE + "user/", {
            user_id:this.state.user_id,
            rules:rules
        })
            .then((resp) => {
                console.log("Sucsess");
            });
    };

    handleLogout = () => {
        this.props.dispatch({type: 'LOGOUT'});
    };

    handleChange = (e, { value }) => this.setState({ value });

    render() {
        if (!this.props.logged) {
            return <Redirect to='/'/>
        }
        const {value } = this.state;

        return (
            <div className={"user-page"}>
                {/*<Menu attached='top'>*/}
                {/*    <Menu.Menu position='right'>*/}
                {/*        <Dropdown item text='Владимир Путин'>*/}
                {/*            <Dropdown.Menu>*/}
                {/*                <Dropdown.Item onClick={this.handleLogout}>Выйти</Dropdown.Item>*/}
                {/*            </Dropdown.Menu>*/}
                {/*        </Dropdown>*/}
                {/*    </Menu.Menu>*/}
                {/*</Menu>*/}
                <Grid columns='equal' inverted padded>
                    <Grid.Row textAlign='center' verticalAlign={"middle"}>
                        <Grid.Column>
                            <Image size={"tiny"} src='https://uc559035b5e9d656f886f0e22052.previews.dropboxusercontent.com/p/thumb/AAr3LCuDH93GW8K_DwJ07O2e96UwQa4wos-RVlzmoe0BQ4a3Y7vwcEZrlmGXUq2bm8d-ViegmV9vbvMQUB_-vSP_lZxCqG9uqo3hCx1Mtt1JLRfXXD7vTVRWDYgHEZ1S_EteiabNAwguWIFBV9u3LidsDD2RAwZot5wRe89EtxyMLms9RUXiiohZwDIAvEwg8pa0e8861ZfGj-rSlAXkoWZ3miu5dGA3RNxju5Pv2J1LIfnlnQHJHSkwU0nanNd9yiCt9_hmwB9eU4Vgm_RctQnl4YZG-xSPgPxVjyRsaxCifRJN3I9MjGnGY_Ecs0ePAkGQZ2mDTIslear1HBMWUUNsXwT-oD1wL8SX3MZlGsqIKu-WYXtF8oA2p45rPH3GkTAGf3Tw_KsPJYHiwm1i_6M1/p.png?fv_content=true&size_mode=5' avatar />
                            <span style={{"font-size":"1.5em","margin-left":"30px"}}>Вольнов Петр</span>
                        </Grid.Column>
                        <Grid.Column>
                            <span style={{"font-weight":"100"}}>Компания: Росстат</span>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Menu secondary fluid>
                            <Dropdown
                                fluid
                                selection
                                multiple={true}
                                options={this.state.roles}
                                value={value}
                                placeholder='Добавить роль'
                                onChange={this.handleChange}
                                onSearchChange={this.handleSearchChange}
                            />
                            <Menu.Menu position='right'>
                                <Button color={"green"} style={{"margin-left":"10px"}}>Применить</Button>
                            </Menu.Menu>
                        </Menu>
                        </Grid.Row>
                </Grid>

                {this.state.rules.length > 0 &&
                <RulesTable btnName={"Запросить разрешение"} save={this.save} rows={this.state.rules}/>}
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(User);
