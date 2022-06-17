const express = require("express");
const path = require('path');
const jsonwebtoken = require("jsonwebtoken");
const bodyParser = require("body-parser");
// const StockRouter = require("./routers/stock.js");
const LoginRouter = require("./routers/login.js");
const cors = require('cors');
const { default: mongoose } = require("mongoose");
const url = "mongodb+srv://root:1234@nsestocks.sxt8n6q.mongodb.net/nsedb";

const app = express();
const PORT = 3001;

app.use(bodyParser.json()); 
app.use(cors({ origin: ['http://localhost:3000','*']}));
(async () => {
  try {
    await mongoose.connect(url)
  } catch (err) {
    console.log('error: ' + err)
  }
})()
app.use(function(req, res, next) {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});
app.use(express.static(path.join(__dirname, 'view/build')));
//console.log(path.join(__dirname, 'view/build'));
//to router
// app.use("/stock", StockRouter);
app.use("/api", LoginRouter);
//to home page
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
//not found error
app.all("*", (req, res) => {
  res.status(404);
  res.send("You've tried reaching a route that doesn't exist.");
});

// //db connection
// mongoose.connect(url, (err,db) => {
//   console.log("connected to db");
// });

//server creation
app.listen(PORT, () =>
 console.log(`Server running on port: http://localhost:${PORT}`)
);

