--
-- PostgreSQL database dump
--

\restrict oT8aoTGJdfDd1ZfLZTvnvAWP6SBAjaSf5dhWh6RlB9u1uMJFKWtRlJONUelpTIx

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: integrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.integrations (
    id integer NOT NULL,
    name character varying(150) NOT NULL,
    "iconUrl" character varying(2000),
    description character varying(2000),
    "launchUrl" character varying(1000),
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "modifiedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(150),
    "modifiedBy" character varying(150),
    "codebaseKey" character varying(150) NOT NULL
);


--
-- Name: integrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.integrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: integrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.integrations_id_seq OWNED BY public.integrations.id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.roles (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "modifiedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(150),
    "modifiedBy" character varying(150)
);


--
-- Name: roles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.roles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.roles_id_seq OWNED BY public.roles.id;


--
-- Name: user_integrations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_integrations (
    id integer NOT NULL,
    "integrationId" integer,
    "userId" integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "modifiedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(150),
    "modifiedBy" character varying(150)
);


--
-- Name: user_integrations_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.user_integrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: user_integrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.user_integrations_id_seq OWNED BY public.user_integrations.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "remId" character varying(50) NOT NULL,
    "emrId" character varying(50),
    "roleId" integer,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "modifiedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "createdBy" character varying(150),
    "modifiedBy" character varying(150)
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: integrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.integrations ALTER COLUMN id SET DEFAULT nextval('public.integrations_id_seq'::regclass);


--
-- Name: roles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles ALTER COLUMN id SET DEFAULT nextval('public.roles_id_seq'::regclass);


--
-- Name: user_integrations id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_integrations ALTER COLUMN id SET DEFAULT nextval('public.user_integrations_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: integrations PK_9adcdc6d6f3922535361ce641e8; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.integrations
    ADD CONSTRAINT "PK_9adcdc6d6f3922535361ce641e8" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: roles PK_c1433d71a4838793a49dcad46ab; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY (id);


--
-- Name: user_integrations PK_c3de1a91ed82f698dbb15248eb0; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_integrations
    ADD CONSTRAINT "PK_c3de1a91ed82f698dbb15248eb0" PRIMARY KEY (id);


--
-- Name: integrations UQ_4f27d3a6f2315710a44f7a6a178; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.integrations
    ADD CONSTRAINT "UQ_4f27d3a6f2315710a44f7a6a178" UNIQUE (name);


--
-- Name: user_integrations UQ_de958470b95ea496110bd14c4df; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_integrations
    ADD CONSTRAINT "UQ_de958470b95ea496110bd14c4df" UNIQUE ("userId", "integrationId");


--
-- Name: integrations integrations_codebaseKey_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.integrations
    ADD CONSTRAINT "integrations_codebaseKey_key" UNIQUE ("codebaseKey");


--
-- Name: user_integrations FK_2d656b3845ce05788173074e7c3; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_integrations
    ADD CONSTRAINT "FK_2d656b3845ce05788173074e7c3" FOREIGN KEY ("userId") REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users FK_368e146b785b574f42ae9e53d5e; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES public.roles(id);


--
-- Name: user_integrations FK_b654b228d4bf224db74260971fe; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_integrations
    ADD CONSTRAINT "FK_b654b228d4bf224db74260971fe" FOREIGN KEY ("integrationId") REFERENCES public.integrations(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict oT8aoTGJdfDd1ZfLZTvnvAWP6SBAjaSf5dhWh6RlB9u1uMJFKWtRlJONUelpTIx

--
-- PostgreSQL database dump
--

\restrict DZYYeti4BdRcRHMYajW65aDPd9Pnhon3RbkDDvRzWuCsa2bDFgEb6AiJxIMefLP

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

\unrestrict DZYYeti4BdRcRHMYajW65aDPd9Pnhon3RbkDDvRzWuCsa2bDFgEb6AiJxIMefLP

--
-- PostgreSQL database dump
--

\restrict X8QZcu1HFOpq8ssyPkSS1W1TGCvhTtg8p6ihpoIpStsDEaJMtDgOflXZnj5gKFK

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
-- Name: sessions; Type: DATABASE; Schema: -; Owner: localdev
--

CREATE DATABASE sessions WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE sessions OWNER TO localdev;

\unrestrict X8QZcu1HFOpq8ssyPkSS1W1TGCvhTtg8p6ihpoIpStsDEaJMtDgOflXZnj5gKFK
\connect sessions
\restrict X8QZcu1HFOpq8ssyPkSS1W1TGCvhTtg8p6ihpoIpStsDEaJMtDgOflXZnj5gKFK

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: session; Type: TABLE; Schema: public; Owner: localdev
--

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);


ALTER TABLE public.session OWNER TO localdev;

--
-- Name: session session_pkey; Type: CONSTRAINT; Schema: public; Owner: localdev
--

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


--
-- Name: IDX_session_expire; Type: INDEX; Schema: public; Owner: localdev
--

CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);


--
-- PostgreSQL database dump complete
--

\unrestrict X8QZcu1HFOpq8ssyPkSS1W1TGCvhTtg8p6ihpoIpStsDEaJMtDgOflXZnj5gKFK

