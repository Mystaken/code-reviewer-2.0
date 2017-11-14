### Heroku  http://code-reviewer-utsc.herokuapp.com/
1. `ng build --aot --prod`                                 // build the Angular front-end
2. Copy the back-end and the `dist` folder to the Heroku repo.
3. change `../angular-front-end-2/dist` to `./dist` in `app.js`
4. `git push heroku master`


### Tracademic  http://tracademic.utsc.utoronto.ca:3000
1.  `ssh username@142.1.97.144`   // the acount is created by U of T system admin
2.  `cd code-reviewer-2.0`
3.  `git pull`                    // update
4.  `cd angular-front-end-2`
5.  `ng build --env=prod`         // build front-end
6.  `cd ../back-end-API`          
7.  `ps aux | grep username`      // find the process id of running node process
8.  `kill -9 process_id`          // cancel it
9.  `node app.js &`               // start the app in background