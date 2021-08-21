import React from "react";
import MenuAppBar from "./NavBar";
import Routing from "./Routing";
import CssBaseline from "@material-ui/core/CssBaseline";

export default function Main() {
    return (
        <React.Fragment>
            <CssBaseline/>
            <MenuAppBar/>
            <Routing/>
        </React.Fragment>
    );
}







