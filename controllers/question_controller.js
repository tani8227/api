const Question= require('../model/question')
const Option= require('../model/option')

module.exports.createQuestion= async function(req, res)
{

    try{ 
    const questionCreated= await Question.create(
        {
            content:req.body.content,
        })

        if(questionCreated)
        {

          
            return res.status(200).json(
                {
                    message:"question created successfully !!",
                    question: questionCreated,
                })
        }
    }
    catch(err)
    {
        return res.status(500).json(
            {
                message:" error in creating the question !!",
                   Error: err,
            })
    }
}




module.exports.getAllquestion = async function(req, res)
{
 
     const allQuestion= await Question.find({})
      

     if(allQuestion)
     {
        return res.status(200).json(
            {
                message:"List Of All Questions !!",
                question: allQuestion,
            })
     }
    
}




module.exports.displayQuestion = async function(req, res)
{
 
     const question= await Question.findById({_id:req.params.id});
     if(question)
     {

        // console.log(question);
        return res.status(200).json(
            {
                message:"question found successfully !!",
                question: question,
            })
     }
    
}

module.exports.deleteQuestion = async function(req, res)
{

    //  console.log(req.params.id);
     const questionId= req.params.id;
     const questiondeleted= await Question.findByIdAndDelete(req.params.id)

     if(questiondeleted)
     {
      


        const deleteAllOption= await Option.deleteMany({question_ref:questionId});

        if(deleteAllOption){ 

        return res.status(200).json(
            {
                message:"question and optins are deleted successfully !!",
                question: questiondeleted,
            })
        }else
        {
            return res.status(200).json(
                {
                    message:" optins not deleted successfully !!",
                    question: questiondeleted,
                }) 
        }

     }   


}