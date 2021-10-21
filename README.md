
# EDA Project
This version uses React, Redux, Express, Passport, and PostgreSQL (a full list of dependencies can be found in `package.json`).

We **STRONGLY** recommend following these instructions carefully. It's a lot, and will take some time to set up, but your life will be much easier this way in the long run.

## Use the Template for This Repository (Don't Clone)

- Don't Fork or Clone. Instead, click the `Use this Template` button, and make a copy to your personal account.


## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database and table

Create a new database called `prime_app` and create a `user` table:

```SQL
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
```

If you would like to name your database something else, you will need to change `prime_app` to the name of your new database name in `server/modules/pool.js`

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

## Debugging

To debug, you will need to run the client-side separately from the server. Start the client by running the command `npm run client`. Start the debugging server by selecting the Debug button.

![VSCode Toolbar](documentation/images/vscode-toolbar.png)

Then make sure `Launch Program` is selected from the dropdown, then click the green play arrow.

![VSCode Debug Bar](documentation/images/vscode-debug-bar.png)

## Testing Routes with Postman

To use Postman with this repo, you will need to set up requests in Postman to register a user and login a user at a minimum.

Keep in mind that once you using the login route, Postman will manage your session cookie for you just like a browser, ensuring it is sent with each subsequent request. If you delete the `localhost` cookie in Postman, it will effectively log you out.

1. Start the server - `npm run server`
2. Import the sample routes JSON file [v2](./PostmanPrimeSoloRoutesv2.json) by clicking `Import` in Postman. Select the file.
3. Click `Collections` and `Send` the following three calls in order:
   1. `POST /api/user/register` registers a new user, see body to change username/password
   2. `POST /api/user/login` will login a user, see body to change username/password
   3. `GET /api/user` will get user information, by default it's not very much

After running the login route above, you can try any other route you've created that requires a logged in user!

## Production Build

Before pushing to Heroku, run `npm run build` in terminal. This will create a build folder that contains the code Heroku will be pointed at. You can test this build by typing `npm start`. Keep in mind that `npm start` will let you preview the production build but will **not** auto update.

- Start postgres if not running already by using `brew services start postgresql`
- Run `npm start`
- Navigate to `localhost:5000`

## Lay of the Land

There are a few videos linked below that show a walkthrough the client and sever setup to help acclimatize to the boilerplate. Please take some time to watch the videos in order to get a better understanding of what the boilerplate is like.

- [Initial Set](https://vimeo.com/453297271)
- [Server Walkthrough](https://vimeo.com/453297212)
- [Client Walkthrough](https://vimeo.com/453297124)

Directory Structure:

- `src/` contains the React application
- `public/` contains static assets for the client-side
- `build/` after you build the project, contains the transpiled code from `src/` and `public/` that will be viewed on the production site
- `server/` contains the Express App

This code is also heavily commented. We recommend reading through the comments, getting a lay of the land, and becoming comfortable with how the code works before you start making too many changes. If you're wondering where to start, consider reading through component file comments in the following order:

- src/components
  - App/App
  - Footer/Footer
  - Nav/Nav
  - AboutPage/AboutPage
  - InfoPage/InfoPage
  - UserPage/UserPage
  - LoginPage/LoginPage
  - RegisterPage/RegisterPage
  - LogOutButton/LogOutButton
  - ProtectedRoute/ProtectedRoute

## Deployment

1. Create a new Heroku project
1. Link the Heroku project to the project GitHub Repo
1. Create an Heroku Postgres database
1. Connect to the Heroku Postgres database from Postico
1. Create the necessary tables
1. Add an environment variable for `SERVER_SESSION_SECRET` with a nice random string for security
1. In the deploy section, select manual deploy

## Update Documentation

Customize this ReadMe and the code comments in this project to read less like a starter repo and more like a project. Here is an example: https://gist.github.com/PurpleBooth/109311bb0361f32d87a2

## Checklist
- [ ] Set up database in Postico. Copy to database.sql and change database name in pool.js
- [ ] Install dependencies (moment, MUI, react-calendar, chart.js, chartjs-2)
- [ ] create .env file in root and change session password
- [ ] Add A Dram component
  - [ ] Basic Form: Name/Proof/Quantity inputs, calculate button, clear button, add dram button
  - [ ] state variable (object) to hold user inputs
  - [ ] Validation function - validate user inputs
  - [ ] Calculate Calories function - calculate calories using user inputs
  - [ ] POST - dispatch object to server 
  - [ ] Create dram router - server REST method
  - [ ] Create dram saga - client axios function
- [ ] View Drams Component (and ViewDramChildren - child of .map)
  - [ ] Import and set up Calendar - clicking date displays date in alert
  - [ ] Create dram reducer and store instance
  - [ ] Saga and server functions - GET dram entries by date, put to reducer
  - [ ] map dram objects in reducer to table
  - [ ] Add edit and delete buttons
  - [ ] Saga and server delete functions - delete by dram ID
  - [ ] 'edit' mode - create state variable (boolean) to toggle true/false
  - [ ] conditional rendering - if edit mode false, display info from dram reducer. If true, display input fields populated w/ reducer info.
  - [ ] conditional rendering - if edit mode false, display edit button. If true, display confirm button.
  - [ ] Add onChange to cond. rend. inputs - changing inputs dispatches changes to dram reducer. Also add actions to dram reducer to update reducer state.
  - [ ] Add validateNums and calcCals functions to validate edited information on confirm button click
  - [ ] also on confirm button click - dispatch modified object (saga function and server-side PUT)
- [ ] Analyze Drams component
  - [ ] Calendar - selectRange prop to select two dates values
  - [ ] dispatch - send both dates and GET all data b/t those two dates (SQL query - GET dates, sum drams, sum calories)
  - [ ] data reducer to hold calorie/dram/date data retrieved from database on calendar click
  - [ ] function to take data from data reducer and reformat for Chart.js - store in state variable
  - [ ] button to call data restructure function
  - [ ] Chart - display restructured data stored in state variable
  - [ ] chart - add annotations - horizontal lines indicating avg #calories and average #drams
- [ ] Add A Dram component accessible w/o logging in - use cond. rend. to display add dram button only if logged in
- [ ] Finalize component access - Which to display w/o login, which to display w/ login (w/o - display Home and Add A Dram, w/ Display all)
- [ ] Finalize components/routing - which components will appear on nav bar
- [ ] Add code comments to ViewDramChild, AnalyzeDrams, and dram.router (POST and PUT)
- [ ] Theming/Stlying with MUI - TBA
- [ ] README.MD NEEDS SOME LOVE
