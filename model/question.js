const mongoose = require('mongoose');


const questionSchema=  new mongoose.Schema(
    {
      
        content:
        {
            type:String,
            required:true,

        },

        options: [],
    },

    {
        timestamps:true,
    })




    const Question= mongoose.model('Question', questionSchema);
    module.exports= Question;