const mongoose = require('mongoose');


// Create Schema;
const productSchema = new mongoose.Schema({
    productid:{
        type: Number,
        required: true,
    },
    productname:{
        type: String,
        required: true,
        trim: true
    },
    productdescription:{
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
    }   
})
mongoose.pluralize(null);
//mongoose.model("employee", employeeSchema, { collection: 'myEmployee' } ) 
module.exports = mongoose.model('Products', productSchema);