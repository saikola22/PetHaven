//create express app
const exp=require('express');
const app=exp()
require('dotenv').config() //process.env.PORT
const mongoClient=require('mongodb').MongoClient;
const path=require('path')

app.use(exp.static(path.join(__dirname,'../second/build')))
app.use(exp.json())

//connect to DB
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get db obj
    const pet=client.db('pet')
    //get collection obj
    const ownercollection=pet.collection('ownercollection')
    const sittercollection=pet.collection('sittercollection')
    //share colelction obj with express app
    app.set('ownercollection',ownercollection)
    app.set('sittercollection',sittercollection)
    //confirm db connection status
    console.log("DB connection success")
})
.catch(err=>console.log("Err in DB connection",err))


//import API routes
const ownerApp=require('./APIs/owner-api')
const sitterApp=require('./APIs/sitter-api')

app.use('/owner-api',ownerApp)
app.use('/sitter-api',sitterApp)

//deals with page refresh
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../second/build/index.html'))
})

//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload:err.message})
})
//assign port number
const port=process.env.PORT || 5000;
app.listen(port,()=>console.log(`Web server on port ${port}`))
