import {Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Footer from "./Footer";
import React, {useEffect} from "react";
import CalendarioVacunacion from "../../images/CalendarioVacunacion.jpg";
import ControlesPediatricos from "../../images/ControlesPediatricos.jpg";
import Percentiles from "../../images/Percentiles.jpg";
import Doctor from "../../images/doctor.png";
import Doctores from "../../images/doctores.png";
import Vacunas from "../../images/Vacunas.jpg";
import LogoDoctor from "../../images/logoDoctor.jpg";
import LogoClinica from "../../images/logoClinica.jpg";
import AOS from "aos/dist/aos";
import "aos/dist/aos.css";
import Box from "@material-ui/core/Box";
import Carousel from 'react-material-ui-carousel'

const useStyles = makeStyles((theme) => ({
    heroTitle: {
        marginTop: theme.spacing(26),
    },
    centerTitle: {
        marginTop: theme.spacing(50),
        marginBottom: theme.spacing(16),
    },
    heroContent: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
    },
    heroImage: {
        width: '50%'
    },
    heroText: {
        fontSize: '50px',
        fontWeight: 'bold',
        marginBottom: '15px',
        color: "#4675ab",
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    cardFuncionalidad: {
        height: '100%',
        width: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(2),
        backgroundColor: "#f2f6f9"
    },
    cardContent: {
        flexGrow: 1,
    },
}));


const cards = [
    {
        description: "Calendario nacional de vacunacion",
        image: CalendarioVacunacion,
        title: "Calendario nacional de vacunacion",
        link: "https://www.stamboulian.com.ar/pacientes/calendario-nacional-de-vacunacion/"
    },
    {
        description: "Control pediatrico",
        image: ControlesPediatricos,
        title: "Control pediatrico",
        link: "https://www.clinicapueyrredon.com/control-pediatrico-del-nino-sano/"
    },
    {
        description: "Percentiles ",
        image: Percentiles,
        title: "Percentiles y parametros generales",
        link: "https://www.mayoclinic.org/es-es/healthy-lifestyle/infant-and-toddler-health/in-depth/healthy-baby/art-20044767"
    }
];

const funcionalidades = [
    {
        description: "Los usuarios podrán registrar un nuevo control pediátrico a cada niño de su perfil. Un control " +
            "pediátrico registra para un niño: fecha, peso, altura, diámetro cabeza (se mide hasta el año), observaciones,",
        image: LogoDoctor,
        title: "Registro de control pediatrico",
        delay: 0,
    },
    {
        description: "Los usuarios podrán registrar cada una de las vacunas aplicadas a los niños. Para ello el sistema " +
            "debe contar con una replica del calendario de vacunación y permitir al usuario completar el mismo ingresando ",
        image: Vacunas,
        title: "Registro de vacunas",
        delay: 500,
    },
    {
        description: "Los usuarios podrán comparar los controles de sus hijos con los percentiles de Curva de Crecimiento ofrecidos por la OMS.",
        image: LogoClinica,
        title: "Consulta de Percentiles",
        delay: 1000,
    }
];

const reviews = [
    {
        description: "Gracias a Clinica Brea puedo llevar al dia todos los controles que les hice a mis hijos." +
            "Ya no tengo que andar guardando papeles que despues nunca encuentro!",
        title: "Registro de control pediatrico",
        persona: "Sandra Bullock, Madre de Juan",
    },
    {
        description: "Los usuarios podrán registrar cada una de las vacunas aplicadas a los niños. Para ello el sistema " +
            "debe contar con una replica del calendario de vacunación y permitir al usuario completar el mismo ingresando ",
        title: "Registro de vacunas",
        persona: "Brad Pitt, Padre de Gonzalo",
    },
    {
        description: "Los usuarios podrán comparar los controles de sus hijos con los percentiles de Curva de Crecimiento ofrecidos por la OMS.",
        title: "Consulta de Percentiles",
        persona: "Sandra Bullock, Madre de Juanes",
    }
];


const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}


