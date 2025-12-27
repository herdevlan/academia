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
1	1	login	{"ip":"::1"}	2025-11-26 20:59:06.497-04	2025-11-26 20:59:06.497-04
2	1	login	{"ip":"::1"}	2025-11-26 20:59:45.145-04	2025-11-26 20:59:45.145-04
3	3	register	{"ip":"::1"}	2025-11-26 21:06:08.523-04	2025-11-26 21:06:08.523-04
4	4	register	{"ip":"::1"}	2025-11-26 22:36:30.57-04	2025-11-26 22:36:30.57-04
5	5	register	{"ip":"::1"}	2025-11-26 22:37:35.055-04	2025-11-26 22:37:35.055-04
6	5	login	{"ip":"::1"}	2025-11-26 23:13:07.159-04	2025-11-26 23:13:07.159-04
7	6	register	{"ip":"::1"}	2025-11-26 23:58:35.709-04	2025-11-26 23:58:35.709-04
8	7	register	{"ip":"::1"}	2025-11-26 23:59:13.761-04	2025-11-26 23:59:13.761-04
9	1	login	{"ip":"::1"}	2025-12-24 19:05:06.257-04	2025-12-24 19:05:06.257-04
10	1	login	{"ip":"::1"}	2025-12-24 20:47:34.609-04	2025-12-24 20:47:34.609-04
11	1	login	{"ip":"::1"}	2025-12-24 21:02:53.076-04	2025-12-24 21:02:53.076-04
12	1	login	{"ip":"::1"}	2025-12-24 21:03:04.831-04	2025-12-24 21:03:04.831-04
13	1	login	{"ip":"::1"}	2025-12-24 21:03:51.541-04	2025-12-24 21:03:51.541-04
14	1	login	{"ip":"::1"}	2025-12-24 21:03:52.854-04	2025-12-24 21:03:52.854-04
15	1	login	{"ip":"::1"}	2025-12-24 21:03:53.119-04	2025-12-24 21:03:53.119-04
16	1	login	{"ip":"::1"}	2025-12-24 21:03:53.327-04	2025-12-24 21:03:53.327-04
17	1	login	{"ip":"::1"}	2025-12-24 21:03:53.515-04	2025-12-24 21:03:53.515-04
18	1	login	{"ip":"::1"}	2025-12-24 21:03:53.698-04	2025-12-24 21:03:53.698-04
19	1	login	{"ip":"::1"}	2025-12-24 21:03:53.905-04	2025-12-24 21:03:53.905-04
20	1	login	{"ip":"::1"}	2025-12-24 21:08:44.958-04	2025-12-24 21:08:44.958-04
21	1	login	{"ip":"::1"}	2025-12-24 21:15:33.153-04	2025-12-24 21:15:33.153-04
22	1	login	{"ip":"::1"}	2025-12-24 21:17:38.627-04	2025-12-24 21:17:38.627-04
23	1	login	{"ip":"::1"}	2025-12-24 21:19:46.874-04	2025-12-24 21:19:46.874-04
24	1	login	{"ip":"::1"}	2025-12-24 21:21:26.551-04	2025-12-24 21:21:26.551-04
25	1	login	{"ip":"::1"}	2025-12-24 21:33:25.444-04	2025-12-24 21:33:25.444-04
26	1	login	{"ip":"::1"}	2025-12-24 21:42:38.585-04	2025-12-24 21:42:38.585-04
27	1	login	{"ip":"::1"}	2025-12-24 22:02:45.901-04	2025-12-24 22:02:45.901-04
28	8	register	{"ip":"::1"}	2025-12-24 22:03:45.193-04	2025-12-24 22:03:45.193-04
29	1	login	{"ip":"::1"}	2025-12-24 23:44:39.264-04	2025-12-24 23:44:39.264-04
30	1	login	{"ip":"::1"}	2025-12-25 00:07:33.501-04	2025-12-25 00:07:33.501-04
31	1	login	{"ip":"::1"}	2025-12-25 00:11:43.384-04	2025-12-25 00:11:43.384-04
32	1	login	{"ip":"::1"}	2025-12-25 00:18:30.955-04	2025-12-25 00:18:30.955-04
33	1	login	{"ip":"::1"}	2025-12-25 00:21:00.575-04	2025-12-25 00:21:00.575-04
34	1	login	{"ip":"::1"}	2025-12-25 00:24:54.839-04	2025-12-25 00:24:54.839-04
35	1	login	{"ip":"::1"}	2025-12-25 00:33:07.082-04	2025-12-25 00:33:07.082-04
36	1	login	{"ip":"::1"}	2025-12-25 00:36:37.818-04	2025-12-25 00:36:37.818-04
37	1	login	{"ip":"::1"}	2025-12-25 00:39:43.093-04	2025-12-25 00:39:43.093-04
38	1	login	{"ip":"::1"}	2025-12-25 00:50:23.251-04	2025-12-25 00:50:23.251-04
39	1	login	{"ip":"::1"}	2025-12-25 01:07:46.583-04	2025-12-25 01:07:46.583-04
40	1	login	{"ip":"::1"}	2025-12-25 01:12:17.366-04	2025-12-25 01:12:17.366-04
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
3	estudiante	est@test.com	$2b$10$6GxCosGk9DK.ZOwdqjN91eTgLS/juL1/JSbmEO7EvvPbU5.IbPVYW	estudiante	f	\N	2025-11-26 21:06:08.518-04	2025-11-26 21:06:08.518-04
4	estudiante2	est2@test.com	$2b$10$Fo/49cdD8VU7pV5gorLLyuD4ET9.Um62kg59GjjRWRb.0uEBidGqS	estudiante	f	\N	2025-11-26 22:36:30.559-04	2025-11-26 22:36:30.559-04
5	estudiante3	est3@test.com	$2b$10$r232D9hTh4EUxQ/UgK2MPe3Qfy2MjMN4Rqd53dIFqU06IIhapIb8K	estudiante	f	\N	2025-11-26 22:37:35.051-04	2025-11-26 22:37:35.051-04
6	estudiante4	est4@test.com	$2b$10$DMpPmrRZ92LF9pXgK0sN5eoyxcbFGO2kOED1CL.I7EjZqA874fNXa	estudiante	f	\N	2025-11-26 23:58:35.703-04	2025-11-26 23:58:35.703-04
7	estudiante5	est5@test.com	$2b$10$9VoBQaL3l.Pg702ryzfM6uKdd.pqacEKjm3v0jOgofYHCx23pCmCO	estudiante	f	\N	2025-11-26 23:59:13.759-04	2025-11-26 23:59:13.759-04
8	estudianteP1	estp1@test.com	$2b$10$3iVc3qnyg4Hoftu54K0paOlMtg9eXWvcZrMNcJo5QMmiNJFmOlET.	estudiante	f	\N	2025-12-24 22:03:45.179-04	2025-12-24 22:03:45.179-04
9	aaa	aaa@gmail.com	$2b$10$I5BxDIm3vgro.olQdDFhD.JDBeGxU6WDv5tt9aagSscWpXY9xhuI6	estudiante	f	\N	2025-12-25 00:12:27.157-04	2025-12-25 00:12:27.157-04
12	nnn	rrr@gmail.com	$2b$10$MLqv9nyo5TEPt.c46kRDf.4Wn1dOeq/AWxFZtdhJEMHU/srbcKP6m	estudiante	f	\N	2025-12-25 00:21:36.421-04	2025-12-25 00:36:59.687-04
\.


--
-- Name: LogActions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."LogActions_id_seq"', 40, true);


--
-- Name: Students_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Students_id_seq"', 1, false);


--
-- Name: Users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Users_id_seq"', 13, true);


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

