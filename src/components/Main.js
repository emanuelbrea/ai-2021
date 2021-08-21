import React from "react";
import Footer from "./Footer";
import MenuAppBar from "./NavBar";
import {makeStyles} from "@material-ui/core/styles";
import Routing from "./Routing";

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
            <Routing/>
            <Footer />
            {/*TODO mover junto a home dentro de routing /home*/}
        </div>
    );
}







