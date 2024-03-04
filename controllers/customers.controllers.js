const customers = require("../models/customers.models");

exports.addCustomers= async(req, res) => {
    try {
      const payload = req.body;
      const newCustomer = new customers(payload);
      // console.log("New Customer",newCustomer);
      newCustomer
        .save()
        .then((data) => {
          res.status(201).send({
            message: "Customer has been added successfully.",
            data:newCustomer
          });
        })
        .catch((error) => {
          res.status(400).send({
            message: "Error while adding a new Customer.",
          });
        });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  };

  exports.updateCustomers = async (req, res) => {
    try {
  //    console.log("Update Customers");
      let customerId = req.params.customerid;
      let payload = req.body;
         
      const customerDetails= await customers.findOne({customerid:customerId });
   //   console.log(customerDetails);
      
      if (customerDetails) {
        customers.findOneAndUpdate({customerid:customerDetails.customerid}, payload)
          .then((data) => {
            res.status(200).send({
              message: "Customer information has been updated successfully.",
              data:customerDetails
            });
          })
          .catch((error) => {
            res.status(400).send({
              message: "Error while updating Product",
            });
          });
      } else {
        return res.status(400).send({
          message: "Product with given id doesnot exist.",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  };
  
  exports.deleteCustomer = async (req, res) => {
    try {
      let customerId = req.params.customerid;
  
      const existingCustomer = await customers.findOne({customerid:customerId});
  
      if (existingCustomer) {
        customers.findOneAndDelete({customerid:existingCustomer.customerid})
          .then((data) => {
            return res.status(200).send({
              message: "Customer has been deleted successfully.",
            });
          })
          .catch((error) => {
            return res.status(400).send({
              message: "Error while deleting product.",
            });
          });
      } else {
        return res.status(400).send({
          message: "Product with given id doesnot exist.",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  };

  exports.getAllCustomers = async (req, res) => {
    try {
      // To get data from DB;
 //     console.log("***********List Customers**********");
      let customerList = await customers.find();
  //    console.log("Customers List",customerList);
      if (customerList) {
        return res.status(200).send({
          message: "Customers have been retrieved successfully.",
          data: customerList,
        });
      }
   return res.status(400).send({
        message: "Error while retrieving Customers.",
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  };

  