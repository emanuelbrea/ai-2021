import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import useToken from "../routes/useToken";
import validator from "validator";

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

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Profile(props) {

    const classes = useStyles();
    const [password, setPassword] = useState('password');
    const [newPassword, setNewPassword] = useState('');
    const [cambioPassword, setCambioPassword] = useState(false);
    const token = useToken()['token'];
    const username = props.username;
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState("error");

    const initialState = {
        nombre: "",
        apellido: "",
        email: "",
        dni: "",
        telefono: "",
    };

    const [estado, setEstado] = useState(initialState);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEstado({...estado, [name]: value});
    };

    useEffect(() => {
        getProfile().then(items => {
            if (items.success === 'true') {
                setEstado(items.data);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getProfile = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const profile = await fetch('/user?' + new URLSearchParams({
            email: username
        }), requestOptions).then(res => res.json())

        return profile;

    }

    const editProfile = async (dni, telefono, email, nombre, apellido) => {
        const requestOptions = {
            method: 'PATCH',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                dni: dni,
                telefono: telefono,
                email: email,
                nombre: nombre,
                apellido: apellido,
            })
        };
        const result = await fetch('/user', requestOptions)
            .then(res => res.json())

        return result;

    }

    const editPassword = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: username,
                password: newPassword,
            })
        };
        const result = await fetch('/updatePassword', requestOptions)
            .then(res => res.json())

        return result;

    }

    const handleSaveProfile = () => {
        if (cambioPassword && password !== newPassword) {
            setStatus("warning")
            setErrorMessage('Las contraseñas no coinciden')
        } else if (cambioPassword && !validator.isStrongPassword(
            newPassword, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0})) {
            setErrorMessage('La contraseña es debil. Debe incluir minimo 8 caracteres y una mayuscula.');
        } else {
            if (cambioPassword) {
                editPassword(estado.email, newPassword).then(result => {
                    if (result.success === 'true') {
                        setStatus("success")
                    } else {
                        setStatus("error")
                    }
                    setErrorMessage(result.message)
                })
            }

            editProfile(estado.dni, estado.telefono, estado.email, estado.nombre, estado.apellido).then(result => {
                if (result.success === 'true') {
                    setStatus("success")
                } else {
                    setStatus("error")
                }
                setErrorMessage(result.message)
            })

        }
    }

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
                                disabled={true}
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
                                onChange={e => {
                                    setCambioPassword(true);
                                    setPassword(e.target.value);
                                }
                                }
                                value={password}
                            />
                        </Grid>
                        {
                            cambioPassword &&
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="newPassword"
                                    label="Confirmar Contraseña"
                                    type="password"
                                    id="newPassword"
                                    autoComplete="off"
                                    onChange={e => setNewPassword(e.target.value)}
                                    value={newPassword}
                                />
                            </Grid>
                        }
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSaveProfile}
                    >
                        Guardar
                    </Button>
                </form>
            </div>
            <Snackbar open={errorMessage !== ''} autoHideDuration={3000}
                      onClose={() => setErrorMessage('')}>
                <Alert onClose={() => setErrorMessage('')}
                       severity={status} sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>

        </Container>
    );
}