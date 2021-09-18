import React from "react";
import MenuAppBar from "./NavBar";
import {CssBaseline} from "@material-ui/core";
import PropsRoute from "../routes/PropsRoute";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import LandingPage from "./LandingPage";
import {Redirect, Switch} from "react-router-dom";
import useLocationBlocker from "../routes/useLocationBlocker";

export default function Main() {
    useLocationBlocker();
    return (
        <React.Fragment>
            <CssBaseline/>
            <MenuAppBar/>
            <Switch>
                <PropsRoute exact path="/signup" component={Signup}/>
                <PropsRoute exact path="/login" component={Login}/>
                <PropsRoute exact path='/reset' component={ForgotPassword}/>
                <PropsRoute exact path='/' component={LandingPage}/>
                <Redirect to='/'/>
            </Switch>
        </React.Fragment>
    );
}







