import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Main from "../public/Main";
import PrivateRoute from "./PrivateRoute";
import Home from "../private/Home";

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

