import React, {useState} from 'react';
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
        field: 'nombre',
        headerName: 'Hijo',
        width: 160,
        editable: true,
    },
];

const initialRows = [
    {id: 1, fecha: '2020-02-02', vacuna: 'BCG', lugar: 'CABA', nombre: 'Juan'},
    {id: 2, fecha: '2020-03-02', vacuna: 'Hepatitis B', lugar: 'Sanatario brea', nombre: 'Juan'},
    {id: 3, fecha: '2020-04-02', vacuna: 'Neumococo', lugar: 'Sanatario guemes', nombre: 'Pepe'},
    {id: 4, fecha: '2020-05-02', vacuna: 'IPV', lugar: 'Sanatario mater dei', nombre: 'Juan'},
    {id: 5, fecha: '2020-07-02', vacuna: 'Antigripal', lugar: 'Sanatario otamendi', nombre: 'Pepe'},
    {id: 6, fecha: '2020-08-02', vacuna: 'Triple Viral', lugar: 'Sanatario trinidad', nombre: 'Pepe'},
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
    const [rows, setRows] = useState(initialRows);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteRows = () => {
        const selectedIDs = new Set(selected);
        const selectedRowData = rows.filter((row) =>
            !selectedIDs.has(row.id)
        );
        setRows(selectedRowData);
    };

    const handleAddRow = () => {
        const maxId = Math.max(...rows.map(user => user.id))
        const newRow = {id: maxId, fecha: '2020-03-02', vacuna: '', lugar: '', nombre: 'Juan'};
        setRows([...rows, newRow]);
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
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
                disableSelectionOnClick
                onSelectionModelChange={(ids) => setSelected(ids)}
            />
            <div className={classes.floatingIcon}>
                <Fab color="primary" aria-label="add" title="Agregar vacuna" onClick={handleAddRow}>
                    <AddIcon/>
                </Fab>
                <Fab style={{backgroundColor: "green", color: "white"}} aria-label="save" title="Guardar"
                     onClick={handleClickOpen}>
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

        </div>
    );
}
