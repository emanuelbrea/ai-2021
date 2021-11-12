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
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {useHistory} from "react-router-dom";
import validator from "validator";

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
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }

}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [dni, setDni] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [status, setStatus] = useState("error");
    const [codigo, setCodigo] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [reseted, setReseted] = useState(false);
    const [enviado, setEnviado] = useState(false);
    const history = useHistory();


    const handleSendEmail = async () => {
        if (dni === '' || email === '') {
            setStatus("warning")
            setErrorMessage('Datos incompletos')
        } else {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    dni: dni,
                    email: email
                })
            };
            fetch('/forgotPassword', requestOptions)
                .then(res => res.json()).then(responseJson => {
                if (responseJson.success === 'true') {
                    setEnviado(true);
                    setStatus("success")
                } else {
                    setStatus("error")
                }
                setErrorMessage(responseJson.message)
            })
        }
    }

    const handleResetPassword = async () => {
        if (password === '' || password2 === '' || codigo === '') {
            setStatus("warning")
            setErrorMessage('Datos incompletos')
        } else if (password !== password2) {
            setStatus("warning")
            setErrorMessage('Las contraseñas no coinciden')
        } else if (!validator.isStrongPassword(
            password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0})) {
            setErrorMessage('La contraseña es debil. Debe incluir minimo 8 caracteres y una mayuscula.');
        } else {
            const requestOptions = {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    codigo: parseInt(codigo),
                    email: email,
                    password: password
                })
            };
            fetch('/resetPassword', requestOptions)
                .then(res => res.json()).then(responseJson => {
                if (responseJson.success === 'true') {
                    setReseted(true);
                }
                setErrorMessage(responseJson.message)
            })
        }
    }

    const handleSubmit = async () => {
        if (!enviado) {
            await handleSendEmail();
        } else {
            await handleResetPassword();
        }
    }

    const handleAfterReset = () => {
        history.push('/login');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Recupero de contraseña
                </Typography>
                <form className={classes.form} noValidate>
                    {enviado &&
                    <div>
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            margin="normal"
                            name="codigo"
                            label="Codigo de seguridad"
                            id="codigo"
                            autoComplete="off"
                            value={codigo}
                            type="number"
                            onChange={(e) => setCodigo(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            margin="normal"
                            name="password"
                            label="Contraseña"
                            id="password"
                            type='password'
                            autoComplete="off"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            margin="normal"
                            name="password2"
                            label="Repetir Contraseña"
                            id="password2"
                            type='password'
                            autoComplete="off"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />
                    </div>

                    }
                    {!enviado &&
                    <div>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            required
                            fullWidth
                            margin="normal"
                            name="dni"
                            label="DNI"
                            id="dni"
                            autoComplete="off"
                            value={dni}
                            type="number"
                            onChange={(e) => setDni(e.target.value)}
                        />
                        <Typography component="body3">
                            Enviaremos un mail con un codigo para resetear la contraseña
                        </Typography>
                    </div>
                    }


                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        {enviado && 'Cambiar contraseña'
                        }
                        {
                            !enviado && 'Enviar'
                        }

                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/login" variant="body2">
                                ¿Ya tienes usuario? Ingresar
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"¿No tienes cuenta? Registrate!"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright/>
            </Box>
            <Snackbar open={errorMessage !== ''} autoHideDuration={3000}
                      onClose={() => setErrorMessage('')}>
                <Alert onClose={() => setErrorMessage('')}
                       severity={status} sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
            <Snackbar open={reseted} autoHideDuration={3000}
                      onClose={handleAfterReset}>
                <Alert onClose={handleAfterReset}
                       severity="success" sx={{width: '100%'}}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}