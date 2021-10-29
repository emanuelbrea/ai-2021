import React, {useEffect, useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {Card, Fab} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CalendarioVacunacion from "../../images/CalendarioVacunacion.jpg";
import Box from "@material-ui/core/Box";
import ModalImage from "react-modal-image";
import SaveIcon from "@material-ui/icons/Save";
import MuiAlert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import useToken from "../routes/useToken";


const columns = [
    {field: 'id', headerName: 'ID', width: 90},
    {
        field: 'fecha',
        headerName: 'Fecha',
        width: 170,
        editable: true,
        type: 'date',
    },
    {
        field: 'vacuna',
        headerName: 'Vacuna',
        width: 180,
        editable: true,
        flex: 1
    },
    {
        field: 'lugar',
        headerName: 'Lugar de aplicacion',
        width: 300,
        editable: true,
    },
    {
        field: 'nombre_hijo',
        headerName: 'Hijo',
        type: 'singleSelect',
        valueOptions: ['juan', 'pepe'],
        width: 160,
        editable: true,
    },
];


const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    floatingIcon: {
        '& > *': {
            margin: theme.spacing(1),
        },
        position: 'fixed',
        bottom: theme.spacing(6),
        right: theme.spacing(6),
    },
    cardFuncionalidad: {
        marginTop: theme.spacing(2),
        width: '55%',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justify: 'center',
        padding: theme.spacing(1),
        backgroundColor: "#f2f6f9"
    },
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Vacunas() {
    const classes = useToolbarStyles();
    const [selected, setSelected] = useState([]);
    const [rows, setRows] = useState([]);
    const [deletedRows, setDeletedRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [missing, setMissing] = useState(false);
    const {token, setToken} = useToken();

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseMissing = () => {
        setMissing(false);
    };

    const handleDeleteRows = () => {
        const selectedIDs = new Set(selected);
        const selectedRowData = rows.filter((row) =>
            !selectedIDs.has(row.id)
        );
        const deleteRows = rows.filter((row) =>
            selectedIDs.has(row.id)
        );
        setDeletedRows([...deletedRows, ...deleteRows]);
        setRows(selectedRowData);
    };

    const handleAddRow = () => {
        const maxId = rows.length > 0 ? Math.max(...rows.map(user => user.id)) : 0;
        var today = new Date();
        const newRow = {
            id: maxId + 1, fecha: new Date(today.toDateString()),
            vacuna: '', lugar: '', nombre_hijo: 'pepe', new: true
        };
        setRows([...rows, newRow]);
    }


    const handleCellClick = (param, event) => {
        let copyRows = rows;
        const id = param.id;
        const field = param.field;
        copyRows.find(a => a.id === id)[field] = param.value;
        setRows(copyRows);
    };

    useEffect(() => {
        getVacunas().then(items => {
            if (items.success === 'true') {
                addIds(items.data.result);
                convertDate(items.data.result);
                addOldValues(items.data.result);
                setRows(items.data.result);
            }
        })
    }, [])

    const convertDate = (vacunas) => {
        vacunas.forEach((row) => {
            let fecha = new Date(row.fecha);
            row.fecha = new Date(fecha.toDateString());
        });
    }

    const addIds = (vacunas) => {
        for (let i = 1; i <= vacunas.length; i++) {
            vacunas[i - 1].id = i;
        }
    }

    const addOldValues = (vacunas) => {
        vacunas.forEach((row) => {
            row.fecha_old = row.fecha;
            row.vacuna_old = row.vacuna;
            row.lugar_old = row.lugar;
            row.nombre_hijo_old = row.nombre_hijo;
        });
    }

    const handleSaveVacunas = () => {
        if (!validateFields()) {
            setMissing(true);
        } else {
            rows.forEach((row) => {
                if (row.new !== undefined && row.new === true) {
                    createVacuna(
                        row.fecha, row.vacuna, row.lugar, row.nombre_hijo, "brea.emanuel@gmail.com"
                    );
                    row.fecha_old = row.fecha;
                    row.vacuna_old = row.vacuna;
                    row.lugar_old = row.lugar;
                    row.nombre_hijo_old = row.nombre_hijo;
                    row.new = false;
                } else if (row.fecha !== row.fecha_old || row.vacuna !== row.vacuna_old
                    || row.nombre_hijo !== row.nombre_hijo_old) {
                    editVacuna(
                        row.fecha, row.vacuna, row.lugar,
                        row.fecha_old, row.vacuna_old, row.lugar_old,
                        row.nombre_hijo, row.nombre_hijo_old, "brea.emanuel@gmail.com"
                    )
                }
            });
            deletedRows.forEach((row) => {
                if (row.new === undefined || row.new === false) {
                    deleteVacuna(row.fecha, row.vacuna, row.nombre_hijo, "brea.emanuel@gmail.com")
                }
            });
            setDeletedRows([]);
            setOpen(true);
        }

    };

    const getVacunas = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        };
        const vacunas = await fetch('/vacuna?' + new URLSearchParams({
            padre: 'brea.emanuel@gmail.com'
        }), requestOptions).then(res => res.json())

        return vacunas;

    }

    const editVacuna = async (fecha, vacuna, lugar, fecha_old,
                              vacuna_old, lugar_old, nombre_hijo, nombre_hijo_old, padre) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                fecha: fecha,
                vacuna: vacuna,
                lugar: lugar,
                fecha_old: fecha_old,
                vacuna_old: vacuna_old,
                lugar_old: lugar_old,
                nombre_hijo: nombre_hijo,
                nombre_hijo_old: nombre_hijo_old,
                padre: padre
            })
        };
        const vacunas = await fetch('/vacuna', requestOptions)
            .then(res => res.json())

        return vacunas;

    }

    const deleteVacuna = async (fecha, vacuna, nombre_hijo, padre) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                fecha: fecha,
                vacuna: vacuna,
                nombre_hijo: nombre_hijo,
                padre: "brea.emanuel@gmail.com"
            })
        };
        const vacunas = await fetch('/vacuna', requestOptions)
            .then(res => res.json())

        return vacunas;

    }

    const createVacuna = async (fecha, vacuna, lugar, nombre_hijo, padre) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                fecha: fecha,
                vacuna: vacuna,
                lugar: lugar,
                nombre_hijo: nombre_hijo,
                padre: "brea.emanuel@gmail.com"
            })
        };
        const vacunas = await fetch('/vacuna', requestOptions)
            .then(res => res.json())

        return vacunas;

    }

    const validateFields = () => {
        const emptyFields = rows.some((row) =>
            row.nombre_hijo.length === 0 || row.vacuna.length === 0 || row.lugar.length === 0 || row.fecha.length === 0
        );

        const duplicatedFields = rows.filter((row, index, self) =>
                index === self.findIndex((t) => (
                    t.vacuna === row.vacuna && t.lugar === row.lugar && t.nombre_hijo === row.nombre_hijo
                ))
        )
        return !emptyFields && (duplicatedFields.length === rows.length);
    }


    return (
        <div style={{height: 400, width: '100%', padding: '15px'}}>
            <Toolbar
                className={clsx(classes.root, {
                    [classes.highlight]: selected.length > 0,
                })}
            >
                {selected.length > 0 ? (
                    <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                        {selected.length} fila(s) seleccionada(s)
                    </Typography>
                ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Vacunas
                    </Typography>
                )}

                {selected.length > 0 &&
                <Tooltip title="Delete">
                    <IconButton aria-label="delete" onClick={handleDeleteRows}>
                        <DeleteIcon/>
                    </IconButton>
                </Tooltip>
                }
            </Toolbar>
            <DataGrid
                style={{backgroundColor: "#f2f6f9"}}
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(ids) => setSelected(ids)}
                onCellEditCommit={handleCellClick}
            />
            <div className={classes.floatingIcon}>
                <Fab color="primary" aria-label="add" title="Agregar vacuna" onClick={handleAddRow}>
                    <AddIcon/>
                </Fab>
                <Fab style={{backgroundColor: "green", color: "white"}} aria-label="save" title="Guardar"
                     onClick={handleSaveVacunas}>
                    <SaveIcon/>
                </Fab>
            </div>
            <Typography className={classes.title} variant="h6" id="tableTitle" component="div"
                        style={{marginTop: '10px'}}>
                Calendario de Vacunacion
            </Typography>
            <Box display="flex" justifyContent="center">
                <Card className={classes.cardFuncionalidad}>
                    <ModalImage
                        small={CalendarioVacunacion}
                        large={CalendarioVacunacion}
                        alt="Calendario vacunacion"
                    />
                </Card>
            </Box>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    Datos guardados correctamente!
                </Alert>
            </Snackbar>
            <Snackbar open={missing} autoHideDuration={3000} onClose={handleCloseMissing}>
                <Alert onClose={handleCloseMissing} severity="warning" sx={{width: '100%'}}>
                    Datos faltantes.
                </Alert>
            </Snackbar>

        </div>
    );
}
