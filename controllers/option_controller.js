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
                
                optioncreated.vote_link = vote_path + '/' + optioncreated.id + '/' + 'addvote';
        
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
        const optionId = req.params.optid;
        const questionId = req.params.id;
        const deletedOption = await Option.findByIdAndDelete({ _id: optionId });
        const question = await Question.findById({ _id: questionId });
        if (question) {
            const allOps = question.options;
            const newOps = allOps.filter((obj) => {
                return obj._id != optionId;
            })
            // console.log(newOps);
            question.options = newOps;

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


        const option = await Option.findById({ _id: req.params.optid });
    

        if (option) {
          
            const question= await Question.findOne({_id : option.question_ref})
           
            const updatedOption = await Option.findByIdAndUpdate({ _id: req.params.optid },
                {
                    $inc: { votes: 1 }
                },

                {
                    new: true,
                });
               const newOps = await Option.find({question_ref:option.question_ref});

    
            //    console.log(newOps);
                
               
            question.options = newOps;

            
           
            await question.save();
            // console.log(question)
             
          const allQuestions= await Question.find({});
         
            return res.status(200).json(
                {
                    message: "vote added successfully !!",
                    question:allQuestions ,
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

