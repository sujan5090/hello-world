const express=require("express");
const app=express();
const mongoose=require("mongoose");
const config=require("./config/database");
const path=require("path");
const router=express.Router();
const authentication=require('./routes/authentication')(router);
const bodyParser=require('body-parser');
mongoose.promise=global.promise;

mongoose.connect(config.uri, (err) => {
 
    if(err)
    {
       console.log("could not connet to the database ",err);
    }
    else
    {
     
      console.log("connect to the database "+config.db);
    }

});

 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
 
app.use(express.static(__dirname+'/client/dist/client/'));
app.use('/authentication',authentication);
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname +'/client/dist/client/index.html'));
  });


app.listen(8080,() =>{

    console.log("listening on the port 8080");
  });