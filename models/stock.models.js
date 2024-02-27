const mongoose = require('mongoose');


// Create Schema;
const stockSchema = new mongoose.Schema({
    productid:{
        type: Number,
        required: true,
    },
    productname:{
        type: String,
        required: true,
        trim: true
    },
    productinventory:{
        type: Number,
        required: true,
    },
    unitsold:{
        type: Number,
        required: true,
    },
    currentstock:{
        type: Number,
        required: true,
    }   
})
mongoose.pluralize(null);
//mongoose.model("employee", employeeSchema, { collection: 'myEmployee' } ) 
module.exports = mongoose.model('Stocks', stockSchema);