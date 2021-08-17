import React from "react";
import Footer from "./Footer";
import MenuAppBar from "./NavBar";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    wrapper: {
        overflowX: "hidden",
    },
}));


export default function Main(){

    const classes = useStyles();
    return(
        <div className={classes.wrapper}>
            <MenuAppBar/>
            <Footer />
        </div>
    );
}







