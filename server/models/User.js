const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:           {type: String, required: true},
    email:          {type: String, required: true, unique: true},
    password:       {type: String, required: true},
    location:       {type: String, required: true},
    created_date:   {type: Date, default: Date.now},
    modified_date:  {type: Date, default: Date.now}
});

const User = module.exports = mongoose.model("User", userSchema);