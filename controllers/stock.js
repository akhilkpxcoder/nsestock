//const Stock = require("../models/stock.js");
const mongoose = require("mongoose");
const url = "mongodb+srv://root:1234@nsestocks.sxt8n6q.mongodb.net/nsedb";

const getStocks = async (req, res, next) => {
    try {
      mongoose.connect(url, (err, db) => {
        if (err) throw err;
        db.collection("NseStocks").find({}).toArray((err, result) => {   
          const value =  result.filter(x => x.Name.toLowerCase().startsWith(req.params.Name.toLowerCase()))
          return res.json(value);
        });
      });
    } catch (err) {
      res.status(500).json({
        Message: err.message,
      });
    }
  };
  module.exports = { getStocks};