const mongoose = require('mongoose');

const optionSchema= new mongoose.Schema(
    {
        name:
        {
            type: String,
            
        },
        
        votes:
        {
            type:Number,
        },

        vote_link:
        {
            type:String
        },
        question_ref:
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:'Question'
        }
    },
    {
        timestamps: true,
    })

    const Option = mongoose.model('Option', optionSchema);
    module.exports= Option