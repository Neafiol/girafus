import React from 'react';

import {Button, Grid, Input, Segment, Table} from 'semantic-ui-react'
import "../css/RulesTable.css"


export default class UserTable extends React.Component {
    constructor(props) {
        super(props);
        var rows = props.rows|| [];
        var tables = {};
        for (var r in rows) {
            if (tables[rows[r].type] === undefined) {
                tables[rows[r].type] = []
            }
            tables[rows[r].type].push(rows[r]);
        }
        this.state = {
            user_id: props.user_id||1,
            rows: rows,
            tables: props.tables||tables,
            btnName: props.btnName||"Сохранить изменения",
        };
        this.rows_for_update = {};
        this.save = props.save;
    }


    handleSearchChange = (e, {value}) => {
        this.setState({isLoading: true, value});
        console.log(value);
        //filtr
        var rows = this.state.rows;

        var tables = {};
        for (var r in rows) {
            if (rows[r].name.indexOf(value) < 0) {
                continue;
            }
            if (tables[rows[r].type] === undefined) {
                tables[rows[r].type] = []
            }
            tables[rows[r].type].push(rows[r]);
        }
        this.setState({"tables": tables})
    };
    update = (id, column, value) => {
        console.log(id, column, value)
        var tables = {};
        for (var r in this.state.rows) {
            var row = this.state.rows[r];
            if (row.id == id) {
                row.permissions[column] = value;
                this.rows_for_update[row.id] = row.permissions;
            }
            if (tables[row.type] === undefined) {
                tables[row.type] = []
            }
            tables[this.state.rows[r].type].push(this.state.rows[r]);
        }
        this.setState({"tables": tables})
    };

    drowTable = (table) => {
        let rows = [];
        for (var row in table) {
            var val = table[row];
            this.val_id = val.id;

            rows.push(
                <Table.Row>
                    <Table.Cell width={8}>
                        {val.name}
                    </Table.Cell>
                    {
                        val.permissions.map((perm, i) => {
                            var val_id = this.val_id;
                            var name = "x";
                            var color = "grey";
                            var val = 1;
                            if (perm == 2) {
                                name = 'chevron down';
                                color = 'orange';
                                val = 1;
                            }
                            if (perm == 1) {
                                name = 'chevron down';
                                color = 'green';
                                val = 3;
                            }
                            if (perm == 3) {
                                name = 'x';
                                color = 'red';
                                val = 1;
                            }
                            if (perm == 0) {
                                name = 'chevron down';
                                color = 'grey';
                                val = 0;
                            }
                            return (
                                <Table.Cell width={2} textAlign={'center'}>
                                    <Button onClick={() => this.update(val_id, i, val)} circular color={color}
                                            icon={name}/>
                                </Table.Cell>)
                        })
                    }
                </Table.Row>
            )
        }
        return rows;
    };


    getTables = (tables) => {
        let tabls = [];
        console.log(tables);
        if (Object.keys(tables).length == 0) {
            return <h1>Not found</h1>
        }
        for (var t in tables) {
            var table = tables[t];
            tabls.push(
                <Table singleLine attached>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={4}>{t}</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Создание</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Просмотр</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Пред. подпись</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Уд. подпись</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {
                            this.drowTable(table)
                        }
                    </Table.Body>
                </Table>
            )
        }
        return tabls;
    };

    render() {
        const {isLoading, value, results} = this.state;

        return (
            <div className={"rules-table"}>
                <style>

                </style>
                <Segment>
                    <Grid>
                        <Grid.Column width={11}>
                            <Input onChange={this.handleSearchChange} iconPosition='left' icon='search' fluid
                                   placeholder='Search...'/>
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Button positive
                                    onClick={()=>this.save(this.state.rows,this.state.user_id)} fluid>{this.state.btnName}</Button>
                        </Grid.Column>
                    </Grid>
                </Segment>
                {
                    this.getTables(this.state.tables)
                }
            </div>
        )

    }
}


