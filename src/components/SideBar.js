import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from "../images/logo.png";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },

    heroContent: {
        display: 'flex',
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        alignItems: 'center',
    },
    rightToolbar: {
        marginLeft: "auto",
        marginRight: theme.spacing(2)
    },
    tagline: {
        display: "inline-block",
        marginLeft: 10,
    },
    menuItem: {
        '&:hover': {
            backgroundColor: "#f2f6f9",
        },
    }

}));

const menuOptions = [
    {
        name: "Control pediatrico",
        icon: <ChildFriendlyIcon/>,
    },
    {
        name: "Vacunas",
        icon: <ChildCareIcon/>,
    },
    {
        name: "Percentiles",
        icon: <TrendingUpIcon/>,
    }

];


const menuPerfil = [
    {
        name: "Mi Perfil",
        icon: <PersonOutlineIcon/>,
    },
    {
        name: "Salir",
        icon: <ExitToAppIcon/>,
    }

];

export default function SideBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Clinica Brea
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="left"
            >
                <div className={classes.toolbar}>
                    <Container className={classes.heroContent}>
                        <div className="item">
                            <img width={50} src={logo} alt=""/>
                        </div>
                        <div className="item">
                            <Typography variant="h5" style={{fontSize: '18px'}} color="textSecondary">
                                Hola, Emanuel
                            </Typography>
                        </div>
                    </Container>
                </div>
                <List>
                    {menuOptions.map((option, index) => (
                        <ListItem button key={index} className={classes.menuItem}>
                            <ListItemIcon>{option.icon}</ListItemIcon>
                            <ListItemText primary={option.name}/>
                        </ListItem>
                    ))}
                </List>
                <List>
                    {menuPerfil.map((option, index) => (
                        <ListItem button key={index} className={classes.menuItem}>
                            <ListItemIcon>{option.icon}</ListItemIcon>
                            <ListItemText primary={option.name}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

        </div>
    );
}
