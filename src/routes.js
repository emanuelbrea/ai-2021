import React from 'react'
import { Route,  BrowserRouter as Router, Switch } from 'react-router-dom'
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import MenuAppBar from "./components/Menu";

export default props => (
    <Router>
            <Switch>
                <Route exact path='/login' component={ Login } />
                <Route exact path='/signup' component={ Signup } />
                <Route exact path='/reset' component={ ForgotPassword } />
                <Route exact path='/' component={ MenuAppBar } />
            </Switch>
    </Router>
)
