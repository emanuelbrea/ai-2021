import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import {useHistory} from "react-router-dom";
import validator from 'validator'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="http://localhost:3000/">
                Papis Felices
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    numberField: {
        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        }
    },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Signup() {
    const classes = useStyles();
    const history = useHistory();

    const initialState = {
        nombre: '',
        apellido: '',
        email: '',
        dni: '',
        telefono: '',
        password: ''
    };

    const [estado, setEstado] = useState(initialState);
    const [successSignUp, setSuccessSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEstado({...estado, [name]: value});
    };

    const handleClickSignUp = () => {
        if (Object.values(estado).some((e) => e === '')) {
            setErrorMessage('Datos incompletos');
        } else if (!validator.isStrongPassword(
            estado.password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0})) {
            setErrorMessage('La contraseña es debil. Debe incluir minimo 8 caracteres y una mayuscula.');
        } else {
            checkSignup().then(responseJson => {
                if (responseJson.success === 'true') {
                    setSuccessSignUp(true);
                } else {
                    setErrorMessage(responseJson.message);
                }
            });
        }
    };

    const handleAfterSignUp = () => {
        history.push('/login');
    }

    const checkSignup = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: estado.email, password: estado.password, nombre: estado.nombre, apellido: estado.apellido,
                dni: estado.dni, telefono: estado.telefono
            })
        };
        const signUpStatus = await fetch('/signup', requestOptions)
            .then(res => res.json())

        return signUpStatus;

    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registro
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fname"
                                name="nombre"
                                variant="outlined"
                                required
                                fullWidth
                                id="nombre"
                                label="Nombre"
                                autoFocus
                                value={estado.nombre}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="apellido"
                                label="Apellido"
                                name="apellido"
                                autoComplete="lname"
                                value={estado.apellido}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                value={estado.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.numberField}
                                       variant="outlined"
                                       required
                                       fullWidth
                                       name="dni"
                                       label="DNI"
                                       id="dni"
                                       autoComplete="off"
                                       type="number"
                                       value={estado.dni}
                                       onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField className={classes.numberField}
                                       variant="outlined"
                                       required
                                       fullWidth
                                       name="telefono"
                                       label="Telefono"
                                       id="telefono"
                                       autoComplete="off"
                                       type="number"
                                       value={estado.telefono}
                                       onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type='password'
                                id="password"
                                autoComplete="current-password"
                                value={estado.password}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleClickSignUp}
                    >
                        Registrarse
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item xs>
                            <Link href="/login" variant="body2">
                                ¿Ya tienes usuario? Ingresar
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
            <Snackbar open={errorMessage !== ''} autoHideDuration={3000} onClose={() => setErrorMessage('')}>
                <Alert onClose={() => setErrorMessage('')} severity="warning" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={successSignUp} autoHideDuration={3000} onClose={handleAfterSignUp}>
                <Alert onClose={handleAfterSignUp} severity="success" sx={{width: '100%'}}>
                    Usuario registrado correctamente!
                </Alert>
            </Snackbar>
        </Container>
    );
}