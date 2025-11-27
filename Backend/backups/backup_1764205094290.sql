--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: LogActions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."LogActions" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    action character varying(255) NOT NULL,
    meta json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."LogActions" OWNER TO postgres;

--
-- Name: LogActions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."LogActions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."LogActions_id_seq" OWNER TO postgres;

--
-- Name: LogActions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."LogActions_id_seq" OWNED BY public."LogActions".id;


--
-- Name: SequelizeMeta; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."SequelizeMeta" (
    name character varying(255) NOT NULL
);


ALTER TABLE public."SequelizeMeta" OWNER TO postgres;

--
-- Name: Students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Students" (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    nivel_academico character varying(255) NOT NULL,
    curso_actual character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Students" OWNER TO postgres;

--
-- Name: Students_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Students_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Students_id_seq" OWNER TO postgres;

--
-- Name: Students_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Students_id_seq" OWNED BY public."Students".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Users" (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'student'::character varying NOT NULL,
    mfa_enabled boolean DEFAULT false,
    mfa_secret text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."Users" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Users_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Users_id_seq" OWNER TO postgres;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Users_id_seq" OWNED BY public."Users".id;


--
-- Name: LogActions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogActions" ALTER COLUMN id SET DEFAULT nextval('public."LogActions_id_seq"'::regclass);


--
-- Name: Students id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students" ALTER COLUMN id SET DEFAULT nextval('public."Students_id_seq"'::regclass);


--
-- Name: Users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users" ALTER COLUMN id SET DEFAULT nextval('public."Users_id_seq"'::regclass);


--
-- Data for Name: LogActions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."LogActions" (id, user_id, action, meta, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SequelizeMeta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."SequelizeMeta" (name) FROM stdin;
20251123223600-create-user.js
20251123223601-create-student.js
20251125212727-create-logaction.js
20251127005414-create-logactions.js
\.


--
-- Data for Name: Students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Students" (id, usuario_id, nivel_academico, curso_actual, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Users" (id, name, email, password_hash, role, mfa_enabled, mfa_secret, "createdAt", "updatedAt") FROM stdin;
1	Admin Test	admin@test.com	$2b$10$yfwgYgE1x8Wm/omb/LqiYOAGCcxafNDKR8CdLqjJ8uT4SKb1zvxe.	administrador	f	\N	2025-11-26 19:57:32.817-04	2025-11-26 19:57:32.817-04
2	Teacher Test	teacher@test.com	$2b$10$iFttfN7zL8gOIYzSXSfscOr8PkEEk5hmD/oIbxcp1HSYD94CMU8JC	docente	f	\N	2025-11-26 19:57:32.928-04	2025-11-26 19:57:32.928-04
\.


--
-- Name: LogActions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LogActions_id_seq"', 1, false);


--
-- Name: Students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Students_id_seq"', 1, false);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 2, true);


--
-- Name: LogActions LogActions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogActions"
    ADD CONSTRAINT "LogActions_pkey" PRIMARY KEY (id);


--
-- Name: SequelizeMeta SequelizeMeta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."SequelizeMeta"
    ADD CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name);


--
-- Name: Students Students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_pkey" PRIMARY KEY (id);


--
-- Name: Users Users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_email_key" UNIQUE (email);


--
-- Name: Users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: LogActions LogActions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."LogActions"
    ADD CONSTRAINT "LogActions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public."Users"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Students Students_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Students"
    ADD CONSTRAINT "Students_usuario_id_fkey" FOREIGN KEY (usuario_id) REFERENCES public."Users"(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

