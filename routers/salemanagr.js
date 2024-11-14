const express = require('express');
const { Getallemp, AddnewEmp, UpdateEmp, DeleteEmp } = require('../controllers/salemanager');


const router = express.Router();


router.get('/allemp' ,Getallemp ).post('/allemp' ,AddnewEmp ).put('/allemp/:id' , UpdateEmp).delete('/allemp/:id' , DeleteEmp)





module.exports = router