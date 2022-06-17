const express = require("express");
const auth = require('../middleware/jwt-auth');

const {getStocks} = require("../controllers/stock.js");
const router = express.Router();
const {sign_in, register, loginRequired} =require("../controllers/authentication.js");

router.get("/:Name",function(req ,res,next){return loginRequired(req,res,next);}, getStocks);
router.post("/signin", function(req, res){return sign_in(req,res)});
router.post("/signup", function(req, res){return register(req,res)})
module.exports = router;