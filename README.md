# Health POC
POC system that integrations with EngagedMD external API

## Design & Considerations
See the SYSTEM.md [SYSTEM.md](SYSTEM.md) file for system design details and considerations

## System Requirements
- PowerShell (only on Windows) / Terminal/bash on MacOS / Linux / Unix
- Docker
  - Required for running local Postgres DB
- NodeJS 22+ ideally via Node Version Manager (NVM)
  - Required for just about everything within the repo

## Local Dev Setup
0. Ensure you have met the system requirements noted above. If using NVM to manage your version of NodeJS, run `nvm use`. If not please ensure that you are running the latest NodeJS LTS version e.g. 22+.
1. Run `npm install` to install the required dependencies
2. Run `npm run  npm run decrypt-env -- %passphrase%` to decrypt and generate the .env file. The value of %phassphrase% can be obtained from the assignment submission note in greenhouse.io, from Deanna Folefac <dfolefac@engagedmd.com> or by emailing Greg Brooks (interviewee) <gb_sea@icloud.com>.
3. Run `npm run start-dev`
4. Open your preferred browser and navigate to `http://localhost:43000/`
5. Login with:
   - Email: test.testerson@testing.com
   - Password: Same passphrase as above in step 2.
6. You can stop the local dev environment using CTRL+C.

### Screenshots
Image of the login view pre-authentication
![Index view](https://res.cloudinary.com/dyf0aokyn/image/upload/v1765178810/Screenshot_2025-12-07_at_23-26-40_Log_in_HealthPOC_dvjhwt.png)


Image of the index view after authentication
![Index view](https://res.cloudinary.com/dyf0aokyn/image/upload/v1765178684/Screenshot_2025-12-07_at_23-24-10_HealthPOC_mgwi3u.png)