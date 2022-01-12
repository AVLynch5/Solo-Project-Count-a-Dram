# **Count A Dram** 

<p align="center" width="100%">
<img src="./public/android-chrome-192x192.png" width="33%" >
</p>

## Description
---

_Duration: Two-week Sprint_

<p>Yes, "real" whiskey (not containing sweeteners or flavor additives) is free of carbohydrates. Unfortunately, that doesn't mean it's calorie-free as well.</p>

<p>Introducing Count A Dram, a convenient application built to help users calculate, view, and analyze their calories consumed from whiskey.</p>

<p>Without logging in, users can access the 'Add a Dram' page and calculate the calories in their favorite dram using the whiskey proof and quantity (fl. oz).</p>

<p>However, registered users gain the ability to save their calculated drams. The 'View Drams' feature allows users to view, edit, and delete saved drams by date. The 'Analyze Drams' feature allows users to select a range of dates and view their daily total calories and drams (fl. oz) in an easy-to-read bar chart.</p>

<p>The application was designed for use on laptops and desktops, but its components are responsive and perfectly functional on mobile devices as well.</p>

##### <i>**Disclaimer - This app does not require or promote the consumption of whiskey or other alcoholic beverages. Any persons using this application should be aware and respectful of their local liquor laws. Water is calorie-free!**</i>

## Pre-requisites
---

* Internet Browser (tested on Chrome and Safari)
* Node.js
* PostgreSQL

## Installation
---

* Instead of installing this application, consider using a deployed version [here](https://salty-atoll-39139.herokuapp.com/#/).
1. Fork and clone this repository.
2. Using your favorite method, create a database named 'count_a_dram'. Copy the SQL query code from database.sql (located in the project root directory) and run it in the newly-created database.
3. In terminal, run 'npm install' to download and install all required project dependencies.
4. In terminal, run 'npm run server' to start the project server.
5. In a separate terminal window, run 'npm run client' to start the project client.
6. If the application does not launch automatically, open a browser tab and access the application at 'localhost:3000/'.

## Technologies
---

* Material-UI (including icons)
* Chart.js
* Chart.js Annotation Plugin
* React-Chartjs-2
* Axios
* Express 
* Moment.js
* Passport
* PostgreSQL
* React
* Redux
* Redux-Saga
* SweetAlert
* Wojtekmaj's React-Calendar 

## Acknowledgements 
---

<p>First, I'd like to thank the folx at [Prime Digial Academy](www.primeacademy.io) for making this possible. Without my instructors, in particular Chris Black, I never would have had the knowledge or tools to build an application like this. Furthermore, my endless thanks to the Proth cohort for their constant support, assistance, and companionship. We've had an amazing journey! </p>

## Technical Support
---

<p> For assistance with any questions or issues related to this application, please contact me using one of the methods below.

* [Email](mailto:anthonyvlynch5@gmail.com)
* [Github](https://github.com/AVLynch5)
* [LinkedIn](https://www.linkedin.com/in/anthony-lynch-a33235155/)

## Checklist
---

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
- [ ] Theming/Stlying with MUI
  - [ ] about/user page drams should be centered in grids, w/ responsive image resizing
  - [ ] Buttons, TextFields, Paper, Grid, icons
  - [ ] In-line sx prop styling
- [ ] React-Chartjs-2 annotation styling -> dashed horizontal lines, thinner labels, find a way to prevent overlap
- [ ] README.MD NEEDS SOME LOVE - Add pictures w/ details or gifs!
- [ ] Add presentation data to database 
- [ ] ChartJS responsive chart - responsive text resizing w/ page resize (STRETCH)
- [ ] Edit MUI styles to change TextField label focused text color
- [ ] Delete info page and remove info page comment form nav
  - [ ] see [source1](https://mui.com/customization/how-to-customize/) and [source2](https://smartdevpreneur.com/override-textfield-border-color-in-material-ui/)
- [ ] MUI adornments for text fields - adding 'oz' unit to quantity field
- [ ] Clean up 'Add A Dram' Textfield styling -> code currently messy b/c all styling done in-line with sx prop. Instead, use MUI's 'styled()' utility to create a reusable styled TextField. See About page and footer page!
- [ ] Goal: increase responsiveness - text/header resizing for mobile/tablet/desktop viewing
- [ ] Goal: condense component menu to hamburger menu for mobile/tablet viewing
- [ ] Retroactive date addition - users can specify a (past) date & time when dram adding a dram. Partially styled.
- [ ] Goal: Modify Add A Dram component styling. Issue - Calories field/ textfields look too much like buttons. Idea - change button styling. Highlight Add this Dram button.
