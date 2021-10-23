
  
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const puerto = 3000;

//imports
const personRoutes = require('./routes/person-rotes');

//settings
app.set('port', puerto);

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use(personRoutes);


//run
app.listen(app.get('port'), () => {
    console.log('Server on Port 3000')
})