import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
import useToken from "../routes/useToken";

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
    },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function Login() {
    const classes = useStyles();
    const history = useHistory();
    const setToken = useToken()['setToken'];

    const initialState = {
        email: '',
        password: '',
        missingValues: false,
        failedLogin: false
    };

    const [estado, setEstado] = useState(initialState);

    const handleClickLogin = () => {
        if (estado.email === '' || estado.password === '') {
            setWarning('missingValues', true);
        } else {
            checkLogin().then(responseJson => {
                if (responseJson.success === 'true') {
                    setToken(responseJson.data);
                    history.push('/home');
                } else {
                    setWarning('failedLogin', true);
                }
            });
        }
    };

    const setWarning = (name, value) => {
        setEstado({...estado, [name]: value});
    }

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEstado({...estado, [name]: value});
    };


    const checkLogin = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email: estado.email, password: estado.password})
        };
        const loginStatus = await fetch('/login', requestOptions)
            .then(res => res.json())

        return loginStatus;

    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Ingresar
                </Typography>
                <form className={classes.form} noValidate>
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
                        value={estado.email}
                        onChange={handleInputChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={estado.password}
                        onChange={handleInputChange}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary"/>}
                        label="Recordarme"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleClickLogin}
                    >
                        Ingresar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/reset" variant="body2">
                                ¿Olvistate la contraseña?
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
            <Snackbar open={estado.failedLogin} autoHideDuration={3000}
                      onClose={() => setWarning('failedLogin', false)}>
                <Alert onClose={() => setWarning('failedLogin', false)}
                       severity="error" sx={{width: '100%'}}>
                    Datos incorrectos
                </Alert>
            </Snackbar>
            <Snackbar open={estado.missingValues} autoHideDuration={3000}
                      onClose={() => setWarning('missingValues', false)}>
                <Alert onClose={() => setWarning('missingValues', false)}
                       severity="warning" sx={{width: '100%'}}>
                    Datos incompletos
                </Alert>
            </Snackbar>
        </Container>
    );
}