const products = require("../models/products.models");
const stocks = require("../models/stock.models");
exports.addProducts = async(req, res) => {
    try {
      const payload = req.body;
      const newProduct = new products(payload);
       console.log("New Product ***",newProduct);
      const productStock={productid:newProduct.productid,
                      productname:newProduct.productname,
                      productinventory:newProduct.quantity,
                      unitsold:0,
                      currentstock:newProduct.quantity};
        console.log("Product Stock ****",productStock);

       const productStock1= new stocks(productStock); 
       console.log("Product Stock1 ****",productStock1);
                      
      newProduct
        .save()
        .then((data) => {
          res.status(201).send({
            message: "Product has been added successfully.",
            data:newProduct
          });
        })
      productStock1
        .save()
        .then((data) => {
          console.log("Stock has been added");
        })
        .catch((error) => {
          res.status(400).send({
            message: "Error while adding a new Product.",
          });
        });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  };

  exports.updateProducts = async (req, res) => {
    try {
      console.log("Update Products");
      let productId = req.params.productid;
      let payload = req.body;
         
      const productDetails= await products.findOne({productid:productId });
      console.log(productDetails);
      const stockDetails= await stocks.findOne({productid:productId });
      console.log("Stock",stockDetails);
      if (productDetails) {
        stockDetails.productinventory=payload.quantity;
        stockDetails.currentstock=payload.quantity;
        products.findOneAndUpdate({productid:productDetails.productid}, payload)
          .then((data) => {
            console.log("1");
            res.status(200).send({
              message: "Product information has been updated successfully.",
              data:productDetails
            });
          })
          stocks.findOneAndUpdate({_id:stockDetails._id},stockDetails)
          .then((data) => {
            console.log("Stock Details",stockDetails);
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
  
  exports.deleteProduct = async (req, res) => {
    try {
      let productId = req.params.productid;
  
      const existingProduct = await products.findOne({productid:productId});
      const stockDetails= await stocks.findOne({productid:productId });
  
      if (existingProduct) {
        products.findOneAndDelete({productid:existingProduct.productid})
          .then((data) => {
            return res.status(200).send({
              message: "Product has been deleted successfully.",
            });
          })
          stocks.findByIdAndDelete({_id:stockDetails._id})
          .then((data) => {
            console.log("Stock Details of the product id has been deleted successfully");
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

  exports.getAllProducts = async (req, res) => {
    try {
      // To get data from DB;
      console.log("***********List Products**********");
      let productList = await products.find();
      console.log("Products List",productList);
      if (productList) {
        return res.status(200).send({
          message: "Products have been retrieved successfully.",
          data: productList,
        });
      }
   return res.status(400).send({
        message: "Error while retrieving products.",
      });
    } catch (error) {
      res.status(500).send({
        message: "Internal Server Error",
      });
    }
  };

  