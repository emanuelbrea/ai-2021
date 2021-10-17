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
        type: 'singleSelect',
        valueOptions: ['Juan', 'Pepe'],
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
        estudios: 'pediatra',
        resultados: 'todo en orden',
        nombre: 'Juan'
    }
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
            id: maxId + 1, fecha: '2020-02-02', peso: 0, altura: 0, diametro: 0, observaciones: '',
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

    const getControles = async () => {
        const controles = await fetch('/control?' + +new URLSearchParams({
            padre: 'brea.emanuel@gmail.com'
        }))
            .then(res => res.json())

        return controles;

    }

    const editControl = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fecha: "2020/05/02",
                peso: 12,
                altura: 12,
                diametro: 13,
                observaciones: "covid",
                medicamentos: "covid",
                estudios: "covid",
                resultados: "covid",
                nombre_hijo: "pepe",
                fecha_old: "2020/05/02",
                medicamentos_old: "covid",
                estudios_old: "covid",
                resultados_old: "covid",
                nombre_hijo_old: "pepe",
                padre: "brea.emanuel@gmail.com"
            })
        };
        const control = await fetch('/control', requestOptions)
            .then(res => res.json())

        return control;

    }

    const deleteControl = async () => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fecha: "2020/05/02",
                medicamentos: "covid3",
                estudios: "covid3",
                resultados: "covid3",
                nombre_hijo: "pepe",
                padre: "brea.emanuel@gmail.com"
            })
        };
        const control = await fetch('/control', requestOptions)
            .then(res => res.json())

        return control;

    }

    const createControl = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                fecha: "2020/05/02",
                peso: 12,
                altura: 12,
                diametro: 13,
                observaciones: "covid",
                medicamentos: "covid",
                estudios: "covid",
                resultados: "covid",
                nombre_hijo: "pepe",
                padre: "brea.emanuel@gmail.com"
            })
        };
        const control = await fetch('/control', requestOptions)
            .then(res => res.json())

        return control;

    }

    return (
        <div style={{height: 600, width: '100%', padding: '15px'}}>
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
                style={{backgroundColor: "#f2f6f9"}}
                autoHeight
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
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
