const mongoose = require('mongoose');


// Create Schema;
const customerSchema = new mongoose.Schema({
    customerid:{
        type: Number,
        required: true,
    },
    customername:{
        type: String,
        required: true,
        trim: true
    },
    contactperson:{
        type: String,
        required: true,
        trim: true
    },
    email:{
    type: String,
    required: true,
    trim: true
    },
    phone:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true,
        trim: true
        }   
})
mongoose.pluralize(null);
//mongoose.model("employee", employeeSchema, { collection: 'myEmployee' } ) 
module.exports = mongoose.model('Customers', customerSchema);