// create express app
const exp = require('express');
const app = exp();
require('dotenv').config(); // process.env.PORT
const mongoClient = require('mongodb').MongoClient;
const path = require('path');
const cors = require('cors'); // ✅ Added CORS

app.use(cors()); // ✅ Enable CORS for all routes
app.use(exp.json());

// serve static files from React app
app.use(exp.static(path.join(__dirname, '../second/build')));

// connect to DB
mongoClient.connect(process.env.DB_URL)
  .then(client => {
    // get db obj
    const pet = client.db('pet');
    // get collection objs
    const ownercollection = pet.collection('ownercollection');
    const sittercollection = pet.collection('sittercollection');
    // share collection objs with express app
    app.set('ownercollection', ownercollection);
    app.set('sittercollection', sittercollection);
    // confirm db connection status
    console.log("DB connection success");
  })
  .catch(err => console.log("Err in DB connection", err));

// import API routes
const ownerApp = require('./APIs/owner-api');
const sitterApp = require('./APIs/sitter-api');

app.use('/owner-api', ownerApp);
app.use('/sitter-api', sitterApp);

// deal with page refresh on React
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '../second/build/index.html'));
});

// express error handler
app.use((err, req, res, next) => {
  res.send({ message: "error", payload: err.message });
});

// assign port number
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Web server on port ${port}`));
