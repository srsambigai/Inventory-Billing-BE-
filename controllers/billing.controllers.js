const billing = require("../models/billing.models");
const products= require("../models/products.models")
const stocks= require("../models/stock.models")
async function updateProductQuantity(pId,pQuantity,quantityupdation) {
    try {
        //console.log("Update Product Quantity");
           
        const productDetails= await products.findOne({productid:pId });
       // console.log("product id",pId);
       // console.log("productDetails.quantity",productDetails.quantity);
        if(quantityupdation=="SubProduct Quantity")
        {
           // console.log("sub",productDetails.quantity,"-",pQuantity);
        productDetails.quantity=productDetails.quantity-pQuantity;
      //  console.log("productDetails.quantity1",productDetails.quantity);
        }
        if(quantityupdation=="AddProduct Quantity")
        {
        productDetails.quantity=productDetails.quantity+pQuantity;
       // console.log("productDetails.quantity2",productDetails.quantity);
        } 
       // productDetails.quantity=productDetails.quantity-pQuantity;
        if (productDetails.quantity>=0) {
        products.findOneAndUpdate({productid:productDetails.productid},productDetails)
            .then((data) => {
              console.log("Product Quantity Updated");
            })
            .catch((error) => {
                console.log("Error while updating Product Quantity");
              });
        } else {
          console.log("Unable to update product quantity")
          }
          return productDetails.quantity;
        }catch (error) {
        console.log("Error while updating Product Quantity");
        }
      }


exports.addBilling = async(req, res) => {
    try {
      //  console.log("*********Add Billing **********");
      const payload = req.body;
      const newBilling = new billing(payload);
      const productDetails= await products.findOne({productid:newBilling.productid});
      const stockDetails= await stocks.findOne({productid:newBilling.productid});
    //  console.log("Billing Date",newBilling.billingdate);
      if(productDetails !=null){
     const updatedquantity=await updateProductQuantity(newBilling.productid,newBilling.quantity,"SubProduct Quantity");
  //   console.log("updatedquantity",updatedquantity);
     if(updatedquantity>=0){
       newBilling.unitprice=productDetails.unitprice;
    //   console.log("Auto unitprice",newBilling.unitprice);
       newBilling.totalprice=newBilling.quantity*newBilling.unitprice;
       stockDetails.currentstock=updatedquantity;
       stockDetails.unitsold=stockDetails.productinventory-stockDetails.currentstock;
      newBilling
        .save()
        .then((data) => {
          res.status(201).send({
            message: "Billing has been added successfully.",
            data:newBilling
          });
        })
        stocks.findOneAndUpdate({productid:stockDetails.productid},stockDetails)
            .then((data) => {
              console.log("Stock has been Updated");
            })
        .catch((error) => {
          res.status(400).send({
            message: "Error while adding a new Billing.",
          });
        });
    }else {
        res.status(400).send({
            message: "Product quantity is not enough",
          });
} }
    else {
        res.status(400).send({
            message: "Product is not available to add in billing",
          });
    }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  };

   exports.updateBilling = async (req, res) => {
    try {
   //   console.log("Update Billing");
      //let customerId = req.params.customerid;
      //let productId=req.params.productid;
      //let billingDate=req.params.billingdate;
      let id=req.params._id;
      let payload = req.body;
         
      //const billingDetails= await billing.findOne({customerid:customerId,productid:productId,billingdate:billingDate});
      const billingDetails=await billing.findOne({_id:id});
  //    console.log(billingDetails);
      
      if (billingDetails) {
     //   console.log("billingDetails._id",billingDetails._id);
        // billing.findOneAndUpdate({customerid:billingDetails.customerid,productid:billingDetails.productid,billingdate:billingDate}, payload)
      let quantityupdation="";
      let updatedquantity=0;
      let sendingquantity=0;
   //   console.log("billingDetails.quantity",billingDetails.quantity);
  //    console.log("payload.quantity",payload.quantity);
        if(payload.quantity<billingDetails.quantity){
            quantityupdation="AddProduct Quantity";
            sendingquantity=billingDetails.quantity-payload.quantity;
          //  console.log(quantityupdation);
            updatedquantity=await updateProductQuantity(billingDetails.productid,sendingquantity,quantityupdation);
   //  console.log("updatedquantity",updatedquantity);
       }
       else if(payload.quantity>billingDetails.quantity)
       {
        sendingquantity=payload.quantity-billingDetails.quantity;
        quantityupdation="SubProduct Quantity";
   //     console.log(quantityupdation);
         updatedquantity=await updateProductQuantity(billingDetails.productid,sendingquantity,quantityupdation);
  //   console.log("updatedquantity",updatedquantity);
       }
       const productDetails= await products.findOne({productid:payload.productid});
  //     console.log("payload.quantity",payload.quantity);
       payload.unitprice=productDetails.unitprice;
  //     console.log("payload.unitprice",payload.unitprice);
       payload.totalprice=payload.quantity*payload.unitprice;
   //    console.log("updatedquantity",updatedquantity);
       const stockDetails= await stocks.findOne({productid:productDetails.productid}); 
       stockDetails.currentstock=updatedquantity;
       stockDetails.unitsold=stockDetails.productinventory-stockDetails.currentstock;      
     billing.findOneAndUpdate({_id:billingDetails._id},payload)   
       .then((data) => {
            res.status(200).send({
              message: "Billing information has been updated successfully.",
              data:billingDetails
            });
          })
          stocks.findOneAndUpdate({productid:stockDetails.productid},stockDetails)
            .then((data) => {
              console.log("Stock has been Updated");
            })
          .catch((error) => {
            res.status(400).send({
              message: "Error while updating Billing",
            });
          });
      } else {
        return res.status(400).send({
          message: "Billing with given id doesnot exist.",
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  };  
  
  exports.deleteBilling = async (req, res) => {
    try {
       // let customerId = req.params.customerid;
        //let productId=req.params.productid;
      //let billingDate=req.params.billingdate;
      let id=req.params._id;
 //     console.log("delete billing");
  
     //const existingBilling = await billing.findOne({customerid:customerId,productid:productId,billingdate:billingDate});
   const existingBilling = await billing.findOne({_id:id});
 //    console.log("existing Billing",existingBilling);
      if (existingBilling) {
 //       console.log("existingBilling",existingBilling._id);
       //billing.findOneAndDelete({customerid:existingBilling.customerid,productid:existingBilling.productid,billingdate:existingBilling.billingdate})
       billing.findOneAndDelete({_id:existingBilling._id}) 
       .then((data) => {
      //      console.log("1");
            return res.status(200).send({
              message: "Billing has been deleted successfully.",
            });
          })
          .catch((error) => {
       //     console.log("2");
            return res.status(400).send({
              message: "Error while deleting billing.",
            });
          });
      } else {
      //  console.log("3");
        return res.status(400).send({
          message: "Billing with given id doesnot exist.",
        });
      }
    } catch (error) {
  //      console.log("4");
      res.status(500).send({
        message: "Internal Server Error",
        data:error
      });
    }
  };

  exports.getAllBilling= async (req, res) => {
    try {
      // To get data from DB;
  //    console.log("***********List Billing**********");
      let billingList = await billing.find();
   //   console.log("Billing List",billingList);
      if (billingList) {
        return res.status(200).send({
          message: "Billing have been retrieved successfully.",
          data: billingList,
        });
      }
   return res.status(400).send({
        message: "Error while retrieving billing.",
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  };

  