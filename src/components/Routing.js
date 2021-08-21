import React, {memo} from "react";
import {Switch} from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import PropsRoute from "./PropsRoute";
import ForgotPassword from "./ForgotPassword";
import useLocationBlocker from "./useLocationBlocker";
import Home from "./Home";

function Routing() {
    useLocationBlocker();
    return (
        <Switch>
            <PropsRoute path="/signup" component={Signup}/>
            <PropsRoute path="/login" component={Login}/>
            <PropsRoute path='/reset' component={ForgotPassword}/>
            <PropsRoute path='/' component={Home}/>

        </Switch>
    );
}

export default memo(Routing);
