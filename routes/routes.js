const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const DataModel = require('../models/url.js')
const util = require('../util/utils')

router.get("/", (req, res) => {
    res.send("hello");
});

router.post("/", (req, res) =>{
    let inputData = req.body.data;
    console.log(inputData);
    let uid = uuidv4();

    if(inputData === "")
        return res.status(400).json({error: "Content missing"});

    else {
        let shortID = util.generateShortID().substring(0,6);
        let dbEntry = new DataModel({_id: uid, textData: inputData, tinyURL: process.env.CLIENT + "/" + shortID,shortID: shortID, date: new Date(), validity: util.calculateValidity()});
        dbEntry.save((err, res) => {
            if(err) console.log(err);
        });
        res.send(dbEntry);
    }
})

router.get("/login", (req, res) => {
    res.send("hello");
});

// router.get("/profile", (req, res) => {

// })

router.get("/:paste_id", (req, res) => {
    // console.log(req.params.paste_id);
    DataModel.find({ shortID: req.params.paste_id }).then((response) => {
        res.json(response);
    });
});

module.exports = router;