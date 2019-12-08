import React from 'react';
import axios from "axios";

import {Button, Image, Grid, Accordion} from 'semantic-ui-react'
import RulesTableAdmin from "./RulesTableAdmin";
import { ROOT_ROUTE, REQUESTS } from "../constants/routes";

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
        axios.get(ROOT_ROUTE + REQUESTS).then(
            (r) => {
                console.log("req", r.data);
                main.setState({"requests": r.data})
            }
        )
    }

    save = (table, user_id) => {
        axios.patch(ROOT_ROUTE + "/user", {
            "user_id": user_id,
            "rules": table
        }).then((r) => {
            this.state.requests.splice(this.state.activeIndex, 1);
            this.setState({activeIndex: -1})
            axios.delete(ROOT_ROUTE + REQUESTS)
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
                                                   src='https://vpam.ru/images/avatar/214163f34e9e397457ecb60b9f0d35bf.png'
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


