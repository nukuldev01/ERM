const express = require('express');
const {deleteLabour, showAllSalesManagers, addNewSalesManager, updateSalesManager, deleteSalesManager, updateLabour, addNewLabour, showAllLabours} = require("../controllers/admin")


const router = express.Router();



router.get('/managers' , showAllSalesManagers).post('/managers' ,addNewSalesManager ).put('/managers/:id' , updateSalesManager).delete('/managers/:id' , deleteSalesManager)


router.get('/employees' , showAllLabours ).post('/employees' ,addNewLabour ).put('/employees/:id' , updateLabour).delete('/employees/:id' , deleteLabour)






module.exports = router