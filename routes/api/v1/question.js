const express = require('express');
const router = express.Router();
const questionController= require('../../../controllers/question_controller')
const optionController = require('../../../controllers/option_controller')


router.get('/', questionController.getAllquestion);
router.post('/create', questionController.createQuestion);
router.get('/:id', questionController.displayQuestion);
router.delete('/:id/delete', questionController.deleteQuestion);



router.post('/:id/option/create',optionController.createOption);
router.delete('/:id/option/:optid/delete',optionController.deleteOption);
// router.post('/:id/option/:optid/addvote',optionController.addVote);


module.exports= router; 