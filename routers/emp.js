const express = require('express');
const { Getalltask } = require('../controllers/emp');
const { checkAuth } = require('../middleware/Authorization');


const router = express.Router();



router.get('/alltask' , Getalltask)






module.exports = router