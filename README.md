# Health POC
POC system that integrations with EngagedMD external API

## Design & Considerations
See the SYSTEM.md file for system design details and considerations

## System Requirements
- PowerShell (only on Windows) / Terminal/bash on MacOS / Linux / Unix
- Docker
  - Required for running local Postgres DB
- NodeJS 22+ ideally via NVM
  - Required for just about everything within the repo

## Local Dev Setup
0. Ensure you have met the system requirements noted above. If using nvm to manage your version of NodeJS, run `nvm use`. If not please ensure that you are running the latest NodeJS LTS version e.g. 22+.
1. Run `npm install`
2. Run `npm run  npm run decrypt-env -- %passphrase%`. The value of %phassphrase% can be obtained from the assignment submission note in greenhouse.io, from Deanna Folefac <dfolefac@engagedmd.com> or by emailing Greg Brooks (interviewee) <gb_sea@icloud.com>.
3. Run `npm run start-dev`
4. Open your preferred browser and navigate to `http://localhost:43000/`
5. Login with:
   - Email: test.testerson@testing.com
   - Password: Same passphrase as above in step 2.