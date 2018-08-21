# Code Reviewer 2

Code Reviewer is a online platform for conducting anonymous peer reviews, designed for helping students write better code by learning from their peers.

### Features

- Code Review (review your peers' code anonymously)
- Authentication
- Authorization
- RESTful API
- Single Page App
- Mobile Responsiveness

### Requirements

- Angular 5.0+
- Node 8.11.3+
- MongoDB 3.6+
- Yarn 1.9.4+
- Angular CLI 6.0.8+

### Installation Instructions

```
git clone https://github.com/BoZhaoUTSC/code-reviewer-2.0.git
cd code-reviewer-2.0
cd angular-front-end-2
yarn       // install front-end dependencies in front-end directory
cd ../back-end-API
yarn       // install back-end dependencies in back-end directory
cd ../stimulate-dev-environment
yarn       // optional: install dev environment dependencies
```

#### As a developer

- load dummy data for development
- node server.js in stimulate-dev-environment, then terminate the process after you see "All Done!"

- install this project following above installation instructions
- ng serve in front-end directory, then the front-end will run on localhost: 4200
- node app.js in back-end directory, then the back-end will run on localhost: 3000
- mongod, then MongoDB will start on localhost: 27017

- go to localhost:4200, then you will see the app
- login credentials are in stimulate-dev-environment/load_data.js

### API documentation

https://github.com/BoZhaoUTSC/code-reviewer-2.0/blob/master/back-end-API/doc/routes/route-documentation.md

### More

You can also find Code Reviewer 1 at https://github.com/BrianHarringtonUTSC/code-reviewer
