const homeController = require("./controllers/homeController");
const port = 3000;
const express = require("express");

//initialise express
const app = express();

app.use((req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
});

//encodes urls to prevent any routing errors
app.use(
    express.urlencoded({
        extended: false
    })
);

//Handle POST request to the root route "/"
app.post("/", (req, res) => {
  console.log("Body request:", req.body);                 // logs body data
  console.log("Query request:", req.query);               // logs query string (e.g. ?name=John)
  res.send("POST Successful!");
});


//data will be parsed to JSON format
app.use(express.json());

 app.post("/contact", (req, res) => {
 res.send("Contact information submitted successfully.");
 });

app.get("/items/:vegetable", homeController.sendReqParam);

app.post("/", homeController.sendPost);

app.listen(port, () => {
    console.log(`The Express.js server has started and is listening on port number: ${port}`);
});