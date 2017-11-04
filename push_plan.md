1. remove `cors = require('cors'), and app.use(cors())`    // enable all cors requests in app.js
2. `ng build --aot --prod`                                 // build the Angular front-end
3. Copy the back-end and the `dist` folder to the Heroku repo.
4. change `../angular-front-end-2/dist` to `./dist` in `app.js`
5. `git push heroku master`