export default function LandingPage() {
    const classes = useStyles();

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <React.Fragment>
            <main>
                <Container className={classes.heroTitle} maxWidth="xl">
                    <Box display="flex" width={1} m={1} p={1}>
                        <Box p={1} className={classes.heroContent} data-aos="zoom-in-up" data-aos-duration={1500}>
                            <Container>
                                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom
                                            className={classes.heroText}>
                                    Clinica Brea
                                </Typography>
                                <Typography variant="h5" align="center" color="textSecondary" paragraph>
                                    Gestionar controles pediatricos nunca fue tan facil.
                                    Con solo unos clicks puede llevar al dia todos los checkeos de sus hijos.
                                </Typography>
                            </Container>
                        </Box>
                        <Box p={1} className={classes.heroImage} data-aos="zoom-in-up" data-aos-duration={1500}>
                            <CardMedia
                                component="img"
                                src={Doctor}
                                style={{width: "80%"}}
                            />
                        </Box>
                    </Box>
                </Container>

                <Container className={classes.centerTitle} maxWidth="md" data-aos="zoom-in-up"
                           data-aos-duration={1500}>

                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom
                                className={classes.heroText}>
                        Funcionalidades
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        Gestionar controles pediatricos nunca fue tan facil.
                        Con solo unos clicks puede llevar al dia todos los checkeos de sus hijos.
                    </Typography>


                </Container>

                <Container className={classes.cardGrid} maxWidth="lg">
                    <Grid container spacing={10}>
                        {funcionalidades.map((funcionalidad, index) => (
                            <Grid item key={index} xs={12} md={4} lg={4} data-aos="fade-right"
                                  data-aos-easing="ease-in-sine"
                                  data-aos-duration={500} data-aos-delay={funcionalidad.delay}>
                                <Card className={classes.cardFuncionalidad}>
                                    <CardMedia
                                        component="img"
                                        src={funcionalidad.image}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {funcionalidad.title}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {funcionalidad.description}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                </Container>

                <Container className={classes.heroTitle} maxWidth="xl">
                    <Box display="flex" width={1} m={1} p={1}>
                        <Box p={1} className={classes.heroImage} data-aos="zoom-in-up" data-aos-duration={1500}>
                            <CardMedia
                                component="img"
                                src={Doctores}
                                style={{width: "80%"}}
                            />
                        </Box>
                        <Box p={1} className={classes.heroContent} data-aos="zoom-in-up" data-aos-duration={1500}>
                            <Container>
                                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom
                                            className={classes.heroText}>
                                    Que dicen nuestros clientes
                                </Typography>
                                <Carousel activeIndicatorIconButtonProps={{
                                    style: {
                                        backgroundColor: '#4675AB',
                                        opacity: 1,
                                        color: '#4675AB'
                                    }
                                }}
                                          indicatorIconButtonProps={{
                                              style: {
                                                  color: "#6f9cbf",
                                                  width: "20px",
                                                  opacity: 0.6
                                              }
                                          }}>
                                    {
                                        reviews.map((item, i) =>
                                            <Container key={i}>
                                                <Typography style={{height: "100px"}} variant="h6" align="left"
                                                            color="textSecondary" paragraph>
                                                    {item.description}
                                                </Typography>
                                                <Typography align="left" style={{
                                                    fontWeight: 600,
                                                    color: "#fc6932",
                                                    fontSize: '20px'
                                                }}>
                                                    {item.persona}
                                                </Typography>
                                            </Container>
                                        )
                                    }
                                </Carousel>
                            </Container>
                        </Box>

                    </Box>
                </Container>

                <Container className={classes.centerTitle} maxWidth="md" data-aos="zoom-in-up" data-aos-duration={1500}>
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom
                                className={classes.heroText}>
                        Articulos informativos
                    </Typography>
                </Container>

                <Container className={classes.cardGrid} maxWidth="xl">
                    <Grid container spacing={10}>
                        {cards.map((card, index) => (
                            <Grid item key={index} xs={12} md={4} lg={4} data-aos="zoom-in-up"
                                  data-aos-duration={1500} style={{marginBottom: 50}}>
                                <Card className={classes.cardFuncionalidad}>
                                    <CardMedia
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
                                        <Button size="medium" color="primary" onClick={() => openInNewTab(card.link)}>
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