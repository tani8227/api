const express = require('express');
const router = express.Router();
const optionController= require('../../../controllers/option_controller')





router.use('/questions', require('./question'))
router.get('/options/:id/add_vote', optionController.addVote);
router.delete('/options/:id/delete',optionController.deleteOption);

module.exports= router;