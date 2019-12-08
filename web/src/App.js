import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import './App.css';
import Login from "./pages/login";
import Admin from "./pages/admin";
import User from "./pages/user";
import RoleEditor from "./components/role_editor";

const App = () => (
    <Router history={createBrowserHistory()}>
        <Switch>
            <Route exact path='/' component={RoleEditor} />
            <Route path='/admin' component={Admin} />
            <Route path='/user' component={User}/>
            <Redirect to='/' />
        </Switch>
    </Router>
);

export default App;
