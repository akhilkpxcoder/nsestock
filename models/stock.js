const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const StockSchema = new Schema({
  Name: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("NseStocks", StockSchema);