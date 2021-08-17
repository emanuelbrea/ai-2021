import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useHistory} from "react-router-dom";
import {useTheme} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    rightToolbar: {
        marginLeft: "auto",
        marginRight: theme.spacing(2)
    }
}));

export default function MenuAppBar() {
    const classes = useStyles();
    const history = useHistory();

    const handleLogin = () => {
        history.push("/login");
    };

    const handleRegister = () => {
        history.push("/signup");
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" >
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" >
                        Clinica Brea
                    </Typography>
                    <section className={classes.rightToolbar}>
                    <Button color="inherit" className={classes.menuButton} onClick={handleRegister}>Registro</Button>
                    <Button color="inherit" variant={"outlined"} onClick={handleLogin}>Ingresar</Button>
                    </section>
                </Toolbar>
            </AppBar>
        </div>
    );
}
