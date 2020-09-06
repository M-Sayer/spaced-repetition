# Spaced Repetition

### Project by Muhajir Sayer and Matthew R.

Live Link:
https://spaced-repetition-brown.vercel.app/

Heroku Link:
https://secret-brushlands-54692.herokuapp.com/

GitHub Client Link:
https://github.com/M-Sayer/spaced-repetition

GitHub API Link:
https://github.com/M-Sayer/spaced-repetition-api

Users can register an account which will save thier progress.

Users can login and learn French using thier user name and password.

Users learn new words through spaced-repetition.

_________________________________________________________________________
_________________________________________________________________________

## Screenshots

Spaced Rep:
![Spaced-Repetition Screenshot: Dash](https://github.com/MattDizzle/favicon-host/blob/master/GIF-200906_142043.gif?raw=true)

Dash:
![Spaced-Repetition Screenshot: Dash](https://github.com/MattDizzle/favicon-host/blob/master/Dash.JPG?raw=true)

Login:
![Spaced-Repetition Screenshot: Login](https://github.com/MattDizzle/favicon-host/blob/master/Login.JPG?raw=true)

Learn:
![Spaced-Repetition Screenshot: Learn](https://github.com/MattDizzle/favicon-host/blob/master/Learn.JPG?raw=true)

Registration:
![Spaced-Repetition Screenshot: Registration](https://github.com/MattDizzle/favicon-host/blob/master/Registration.JPG?raw=true)


## About the Technology Stack

Front-end technologies:

HTML5, CSS3, Javascript, React, JSX

Server technologies:

​Express, Morgan, Helmet, Path, JsonWebToken, XSS, pg, Dotenv, Cors, Postgrator, Supertest

Data Persistence:

PostgreSQL

Hosting/SaaS:
Vercel
Heroku

​Development Environment

Node.js

## Setup

To setup the application

1. Fork and clone the project to your machine
2. `npm install`. This will also install the application _Cypress.io_ for running browser integration tests

The project expects you have the Spaced repetition API project setup and running on http://localhost:8000.

Find instructions to setup the API here https://github.com/Thinkful-Ed/spaced-repetition-api.

## Running project

This is a `create-react-app` project so `npm start` will start the project in development mode with hot reloading by default.

## Running the tests

This project uses [Cypress IO](https://docs.cypress.io) for integration testing using the Chrome browser.

Cypress has the following expectations:

- You have cypress installed (this is a devDependency of the project)
- You have your application running at http://localhost:3000.
  - You can change the address of this expectation in the `./cypress.json` file.
- Your `./src/config.js` is using http://localhost:8000/api as the `API_ENDPOINT`

To start the tests run the command:

```bash
npm run cypress:open
```

On the first run of this command, the cypress application will verify its install. Any other runs after this, the verification will be skipped.

The command will open up the Cypress application which reads tests from the `./cypress/integration/` directory. You can then run individual tests by clicking on the file names or run all tests by clicking the "run all tests" button in the cypress GUI.

Tests will assert against your running localhost client application.

You can also start all of the tests in the command line only (not using the GUI) by running the command:

```bash
npm run cypress:run
```

This will save video recordings of the test runs in the directory `./cypress/videos/`.
