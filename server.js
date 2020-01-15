const express = require('express');


const endpoint = require('./routes');

// port has been Set up for server to listen on
const port = process.env.PORT || 3000;
// express used to create a http server
const app = express();

//routes
endpoint(app);

//Message displayed to know if the port is running or not
app.listen(port, () => console.log('working on port ' + port));