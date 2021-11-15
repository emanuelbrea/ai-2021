import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import useToken from "../routes/useToken";


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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ChildrenProfile(props) {

    const classes = useStyles();
    const defaultGrupoSanguineo = 'A positivo (A +)';
    const defaultFecha = new Date();
    const [openAlert, setOpenAlert] = useState(false);
    const [openSave, setOpenSave] = useState(false);
    const token = useToken()['token'];
    const username = props.username;

    const nuevoHijo = {
        nombre: '',
        nacimiento: defaultFecha,
        grupo_sanguineo: defaultGrupoSanguineo,
        new: true
    };

    const [children, setChildren] = useState([nuevoHijo]);
    const [currentHijo, setCurrentHijo] = useState(0);
    const [alergias, setAlergias] = useState({});
    const [enfermedades, setEnfermedades] = useState({});
    const [currentNombre, setCurrentNombre] = useState(children[currentHijo].nombre);


    const handleAddAlergia = () => {
        const alergiasHijo = alergias[currentNombre];
        const newList = [...alergiasHijo];
        newList.push('');
        setAlergias((alergias) => ({...alergias, [currentNombre]: newList}))
    }

    const handleEditAlergia = (value, index) => {
        if (alergias[currentNombre] === undefined) {
            setAlergias((alergias) => ({...alergias, [currentNombre]: [value]}))
        } else {
            const alergiasHijo = alergias[currentNombre];
            const newList = [...alergiasHijo];
            newList[index] = value;
            setAlergias((alergias) => ({...alergias, [currentNombre]: newList}))
        }
    }

    const handleEditEnfermedad = (value, index) => {
        if (enfermedades[currentNombre] === undefined) {
            setEnfermedades((enfermedades) => ({...enfermedades, [currentNombre]: [value]}))
        } else {
            const enfermedadesHijo = enfermedades[currentNombre];
            const newList = [...enfermedadesHijo];
            newList[index] = value;
            setEnfermedades((enfermedades) => ({...enfermedades, [currentNombre]: newList}))
        }
    }

    const handleAddEnfermedad = (newValue) => {
        const enfermedadesHijo = enfermedades[currentNombre];
        const newList = [...enfermedadesHijo];
        newList.push(newValue);
        setEnfermedades((enfermedades) => ({...enfermedades, [currentNombre]: newList}))
    }


    const handleInputChange = (e) => {
        const child = children[currentHijo];
        if (e.target === undefined) {
            child['nacimiento'] = e;
        } else {
            child[e.target.name] = e.target.value;
        }
        const childrenCopy = [...children];
        childrenCopy[currentHijo] = child;
        setChildren(childrenCopy);
    };

    const handleRemoveAlergia = (index) => {
        const alergiasHijo = alergias[currentNombre];
        const newList = [...alergiasHijo];
        newList.splice(index, 1);
        setAlergias((estado) => ({...estado, [currentNombre]: newList}));
    };

    const handleRemoveEnfermedad = (index) => {
        const enfermedadesHijo = enfermedades[currentNombre];
        const newList = [...enfermedadesHijo];
        newList.splice(index, 1);
        setEnfermedades((estado) => ({...estado, [currentNombre]: newList}));
    };

    //TABS
    const handleTabChange = (event, newValue) => {
        const newIndex = children.findIndex(child => child.nombre === newValue);
        setCurrentHijo(newIndex);
        if (children[newIndex].new === undefined) {
            setCurrentNombre(children[newIndex].nombre);
        } else {
            setCurrentNombre('');
        }
    };

    const addTab = () => {
        const newChild = children.some(child => child.new !== undefined);
        if (!newChild) {
            delete alergias[""];
            delete enfermedades[""];
            const newChildren = [...children];
            newChildren.push(nuevoHijo);
            setChildren(newChildren);
            setCurrentHijo(newChildren.length - 1);
            setCurrentNombre('');
        }
    }

    const deleteTab = () => {
        handleClose();
        if (currentNombre !== '') {
            deleteChildrenData('alergia', currentNombre).then(res => {
                deleteChildrenData('enfermedad', currentNombre).then(async res => {
                    await deleteChildren()
                })
            })
        }
        delete alergias[currentNombre]
        delete enfermedades[currentNombre]
        setCurrentHijo(0);
        setChildren(children.filter(child => child.nombre !== currentNombre))
        setCurrentNombre(children[0].nombre);

    }

    useEffect(() => {
        getChildren().then(result => {
            if (result.success === 'true') {
                const children = result.data.result;
                if (result.data.size > 0) {
                    loadChildrenData(children).then(
                        res => {
                            setChildren(res);
                            setCurrentNombre(children[currentHijo].nombre);
                        }
                    )
                }
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const loadChildrenData = async (children) => {
        for (let i = 0; i < children.length; i++) {
            getChildrenData(children[i].nombre).then(res => {
                if (res.data.size > 0) {
                    let enfermedadesHijo = [];
                    let alergiasHijo = [];
                    let childrenData = res.data.result;
                    for (let j = 0; j < childrenData.length; j++) {
                        if (childrenData[j].tipo === 'enfermedad') {
                            enfermedadesHijo.push(childrenData[j].descripcion);
                        } else if (childrenData[j].tipo === 'alergia') {
                            alergiasHijo.push(childrenData[j].descripcion);
                        }
                    }
                    if (enfermedadesHijo.length === 0) {
                        enfermedadesHijo = [''];
                    }
                    if (alergiasHijo.length === 0) {
                        alergiasHijo = [''];
                    }
                    setAlergias((alergias) => ({...alergias, [children[i].nombre]: alergiasHijo}));
                    setEnfermedades((enfermedades) => ({...enfermedades, [children[i].nombre]: enfermedadesHijo}));
                }
            });
        }
        return children;
    }

    //ALERTS
    const handleClickOpen = () => {
        if (currentNombre !== '') {
            setOpenAlert(true);
        } else {
            deleteTab();
        }
    };

    const handleClose = () => {
        setOpenAlert(false);
    };


    const handleClickOpenSave = () => {
        const currentChild = children[currentHijo];
        let childName = currentNombre;
        if (currentChild.new !== undefined) {
            childName = currentChild.nombre;
            createChildren(currentChild).then(res => {
                if (res.success === 'true') {
                    currentChild.new = undefined;
                    setAlergias((alergias) => ({...alergias, [childName]: alergiasHijo}));
                    setEnfermedades((enfermedades) => ({...enfermedades, [childName]: enfermedadesHijo}));
                }
            });
        }
        const alergiasHijo = alergias[currentNombre];
        if (alergiasHijo !== undefined) {
            deleteChildrenData('alergia', childName).then(res => {
                    for (let i = 0; i < alergiasHijo.length; i++) {
                        createChildrenData('alergia', alergiasHijo[i], childName);
                    }
                }
            )

        }
        const enfermedadesHijo = enfermedades[currentNombre];
        if (enfermedadesHijo !== undefined) {
            deleteChildrenData('enfermedad', childName).then(res => {
                for (let i = 0; i < enfermedadesHijo.length; i++) {
                    createChildrenData('enfermedad', enfermedadesHijo[i], childName);
                }
            })
        }


        if (currentChild.new === undefined) {
            editChildren(currentChild);
        }
        setOpenSave(true);
    };

    const handleCloseSave = () => {
        setOpenSave(false);
    };

    const getChildren = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const children = await fetch('/children?' + new URLSearchParams({
            padre: username
        }), requestOptions)
            .then(res => res.json())

        return children;

    }

    const editChildren = async (currentChild) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                nombre: currentChild.nombre,
                nacimiento: currentChild.nacimiento,
                grupoSanguineo: currentChild.grupo_sanguineo,
                nombre_old: currentNombre,
                padre: username
            })
        };
        const children = await fetch('/children', requestOptions)
            .then(res => res.json())

        return children;

    }

    const deleteChildren = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                nombre: currentNombre,
                padre: username
            })
        };
        const children = await fetch('/children', requestOptions)
            .then(res => res.json())

        return children;

    }

    const createChildren = async (currentChild) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                nombre: currentChild.nombre,
                nacimiento: currentChild.nacimiento,
                grupoSanguineo: currentChild.grupo_sanguineo,
                padre: username
            })
        };
        const children = await fetch('/children', requestOptions)
            .then(res => res.json())

        return children;

    }


    const getChildrenData = async (hijo) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const children = await fetch('/childrenData?' + new URLSearchParams({
            nombre_hijo: hijo,
            padre: username
        }), requestOptions)
            .then(res => res.json())

        return children;

    }

    const deleteChildrenData = async (tipo, childName) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                tipo: tipo,
                nombre_hijo: childName,
                padre: username
            })
        };
        const childrenData = await fetch('/childrenData', requestOptions)
            .then(res => res.json())

        return childrenData;

    }

    const createChildrenData = async (tipo, descripcion, childName) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                descripcion: descripcion,
                tipo: tipo,
                nombre_hijo: childName,
                padre: username
            })
        };
        const childrenData = await fetch('/childrenData', requestOptions)
            .then(res => res.json())

        return childrenData;

    }


    return (
        <React.Fragment>
            <Paper className={classes.root}>

                <Tabs
                    value={children[currentHijo].nombre}
                    onChange={handleTabChange}
                    centered
                    indicatorColor="primary"
                >
                    {children.map((child, index) => (
                        <Tab
                            label={child.nombre}
                            key={index}
                            value={child.nombre}
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
                                    name="nombre"
                                    variant="outlined"
                                    fullWidth
                                    id="firstName"
                                    label="Nombre"
                                    autoFocus
                                    value={children[currentHijo].nombre}
                                    onChange={(e) => handleInputChange(e)}
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
                                        name="nacimiento"
                                        format="MM/dd/yyyy"
                                        id="fecha"
                                        value={children[currentHijo].nacimiento}
                                        InputAdornmentProps={{position: "end"}}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                </Grid>
                            </MuiPickersUtilsProvider>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    select
                                    fullWidth
                                    id="grupo"
                                    label="Grupo Sanguineo"
                                    name="grupo_sanguineo"
                                    value={children[currentHijo].grupo_sanguineo}
                                    onChange={(e) => handleInputChange(e)}
                                >
                                    {gruposSanguineos.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {(alergias[currentNombre] !== undefined
                                ? alergias[currentNombre] : ['']).map((alergia, index) => (
                                <Grid item key={index} xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="alergias"
                                        label="Alergias"
                                        id="alergias"
                                        autoComplete="off"
                                        value={alergia}
                                        onChange={e => handleEditAlergia(e.target.value, index)}
                                        InputProps={{
                                            endAdornment:
                                                <div style={{display: "flex"}}>
                                                    {alergia !== '' && alergias[currentNombre].length > 1
                                                    && <Tooltip title="Eliminar">
                                                        <IconButton aria-label="delete"
                                                                    onClick={() => handleRemoveAlergia(index)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>}
                                                    {alergia !== '' && alergias[currentNombre].length === index + 1 &&
                                                    <Tooltip title="Agregar">
                                                        <IconButton aria-label="add"
                                                                    onClick={() => handleAddAlergia()}>
                                                            <AddIcon/>
                                                        </IconButton>
                                                    </Tooltip>}
                                                </div>
                                        }}
                                    />
                                </Grid>
                            ))}
                            {(enfermedades[currentNombre] !== undefined
                                ? enfermedades[currentNombre] : ['']).map((enfermedad, index) => (
                                <Grid item key={index} xs={12}>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        name="enfermedades"
                                        label="Enfermedades Crónicas"
                                        id="enfermedades"
                                        autoComplete="off"
                                        value={enfermedad}
                                        onChange={e => handleEditEnfermedad(e.target.value, index)}
                                        InputProps={{
                                            endAdornment:
                                                <div style={{display: "flex"}}>
                                                    {enfermedad !== '' && enfermedades[currentNombre].length > 1
                                                    && <Tooltip title="Eliminar">
                                                        <IconButton aria-label="delete"
                                                                    onClick={() => handleRemoveEnfermedad(index)}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                    </Tooltip>}
                                                    {enfermedad !== ''
                                                    && enfermedades[currentNombre].length === index + 1 &&
                                                    <Tooltip title="Agregar">
                                                        <IconButton aria-label="add"
                                                                    onClick={() => handleAddEnfermedad('')}>
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
                {children.length > 1 &&
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
                <DialogTitle id="alert-dialog-title">{"¿Eliminar hijo " + currentNombre + " ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Se perderan los datos del hijo {currentNombre}
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
            <Snackbar open={openSave} autoHideDuration={3000} onClose={handleCloseSave}>
                <Alert onClose={handleCloseSave} severity="success" sx={{width: '100%'}}>
                    Datos guardados correctamente!
                </Alert>
            </Snackbar>
        </React.Fragment>
    );
}