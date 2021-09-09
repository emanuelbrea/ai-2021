import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import {MenuItem, Paper, Tab, Tabs} from "@material-ui/core";

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
    root: {
        flexGrow: 1,
    },
    tabs: {
        backgroundColor: 'white',
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
    const [value, setValue] = React.useState(1);

    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleChange = (event) => {
        setgrupoSanguineo(event.target.value);
    };


    return (
        <React.Fragment>
            <Paper className={classes.root}>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                    centered
                    indicatorColor="primary"
                >
                    <Tab label="Juan"/>
                    <Tab label="Florencia"/>
                    <Tab label="Pedro"/>
                </Tabs>
            </Paper>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
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
                                    value="Juan"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    id="date"
                                    fullWidth
                                    label="Birthday"
                                    type="date"
                                    value="2017-05-24"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    select
                                    fullWidth
                                    id="email"
                                    label="Grupo Sanguineo"
                                    name="email"
                                    value={grupoSanguineo}
                                    onChange={handleChange}
                                >
                                    {gruposSanguineos.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="alergias"
                                    label="Alergias"
                                    id="alergias"
                                    autoComplete="off"
                                    value="Polen"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="enfermedades"
                                    label="Enfermedades Crónicas"
                                    id="enfermedades"
                                    autoComplete="off"
                                    value="Diabetes"
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
                            Agregar
                        </Button>
                    </form>
                </div>
            </Container>
        </React.Fragment>
    );
}