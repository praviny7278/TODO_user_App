const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bioRoutes = require('./routes/biorouts');

const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use("/user", bioRoutes);


// Start the server
app.listen(process.env.PORT, async () => {
    try {
        await mongoose.connect(process.env.DATABSE_URL);
        console.log('connected succesfully to db.');
    } catch (error) {
        console.log(error);
    }
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
