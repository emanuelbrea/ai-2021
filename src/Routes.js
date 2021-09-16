import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Main from "./components/Main";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./components/Home";

export default function Routes() {

    return (
        <Router>
            <Switch>
                <PrivateRoute path='/home' component={Home}/>
                <Route component={Main}/>
            </Switch>
        </Router>
    );
}

