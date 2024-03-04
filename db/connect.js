const mongoose = require("mongoose"); // Node.js ORM for MongoDB

const db = async () => {
  try {
   // await mongoose.connect('mongodb://localhost:27017/inventorybilling');
   await mongoose.connect('mongodb+srv://inventory:Welcome123@inventory.e3owdwv.mongodb.net/inventory?retryWrites=true&w=majority');
   
   // console.log("Database connection established.");
  } catch (error) {
    console.log("Error while connecting DB: ", error);
  }
};

module.exports = db;