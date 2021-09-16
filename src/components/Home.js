import React, {useState} from 'react';
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
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import Profile from "./Profile";
import ChildrenProfile from "./ChildrenProfile";
import Vacunas from "./Vacunas";

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
    appBarSpacer: theme.mixins.toolbar,
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
    },
    main: {
        width: '100%'
    }

}));

const menuOptions = [
    {
        name: "Control pediatrico",
        value: "vacunas",
        icon: <ChildFriendlyIcon/>,
    },
    {
        name: "Vacunas",
        value: "vacunas",
        icon: <ChildCareIcon/>,
    },
    {
        name: "Percentiles",
        value: "children",
        icon: <TrendingUpIcon/>,
    }

];


const menuPerfil = [
    {
        name: "Mi Perfil",
        value: "perfil",
        icon: <PersonOutlineIcon/>,
    },
    {
        name: "Mis hijos",
        value: "hijos",
        icon: <PeopleOutlineIcon/>,
    },
    {
        name: "Salir",
        value: "salir",
        icon: <ExitToAppIcon/>,
    }

];

export default function Home() {
    const classes = useStyles();

    const [menu, setMenu] = useState('perfil');


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
                        <ListItem button key={index} className={classes.menuItem} onClick={() => setMenu(option.value)}>
                            <ListItemIcon>{option.icon}</ListItemIcon>
                            <ListItemText primary={option.name}/>
                        </ListItem>
                    ))}
                </List>
                <List>
                    {menuPerfil.map((option, index) => (
                        <ListItem button key={index} className={classes.menuItem} onClick={() => setMenu(option.value)}>
                            <ListItemIcon>{option.icon}</ListItemIcon>
                            <ListItemText primary={option.name}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.main}>
                <div className={classes.appBarSpacer}/>
                {menu === "perfil" && (
                    <Profile/>
                )}
                {menu === "hijos" && (
                    <ChildrenProfile/>
                )}
                {menu === "vacunas" && (
                    <Vacunas/>
                )}

            </main>
        </div>
    );
}
