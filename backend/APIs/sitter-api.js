//create user api app
const exp = require("express");
const sitterApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
// const verifyToken=require('../Middlewares/verifyToken')
require("dotenv").config();

let ownercollection;
let sittercollection;
//get usercollection app
sitterApp.use((req, res, next) => {
  ownercollection = req.app.get("ownercollection");
  sittercollection = req.app.get("sittercollection");
  next();
});

//owner registration route
sitterApp.post(
  "/sitters",
  expressAsyncHandler(async (req, res) => {
    const newSitter = req.body;
    const dbsitter = await sittercollection.findOne({ sittername: newSitter.sittername });
    if (dbsitter !== null) {
      res.send({ message: "sitter existed" });
    } else {
      await sittercollection.insertOne(newSitter);
      res.send({ message: "sitter created" });
    }
  })
);

// Get sitters
sitterApp.get(
  "/sitters",verifyToken,
  expressAsyncHandler(async (req, res) => {
    //get all articles
    let sitterList = await sittercollection
      .find({ available: "true" })
      .toArray();
    //send res
    res.send({ message: "sitters", payload: sitterList });
  })
);

module.exports = sitterApp;