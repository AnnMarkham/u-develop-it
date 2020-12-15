const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

//express middleware
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// see this result on http://localhos3001
app.get('/', (req,res) =>{
  res.json({
    message: 'Hello'
  });
});

//Default response for any other request (Not Found) Catch all
app.use((req,res) =>{
  res.status(404).end();
});


// if listener runs correctly will see this note in the console.
app.listen(PORT, () =>{
  console.log(`Server running on port ${PORT}`)
});