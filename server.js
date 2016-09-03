var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');

// --- Middleware --- //



// --- Routing --- //


// --- Server --- //
app.listen(process.env.IP || 3000, () => {
  console.log('Server is listening'); 
})
