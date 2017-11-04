1. `ng build --aot --prod`                                 // build the Angular front-end
2. Copy the back-end and the `dist` folder to the Heroku repo.
3. change `../angular-front-end-2/dist` to `./dist` in `app.js`
4. `git push heroku master`
