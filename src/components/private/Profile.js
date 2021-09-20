import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {Dialog, DialogActions, DialogTitle} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(16),
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
    numberField: {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        }
    },
    title: {
        marginBottom: theme.spacing(4),
    },
}));

export default function Profile(props) {

    const classes = useStyles();
    const [openSave, setOpenSave] = useState(false);

    const initialState = {
        nombre: "Emanuel",
        apellido: "Brea",
        email: "brea.emanuel@gmail.com",
        dni: 40127028,
        telefono: 1234456789,
        password: 'password'
    };

    const [estado, setEstado] = useState(initialState);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEstado({...estado, [name]: value});
    };

    const handleClickOpenSave = () => {
        setOpenSave(true);
    };

    const handleCloseSave = () => {
        setOpenSave(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" className={classes.title}>
                    Mi Perfil
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
                                onChange={e => handleInputChange(e)}
                                value={estado.nombre}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="apellido"
                                autoComplete="off"
                                onChange={e => handleInputChange(e)}
                                value={estado.apellido}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                onChange={e => handleInputChange(e)}
                                value={estado.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.numberField}
                                       variant="outlined"
                                       fullWidth
                                       name="dni"
                                       label="DNI"
                                       id="dni"
                                       autoComplete="off"
                                       type="number"
                                       onChange={e => handleInputChange(e)}
                                       value={estado.dni}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.numberField}
                                       variant="outlined"
                                       fullWidth
                                       name="telefono"
                                       label="Telefono"
                                       id="telefono"
                                       autoComplete="off"
                                       type="number"
                                       onChange={e => handleInputChange(e)}
                                       value={estado.telefono}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="off"
                                onChange={e => handleInputChange(e)}
                                value={estado.password}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleClickOpenSave}
                    >
                        Guardar
                    </Button>
                </form>
            </div>
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
        </Container>
    );
}