import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Main from "./components/Main";
import SideBar from "./components/SideBar";
import PrivateRoute from "./components/PrivateRoute";

export default function Routes() {

    return (
        <Router>
            <Switch>
                <PrivateRoute path='/home' component={SideBar}/>
                <Route component={Main}/>
            </Switch>
        </Router>
    );
}

