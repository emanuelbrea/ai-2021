import React, {useEffect, useState} from 'react';
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
import useToken from "../routes/useToken";
import user from "./Username";

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
        field: 'medicamentos',
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
        field: 'nombre_hijo',
        headerName: 'Hijo',
        width: 110,
        editable: true,
        type: 'singleSelect',
        valueOptions: ['Juan', 'pepe'],
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
    const [rows, setRows] = useState([]);
    const [deletedRows, setDeletedRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [missing, setMissing] = useState(false);
    const token = useToken()['token'];
    const username = user.getUsername();

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
            id: maxId + 1, fecha: new Date(today.toDateString()), peso: 0, altura: 0, diametro: 0, observaciones: '',
            medicamento: '', dosis: 0, periodo: '',
            estudios: '', resultados: '', nombre: 'pepe', new: true
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
        getControles().then(items => {
            if (items.success === 'true') {
                addIds(items.data.result);
                convertDate(items.data.result);
                addOldValues(items.data.result);
                setRows(items.data.result);
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const convertDate = (controles) => {
        controles.forEach((row) => {
            let fecha = new Date(row.fecha);
            row.fecha = new Date(fecha.toDateString());
        });
    }

    const addIds = (controles) => {
        for (let i = 1; i <= controles.length; i++) {
            controles[i - 1].id = i;
        }
    }

    const addOldValues = (controles) => {
        controles.forEach((row) => {
            row.fecha_old = row.fecha;
            row.medicamentos_old = row.medicamentos;
            row.estudios_old = row.estudios;
            row.resultados_old = row.resultados;
            row.nombre_hijo_old = row.nombre_hijo;
        });
    }

    const handleSaveControles = () => {
        if (!validateFields()) {
            setMissing(true);
        } else {
            rows.forEach((row) => {
                if (row.new !== undefined && row.new === true) {
                    createControl(
                        row.fecha, row.peso, row.altura, row.diametro, row.observaciones, row.medicamentos, row.dosis,
                        row.periodo, row.estudios, row.resultados, row.nombre_hijo, username
                    );
                    row.fecha_old = row.fecha;
                    row.medicamentos_old = row.medicamentos;
                    row.estudios_old = row.estudios;
                    row.resultados_old = row.resultados;
                    row.nombre_hijo_old = row.nombre_hijo;
                    row.new = false;
                } else {
                    editControl(
                        row.fecha, row.peso, row.altura, row.diametro, row.observaciones, row.medicamentos, row.dosis,
                        row.periodo, row.estudios, row.resultados, row.nombre_hijo, row.fecha_old, row.medicamentos_old,
                        row.estudios_old, row.resultados_old, row.nombre_hijo_old, username
                    )
                }
            });
            deletedRows.forEach((row) => {
                if (row.new === undefined || row.new === false) {
                    deleteControl(row.fecha, row.medicamentos, row.estudios, row.resultados,
                        row.nombre_hijo, username)
                }
            });
            setDeletedRows([]);
            setOpen(true);
        }

    };


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

    const editControl = async (fecha, peso, altura, diametro, observaciones, medicamentos, dosis, periodo,
                               estudios, resultados, nombre_hijo, fecha_old, medicamentos_old,
                               estudios_old, resultados_old, nombre_hijo_old, padre) => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                fecha: fecha,
                peso: peso,
                altura: altura,
                diametro: diametro,
                observaciones: observaciones,
                medicamentos: medicamentos,
                dosis: dosis,
                periodo: periodo,
                estudios: estudios,
                resultados: resultados,
                nombre_hijo: nombre_hijo,
                fecha_old: fecha_old,
                medicamentos_old: medicamentos_old,
                estudios_old: estudios_old,
                resultados_old: resultados_old,
                nombre_hijo_old: nombre_hijo_old,
                padre: username
            })
        };
        const control = await fetch('/control', requestOptions)
            .then(res => res.json())

        return control;

    }

    const deleteControl = async (fecha, medicamentos, estudios, resultados, nombre_hijo, padre) => {
        const requestOptions = {
            method: 'DELETE',
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                fecha: fecha,
                medicamentos: medicamentos,
                estudios: estudios,
                resultados: resultados,
                nombre_hijo: nombre_hijo,
                padre: username
            })
        };
        const control = await fetch('/control', requestOptions)
            .then(res => res.json())

        return control;

    }

    const createControl = async (fecha, peso, altura, diametro, observaciones, medicamentos, dosis, periodo,
                                 estudios, resultados, nombre_hijo, padre) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Authorization': token, 'Content-Type': 'application/json'},
            body: JSON.stringify({
                fecha: fecha,
                peso: peso,
                altura: altura,
                diametro: diametro,
                observaciones: observaciones,
                medicamentos: medicamentos,
                dosis: dosis,
                periodo: periodo,
                estudios: estudios,
                resultados: resultados,
                nombre_hijo: nombre_hijo,
                padre: username
            })
        };
        const control = await fetch('/control', requestOptions)
            .then(res => res.json())

        return control;

    }

    const validateFields = () => {
        const emptyFields = rows.some((row) =>
            row.nombre_hijo.length === 0 || row.medicamentos.length === 0
            || row.estudios.length === 0 || row.resultados.length === 0 || row.fecha.length === 0
        );

        const duplicatedFields = rows.filter((row, index, self) =>
                index === self.findIndex((t) => (
                    t.medicamentos === row.medicamentos && t.estudios === row.estudios
                    && t.resultados === row.resultados && t.nombre_hijo === row.nombre_hijo
                ))
        )
        return !emptyFields && (duplicatedFields.length === rows.length);
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
                onCellEditCommit={handleCellClick}
            />
            <div className={classes.floatingIcon}>
                <Fab color="primary" aria-label="add" title="Agregar control" onClick={handleAddRow}>
                    <AddIcon/>
                </Fab>
                <Fab style={{backgroundColor: "green", color: "white"}} aria-label="save" title="Guardar"
                     onClick={handleSaveControles}>
                    <SaveIcon/>
                </Fab>
            </div>
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
