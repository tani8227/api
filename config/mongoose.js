const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;



db.on('error', function()
{
    console.log("error in connecting the db");
})

db.once('open', function()
{
    console.log("succesfully coneecting to the db !!!");

})




module.exports= db;