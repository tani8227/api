const express = require('express');
const router = express.Router();
const questionController= require('../../../controllers/question_controller')
const optionController = require('../../../controllers/option_controller')


router.get('/', questionController.getAllquestion);
router.post('/create', questionController.createQuestion);
router.get('/:id', questionController.displayQuestion);
router.delete('/:id/delete', questionController.deleteQuestion);



router.post('/:id/options/create',optionController.createOption);



module.exports= router; 