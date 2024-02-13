const Option = require('../model/option');
const Question = require('../model/question')
require('dotenv').config()
const vote_path = process.env.VOTE_PATH;

module.exports.createOption = async function (req, res) 
{

    const question = await Question.findById(req.params.id)
    if (question)
        {
         const optioncreated = await Option.create(
            {
                name:req.body.name,
                votes:req.body.votes,
                question_ref: question.id,

            })
         
            if (optioncreated) 
            {
                
                optioncreated.vote_link = vote_path + '/' + optioncreated.id + '/' + 'add_vote';
                  
                 await optioncreated.save();
            
            
                    question.options.push(optioncreated);
                    const savedquestion = await question.save();
            
                if (savedquestion) 
                {
                    return res.status(200).json(
                        {
                            message: "option created successfully !!",
                            option: question,
                        })
                }
            }
             else 
            {
                return res.status(500).json(
                    {
                        message: " error in creating the option !!",

                    })
            }

        }
       else
       {
          return res.status(500).json(
            {
                message: " question not found !!",

            })
       }
}



module.exports.deleteOption = async function (req, res) {
    try {


        const optionId = req.params.id;
        const deletedOption = await Option.findByIdAndDelete({ _id: optionId });
        const questionId=deletedOption.question_ref;
        const updatedOption = await Option.find({ question_ref : questionId});
        const question = await Question.findOne({_id:questionId});

        
        // console.log(question)
        console.log(updatedOption)
        if (deletedOption) {
           
            question.options = updatedOption;

            await question.save();
            return res.status(200).json({
                message: "option deleted from both collections.",
                question:question,
            })
        } else {
            console.log("Question update failed.");
            return res.status(200).json({
                message: "Option deleted from 'Option' collection, but not from 'Question' collection.",

            })
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json(
            {
                message: " question not found !!",
                Error: err,
            })
    }

}



module.exports.addVote = async function (req, res) {
    try {


        const option = await Option.findById({ _id: req.params.id });
    

        if (option) {
          
            const question= await Question.findOne({_id : option.question_ref})
           
            const updatedOption = await Option.findByIdAndUpdate({ _id: req.params.id },
                {
                    $inc: { votes: 1 }
                },

                {
                    new: true,
                });
               const newOps = await Option.find({question_ref:option.question_ref});

    
          
                
               
            question.options = newOps;

            
           
            await question.save();
           
        
         
            return res.status(200).json(
                {
                    message: "vote added successfully !!",
                    question:question ,
                })

        }

    } catch (err) {
        console.error(err);
        return res.status(500).json(
            {
                message: "Internal Server Error",
            });
    }

}

