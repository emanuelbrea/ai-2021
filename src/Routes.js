import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Main from "./components/Main";
import ScrollToTop from "./components/ScrollToTop";

export default function Routes() {

    return (
        <Router>
            <ScrollToTop/>
            <Switch>
                <Route component={Main}/>
            </Switch>
        </Router>
    );
}

