import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import logo from "../../images/logo.png";
import {Container, withStyles} from "@material-ui/core";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ChildFriendlyIcon from '@material-ui/icons/ChildFriendly';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import Profile from "./Profile";
import ChildrenProfile from "./ChildrenProfile";
import Vacunas from "./Vacunas";
import MuiListItem from "@material-ui/core/ListItem";
import ControlPediatrico from "./ControlPediatrico";
import {Redirect} from "react-router-dom";
import Percentiles from "./Percentiles";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

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
    main: {
        width: '100%'
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

const menuOptions = [
    {
        name: "Control pediatrico",
        value: "control",
        icon: <ChildFriendlyIcon/>,
    },
    {
        name: "Vacunas",
        value: "vacunas",
        icon: <ChildCareIcon/>,
    },
    {
        name: "Percentiles",
        value: "percentiles",
        icon: <TrendingUpIcon/>,
    }

];


const menuPerfil = [
    {
        name: "Mi Perfil",
        value: "perfil",
        icon: <PersonOutlineIcon/>,
        index: 3
    },
    {
        name: "Mis hijos",
        value: "hijos",
        icon: <PeopleOutlineIcon/>,
        index: 4
    },
    {
        name: "Salir",
        value: "salir",
        icon: <ExitToAppIcon/>,
        index: 5
    }

];

const ListItem = withStyles({
    root: {
        "&$selected": {
            backgroundColor: '#4F46E5',
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
        "&$selected:hover": {
            backgroundColor: '#4F46E5',
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "white"
            }
        },
    },
    selected: {}
})(MuiListItem);

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Home(props) {
    const classes = useStyles();
    const initialIndex = 0;
    const [menu, setMenu] = useState(menuOptions[initialIndex].value);
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);
    const username = props.location.state.username;
    const children = props.location.state.children;

    const [firstLogin, setFirstLogin] = useState(true);

    const handleListItemClick = (index, value) => {
        setSelectedIndex(index);
        setMenu(value)
        if (value === 'salir') {
            sessionStorage.clear();
        }
    };

    const handleClose = () => {
        setFirstLogin(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        <span className={classes.tagline}>Papis Felices</span>
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
                        <ListItem button key={index} selected={selectedIndex === index}
                                  onClick={() => handleListItemClick(index, option.value)}>
                            <ListItemIcon>{option.icon}</ListItemIcon>
                            <ListItemText primary={option.name}/>
                        </ListItem>
                    ))}
                </List>
                <List>
                    {menuPerfil.map((option) => (
                        <ListItem button key={option.index} selected={selectedIndex === option.index}
                                  onClick={() => handleListItemClick(option.index, option.value)}>
                            <ListItemIcon>{option.icon}</ListItemIcon>
                            <ListItemText primary={option.name}/>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main className={classes.main}>
                <div className={classes.appBarSpacer}/>
                {menu === "perfil" && (
                    <Profile username={username} children={children}/>
                )}
                {menu === "hijos" && (
                    <ChildrenProfile username={username} children={children}/>
                )}
                {menu === "vacunas" && (
                    <Vacunas username={username} children={children}/>
                )}
                {menu === "control" && (
                    <ControlPediatrico username={username} children={children}/>
                )}
                {menu === "percentiles" && (
                    <Percentiles username={username} children={children}/>
                )}
                {menu === "salir" && (
                    <Redirect to='/'/>
                )}

            </main>
            <Snackbar open={firstLogin} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    Ingreso exitoso!
                </Alert>
            </Snackbar>
        </div>
    );
}
