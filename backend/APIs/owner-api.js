const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create router
const ownerApp = express.Router();

// Middleware to set the collection
let ownercollection;
ownerApp.use((req, res, next) => {
  ownercollection = req.app.get("ownercollection");
  next();
});

// Register route
ownerApp.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const newUser = req.body;

    // Check if user already exists
    const existingUser = await ownercollection.findOne({ username: newUser.username });
    if (existingUser) {
      return res.status(409).send({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(newUser.password, 8);
    newUser.password = hashedPassword;

    // Insert new user
    await ownercollection.insertOne(newUser);
    res.status(201).send({ message: "Registration successful" });
  })
);

// Login route
ownerApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Find user
    const dbUser = await ownercollection.findOne({ username });
    if (!dbUser) {
      return res.status(401).send({ message: "Invalid username" });
    }

    // Check password
    const passwordMatch = await bcryptjs.compare(password, dbUser.password);
    if (!passwordMatch) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.status(200).send({
      message: "Login successful",
      token,
      user: {
        username: dbUser.username,
        email: dbUser.email,
      },
    });
  })
);

module.exports = ownerApp;
