const stocks = require("../models/stock.models");
exports.getAllStocks = async (req, res) => {
    try {
      // To get data from DB;
      console.log("***********List Stocks**********");
      let stockList = await stocks.find();
      console.log("Stock List",stockList);
      if (stockList) {
        return res.status(200).send({
          message: "Stocks have been retrieved successfully.",
          data: stockList,
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

  