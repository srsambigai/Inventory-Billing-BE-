const sales = require("../models/billing.models");
exports.getSalesReport = async (req, res) => {
    try {
        let billingDate = req.params.billingdate;
 //       console.log("billingDate",billingDate);
        const startDate = new Date(billingDate); // Start of the desired date
        startDate.setUTCHours(0, 0, 0, 0); // Set time to start of day
        const endDate = new Date(billingDate); // End of the desired date
        endDate.setUTCHours(23, 59, 59, 999); // Set time to end of day

        // Query for documents within the desired date range
        const query = {
            billingdate: {
                $gte: startDate.toISOString(), // Greater than or equal to start of day
                $lte: endDate.toISOString()  // Less than or equal to end of day
            }
        };
  //      console.log("query",query);

        let salesList = await sales.find(query);
        
      //let salesList = await sales.find({billingdate:billingDate});
      
  //    console.log("Sales List",salesList);
      if (salesList) {
        return res.status(200).send({
          message: "Sales have been retrieved successfully.",
          data: salesList,
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

  