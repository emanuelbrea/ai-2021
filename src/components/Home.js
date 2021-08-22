import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Typography
} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Footer from "./Footer";
import React from "react";
import CalendarioVacunacion from "../images/CalendarioVacunacion.jpg";
import ControlesPediatricos from "../images/ControlesPediatricos.jpg";
import Percentiles from "../images/Percentiles.jpg";
import AOS from "aos/dist/aos";
import "aos/dist/aos.css";

AOS.init({ once: true });

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
        marginTop: theme.spacing(10),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        marginTop:'30'
    },
    cardContent: {
        flexGrow: 1,
    },
}));



const cards = [
    {
        key: 1,
        description: "Calendario nacional de vacunacion",
        image: CalendarioVacunacion,
        title: "Calendario nacional de vacunacion",
        link: "https://www.stamboulian.com.ar/pacientes/calendario-nacional-de-vacunacion/"
    },
    {
        key: 2,
        description: "Control pediatrico",
        image: ControlesPediatricos,
        title: "Control pediatrico",
        link: "https://www.clinicapueyrredon.com/control-pediatrico-del-nino-sano/"
    },
    {
        key: 3,
        description: "Percentiles ",
        image: Percentiles,
        title: "Percentiles y parametros generales",
        link: "https://www.mayoclinic.org/es-es/healthy-lifestyle/infant-and-toddler-health/in-depth/healthy-baby/art-20044767"
    },
    {
        key: 4,
        description: "Calendario nacional de vacunacion",
        image: CalendarioVacunacion,
        title: "Calendario nacional de vacunacion",
        link: "https://www.stamboulian.com.ar/pacientes/calendario-nacional-de-vacunacion/"
    },
    {
        key: 5,
        description: "Control pediatrico",
        image: ControlesPediatricos,
        title: "Control pediatrico",
        link: "https://www.clinicapueyrredon.com/control-pediatrico-del-nino-sano/"
    },
    {
        key: 6,
        description: "Percentiles ",
        image: Percentiles,
        title: "Percentiles y parametros generales",
        link: "https://www.mayoclinic.org/es-es/healthy-lifestyle/infant-and-toddler-health/in-depth/healthy-baby/art-20044767"
    }
];

const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}


export default function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <main>
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            Clinica Brea
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            Gestionar controles pediatricos nunca fue tan facil.
                            Con solo unos clicks puede llevar al dia todos los checkeos de sus hijos.
                        </Typography>
                    </Container>
                </div>
                <Container className={classes.cardGrid} maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4} >
                        {cards.map((card) => (
                            <Grid item key={card} xs={12} data-aos="zoom-in-up"
                                  data-aos-duration={1500}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        title={card.title}
                                        component="img"
                                        src={card.image}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                        <Typography>
                                            {card.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => openInNewTab(card.link)} >
                                            Conoce mas
                                        </Button>
                                    </CardActions>
                                </Card>

                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <Footer/>
        </React.Fragment>
    );
}