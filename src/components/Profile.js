import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
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
    }
}));

export default function Profile(props) {

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Mi Perfil
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
                                value="Emanuel"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="lastName"
                                label="Apellido"
                                name="lastName"
                                autoComplete="off"
                                value="Brea"
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
                                value="brea.emanuel@gmail.com"
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
                                       value="40127028"
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
                                       value="123456789"
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
                                value="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
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
    );
}