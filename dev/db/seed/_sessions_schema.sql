--
-- PostgreSQL database dump
--

\restrict ryIlR9nkwfOwzRsPBdRXwtqHuZNhPV6TB1hvS2GGe8F6w8tWhRA8I0HjkM0vwX5

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

\unrestrict ryIlR9nkwfOwzRsPBdRXwtqHuZNhPV6TB1hvS2GGe8F6w8tWhRA8I0HjkM0vwX5
\connect sessions
\restrict ryIlR9nkwfOwzRsPBdRXwtqHuZNhPV6TB1hvS2GGe8F6w8tWhRA8I0HjkM0vwX5

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

\unrestrict ryIlR9nkwfOwzRsPBdRXwtqHuZNhPV6TB1hvS2GGe8F6w8tWhRA8I0HjkM0vwX5

