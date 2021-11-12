import React, {useEffect, useState} from "react";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {Card, MenuItem} from "@material-ui/core";
import ModalImage from "react-modal-image";
import Box from "@material-ui/core/Box";
import PercentilesPesoF from "../../images/percentiles-peso-nina.jpg.webp";
import PercentilesPesoM from "../../images/percentiles-peso-nino.jpg.webp";
import PercentilesAltF from "../../images/percentiles-estatura-nina.jpg.webp";
import PercentilesAltM from "../../images/percentiles-estatura-nino.jpg.webp";
import useToken from "../routes/useToken";
import {DataGrid} from "@mui/x-data-grid";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    title: {
        marginBottom: theme.spacing(2),
        flex: '1 1 100%',
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
    heroContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
        marginLeft: theme.spacing(5),
    },
}));



const sexos = [
    'femenino', 'masculino'
];

export default function Percentiles(props) {
    const classes = useStyles();

    const initialState = {
        edad: 11,
        peso: 2.3,
        altura: 44.8,
        sexo: sexos[0],
    };

    const [estado, setEstado] = useState(initialState);
    const token = useToken()['token'];
    const username = props.username;
    const [children, setChildren] = useState([]);
    const [rows, setRows] = useState([]);
    const [currentHijo, setCurrentHijo] = useState('');
    const [currentSexo, setCurrentSexo] = useState('masculino')

    const columns = [
        {field: 'id', headerName: 'ID', flex:1,},
        {
            field: 'fecha',
            headerName: 'Fecha',
            flex:1,
            type: 'date',
        },
        {
            field: 'peso',
            headerName: 'Peso',
            type: 'number',
            flex:1,
        },
        {
            field: 'altura',
            headerName: 'Altura',
            type: 'number',
            flex:1,
        },
        {
            field: 'nombre_hijo',
            headerName: 'Hijo',
            flex:1,
            type: 'singleSelect',
            valueOptions: children,
        },
    ];

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setEstado({...estado, [name]: value});
    };

    const convertDate = (controles) => {
        controles.forEach((row) => {
            let fecha = new Date(row.fecha);
            row.fecha = new Date(fecha.toDateString());
        });
    }

    useEffect(() => {
        getChildren().then(result => {
            if (result.success === 'true') {
                const children = result.data.result;
                let childrenNames = []
                for( let i = 0 ; i < children.length ; i++){
                    childrenNames.push(children[i].nombre)
                }
                setChildren(childrenNames);
                setCurrentHijo(childrenNames[0]);
            }

        })
        getControles().then(items => {
            if (items.success === 'true') {
                convertDate(items.data.result);
                getSubset(items.data.result);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

    const getSubset = (result) =>{
        let rows = []
        for( let i = 0 ; i< result.length ; i++){
            const row = (({ fecha, peso, altura,nombre_hijo }) => ({ fecha, peso, altura,nombre_hijo  }))(result[i])
            row['id'] = i
            rows.push(row)
        }
        setRows(rows)
    }

    const getControles = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const controles = await fetch('/control?' + new URLSearchParams({
            padre: username
        }), requestOptions)
            .then(res => res.json())

        return controles;

    }

    return (
        <Container component="main" maxWidth={'xl'}>
            <CssBaseline/>
            <div className={classes.paper}>
                <Typography component="div" variant="h6" className={classes.title}>
                    Consulta de Percentiles
                </Typography>
                <Box display="flex" >
                    <Box style={{width:"40%"}}>
                        <DataGrid
                            style={{backgroundColor: "#f2f6f9"}}
                            autoHeight
                            rows={rows.filter(row => row.nombre_hijo === currentHijo)}
                            columns={columns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                    </Box>
                    <Box className={classes.heroContent} style={{width:"10%"}}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                select
                                id="hijos"
                                label="Seleccione un hijo"
                                name="hijos"
                                value={currentHijo}
                                onChange={(e) => setCurrentHijo(e.target.value)}
                                fullWidth
                            >
                                {children.map((child) => (
                                    <MenuItem key={child} value={child}>
                                        {child}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Box>
                    <Box className={classes.heroContent} style={{width:"10%"}}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                select
                                id="sexo"
                                label="Seleccione un sexo"
                                name="sexo"
                                value={currentSexo}
                                onChange={(e) => setCurrentSexo(e.target.value)}
                                fullWidth
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
                                {sexos.map((sexo) => (
                                    <MenuItem key={sexo} value={sexo}>
                                        {sexo}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Box>

                </Box>
            </div>
            <Container maxWidth="xl">
                <Box display="flex" width={1} m={1} p={1}>
                    <Box p={1} style={{width: "50%"}}>
                        <Card className={classes.cardFuncionalidad}>
                            <ModalImage
                                small={currentSexo === sexos[0] ? PercentilesAltF : PercentilesAltM}
                                large={currentSexo === sexos[0] ? PercentilesAltF : PercentilesAltM}
                                alt="Tabla de Percentiles Altura"
                            />
                        </Card>
                    </Box>
                    <Box p={1} style={{width: "50%"}}>
                        <Card className={classes.cardFuncionalidad}>
                            <ModalImage
                                small={currentSexo === sexos[0] ? PercentilesPesoF : PercentilesPesoM}
                                large={currentSexo === sexos[0] ? PercentilesPesoF : PercentilesPesoM}
                                alt="Tabla de Percentiles Peso"
                            />
                        </Card>
                    </Box>
                </Box>
            </Container>
        </Container>
    );
}