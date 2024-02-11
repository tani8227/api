const express = require('express');
require('dotenv').config()
const port =process.env.PORT;
const app = express();
const path= require('path');
const mongoose= require('./config/mongoose');





app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended:true}));

app.use('/', require('./routes'));

app.listen(port, function(err)
{
     if(err)
     {
        console.log('error in running the server');
     }
   console.log('server is running on port:', port);
})

