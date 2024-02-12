const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO_URL);
// mongoose.connect('mongodb://127.0.0.1:27017/polling')
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