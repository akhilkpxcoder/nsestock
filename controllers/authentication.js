const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const url = "mongodb+srv://root:1234@nsestocks.sxt8n6q.mongodb.net/nsedb";

const register = async (req, res, next)=> {
  const newUser = new User(req.body);
  console.log(req.body.password);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function(err){
    if(err){
         console.log(err);
         return;
    }
   var user = newUser;
   user.hash_password =undefined;
   return res.json({user: user });
});

};

  const loginRequired = async(req, res, next)=> {
    if (req.user) {
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized user!!" });
    }
  };

const sign_in = async(req, res,next) => {
   User.findOne(
   {
     email: req.body.email,
   },
   function (err, user) {
    console.log(user,"m")
     if (err) throw err;
     if (!user || !user.comparePassword(req.body.password)) {
       return res
         .status(401)
         .json({
           message: "Authentication failed. Invalid user or password.",
         });
     }
     return res.json({
       token: jwt.sign(
         { email: user.email, fullName: user.fullName, _id: user._id },
         "RESTFULAPIs"
       ),
     });
   }
 );
};
module.exports = {sign_in ,register,loginRequired};
