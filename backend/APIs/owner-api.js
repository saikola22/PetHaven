//create user api app
const exp = require("express");
const ownerApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middlewares/verifyToken");
require("dotenv").config();

let ownercollection;
let sittercollection;
//get usercollection app
ownerApp.use((req, res, next) => {
  ownercollection = req.app.get("ownercollection");
  sittercollection = req.app.get("sittercollection");
  next();
});

//owner registration route
ownerApp.post(
  "/owner",
  expressAsyncHandler(async (req, res) => {
    const newOwner = req.body;
    const dbowner = await ownercollection.findOne({ username: newOwner.username });
    if (dbowner !== null) {
      res.send({ message: "owner existed" });
    } else {
      const hashedPassword = await bcryptjs.hash(newOwner.password, 6);
      newOwner.password = hashedPassword;
      await ownercollection.insertOne(newOwner);
      res.send({ message: "owner created" });
    }
  })
);

//owner login
ownerApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const owenrCred = req.body;
    const dbuser = await ownercollection.findOne({
      ownername: owenrCred.ownername,
    });
    if (dbuser === null) {
      res.send({ message: "Invalid username" });
    } else {
      const status = await bcryptjs.compare(owenrCred.password, dbuser.password);
      if (status === false) {
        res.send({ message: "Invalid password" });
      } else {
        const signedToken = jwt.sign(
          { ownername: owenrCred.ownername },
          process.env.SECRET_KEY,
          { expiresIn: '1d' }
        );
        res.send({
          message: "login success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  })
);

// get sitter details
ownerApp.get(
  "/sitterDetails", verifyToken,
  expressAsyncHandler(async (req, res) => {
    //get all sitters
    let sitterList = await sittercollection
      .find({ status: true })
      .toArray();
    //send res
    res.send({ message: "List of Sitters", payload: sitterList });
  })
);

// Write comments
ownerApp.post(
  "/comment/:sitterId",verifyToken,
  expressAsyncHandler(async (req, res) => {
    //get user comment obj
    const ownerComment = req.body;
    const sitterIdFromUrl=(+req.params.sitterId);
    //insert ownerComment object to comments array of article by id
    let result = await sittercollection.updateOne(
      { sitterId: sitterIdFromUrl},
      { $addToSet: { comments: ownerComment, username: ownerComment.username} }
    );
    console.log(result);
    res.send({ message: "Comment posted" });
  })
);

// const Message = require('../models/message');

// Endpoint to fetch messages between two users
// router.get('/messages/:senderId/:receiverId', async (req, res) => {
//   try {
//     const { senderId, receiverId } = req.params;
//     const messages = await Message.find({ $or: [{ sender: senderId, receiver: receiverId }, { sender: receiverId, receiver: senderId }] })
//                                    .sort({ timestamp: 1 })
//                                    .populate('sender', 'username')
//                                    .populate('receiver', 'username');
//     res.json(messages);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Endpoint to send a message
// router.post('/messages', async (req, res) => {
//   try {
//     const { sender, receiver, content } = req.body;
//     const message = new Message({ sender, receiver, content });
//     await message.save();
//     res.status(201).json({ message: 'Message sent successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

module.exports = ownerApp;