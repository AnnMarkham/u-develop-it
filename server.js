
const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const inputCheck = require('./utils/inputCheck');

//express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Connect to database
const db = new sqlite3.Database('./db/election.db', err =>{
  if(err){
    return console.error(err.message);
  }
  console.log(`Connected to the election database.`);
});

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

//GET ALL CANDIDATES --sends all candidates data as json object to the browser
// use  http://localhost:3001/api/candidates to test.
app.get('/api/candidates',(req,res) => {
  const sql=`SELECT * FROM candidates`;
  const params = [];
  db.all(sql, params, (err,rows) => {
    if(err){
      res.status(500).json({ error: err.message});
      return;
    }
    res.json({
      message: `success`,
      data: rows
    });
  });
});

//TEST GET SINGLE CANDIDATE database call (temporarily hardcode id to 1, 10, -10 during dev and test -- later set to a variable -- replace when add api route to db call below
// db.get(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//   if(err) {
//     console.log(err);
//   }
//   console.log(row);
// });

//GET A SINGLE CANDIDATE API route and database call // use  http://localhost:3001/api/candidates to test.
app.get('/api/candidate/:id', (req, res) => {
  const sql = `SELECT * FROM candidates 
               WHERE id = ?`;
  const params = [req.params.id];
  db.get(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }

    res.json({
      message: 'success',
      data: row
    });
  });
});

//TEST DELETE A CANDIDATE database call replace when add api route to db call below
// db.run(`DELETE FROM candidates WHERE id = ?`, 1, function(err, result) {
//   if (err) {
//     console.log(err);
//   }
//   console.log(result, this, this.changes);
// });

//DELETE A CANDIDATE ROUTE
app.delete('/api/candidate/:id', (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];
  db.run(sql, params, function(err, result) {
    if (err) {
      res.status(400).json({ error: res.message });
      return;
    }

    res.json({
      message: 'successfully deleted',
      changes: this.changes
    });
  });
});
// Create a candidate
app.post('/api/candidate', ({ body }, res) => {
  const errors = inputCheck(body, 'first_name', 'last_name', 'industry_connected');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }


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

const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) 
              VALUES (?,?,?)`;
const params = [body.first_name, body.last_name, body.industry_connected];
// ES5 function, not arrow function, to use `this`
db.run(sql, params, function(err, result) {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }

  res.json({
    message: 'success',
    data: body,
    id: this.lastID
  });
});
});




//Default response for any other request (Not Found) Catch all
app.use((req,res) =>{
  res.status(404).end();
});

//Event Handler - Start server after DB connection
db.on('open',() => {
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
});
});