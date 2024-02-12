const express = require('express');
const router = express.Router();
const optionController= require('../../../controllers/option_controller')





router.use('/questions', require('./question'))
router.get('/option/:optid/addvote', optionController.addVote);


module.exports= router;