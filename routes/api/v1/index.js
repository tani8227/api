const express = require('express');
const router = express.Router();
const optionController= require('../../../controllers/option_controller')





router.use('/questions', require('./question'))
router.get('/options/:optid/addvote', optionController.addVote);
router.delete('/options/:optid/delete',optionController.deleteOption);

module.exports= router;