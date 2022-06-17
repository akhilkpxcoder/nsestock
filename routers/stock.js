const express = require("express");

const auth = require('../middleware/jwt-auth');

const {getStocks} = require("../controllers/stock.js");

const router = express.Router();

router.get("/:Name", getStocks);

module.exports = router;
