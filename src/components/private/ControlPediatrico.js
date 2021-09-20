import React, {useState} from 'react';
import {DataGrid} from '@mui/x-data-grid';
import {lighten, makeStyles} from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {Fab} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const columns = [
    {field: 'id', headerName: 'ID', width: 90},
    {
        field: 'fecha',
        headerName: 'Fecha',
        width: 120,
        editable: true,
        type: 'date',
    },
    {
        field: 'peso',
        headerName: 'Peso',
        type: 'number',
        width: 110,
        editable: true,
    },
    {
        field: 'altura',
        headerName: 'Altura',
        type: 'number',
        width: 130,
        editable: true,
    },
    {
        field: 'diametro',
        headerName: 'Diametro de la cabeza',
        type: 'number',
        width: 150,
        editable: true,
    },
    {
        field: 'medicamento',
        headerName: 'Medicamentos',
        width: 180,
        editable: true,
    },
    {
        field: 'dosis',
        headerName: 'Dosis',
        type: 'number',
        width: 120,
        editable: true,
    },
    {
        field: 'periodo',
        headerName: 'Periodo',
        width: 130,
        editable: true,
    },
    {
        field: 'estudios',
        headerName: 'Estudios medicos a realizar',
        width: 200,
        editable: true,
    },
    {
        field: 'resultados',
        headerName: 'Resultados',
        width: 150,
        editable: true,
    },
    {
        field: 'observaciones',
        headerName: 'Observaciones',
        description: 'This column  is not sortable.',
        width: 340,
        editable: true,
    },
    {
        field: 'nombre',
        headerName: 'Hijo',
        width: 110,
        editable: true,
    },
];

const initialRows = [
    {
        id: 1,
        fecha: '2020-02-02',
        peso: 6,
        altura: 70,
        diametro: 30,
        observaciones: 'todo bien',
        medicamento: 'ibupirac',
        dosis: 2,
        periodo: '2 meses',
        estudios: 'oculista',
        resultados: 'todo en orden',
        nombre: 'Juan'
    },
    {
        id: 2,
        fecha: '2020-03-02',
        peso: 7,
        altura: 71,
        diametro: 31,
        observaciones: 'todo bien',
        medicamento: 'ibupirac',
        dosis: 2,
        periodo: '5 meses',
        estudios: 'oculista',
        resultados: 'todo en orden',
        nombre: 'Juan'
    },
    {
        id: 3,
        fecha: '2020-04-02',
        peso: 8,
        altura: 72,
        diametro: 32,
        observaciones: 'todo bien',
        medicamento: 'ibupirac',
        dosis: 3,
        periodo: '3 meses',
        estudios: 'dentista',
        resultados: 'todo en orden',
        nombre: 'Pepe'
    },
    {
        id: 4,
        fecha: '2020-05-02',
        peso: 9,
        altura: 73,
        diametro: 33,
        observaciones: 'todo bien',
        medicamento: 'ibupirac',
        dosis: 2,
        periodo: '2 meses',
        estudios: 'oculista',
        resultados: 'todo en orden',
        nombre: 'Juan'
    },
    {
        id: 5,
        fecha: '2020-06-02',
        peso: 10,
        altura: 74,
        diametro: 34,
        observaciones: 'todo bien',
        medicamento: 'ibupirac',
        dosis: 6,
        periodo: '4 meses',
        estudios: 'oculista',
        resultados: 'todo en orden',
        nombre: 'Juan'
    },
    {
        id: 6,
        fecha: '2020-07-02',
        peso: 11,
        altura: 75,
        diametro: 35,
        observaciones: 'todo bien',
        medicamento: 'ibupirac',
        dosis: 2,
        periodo: '6 meses',
        estudios: 'dentista',
        resultados: 'todo en orden',
        nombre: 'Pepe'
    },
    {
        id: 7,
        fecha: '2020-08-02',
        peso: 12,
        altura: 76,
        diametro: 36,
        observaciones: 'todo bien',
        medicamento: 'ibupirac',
        dosis: 2,
        periodo: '7 meses',
        estudios: 'oculista',
        resultados: 'todo en orden',
        nombre: 'Juan'
    },
    {
        id: 8,
        fecha: '2020-09-02',
        peso: 13,
        altura: 77,
        diametro: 37,
        observaciones: 'todo bien',
        medicamento: 'ibupirac',
        dosis: 3,
        periodo: '9 meses',
        estudios: 'dentista',
        resultados: 'todo en orden',
        nombre: 'Juan'
    },
];

const useStyles = makeStyles((theme) => ({
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
    }
}));

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ControlPediatrico() {
    const classes = useStyles();
    const [selected, setSelected] = useState([]);
    const [rows, setRows] = useState(initialRows);
    const [open, setOpen] = useState(false);

    const handleDeleteRows = () => {
        const selectedIDs = new Set(selected);
        const selectedRowData = rows.filter((row) =>
            !selectedIDs.has(row.id)
        );
        setRows(selectedRowData);
    };

    const handleAddRow = () => {
        const maxId = Math.max(...rows.map(user => user.id))
        const newRow = {
            id: maxId, fecha: '2020-02-02', peso: 0, altura: 0, diametro: 0, observaciones: '',
            medicamento: '', dosis: 0, periodo: '',
            estudios: '', resultados: '', nombre: 'Juan'
        };
        setRows([...rows, newRow]);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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
                        Control Pediatrico
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
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(ids) => setSelected(ids)}
            />
            <div className={classes.floatingIcon}>
                <Fab color="primary" aria-label="add" title="Agregar control" onClick={handleAddRow}>
                    <AddIcon/>
                </Fab>
                <Fab style={{backgroundColor: "green", color: "white"}} aria-label="save" title="Guardar"
                     onClick={handleClickOpen}>
                    <SaveIcon/>
                </Fab>
            </div>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
                    Datos guardados correctamente!
                </Alert>
            </Snackbar>
        </div>

    );
}
