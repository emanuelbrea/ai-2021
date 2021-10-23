import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link, useHistory} from "react-router-dom";
import logo from '../../images/logo.png';
import useToken from "../routes/useToken";


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
    },
    link: {
        textDecoration: "none",
        color: "inherit"
    },
    tagline: {
        display: "inline-block",
        marginLeft: 10,
    },
}));

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

export default function MenuAppBar() {
    const classes = useStyles();
    const history = useHistory();
    const {token, setToken} = useToken();

    const handleLogin = () => {
        history.push("/login");
    };

    const handleRegister = () => {
        history.push("/signup");
    };

    const handleInicio = () => {
        history.push("/home");
    };

    const handleLogout = () => {
        setToken('expired');
        sessionStorage.clear();
        history.push("/login");
    };


    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h5">
                        <Link to="/" className={classes.link} onClick={scrollToTop}>
                            <img width={50} src={logo} style={{marginBottom: -10}} alt=""/>
                            <span className={classes.tagline}>Papis Felices</span>
                        </Link>
                    </Typography>
                    <section className={classes.rightToolbar}>
                        {token === undefined ?
                            <div><Button color="inherit" className={classes.menuButton} onClick={handleRegister}>Registro</Button>
                            <Button color="inherit" variant={"outlined"} onClick={handleLogin}>Ingresar</Button></div>
                            : <div>
                                <Button color="inherit" className={classes.menuButton} onClick={handleInicio}>Inicio</Button>
                                <Button color="inherit" variant={"outlined"} onClick={handleLogout}>Salir</Button>
                            </div>
                        }
                    </section>
                </Toolbar>
            </AppBar>


        </div>
    );
}
