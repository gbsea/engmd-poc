--
-- PostgreSQL database dump
--

\restrict CfNWre6flqrV0KAgz5Lw66isYn1IZHyxLKDRF8GcUwsgB0XmMa1Xaksg2qHTlO9

-- Dumped from database version 16.11 (Debian 16.11-1.pgdg13+1)
-- Dumped by pg_dump version 16.11 (Debian 16.11-1.pgdg13+1)

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
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE public.roles DISABLE TRIGGER ALL;

COPY public.roles (id, name) FROM stdin;
1	Patient
2	Physician
\.


ALTER TABLE public.roles ENABLE TRIGGER ALL;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.users DISABLE TRIGGER ALL;

COPY public.users (id, "remId", "emrId", "roleId") FROM stdin;
1	auth0|693287ddcd3a2a9880b8b13d	XP-987654321	1
\.


ALTER TABLE public.users ENABLE TRIGGER ALL;

--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

\unrestrict CfNWre6flqrV0KAgz5Lw66isYn1IZHyxLKDRF8GcUwsgB0XmMa1Xaksg2qHTlO9

