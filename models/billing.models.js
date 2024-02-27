const mongoose = require('mongoose');
const moment = require('moment');

function formatDate(date) {
    return moment(date).format('DD-MM-YYYY');
}


// Create Schema;
const billingSchema = new mongoose.Schema({
    billingdate:{
        type: Date, 
        default: Date.now,
       get: formatDate
    },
    customerid:{
        type: Number,
        required: true,
    },
    customername:{
    type: String,
    required: true,
    trim: true
    },
    productid:{
        type: Number,
        required: true,
    },
    productname:{
        type: String,
        required: true,
        trim: true
        },   
    quantity:{
        type: Number,
        required: true,
    },
    unitprice:{
            type: Number,
            required: true,
        },
    totalprice:{
            type: Number,
            required: true,
        }
        
})
mongoose.pluralize(null);
//mongoose.model("employee", employeeSchema, { collection: 'myEmployee' } ) 
module.exports = mongoose.model('Billing', billingSchema);