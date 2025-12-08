# Design & Considerations

## Core System
The core system is a NestJS based web app that exposes Auth0 (auth provider) protected ejs views and api routes to authenticated users with the exception of the /health route for health checking. The authenticated routes contain business logic driven data from the internal data store (Postgres DB via TypeORM), Auth0 for PII (user names, emails) and other integrations such as the EngagedMD api. A basic user role, integration management and user integration system has also been setup. See more details about integrations in the [Integrations](#integrations) section below.

## Considerations
- .env + NestJS Config drives all configuration in the application. This makes cross env/multi environment deployment simpler as configuration details can be swapped out by environment and provided at runtime.
- .env is encrypted in repo / secrets are secured. In a production worthy application all secrets would be env. specific and fed in at runtime.
- Uses NestJS recommendations for file system layout and structure to minimize learning curves. The exception to this are the ./src/mvc directory which is simply a wrapping directory to allow model-view-controller related files to stay out of the ./src directory as the service grows.
- Uses a standardized wrapper for logging that can be expanded to include additional information as needed over time for more effective tracing and debugging.
- TypeORM is used for all integrations with the Postgres DB used for internal data storage. This abstraction allows for codified schema/data typing and the DB engine may be swapped out without the need for sql changes in most cases. 
- Using external authentication provider (Auth0). No passwords or PII are stored in the internal store (Postgres DB). This does mean that text based searches of users would require API calls to Auto0 first before any SQL query could be run but is a worth wise tradeoff for security and reduced liability. 
- A health endpoint with a basic HTTP check and DB connection check has been setup
- TODO - Production worthy applications should be fully unit, integration and smoke tested. This POC does not include any of that but would if being carried forward to production.
- TODO - Production worthy application should have performance metrics collection / observability (prometheus or other) and the data should be piped into Grafana where threshold base alarms on request rate, p95, error rate, etc. could be configured.

## Integrations
Integrations are setup in a class based Command Registry Pattern which allows for standardization around the shared aspects of integrations like managing config/context, state, db interaction, logging and metrics collection while allowing for generic commands to be registered as needed to meet integration specific needs. Integration classes are paired with an integration row in the integrations table in the Postgres DB which can then be attached to user upon user enrollment into an integration. Finally integrations can be expose via a classic MVC pattern with their own views, controllers and models/services as needed.

- See the BaseIntegration class at ./src/integrations/BaseIntegration.ts

- See the EngagedMDIntegration sub class at ./src/integrations/engagedmd/EngagedMDIntegration.ts

- See an implementation of the Engaged MD sub class at ./src/mvc/integrations/engagedmd/engagedmd.service.ts -- Line 28


### Integration Maintenance & Ownership
Integrations with external systems requires that both parties have agreed upon "contracts" for api communication, sla, etc. That said the team integrating the external system into the core system own the following:
- Ensuring that credentials for API or other connections are stored and used in a secure way
- Ensure that any PII is handled appropriately (encrypted in transit and at rest)
- Enuring that that SLAs and rate limits are being adhered to as the integration is used
- Ensure that sufficient error handling and logging are in place so that if/when an issue with an integration arises that we have the necessary technical details (logs, stack traces, metrics) to work with the integration owner to resolve the issue quickly. 
- Ensuring that the core system is secure (credential securing, network hosting level security, deal with cves in dependencies as as they arise, address static analysis concerns before merging. esp. security concerns)