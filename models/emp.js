const mongoose = require('mongoose');


const labourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type:String,
        require:true
    },
    assignedDate: {
        type: Date,
        required: true,
    },
    lastDate: {
        type: Date,
        required: true,
    },
    work: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        enum: ['Noida', 'Delhi', 'GreaterNoida'],  
        required: true,
    },
    inTime: {
        type: String,  
        
    },
    outTime: {
        type: String,  
        
    },
});


const Labour = mongoose.model('Labour', labourSchema);


module.exports = Labour;