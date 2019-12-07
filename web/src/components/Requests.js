import React from 'react';
import axios from "axios";

import {Button, Image, Grid, Accordion, Dropdown} from 'semantic-ui-react'
import "../css/RulesTable.css"
import RulesTableAdmin from "./RulesTableAdmin";

const HOST = "http://localhost:8082";

export default class UserTable extends React.Component {

    constructor(props) {
        super(props);
        var requests = [];
        this.state = {
            activeIndex: 0,
            requests: requests
        }
    }

    componentDidMount() {
        var main = this;
        axios.get(HOST + "/requests").then(
            (r) => {
                console.log("req", r.data);
                main.setState({"requests": r.data})
            }
        )
    }

    save = (table, user_id) => {
        axios.patch(HOST + "/user", {
            "user_id": user_id,
            "rules": table
        }).then((r) => {
            this.state.requests.splice(this.state.activeIndex, 1);
            this.setState({activeIndex: -1})
            axios.delete(HOST + "/requests")
        })
    };

    handleClick = (e, titleProps) => {
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newIndex = activeIndex === index ? -1 : index;

        this.setState({activeIndex: newIndex})
    };


    render() {
        const {activeIndex} = this.state;

        return (
            <div className={"request-user-table"}>
                {
                    this.state.requests.map((card, i) => {
                        return (<Accordion styled fluid>
                            <Accordion.Title
                                active={this.state.activeIndex === i}
                            >

                                <Grid columns='equal' inverted padded>
                                    <Grid.Row textAlign='center' verticalAlign={"middle"}>
                                        <Grid.Column>
                                            <Image size={"tiny"}
                                                   src='https://uc559035b5e9d656f886f0e22052.previews.dropboxusercontent.com/p/thumb/AAr3LCuDH93GW8K_DwJ07O2e96UwQa4wos-RVlzmoe0BQ4a3Y7vwcEZrlmGXUq2bm8d-ViegmV9vbvMQUB_-vSP_lZxCqG9uqo3hCx1Mtt1JLRfXXD7vTVRWDYgHEZ1S_EteiabNAwguWIFBV9u3LidsDD2RAwZot5wRe89EtxyMLms9RUXiiohZwDIAvEwg8pa0e8861ZfGj-rSlAXkoWZ3miu5dGA3RNxju5Pv2J1LIfnlnQHJHSkwU0nanNd9yiCt9_hmwB9eU4Vgm_RctQnl4YZG-xSPgPxVjyRsaxCifRJN3I9MjGnGY_Ecs0ePAkGQZ2mDTIslear1HBMWUUNsXwT-oD1wL8SX3MZlGsqIKu-WYXtF8oA2p45rPH3GkTAGf3Tw_KsPJYHiwm1i_6M1/p.png?fv_content=true&size_mode=5'
                                                   avatar/>
                                            <span style={{
                                                "font-size": "1.5em",
                                                "margin-left": "30px"
                                            }}>Вольнов Петр</span>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <span style={{"font-weight": "100"}}>Компания: Росстат</span>
                                        </Grid.Column>
                                        <Grid.Column>
                                            <Button basic index={i} size={"large"} floated={"right"}
                                                    onClick={this.handleClick}>Подробнее</Button>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                            </Accordion.Title>

                            <Accordion.Content active={activeIndex === i}>
                                <RulesTableAdmin user_id={i} save={this.save} rows={this.state.requests[i].rules}
                                                 btnName={"Применить изменения"}/>
                            </Accordion.Content>

                        </Accordion>)
                    })
                }
            </div>
        )

    }
}


