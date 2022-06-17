const express = require("express");
const bodyParser = require("body-parser");
const StockRouter = require("./routers/stock.js");
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors({ origin: ['http://localhost:8081'], }));
//to router
app.use("/stock", StockRouter);
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

