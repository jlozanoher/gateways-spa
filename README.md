# Gateways SPA built with React.js & Antd

In this readme yarn is used as the package manager but feel free to use npm.

The automated build procedure is written in .github/workflows folder. This set of actions run in github after every commit.

Once the app is running, just drag and drop the peripherals into the gateways, also, they can be droped back into the peripherals list for detaching. You can create new gateways and peripherals, also update them.

If the database is empty, the app will ask you for populating it with test data (this is an optional step).

## Installation

- Install Node.js (https://github.com/nodesource/distributions/blob/master/README.md#debinstall)
- Clone the repository or unzip the gateways-spa
- cd gateways-spa
- yarn install
- cp .env.example .env

  (Change the api url in the .env file if the node server runs in another ip or port)

- yarn test
- yarn start

## Technologies

- React.js
- Antd as the component library
- TypeScript

## Practical task

### Conditions

You have to prepare a solution to the proposed problem in the defined period of time. The solution must comply with the requirements. For anything not explicitly listed, you are free to choose whatever technology/library/tool you feel comfortable with.

Once ready, you must send a package with the source code of the solution, so it can be built and reviewed by Musala Soft. Instructions how to use the solution must also be provided (resource names, SQL scripts to import test data, other scripts, etc.).
If you have completed the task after the deadline has expired, you are still encouraged to submit a solution.

### Software Requirements

Programming language: JavaScript
Framework: Node.js/JavaScript + Angular/React or other  
Database: MongoDB or in-memory
Automated build: Solution of choice

### Description

This sample project is managing gateways - master devices that control multiple peripheral devices.
Your task is to create a REST service (JSON/HTTP) for storing information about these gateways and their associated devices. This information must be stored in the database.
When storing a gateway, any field marked as “to be validated” must be validated and an error returned if it is invalid. Also, no more that 10 peripheral devices are allowed for a gateway.
The service must also offer an operation for displaying information about all stored gateways (and their devices) and an operation for displaying details for a single gateway. Finally, it must be possible to add and remove a device from a gateway.

**Each gateway has:**

- a unique serial number (string),
- human-readable name (string),
- IPv4 address (to be validated),
- multiple associated peripheral devices.

**Each peripheral device has:**

- a UID (number),
- vendor (string),
- date created,
- status - online/offline.

**Other considerations. Please, provide:**

- Basic UI - recommended or (providing test data for Postman (or other rest client) if you do not have enough time.
- Meaningful Unit tests.
- Readme file with installation guides.
- An automated build.
