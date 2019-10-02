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

### How to use this app

```
git clone https://github.com/BoZhaoUTSC/code-reviewer-2.0.git
cd code-reviewer-2.0

// install front-end dependencies in front-end directory
cd angular-front-end-2
yarn

// install back-end dependencies in back-end directory
cd ../back-end-API
yarn

// install dev environment dependencies
cd ../simulate-dev-environment
yarn

// start Mongo server
mongod

// open a new terminal and cd into root/simulate-dev-environment
// this step will create required dummy data for development
node load_data.js

// cd into back-end-API and start backend
node app.js

// open a terminal and cd into root/angular-front-end-2
ng serve

// open your favourite browser and go to localhost:4200
// you'll see the frontend here

// login as an instructor, username: code.reviewer.utsc@gmail.com
// passwords for all dummy users are 1

// now you're logged in as an instructor. then the next step is to load assignments
1.	click on assignments button in the header
2.	click on + add assignment
3.	put a2 in assignment name, repo path and folder name
4.	put 4 under number of peers review
5.	put regex_functions.py under required files
6.	click on the + button beside required files input box
7.	leave all other input boxes blank and click on the submit button
8.	click on manage button
9.	click on load/reload all submissoins & required files
10.	click on distribute/re-distribute a2 to all students
11. close the modal and click to logout
12.	login as a student. username: 1@mail.utoronto.ca
13. click on a2 under assignments
14. click on Peer 1 to see a peer's assignment
```

### API documentation

https://github.com/BoZhaoUTSC/code-reviewer-2.0/blob/master/back-end-API/doc/routes/route-documentation.md

### More

You can also find Code Reviewer 1 at https://github.com/BrianHarringtonUTSC/code-reviewer
