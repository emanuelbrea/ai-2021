import React from "react";
import {CssBaseline} from "@material-ui/core";
import useLocationBlocker from "./useLocationBlocker";
import SideBar from "./SideBar";
import MainScreen from "./MainScreen";

export default function Home() {
    useLocationBlocker();
    return (
        <React.Fragment>
            <CssBaseline/>
            <SideBar/>
            <MainScreen/>
        </React.Fragment>
    );
}

