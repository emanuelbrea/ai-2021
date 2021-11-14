--
-- PostgreSQL database dump
--

-- Dumped from database version 12.8
-- Dumped by pg_dump version 12.8

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: adminpack; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS adminpack WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION adminpack; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION adminpack IS 'administrative functions for PostgreSQL';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: children; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.children (
    id_hijo integer NOT NULL,
    nombre character varying(50) NOT NULL,
    nacimiento timestamp without time zone,
    grupo_sanguineo character varying(50),
    padre character varying(100)
);


ALTER TABLE public.children OWNER TO postgres;

--
-- Name: children_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.children_data (
    id integer NOT NULL,
    descripcion character varying(500) NOT NULL,
    tipo character varying(50) NOT NULL,
    nombre_hijo character varying(50) NOT NULL,
    padre character varying(100) NOT NULL
);


ALTER TABLE public.children_data OWNER TO postgres;

--
-- Name: children_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.children_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.children_data_id_seq OWNER TO postgres;

--
-- Name: children_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.children_data_id_seq OWNED BY public.children_data.id;


--
-- Name: children_id_hijo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.children_id_hijo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.children_id_hijo_seq OWNER TO postgres;

--
-- Name: children_id_hijo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.children_id_hijo_seq OWNED BY public.children.id_hijo;


--
-- Name: codigo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.codigo (
    id integer NOT NULL,
    email character varying(100),
    value numeric,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.codigo OWNER TO postgres;

--
-- Name: codigo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.codigo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.codigo_id_seq OWNER TO postgres;

--
-- Name: codigo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.codigo_id_seq OWNED BY public.codigo.id;


--
-- Name: control_pediatrico; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.control_pediatrico (
    id_control integer NOT NULL,
    fecha date NOT NULL,
    peso numeric,
    altura numeric,
    diametro numeric,
    observaciones character varying(500),
    medicamentos character varying(500) NOT NULL,
    dosis numeric,
    periodo character varying(100),
    estudios character varying(500) NOT NULL,
    resultados character varying(500) NOT NULL,
    nombre_hijo character varying(50) NOT NULL,
    padre character varying(100) NOT NULL
);


ALTER TABLE public.control_pediatrico OWNER TO postgres;

--
-- Name: control_pediatrico_id_control_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.control_pediatrico_id_control_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.control_pediatrico_id_control_seq OWNER TO postgres;

--
-- Name: control_pediatrico_id_control_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.control_pediatrico_id_control_seq OWNED BY public.control_pediatrico.id_control;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    nombre character varying(100),
    apellido character varying(100),
    dni integer NOT NULL,
    telefono integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: vacunas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vacunas (
    id integer NOT NULL,
    fecha date NOT NULL,
    vacuna character varying(50) NOT NULL,
    lugar character varying(500),
    nombre_hijo character varying(50) NOT NULL,
    padre character varying(100) NOT NULL
);


ALTER TABLE public.vacunas OWNER TO postgres;

--
-- Name: vacunas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vacunas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vacunas_id_seq OWNER TO postgres;

--
-- Name: vacunas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vacunas_id_seq OWNED BY public.vacunas.id;


--
-- Name: children id_hijo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children ALTER COLUMN id_hijo SET DEFAULT nextval('public.children_id_hijo_seq'::regclass);


--
-- Name: children_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children_data ALTER COLUMN id SET DEFAULT nextval('public.children_data_id_seq'::regclass);


--
-- Name: codigo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.codigo ALTER COLUMN id SET DEFAULT nextval('public.codigo_id_seq'::regclass);


--
-- Name: control_pediatrico id_control; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.control_pediatrico ALTER COLUMN id_control SET DEFAULT nextval('public.control_pediatrico_id_control_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: vacunas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacunas ALTER COLUMN id SET DEFAULT nextval('public.vacunas_id_seq'::regclass);


--
-- Data for Name: children; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.children (id_hijo, nombre, nacimiento, grupo_sanguineo, padre) FROM stdin;
2	pepe	2020-02-02 00:00:00	a+	brea.emanuel@gmail.com
\.


--
-- Data for Name: children_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.children_data (id, descripcion, tipo, nombre_hijo, padre) FROM stdin;
2	mani	alergia	pepe	brea.emanuel@gmail.com
\.


--
-- Data for Name: codigo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.codigo (id, email, value, created_at) FROM stdin;
2	brea.emanuel@gmail.com	827131	2021-11-13 21:03:10.733368
\.


--
-- Data for Name: control_pediatrico; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.control_pediatrico (id_control, fecha, peso, altura, diametro, observaciones, medicamentos, dosis, periodo, estudios, resultados, nombre_hijo, padre) FROM stdin;
2	2020-02-02	57	254	30	buenos	buenos	\N	\N	buenos	buenos	pepe	brea.emanuel@gmail.com
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, nombre, apellido, dni, telefono, created_at, updated_at) FROM stdin;
2	brea.emanuel@gmail.com	$2b$08$17aRo33fD.ihTKRIH3Kjze/cHRhfhnOOI7Thzjg.KtorO9ts9FHRa	Emanuel	Brea	40127028	4545166	2021-11-13 18:49:30.485605-03	2021-11-13 18:49:30.485605-03
\.


--
-- Data for Name: vacunas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vacunas (id, fecha, vacuna, lugar, nombre_hijo, padre) FROM stdin;
1	2020-05-02	covid	caba	pepe	brea.emanuel@gmail.com
\.


--
-- Name: children_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.children_data_id_seq', 2, true);


--
-- Name: children_id_hijo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.children_id_hijo_seq', 2, true);


--
-- Name: codigo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.codigo_id_seq', 2, true);


--
-- Name: control_pediatrico_id_control_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.control_pediatrico_id_control_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: vacunas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vacunas_id_seq', 1, true);


--
-- Name: children children_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_pkey PRIMARY KEY (nombre);


--
-- Name: codigo codigo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.codigo
    ADD CONSTRAINT codigo_pkey PRIMARY KEY (id);


--
-- Name: control_pediatrico pk_children; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.control_pediatrico
    ADD CONSTRAINT pk_children PRIMARY KEY (fecha, medicamentos, estudios, resultados, nombre_hijo, padre);


--
-- Name: children_data pk_children_data; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children_data
    ADD CONSTRAINT pk_children_data PRIMARY KEY (descripcion, tipo, nombre_hijo, padre);


--
-- Name: vacunas pk_vacunas; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacunas
    ADD CONSTRAINT pk_vacunas PRIMARY KEY (fecha, vacuna, nombre_hijo, padre);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);


