import React, {useState} from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {Card, InputAdornment, MenuItem} from "@material-ui/core";
import ModalImage from "react-modal-image";
import Box from "@material-ui/core/Box";
import PercentilesPesoF from "../../images/percentiles-peso-nina.jpg.webp";
import PercentilesPesoM from "../../images/percentiles-peso-nino.jpg.webp";
import PercentilesAltF from "../../images/percentiles-estatura-nina.jpg.webp";
import PercentilesAltM from "../../images/percentiles-estatura-nino.jpg.webp";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
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
    },
    title: {
        marginBottom: theme.spacing(3),
    },
    cardFuncionalidad: {
        marginTop: theme.spacing(2),
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justify: 'center',
        padding: theme.spacing(1),
        backgroundColor: "#f2f6f9"
    },
}));

const sexos = [
    'femenino', 'masculino'
];

export default function Percentiles() {
    const classes = useStyles();

    const initialState = {
        edad: 11,
        peso: 2.3,
        altura: 44.8,
        sexo: sexos[0],
    };

    const [estado, setEstado] = useState(initialState);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEstado({...estado, [name]: value});
    };

    return (
        <Container component="main" maxWidth={'xl'}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="h1" variant="h5" className={classes.title}>
                    Consulta de Percentiles
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2} justifyContent="flex-start" direction="row" alignItems="center">
                        <Grid item>
                            <TextField
                                autoComplete="off"
                                name="edad"
                                variant="outlined"
                                fullWidth
                                id="edad"
                                label="Edad"
                                autoFocus
                                type="number"
                                onChange={e => handleInputChange(e)}
                                value={estado.edad}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">meses</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="peso"
                                label="Peso"
                                name="peso"
                                autoComplete="off"
                                type="number"
                                onChange={e => handleInputChange(e)}
                                value={estado.peso}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="altura"
                                label="Altura"
                                name="altura"
                                type="number"
                                onChange={e => handleInputChange(e)}
                                value={estado.altura}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                                }}
                            />
                        </Grid>
                        <Grid item xs={2}>
                            <TextField className={classes.numberField}
                                       variant="outlined"
                                       fullWidth
                                       name="sexo"
                                       label="Sexo"
                                       id="sexo"
                                       autoComplete="off"
                                       onChange={e => handleInputChange(e)}
                                       value={estado.sexo}
                                       select
                                       SelectProps={{
                                           MenuProps: {
                                               anchorOrigin: {
                                                   vertical: "bottom",
                                                   horizontal: "left"
                                               },
                                               getContentAnchorEl: null
                                           }
                                       }}
                            >
                                {sexos.map((option, index) => (
                                    <MenuItem key={index} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Consultar
                            </Button>
                        </Grid>
                    </Grid>
                </form>


            </div>
            <Container maxWidth="xl">
                <Box display="flex" width={1} m={1} p={1}>
                    <Box p={1} style={{width: "50%"}}>
                        <Card className={classes.cardFuncionalidad}>
                            <ModalImage
                                small={estado.sexo === sexos[0] ? PercentilesAltF : PercentilesAltM}
                                large={estado.sexo === sexos[0] ? PercentilesAltF : PercentilesAltM}
                                alt="Tabla de Percentiles Altura"
                            />
                        </Card>
                    </Box>
                    <Box p={1} style={{width: "50%"}}>
                        <Card className={classes.cardFuncionalidad}>
                            <ModalImage
                                small={estado.sexo === sexos[0] ? PercentilesPesoF : PercentilesPesoM}
                                large={estado.sexo === sexos[0] ? PercentilesPesoF : PercentilesPesoM}
                                alt="Tabla de Percentiles Peso"
                            />
                        </Card>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}