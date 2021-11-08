const express = require('express');
const app = express();
const games = require('./games.json');
const port = 3009;
//---------- 
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
//------------
app.get('/games',(req,res)=>{
    res.json(games);   
})
//-----------
 app.post('/games',(req,res)=>{
   let newGames={
       id:req.body.id,
       name:req.body.name
   };
  games.push(newGames) 
    res.json(games);

 })
 //----------
 app.put('/games/:id',(req,res)=>{
     let found = games.find((item)=>{
         return item.id === parseInt(req.params.id)
     })
     if (found){
         let update = {
             id:found.id,
             name:req.body.name
         }
         let targetIndex = games.indexOf(found)
         games.splice(targetIndex,1,update)
         res.send(games)
     }
     else{
         res.sendStatuse(404);
     }
 })
 //---------------

app.delete('/games/:id',(req,res)=>{
    let found = games.find((item)=>{
        return item.id === parseInt(req.params.id)
    })
    if(found){
        let targetIndex = games.indexOf(found)
        games.splice(targetIndex,1)
        res.send(games)
    }
    else{
        res.sendStatuse(404);
    }
    })

app.listen(port,()=>{console.log("server is running")})
