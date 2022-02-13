const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const fs = require('fs');
const path = require('path');
//add code to require the express package
const express = require("express");
// create a route that the front end can request data from
const { animals } = require("./data/animals");

// set an environment variable, use this port, if se, or default to PORT 80
const PORT = process.env.PORT || 3001;

// add code to instantiate the server
const app = express();
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);




// chain the listen methods to the server
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
