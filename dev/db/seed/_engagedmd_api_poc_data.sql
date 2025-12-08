--
-- PostgreSQL database dump
--

\restrict fMg8PJfqs0hj1XfNztRAMklQwPfL5kjc4eLkLpttdadg4uZgUCDmSDaQXfy45VB

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
-- Data for Name: integrations; Type: TABLE DATA; Schema: public; Owner: -
--

SET SESSION AUTHORIZATION DEFAULT;

ALTER TABLE public.integrations DISABLE TRIGGER ALL;

COPY public.integrations (id, name, "iconUrl", description, "launchUrl", "createdAt", "modifiedAt", "createdBy", "modifiedBy", "codebaseKey") FROM stdin;
1	EngagedMD	https://res.cloudinary.com/dyf0aokyn/image/upload/v1765048627/engagedmd_logo_k95zre.jpg	EngagedMD helps carers operate at the top of their license by automating up to 56 minutes of education and admin work per patient.	/integrations/engagedmd/init	2025-12-06 19:18:49.471775+00	2025-12-06 19:18:49.471775+00	system	system	engagedMD
\.


ALTER TABLE public.integrations ENABLE TRIGGER ALL;

--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.roles DISABLE TRIGGER ALL;

COPY public.roles (id, name, "createdAt", "modifiedAt", "createdBy", "modifiedBy") FROM stdin;
1	Patient	2025-12-06 19:12:47.414725+00	2025-12-06 19:12:47.414725+00	system	system
2	Physician	2025-12-06 19:12:47.414725+00	2025-12-06 19:12:47.414725+00	system	system
\.


ALTER TABLE public.roles ENABLE TRIGGER ALL;

--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.users DISABLE TRIGGER ALL;

COPY public.users (id, "remId", "emrId", "roleId", "createdAt", "modifiedAt", "createdBy", "modifiedBy") FROM stdin;
1	auth0|693287ddcd3a2a9880b8b13d	XP-987654321	1	2025-12-06 19:12:59.104557+00	2025-12-06 19:12:59.104557+00	system	system
\.


ALTER TABLE public.users ENABLE TRIGGER ALL;

--
-- Data for Name: user_integrations; Type: TABLE DATA; Schema: public; Owner: -
--

ALTER TABLE public.user_integrations DISABLE TRIGGER ALL;

COPY public.user_integrations (id, "integrationId", "userId", "createdAt", "modifiedAt", "createdBy", "modifiedBy") FROM stdin;
1	1	1	2025-12-06 19:19:49.284113+00	2025-12-06 19:19:49.284113+00	system	system
\.


ALTER TABLE public.user_integrations ENABLE TRIGGER ALL;

--
-- Name: integrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.integrations_id_seq', 1, true);


--
-- Name: roles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.roles_id_seq', 2, true);


--
-- Name: user_integrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.user_integrations_id_seq', 1, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- PostgreSQL database dump complete
--

\unrestrict fMg8PJfqs0hj1XfNztRAMklQwPfL5kjc4eLkLpttdadg4uZgUCDmSDaQXfy45VB