--
-- Name: control_pediatrico fk_children; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.control_pediatrico
    ADD CONSTRAINT fk_children FOREIGN KEY (nombre_hijo) REFERENCES public.children(nombre) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: children_data fk_hijo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children_data
    ADD CONSTRAINT fk_hijo FOREIGN KEY (nombre_hijo) REFERENCES public.children(nombre) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: vacunas fk_hijo_vacuna; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacunas
    ADD CONSTRAINT fk_hijo_vacuna FOREIGN KEY (nombre_hijo) REFERENCES public.children(nombre) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: children fk_padre; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT fk_padre FOREIGN KEY (padre) REFERENCES public.users(email);


--
-- Name: children_data fk_padre; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.children_data
    ADD CONSTRAINT fk_padre FOREIGN KEY (padre) REFERENCES public.users(email);


--
-- Name: control_pediatrico fk_padre; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.control_pediatrico
    ADD CONSTRAINT fk_padre FOREIGN KEY (padre) REFERENCES public.users(email);


--
-- Name: vacunas fk_padre; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vacunas
    ADD CONSTRAINT fk_padre FOREIGN KEY (padre) REFERENCES public.users(email);


--
-- Name: codigo fk_user; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.codigo
    ADD CONSTRAINT fk_user FOREIGN KEY (email) REFERENCES public.users(email);


--
-- PostgreSQL database dump complete
--

