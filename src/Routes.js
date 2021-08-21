import React from 'react'
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom'
import Main from "./components/Main";

export default function Routes(){

    return(
        <Router>
            <Switch>
                <Route component={ Main } />
            </Switch>
        </Router>
    );
}

