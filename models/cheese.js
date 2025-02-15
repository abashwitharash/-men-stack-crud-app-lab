// models/cheese.js

const mongoose = require("mongoose");

const cheeseSchema = new mongoose.Schema ({
    name: String, 
    isStinky: Boolean,
});

const Cheese = mongoose.model("Cheese", cheeseSchema);

module.exports = Cheese;