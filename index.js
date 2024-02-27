require('dotenv').config();
const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');

const productRoutes = require("./routes/products.routes");
const customerRoutes=require("./routes/customers.routes");
const billingRoutes=require("./routes/billing.routes");
const stockRoutes=require("./routes/stock.routes");
const salesRoutes=require("./routes/sales.routes");
const authRoutes=require("./routes/auth.routes");
const db = require("./db/connect");

// Connecting DB
db();

const app = express();
// Enable CORS for all routes
//app.use(cors());
// Enable CORS middleware
app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
  }));
  
  // Handle CORS pre-flight requests
  app.options('*', cors());

app.use(express.json()); // Parsing the req into JSON.
app.use(cookieParser());

app.use("/v1", productRoutes);
app.use("/v1", customerRoutes);
app.use("/v1", billingRoutes);
app.use("/v1", stockRoutes);
app.use("/v1", salesRoutes);
app.use("/v1", authRoutes);

//const PORT = process.env.PORT || 4000;
// Middleware to set authorization header
// app.use("/v1",async (req, res, next) => {
//     // Set your authorization token here
//      const { cookies } = req;
//      const token = cookies.accessToken;
//      console.log("req.headers['authorization']",req.headers['authorization'])
//     //req.headers.authorization = `Bearer ${token}`;
//     //console.log("req",req),
//    next();
//    },billingRoutes);
  
  
app.listen(8001, () => {
    console.log('App is running on port 8001');
})