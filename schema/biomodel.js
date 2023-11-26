const mongoose = require('mongoose');

const bioSchema = mongoose.Schema({
    name: String,
    age: String,
    city: String,

})

const bioModel = mongoose.model("User_data", bioSchema);
module.exports = bioModel;