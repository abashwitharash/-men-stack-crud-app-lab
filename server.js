const dotenv = require("dotenv"); 
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

//importing cheese model 
const Cheese = require("./models/cheese");

// middleware 
app.use(express.urlencoded({ extended: false }));



// GET /
app.get("/", async (req, res) => {
    res.render("index.ejs");
  });
  
app.get("/cheeses/new", (req, res)=> {
    res.render("cheeses/new.ejs");
});

app.get("/cheeses", async (req, res) => {
    const allCheeses = await Cheese.find();
  res.render("cheeses/index.ejs", { cheeses: allCheeses});
});





// POST /Cheeses
app.post("/cheeses", async (req, res) => {
    if (req.body.isStinky === "on") {
        req.body.isStinky = true;
    } else {
        req.body.isStinky = false;
    }
    await Cheese.create(req.body);
  res.redirect("/cheeses");
});





app.listen(3000, () => {
    console.log("Listening on port 3000");
  });