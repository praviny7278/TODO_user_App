const express = require('express');
const bioModel = require('../schema/biomodel');
const bioRoutes = express.Router();

// Find All USERS DATA from database
bioRoutes.get("/", async (req, res) => {
    //res.json("get");
    try {
        const bioData = await bioModel.find();
        res.json(bioData);
        console.log(bioData);
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});

// Find USER DATA by ID from database
bioRoutes.get("/:id", async (req, res) => {
    const bioId = req.params.id
    try {
        const bioData = await bioModel.findOne({_id: bioId});
        res.json(bioData);
    } catch (error) {
        res.send(error);
    }
});

// Add USER DATA to the database
bioRoutes.post("/add", async (req, res)=> {
    try {
        const bioData = new bioModel(req.body);
        await bioData.save();
        res.json(bioData);
    } catch (error) {
        res.send(error);
    }
});

// Update USER DATA by ID in database
bioRoutes.patch("/update/:id", async (req, res) => {
    const bioId = req.params.id;
    const updateBioData = req.body
    try {
        const bioData = await bioModel.findByIdAndUpdate({_id:bioId}, updateBioData);
        res.json(bioData);
    } catch (error) {
        res.send(error);
    }
});

// Delete USER DATA from databse
bioRoutes.delete("/del/:id", async (req, res) => {
    const bioId = req.params.id
    try {
         await bioModel.findByIdAndDelete({_id:bioId})
         res.send("deleted!");
    } catch (error) {
        res.send(error);
    }
});

module.exports = bioRoutes;

