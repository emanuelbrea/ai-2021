import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    MenuItem,
    Paper,
    Tab,
    Tabs
} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(10),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        flexGrow: 1,
    },
    tabs: {
        backgroundColor: 'white',
    },
    title: {
        marginBottom: theme.spacing(4),
    },
    floatingIcon: {
        '& > *': {
            margin: theme.spacing(1),
        },
        position: 'fixed',
        bottom: theme.spacing(6),
        right: theme.spacing(6),
    }
}));

const gruposSanguineos = [
    {
        value: 'A positivo (A +)',
    },
    {
        value: 'A negativo (A-)',
    },
    {
        value: 'B positivo (B +)',
    },
    {
        value: 'B negativo (B-)',
    },
    {
        value: 'AB positivo (AB+)',
    },
    {
        value: 'AB negativo (AB-)',
    },
    {
        value: 'O positivo (O+)',
    },
    {
        value: 'O negativo (O-)',
    },
];

export default function ChildrenProfile(props) {

    const classes = useStyles();
    const [grupoSanguineo, setgrupoSanguineo] = useState('A positivo (A +)');
    const initialTabs = ["Juan", "Pepe"];
    const [nombre, setNombre] = useState(initialTabs[0]);
    const [currentTab, setcurrentTab] = useState(initialTabs[0]);
    const [fecha, setFecha] = useState(new Date());
    const [openAlert, setOpenAlert] = useState(false);
    const defaultNewTab = "+";
    const [openSave, setOpenSave] = useState(false);

    const [tabs, setTabs] = useState(initialTabs);

    const initialState = {
        alergias: ["Polen"],
        enfermedades: ["Diabetes"]
    };

    const [estado, setEstado] = useState(initialState);

    const handleAddItem = (name) => {
        const value = estado[name];
        const newValue = [...value, ""];
        setEstado((estado) => ({...estado, [name]: newValue}));
    }

    const handleInputChange = (e, index) => {
        const {name, value} = e.target;
        const list = estado[name];
        const newList = [...list];
        newList[index] = value;
        setEstado((estado) => ({...estado, [name]: newList}));
    };

    const handleRemoveClick = (index, name) => {
        const list = estado[name];
        const newList = [...list];
        newList.splice(index, 1);
        setEstado((estado) => ({...estado, [name]: newList}));
    };

    //TABS
    const handleTabChange = (event, newValue) => {
        setcurrentTab(newValue);
    };

    const addTab = () => {
        setcurrentTab(defaultNewTab);
        setTabs([...tabs, defaultNewTab]);
    }

    const deleteTab = () => {
        handleClose();
        const newTab = tabs.at(-1) === currentTab ? tabs[0] : tabs.at(-1);
        setTabs(tabs.filter(item => item !== currentTab));
        setcurrentTab(newTab);
    }

    //ALERTS
    const handleClickOpen = () => {
        if (currentTab !== defaultNewTab) {
            setOpenAlert(true);
        } else {
            deleteTab();
        }
    };

    const handleClose = () => {
        setOpenAlert(false);
    };


    const handleClickOpenSave = () => {
        setOpenSave(true);
    };

    const handleCloseSave = () => {
        setOpenSave(false);
    };


    return (
        <React.Fragment>
            <Paper className={classes.root}>

                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                    centered
                    indicatorColor="primary"
                >
                    {tabs.map((tab, index) => (
                        <Tab
                            label={tab}
                            key={index}
                            value={tab}
                        />
                    ))}
                </Tabs>
            </Paper>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5" className={classes.title}>
                        Mis hijos
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="off"
                                    name="firstName"
                                    variant="outlined"
                                    fullWidth
                                    id="firstName"
                                    label="Nombre"
                                    autoFocus
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                />
                            </Grid>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid item xs={12}>
                                    <KeyboardDatePicker
                                        fullWidth
                                        autoOk
                                        variant="inline"
                                        inputVariant="outlined"
                                        label="Fecha de nacimiento"
                                        format="MM/dd/yyyy"
                                        value={fecha}
                                        InputAdornmentProps={{position: "end"}}
                                        onChange={date => setFecha(date)}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    select
                                    fullWidth
                                    id="email"
                                    label="Grupo Sanguineo"
                                    name="email"
                                    value={grupoSanguineo}
                                    onChange={(e) => setgrupoSanguineo(e.target.value)}
                                >
                                    {gruposSanguineos.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {estado.alergias.map((alergia, index) => (
                                <Grid item key={index} xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="alergias"
                                        label="Alergias"
                                        id="alergias"
                                        autoComplete="off"
                                        value={alergia}
                                        onChange={e => handleInputChange(e, index)}
                                        InputProps={{
                                            endAdornment:
                                                <div style={{display: "flex"}}>
                                                    {estado.alergias.length > 1 && <Tooltip title="Eliminar">
                                                        <IconButton aria-label="delete"
                                                                    onClick={() => handleRemoveClick(index, 'alergias')}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>}
                                                    {estado.alergias.length === index + 1 && estado.alergias[index] !== '' &&
                                                    <Tooltip title="Agregar">
                                                        <IconButton aria-label="add"
                                                                    onClick={() => handleAddItem('alergias')}>
                                                            <AddIcon/>
                                                        </IconButton>
                                                    </Tooltip>}
                                                </div>
                                        }}
                                    />
                                </Grid>
                            ))}
                            {estado.enfermedades.map((enfermedad, index) => (
                                <Grid item key={index} xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="enfermedades"
                                        label="Enfermedades Crónicas"
                                        id="enfermedades"
                                        autoComplete="off"
                                        value={enfermedad}
                                        onChange={e => handleInputChange(e, index)}
                                        InputProps={{
                                            endAdornment:
                                                <div style={{display: "flex"}}>
                                                    {estado.enfermedades.length > 1 && <Tooltip title="Eliminar">
                                                        <IconButton aria-label="delete"
                                                                    onClick={() => handleRemoveClick(index, 'enfermedades')}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>}
                                                    {estado.enfermedades.length === index + 1 && estado.enfermedades[index] !== '' &&
                                                    <Tooltip title="Agregar">
                                                        <IconButton aria-label="add"
                                                                    onClick={() => handleAddItem('enfermedades')}>
                                                            <AddIcon/>
                                                        </IconButton>
                                                    </Tooltip>}
                                                </div>
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Button
                            onClick={handleClickOpenSave}
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Guardar
                        </Button>
                    </form>
                </div>
            </Container>
            <div className={classes.floatingIcon}>
                <Fab color="primary" aria-label="add" title="Agregar hijo" onClick={addTab}>
                    <AddIcon/>
                </Fab>
                {tabs.length !== 1 &&
                <Fab style={{backgroundColor: "red", color: "white"}} size="small" aria-label="delete"
                     title="Eliminar hijo" onClick={handleClickOpen}>
                    <DeleteIcon/>
                </Fab>
                }
            </div>
            <Dialog
                open={openAlert}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"¿Eliminar hijo " + currentTab + " ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Se perderan los datos del hijo {currentTab}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button style={{backgroundColor: "red", color: "white"}} onClick={deleteTab} color="primary"
                            autoFocus>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={openSave}
                onClose={handleCloseSave}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Datos guardados correctamente"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseSave} color="secondary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}