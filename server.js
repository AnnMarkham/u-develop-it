
// const sqlite3 = require('sqlite3').verbose();  -- Moved to database.js

const express = require('express');
const db = require('./db/database');

const PORT = process.env.PORT || 3001;
const app = express();

const apiRoutes = require('./routes/apiRoutes');
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use apiRoutes
app.use('/api', apiRoutes);

// Default response for any other request(Not Found) Catch all other
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});



// Connect to database  -- moved CONNECT CODE TO DATABASE.JS
// const db = new sqlite3.Database('./db/election.db', err => {
//   if (err) {
//     return console.error(err.message);
//   }

//   console.log('Connected to the votes database.');
// });

// TEST CODE TO see this result on http://localhos3001
// app.get('/', (req,res) =>{
//   res.json({
//     message: 'Hello'
//   });
// });

// TEST CONNECTION TO SQLITE DATABASE (RETRIEVES ALL DATA IN CANDIDATES TABLE)
// db object is using all() method to execute callback function that captures response in variables err & rows 
// { id: 8; first_name: 'Montague, last_name: 'summers',... should appear in the console for each row.} i.e returns an array of objects. 
//(this method allows SQL commands to be written in a Node.js application)
//   db.all(`SELECT * FROM candidates`, (err, rows) => { 
//  console.log(rows);
// }); 

//*************************************
// ******** Candidate routes **********
//     Moved to candidtateRoutes.js
//*************************************

//TEST GET SINGLE CANDIDATE database call (temporarily hardcode id to 1, 10, -10 during dev and test -- later set to a variable -- replace when add api route to db call below
// db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if(err) {
//     console.log(err);
//   }
//   console.log(row);
// });



//CREATE A CANDIDATE
//assign sql command and sql parameters to make the function call more legible
//use INSERT INTO COMMAND to add the values that are assigned to params
// const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected) 
//               VALUES (?,?,?,?)`;
//   //the 4 placeholders must match the 4 values in params so we must use an array
//   const params = [1, 'Ronald', 'Firbank', 1];
//   //ES5 Function instead of Arrow Function to use this.
//   db.run(sql, params, function(err, result) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result, this.lastID);
// });



//update candidate's party -- moved to candidateRoutes.js


//TEST DELETE A CANDIDATE database call replace when add api route to db call below
// db.run(`DELETE FROM candidates WHERE id = ?`, 1, function(err, result) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result, this, this.changes);
// });


//DELETE A CANDIDATE ROUTE -- Moved to candidateRoutes.js


//*************************************
// *********** Party routes ***********
//       MOVED TO PARTYROUTES.JS
//*************************************

//ROUTE FOR GET ALL PARTIES



//ROUTE FOR A SINGle PARTS  -- NOTe THIS INCLUDES AND ID PARAMETER


//REMOVE A ROW FROM PARTIES TABLE -- Also use normal function syntax for db.run() callback instead of arrow so can use this.


//*************************************
// *********** Voter routes ***********
//*************************************


//Default response for any other request (Not Found) Catch all
